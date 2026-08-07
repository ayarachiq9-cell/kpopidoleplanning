import React, { useState } from "react";
import { Sparkles, RefreshCw, Heart, Quote, Star, Award } from "lucide-react";

const AFFIRMATIONS = [
  {
    quote: "La régularité bat le talent pur. Chaque heure passée en studio aujourd'hui forgera ta présence scénique de demain.",
    author: "Conseil de Formateur K-Pop",
    tag: "Persévérance"
  },
  {
    quote: "Tu ne te bats pas contre les autres trainees, tu te dépasses toi-même par rapport à hier. Célèbre chaque petit progrès !",
    author: "Mindset Idole",
    tag: "Confiance"
  },
  {
    quote: "Même les plus grands artistes de la 3ème et 4ème génération ont connu le doute pendant leurs évaluations. Continue de croire en ton étincelle.",
    author: "Esprit de Groupe",
    tag: "Mental D'Acier"
  },
  {
    quote: "La respiration et le calme en coulisses font la moitié de la magie scénique. Respire profondément, tu es prêt(e).",
    author: "Coach Vocal & Scénique",
    tag: "Gestion du Stress"
  },
  {
    quote: "L'authenticité et ton sourire sincère toucheront le public bien plus fort qu'une technique sans âme. Reste toi-même !",
    author: "Directeur de Performance",
    tag: "Charisme"
  }
];

export const TraineeAffirmationCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const item = AFFIRMATIONS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
  };

  return (
    <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-2xl p-6 text-white shadow-md space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-200" />
          <span className="text-xs font-black uppercase tracking-widest text-pink-100">
            Affirmation & Mindset D'Idole K-Pop
          </span>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Nouvelle Affirmation</span>
        </button>
      </div>

      <div className="py-2 space-y-3">
        <p className="text-sm md:text-base font-extrabold leading-relaxed italic drop-shadow-xs">
          "{item.quote}"
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
          <span className="font-bold opacity-90">{item.author}</span>
          <span className="px-3 py-0.5 rounded-full bg-white/20 font-black uppercase tracking-wider text-[10px]">
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  );
};
