// components/tabs/Progress.js
import { COLORS } from '../lib/data';
import MiniChart from './MiniChart';

export default function Progress({ workouts, weights }) {
  const C = COLORS;
  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };
  const statBox = { textAlign: 'center', padding: '14px 10px', background: C.bg3, borderRadius: 12, flex: 1 };

  const currentWeight = weights[weights.length - 1]?.weight || 0;
  const weightLost = (weights[0]?.weight - currentWeight).toFixed(1);

  const getPR = name => {
    let pr = 0;
    workouts.forEach(w => w.exercises.forEach(e => {
      if (e.name === name) e.sets.forEach(s => { if (s.w > pr) pr = s.w; });
    }));
    return pr;
  };

  const prExercises = [
    ['Press inclinado con mancuernas', '🏋️'],
    ['Hip thrust con mancuerna', '🍑'],
    ['Sentadilla goblet con mancuerna', '🦵'],
    ['Press militar con mancuernas', '🏔️'],
    ['Dominadas con agarre prono', '💪'],
  ];

  const progressions = [
    { ex: 'Press inclinado con mancuernas', base: getPR('Press inclinado con mancuernas') || 30, d: 2.5, tip: 'Sube 2.5kg cuando completes todas las series limpias' },
    { ex: 'Hip thrust con mancuerna', base: getPR('Hip thrust con mancuerna') || 40, d: 2.5, tip: '+2.5kg cada 1–2 semanas, mantén 12–15 reps' },
    { ex: 'Sentadilla goblet con mancuerna', base: getPR('Sentadilla goblet con mancuerna') || 24, d: 2, tip: '+2kg o +1 rep por semana' },
    { ex: 'Dominadas con agarre prono', base: getPR('Dominadas con agarre prono') || 0, d: 2.5, tip: 'Añade lastre o sube reps' },
    { ex: 'Press militar con mancuernas', base: getPR('Press militar con mancuernas') || 22, d: 2, tip: 'Perfecciona técnica antes de subir carga' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="fade-in">

      {/* Peso */}
      <div style={card}>
        <p style={sec}>📉 Evolución de Peso</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={statBox}><p style={{ fontSize: 20, fontWeight: 800, color: C.success }}>{currentWeight}kg</p><p style={{ fontSize: 10, color: C.textMuted }}>Actual</p></div>
          <div style={statBox}><p style={{ fontSize: 20, fontWeight: 800, color: C.danger }}>−{weightLost}kg</p><p style={{ fontSize: 10, color: C.textMuted }}>Pérdida</p></div>
          <div style={statBox}><p style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>{weights.length}</p><p style={{ fontSize: 10, color: C.textMuted }}>Registros</p></div>
        </div>
        <MiniChart data={weights} color={C.success} />
        <div style={{ marginTop: 10 }}>
          {weights.slice(-5).reverse().map((w, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
              <span style={{ color: C.textMuted }}>{w.date}</span>
              <span style={{ fontWeight: 700 }}>{w.weight} kg</span>
            </div>
          ))}
        </div>
      </div>

      {/* PRs */}
      <div style={card}>
        <p style={sec}>💪 Records – Mes 5</p>
        {prExercises.map(([ex, ic]) => {
          const prs = workouts
            .filter(w => w.exercises.some(e => e.name === ex))
            .map(w => ({ date: w.date, value: Math.max(...w.exercises.filter(e => e.name === ex).flatMap(e => e.sets.map(s => s.w))) }));
          const best = prs.length ? Math.max(...prs.map(p => p.value)) : 0;
          return (
            <div key={ex} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 700 }}>{ic} {ex}</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: C.accent }}>{best ? `${best}kg` : '—'}</p>
              </div>
              {prs.length > 1 && <MiniChart data={prs} color={C.accent} />}
            </div>
          );
        })}
      </div>

      {/* Volumen */}
      <div style={card}>
        <p style={sec}>📊 Volumen por sesión</p>
        {workouts.slice(-6).map(w => {
          const vol = w.exercises.reduce((a, e) => a + e.sets.reduce((s, st) => s + st.w * st.r, 0), 0);
          return (
            <div key={w.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: C.textMuted }}>{w.date} · {w.split}</span>
                <span>{vol.toLocaleString()} kg</span>
              </div>
              <div style={{ height: 7, background: C.bg3, borderRadius: 99 }}>
                <div style={{ height: '100%', width: `${Math.min((vol / 12000) * 100, 100)}%`, background: `linear-gradient(90deg,${C.accent},${C.accentBright})`, borderRadius: 99 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progresión sugerida */}
      <div style={card}>
        <p style={sec}>🎯 Progresión Sugerida – Mes 5</p>
        {progressions.map((item, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 12, fontWeight: 700 }}>{item.ex}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: C.textMuted }}>{item.base}kg</span>
                <span style={{ color: C.accent }}>→</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.accent }}>{item.base + item.d}kg</span>
              </div>
            </div>
            <p style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>💡 {item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
