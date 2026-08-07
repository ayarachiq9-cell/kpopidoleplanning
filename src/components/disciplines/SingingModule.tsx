import React, { useState, useEffect } from "react";
import { Mic, Play, Pause, RotateCcw, Volume2, ShieldAlert, Sparkles, Video } from "lucide-react";
import { TONGUE_TWISTERS } from "../../data/disciplinesData";
import { soundEngine } from "../../utils/audio";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { VocalScaleGenerator } from "./VocalScaleGenerator";
import { VocalRangeTester } from "./VocalRangeTester";

export const SingingModule: React.FC = () => {

  // Breathing animation states
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Rest">("Inhale");
  const [phaseTime, setPhaseTime] = useState(4);
  const [breathCount, setBreathCount] = useState(0);

  // Tongue twisters repetition counters
  const [twisterCounts, setTwisterCounts] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });

  // Media review modal state
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Breathing Circle Timer
  useEffect(() => {
    let interval: any = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setPhaseTime((prev) => {
          if (prev <= 1) {
            // Switch phase
            if (breathingPhase === "Inhale") {
              setBreathingPhase("Hold");
              soundEngine.playBeep(true);
              return 4;
            } else if (breathingPhase === "Hold") {
              setBreathingPhase("Exhale");
              soundEngine.playBeep(false);
              return 4;
            } else if (breathingPhase === "Exhale") {
              setBreathingPhase("Rest");
              soundEngine.playBeep(false);
              return 2;
            } else {
              setBreathingPhase("Inhale");
              setBreathCount((c) => c + 1);
              soundEngine.playBeep(true);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPhase]);

  const handleTwisterIncrement = (idx: number) => {
    setTwisterCounts((prev) => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/20 shadow-xl">
        <div className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-wider text-xs mb-2">
          <Mic className="w-4 h-4" />
          <span>Vocal & Technique K-Pop</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Chant, Respiration & Posture de Scène
        </h2>
        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
          Développez une voix puissante et stable capable d'assurer de la danse intense tout en maintenant la justesse.
        </p>

        <button
          onClick={() => setIsReviewOpen(true)}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-950/50 transition-all"
        >
          <Video className="w-4 h-4" />
          <span>Évaluation Vidéo / Audio IA (Noté /5)</span>
        </button>
      </div>

      {/* Guided Breathing Exercise Section */}
      <div className="bg-slate-900/80 border border-blue-500/30 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span>Exercice Guidé de Respiration Diaphragmatique</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Synchronisez la contraction de votre diaphragme avec le cercle animé.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isBreathingActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isBreathingActive ? "Pause" : "Démarrer"}</span>
            </button>
            <button
              onClick={() => {
                setIsBreathingActive(false);
                setBreathingPhase("Inhale");
                setPhaseTime(4);
                setBreathCount(0);
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Breathing Visualizer Circle */}
        <div className="flex flex-col items-center justify-center py-8 bg-slate-950/60 border border-slate-800 rounded-2xl relative overflow-hidden">
          {/* Animated Circle */}
          <div className="relative flex items-center justify-center w-64 h-64">
            <div
              className={`absolute rounded-full transition-all duration-1000 ease-in-out ${
                breathingPhase === "Inhale"
                  ? "w-56 h-56 bg-blue-500/30 border-2 border-blue-400 scale-100"
                  : breathingPhase === "Hold"
                  ? "w-56 h-56 bg-indigo-500/40 border-2 border-indigo-400 scale-105"
                  : breathingPhase === "Exhale"
                  ? "w-24 h-24 bg-purple-500/30 border-2 border-purple-400 scale-90"
                  : "w-24 h-24 bg-slate-700/30 border-2 border-slate-500 scale-90"
              }`}
            />

            <div className="relative z-10 text-center space-y-1">
              <span className="text-3xl font-black text-white">{phaseTime}s</span>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
                {breathingPhase === "Inhale" && "Inspirer (Gonfler le ventre)"}
                {breathingPhase === "Hold" && "Bloquer (Soutien abdominal)"}
                {breathingPhase === "Exhale" && "Expirer (Sifflement continu)"}
                {breathingPhase === "Rest" && "Repos"}
              </p>
              <span className="text-xs text-slate-400 block pt-1">Séries : {breathCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Piano Vocal Scale Generator */}
      <VocalScaleGenerator />

      {/* Vocal Range Tester & Idol Matcher */}
      <VocalRangeTester />

      {/* Vocal Lessons & Techniques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Posture & Voix de poitrine/tête */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Posture & Registres Vocaux</h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-blue-400 block mb-1">Posture Droite mais Souple :</span>
              Pieds écartés à largeur d'épaules, sternum relevé, épaules basses. Ne jamais tendre la gorge.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-indigo-400 block mb-1">Voix de Poitrine (Chest Voice) :</span>
              Utilisée pour les couplets et les phrases puissantes. Résonance dans la cage thoracique.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-pink-400 block mb-1">Voix de Tête & Mixte (Head & Mixed Voice) :</span>
              Fondamentale pour les notes hautes K-Pop (High Notes). La voix mixte alliance puissance et agilité.
            </div>
          </div>
        </div>

        {/* Tongue Twisters with Counter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Virelangues (Articulation & Débit)</h3>
          <div className="space-y-3">
            {TONGUE_TWISTERS.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-200">{item.fr}</p>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <p className="text-xs text-blue-300 font-mono">{item.kr}</p>
                  <button
                    onClick={() => soundEngine.speakKorean(item.kr)}
                    className="p-1 rounded bg-blue-950 text-blue-300 hover:bg-blue-900 text-[10px] flex items-center gap-1 shrink-0"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Écouter</span>
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-slate-900 pt-2">
                  <span className="text-[11px] text-slate-400">Répétitions : {twisterCounts[idx] || 0}</span>
                  <button
                    onClick={() => handleTwisterIncrement(idx)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                  >
                    +1 Réussi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Rule & Vocal Rest Days */}
      <div className="p-6 bg-rose-950/40 border border-rose-500/30 rounded-2xl flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-rose-200">Règle de Sécurité sur la Douleur Vocal</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-rose-300">Le chant ne doit JAMAIS faire mal.</strong> Si vous ressentez un picotement, un enrouement ou une gêne dans la gorge, arrêtez immédiatement. Observez au moins un jour de repos vocal complet (silence, tisane tiède au miel, pas de chuchotement) pour régénérer les cordes vocales.
          </p>
        </div>
      </div>

      {/* Media Review Modal */}
      <MediaReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        type="performance_singing"
        title="Évaluation de Chant IA (Note /5)"
        description="Chargez un enregistrement audio ou vidéo de votre prestation vocale pour recevoir une note détaillée sur 5, votre justesse, votre soutien respiratoire et des conseils sur-mesure."
      />
    </div>
  );
};
