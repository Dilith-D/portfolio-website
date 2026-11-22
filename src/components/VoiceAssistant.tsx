import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { navigate } from 'astro:transitions/client';

type CallState = 'idle' | 'connecting' | 'listening' | 'speaking';

const VAPI_KEY = 'ec84568a-9bfa-4c93-91cc-a3b7447abc96';
const ASSISTANT_ID = 'a48874e8-dd51-48ad-a536-741c0bfabcc6';

// Pages the agent may open with its navigate_to_page tool. Must mirror the enum on the
// tool in the Vapi dashboard and the page list in VAPI/vapi prompt.txt. Never trust the
// model's path: anything not in this set is ignored. /secret is excluded on purpose.
const NAV_ALLOWED = new Set([
  '/', '/work', '/work/golden-account-model', '/work/booking-stopgap', '/work/ai-shopping-buddy',
  '/writing', '/writing/rapido-teardown', '/writing/spotify-wrapped',
  '/projects', '/projects/reeve', '/projects/delphi', '/projects/superpilot',
  '/projects/voice-agent', '/projects/iris', '/projects/winledger',
  '/about', '/now', '/contact',
]);

const normalizePath = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

// Base.astro's router gate reads this: page changes are soft swaps (call survives)
// only while it is true, and normal full page loads otherwise.
const setCallActive = (on: boolean) => {
  (window as unknown as { __voiceCallActive?: boolean }).__voiceCallActive = on;
};

type ToolCall = { id?: string; function?: { name?: string; arguments?: unknown } };
type VapiMessage = {
  type?: string;
  toolCallList?: ToolCall[];
  functionCall?: { name?: string; parameters?: unknown };
};

const readPath = (args: unknown): string | null => {
  let a = args;
  if (typeof a === 'string') { try { a = JSON.parse(a); } catch { return null; } }
  const p = (a as { path?: unknown } | null)?.path;
  return typeof p === 'string' ? normalizePath(p) : null;
};

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const Waveform = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '16px' }}>
    {[0, 120, 240, 360, 480].map((delay, i) => (
      <div
        key={i}
        style={{
          width: '2.5px',
          background: 'var(--color-blue)',
          borderRadius: '2px',
          animation: 'di-wave 0.9s ease-out infinite',
          animationDelay: `${delay}ms`,
        }}
      />
    ))}
  </div>
);

