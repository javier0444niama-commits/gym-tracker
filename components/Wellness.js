// components/tabs/Wellness.js
import { useState, useEffect } from 'react';
import { COLORS } from '../../lib/data';
import MiniChart from '../MiniChart';

export default function Wellness() {
  const today = new Date().toLocaleDateString('es-ES');
  const [log, setLog] = useState([]);
  const [sleep, setSleep] = useState(7.5);
  const [stress, setStress] = useState(5);
  const [water, setWater] = useState(0);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const C = COLORS;

  useEffect(() => {
    try { const l = localStorage.getItem('gym-wellness'); if (l) setLog(JSON.parse(l)); } catch {}
  }, []);

  const saveLog = () => {
    const entry = { date: today, sleep, stress, water, notes };
    const updated = [...log.filter(e => e.date !== today), entry].sort((a, b) => a.date > b.date ? -1 : 1);
    setLog(updated);
    try { localStorage.setItem('gym-wellness', JSON.stringify(updated)); } catch {}
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };
  const lbl = { fontSize: 10, color: C.textMuted, display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 };

  const sleepColor = sleep >= 7 ? C.success : sleep >= 6 ? C.warning : C.danger;
  const stressColor = stress <= 4 ? C.success : stress <= 7 ? C.warning : C.danger;
  const waterGoal = 8;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={glow}>
        <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🌙 Bienestar de Hoy</p>
        <p style={{ fontSize: 13, color: C.textMuted }}>{today}</p>
      </div>

      {/* Sleep */}
      <div style={card}>
        <p style={sec}>😴 Horas de sueño</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontSize: 36, fontWeight: 800, color: sleepColor }}>{sleep}h</p>
          <p style={{ fontSize: 11, color: sleep >= 7 ? C.success : C.warning }}>
            {sleep >= 8 ? '✅ Óptimo' : sleep >= 7 ? '👍 Bueno' : sleep >= 6 ? '⚠️ Justo' : '❌ Poco'}
          </p>
        </div>
        <input type="range" min="3" max="12" step="0.5" value={sleep} onChange={e => setSleep(+e.target.value)} style={{ width: '100%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: C.textDim, marginTop: 4 }}>
          <span>3h</span><span>7h</span><span>9h</span><span>12h</span>
        </div>
        <p style={{ fontSize: 10, color: C.textMuted, marginTop: 8 }}>💡 Meta: 7–9h para máxima síntesis proteica</p>
      </div>

      {/* Stress */}
      <div style={card}>
        <p style={sec}>🧠 Nivel de estrés</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontSize: 36, fontWeight: 800, color: stressColor }}>{stress}/10</p>
          <p style={{ fontSize: 11, color: stressColor }}>
            {stress <= 3 ? '😌 Relajado' : stress <= 5 ? '😐 Normal' : stress <= 7 ? '😰 Estresado' : '🔴 Muy alto'}
          </p>
        </div>
        <input type="range" min="1" max="10" value={stress} onChange={e => setStress(+e.target.value)} style={{ width: '100%' }} />
        {stress >= 8 && <p style={{ fontSize: 11, color: C.warning, marginTop: 8 }}>⚠️ Estrés alto puede afectar tu progreso. Considera reducir volumen hoy.</p>}
      </div>

      {/* Hydration */}
      <div style={card}>
        <p style={sec}>💧 Hidratación (vasos de agua)</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={{ fontSize: 36, fontWeight: 800, color: water >= waterGoal ? C.success : C.accent }}>{water}/{waterGoal}</p>
          <p style={{ fontSize: 11, color: water >= waterGoal ? C.success : C.textMuted }}>
            {water >= waterGoal ? '✅ Meta alcanzada!' : `Faltan ${waterGoal - water} vasos`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {Array.from({ length: waterGoal }).map((_, i) => (
            <button key={i} onClick={() => setWater(i + 1 === water ? i : i + 1)} style={{
              width: 40, height: 40, borderRadius: 10, border: `1px solid ${i < water ? C.accent : C.border}`,
              background: i < water ? `${C.accent}33` : C.bg3, cursor: 'pointer', fontSize: 18,
            }}>💧</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setWater(w => Math.max(0, w - 1))} style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', color: C.text, cursor: 'pointer', fontWeight: 700 }}>−</button>
          <button onClick={() => setWater(w => Math.min(waterGoal + 4, w + 1))} style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', background: C.accent, color: C.white, cursor: 'pointer', fontWeight: 700 }}>+ Vaso</button>
        </div>
      </div>

      {/* Notes */}
      <div style={card}>
        <p style={sec}>📝 Notas del día</p>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="¿Cómo te sentiste hoy? ¿Dolor muscular? ¿Algo especial?" rows={3}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 13, outline: 'none', resize: 'vertical' }} />
      </div>

      {/* Save */}
      <button onClick={saveLog} style={{
        width: '100%', padding: 14, borderRadius: 10, border: 'none',
        background: saved ? C.success : C.accent, color: C.white, fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'background 0.3s',
      }}>{saved ? '✅ ¡Guardado!' : '💾 Guardar registro de hoy'}</button>

      {/* History */}
      {log.length > 0 && (
        <div style={card}>
          <p style={sec}>📅 Historial bienestar</p>
          {log.slice(0, 7).map((e, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 12, color: C.textMuted }}>{e.date}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 11 }}>😴 {e.sleep}h</span>
                <span style={{ fontSize: 11 }}>🧠 {e.stress}/10</span>
                <span style={{ fontSize: 11 }}>💧 {e.water}/{waterGoal}</span>
              </div>
            </div>
          ))}
          {log.length >= 3 && (
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 6 }}>Tendencia de sueño</p>
              <MiniChart data={log.slice(0, 7).reverse().map(e => ({ weight: e.sleep }))} color={C.accent} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
