// components/MiniChart.js
import { COLORS } from '../lib/data';

export default function MiniChart({ data, color = COLORS.accent }) {
  if (!data || data.length < 2) return null;
  const vals = data.map(d => d.weight || d.value || 0);
  const min = Math.min(...vals), max = Math.max(...vals), range = max - min || 1;
  const W = 300, H = 48;
  const pts = vals.map((v, i) =>
    `${(i / (vals.length - 1)) * W},${H - ((v - min) / range) * (H - 10) - 5}`
  ).join(' ');
  const id = `cg${color.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${H} ${pts} ${W},${H}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
      {vals.map((v, i) => (
        <circle key={i}
          cx={(i / (vals.length - 1)) * W}
          cy={H - ((v - min) / range) * (H - 10) - 5}
          r="4" fill={color} />
      ))}
    </svg>
  );
}
