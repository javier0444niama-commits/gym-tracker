// components/tabs/Challenges.js
import { useState } from 'react';
import { COLORS } from '../../lib/data';

const WEEKLY_MISSIONS = [
  { id: 1, icon: '🔥', title: '5 sesiones esta semana', xp: 200, progress: 3, total: 5 },
  { id: 2, icon: '💪', title: 'Supera tu PR en press inclinado', xp: 150, progress: 0, total: 1 },
  { id: 3, icon: '😴', title: '7h+ de sueño 3 días seguidos', xp: 100, progress: 1, total: 3 },
  { id: 4, icon: '💧', title: 'Toma 8 vasos de agua 5 días', xp: 75, progress: 2, total: 5 },
  { id: 5, icon: '🧘', title: 'Completa la sesión de yoga', xp: 50, progress: 0, total: 1 },
  { id: 6, icon: '📸', title: 'Sube tu foto de progreso', xp: 50, progress: 0, total: 1 },
];

const MET_VALUES = {
  'Fuerza (moderado)': 3.5,
  'Fuerza (intenso)': 5.0,
  'Cardio (moderado)': 7.0,
  'Cardio (intenso)': 10.0,
  'Yoga / Movilidad': 2.5,
};

const MUSCLE_COLORS = {
  pecho: '#1e6fff', espalda: '#1ec87a', piernas: '#f0a500',
  hombros: '#9b59b6', brazos: '#e74c3c', core: '#1abc9c',
};

export default function Challenges({ workouts }) {
  const [rmWeight, setRmWeight] = useState('');
  const [rmReps, setRmReps] = useState('');
  const [bodyWeight, setBodyWeight] = useState('75');
  const [duration, setDuration] = useState('60');
  const [activity, setActivity] = useState('Fuerza (intenso)');
  const [missions, setMissions] = useState(WEEKLY_MISSIONS);
  const C = COLORS;

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };
  const inp = { padding: '10px 14px', borderRadius: 9, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 13, outline: 'none', width: '100%' };

  // 1RM Epley formula
  const rm1 = rmWeight && rmReps ? Math.round(+rmWeight * (1 + +rmReps / 30)) : null;

  // Calories
  const cals = bodyWeight && duration ? Math.round((MET_VALUES[activity] * +bodyWeight * +duration) / 60) : null;

  // Muscle frequency from workouts
  const muscleMap = { pecho: 0, espalda: 0, piernas: 0, hombros: 0, brazos: 0, core: 0 };
  workouts.forEach(w => {
    const s = w.split?.toLowerCase() || '';
    if (s.includes('pecho') || s.includes('tríceps')) muscleMap.pecho++;
    if (s.includes('espalda') || s.includes('bíceps')) muscleMap.espalda++;
    if (s.includes('piernas') || s.includes('glúteos')) muscleMap.piernas++;
    if (s.includes('hombros')) muscleMap.hombros++;
    if (s.includes('bíceps') || s.includes('tríceps')) muscleMap.brazos++;
    if (s.includes('core') || s.includes('cintura')) muscleMap.core++;
  });
  const maxMuscle = Math.max(...Object.values(muscleMap), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={glow}>
        <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🎮 Retos & Herramientas</p>
        <p style={{ fontSize: 13, color: C.textMuted }}>Misiones semanales, calculadoras y más</p>
      </div>

      {/* Weekly missions */}
      <div style={card}>
        <p style={sec}>🎯 Misiones de la semana</p>
        {missions.map(m => (
          <div key={m.id} style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: m.progress >= m.total ? C.success : C.text }}>{m.title}</p>
                  <p style={{ fontSize: 10, color: C.accent }}>+{m.xp} XP</p>
                </div>
              </div>
              <span style={{ fontSize: 11, color: C.textMuted }}>{m.progress}/{m.total}</span>
            </div>
            <div style={{ height: 5, background: C.bg3, borderRadius: 99 }}>
              <div style={{
                height: '100%', borderRadius: 99, transition: 'width 0.3s',
                width: `${(m.progress / m.total) * 100}%`,
                background: m.progress >= m.total ? `linear-gradient(90deg,${C.success},#52ff9a)` : `linear-gradient(90deg,${C.accent},${C.accentBright})`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Muscle map */}
      <div style={card}>
        <p style={sec}>🗺 Mapa muscular – Frecuencia</p>
        <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 14 }}>Músculos más trabajados este mes</p>
        {Object.entries(muscleMap).map(([muscle, count]) => (
          <div key={muscle} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
              <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>{muscle}</span>
              <span style={{ color: C.textMuted }}>{count} sesiones</span>
            </div>
            <div style={{ height: 8, background: C.bg3, borderRadius: 99 }}>
              <div style={{
                height: '100%', width: `${(count / maxMuscle) * 100}%`,
                background: MUSCLE_COLORS[muscle], borderRadius: 99, transition: 'width 0.5s',
                boxShadow: count === maxMuscle ? `0 0 8px ${MUSCLE_COLORS[muscle]}` : 'none',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* 1RM Calculator */}
      <div style={card}>
        <p style={sec}>🏋️ Calculadora 1RM (fórmula Epley)</p>
        <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 14 }}>Estima tu repetición máxima sin necesidad de llegar al fallo</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>PESO (kg)</p>
            <input value={rmWeight} onChange={e => setRmWeight(e.target.value)} type="number" placeholder="ej: 80" style={inp} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>REPS</p>
            <input value={rmReps} onChange={e => setRmReps(e.target.value)} type="number" placeholder="ej: 8" style={inp} />
          </div>
        </div>
        {rm1 && (
          <div style={{ padding: 16, background: `${C.accent}15`, borderRadius: 12, border: `1px solid ${C.accent}44`, textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>TU 1RM ESTIMADO</p>
            <p style={{ fontSize: 40, fontWeight: 800, color: C.accentBright }}>{rm1} kg</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
              {[
                ['90%', Math.round(rm1 * 0.9)],
                ['80%', Math.round(rm1 * 0.8)],
                ['70%', Math.round(rm1 * 0.7)],
                ['60%', Math.round(rm1 * 0.6)],
              ].map(([pct, kg]) => (
                <div key={pct} style={{ padding: '4px 10px', background: C.bg3, borderRadius: 7, border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 9, color: C.textMuted }}>{pct}</p>
                  <p style={{ fontSize: 12, fontWeight: 800 }}>{kg}kg</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Calorie calculator */}
      <div style={card}>
        <p style={sec}>🔥 Calculadora de calorías quemadas</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>PESO (kg)</p>
            <input value={bodyWeight} onChange={e => setBodyWeight(e.target.value)} type="number" style={inp} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>DURACIÓN (min)</p>
            <input value={duration} onChange={e => setDuration(e.target.value)} type="number" style={inp} />
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>TIPO DE ACTIVIDAD</p>
          <select value={activity} onChange={e => setActivity(e.target.value)} style={{ ...inp }}>
            {Object.keys(MET_VALUES).map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
        {cals && (
          <div style={{ padding: 16, background: `${C.warning}15`, borderRadius: 12, border: `1px solid ${C.warning}44`, textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>CALORÍAS ESTIMADAS</p>
            <p style={{ fontSize: 40, fontWeight: 800, color: C.warning }}>{cals} kcal</p>
            <p style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>≈ {Math.round(cals / 4)}g de proteína necesaria post-entreno</p>
          </div>
        )}
      </div>

    </div>
  );
}
