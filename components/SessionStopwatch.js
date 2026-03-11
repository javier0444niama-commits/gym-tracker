// components/SessionStopwatch.js
import { useState, useEffect, useRef } from 'react';
import { COLORS } from '../lib/data';

export default function SessionStopwatch({ running }) {
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (running) {
      setElapsed(0);
      ref.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const pct = Math.min((elapsed / 5400) * 100, 100); // 90 min max
  const R = 52, circ = 2 * Math.PI * R;
  const color = elapsed > 4800 ? COLORS.warning : COLORS.accent;
  const zone = elapsed === 0 ? 'listo'
    : elapsed < 4200 ? 'en progreso'
    : elapsed < 5400 ? 'zona óptima ✓'
    : '¡al límite!';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width="140" height="140">
        <circle cx="70" cy="70" r={R} fill="none" stroke={COLORS.bg3} strokeWidth="8" />
        <circle cx="70" cy="70" r={R} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={circ - (pct / 100) * circ}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 8px ${color})` }}
        />
        <text x="70" y="64" textAnchor="middle" fill={COLORS.text}
          fontSize="26" fontWeight="800" fontFamily="monospace">
          {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </text>
        <text x="70" y="82" textAnchor="middle" fill={COLORS.textDim} fontSize="11">
          {zone}
        </text>
      </svg>
      <p style={{ fontSize: 11, color: COLORS.textMuted }}>Meta: 70–90 min</p>
    </div>
  );
}
