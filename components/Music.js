// components/tabs/Music.js
import { useState } from 'react';
import { COLORS } from '../../lib/data';

const PLAYLISTS = {
  Lunes:    { label: "Pecho + Tríceps 💪", id: "37i9dQZF1DX76Wlfdnj7AP", vibe: "Beast Mode", bpm: "140–160 BPM" },
  Martes:   { label: "Espalda + Bíceps 🏋️", id: "37i9dQZF1DX0HRj9P7NxeE", vibe: "Power", bpm: "130–150 BPM" },
  Miércoles:{ label: "Piernas Cuádriceps 🦵", id: "37i9dQZF1DXdxcBWuJkbcy", vibe: "Heavy Legs", bpm: "150–170 BPM" },
  Jueves:   { label: "Hombros + Cintura 🏔️", id: "37i9dQZF1DX1g0iEXLFycr", vibe: "Focus", bpm: "125–145 BPM" },
  Viernes:  { label: "Piernas Glúteos 🍑", id: "37i9dQZF1DWUVpAXiEPK8P", vibe: "Glute Burn", bpm: "120–140 BPM" },
  Sábado:   { label: "Yoga & Movilidad 🧘", id: "37i9dQZF1DX9uKNf5jGX6m", vibe: "Chill Flow", bpm: "60–90 BPM" },
  Domingo:  { label: "Cardio Running 🏃", id: "37i9dQZF1DWZeKCadgRdKQ", vibe: "Run Mode", bpm: "145–175 BPM" },
};

const LOFI_STREAMS = [
  { name: "Lo-fi Hip Hop 24/7", url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1", emoji: "🎵" },
  { name: "Chill Beats Gym", url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1", emoji: "🎧" },
  { name: "Dark Phonk", url: "https://www.youtube.com/embed/6qZGKPADa5Y?autoplay=1", emoji: "🔥" },
  { name: "Motivational Mix", url: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0", emoji: "💪" },
];

export default function Music() {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [lofiActive, setLofiActive] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const C = COLORS;

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880; osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(); osc.stop(ctx.currentTime + 0.4);
    } catch {}
  };

  const pl = PLAYLISTS[selectedDay];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div style={glow}>
        <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🎵 Música & Ambiente</p>
        <p style={{ fontSize: 13, color: C.textMuted }}>Playlists por día + Lo-fi para entrenar con flow</p>
      </div>

      {/* Playlist por día */}
      <div style={card}>
        <p style={sec}>🎧 Playlist por día de entrenamiento</p>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
          {Object.keys(PLAYLISTS).map(d => (
            <button key={d} onClick={() => setSelectedDay(d)} style={{
              padding: '6px 10px', borderRadius: 7, cursor: 'pointer', fontSize: 10, fontWeight: 700,
              border: `1px solid ${selectedDay === d ? C.accent : C.border}`,
              background: selectedDay === d ? `${C.accent}22` : 'transparent',
              color: selectedDay === d ? C.accentBright : C.textMuted,
            }}>{d}</button>
          ))}
        </div>

        <div style={{ padding: 16, background: C.bg3, borderRadius: 12, marginBottom: 14 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: C.accentBright, marginBottom: 4 }}>{pl.label}</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: C.success, padding: '2px 8px', background: `${C.success}22`, borderRadius: 5 }}>🎵 {pl.vibe}</span>
            <span style={{ fontSize: 11, color: C.warning, padding: '2px 8px', background: `${C.warning}22`, borderRadius: 5 }}>⚡ {pl.bpm}</span>
          </div>
          <a href={`https://open.spotify.com/playlist/${pl.id}`} target="_blank" rel="noreferrer"
            style={{ display: 'block', width: '100%', padding: 12, borderRadius: 10, background: '#1DB954', color: '#000', fontWeight: 800, fontSize: 14, textAlign: 'center', textDecoration: 'none' }}>
            ▶ Abrir en Spotify
          </a>
        </div>

        {/* Spotify embed */}
        <iframe
          src={`https://open.spotify.com/embed/playlist/${pl.id}?utm_source=generator&theme=0`}
          width="100%" height="152" frameBorder="0" allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          style={{ borderRadius: 12 }} loading="lazy"
        />
      </div>

      {/* Lo-fi player */}
      <div style={card}>
        <p style={sec}>🌊 Lo-fi / Música de fondo</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LOFI_STREAMS.map((s, i) => (
            <button key={i} onClick={() => setLofiActive(lofiActive === i ? null : i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderRadius: 10, cursor: 'pointer', border: `1px solid ${lofiActive === i ? C.accent : C.border}`,
                background: lofiActive === i ? `${C.accent}22` : C.bg3, color: C.text, textAlign: 'left',
              }}>
              <span style={{ fontSize: 22 }}>{s.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 18 }}>{lofiActive === i ? '⏸' : '▶'}</span>
            </button>
          ))}
        </div>
        {lofiActive !== null && (
          <div style={{ marginTop: 12, borderRadius: 10, overflow: 'hidden' }}>
            <iframe width="100%" height="80" src={LOFI_STREAMS[lofiActive].url}
              frameBorder="0" allow="autoplay; encrypted-media" style={{ borderRadius: 10 }} />
          </div>
        )}
      </div>

      {/* Sonido al completar set */}
      <div style={card}>
        <p style={sec}>🔔 Sonido al completar set</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700 }}>Beep al registrar set</p>
            <p style={{ fontSize: 11, color: C.textMuted }}>Suena cada vez que añades un set completado</p>
          </div>
          <button onClick={() => setSoundEnabled(s => !s)} style={{
            width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
            background: soundEnabled ? C.accent : C.border, position: 'relative', transition: 'background 0.2s',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', background: C.white,
              position: 'absolute', top: 3, transition: 'left 0.2s',
              left: soundEnabled ? 24 : 4,
            }} />
          </button>
        </div>
        <button onClick={playBeep} style={{
          width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${C.border}`,
          background: C.bg3, color: C.text, cursor: 'pointer', fontSize: 13, fontWeight: 700,
        }}>🔊 Probar sonido</button>
      </div>

    </div>
  );
}
