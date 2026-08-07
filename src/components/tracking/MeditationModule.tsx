import React, { useState, useEffect, useRef } from "react";
import {
  HeartPulse,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Smile,
  Meh,
  Frown,
  Flame,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Info,
  TrendingUp,
  Brain,
  Moon,
  Sun,
  Wind,
  Award,
  Music,
  Plus
} from "lucide-react";
import { soundEngine } from "../../utils/audio";
import { MoodCheckIn, MeditationSession } from "../../types";

const GUIDED_MEDITATION_SESSIONS: MeditationSession[] = [
  {
    id: "m1",
    title: "Gestion du Stress Pre-Audition & Confiance",
    durationMinutes: 5,
    category: "Gestion du Stress Pre-Audition",
    description: "Méthode 'Box Breathing' (4-4-4-4) pour apaiser le rythme cardiaque, relâcher les épaules et dissiper le trac avant de monter sur scène ou devant les juges.",
    audioTonePitch: 261.63, // C4
    benefits: ["Réduction instantanée du trac", "Baisse du rythme cardiaque", "Clarté mentale"]
  },
  {
    id: "m2",
    title: "Ancrage Vocal & Respiration Diaphragmatique",
    durationMinutes: 5,
    category: "Ancrage Vocal & Respiration",
    description: "Exercice de respiration profonde ciblé sur le bas de l'abdomen pour libérer le diaphragme et préparer des vocalises puissantes sans forcer la gorge.",
    audioTonePitch: 220.0, // A3
    benefits: ["Ouverture de la cage thoracique", "Soutien vocal naturel", "Détente des cordes vocales"]
  },
  {
    id: "m3",
    title: "Visualisation Scénique & Prestance 'Center'",
    durationMinutes: 5,
    category: "Visualisation Scénique",
    description: "Session de préparation mentale de 5 minutes. Visualisez les projecteurs de scène, votre posture parfaite, vos regards 'Ending Fairy' et votre énergie magnétique.",
    audioTonePitch: 329.63, // E4
    benefits: ["Renforcement de la présence scénique", "Ancrage de l'expression faciale", "Confiance en soi"]
  },
  {
    id: "m4",
    title: "Récupération & Relâchement Post-Danse",
    durationMinutes: 5,
    category: "Récupération Après Danse",
    description: "Balayage corporel (Body Scan) guidé pour détendre les quadriceps, les mollets et les trapèzes sollicités durant les répétitions intensives de chorégraphie.",
    audioTonePitch: 196.0, // G3
    benefits: ["Réduction des tensions musculaires", "Récupération physique", "Prévention de la fatigue"]
  },
  {
    id: "m5",
    title: "Sommeil Réparateur & Sérénité Trainee",
    durationMinutes: 5,
    category: "Sommeil & Sérénité Trainee",
    description: "Technique de respiration 4-7-8 pour calmer les pensées rumineuses de fin de journée et favoriser un sommeil profond indispensable à la mémoire musculaire.",
    audioTonePitch: 174.61, // F3
    benefits: ["Endormissement rapide", "Régénération musculaire", "Apaisement émotionnel"]
  }
];

const MOOD_OPTIONS = [
  { emoji: "😍", label: "Épanoui(e)", color: "text-emerald-500 bg-emerald-50 border-emerald-200" },
  { emoji: "🧘", label: "Calme", color: "text-blue-500 bg-blue-50 border-blue-200" },
  { emoji: "⚡", label: "Déterminé(e)", color: "text-purple-500 bg-purple-50 border-purple-200" },
  { emoji: "😴", label: "Fatigué(e)", color: "text-amber-500 bg-amber-50 border-amber-200" },
  { emoji: "😰", label: "Anxieux(se) Pre-Eval", color: "text-rose-500 bg-rose-50 border-rose-200" },
  { emoji: "🌧️", label: "Découragé(e)", color: "text-slate-500 bg-slate-100 border-slate-300" }
];

