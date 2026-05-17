import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';

type CallState = 'idle' | 'connecting' | 'listening' | 'speaking';

const VAPI_KEY = 'ec84568a-9bfa-4c93-91cc-a3b7447abc96';
const ASSISTANT_ID = 'a48874e8-dd51-48ad-a536-741c0bfabcc6';

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

  // Mirror state to ref so event handlers always see current value
  useEffect(() => { stateRef.current = state; }, [state]);

  const isVisible = state !== 'idle';
  const isActive = state === 'listening' || state === 'speaking';

  // Vapi init — do NOT change key or assistant ID
  useEffect(() => {
    vapiRef.current = new Vapi(VAPI_KEY);
    vapiRef.current.on('call-start', () => setState('listening'));
    vapiRef.current.on('call-end', () => { setState('idle'); setSeconds(0); });
    vapiRef.current.on('speech-start', () => setState('speaking'));
    vapiRef.current.on('speech-end', () => setState('listening'));
    vapiRef.current.on('error', (err: unknown) => {
      console.error('[VoiceAssistant]', err);
      setState('idle');
      setSeconds(0);
    });
    return () => { vapiRef.current?.stop(); };
  }, []);

  // voice:toggle custom event — dispatched by nav mic + hero link
  useEffect(() => {
    const handleToggle = () => {
      if (stateRef.current === 'idle') {
        setState('connecting');
        vapiRef.current?.start(ASSISTANT_ID);
      } else {
        vapiRef.current?.stop();
      }
    };
    document.addEventListener('voice:toggle', handleToggle);
    return () => document.removeEventListener('voice:toggle', handleToggle);
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
    setState('idle');
    setSeconds(0);
  };

  const stateLabel =
    state === 'connecting' ? 'Connecting' :
    state === 'listening'  ? 'Listening'  : 'Speaking';

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
          background: rgba(13, 11, 10, 0.75);
        }
        html:not(.dark) .di-pill {
          background: rgba(244, 240, 232, 0.85);
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
          transition:
            opacity 150ms var(--ease-ui),
            transform 120ms var(--ease-ui);
        }
        .di-end:active {
          transform: scale(0.93);
        }
        @media (hover: hover) and (pointer: fine) {
          .di-end:hover { opacity: 0.9; }
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
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid var(--color-border)',
          whiteSpace: 'nowrap',
          pointerEvents: isVisible ? 'all' : 'none',
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(-50%) scale(1) translateY(0px)'
            : 'translateX(-50%) scale(0.88) translateY(-10px)',
          transition: isVisible ? enterT : exitT,
        }}
      >
        {/* Blue status dot */}
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--color-blue)',
          flexShrink: 0,
          opacity: state === 'connecting' ? 0.45 : 1,
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
