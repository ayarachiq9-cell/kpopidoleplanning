import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Play, Pause, RotateCcw, Volume2, ShieldCheck, Sun, Moon, Wind, CheckCircle2, Music, Timer } from "lucide-react";
import { soundEngine } from "../../utils/audio";

export const TraineeMeditationModule: React.FC = () => {
  // Breathwork state
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathTimer, setBreathTimer] = useState<number>(4);
  const [completedBreaths, setCompletedBreaths] = useState<number>(0);

  // Meditation Timer State
  const [meditationDurationMinutes, setMeditationDurationMinutes] = useState<number>(3);
  const [secondsLeft, setSecondsLeft] = useState<number>(180);
  const [isMeditating, setIsMeditating] = useState<boolean>(false);

  // Sound ambiance state
  const [ambientSound, setAmbientSound] = useState<"none" | "piano" | "binaural" | "breeze">("none");

  // Daily Affirmation Index
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  const AFFIRMATIONS = [
    {
      korean: "나는 충분히 잘하고 있고, 매일 성장하고 있다.",
      romaja: "Naneun chungbunhi jalhago issgo, maeil seongjang-hago issda.",
      french: "Je fais de mon mieux et je progresse chaque jour avec assurance.",
      theme: "Confiance & Progression"
    },
    {
      korean: "무대 위에서 나의 진정한 매력을 표현할 수 있다.",
      romaja: "Mudae wieseo naui jinjeonghan maeryeog-eul ppyohyeonhal su issda.",
      french: "Sur scène, je peux exprimer librement mon charme authentique.",
      theme: "Gestion du Traque"
    },
    {
      korean: "실수는 배움의 과정이며, 나는 계속 앞으로 나아간다.",
      romaja: "Silsuneun baeum-ui gwajeong-imyeo, naneun gyesok ap-euro naaganda.",
      french: "Les erreurs font partie de l'apprentissage ; j'avance avec sérénité.",
      theme: "Résilience"
    },
    {
      korean: "내 목소리와 춤은 세상에 단 하나뿐인 특별함이다.",
      romaja: "Nae moksoriwa chumeun sesang-e dan hanappunin teukbyeolham-ida.",
      french: "Ma voix et ma danse possèdent une valeur unique et irremplaçable.",
      theme: "Unicité Artistique"
    }
  ];

  // Breathwork loop
  useEffect(() => {
    let interval: any = null;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev > 1) return prev - 1;

          // Phase transition
          if (breathPhase === "inhale") {
            setBreathPhase("hold");
            soundEngine.playNote("E4", 0.3);
            return 4; // Hold for 4s
          } else if (breathPhase === "hold") {
            setBreathPhase("exhale");
            soundEngine.playNote("C4", 0.3);
            return 6; // Exhale for 6s
          } else {
            setBreathPhase("inhale");
            soundEngine.playNote("G4", 0.3);
            setCompletedBreaths((c) => c + 1);
            return 4; // Inhale for 4s
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathPhase]);

  // Meditation timer loop
  useEffect(() => {
    let timer: any = null;
    if (isMeditating && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (isMeditating && secondsLeft === 0) {
      setIsMeditating(false);
      soundEngine.playSuccess();
    }
    return () => clearInterval(timer);
  }, [isMeditating, secondsLeft]);

  // Ambient sound synthesizer loop
  useEffect(() => {
    let soundInterval: any = null;
    if (ambientSound !== "none") {
      soundInterval = setInterval(() => {
        if (ambientSound === "piano") {
          const notes = ["C4", "E4", "G4", "B4", "C5"];
          const randomNote = notes[Math.floor(Math.random() * notes.length)];
          soundEngine.playNote(randomNote, 1.2, "sine");
        } else if (ambientSound === "binaural") {
          soundEngine.playNote(216, 2.0, "triangle");
        } else if (ambientSound === "breeze") {
          soundEngine.playNote(180, 1.5, "sine");
        }
      }, 3000);
    }
    return () => clearInterval(soundInterval);
  }, [ambientSound]);

  const startMeditationTimer = (mins: number) => {
    setMeditationDurationMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsMeditating(true);
    soundEngine.playSuccess();
  };

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentAffirmation = AFFIRMATIONS[affirmationIndex];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              Soins de Méditation, Respiration & Mental K-Pop Trainee
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Exercices anti-traque, respiration diaphragmatique guidée et affirmations positives pour préserver le bien-être mental avant les auditions.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Sérénité & Récupération</span>
        </span>
      </div>

      {/* Grid: Breathwork Circle & Meditation Timer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left: Guided Breathwork Loop */}
        <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-2xl border border-indigo-500/30 text-white space-y-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-indigo-400" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-indigo-200">
                Respiration Calmante Diaphragmatique (4-4-6)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded border border-indigo-500/30">
              {completedBreaths} Cycles Réalisés
            </span>
          </div>

          {/* Interactive Expanding Breath Circle */}
          <div className="py-8 flex flex-col items-center justify-center space-y-3">
            <div
              className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 shadow-xl ${
                breathPhase === "inhale"
                  ? "scale-125 border-emerald-400 bg-emerald-950/40 shadow-emerald-500/20"
                  : breathPhase === "hold"
                  ? "scale-110 border-amber-400 bg-amber-950/40 shadow-amber-500/20"
                  : "scale-90 border-indigo-400 bg-indigo-950/40 shadow-indigo-500/20"
              }`}
            >
              <span className="text-2xl font-black font-mono">
                {breathTimer}s
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200 mt-1">
                {breathPhase === "inhale" && "Inspirer (Nez)"}
                {breathPhase === "hold" && "Retenir l'air"}
                {breathPhase === "exhale" && "Expirer (Bouche)"}
              </span>
            </div>

            <p className="text-xs text-slate-300 text-center max-w-xs mt-2">
              {breathPhase === "inhale" && "Gonflez le ventre lentement en inspirant par le nez."}
              {breathPhase === "hold" && "Maintenez la cage thoracique souple et relâchez les épaules."}
              {breathPhase === "exhale" && "Relâchez tout l'air en soufflant doucement comme dans une paille."}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsBreathing(!isBreathing)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isBreathing
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950"
              }`}
            >
              {isBreathing ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isBreathing ? "Pause Respiration" : "Lancer le Cycle de Respiration"}</span>
            </button>

            <button
              onClick={() => {
                setIsBreathing(false);
                setBreathPhase("inhale");
                setBreathTimer(4);
                setCompletedBreaths(0);
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Guided Meditation Timer & Ambiance Synthesizer */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-purple-600" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  Minuteur de Méditation Rapide (Anti-Traque)
                </h4>
              </div>

              <span className="text-xs font-mono font-bold text-purple-700">
                {formatTime(secondsLeft)}
              </span>
            </div>

            {/* Duration Selector Buttons */}
            <div className="flex gap-2">
              {[2, 3, 5, 10].map((mins) => (
                <button
                  key={mins}
                  onClick={() => startMeditationTimer(mins)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    meditationDurationMinutes === mins && isMeditating
                      ? "bg-purple-600 border-purple-700 text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>

            {/* Sound Ambiance Selector */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
                Ambiance Sonore Apaisante (Synthétiseur Web Audio) :
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "none", label: "Silence", icon: Volume2 },
                  { id: "piano", label: "Piano Zen", icon: Music },
                  { id: "binaural", label: "432 Hz Alpha", icon: Sparkles },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setAmbientSound(s.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ambientSound === s.id
                          ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Start/Stop Timer Controls */}
          <button
            onClick={() => setIsMeditating(!isMeditating)}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isMeditating
                ? "bg-rose-100 text-rose-700 border border-rose-300"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-md"
            }`}
          >
            {isMeditating ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isMeditating ? "Pause Méditation" : "Lancer la Séance de Méditation"}</span>
          </button>
        </div>
      </div>

      {/* Trainee Mindset Affirmations Banner */}
      <div className="p-5 bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 border border-rose-200/80 rounded-2xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-rose-700 uppercase tracking-widest flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Affirmation Positive du Jour (Trainee Mindset)</span>
          </span>

          <button
            onClick={() => setAffirmationIndex((prev) => (prev + 1) % AFFIRMATIONS.length)}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white border border-indigo-200 px-3 py-1 rounded-lg shadow-xs cursor-pointer"
          >
            Affirmation Suivante ➔
          </button>
        </div>

        <div className="p-4 bg-white rounded-xl border border-rose-100 space-y-1">
          <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            {currentAffirmation.theme}
          </span>
          <h4 className="text-base font-extrabold text-slate-900 pt-1">
            "{currentAffirmation.korean}"
          </h4>
          <p className="text-xs font-mono text-purple-700 font-medium">
            {currentAffirmation.romaja}
          </p>
          <p className="text-xs text-slate-700 pt-1 italic font-medium">
            → {currentAffirmation.french}
          </p>
        </div>
      </div>
    </div>
  );
};
