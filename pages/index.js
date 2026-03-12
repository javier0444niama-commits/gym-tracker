// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { COLORS, INITIAL_WORKOUTS, INITIAL_WEIGHTS } from '../lib/data';
import Dashboard from '../components/tabs/Dashboard';
import Routine from '../components/tabs/Routine';
import WorkoutTab from '../components/tabs/Workout';
import Progress from '../components/tabs/Progress';
import AICoach from '../components/tabs/AICoach';
import Music from '../components/tabs/Music';
import Photos from '../components/tabs/Photos';
import Wellness from '../components/tabs/Wellness';
import Challenges from '../components/tabs/Challenges';

const C = COLORS;

const MAIN_TABS = [
  { id: 'dashboard', label: '🏠', full: 'Inicio' },
  { id: 'workout',   label: '💪', full: 'Entreno' },
  { id: 'progress',  label: '📈', full: 'Stats' },
  { id: 'extras',    label: '✨', full: 'Extras' },
  { id: 'ai',        label: '🤖', full: 'Coach' },
];

const EXTRA_TABS = [
  { id: 'routine',    label: '📋 Mes 5' },
  { id: 'music',      label: '🎵 Música' },
  { id: 'photos',     label: '📸 Fotos' },
  { id: 'wellness',   label: '🌙 Bienestar' },
  { id: 'challenges', label: '🎮 Retos' },
];

export default function Home() {
  const [tab, setTab] = useState('dashboard');
  const [extraTab, setExtraTab] = useState('routine');
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [workouts, setWorkouts] = useState(INITIAL_WORKOUTS);
  const [weights, setWeights] = useState(INITIAL_WEIGHTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const sw = localStorage.getItem('gym-workouts');
      const ww = localStorage.getItem('gym-weights');
      if (sw) setWorkouts(JSON.parse(sw));
      if (ww) setWeights(JSON.parse(ww));
    } catch {}
    const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    setSelectedDay(days[new Date().getDay()] || 'Lunes');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('gym-workouts', JSON.stringify(workouts)); } catch {}
  }, [workouts, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('gym-weights', JSON.stringify(weights)); } catch {}
  }, [weights, mounted]);

  const streak = 5, xp = 640, xpMax = 1000, level = 'Intermedio';

  return (
    <>
      <Head>
        <title>Gym Tracker – Mes 5 💪</title>
        <meta name="description" content="Tu gym tracker personal – Mes 5 Hipertrofia & Estética" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#050d1a" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

        {/* HEADER */}
        <header style={{
          background: `linear-gradient(180deg,${C.bg2} 0%,${C.bg} 100%)`,
          borderBottom: `1px solid ${C.border}`,
          padding: '16px 20px 12px',
          position: 'sticky', top: 0, zIndex: 100,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase' }}>Mes 5 · Hipertrofia</p>
                <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>Gym Tracker 💪</h1>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 10, color: C.textMuted }}>Racha</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: C.accent, lineHeight: 1 }}>{streak}🔥</p>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textMuted, marginBottom: 4 }}>
                <span>⚡ {level}</span><span>{xp}/{xpMax} XP</span>
              </div>
              <div style={{ height: 5, background: C.bg3, borderRadius: 99 }}>
                <div style={{ height: '100%', width: `${(xp / xpMax) * 100}%`, background: `linear-gradient(90deg,${C.accent},${C.accentBright})`, borderRadius: 99, boxShadow: `0 0 8px ${C.accent}` }} />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px 110px' }}>

          {tab === 'extras' && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {EXTRA_TABS.map(({ id, label }) => (
                <button key={id} onClick={() => setExtraTab(id)} style={{
                  padding: '8px 12px', borderRadius: 9,
                  border: `1px solid ${extraTab === id ? C.accent : C.border}`,
                  background: extraTab === id ? `${C.accent}22` : 'transparent',
                  color: extraTab === id ? C.accentBright : C.textMuted,
                  cursor: 'pointer', fontWeight: 700, fontSize: 11,
                }}>{label}</button>
              ))}
            </div>
          )}

          {tab === 'dashboard' && <Dashboard workouts={workouts} weights={weights} setWeights={setWeights} setTab={setTab} setSelectedDay={setSelectedDay} />}
          {tab === 'workout'   && <WorkoutTab selectedDay={selectedDay} setSelectedDay={setSelectedDay} workouts={workouts} setWorkouts={setWorkouts} setTab={setTab} />}
          {tab === 'progress'  && <Progress workouts={workouts} weights={weights} />}
          {tab === 'ai'        && <AICoach workouts={workouts} weights={weights} />}

          {tab === 'extras' && extraTab === 'routine'    && <Routine setTab={setTab} setSelectedDay={setSelectedDay} />}
          {tab === 'extras' && extraTab === 'music'      && <Music />}
          {tab === 'extras' && extraTab === 'photos'     && <Photos />}
          {tab === 'extras' && extraTab === 'wellness'   && <Wellness />}
          {tab === 'extras' && extraTab === 'challenges' && <Challenges workouts={workouts} />}
        </main>

        {/* BOTTOM NAV */}
        <nav style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: C.bg2, borderTop: `1px solid ${C.border}`,
          display: 'flex', padding: '8px 8px 20px',
          backdropFilter: 'blur(16px)', zIndex: 100,
        }}>
          {MAIN_TABS.map(({ id, label, full }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer', borderRadius: 8,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: tab === id ? `${C.accent}22` : 'transparent',
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: 20 }}>{label}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: tab === id ? C.accentBright : C.textMuted }}>{full}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