export const MeditationModule: React.FC = () => {
  // Active session player state
  const [selectedSession, setSelectedSession] = useState<MeditationSession>(GUIDED_MEDITATION_SESSIONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(300); // 5 minutes default
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Breathing animation phase
  // Box Breathing cycle: Inspire (4s) -> Hold (4s) -> Expire (4s) -> Hold (4s)
  const [breathPhase, setBreathPhase] = useState<"Inspiration" | "Maintien" | "Expiration" | "Pause">("Inspiration");
  const [phaseSeconds, setPhaseSeconds] = useState<number>(4);

  // Mood Check-in history state
  const [moodLogs, setMoodLogs] = useState<MoodCheckIn[]>(() => {
    const saved = localStorage.getItem("kpop_mood_history_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: "log1",
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        time: "18:30",
        moodLevel: 4,
        moodLabel: "Calme",
        moodEmoji: "🧘",
        energyLevel: 4,
        stressLevel: 2,
        notes: "Bonne séance de Knife Dance. La respiration m'a aidé à tenir le rythme !"
      },
      {
        id: "log2",
        date: new Date().toISOString().split("T")[0],
        time: "09:15",
        moodLevel: 5,
        moodLabel: "Épanoui(e)",
        moodEmoji: "😍",
        energyLevel: 5,
        stressLevel: 1,
        notes: "Prêt(e) pour la répétition vocale. Mental à 100% !"
      }
    ];
  });

  // Mood Check-in Form Inputs
  const [selectedMoodObj, setSelectedMoodObj] = useState(MOOD_OPTIONS[0]);
  const [inputEnergyLevel, setInputEnergyLevel] = useState<number>(4);
  const [inputStressLevel, setInputStressLevel] = useState<number>(2);
  const [inputNotes, setInputNotes] = useState<string>("");
  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(false);

  // Ambient sound oscillator ref
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);

  // Save mood logs
  const saveMoodLogs = (logs: MoodCheckIn[]) => {
    setMoodLogs(logs);
    localStorage.setItem("kpop_mood_history_v1", JSON.stringify(logs));
  };

  // Check if checked in today
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const exists = moodLogs.some((l) => l.date === todayStr);
    setHasCheckedInToday(exists);
  }, [moodLogs]);

  // Main Timer Interval logic
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && timeLeftSec > 0) {
      interval = setInterval(() => {
        setTimeLeftSec((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            soundEngine.playSuccess();
            soundEngine.playMeditationBell(selectedSession.audioTonePitch, 5.0);
            stopAmbientDrone();
            return 0;
          }
          return prev - 1;
        });

        // Breathing cycle step
        setPhaseSeconds((prev) => {
          if (prev <= 1) {
            // Switch phase
            setBreathPhase((currentPhase) => {
              if (currentPhase === "Inspiration") {
                if (soundEnabled) soundEngine.playMeditationBell(selectedSession.audioTonePitch, 2.5);
                return "Maintien";
              }
              if (currentPhase === "Maintien") {
                if (soundEnabled) soundEngine.playMeditationBell(selectedSession.audioTonePitch * 0.8, 2.5);
                return "Expiration";
              }
              if (currentPhase === "Expiration") {
                if (soundEnabled) soundEngine.playMeditationBell(selectedSession.audioTonePitch * 0.7, 2.0);
                return "Pause";
              }
              if (soundEnabled) soundEngine.playMeditationBell(selectedSession.audioTonePitch * 1.2, 2.5);
              return "Inspiration";
            });
            return 4; // Reset phase 4 seconds
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeftSec, selectedSession, soundEnabled]);

  // Start / Stop ambient drone audio
  const startAmbientDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(selectedSession.audioTonePitch, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      ambientOscRef.current = osc;
      ambientGainRef.current = gain;
    } catch (e) {}
  };

  const stopAmbientDrone = () => {
    if (ambientGainRef.current && ambientOscRef.current) {
      try {
        ambientGainRef.current.gain.linearRampToValueAtTime(0.0001, 1.0);
        setTimeout(() => {
          ambientOscRef.current?.stop();
          ambientOscRef.current?.disconnect();
        }, 1000);
      } catch (e) {}
    }
  };

  const togglePlaySession = () => {
    if (!isPlaying) {
      if (timeLeftSec <= 0) setTimeLeftSec(selectedSession.durationMinutes * 60);
      setIsPlaying(true);
      soundEngine.playMeditationBell(selectedSession.audioTonePitch, 4.0);
      if (soundEnabled) startAmbientDrone();
    } else {
      setIsPlaying(false);
      stopAmbientDrone();
      soundEngine.playClick(600, 0.05);
    }
  };

  const resetSession = () => {
    setIsPlaying(false);
    stopAmbientDrone();
    setTimeLeftSec(selectedSession.durationMinutes * 60);
    setBreathPhase("Inspiration");
    setPhaseSeconds(4);
    soundEngine.playClick(500, 0.05);
  };

  const handleSelectSession = (session: MeditationSession) => {
    setIsPlaying(false);
    stopAmbientDrone();
    setSelectedSession(session);
    setTimeLeftSec(session.durationMinutes * 60);
    setBreathPhase("Inspiration");
    setPhaseSeconds(4);
    soundEngine.playClick(800, 0.05);
  };

  // Submit Mood Log
  const handleMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: MoodCheckIn = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      moodLevel: MOOD_OPTIONS.indexOf(selectedMoodObj) + 1,
      moodLabel: selectedMoodObj.label,
      moodEmoji: selectedMoodObj.emoji,
      energyLevel: inputEnergyLevel,
      stressLevel: inputStressLevel,
      notes: inputNotes.trim()
    };

    const updated = [newLog, ...moodLogs];
    saveMoodLogs(updated);
    setInputNotes("");
    soundEngine.playSuccess();
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Compute Mood Statistics
  const streakDays = moodLogs.length;
  const avgEnergy =
    moodLogs.length > 0
      ? (moodLogs.reduce((acc, curr) => acc + curr.energyLevel, 0) / moodLogs.length).toFixed(1)
      : "4.0";
  const avgStress =
    moodLogs.length > 0
      ? (moodLogs.reduce((acc, curr) => acc + curr.stressLevel, 0) / moodLogs.length).toFixed(1)
      : "2.0";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-teal-500/30 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-teal-400 font-bold uppercase tracking-wider text-xs mb-2">
            <HeartPulse className="w-4 h-4" />
            <span>Santé Mentale & Sérénité K-Pop Trainee</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Méditation Guidée & Bilan Émotionnel
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
            Des sessions de 5 minutes avec animations visuelles de respiration et sons apaisants pour libérer le stress avant vos évaluations et garder une énergie rayonnante sur scène.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-teal-900/60 border border-teal-500/40 p-3 rounded-2xl shrink-0">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-extrabold text-lg">
            🧘
          </div>
          <div>
            <span className="text-[10px] font-bold text-teal-300 uppercase block">Série Bien-être</span>
            <span className="text-sm font-extrabold text-white">{streakDays} Jours de Bilan</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Interactive Player / Right Session Picker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Animated Breathing Canvas & Guided Session Controls */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl text-white space-y-6 flex flex-col justify-between relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-widest block">
                {selectedSession.category}
              </span>
              <h3 className="text-lg font-extrabold text-white">{selectedSession.title}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  soundEnabled
                    ? "bg-teal-600/30 text-teal-300 border-teal-500/40"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
                title="Sons de bol tibétain & frissons sonores"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => soundEngine.playMeditationBell(selectedSession.audioTonePitch, 3.5)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Music className="w-3.5 h-3.5 text-teal-400" />
                <span>Bol Tibétain 🔔</span>
              </button>
            </div>
          </div>

          {/* Central Breathing Visualization Orb */}
          <div className="py-8 flex flex-col items-center justify-center relative min-h-[280px]">
            {/* Outer Pulsating Rings */}
            <div
              className={`absolute w-64 h-64 rounded-full border border-teal-500/20 transition-all duration-1000 ${
                isPlaying ? "animate-ping opacity-30" : "opacity-10"
              }`}
            />
            <div
              className={`absolute w-52 h-52 rounded-full border border-emerald-400/30 transition-all duration-1000 ${
                breathPhase === "Inspiration"
                  ? "scale-125 border-teal-400 bg-teal-500/10 shadow-[0_0_50px_rgba(20,184,166,0.3)]"
                  : breathPhase === "Maintien"
                  ? "scale-125 border-emerald-300 bg-emerald-500/20 shadow-[0_0_60px_rgba(52,211,153,0.4)]"
                  : breathPhase === "Expiration"
                  ? "scale-75 border-indigo-400 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                  : "scale-75 border-slate-500 bg-slate-800/20"
              }`}
            />

            {/* Inner Core Circle */}
            <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-teal-500 via-emerald-600 to-indigo-700 flex flex-col items-center justify-center text-white shadow-2xl p-4 text-center space-y-1">
              <span className="text-2xl font-black font-mono tracking-wider">{formatTime(timeLeftSec)}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-100 bg-teal-900/60 px-2 py-0.5 rounded-full">
                {breathPhase}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-200">{phaseSeconds}s</span>
            </div>

            {/* Phase Instructions Guide Banner */}
            <div className="mt-8 text-center max-w-sm space-y-1">
              <p className="text-sm font-extrabold text-teal-200">
                {breathPhase === "Inspiration" && "🌬️ Inspirez doucement par le nez (4s)..."}
                {breathPhase === "Maintien" && "⏸️ Maintenez l'air dans vos poumons (4s)..."}
                {breathPhase === "Expiration" && "😮‍💨 Expirez profondément par la bouche (4s)..."}
                {breathPhase === "Pause" && "🧘 Relâchez les épaules & faites une pause (4s)..."}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suivez le rythme du cercle lumineux pour calmer votre système nerveux.
              </p>
            </div>
          </div>

          {/* Player Buttons Bar */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={resetSession}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer transition-all"
              title="Réinitialiser la session"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlaySession}
              className={`px-8 py-3.5 rounded-2xl font-extrabold text-sm flex items-center gap-2.5 cursor-pointer shadow-xl transition-all ${
                isPlaying
                  ? "bg-amber-600 hover:bg-amber-500 text-white"
                  : "bg-teal-600 hover:bg-teal-500 text-white"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Mettre en Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Démarrer la Session (5 Min)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Guided Meditation Sessions List */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm md:text-base flex items-center gap-2">
            <Wind className="w-5 h-5 text-teal-600" />
            <span>Sessions Guidées de 5 Minutes :</span>
          </h3>

          <div className="space-y-2.5">
            {GUIDED_MEDITATION_SESSIONS.map((session) => {
              const isSelected = selectedSession.id === session.id;
              return (
                <div
                  key={session.id}
                  onClick={() => handleSelectSession(session)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-teal-950 text-white border-teal-500/80 shadow-md scale-[1.01]"
                      : "bg-white border-slate-200/80 hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          isSelected ? "bg-teal-800 text-teal-200" : "bg-teal-50 text-teal-800"
                        }`}
                      >
                        {session.category}
                      </span>
                      <h4 className="font-extrabold text-sm mt-1">{session.title}</h4>
                    </div>
                    <span className="text-xs font-bold font-mono shrink-0 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      <span>{session.durationMinutes} min</span>
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isSelected ? "text-slate-300" : "text-slate-600"}`}>
                    {session.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {session.benefits.map((b, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isSelected ? "bg-slate-800 text-teal-300" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Mood Check-In & History Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-teal-600" />
              <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
                Suivi du Bilan Émotionnel Quotidien (Mood Tracker)
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Enregistrez vos ressentis chaque jour pour identifier vos pics de fatigue ou de stress et préserver votre équilibre d'artiste.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center px-3 py-1 bg-teal-50 border border-teal-200 rounded-xl">
              <span className="text-[10px] text-teal-700 font-bold block uppercase">Énergie Moyenne</span>
              <span className="text-sm font-extrabold text-teal-900">⚡ {avgEnergy} / 5</span>
            </div>
            <div className="text-center px-3 py-1 bg-purple-50 border border-purple-200 rounded-xl">
              <span className="text-[10px] text-purple-700 font-bold block uppercase">Stress Moyen</span>
              <span className="text-sm font-extrabold text-purple-900">🧘 {avgStress} / 5</span>
            </div>
          </div>
        </div>

        {/* Mood Check-In Form */}
        <form onSubmit={handleMoodSubmit} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Comment vous sentez-vous aujourd'hui ?</span>
            </h4>
            {hasCheckedInToday && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                ✓ Bilan du jour enregistré
              </span>
            )}
          </div>

          {/* Emoji Mood Picker */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {MOOD_OPTIONS.map((item) => {
              const isSelected = selectedMoodObj.label === item.label;
              return (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => {
                    setSelectedMoodObj(item);
                    soundEngine.playClick(900, 0.05);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                    isSelected
                      ? "bg-teal-600 text-white border-teal-700 shadow-md scale-[1.03]"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sliders: Energy & Stress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
                <span>Niveau d'Énergie Physique :</span>
                <span className="text-teal-600 font-mono text-sm">{inputEnergyLevel} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={inputEnergyLevel}
                onChange={(e) => setInputEnergyLevel(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Épuisé(e)</span>
                <span>3 - Normal</span>
                <span>5 - En Forme Olympique</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
                <span>Niveau de Stress / Trac :</span>
                <span className="text-purple-600 font-mono text-sm">{inputStressLevel} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={inputStressLevel}
                onChange={(e) => setInputStressLevel(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Zen Absolu</span>
                <span>3 - Léger Trac</span>
                <span>5 - Intense Pression</span>
              </div>
            </div>
          </div>

          {/* Notes Input */}
          <div>
            <label className="text-xs font-extrabold text-slate-700 block mb-1">
              Notes de Réflexion Personnelle (Optionnel) :
            </label>
            <input
              type="text"
              placeholder="Ex: Légère tension aux mollets après la répétition, mais la respiration m'a apaisé(e)."
              value={inputNotes}
              onChange={(e) => setInputNotes(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Valider le Bilan Émotionnel du Jour</span>
          </button>
        </form>

        {/* Mood Check-In History List */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
            Historique Récent des Bilans ({moodLogs.length})
          </h4>

          {moodLogs.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 text-center bg-slate-50 rounded-xl">
              Aucun bilan enregistré. Remplissez le formulaire ci-dessus !
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {moodLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{log.moodEmoji}</span>
                      <span className="font-extrabold text-slate-900 text-xs">{log.moodLabel}</span>
                    </div>

                    <span className="text-[11px] font-bold text-slate-500 font-mono">
                      {log.date} à {log.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                    <span>⚡ Énergie : <strong>{log.energyLevel}/5</strong></span>
                    <span>🧘 Stress : <strong>{log.stressLevel}/5</strong></span>
                  </div>

                  {log.notes && (
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                      "{log.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