export default function VoiceAssistant() {
  const [state, setState] = useState<CallState>('idle');
  const [seconds, setSeconds] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);
  const stateRef = useRef<CallState>('idle');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const triggerRef = useRef<string>('unknown');
  const callStartRef = useRef<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t0Ref = useRef<number | null>(null);
  const markedRef = useRef<Set<string>>(new Set());

  // Mirror state to ref so event handlers always see current value
  useEffect(() => { stateRef.current = state; }, [state]);

  // Startup timing: logs click → call-start → first assistant speech to the console.
  // Read it after a call to see which stage the wait is actually in.
  const mark = (label: string) => {
    if (t0Ref.current === null || markedRef.current.has(label)) return;
    markedRef.current.add(label);
    console.info(`[voice] +${Math.round(performance.now() - t0Ref.current)}ms ${label}`);
  };

  // A failed start must never be silent: show why in the pill for a few seconds.
  const showNotice = (msg: string) => {
    setNotice(msg);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => setNotice(null), 5000);
  };

  const isVisible = state !== 'idle';
  const pillVisible = isVisible || notice !== null;
  const isActive = state === 'listening' || state === 'speaking';

  // Vapi init. The component is persisted across soft page swaps (transition:persist in
  // Base.astro), so this runs once per full page load and the call survives navigation.
  useEffect(() => {
    vapiRef.current = new Vapi(VAPI_KEY);

    // The agent's navigate_to_page tool has no server URL, so Vapi delivers the call here.
    vapiRef.current.on('message', (msg: VapiMessage) => {
      const calls: { name?: string; args: unknown }[] = [];
      if (msg?.type === 'tool-calls') {
        (msg.toolCallList ?? []).forEach(c => calls.push({ name: c.function?.name, args: c.function?.arguments }));
      } else if (msg?.type === 'function-call') {
        calls.push({ name: msg.functionCall?.name, args: msg.functionCall?.parameters });
      }
      for (const c of calls) {
        if (c.name !== 'navigate_to_page') continue;
        const path = readPath(c.args);
        if (!path || !NAV_ALLOWED.has(path)) {
          console.warn('[voice] navigate_to_page ignored, path not allowed:', c.args);
          continue;
        }
        if (normalizePath(location.pathname) === path) continue;
        const w = window as Record<string, unknown>;
        (w.posthog as { capture?: (...a: unknown[]) => void })?.capture?.('voice_agent_navigated', { path });
        (w.gtag as ((...a: unknown[]) => void) | undefined)?.('event', 'voice_agent_navigated', { path });
        navigate(path);
      }
    });

    vapiRef.current.on('call-start', () => {
      mark('call-start (connected)');
      if (stateRef.current !== 'idle') setState('listening');
      callStartRef.current = Date.now();
      const w = window as Record<string, unknown>;
      (w.posthog as { capture?: (...a: unknown[]) => void })?.capture?.('voice_agent_started', { trigger: triggerRef.current });
      (w.gtag as ((...a: unknown[]) => void) | undefined)?.('event', 'voice_agent_started', { trigger: triggerRef.current });
    });
    vapiRef.current.on('call-end', () => {
      const duration_seconds = callStartRef.current ? Math.round((Date.now() - callStartRef.current) / 1000) : null;
      callStartRef.current = null;
      const w = window as Record<string, unknown>;
      (w.posthog as { capture?: (...a: unknown[]) => void })?.capture?.('voice_agent_ended', { trigger: triggerRef.current, duration_seconds });
      (w.gtag as ((...a: unknown[]) => void) | undefined)?.('event', 'voice_agent_ended', { trigger: triggerRef.current, duration_seconds });
      setCallActive(false);
      setState('idle');
      setSeconds(0);
    });
    vapiRef.current.on('speech-start', () => {
      mark('first assistant speech');
      if (stateRef.current !== 'idle') setState('speaking');
    });
    vapiRef.current.on('speech-end', () => {
      if (stateRef.current !== 'idle') setState('listening');
    });
    vapiRef.current.on('error', (err: unknown) => {
      console.error('[VoiceAssistant]', err);
      const errorMsg = err instanceof Error ? err.message : String(err);
      const w = window as Record<string, unknown>;
      (w.posthog as { capture?: (...a: unknown[]) => void })?.capture?.('voice_agent_error', { trigger: triggerRef.current, error: errorMsg });
      (w.gtag as ((...a: unknown[]) => void) | undefined)?.('event', 'voice_agent_error', { trigger: triggerRef.current, error: errorMsg });
      if (stateRef.current !== 'idle') showNotice("Couldn't connect. Please try again");
      setCallActive(false);
      setState('idle');
      setSeconds(0);
    });
    return () => { setCallActive(false); vapiRef.current?.stop(); };
  }, []);

  // Tell the agent where the visitor is after every soft page swap during a call, whether
  // the agent opened the page or the visitor clicked a link. No reply is triggered.
  useEffect(() => {
    const onPageLoad = () => {
      if (stateRef.current === 'idle') return;
      try {
        vapiRef.current?.send({
          type: 'add-message',
          message: {
            role: 'system',
            content: `The visitor is now on ${location.pathname} (${document.title}).`,
          },
          triggerResponseEnabled: false,
        } as Parameters<Vapi['send']>[0]);
      } catch (err) {
        console.warn('[voice] could not send page update', err);
      }
    };
    document.addEventListener('astro:page-load', onPageLoad);
    return () => document.removeEventListener('astro:page-load', onPageLoad);
  }, []);

  // voice:toggle custom event — dispatched by nav mic + hero link
  useEffect(() => {
    const handleToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail as { trigger?: string } | undefined;
      triggerRef.current = detail?.trigger ?? 'unknown';
      if (stateRef.current === 'idle') {
        // In-app browsers (Instagram, LinkedIn) expose no mic API; say so instead of hanging.
        if (!navigator.mediaDevices?.getUserMedia) {
          showNotice('Open this page in Safari or Chrome to talk');
          return;
        }
        setNotice(null);
        markedRef.current.clear();
        t0Ref.current = performance.now();
        setState('connecting');
        setCallActive(true);
        // start() rejects on a blocked mic or a failed API call, and emits no 'error'
        // event for that, so without this the pill sat on "Connecting" forever.
        // currentPage / pageTitle fill {{currentPage}} / {{pageTitle}} in the Vapi prompt.
        Promise.resolve(vapiRef.current?.start(ASSISTANT_ID, {
          variableValues: { currentPage: location.pathname, pageTitle: document.title },
        })).catch((err: unknown) => {
          console.error('[VoiceAssistant]', err);
          setCallActive(false);
          setState('idle');
          setSeconds(0);
          showNotice("Couldn't start the call. Check microphone access");
        });
      } else {
        vapiRef.current?.stop();
        setCallActive(false);
      }
    };
    document.addEventListener('voice:toggle', handleToggle);

    // A tap that landed before this component hydrated was queued by the inline
    // catcher in Base.astro. Take it over now so the user never has to tap twice.
    const w = window as unknown as { __voiceReady?: boolean; __voiceQueue?: { trigger?: string } | null };
    w.__voiceReady = true;
    if (w.__voiceQueue) {
      const queued = w.__voiceQueue;
      w.__voiceQueue = null;
      document.documentElement.classList.remove('voice-pending');
      handleToggle(new CustomEvent('voice:toggle', { detail: queued }));
    }

    return () => {
      w.__voiceReady = false;
      document.removeEventListener('voice:toggle', handleToggle);
    };
  }, []);

  // Call timer — runs while active
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [isActive]);

  // Sync navMic classes + html.voice-active
  useEffect(() => {
    const mics = [
      document.getElementById('navMic'),
      document.getElementById('navMicMobile'),
    ];
    if (isVisible) {
      mics.forEach(m => {
        m?.classList.add('voice-on');
        m?.setAttribute('aria-label', 'End call');
      });
      document.documentElement.classList.add('voice-active');
    } else {
      mics.forEach(m => {
        m?.classList.remove('voice-on');
        m?.setAttribute('aria-label', 'Start voice assistant');
      });
      document.documentElement.classList.remove('voice-active');
    }
  }, [isVisible]);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleEnd = () => {
    vapiRef.current?.stop();
    setCallActive(false);
    setState('idle');
    setSeconds(0);
  };

  const stateLabel = notice ?? (
    state === 'connecting' ? 'Connecting' :
    state === 'listening'  ? 'Listening'  : 'Speaking');

  const enterT = reducedMotion
    ? 'opacity 0.01ms, transform 0.01ms'
    : 'opacity 260ms var(--ease-ui), transform 320ms var(--ease-drawer)';
  const exitT = reducedMotion
    ? 'opacity 0.01ms, transform 0.01ms'
    : 'opacity 200ms var(--ease-ui), transform 240ms var(--ease-drawer)';

  return (
    <>
      <style>{`
        @keyframes di-wave {
          0%, 100% { height: 3px; }
          50%       { height: 14px; }
        }
        .di-pill {
          background: rgb(22, 20, 18);
        }
        html:not(.dark) .di-pill {
          background: rgb(244, 240, 232);
        }
        @media (hover: hover) and (pointer: fine) {
          .di-pill:active {
            transform: translateX(-50%) scale(0.96) translateY(0px) !important;
          }
        }
        .di-end {
          background: var(--color-cta-bg);
          color: var(--color-cta-fg);
          border: none;
          border-radius: 9999px;
          padding: 0.35rem 0.875rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 120ms var(--ease-ui);
        }
        .di-end:active {
          transform: scale(0.93);
        }
        .di-end:focus-visible {
          outline: 2px solid var(--color-blue);
          outline-offset: 2px;
        }
      `}</style>

      {/* Dynamic Island */}
      <div
        className="di-pill"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          top: '5.25rem',
          left: '50%',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.45rem 0.5rem 0.45rem 1.1rem',
          borderRadius: '9999px',
          border: '1px solid var(--color-border)',
          whiteSpace: 'nowrap',
          pointerEvents: pillVisible ? 'all' : 'none',
          opacity: pillVisible ? 1 : 0,
          transform: pillVisible
            ? 'translateX(-50%) scale(1) translateY(0px)'
            : 'translateX(-50%) scale(0.88) translateY(-10px)',
          transition: pillVisible ? enterT : exitT,
        }}
      >
        {/* Blue status dot */}
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--color-blue)',
          flexShrink: 0,
          opacity: state === 'connecting' && !notice ? 0.45 : 1,
          transition: 'opacity 300ms var(--ease-ui)',
        }} />

        {/* State label */}
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: 'var(--color-primary)',
          letterSpacing: '0.01em',
        }}>
          {stateLabel}
        </span>

        {/* Waveform — only when active and motion allowed */}
        {isActive && !reducedMotion && <Waveform />}

        {/* Call timer */}
        {isActive && (
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--color-secondary)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {formatTime(seconds)}
          </span>
        )}

        {/* End button */}
        {isVisible && (
          <button className="di-end" onClick={handleEnd} aria-label="End call">
            End
          </button>
        )}
      </div>
    </>
  );
}
