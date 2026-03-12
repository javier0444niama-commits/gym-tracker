// components/tabs/Routine.js
import { useState } from 'react';
import { COLORS, MES5, DAYS_ORDER } from '../../lib/data';

export default function Routine({ setTab, setSelectedDay }) {
  const [routineDay, setRoutineDay] = useState('Lunes');
  const [expandedEx, setExpandedEx] = useState(null);
  const C = COLORS;
  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="fade-in">
      <div style={glow}>
        <p style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Progresión Mensual</p>
        <p style={{ fontSize: 22, fontWeight: 800, color: C.accentBright }}>🟦 Mes 5 · Hipertrofia & Estética</p>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 8, lineHeight: 1.7 }}>
          Duración: 70–90 min · +1–2kg o +1–2 reps/semana en compuestos · +2.5kg/semana en aislamiento
        </p>
        <div style={{ marginTop: 12, padding: '12px 16px', background: C.bg3, borderRadius: 10, fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
          🔥 <strong style={{ color: C.text }}>Warm-up:</strong> 5–10 min movilidad (hombros, cadera, estocadas)<br />
          ❄️ <strong style={{ color: C.text }}>Cool-down:</strong> 5 min estiramientos estáticos
        </div>
      </div>

      {/* Day selector */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {DAYS_ORDER.map(d => (
          <button key={d} onClick={() => setRoutineDay(d)} style={{
            padding: '7px 12px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 11,
            border: `1px solid ${routineDay === d ? C.accent : C.border}`,
            background: routineDay === d ? `${C.accent}22` : 'transparent',
            color: routineDay === d ? C.accentBright : C.textMuted,
          }}>
            {MES5[d]?.icon} {d}
          </button>
        ))}
      </div>

      {/* Exercises */}
      {MES5[routineDay] && (
        <div style={card}>
          <p style={{ fontSize: 17, fontWeight: 800, color: C.accentBright, marginBottom: 4 }}>
            {MES5[routineDay].icon} {MES5[routineDay].label}
          </p>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 18 }}>
            {MES5[routineDay].exercises.length} ejercicios
          </p>
          {MES5[routineDay].exercises.map((ex, i) => {
            const key = `${routineDay}-${i}`;
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                <div onClick={() => setExpandedEx(expandedEx === key ? null : key)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', background: C.bg3, borderRadius: 10, cursor: 'pointer',
                    border: `1px solid ${expandedEx === key ? C.accent + '66' : 'transparent'}`,
                    transition: 'border-color 0.2s',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, background: `${C.accent}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800, color: C.accent,
                    }}>{i + 1}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>{ex.name}</p>
                      <p style={{ fontSize: 10, color: C.textMuted }}>{ex.sets} · ⏱ {ex.restLabel}</p>
                    </div>
                  </div>
                  <span style={{ color: C.textDim, fontSize: 14 }}>{expandedEx === key ? '▲' : '▼'}</span>
                </div>
                {expandedEx === key && (
                  <div style={{
                    padding: '12px 14px', background: `${C.accent}0a`,
                    borderRadius: '0 0 10px 10px', border: `1px solid ${C.accent}33`,
                    borderTop: 'none', marginTop: -4,
                  }}>
                    <p style={{ fontSize: 11, color: C.accentBright }}>💡 Progresión: {ex.tip}</p>
                    <p style={{ fontSize: 10, color: C.textMuted, marginTop: 6 }}>
                      Series: <strong style={{ color: C.text }}>{ex.sets}</strong> · Descanso: <strong style={{ color: C.text }}>{ex.restLabel}</strong>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          <button onClick={() => { setTab('workout'); setSelectedDay(routineDay); }}
            style={{ width: '100%', padding: '13px', marginTop: 10, borderRadius: 10, border: 'none', background: C.accent, color: C.white, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            ⚡ Entrenar este día
          </button>
        </div>
      )}
    </div>
  );
}
