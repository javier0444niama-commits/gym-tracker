// components/tabs/Dashboard.js
import { COLORS, BADGES, MES5, DAYS_ORDER } from '../../lib/data';
import MiniChart from '../MiniChart';

export default function Dashboard({ workouts, weights, setWeights, setTab, setSelectedDay }) {
  const streak = 5, level = 'Intermedio';
  const currentWeight = weights[weights.length - 1]?.weight || 0;
  const weightLost = (weights[0]?.weight - currentWeight).toFixed(1);
  const totalVol = workouts.reduce((a, w) =>
    a + w.exercises.reduce((b, e) => b + e.sets.reduce((c, s) => c + s.w * s.r, 0), 0), 0);

  const getPR = name => {
    let pr = 0;
    workouts.forEach(w => w.exercises.forEach(e => {
      if (e.name === name) e.sets.forEach(s => { if (s.w > pr) pr = s.w; });
    }));
    return pr;
  };

  const todayKey = (() => {
    const d = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const cap = d.charAt(0).toUpperCase() + d.slice(1);
    return DAYS_ORDER.find(k => cap.startsWith(k.slice(0, 4))) || 'Lunes';
  })();

  const [newWeight, setNewWeight] = require('react').useState('');

  const C = COLORS;
  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: '20px' };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };
  const statBox = { textAlign: 'center', padding: '14px 10px', background: C.bg3, borderRadius: 12, flex: 1 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="fade-in">

      {/* Hoy toca */}
      <div style={glow}>
        <p style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
          Hoy toca · Mes 5
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: C.accentBright }}>
          {MES5[todayKey]?.icon} {MES5[todayKey]?.label}
        </p>
        <p style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>
          {MES5[todayKey]?.exercises.length} ejercicios · 70–90 min
        </p>
        <button onClick={() => { setTab('workout'); setSelectedDay(todayKey); }}
          style={{ marginTop: 14, width: '100%', padding: 14, borderRadius: 10, border: 'none', background: C.accent, color: C.white, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          ⚡ Iniciar sesión de hoy
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { l: 'Peso', v: `${currentWeight}kg`, s: `−${weightLost}kg`, c: C.success },
          { l: 'Sesiones', v: workouts.length, s: 'total', c: C.accent },
          { l: 'Volumen', v: `${(totalVol / 1000).toFixed(1)}t`, s: 'acum.', c: C.warning },
        ].map((st, i) => (
          <div key={i} style={statBox}>
            <p style={{ fontSize: 22, fontWeight: 800, color: st.c }}>{st.v}</p>
            <p style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{st.l}</p>
            <p style={{ fontSize: 9, color: C.textDim, marginTop: 1 }}>{st.s}</p>
          </div>
        ))}
      </div>

      {/* PRs */}
      <div style={card}>
        <p style={sec}>🏆 Records Personales – Mes 5</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            ['Press inclinado con mancuernas', '🏋️', 'Pecho'],
            ['Hip thrust con mancuerna', '🍑', 'Glúteos'],
            ['Press militar con mancuernas', '🏔️', 'Hombro'],
          ].map(([ex, ic, nm]) => (
            <div key={ex} style={{ flex: 1, textAlign: 'center', background: C.bg3, borderRadius: 10, padding: '12px 6px' }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: C.accentBright }}>
                {getPR(ex) ? `${getPR(ex)}kg` : '—'}
              </p>
              <p style={{ fontSize: 10, color: C.textMuted, marginTop: 3 }}>{ic} {nm}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weight chart */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p style={sec}>📉 Peso Corporal</p>
          <span style={{ fontSize: 12, color: C.success, fontWeight: 700 }}>−{weightLost}kg</span>
        </div>
        <MiniChart data={weights} color={C.success} />
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <input value={newWeight} onChange={e => setNewWeight(e.target.value)}
            placeholder="Peso hoy (kg)" type="number"
            style={{ flex: 1, padding: '10px 14px', borderRadius: 9, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 13, outline: 'none' }} />
          <button onClick={() => {
            if (!newWeight) return;
            setWeights(p => [...p, { date: new Date().toISOString().split('T')[0], weight: +newWeight }]);
            setNewWeight('');
          }} style={{ padding: '10px 18px', borderRadius: 9, border: 'none', background: C.accent, color: C.white, fontWeight: 700, cursor: 'pointer' }}>+</button>
        </div>
      </div>

      {/* Recent sessions */}
      <div style={card}>
        <p style={sec}>📅 Últimas sesiones</p>
        {workouts.slice(-4).reverse().map(w => (
          <div key={w.id} style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700 }}>{w.split}</p>
              <p style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{w.date} · {w.duration}min</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: C.accent }}>⚡{w.energy}/10</p>
              <p style={{ fontSize: 10, color: C.textDim }}>{w.exercises.reduce((a, e) => a + e.sets.length, 0)} series</p>
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={card}>
        <p style={sec}>🎖 Logros</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {BADGES.map(b => (
            <div key={b.id} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
              borderRadius: 10, opacity: b.earned ? 1 : 0.45,
              background: b.earned ? `${C.accent}22` : C.bg3,
              border: `1px solid ${b.earned ? C.accent : C.border}`,
            }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: b.earned ? C.text : C.textMuted }}>{b.name}</p>
                <p style={{ fontSize: 9, color: C.textDim }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
