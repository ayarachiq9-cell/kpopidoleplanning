import React, { useState } from "react";
import { Droplets, Sparkles, ShieldCheck, CheckCircle2, ChevronRight, Info } from "lucide-react";

interface IngredientInfo {
  name: string;
  koreanName: string;
  bestFor: string;
  benefits: string;
  usageTip: string;
  icon: string;
}

const INGREDIENTS: IngredientInfo[] = [
  {
    name: "Centella Asiatica (Cica)",
    koreanName: "병풀 (Byeong-pul)",
    bestFor: "Rougeurs, Peau échauffée après la danse, Irritations",
    benefits: "Apaise immédiatement l'inflammation cutanée et régénère la barrière protectrice.",
    usageTip: "À appliquer en sérum ou masque apaisant immédiatement après le nettoyage du visage post-entraînement.",
    icon: "🌿"
  },
  {
    name: "Niacinamide (Vitamine B3)",
    koreanName: "나이아신아마이드",
    bestFor: "Teint terne, Taches post-boutons, Port de maquillage intense",
    benefits: "Régule le sébum, resserre l'apparence des pores et uniformise l'éclat du teint scénique.",
    usageTip: "Idéal le matin sous la crème solaire et la base de maquillage de scène.",
    icon: "✨"
  },
  {
    name: "BHA / Acide Salicylique",
    koreanName: "살리실산",
    bestFor: "Pores obstrués par la transpiration, Comédons, Peau grasse",
    benefits: "Pénètre en profondeur dans les pores pour dissoudre l'excès de sébum et les résidus de fond de teint.",
    usageTip: "Utiliser 2 à 3 soirs par semaine dans la tonique exfoliante douce.",
    icon: "💧"
  },
  {
    name: "Acide Hyaluronique Multi-Poids",
    koreanName: "히알루론산",
    bestFor: "Déshydratation due à la climatisation des studios & projecteurs",
    benefits: "Gorge la peau d'eau sur plusieurs couches sans laisser d'effet gras ou lourd.",
    usageTip: "Appliquer sur peau légèrement humide pour maximiser la rétention d'eau.",
    icon: "🌊"
  },
  {
    name: "Heartleaf (Houttuynia Cordata)",
    koreanName: "어성초 (Eoseongcho)",
    bestFor: "Peau réactive, Pousse de boutons de stress d'évaluation",
    benefits: "L'ingrédient phare des idoles pour calmer les poussées soudaines dues au stress.",
    usageTip: "Utiliser en toner pad (coton imbibé) posé 5 minutes sur les zones sensibles.",
    icon: "🍃"
  }
];

export const KBeautyIngredientAnalyzer: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientInfo>(INGREDIENTS[0]);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-pink-600" />
          <h3 className="font-bold text-slate-900 text-base">Guide & Sélecteur d'Actifs K-Beauty pour Idoles</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-pink-50 text-pink-700 rounded-full border border-pink-200">
          Actifs Dermatologiques Tendances
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Découvrez les 5 ingrédients clés de la cosmétique coréenne utilisés par les dermatologues de Seoul pour préserver une peau de porcelaine ("Glass Skin") sous les projecteurs.
      </p>

      {/* Ingredient Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {INGREDIENTS.map((ing) => {
          const isSelected = selectedIngredient.name === ing.name;
          return (
            <button
              key={ing.name}
              onClick={() => setSelectedIngredient(ing)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-pink-600 border-pink-700 text-white shadow-md shadow-pink-200 scale-[1.02]"
                  : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span className="text-xl mb-1">{ing.icon}</span>
              <div>
                <h4 className="font-extrabold text-xs leading-tight">{ing.name.split(" (")[0]}</h4>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-pink-100" : "text-slate-500"}`}>
                  {ing.koreanName}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Card */}
      <div className="p-5 bg-pink-50/70 border border-pink-200/80 rounded-2xl space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-pink-200/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedIngredient.icon}</span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">{selectedIngredient.name}</h4>
              <span className="text-xs font-semibold text-pink-700">{selectedIngredient.koreanName}</span>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white border border-pink-300 rounded-full text-pink-900 shadow-xs">
            Cible : {selectedIngredient.bestFor}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-pink-200/60 space-y-1">
            <span className="font-extrabold text-pink-900 block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
              <span>Bénéfices pour Trainee K-Pop :</span>
            </span>
            <p className="text-slate-700 leading-relaxed">{selectedIngredient.benefits}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-pink-200/60 space-y-1">
            <span className="font-extrabold text-pink-900 block flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-pink-600" />
              <span>Conseil d'Application en Studio :</span>
            </span>
            <p className="text-slate-700 leading-relaxed">{selectedIngredient.usageTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
