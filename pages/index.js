// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { COLORS, INITIAL_WORKOUTS, INITIAL_WEIGHTS, DAYS_ORDER } from '../lib/data';
import Dashboard from '../components/tabs/Dashboard';
import Routine from '../components/tabs/Routine';
import WorkoutTab from '../components/tabs/Workout';
import Progress from '../components/tabs/Progress';
import AICoach from '../components/tabs/AICoach';

const C = COLORS;

export default function Home() {
  const [tab, setTab] = useState('dashboard');
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [workouts, setWorkouts] = useState(INITIAL_WORKOUTS);
  const [weights, setWeights] = useState(INITIAL_WEIGHTS);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    setMounted(true);
    try {
      const sw = localStorage.getItem('gym-workouts');
      const ww = localStorage.getItem('gym-weights');
      if (sw) setWorkouts(JSON.parse(sw));
      if (ww) setWeights(JSON.parse(ww));
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('gym-workouts', JSON.stringify(workouts));
    } catch {}
  }, [workouts, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('gym-weights', JSON.stringify(weights));
    } catch {}
  }, [weights, mounted]);

  const streak = 5, level = 'Intermedio', xp = 640, xpMax = 1000;

  const tabs = [
    { id: 'dashboard', label: '🏠 Inicio' },
    { id: 'routine',   label: '📋 Mes 5' },
    { id: 'workout',   label: '💪 Entreno' },
    { id: 'progress',  label: '📈 Progreso' },
    { id: 'ai',        label: '🤖 Coach' },
  ];

  return (
    <>
      <Head>
        <title>Gym Tracker – Mes 5</title>
        <meta name="description" content="Tu gym tracker personal – Mes 5 Hipertrofia & Estética" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#050d1a" />
        <link rel="icon" href="/favicon.ico" />
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

        {/* HEADER */}
        <header style={{
          background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`,
          borderBottom: `1px solid ${C.border}`,
          padding: '18px 20px 14px',
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
            {/* XP bar */}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textMuted, marginBottom: 5 }}>
                <span>⚡ {level}</span><span>{xp} / {xpMax} XP</span>
              </div>
              <div style={{ height: 5, background: C.bg3, borderRadius: 99 }}>
                <div style={{
                  height: '100%', width: `${(xp / xpMax) * 100}%`,
                  background: `linear-gradient(90deg, ${C.accent}, ${C.accentBright})`,
                  borderRadius: 99, boxShadow: `0 0 8px ${C.accent}`,
                }} />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px 100px' }}>

          {/* TABS */}
          <nav style={{
            display: 'flex', gap: 5, background: C.bg2, padding: 5,
            borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 24,
          }}>
            {tabs.map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)} style={{
                flex: 1, padding: '9px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.3px', transition: 'all 0.2s',
                background: tab === id ? C.accent : 'transparent',
                color: tab === id ? C.white : C.textMuted,
              }}>{label}</button>
            ))}
          </nav>

          {/* TAB CONTENT */}
          {tab === 'dashboard' && (
            <Dashboard
              workouts={workouts} weights={weights}
              setWeights={setWeights} setTab={setTab} setSelectedDay={setSelectedDay}
            />
          )}
          {tab === 'routine' && (
            <Routine setTab={setTab} setSelectedDay={setSelectedDay} />
          )}
          {tab === 'workout' && (
            <WorkoutTab
              selectedDay={selectedDay} setSelectedDay={setSelectedDay}
              workouts={workouts} setWorkouts={setWorkouts} setTab={setTab}
            />
          )}
          {tab === 'progress' && (
            <Progress workouts={workouts} weights={weights} />
          )}
          {tab === 'ai' && (
            <AICoach workouts={workouts} weights={weights} />
          )}
        </main>

        {/* BOTTOM NAV (mobile) */}
        <nav style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: C.bg2, borderTop: `1px solid ${C.border}`,
          display: 'flex', padding: '8px 12px 20px',
          backdropFilter: 'blur(16px)',
        }}>
          {tabs.map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer', borderRadius: 8,
              fontSize: 10, fontWeight: 700, transition: 'all 0.2s',
              background: tab === id ? `${C.accent}22` : 'transparent',
              color: tab === id ? C.accentBright : C.textMuted,
            }}>{label}</button>
          ))}
        </nav>
      </div>
    </>
  );
}
