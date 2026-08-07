import React, { useState } from "react";
import { Zap, RefreshCw, BookOpen, Video } from "lucide-react";
import { RAP_FREESTYLE_WORDS, RAP_RHYME_DICTIONARY } from "../../data/disciplinesData";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { MetronomeWidget } from "../shared/MetronomeWidget";
import { RapSpeedRampDrill } from "./RapSpeedRampDrill";

export const RapModule: React.FC = () => {
  // Freestyle words state
  const [currentWord, setCurrentWord] = useState(RAP_FREESTYLE_WORDS[0]);

  // Video Review modal
  const [isRapModalOpen, setIsRapModalOpen] = useState(false);

  const handleNextWord = () => {
    const randomIndex = Math.floor(Math.random() * RAP_FREESTYLE_WORDS.length);
    setCurrentWord(RAP_FREESTYLE_WORDS[randomIndex]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-orange-50 border border-amber-200/80 shadow-sm">
        <div className="flex items-center gap-3 text-amber-700 font-bold uppercase tracking-wider text-xs mb-2">
          <Zap className="w-4 h-4" />
          <span>Rap, Flow & Rythme K-Pop</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Flow, Rimes & Entraîneur Freestyle
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
          Travaillez votre articulation, votre débit sur le beat et votre créativité de punchlines pour impressionner lors des évaluations.
        </p>

        <button
          onClick={() => setIsRapModalOpen(true)}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-200 transition-all cursor-pointer"
        >
          <Video className="w-4 h-4" />
          <span>Évaluation Rap IA (Noté /5)</span>
        </button>
      </div>

      {/* Metronome Widget */}
      <MetronomeWidget />

      {/* Speed Ramp Flow & Articulation Drill */}
      <RapSpeedRampDrill />

      {/* Freestyle Word Generator */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <span>Générateur de Mots Impromptu (Freestyle Drill)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Incorporez immédiatement le mot affiché dans votre mesure rap !
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-center space-y-4">
          <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-widest">
            Mot à placer dans votre rime :
          </span>
          <div className="text-4xl font-black text-slate-900 tracking-wide uppercase font-mono">
            "{currentWord}"
          </div>
          <button
            onClick={handleNextWord}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Nouveau Mot Aléatoire</span>
          </button>
        </div>
      </div>

      {/* Rhyme Dictionary by Sound Family */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <span>Dictionnaire de Rimes par Famille de Sons</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RAP_RHYME_DICTIONARY.map((fam, idx) => (
            <div key={idx} className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-amber-800">{fam.soundFamily}</h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {fam.words.map((w, wIdx) => (
                  <span key={wIdx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs text-slate-700 font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Verses by Level */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Couplets d'Entraînement par Niveau</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">Débutant</span>
            <p className="text-xs text-slate-300 font-mono leading-relaxed pt-1">
              "Sur la scène je fais le premier pas,<br />
              Chaque effort guidé par le rythme en bas.<br />
              Un regard confiant, je ne renonce pas !"
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300">Intermédiaire</span>
            <p className="text-xs text-slate-300 font-mono leading-relaxed pt-1">
              "Accélération du débit, synchronisé sur le beat,<br />
              Passage du silence au climax sans aucune fuite,<br />
              Le projet prend forme, la présence s'invite !"
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300">Avancé</span>
            <p className="text-xs text-slate-300 font-mono leading-relaxed pt-1">
              "Impact, frappe, rimes internes tranchantes,<br />
              Vision claire, pas de fausse note hésitante,<br />
              Je domine l'espace, la foule est trépidante !"
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <MediaReviewModal
        isOpen={isRapModalOpen}
        onClose={() => setIsRapModalOpen(false)}
        type="performance_rap"
        title="Évaluation de Rap IA (Note /5)"
        description="Chargez une vidéo ou un audio de votre verse rap pour recevoir une note sur 5, un retour sur votre débit, votre articulation et votre charisme."
      />
    </div>
  );
};
