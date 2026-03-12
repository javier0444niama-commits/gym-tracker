// components/tabs/Workout.js
import { useState } from 'react';
import { COLORS, MES5, DAYS_ORDER } from '../lib/data';
import SessionStopwatch from './SessionStopwatch';
import RestTimer from './RestTimer';

export default function WorkoutTab({ selectedDay, setSelectedDay, workouts, setWorkouts, setTab }) {
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [currentSets, setCurrentSets] = useState([]);
  const [selectedEx, setSelectedEx] = useState('');
  const [setInput, setSetInput] = useState({ w: '', r: '' });
  const [energyLevel, setEnergyLevel] = useState(8);
  const [restPreset, setRestPreset] = useState(90);
  const C = COLORS;

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const inp = { padding: '10px 14px', borderRadius: 9, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 13, outline: 'none', width: '100%' };
  const lbl = { fontSize: 10, color: C.textMuted, marginBottom: 4, display: 'block', letterSpacing: 0.5, textTransform: 'uppercase' };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };

  const addSet = () => {
    if (!selectedEx || !setInput.r) return;
    setCurrentSets(prev => {
      const idx = prev.findIndex(e => e.name === selectedEx);
      if (idx >= 0) { const n = [...prev]; n[idx].sets.push({ w: +(setInput.w || 0), r: +setInput.r }); return n; }
      return [...prev, { name: selectedEx, sets: [{ w: +(setInput.w || 0), r: +setInput.r }] }];
    });
    setSetInput({ w: '', r: '' });
  };

  const finishWorkout = () => {
    if (!currentSets.length) return;
    const w = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      split: MES5[selectedDay]?.label.split('–')[1]?.trim() || selectedDay,
      exercises: currentSets, energy: energyLevel, duration: 75,
    };
    setWorkouts(p => [...p, w]);
    setCurrentSets([]); setActiveWorkout(false); setTab('dashboard');
  };

  if (!activeWorkout) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="fade-in">
      <div style={glow}>
        <p style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>🚀 Nueva Sesión</p>
        <label style={lbl}>Día de entrenamiento</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {DAYS_ORDER.map(d => (
            <button key={d} onClick={() => setSelectedDay(d)} style={{
              padding: '6px 12px', borderRadius: 7, cursor: 'pointer', fontWeight: 700, fontSize: 11,
              border: `1px solid ${selectedDay === d ? C.accent : C.border}`,
              background: selectedDay === d ? `${C.accent}22` : 'transparent',
              color: selectedDay === d ? C.accentBright : C.textMuted,
            }}>
              {MES5[d]?.icon} {d}
            </button>
          ))}
        </div>
        <div style={{ padding: '12px 14px', background: C.bg3, borderRadius: 10, marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.accentBright }}>{MES5[selectedDay]?.label}</p>
          <p style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{MES5[selectedDay]?.exercises.length} ejercicios · 70–90 min</p>
        </div>
        <label style={lbl}>Nivel de energía: {energyLevel}/10</label>
        <input type="range" min="1" max="10" value={energyLevel} onChange={e => setEnergyLevel(+e.target.value)}
          style={{ width: '100%', marginBottom: 16 }} />
        <button onClick={() => setActiveWorkout(true)}
          style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: C.accent, color: C.white, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
          ⚡ Iniciar Entrenamiento
        </button>
      </div>
      <div style={card}>
        <p style={sec}>⏱ Timer de Descanso</p>
        <RestTimer preset={90} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="fade-in">
      {/* Cronómetro + timer */}
      <div style={glow}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, color: C.success, letterSpacing: 1.5, textTransform: 'uppercase' }}>● Sesión activa</p>
            <p style={{ fontSize: 17, fontWeight: 800, marginTop: 2 }}>{MES5[selectedDay]?.icon} {selectedDay}</p>
          </div>
          <span style={{ fontSize: 12, color: C.textMuted }}>⚡ {energyLevel}/10</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>⏱ Tiempo sesión</p>
            <SessionStopwatch running={activeWorkout} />
          </div>
          <div style={{ width: 1, height: 130, background: C.border }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>⏳ Descanso</p>
            <RestTimer preset={restPreset} />
          </div>
        </div>
      </div>

      {/* Lista ejercicios */}
      <div style={card}>
        <p style={sec}>📋 Ejercicios del día</p>
        {MES5[selectedDay]?.exercises.map((ex, i) => {
          const logged = currentSets.find(s => s.name === ex.name);
          return (
            <div key={i} style={{ padding: '9px 0', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 5, fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: logged ? `${C.success}33` : `${C.accent}22`,
                  color: logged ? C.success : C.accent,
                }}>{logged ? '✓' : i + 1}</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: logged ? C.success : C.text }}>{ex.name}</p>
                  <p style={{ fontSize: 10, color: C.textMuted }}>{ex.sets} · ⏱{ex.restLabel}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedEx(ex.name); if (ex.rest > 0) setRestPreset(ex.rest); }}
                style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.border2}`, background: 'transparent', color: C.textMuted, cursor: 'pointer', fontSize: 10 }}>
                + Set
              </button>
            </div>
          );
        })}
      </div>

      {/* Añadir set */}
      <div style={card}>
        <p style={sec}>➕ Registrar Set</p>
        <label style={lbl}>Ejercicio</label>
        <select value={selectedEx} onChange={e => setSelectedEx(e.target.value)} style={{ ...inp, marginBottom: 10 }}>
          <option value="">Seleccionar...</option>
          {MES5[selectedDay]?.exercises.map(ex => <option key={ex.name}>{ex.name}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={lbl}>Peso (kg)</label>
            <input value={setInput.w} onChange={e => setSetInput(p => ({ ...p, w: e.target.value }))} type="number" placeholder="0" style={inp} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={lbl}>Reps</label>
            <input value={setInput.r} onChange={e => setSetInput(p => ({ ...p, r: e.target.value }))} type="number" placeholder="10" style={inp} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button onClick={addSet} style={{ padding: '10px 16px', borderRadius: 9, border: 'none', background: C.accent, color: C.white, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>+</button>
          </div>
        </div>
      </div>

      {/* Sets registrados */}
      {currentSets.length > 0 && (
        <div style={card}>
          <p style={sec}>✅ Series registradas</p>
          {currentSets.map((ex, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.accentBright, marginBottom: 5 }}>{ex.name}</p>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {ex.sets.map((set, j) => (
                  <span key={j} style={{ padding: '3px 10px', background: C.bg3, borderRadius: 6, fontSize: 11, border: `1px solid ${C.border}` }}>
                    {set.w > 0 ? `${set.w}kg × ` : ''}{set.r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={finishWorkout} style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: C.success, color: C.white, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
        ✅ Finalizar Sesión
      </button>
      <button onClick={() => { setActiveWorkout(false); setCurrentSets([]); }}
        style={{ width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${C.border2}`, background: 'transparent', color: C.white, fontWeight: 700, cursor: 'pointer' }}>
        Cancelar
      </button>
    </div>
  );
}
