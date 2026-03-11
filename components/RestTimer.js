// components/RestTimer.js
import { useState, useEffect, useRef } from 'react';
import { COLORS } from '../lib/data';

export default function RestTimer({ preset = 90 }) {
  const [total, setTotal] = useState(preset);
  const [seconds, setSeconds] = useState(preset);
  const [running, setRunning] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setTotal(preset); setSeconds(preset); setRunning(false);
  }, [preset]);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setSeconds(s => {
        if (s <= 1) { clearInterval(ref.current); setRunning(false); return 0; }
        return s - 1;
      }), 1000);
    } else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);

  const pct = (seconds / total) * 100;
  const R = 36, circ = 2 * Math.PI * R;
  const done = seconds === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg width="96" height="96">
        <circle cx="48" cy="48" r={R} fill="none" stroke={COLORS.bg3} strokeWidth="7" />
        <circle cx="48" cy="48" r={R} fill="none"
          stroke={done ? COLORS.success : COLORS.accentBright} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
          strokeLinecap="round" transform="rotate(-90 48 48)"
          style={{ transition: 'stroke-dashoffset 1s linear' }} />
        <text x="48" y="54" textAnchor="middle" fill={done ? COLORS.success : COLORS.text}
          fontSize="18" fontWeight="700" fontFamily="monospace">
          {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
        </text>
      </svg>

      <div style={{ display: 'flex', gap: 5 }}>
        {[45, 60, 75, 90, 120].map(t => (
          <button key={t} onClick={() => { setTotal(t); setSeconds(t); setRunning(false); }}
            style={{
              padding: '3px 8px', borderRadius: 5, cursor: 'pointer', fontSize: 11,
              border: `1px solid ${COLORS.border2}`,
              background: total === t ? COLORS.accent : 'transparent',
              color: COLORS.text,
            }}>
            {t}s
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setRunning(r => !r)}
          style={{
            padding: '8px 22px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: running ? COLORS.border : COLORS.accent,
            color: COLORS.white, fontWeight: 700, fontSize: 13,
          }}>
          {running ? '⏸ Pausa' : '▶ Start'}
        </button>
        <button onClick={() => { setSeconds(total); setRunning(false); }}
          style={{
            padding: '8px 13px', borderRadius: 8, cursor: 'pointer', fontSize: 14,
            border: `1px solid ${COLORS.border}`, background: 'transparent', color: COLORS.textMuted,
          }}>↺</button>
      </div>
    </div>
  );
}
