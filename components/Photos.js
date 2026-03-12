// components/tabs/Photos.js
import { useState, useRef, useEffect } from 'react';
import { COLORS } from '../../lib/data';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [view, setView] = useState('gallery'); // gallery | compare
  const [compare, setCompare] = useState([null, null]);
  const fileRef = useRef();
  const C = COLORS;

  useEffect(() => {
    try { const p = localStorage.getItem('gym-photos'); if (p) setPhotos(JSON.parse(p)); } catch {}
  }, []);

  const savePhotos = (p) => {
    setPhotos(p);
    try { localStorage.setItem('gym-photos', JSON.stringify(p)); } catch {}
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newPhoto = {
        id: Date.now(),
        date: new Date().toLocaleDateString('es-ES'),
        url: ev.target.result,
        note: '',
        weight: '',
      };
      savePhotos(prev => [...prev, newPhoto]);
    };
    reader.readAsDataURL(file);
  };

  const deletePhoto = (id) => savePhotos(photos.filter(p => p.id !== id));

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20 };
  const glow = { ...card, border: `1px solid ${C.accent}55`, boxShadow: `0 0 32px ${C.accentGlow}` };
  const sec = { fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: 1.5, textTransform: 'uppercase' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={glow}>
        <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>📸 Fotos de Progreso</p>
        <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Documenta tu transformación semana a semana</p>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        <button onClick={() => fileRef.current?.click()} style={{
          width: '100%', padding: 14, borderRadius: 10, border: 'none',
          background: C.accent, color: C.white, fontWeight: 800, fontSize: 14, cursor: 'pointer',
        }}>📷 Tomar / Subir foto de hoy</button>
      </div>

      {/* View toggle */}
      {photos.length > 0 && (
        <div style={{ display: 'flex', gap: 8 }}>
          {['gallery', 'compare'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${view === v ? C.accent : C.border}`,
              background: view === v ? `${C.accent}22` : 'transparent',
              color: view === v ? C.accentBright : C.textMuted, cursor: 'pointer', fontWeight: 700, fontSize: 12,
            }}>{v === 'gallery' ? '🖼 Galería' : '⚖️ Comparar'}</button>
          ))}
        </div>
      )}

      {/* Gallery */}
      {view === 'gallery' && (
        <div style={card}>
          <p style={sec}>🗓 Historial de fotos</p>
          {photos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: C.textMuted }}>
              <p style={{ fontSize: 40 }}>📷</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Aún no tienes fotos</p>
              <p style={{ fontSize: 11, marginTop: 4 }}>Sube tu primera foto para empezar a rastrear tu progreso</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {photos.map(p => (
                <div key={p.id} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                  <img src={p.url} alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 8px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                    <p style={{ fontSize: 10, color: C.white, fontWeight: 700 }}>{p.date}</p>
                    {p.weight && <p style={{ fontSize: 9, color: C.success }}>{p.weight}kg</p>}
                  </div>
                  <button onClick={() => deletePhoto(p.id)} style={{
                    position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: '50%',
                    border: 'none', background: 'rgba(0,0,0,0.6)', color: C.white, cursor: 'pointer', fontSize: 12,
                  }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Compare */}
      {view === 'compare' && photos.length >= 2 && (
        <div style={card}>
          <p style={sec}>⚖️ Comparativa antes / después</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ flex: 1 }}>
                <p style={{ fontSize: 10, color: C.textMuted, marginBottom: 6 }}>{i === 0 ? '⬅ Antes' : '➡ Después'}</p>
                <select value={compare[i] ?? ''} onChange={e => {
                  const nc = [...compare]; nc[i] = +e.target.value; setCompare(nc);
                }} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: `1px solid ${C.border2}`, background: C.bg3, color: C.text, fontSize: 11 }}>
                  <option value="">Seleccionar...</option>
                  {photos.map(p => <option key={p.id} value={p.id}>{p.date}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {compare.map((id, i) => {
              const p = photos.find(ph => ph.id === id);
              return (
                <div key={i} style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}`, minHeight: 150, background: C.bg3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p ? <img src={p.url} alt="" style={{ width: '100%', display: 'block' }} />
                    : <p style={{ color: C.textDim, fontSize: 12 }}>Sin foto</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
