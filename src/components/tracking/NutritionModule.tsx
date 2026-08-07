import React, { useState } from "react";
import { Utensils, Droplets, Camera, HeartHandshake, Sparkles, Plus, Minus } from "lucide-react";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { KPopStageMealPlanner } from "./KPopStageMealPlanner";
import { KPopMealMenuCategories } from "./KPopMealMenuCategories";

export const NutritionModule: React.FC = () => {
  // Hydration tracker (8 glasses = 2L)
  const [waterGlasses, setWaterGlasses] = useState(() => {
    const saved = localStorage.getItem("kpop_water_glasses");
    return saved ? Number(saved) : 4;
  });

  const [activePlateSection, setActivePlateSection] = useState<"protein" | "fiber" | "carbs">("protein");
  const [isFoodScannerOpen, setIsFoodScannerOpen] = useState(false);

  const updateWater = (delta: number) => {
    const updated = Math.min(8, Math.max(0, waterGlasses + delta));
    setWaterGlasses(updated);
    localStorage.setItem("kpop_water_glasses", String(updated));
  };

  const plateDetails = {
    protein: {
      title: "50% Protéines & Construction Musculaire",
      desc: "Essentielles pour la réparation musculaire après la danse et le sport. Favorisent la satiété et l'énergie durable.",
      examples: ["Tofu mariné", "Poulet / Dinde grillée", "Œufs pochés", "Poisson / Saumon", "Lentilles & Edamame"]
    },
    fiber: {
      title: "30% Fibres, Légumes & Vitamines",
      desc: "Apportent les micronutriments, antioxydants et soutiennent la digestion. Maintiennent une peau éclatante.",
      examples: ["Brocolis à la vapeur", "Kimchi traditionnel", "Épinards sautés au sésame", "Concombre & Carottes", "Avocat"]
    },
    carbs: {
      title: "20% Glucides Complexes & Énergie Scénique",
      desc: "Le carburant du cerveau et des muscles pendant les répétitions longues. À privilégier à indice glycémique bas.",
      examples: ["Riz brun ou riz complet", "Patate douce au four", "Avoine complet", "Quinoa", "Pain au levain"]
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-emerald-950/70 border border-teal-500/20 shadow-xl">
        <div className="flex items-center gap-3 text-teal-400 font-bold uppercase tracking-wider text-xs mb-2">
          <Utensils className="w-4 h-4" />
          <span>Énergie, Vitalité & Santé</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Alimentation Vitalité & Hydratation
        </h2>
        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
          Découvrez l'assiette type équilibrée, suivez votre hydratation et scannez vos plats pour un avis orienté énergie sans restriction.
        </p>

        <button
          onClick={() => setIsFoodScannerOpen(true)}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-950/50 transition-all"
        >
          <Camera className="w-4 h-4" />
          <span>Scanner d'Aliment Photo IA (Orienté Énergie)</span>
        </button>
      </div>

      {/* Stage & Evaluation Day Meal Timing Planner */}
      <KPopStageMealPlanner />

      {/* Categorized Meal Menu Examples (Petit-déjeuner, Déjeuner, Casse-croûte, Dîner) */}
      <KPopMealMenuCategories />

      {/* Interactive Plate Model Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-400" />
          <span>Modèle d'Assiette Type Interactive (Cliquez sur les portions)</span>
        </h3>

        {/* Visual Plate selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActivePlateSection("protein")}
            className={`p-5 rounded-2xl border transition-all text-left space-y-2 ${
              activePlateSection === "protein"
                ? "bg-teal-950/80 border-teal-500 shadow-lg shadow-teal-950/50"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">50% Protéines</span>
            <h4 className="text-lg font-bold text-white">Réparation Musculaire</h4>
            <p className="text-xs text-slate-400">Maintien de la masse musculaire lors de la danse intensive.</p>
          </button>

          <button
            onClick={() => setActivePlateSection("fiber")}
            className={`p-5 rounded-2xl border transition-all text-left space-y-2 ${
              activePlateSection === "fiber"
                ? "bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-950/50"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">30% Fibres & Légumes</span>
            <h4 className="text-lg font-bold text-white">Vitamines & Éclat</h4>
            <p className="text-xs text-slate-400">Micro-nutriments, antioxydants et confort digestif.</p>
          </button>

          <button
            onClick={() => setActivePlateSection("carbs")}
            className={`p-5 rounded-2xl border transition-all text-left space-y-2 ${
              activePlateSection === "carbs"
                ? "bg-amber-950/80 border-amber-500 shadow-lg shadow-amber-950/50"
                : "bg-slate-950 border-slate-800 hover:border-slate-700"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">20% Glucides Complexes</span>
            <h4 className="text-lg font-bold text-white">Carburant Scénique</h4>
            <p className="text-xs text-slate-400">Énergie lente sans coup de fatigue pour les répétitions.</p>
          </button>
        </div>

        {/* Selected Portion Detail */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-lg font-bold text-white">{plateDetails[activePlateSection].title}</h4>
          <p className="text-xs text-slate-300">{plateDetails[activePlateSection].desc}</p>
          <div className="pt-2">
            <span className="text-xs font-bold text-teal-300 block mb-2">Exemples recommandés :</span>
            <div className="flex flex-wrap gap-2">
              {plateDetails[activePlateSection].examples.map((ex, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clickable Hydration Tracker */}
      <div className="bg-slate-900/80 border border-blue-500/20 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span>Suivi d'Hydratation Quotidien (Objectif 2 Litres / 8 Verres)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Une hydratation adéquate évite les crampes musculaires et protège la voix.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateWater(-1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-black text-white font-mono">{waterGlasses} / 8 verres</span>
            <button
              onClick={() => updateWater(1)}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Water Glasses Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {Array.from({ length: 8 }).map((_, idx) => {
            const isFilled = idx < waterGlasses;
            return (
              <button
                key={idx}
                onClick={() => setWaterGlasses(idx + 1)}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  isFilled
                    ? "bg-blue-950/80 border-blue-400 text-blue-300 shadow-md shadow-blue-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700"
                }`}
              >
                <Droplets className={`w-6 h-6 ${isFilled ? "text-blue-400 fill-blue-400" : "text-slate-600"}`} />
                <span className="text-[10px] font-bold">250ml</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Healthy Snack Ideas & Non-Diet Commitment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-white">Idées d'Encas Avant / Après Séance</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-teal-400 block">Avant Répétition (Énergie rapide) :</span>
              Une banane avec 1 poignée d'amandes ou une galette d'avoine.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block">Après Répétition (Récupération) :</span>
              Smoothie protéiné aux fruits rouges ou yaourt grec avec un filet de miel.
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-teal-500/20 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-teal-400" />
            <span>Philosophie Santé Sans Régime Chiffré</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cette section bannit le comptage strict de calories et la culpabilisation alimentaire. L'objectif est d'apporter au corps l'énergie et la vitalité dont il a besoin pour s'épanouir sur scène en toute sécurité et avec plaisir.
          </p>
        </div>
      </div>

      {/* Food Scanner Modal */}
      <MediaReviewModal
        isOpen={isFoodScannerOpen}
        onClose={() => setIsFoodScannerOpen(false)}
        type="food"
        title="Scanner d'Aliment IA (Orientation Vitalité)"
        description="Prenez une photo de votre plat pour obtenir un avis positif et bienveillant sur son apport en énergie et nutriments pour la pratique artistique (sans aucun calcul de calories)."
      />
    </div>
  );
};
