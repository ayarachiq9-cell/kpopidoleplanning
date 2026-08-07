import React, { useState, useEffect } from "react";
import { Flame, Play, Pause, RotateCcw, CheckCircle2, ShieldAlert, Video, Search, Check } from "lucide-react";
import { DANCE_CHOREOGRAPHIES_INIT, DANCE_WARMUP_STEPS } from "../../data/disciplinesData";
import { ChoreographyItem } from "../../types";
import { soundEngine } from "../../utils/audio";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { MetronomeWidget } from "../shared/MetronomeWidget";
import { ChoreoFormationSimulator } from "./ChoreoFormationSimulator";

export const DanceModule: React.FC = () => {

  // Choreography 20 list state (persisted in localStorage)
  const [choreos, setChoreos] = useState<ChoreographyItem[]>(() => {
    const saved = localStorage.getItem("kpop_choreos_mastery");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DANCE_CHOREOGRAPHIES_INIT;
  });

  const [searchFilter, setSearchFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("Tous");

  // Timed warm-up states
  const [isWarmupActive, setIsWarmupActive] = useState(false);
  const [warmupStepIndex, setWarmupStepIndex] = useState(0);
  const [stepTimer, setStepTimer] = useState(DANCE_WARMUP_STEPS[0].durationSec);

  // Video Modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Toggle choreography mastery
  const toggleMastery = (id: string) => {
    const updated = choreos.map((c) => (c.id === id ? { ...c, mastered: !c.mastered } : c));
    setChoreos(updated);
    localStorage.setItem("kpop_choreos_mastery", JSON.stringify(updated));
  };

  // Warm-up timer logic
  useEffect(() => {
    let interval: any = null;
    if (isWarmupActive) {
      interval = setInterval(() => {
        setStepTimer((prev) => {
          if (prev <= 1) {
            // Move to next step or finish
            if (warmupStepIndex < DANCE_WARMUP_STEPS.length - 1) {
              const nextIndex = warmupStepIndex + 1;
              setWarmupStepIndex(nextIndex);
              soundEngine.playBeep(true);
              return DANCE_WARMUP_STEPS[nextIndex].durationSec;
            } else {
              setIsWarmupActive(false);
              soundEngine.playBeep(true);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWarmupActive, warmupStepIndex]);

  const masteredCount = choreos.filter((c) => c.mastered).length;
  const currentWarmupStep = DANCE_WARMUP_STEPS[warmupStepIndex];

  const filteredChoreos = choreos.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.artist.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesDiff = difficultyFilter === "Tous" || c.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-pink-950/70 border border-purple-500/20 shadow-xl">
        <div className="flex items-center gap-3 text-pink-400 font-bold uppercase tracking-wider text-xs mb-2">
          <Flame className="w-4 h-4" />
          <span>Danse & Performance Scénique K-Pop</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Chorégraphies, Échauffement & Précision
        </h2>
        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
          Maitrisez le compte en 8, le groove et suivez votre avancement parmi 20 chorégraphies mythiques de la K-Pop.
        </p>

        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-950/50 transition-all"
        >
          <Video className="w-4 h-4" />
          <span>Évaluation Vidéo Danse IA (Noté /5)</span>
        </button>
      </div>

      {/* Metronome & 8-Count Stage Beat Engine */}
      <MetronomeWidget />

      {/* Stage Formation & Position Simulator */}
      <ChoreoFormationSimulator />

      {/* Timed 6-step Warm-up Section */}
      <div className="bg-slate-900/80 border border-pink-500/30 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-pink-400" />
              <span>Échauffement Corporel Guidé (6 Étapes Chronométrées)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Préparez vos articulations et muscles avant de commencer les 8 temps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWarmupActive(!isWarmupActive)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isWarmupActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-pink-600 hover:bg-pink-500 text-white"
              }`}
            >
              {isWarmupActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isWarmupActive ? "Pause" : "Lancer Échauffement"}</span>
            </button>
            <button
              onClick={() => {
                setIsWarmupActive(false);
                setWarmupStepIndex(0);
                setStepTimer(DANCE_WARMUP_STEPS[0].durationSec);
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step display card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Étape {currentWarmupStep.step} / {DANCE_WARMUP_STEPS.length}
            </span>
            <h4 className="text-xl font-extrabold text-white">{currentWarmupStep.title}</h4>
            <p className="text-sm text-slate-300">{currentWarmupStep.instruction}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-pink-500/30 min-w-[120px]">
            <span className="text-3xl font-black text-pink-400">{stepTimer}s</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Temps Restant</span>
          </div>
        </div>

        {/* Step progress pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {DANCE_WARMUP_STEPS.map((s, idx) => (
            <div
              key={s.step}
              className={`p-2.5 rounded-lg border text-center transition-all ${
                idx === warmupStepIndex
                  ? "bg-pink-950/80 border-pink-500 text-pink-200 font-bold"
                  : idx < warmupStepIndex
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                  : "bg-slate-950 border-slate-800 text-slate-500"
              }`}
            >
              <span className="text-[10px] block font-mono">Étape {s.step}</span>
              <span className="text-xs truncate block">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 20 Choreographies List Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Chorégraphies à Apprendre ({masteredCount} / {choreos.length} maîtrisées)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Cochez les danses que vous contrôlez parfaitement sur scène.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full sm:w-64 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-pink-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(masteredCount / choreos.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher titre ou artiste..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="flex gap-2">
            {["Tous", "Débutant", "Intermédiaire", "Avancé"].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  difficultyFilter === diff
                    ? "bg-pink-950 border-pink-500 text-pink-200"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Choreographies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChoreos.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMastery(item.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                item.mastered
                  ? "bg-emerald-950/20 border-emerald-500/50 hover:border-emerald-400"
                  : "bg-slate-950 border-slate-800 hover:border-pink-500/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.difficulty === "Débutant"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                        : item.difficulty === "Intermédiaire"
                        ? "bg-amber-950 text-amber-300 border border-amber-500/30"
                        : "bg-rose-950 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {item.difficulty}
                  </span>

                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      item.mastered
                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                        : "border-slate-700 text-transparent"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <h4 className="font-bold text-base text-white mt-2">{item.title}</h4>
                <p className="text-xs text-pink-400 font-semibold">{item.artist}</p>
                {item.notes && <p className="text-[11px] text-slate-400 mt-2 italic">{item.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dance Foundations & Injury Prevention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-white">Fondations de la Danse K-Pop</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><strong className="text-pink-400">Compte en 8 :</strong> Indispensable pour la synchronisation en groupe (1,2,3,4,5,6,7,8).</li>
            <li><strong className="text-purple-400">Isolations :</strong> Bouger uniquement le buste, la tête ou les épaules sans faire trembler le reste.</li>
            <li><strong className="text-indigo-400">Level Change :</strong> Passer d'une position haute à un squat bas avec fluidité.</li>
            <li><strong className="text-blue-400">Freeze / Stop :</strong> Verrouiller les muscles à l'impact des beats pour un effet tranchant.</li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Prévention des Blessures sur Scène</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>• Ne jamais sauter d'échauffement, même pour une courte session.</li>
            <li>• Porter des baskets de danse offrant un bon amorti au niveau des talons.</li>
            <li>• Étirer doucement les chevilles et les mollets après chaque séance intensive.</li>
          </ul>
        </div>
      </div>

      {/* Video Review Modal */}
      <MediaReviewModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        type="performance_dance"
        title="Évaluation de Danse IA (Note /5)"
        description="Chargez une vidéo de votre chorégraphie pour recevoir une note sur 5, une analyse de votre propreté de mouvements, votre énergie et des conseils de posture."
      />
    </div>
  );
};
