// components/Settings.js
import { useState, useEffect } from 'react';
import { COLORS, MES5, DAYS_ORDER } from '../lib/data';

export default function Settings({ workouts, setWorkouts, weights, setWeights }) {
  const [section, setSection] = useState('perfil');
  const [saved, setSaved] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [perfil, setPerfil] = useState({ nombre: '', objetivo: '', nivel: 'Intermedio', mes: '5' });
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newWeight, setNewWeight] = useState('');
  const [rutina, setRutina] = useState(MES5);

  const C = COLORS;

  useEffect(() => {
    try {
      const p = localStorage.getItem('gym-perfil');
      if (p) setPerfil(JSON.parse(p));
      const r = localStorage.getItem('gym-rutina');
      if (r) setRutina(JSON.parse(r));
    } catch {}
  }, []);

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const savePerfil = () => {
    try { localStorage.setItem('gym-perfil', JSON.stringify(perfil)); } catch {}
    flash();
  };

  const saveRutina = () => {
    try { localStorage.setItem('gym-rutina', JSON.stringify(rutina)); } catch {}
    flash();
  };

  const addWeight = () => {
    if (!newWeight) return;
    const updated = [...weights.filter(w => w.date !== newDate), { date: newDate, weight: +newWeight }]
      .sort((a, b) => a.date > b.date ? 1 : -1);
    setWeights(updated);
    setNewWeight('');
    flash();
  };

  const removeWeight = (date) => setWeights(weights.filter(w => w.date !== date));

  const updateExercise = (idx, field, value) => {
    const updated = JSON.parse(JSON.stringify(rutina));
    updated[selectedDay].exercises[idx] = { ...updated[selectedDay].exercises[idx], [field]: value };
    setRutina(updated);
  };

  const removeExercise = (idx) => {
    const updated = JSON.parse(JSON.stringify(rutina));
    updated[selectedDay].exercises = updated[selectedDay].exercises.filter((_, i) => i !== idx);
    setRutina(updated);
  };

  const addExercise = () => {
    const updated = JSON.parse(JSON.stringify(rutina));
    updated[selectedDay].exercises.push({ name: 'Nuevo ejercicio', sets: '3×10', rest: 60, restLabel: '60s', tip: '' });
    setRutina(updated);
  };

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };
  const inp = { width: '100%', padding: '11px 14px', borderRadius: 9, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 13, outline: 'none' };
  const smallInp = { padding: '7px 10px', borderRadius: 7, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 12, outline: 'none', width: '100%' };

  const SECTIONS = [
    { id: 'perfil', label: '👤 Perfil' },
    { id: 'pesos', label: '⚖️ Mis pesos' },
    { id: 'historial', label: '🏋️ Historial' },
    { id: 'rutina', label: '📋 Mi rutina' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={glow}>
        <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>⚙️ Configuración</p>
        <p style={{ fontSize: 13, color: C.textMuted }}>Edita tu perfil, pesos, rutina e historial</p>
      </div>

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {SECTIONS.map(({ id, label }) => (
          <button key={id} onClick={() => setSection(id)} style={{
            padding: '8px 12px', borderRadius: 9, cursor: 'pointer', fontWeight: 700, fontSize: 11,
            border: `1px solid ${section === id ? C.accent : C.border}`,
            background: section === id ? `${C.accent}22` : 'transparent',
            color: section === id ? C.accentBright : C.textMuted,
          }}>{label}</button>
        ))}
      </div>

      {/* PERFIL */}
      {section === 'perfil' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={card}>
            <p style={sec}>👤 Tu perfil</p>
            {[
              { label: 'Tu nombre', key: 'nombre', placeholder: 'ej: Javier' },
              { label: 'Objetivo', key: 'objetivo', placeholder: 'ej: Ganar músculo, perder grasa' },
              { label: 'Mes actual', key: 'mes', placeholder: 'ej: 5' },
            ].map(({ label, key, placeholder }) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
                <input value={perfil[key] || ''} onChange={e => setPerfil(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder} style={inp} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Nivel</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Principiante', 'Intermedio', 'Avanzado'].map(n => (
                  <button key={n} onClick={() => setPerfil(p => ({ ...p, nivel: n }))} style={{
                    flex: 1, padding: '9px 6px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 700,
                    border: `1px solid ${perfil.nivel === n ? C.accent : C.border}`,
                    background: perfil.nivel === n ? `${C.accent}22` : 'transparent',
                    color: perfil.nivel === n ? C.accentBright : C.textMuted,
                  }}>{n}</button>
                ))}
              </div>
            </div>
            <button onClick={savePerfil} style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', background: saved ? C.success : C.accent, color: C.white, fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'background 0.3s' }}>
              {saved ? '✅ ¡Guardado!' : '💾 Guardar perfil'}
            </button>
          </div>

          <div style={{ ...card, border: `1px solid ${C.danger}44` }}>
            <p style={{ ...sec, color: C.danger }}>⚠️ Zona de reinicio</p>
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>Borra todos los datos y empieza desde cero</p>
            <button onClick={() => {
              if (confirm('¿Seguro? Se borrarán TODOS los datos')) {
                ['gym-workouts','gym-weights','gym-perfil','gym-rutina','gym-wellness','gym-photos'].forEach(k => {
                  try { localStorage.removeItem(k); } catch {}
                });
                window.location.reload();
              }
            }} style={{ width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${C.danger}`, background: `${C.danger}15`, color: C.danger, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              🗑️ Borrar todos los datos
            </button>
          </div>
        </div>
      )}

      {/* PESOS */}
      {section === 'pesos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={card}>
            <p style={sec}>➕ Añadir registro de peso</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>FECHA</p>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>PESO (kg)</p>
                <input type="number" step="0.1" value={newWeight} onChange={e => setNewWeight(e.target.value)} placeholder="ej: 75.5" style={inp} />
              </div>
            </div>
            <button onClick={addWeight} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: saved ? C.success : C.accent, color: C.white, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
              {saved ? '✅ ¡Guardado!' : '➕ Añadir peso'}
            </button>
          </div>

          <div style={card}>
            <p style={sec}>📅 Historial de pesos</p>
            {weights.length === 0 ? (
              <p style={{ color: C.textMuted, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Sin registros aún</p>
            ) : [...weights].reverse().map((w, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{w.weight} kg</p>
                  <p style={{ fontSize: 10, color: C.textMuted }}>{w.date}</p>
                </div>
                <button onClick={() => removeWeight(w.date)} style={{ padding: '5px 10px', borderRadius: 7, border: `1px solid ${C.danger}44`, background: `${C.danger}15`, color: C.danger, cursor: 'pointer', fontSize: 12 }}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HISTORIAL */}
      {section === 'historial' && (
        <div style={card}>
          <p style={sec}>🏋️ Historial de entrenamientos</p>
          {workouts.length === 0 ? (
            <p style={{ color: C.textMuted, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Sin entrenamientos registrados</p>
          ) : [...workouts].reverse().map((w, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{w.split}</p>
                  <p style={{ fontSize: 10, color: C.textMuted }}>{w.date} · {w.duration}min · ⚡{w.energy}/10</p>
                </div>
                <button onClick={() => {
                  if (confirm('¿Borrar este entrenamiento?'))
                    setWorkouts(workouts.filter(ww => ww.id !== w.id));
                }} style={{ padding: '5px 10px', borderRadius: 7, border: `1px solid ${C.danger}44`, background: `${C.danger}15`, color: C.danger, cursor: 'pointer', fontSize: 12 }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RUTINA */}
      {section === 'rutina' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {DAYS_ORDER.map(d => (
              <button key={d} onClick={() => setSelectedDay(d)} style={{
                padding: '7px 10px', borderRadius: 7, cursor: 'pointer', fontSize: 10, fontWeight: 700,
                border: `1px solid ${selectedDay === d ? C.accent : C.border}`,
                background: selectedDay === d ? `${C.accent}22` : 'transparent',
                color: selectedDay === d ? C.accentBright : C.textMuted,
              }}>{d}</button>
            ))}
          </div>

          <div style={card}>
            <p style={sec}>✏️ {selectedDay} — {rutina[selectedDay]?.exercises?.length || 0} ejercicios</p>
            {(rutina[selectedDay]?.exercises || []).map((ex, idx) => (
              <div key={idx} style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p style={{ fontSize: 10, color: C.textMuted }}>EJERCICIO {idx + 1}</p>
                  <button onClick={() => removeExercise(idx)} style={{ padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.danger}44`, background: `${C.danger}15`, color: C.danger, cursor: 'pointer', fontSize: 11 }}>🗑️ Quitar</button>
                </div>
                <input value={ex.name} onChange={e => updateExercise(idx, 'name', e.target.value)}
                  style={{ ...smallInp, marginBottom: 7, fontWeight: 700 }} placeholder="Nombre del ejercicio" />
                <div style={{ display: 'flex', gap: 7 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 9, color: C.textMuted, marginBottom: 3 }}>SERIES×REPS</p>
                    <input value={ex.sets} onChange={e => updateExercise(idx, 'sets', e.target.value)} style={smallInp} placeholder="ej: 4×10" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 9, color: C.textMuted, marginBottom: 3 }}>DESCANSO</p>
                    <input value={ex.restLabel} onChange={e => updateExercise(idx, 'restLabel', e.target.value)} style={smallInp} placeholder="ej: 90s" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addExercise} style={{ width: '100%', padding: 11, borderRadius: 10, border: `1px dashed ${C.accent}`, background: `${C.accent}11`, color: C.accentBright, cursor: 'pointer', fontWeight: 700, fontSize: 13, marginTop: 12 }}>
              ➕ Añadir ejercicio
            </button>
          </div>

          <button onClick={saveRutina} style={{ width: '100%', padding: 13, borderRadius: 10, border: 'none', background: saved ? C.success : C.accent, color: C.white, fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'background 0.3s' }}>
            {saved ? '✅ ¡Rutina guardada!' : '💾 Guardar rutina'}
          </button>
        </div>
      )}

    </div>
  );
}
