import React, { useState, useEffect } from "react";
import { Building2, Play, Square, RotateCcw, Award, Sparkles, CheckCircle2, AlertCircle, Clock, Volume2 } from "lucide-react";
import { soundEngine } from "../../utils/audio";

const JUDGE_QUESTIONS = [
  "Pourquoi souhaitez-vous rejoindre notre agence plutôt qu'une autre ?",
  "Pouvez-vous nous chanter 4 mesures a cappella du refrain de votre chanson préférée ?",
  "Montrez-nous votre meilleure expression faciale 'Ending Fairy' devant la caméra.",
  "Combien d'heures par semaine consacrez-vous à la danse et au chant ?",
  "Quelle est votre idole de référence et quel aspect de son travail vous inspire le plus ?",
  "Faites-nous une démonstration de freestyle rap ou de mouvement de danse impromptu !",
  "Comment réagissez-vous sous la pression des évaluations mensuelles ?"
];

export const MockAuditionSimulator: React.FC = () => {
  const [isAuditionActive, setIsAuditionActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentQuestion, setCurrentQuestion] = useState<string>(JUDGE_QUESTIONS[0]);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    "Posture droite & salutation respectueuse (90°)": false,
    "Présentation claire en coréen / français": false,
    "Regard fixe vers la caméra (Eye-Contact)": false,
    "Sourire naturel & gestion du stress": false,
    "Respect du temps imposé (60s max)": false,
  });

  useEffect(() => {
    let timer: any = null;
    if (isAuditionActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsAuditionActive(false);
            soundEngine.playSuccess();
            return 0;
          }
          if (prev === 10) {
            soundEngine.playBeep(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAuditionActive, timeLeft]);

  const handleStartAudition = () => {
    const randomQ = JUDGE_QUESTIONS[Math.floor(Math.random() * JUDGE_QUESTIONS.length)];
    setCurrentQuestion(randomQ);
    setTimeLeft(60);
    setIsAuditionActive(true);
  };

  const handleReset = () => {
    setIsAuditionActive(false);
    setTimeLeft(60);
  };

  const toggleCheck = (item: string) => {
    setChecklist((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-base">Simulateur d'Audition à Huis Clos Chronométrée (Mock Audition)</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
          Chronomètre 60 Secondes
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Entraînez-vous dans les conditions réelles d'une audition d'agence : 60 secondes chrono pour captiver l'attention des juges et répondre à leurs questions pièges.
      </p>

      {/* Simulator Display */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-mono font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-indigo-500/30">
              {timeLeft}s
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">
                STATUT DU JURY EN DIRECT :
              </span>
              <span className="text-sm font-extrabold text-white">
                {isAuditionActive ? "🔴 ÉVALUATION EN COURS (REC)" : "⚪ EN ATTENTE DE DÉMARRAGE"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {!isAuditionActive ? (
              <button
                onClick={handleStartAudition}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Lancer le Chrono Audition</span>
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Interrompre</span>
              </button>
            )}
          </div>
        </div>

        {/* Judge Question Prompt */}
        <div className="p-4 bg-slate-950/90 border border-indigo-500/30 rounded-xl space-y-1">
          <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider block">
            ❓ Question Imprévue Posée par le Directeur de Casting :
          </span>
          <p className="text-sm md:text-base font-bold text-indigo-100 italic">
            "{currentQuestion}"
          </p>
        </div>
      </div>

      {/* Audition Criteria Checklist */}
      <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <span className="text-xs font-extrabold text-slate-800 block">
          Grille d'Auto-Évaluation après la simulation :
        </span>

        <div className="space-y-2">
          {Object.entries(checklist).map(([key, value]) => (
            <button
              key={key}
              onClick={() => toggleCheck(key)}
              className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                value
                  ? "bg-indigo-50 border-indigo-300 text-indigo-950"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${value ? "text-indigo-600" : "text-slate-300"}`} />
                <span>{key}</span>
              </div>
              <span className={`text-[10px] uppercase font-mono ${value ? "text-indigo-700" : "text-slate-400"}`}>
                {value ? "VALIDÉ" : "À COCHER"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
