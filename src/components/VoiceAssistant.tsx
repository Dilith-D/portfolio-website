import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';

type CallState = 'idle' | 'connecting' | 'listening' | 'speaking';
type Tilt = { x: number; y: number };

const VAPI_KEY = 'ec84568a-9bfa-4c93-91cc-a3b7447abc96';
const ASSISTANT_ID = 'a48874e8-dd51-48ad-a536-741c0bfabcc6';

const MicIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
  </svg>
);

const Spinner = () => (
  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ animation: 'va-spin 0.8s linear infinite' }}>
    <circle cx="10" cy="10" r="8" stroke="#4D76EF" strokeWidth="2" strokeOpacity="0.25"/>
    <path d="M10 2a8 8 0 0 1 8 8" stroke="#4D76EF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Waveform = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '17px', width: '17px', justifyContent: 'center' }}>
    {[0, 140, 280, 420].map((delay, i) => (
      <div
        key={i}
        style={{
          width: '3px',
          height: '5px',
          backgroundColor: '#4D76EF',
          borderRadius: '2px',
          animation: 'va-wave 0.9s ease-in-out infinite',
          animationDelay: `${delay}ms`,
        }}
      />
    ))}
  </div>
);

const ariaLabel: Record<CallState, string> = {
  idle: 'Start voice assistant',
  connecting: 'Connecting...',
  listening: 'End call',
  speaking: 'End call',
};

const labelText: Record<CallState, string> = {
  idle: 'Ask me anything',
  connecting: 'Connecting',
  listening: 'Listening',
  speaking: 'Speaking',
};

export default function VoiceAssistant() {
  const [state, setState] = useState<CallState>('idle');
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    vapiRef.current = new Vapi(VAPI_KEY);
    vapiRef.current.on('call-start', () => setState('listening'));
    vapiRef.current.on('call-end', () => setState('idle'));
    vapiRef.current.on('speech-start', () => setState('speaking'));
    vapiRef.current.on('speech-end', () => setState('listening'));
    vapiRef.current.on('error', (err: unknown) => {
      console.error('[VoiceAssistant]', err);
      setState('idle');
    });
    return () => { vapiRef.current?.stop(); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleClick = () => {
    if (state === 'idle') {
      setState('connecting');
      vapiRef.current?.start(ASSISTANT_ID);
    } else if (state === 'listening' || state === 'speaking') {
      vapiRef.current?.stop();
    }
  };

  const isActive = state === 'listening' || state === 'speaking';
  const isResetting = tilt.x === 0 && tilt.y === 0;

  const shadow = isActive
    ? '0 0 0 1px #4D76EF, 0 0 28px rgba(77,118,239,0.4), 0 16px 48px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3)'
    : hovered
    ? '0 0 0 1px #38383d, 0 20px 56px rgba(0,0,0,0.65), 0 6px 20px rgba(0,0,0,0.45)'
    : '0 0 0 1px #242427, 0 8px 28px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)';

  const labelColor = isActive
    ? '#4D76EF'
    : state === 'connecting'
    ? '#4D76EF'
    : '#8F8F92';

  return (
    <>
      <style>{`
        @keyframes va-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes va-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes va-wave {
          0%, 100% { height: 4px; }
          50%       { height: 16px; }
        }
        @keyframes va-mic-pulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        .va-card:focus-visible {
          outline: 2px solid #4D76EF;
          outline-offset: 4px;
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 50,
          fontFamily: 'Cabinet Grotesk, sans-serif',
        }}
      >
        {/* Float wrapper — only animates in idle */}
        <div style={{ animation: state === 'idle' ? 'va-float 3.5s ease-in-out infinite' : 'none' }}>

          {/* 3D tilt wrapper */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? '-3px' : '0px'})`,
              transition: isResetting
                ? 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1)'
                : 'transform 90ms ease-out',
            }}
          >
            <button
              className="va-card"
              onClick={handleClick}
              aria-label={ariaLabel[state]}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '11px',
                padding: '0 20px',
                height: '48px',
                borderRadius: '28px',
                backgroundColor: '#111113',
                boxShadow: shadow,
                border: 'none',
                color: '#EDEDED',
                cursor: state === 'connecting' ? 'default' : 'pointer',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'box-shadow 250ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              {/* Icon */}
              <span style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                animation: state === 'listening' ? 'va-mic-pulse 1.4s ease-in-out infinite' : 'none',
              }}>
                {state === 'connecting' ? <Spinner /> : state === 'speaking' ? <Waveform /> : <MicIcon />}
              </span>

              {/* Divider */}
              <span style={{ width: '1px', height: '16px', backgroundColor: '#2c2c31', flexShrink: 0 }} />

              {/* Label */}
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: labelColor,
                transition: 'color 200ms ease',
              }}>
                {labelText[state]}
              </span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
