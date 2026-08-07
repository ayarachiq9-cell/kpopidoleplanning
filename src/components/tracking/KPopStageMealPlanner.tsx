import React, { useState } from "react";
import { Utensils, Droplets, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface MealStep {
  timeframe: string;
  title: string;
  recommendation: string;
  avoid: string;
  exampleFood: string;
}

const STAGE_MEAL_PLAN: MealStep[] = [
  {
    timeframe: "3 à 4 Heures Avant l'Évaluation",
    title: "Repas Principal à Énergie Lente (Complex Carbs + Lean Protein)",
    recommendation: "Chargez vos réserves de glycogène sans alourdir l'estomac.",
    avoid: "Évitez les produits laitiers, aliments frits ou très salés (rétention d'eau/ballonnements).",
    exampleFood: "Bol de riz brun ou patate douce vapeur + blanc de poulet grillé + concombre."
  },
  {
    timeframe: "1 Heure Avant la Scène / Passage",
    title: "Boost d'Énergie Rapide & Digestion Éclair",
    recommendation: "Une petite prise glucidique simple pour maintenir la glycémie.",
    avoid: "Pas de boissons gazeuses ni de caféine en excès (accélère le rythme cardiaque inutilement).",
    exampleFood: "1/2 banane ou 2 dattes + 1 grand verre d'eau plate à température ambiante."
  },
  {
    timeframe: "Pendant la Prestation & Répétition",
    title: "Hydratation Continue & Électrolytes",
    recommendation: "Sip d'eau toutes les 15 minutes pour préserver les cordes vocales et éviter les crampes.",
    avoid: "Eau glacée (choc thermique pour la gorge et contraction des cordes vocales).",
    exampleFood: "Eau tiède ou boisson électrolytique douce infusée au citron léger."
  },
  {
    timeframe: "30 Min Après l'Évaluation",
    title: "Récupération Musculaire & Apaisement Vocal",
    recommendation: "Reconstruisez le muscle sollicité par la danse et réhydratez.",
    avoid: "Sauter le repas de récupération par fatigue.",
    exampleFood: "Smoothie protéiné (lait d'avoine + banane + protéine végétale) ou bouillon de légumes."
  }
];

export const KPopStageMealPlanner: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const step = STAGE_MEAL_PLAN[activeStep];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-base">Timing Nutritionnel du Jour d'Évaluation Scénique</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
          Anti-Ballonnement & Énergie Lisse
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Adoptez le protocole des nutritionnistes de Seoul pour aborder les évaluations mensuelles et les tournages avec un estomac léger, une voix claire et une énergie maximale.
      </p>

      {/* Timeline Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {STAGE_MEAL_PLAN.map((item, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-emerald-600 border-emerald-700 text-white shadow-md shadow-emerald-200 scale-[1.02]"
                  : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase mb-1 opacity-90">
                <Clock className="w-3 h-3" />
                <span>Étape {idx + 1}</span>
              </div>
              <span className="font-bold text-xs leading-tight">{item.timeframe}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Box */}
      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-emerald-200/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-600 text-white rounded-xl font-bold text-xs">
              {activeStep + 1}
            </span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">{step.title}</h4>
              <span className="text-xs font-bold text-emerald-800">{step.timeframe}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-900 block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Objectif & Recommandation :</span>
            </span>
            <p className="text-slate-700">{step.recommendation}</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-rose-900 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>À Éviter Absolument :</span>
            </span>
            <p className="text-slate-700">{step.avoid}</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-900 block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Exemple de Collation / Repas :</span>
            </span>
            <p className="text-slate-800 font-bold">{step.exampleFood}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
