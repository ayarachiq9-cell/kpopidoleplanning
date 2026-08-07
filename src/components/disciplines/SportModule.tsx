import React, { useState, useEffect } from "react";
import { Activity, Play, Pause, RotateCcw, CheckCircle, ShieldAlert, Camera } from "lucide-react";
import { SPORT_CIRCUIT_EXERCISES } from "../../data/disciplinesData";
import { soundEngine } from "../../utils/audio";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { StaminaPulseTimer } from "./StaminaPulseTimer";

export const SportModule: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [phase, setPhase] = useState<"work" | "rest">("work");
  const [timer, setTimer] = useState(SPORT_CIRCUIT_EXERCISES[0].workSec);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [isPostureScannerOpen, setIsPostureScannerOpen] = useState(false);

  const currentEx = SPORT_CIRCUIT_EXERCISES[exerciseIndex];

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            soundEngine.playBeep(phase === "work");

            if (phase === "work") {
              // Switch to rest
              setPhase("rest");
              return currentEx.restSec;
            } else {
              // Switch to next exercise
              if (exerciseIndex < SPORT_CIRCUIT_EXERCISES.length - 1) {
                const nextIdx = exerciseIndex + 1;
                setExerciseIndex(nextIdx);
                setPhase("work");
                return SPORT_CIRCUIT_EXERCISES[nextIdx].workSec;
              } else {
                // Round complete!
                setIsActive(false);
                setCompletedRounds((r) => r + 1);
                setExerciseIndex(0);
                setPhase("work");
                return SPORT_CIRCUIT_EXERCISES[0].workSec;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase, exerciseIndex]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/20 shadow-xl">
        <div className="flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2">
          <Activity className="w-4 h-4" />
          <span>Condition Physique & Endurance Scénique</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Sport, Gainage & Circuit Express Minuté
        </h2>
        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
          Développez le souffle, la puissance musculaire et la stabilité du tronc pour danser 3 minutes sans essoufflement.
        </p>

        <button
          onClick={() => setIsPostureScannerOpen(true)}
          className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Scanner Photo/Vidéo Posture & Forme Physique IA</span>
        </button>
      </div>

      {/* Tabata Cardio Stamina Pulse Timer */}
      <StaminaPulseTimer />

      {/* Express Circuit Timer Section */}
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Circuit Express Trainee (6 Exercices - 40s Effort / 15s Repos)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Circuits minutés avec bips sonores pour stimuler le métabolisme.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50"
              }`}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? "Pause" : "Démarrer le Circuit"}</span>
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setExerciseIndex(0);
                setPhase("work");
                setTimer(SPORT_CIRCUIT_EXERCISES[0].workSec);
              }}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current exercise card */}
        <div
          className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${
            phase === "work"
              ? "bg-emerald-950/40 border-emerald-500/50"
              : "bg-indigo-950/40 border-indigo-500/50"
          }`}
        >
          <div className="space-y-2 flex-1">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                phase === "work"
                  ? "bg-emerald-900/80 text-emerald-300 border border-emerald-500/30"
                  : "bg-indigo-900/80 text-indigo-300 border border-indigo-500/30"
              }`}
            >
              {phase === "work" ? "Phase d'effort (40s)" : "Repos Actif (15s)"}
            </span>
            <h4 className="text-2xl font-black text-white">{currentEx.name}</h4>
            <p className="text-sm text-slate-300">{currentEx.desc}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-5 bg-slate-950 rounded-2xl border border-slate-800 min-w-[140px]">
            <span
              className={`text-4xl font-black ${
                phase === "work" ? "text-emerald-400" : "text-indigo-400"
              }`}
            >
              {timer}s
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">
              Ex {exerciseIndex + 1} / {SPORT_CIRCUIT_EXERCISES.length}
            </span>
          </div>
        </div>

        {/* Exercise indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SPORT_CIRCUIT_EXERCISES.map((ex, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all text-center ${
                idx === exerciseIndex
                  ? "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold"
                  : idx < exerciseIndex
                  ? "bg-slate-900 border-slate-700 text-slate-400"
                  : "bg-slate-950 border-slate-800 text-slate-600"
              }`}
            >
              <span className="text-[10px] block text-slate-500">Ex {idx + 1}</span>
              <span className="text-xs truncate block mt-0.5">{ex.name}</span>
            </div>
          ))}
        </div>

        {completedRounds > 0 && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300 font-bold">
            🎉 Bravo ! Vous avez terminé {completedRounds} circuit(s) complets aujourd'hui !
          </div>
        )}
      </div>

      {/* Progress Landmarks & Over-training Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Repères de Progression Trainee</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>• Maintenir 60s de gainage frontal propre sans creuser le bas du dos.</li>
            <li>• Enchaîner 3 répétitions de danse à la suite sans essoufflement extrême.</li>
            <li>• Rythme cardiaque qui redescend sous 100 BPM en moins de 2 minutes de repos.</li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-rose-500/20 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Signaux d'Alerte (Surentraînement)</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>• Fatigue persistante dès le réveil et courbatures intenses de plus de 48h.</li>
            <li>• Perte de motivation soudaine ou troubles du sommeil.</li>
            <li>• En cas de douleur articulaire aiguë, stoppez l'effort et appliquez de la glace.</li>
          </ul>
        </div>
      </div>

      {/* Posture & Form Scanner Modal */}
      <MediaReviewModal
        isOpen={isPostureScannerOpen}
        onClose={() => setIsPostureScannerOpen(false)}
        type="sport_posture"
        title="Scanner Photo/Vidéo Posture & Forme Physique IA"
        description="Chargez une photo ou courte vidéo de votre exercice (gainage, squat, étirement ou posture de danse) pour recevoir un contrôle de sécurité et d'alignement corporel."
      />
    </div>
  );
};
