import React, { useState } from "react";
import { Sparkles, Sun, Moon, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Camera } from "lucide-react";
import { SKIN_ROUTINES, SKIN_APPLICATION_ORDER, SKIN_COMMON_ERRORS, SKIN_STAGE_TIPS, SKIN_QUIZ_QUESTIONS } from "../../data/disciplinesData";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { KBeautyIngredientAnalyzer } from "./KBeautyIngredientAnalyzer";

export const SkinModule: React.FC = () => {
  const [activeRoutine, setActiveRoutine] = useState<"morning" | "evening">("morning");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [isSkinScannerOpen, setIsSkinScannerOpen] = useState(false);

  const handleQuizOption = (qId: number, type: string) => {
    const updated = { ...quizAnswers, [qId]: type };
    setQuizAnswers(updated);

    if (Object.keys(updated).length === SKIN_QUIZ_QUESTIONS.length) {
      // Calculate majority
      const counts: Record<string, number> = {};
      (Object.values(updated) as string[]).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });

      let topType = "mixte";
      let maxCount = 0;
      Object.entries(counts).forEach(([t, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topType = t;
        }
      });

      const descriptions: Record<string, string> = {
        seche: "Peau Sèche : Privilégiez les huiles végétales nourissantes, sérums à l'acide hyaluronique et textures crèmes riches.",
        mixte: "Peau Mixte : Équilibrez l'hydratation avec des formules fluides légères et un ciblage matifiant sur la zone T.",
        grasse: "Peau Grasse : Optez pour des soins purifiants sans alcool, régulateurs de sébum (Niacinamide) et gels légers.",
        sensible: "Peau Sensible : Privilégiez des soins hypoallergéniques sans parfum à la Centella Asiatica et au Panthénol."
      };

      setQuizResult(descriptions[topType] || descriptions.mixte);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-pink-50 via-white to-purple-50 border border-pink-200/80 shadow-sm">
        <div className="flex items-center gap-3 text-pink-600 font-bold uppercase tracking-wider text-xs mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Soin & Teint de Scène K-Beauty</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Peau de Trainee & Éclat Scénique
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
          Apprenez à préserver votre barrière cutanée malgré le maquillage de scène, la transpiration et le rythme intense d'entraînement.
        </p>

        <button
          onClick={() => setIsSkinScannerOpen(true)}
          className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md shadow-pink-200 transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Scanner Photo Diagnostic Peau & Maquillage Scénique IA</span>
        </button>
      </div>

      {/* K-Beauty Active Ingredients Analyzer */}
      <KBeautyIngredientAnalyzer />

      {/* Routine Matin / Soir Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Routines Quotidiennes</span>
          </h3>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveRoutine("morning")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeRoutine === "morning"
                  ? "bg-white text-amber-800 shadow-sm border border-amber-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Routine Matin</span>
            </button>
            <button
              onClick={() => setActiveRoutine("evening")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeRoutine === "evening"
                  ? "bg-white text-indigo-900 shadow-sm border border-indigo-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-500" />
              <span>Routine Soir</span>
            </button>
          </div>
        </div>

        {/* Steps timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {SKIN_ROUTINES[activeRoutine].map((step) => (
            <div
              key={step.step}
              className="bg-slate-50/70 border border-slate-200/80 hover:border-pink-300 rounded-xl p-4 transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="w-7 h-7 rounded-full bg-pink-100 border border-pink-300 text-pink-700 font-bold text-xs flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skin Type Quiz (3 Questions) */}
      <div className="bg-white border border-purple-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-600" />
          <h3 className="text-xl font-bold text-slate-900">Quiz Express : Quel est votre type de peau ?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKIN_QUIZ_QUESTIONS.map((q) => (
            <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Question {q.id}</span>
              <p className="text-sm font-semibold text-slate-800">{q.question}</p>
              <div className="space-y-2 pt-2">
                {q.options.map((opt, i) => {
                  const isSelected = quizAnswers[q.id] === opt.type;
                  return (
                    <button
                      key={i}
                      onClick={() => handleQuizOption(q.id, opt.type)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                        isSelected
                          ? "bg-purple-100/80 border-purple-400 text-purple-900 font-bold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {quizResult && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-purple-900">Votre Diagnostic Cutané :</h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">{quizResult}</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Application Order & Common Mistakes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Lesson */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Règle d'or : Ordre d'application des soins</span>
          </h3>
          <div className="space-y-3">
            {SKIN_APPLICATION_ORDER.map((item) => (
              <div key={item.rank} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {item.rank}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.category} ({item.name})</h4>
                  <p className="text-xs text-slate-600">{item.rule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Tips & Errors */}
        <div className="space-y-6">
          <div className="bg-white border border-amber-200/80 rounded-2xl p-6 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Conseils Avant de Monter sur Scène</span>
            </h3>
            <ul className="space-y-2">
              {SKIN_STAGE_TIPS.map((tip, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-rose-200/80 rounded-2xl p-6 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Erreurs Fréquentes à Éviter</span>
            </h3>
            <ul className="space-y-2">
              {SKIN_COMMON_ERRORS.map((err, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Skin & Makeup Scanner Modal */}
      <MediaReviewModal
        isOpen={isSkinScannerOpen}
        onClose={() => setIsSkinScannerOpen(false)}
        type="skin"
        title="Scanner Photo Diagnostic Peau & Maquillage IA"
        description="Chargez une photo pour recevoir un bilan bienveillant sur l'état d'hydratation, l'éclat du teint et des astuces pour préserver votre peau sous les projecteurs."
      />
    </div>
  );
};
