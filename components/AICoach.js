// components/tabs/AICoach.js
import { useState, useRef } from 'react';
import { COLORS } from '../lib/data';

export default function AICoach({ workouts, weights }) {
  const [aiMsg, setAiMsg] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [activeMode, setActiveMode] = useState('chat');
  const [listening, setListening] = useState(false);
  const C = COLORS;

  const currentWeight = weights[weights.length - 1]?.weight || 0;
  const weightLost = (weights[0]?.weight - currentWeight).toFixed(1);
  const streak = 5, level = 'Intermedio';

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };

  const getContext = (mode) => {
    const base = `Eres un coach experto en hipertrofia y estética corporal, Mes 5. Datos: Peso ${currentWeight}kg, pérdida ${weightLost}kg, ${workouts.length} sesiones, racha ${streak}d, nivel ${level}. Responde en español, directo y motivador.`;
    if (mode === 'meal') return base + ' Dame plan de comidas completo de un día para hipertrofia: desayuno, almuerzo, merienda, cena con cantidades específicas. 200 palabras máx.';
    if (mode === 'analysis') return base + ' Analiza mi progreso semanal. Detecta sobreentrenamiento si hay 6+ sesiones en 7 días. Da recomendaciones específicas. 150 palabras máx.';
    return base + ' Responde la pregunta. 130 palabras máx.';
  };

  const askAI = async (mode = 'chat', customMsg = null) => {
    const msg = customMsg || aiMsg;
    if (mode === 'chat' && !msg.trim()) return;
    setAiLoading(true); setAiResponse(''); setActiveMode(mode);
    const finalMsg = mode === 'meal' ? 'Dame mi plan de comidas de hoy' : mode === 'analysis' ? 'Analiza mi progreso esta semana' : msg;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 400,
          system: getContext(mode),
          messages: [{ role: 'user', content: finalMsg }],
        }),
      });
      const data = await res.json();
      setAiResponse(data.content?.[0]?.text || 'Sin respuesta.');
    } catch { setAiResponse('Error al conectar con el coach IA.'); }
    setAiLoading(false);
  };

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Usa Chrome para voz'); return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); r.lang = 'es-ES';
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onresult = e => setAiMsg(e.results[0][0].transcript);
    r.start();
  };

  const speakResponse = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 300));
    u.lang = 'es-ES'; u.rate = 1.1;
    window.speechSynthesis.speak(u);
  };

  const overtraining = workouts.filter(w => {
    const d = new Date(w.date), now = new Date();
    return (now - d) / (1000 * 60 * 60 * 24) < 7;
  }).length >= 6;

  const tags = [`⚖️ ${currentWeight}kg`, `📉 −${weightLost}kg`, `🏋️ ${workouts.length} ses.`, `🔥 Racha ${streak}d`, `⚡ ${level}`];

  const alerts = [
    ...(overtraining ? [{ icon: '⚠️', msg: '¡Posible sobreentrenamiento! 6+ sesiones en 7 días. Descansa hoy.', type: 'warning' }] : []),
    { icon: '📈', msg: 'Mes 5: momento de superar tus marcas históricas.', type: 'success' },
    { icon: '🍑', msg: 'Hip Thrust viernes: sube carga semanalmente con técnica perfecta.', type: 'info' },
    { icon: '⚠️', msg: 'Warm-up 5–10 min antes de cada sesión. Prevención = continuidad.', type: 'warning' },
    { icon: '😴', msg: '7–9h sueño = síntesis proteica máxima.', type: 'info' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={glow}>
        <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🤖 Coach IA – Mes 5</p>
        <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Powered by Claude · Hipertrofia & Estética</p>

        {/* Context */}
        <div style={{ padding: '12px 14px', background: C.bg3, borderRadius: 10, marginBottom: 16 }}>
          <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 8, letterSpacing: 1.5, textTransform: 'uppercase' }}>Tu contexto</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {tags.map((t, i) => <span key={i} style={{ padding: '3px 8px', background: C.bg, borderRadius: 5, border: `1px solid ${C.border}`, fontSize: 11, color: C.textMuted }}>{t}</span>)}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <button onClick={() => askAI('meal')} disabled={aiLoading} style={{ flex: 1, padding: '11px 6px', borderRadius: 10, border: `1px solid ${activeMode === 'meal' ? C.success : C.border}`, background: activeMode === 'meal' ? `${C.success}22` : C.bg3, color: C.text, cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>
            🍎 Plan comidas
          </button>
          <button onClick={() => askAI('analysis')} disabled={aiLoading} style={{ flex: 1, padding: '11px 6px', borderRadius: 10, border: `1px solid ${activeMode === 'analysis' ? C.warning : C.border}`, background: activeMode === 'analysis' ? `${C.warning}22` : C.bg3, color: C.text, cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>
            📊 Mi semana
          </button>
        </div>

        {/* Input + voice */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <textarea value={aiMsg} onChange={e => setAiMsg(e.target.value)} rows={3}
            placeholder="Pregúntale a tu coach... ej: '¿Cuándo hacer deload?'"
            style={{ width: '100%', padding: '12px 50px 12px 14px', borderRadius: 10, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 13, outline: 'none', resize: 'vertical' }} />
          <button onClick={startVoice} title="Hablar" style={{
            position: 'absolute', right: 10, top: 10, width: 32, height: 32, borderRadius: '50%',
            border: 'none', background: listening ? C.danger : C.accent, cursor: 'pointer', fontSize: 14,
          }}>{listening ? '⏹' : '🎤'}</button>
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {['¿Cuándo deload?', 'Mejorar glúteos', 'Técnica dominadas', '¿Subir volumen?'].map(q => (
            <button key={q} onClick={() => setAiMsg(q)} style={{ padding: '5px 10px', borderRadius: 6, border: `1px solid ${C.border}`, background: 'transparent', color: C.textMuted, cursor: 'pointer', fontSize: 11 }}>{q}</button>
          ))}
        </div>

        <button onClick={() => askAI('chat')} disabled={aiLoading || !aiMsg.trim()}
          style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: C.accent, color: C.white, fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: aiLoading || !aiMsg.trim() ? 0.6 : 1 }}>
          {aiLoading ? '⏳ Analizando...' : '🚀 Preguntar al Coach'}
        </button>

        {aiResponse && (
          <div style={{ marginTop: 16, padding: 16, background: `${C.accent}11`, border: `1px solid ${C.accent}44`, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <p style={{ fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: 1 }}>💬 COACH IA</p>
              <button onClick={() => speakResponse(aiResponse)} style={{ padding: '3px 10px', borderRadius: 6, border: `1px solid ${C.border}`, background: 'transparent', color: C.textMuted, cursor: 'pointer', fontSize: 11 }}>🔊 Escuchar</button>
            </div>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{aiResponse}</p>
          </div>
        )}
      </div>

      <div style={card}>
        <p style={sec}>⚡ Alertas Automáticas</p>
        {alerts.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: a.type === 'warning' ? C.warning : a.type === 'success' ? C.success : C.textMuted }}>{a.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
