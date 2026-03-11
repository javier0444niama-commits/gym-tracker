// components/tabs/AICoach.js
import { useState } from 'react';
import { COLORS } from '../../lib/data';

export default function AICoach({ workouts, weights }) {
  const [aiMsg, setAiMsg] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const C = COLORS;

  const currentWeight = weights[weights.length - 1]?.weight || 0;
  const weightLost = (weights[0]?.weight - currentWeight).toFixed(1);
  const streak = 5, level = 'Intermedio';

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };

  const askAI = async () => {
    if (!aiMsg.trim()) return;
    setAiLoading(true); setAiResponse('');
    const ctx = `Eres un coach experto en hipertrofia y estética corporal, Mes 5 de entrenamiento. Datos del usuario: Peso ${currentWeight}kg, pérdida total ${weightLost}kg, ${workouts.length} sesiones, racha ${streak} días, nivel ${level}. Rutina: Mes 5 énfasis hipertrofia y estética. Responde en español, directo y motivador. Máximo 130 palabras.`;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 300,
          system: ctx,
          messages: [{ role: 'user', content: aiMsg }],
        }),
      });
      const data = await res.json();
      setAiResponse(data.content?.[0]?.text || 'Sin respuesta.');
    } catch { setAiResponse('Error al conectar con el coach IA.'); }
    setAiLoading(false);
  };

  const tags = [
    `⚖️ ${currentWeight}kg`, `📉 −${weightLost}kg`,
    `🏋️ ${workouts.length} sesiones`, `🔥 Racha ${streak}d`,
    `⚡ ${level}`, `📅 Mes 5`,
  ];

  const alerts = [
    { icon: '📈', msg: 'Mes 5: consolida tu mayor PR. Es el momento de superar tus marcas históricas.', type: 'success' },
    { icon: '🍑', msg: 'Hip Thrust es estrella del viernes. Sube carga semanalmente con técnica perfecta.', type: 'info' },
    { icon: '⚠️', msg: 'Recuerda warm-up 5–10 min antes de cada sesión. Prevención = continuidad.', type: 'warning' },
    { icon: '😴', msg: '7–9h de sueño = síntesis proteica máxima. No lo descuides.', type: 'info' },
    { icon: '🧘', msg: 'El sábado de yoga no es opcional: reduce lesiones y mejora el rendimiento.', type: 'info' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="fade-in">
      <div style={glow}>
        <p style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>🤖 Coach IA – Mes 5</p>
        <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Powered by Claude · Hipertrofia & Estética</p>

        <div style={{ padding: '12px 14px', background: C.bg3, borderRadius: 10, marginBottom: 16 }}>
          <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 8, letterSpacing: 1.5, textTransform: 'uppercase' }}>Tu contexto</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {tags.map((t, i) => (
              <span key={i} style={{ padding: '3px 8px', background: C.bg, borderRadius: 5, border: `1px solid ${C.border}`, fontSize: 11, color: C.textMuted }}>{t}</span>
            ))}
          </div>
        </div>

        <textarea value={aiMsg} onChange={e => setAiMsg(e.target.value)} rows={3}
          placeholder="Pregúntale a tu coach... ej: '¿Cómo progresar en hip thrust?' o '¿Cuándo hacer deload?'"
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 13, outline: 'none', resize: 'vertical', marginBottom: 10 }} />

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {['¿Cuándo hacer deload?', '¿Cómo mejorar glúteos?', 'Técnica de dominadas', '¿Debo subir volumen?'].map(q => (
            <button key={q} onClick={() => setAiMsg(q)}
              style={{ padding: '5px 10px', borderRadius: 6, border: `1px solid ${C.border}`, background: 'transparent', color: C.textMuted, cursor: 'pointer', fontSize: 11 }}>{q}</button>
          ))}
        </div>

        <button onClick={askAI} disabled={aiLoading}
          style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: C.accent, color: C.white, fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: aiLoading ? 0.6 : 1 }}>
          {aiLoading ? '⏳ Analizando...' : '🚀 Preguntar al Coach'}
        </button>

        {aiResponse && (
          <div style={{ marginTop: 16, padding: 16, background: `${C.accent}11`, border: `1px solid ${C.accent}44`, borderRadius: 12 }}>
            <p style={{ fontSize: 10, color: C.accent, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>💬 COACH IA</p>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{aiResponse}</p>
          </div>
        )}
      </div>

      <div style={card}>
        <p style={sec}>⚡ Alertas Automáticas – Mes 5</p>
        {alerts.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <p style={{
              fontSize: 13, lineHeight: 1.6,
              color: a.type === 'warning' ? C.warning : a.type === 'success' ? C.success : C.textMuted,
            }}>{a.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
