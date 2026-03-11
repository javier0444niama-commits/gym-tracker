// lib/data.js — datos y constantes de toda la app

export const COLORS = {
  bg: "#050d1a", bg2: "#0a1628", bg3: "#0f1f3d", card: "#0d1b35",
  border: "#1a3060", border2: "#1e3a72",
  accent: "#1e6fff", accentGlow: "#1e6fff33", accentBright: "#4d8fff",
  text: "#e8f0ff", textMuted: "#7a9cc8", textDim: "#3d5a8a",
  success: "#1ec87a", warning: "#f0a500", danger: "#e03a3a", white: "#ffffff",
};

export const MES5 = {
  Lunes: {
    label: "Lunes – Pecho + Tríceps + Core", icon: "💪",
    exercises: [
      { name: "Press inclinado con mancuernas", sets: "4×8–10", rest: 105, restLabel: "90–120s", tip: "Aumentar peso o reps cada semana" },
      { name: "Apertura acostada con mancuernas", sets: "4×10–12", rest: 90, restLabel: "90s", tip: "Aumentar peso progresivamente" },
      { name: "Aperturas inclinadas con mancuernas", sets: "3×12–15", rest: 90, restLabel: "90s", tip: "Sube peso o reps según progreso" },
      { name: "Fondos entre bancos", sets: "3×8–10", rest: 75, restLabel: "75s", tip: "Más reps o añade peso" },
      { name: "Press francés con mancuernas", sets: "3×10–12", rest: 60, restLabel: "60s", tip: "Aumentar peso o repeticiones" },
      { name: "Rueda abdominal (Ab Wheel)", sets: "3×10–12", rest: 45, restLabel: "45s", tip: "Más reps o mayor rango" },
      { name: "Plancha", sets: "3×45–60s", rest: 45, restLabel: "45s", tip: "Más tiempo o eleva una pierna" },
    ],
  },
  Martes: {
    label: "Martes – Espalda + Bíceps + Core", icon: "🏋️",
    exercises: [
      { name: "Dominadas con agarre prono", sets: "4×6–8", rest: 90, restLabel: "90s", tip: "Añade peso o más reps" },
      { name: "Remo con mancuerna a una mano", sets: "4×8–10/lado", rest: 75, restLabel: "75s", tip: "Aumentar peso" },
      { name: "Remo inclinado a dos manos", sets: "3×8–12", rest: 75, restLabel: "75s", tip: "Sube peso o reps" },
      { name: "Pájaros con mancuernas", sets: "3×12–15", rest: 75, restLabel: "75s", tip: "Sube peso o reps" },
      { name: "Curl bíceps alterno con mancuernas", sets: "3×10–12", rest: 75, restLabel: "75s", tip: "Aumentar peso" },
      { name: "Curl martillo con mancuernas", sets: "3×12–14", rest: 75, restLabel: "75s", tip: "Más reps o peso" },
      { name: "Elevaciones de piernas colgado", sets: "3×12–15", rest: 45, restLabel: "45s", tip: "Más reps o añade peso" },
      { name: "Face-pull o rotación con banda", sets: "3×12–15", rest: 45, restLabel: "45s", tip: "Más reps y/o tensión de banda" },
    ],
  },
  Miércoles: {
    label: "Miércoles – Piernas (Cuádriceps)", icon: "🦵",
    exercises: [
      { name: "Sentadilla goblet con mancuerna", sets: "4×10–12", rest: 75, restLabel: "75s", tip: "Sube peso o reps" },
      { name: "Zancadas adelante con mancuernas", sets: "4×12/pierna", rest: 60, restLabel: "60s", tip: "Más peso o reps" },
      { name: "Sentadilla búlgara", sets: "3×10–12/pierna", rest: 60, restLabel: "60s", tip: "Más peso o reps" },
      { name: "Step-ups", sets: "3×12/pierna", rest: 60, restLabel: "60s", tip: "Más peso o reps" },
      { name: "Plancha con elevación de pierna", sets: "3×30–40s/lado", rest: 45, restLabel: "45s", tip: "Más tiempo o reps" },
    ],
  },
  Jueves: {
    label: "Jueves – Hombros + Cintura", icon: "🏔️",
    exercises: [
      { name: "Press militar con mancuernas", sets: "4×8–10", rest: 90, restLabel: "90s", tip: "Sube peso progresivamente" },
      { name: "Elevaciones laterales con mancuernas", sets: "3×12–15", rest: 60, restLabel: "60s", tip: "Más peso o reps" },
      { name: "Pájaros con mancuernas", sets: "3×12–15", rest: 75, restLabel: "75s", tip: "Más peso o reps" },
      { name: "Remo con mancuernas", sets: "4×8–10", rest: 75, restLabel: "75s", tip: "Más peso o reps" },
      { name: "Rueda abdominal", sets: "3×10–12", rest: 45, restLabel: "45s", tip: "Mayor rango o más reps" },
      { name: "Plancha con elevación de pierna", sets: "3×40–50s", rest: 30, restLabel: "30s", tip: "Más duración" },
      { name: "Elevaciones de piernas en barra", sets: "3×12", rest: 30, restLabel: "30s", tip: "Añade peso o reps" },
      { name: "Face-pull con banda", sets: "3×12–15", rest: 45, restLabel: "45s", tip: "Más reps y/o tensión" },
    ],
  },
  Viernes: {
    label: "Viernes – Piernas (Glúteos)", icon: "🍑",
    exercises: [
      { name: "Hip thrust con mancuerna", sets: "4×12–15", rest: 90, restLabel: "90s", tip: "Más peso o reps" },
      { name: "Peso muerto rumano con mancuernas", sets: "4×8–10", rest: 90, restLabel: "90s", tip: "Sube peso progresivamente" },
      { name: "Zancadas caminando con mancuernas", sets: "4×12/pierna", rest: 60, restLabel: "60s", tip: "Más peso o reps" },
      { name: "Puente de glúteos (Glute Bridge)", sets: "4×15–20", rest: 60, restLabel: "60s", tip: "Añade peso o reps" },
      { name: "Elevaciones de talón (gemelos)", sets: "4×20–25", rest: 45, restLabel: "45s", tip: "Más peso o reps" },
      { name: "Sentadilla sumo con mancuernas", sets: "3×10–12", rest: 60, restLabel: "60s", tip: "Más peso o reps" },
    ],
  },
  Sábado: {
    label: "Sábado – Yoga & Movilidad", icon: "🧘",
    exercises: [
      { name: "Estiramientos de caderas", sets: "5–10 min", rest: 0, restLabel: "—", tip: "Respira profundo, mantén cada posición" },
      { name: "Movilidad de espalda baja", sets: "5–10 min", rest: 0, restLabel: "—", tip: "Movimientos suaves y controlados" },
      { name: "Flexibilidad general", sets: "20–40 min", rest: 0, restLabel: "—", tip: "Enfócate en zonas trabajadas esta semana" },
    ],
  },
  Domingo: {
    label: "Domingo – Cardio (Correr)", icon: "🏃",
    exercises: [
      { name: "Correr a ritmo moderado", sets: "30–45 min", rest: 0, restLabel: "—", tip: "Mantén quema de grasa + salud cardiovascular" },
    ],
  },
};

