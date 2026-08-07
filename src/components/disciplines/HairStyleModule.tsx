import React, { useState } from "react";
import { Sparkles, Scissors, Shirt, Camera, Droplets, Heart } from "lucide-react";
import { HAIR_TYPES_INFO, STAGE_HAIRSTYLES } from "../../data/disciplinesData";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { EndingFairyTrainer } from "./EndingFairyTrainer";
import { StageConceptStyleMatcher } from "./StageConceptStyleMatcher";
import { OutfitCameraScanAnalyzer } from "./OutfitCameraScanAnalyzer";

export const HairStyleModule: React.FC = () => {
  const [modalType, setModalType] = useState<"hair" | "outfit" | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200/80 shadow-sm">
        <div className="flex items-center gap-3 text-purple-700 font-bold uppercase tracking-wider text-xs mb-2">
          <Scissors className="w-4 h-4" />
          <span>Image & Charisme de Scène</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Cheveux, Coiffures & Scanner de Tenue
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
          Trouvez des coiffures résistantes à la scène et obtenez des conseils de style vestimentaire toujours bienveillants et positifs.
        </p>

        {/* AI Scanner Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => setModalType("hair")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-200 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>Scanner Photo Cheveux (Texture & Idées)</span>
          </button>

          <button
            onClick={() => setModalType("outfit")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md shadow-pink-200 transition-all cursor-pointer"
          >
            <Shirt className="w-4 h-4" />
            <span>Scanner de Tenue (Avis Style Bienveillant)</span>
          </button>
        </div>
      </div>

      {/* AI Outfit Camera Scan & Trend Analyzer */}
      <OutfitCameraScanAnalyzer />

      {/* Interactive Ending Fairy & Camera Eye Contact Trainer */}
      <EndingFairyTrainer />

      {/* Stage Concept & Style Matcher */}
      <StageConceptStyleMatcher />

      {/* Hair Types Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>Les 4 Types de Cheveux & Soins de Scène</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HAIR_TYPES_INFO.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase text-purple-600 tracking-wider">Type {idx + 1}</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">{item.type}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-purple-800">Conseil d'entretien :</span>
                <p className="text-xs text-slate-600 mt-1">{item.care}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Hairstyles & After Sweating Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hairstyles List */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-purple-600" />
            <span>Coiffures Incontournables de Scène</span>
          </h3>

          <div className="space-y-3">
            {STAGE_HAIRSTYLES.map((style, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{style.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    {style.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{style.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sweating Advice & Outfit Guidelines */}
        <div className="space-y-6">
          <div className="bg-white border border-blue-200/80 rounded-2xl p-6 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span>Gestion Après Transpiration Répétée</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Sécher rapidement le cuir chevelu au séchoir air froid pour éviter l'humidité stagnante.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Utiliser un shampooing sec à l'amidon de riz directement sur les racines pour absorber l'excès de sébum.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Rincer à l'eau tiède plutôt que chaude pour ne pas assécher la fibre capillaire.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-pink-200/80 rounded-2xl p-6 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-pink-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <span>Engagement Bienveillance Outfit</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Le scanner de tenue utilise l'IA pour évaluer la cohérence stylistique des vêtements, la palette de couleurs et l'harmonie des accessoires. <strong className="text-pink-700">Aucun jugement sur le corps, le poids ou la morphologie n'est émis.</strong> Le style est une expression d'énergie et de confiance !
            </p>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {modalType && (
        <MediaReviewModal
          isOpen={!!modalType}
          onClose={() => setModalType(null)}
          type={modalType}
          title={modalType === "hair" ? "Analyse Capillaire IA" : "Scanner de Tenue de Scène IA"}
          description={
            modalType === "hair"
              ? "Prenez ou chargez une photo de vos cheveux pour obtenir un diagnostic de texture et 3 propositions de coiffures."
              : "Prenez une photo de votre outfit de répétition ou de scène pour recevoir un retour bienveillant sur l'harmonie des vêtements et accessoires."
          }
        />
      )}
    </div>
  );
};