export const DAYS_ORDER = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const INITIAL_WORKOUTS = [
  { id: 1, date: "2025-03-01", split: "Pecho + Tríceps", exercises: [{ name: "Press inclinado con mancuernas", sets: [{ w: 30, r: 10 }, { w: 32.5, r: 8 }, { w: 35, r: 6 }, { w: 35, r: 6 }] }], energy: 8, duration: 65 },
  { id: 2, date: "2025-03-04", split: "Espalda + Bíceps", exercises: [{ name: "Dominadas con agarre prono", sets: [{ w: 0, r: 8 }, { w: 0, r: 7 }, { w: 5, r: 6 }, { w: 5, r: 6 }] }], energy: 7, duration: 72 },
  { id: 3, date: "2025-03-06", split: "Piernas (Cuádriceps)", exercises: [{ name: "Sentadilla goblet con mancuerna", sets: [{ w: 24, r: 12 }, { w: 28, r: 10 }, { w: 32, r: 10 }, { w: 32, r: 9 }] }], energy: 9, duration: 80 },
  { id: 4, date: "2025-03-08", split: "Hombros + Cintura", exercises: [{ name: "Press militar con mancuernas", sets: [{ w: 22, r: 10 }, { w: 24, r: 9 }, { w: 26, r: 8 }, { w: 26, r: 8 }] }], energy: 6, duration: 68 },
  { id: 5, date: "2025-03-10", split: "Piernas (Glúteos)", exercises: [{ name: "Hip thrust con mancuerna", sets: [{ w: 40, r: 15 }, { w: 44, r: 13 }, { w: 48, r: 12 }, { w: 48, r: 12 }] }], energy: 9, duration: 75 },
];

export const INITIAL_WEIGHTS = [
  { date: "2025-02-01", weight: 78.5 },
  { date: "2025-02-08", weight: 78.2 },
  { date: "2025-02-15", weight: 77.9 },
  { date: "2025-02-22", weight: 77.5 },
  { date: "2025-03-01", weight: 77.2 },
  { date: "2025-03-08", weight: 76.8 },
];

export const BADGES = [
  { id: 1, icon: "🔥", name: "Primer PR", desc: "Superaste tu récord personal", earned: true },
  { id: 2, icon: "💪", name: "10 Sesiones", desc: "Completaste 10 entrenamientos", earned: true },
  { id: 3, icon: "🎯", name: "Racha 7 días", desc: "7 días consecutivos", earned: false },
  { id: 4, icon: "🏋️", name: "Tonelada", desc: "Levantaste 1000kg en un día", earned: true },
  { id: 5, icon: "⚡", name: "Élite", desc: "Llega al nivel Élite", earned: false },
];

// Hook para persistencia en localStorage
export function useLocalStorage(key, initialValue) {
  if (typeof window === "undefined") return [initialValue, () => {}];
  const stored = (() => {
    try { const item = window.localStorage.getItem(key); return item ? JSON.parse(item) : initialValue; }
    catch { return initialValue; }
  })();
  return [stored, (val) => {
    try { window.localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }];
}
