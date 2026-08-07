import React, { useState } from "react";
import { Star, CheckSquare, HelpCircle, Building2, UserCheck, Sparkles, RefreshCw, Dices } from "lucide-react";
import { KPOP_AGENCIES, PRE_AUDITION_CHECKLIST } from "../../data/disciplinesData";
import { MockAuditionSimulator } from "./MockAuditionSimulator";
import { CameraAuditionAnalyzer } from "./CameraAuditionAnalyzer";
import { TraineeMeditationModule } from "./TraineeMeditationModule";

const CONCEPTS = [
  { title: "Girl Crush / High Energy", desc: "Attitude confiante, beats trap lourds, tenues urbaines sombres et chorégraphie percutante à haut niveau d'énergie." },
  { title: "Y2K Retro / Nostalgic Synth", desc: "Inspiré des années 2000, basses groovy, esthétique caméscope rétro, voix douces et tenues de jean oversize." },
  { title: "Ethereal / Fantasy Magic", desc: "Mélodies féeriques, voix de tête cristallines, visuels de rêve pastel, chorégraphie fluide et gestuelle élégante." },
  { title: "Cyberpunk / Tech Futurist", desc: "Sons électroniques tranchants, néons, visuels 3D, vêtements techniques et chorégraphie au millimètre." },
  { title: "Fresh Summer Pop / Bright Aegyo", desc: "Mélodies solaires, voix souriantes, harmonies à plusieurs voix, couleurs vives et énergie contagieuse." }
];

export const TraineeGuideModule: React.FC = () => {
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem("kpop_audition_checklist");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return PRE_AUDITION_CHECKLIST;
  });

  const [activeAgencyId, setActiveAgencyId] = useState<string>("hybe");
  const [conceptIndex, setConceptIndex] = useState<number>(0);

  const toggleCheck = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    localStorage.setItem("kpop_audition_checklist", JSON.stringify(updated));
  };

  const selectedAgency = KPOP_AGENCIES.find((a) => a.id === activeAgencyId) || KPOP_AGENCIES[0];

  const handleRandomConcept = () => {
    setConceptIndex((prev) => (prev + 1) % CONCEPTS.length);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200/80 shadow-sm">
        <div className="flex items-center gap-3 text-purple-700 font-bold uppercase tracking-wider text-xs mb-2">
          <Star className="w-4 h-4" />
          <span>Guide Trainee & Recrutement</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Devenir Idole K-Pop & Réussir ses Auditions
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
          Comprenez le système de formation, découvrez la vision des 9 plus grandes agences et préparez votre checklist pré-audition.
        </p>
      </div>

      {/* Camera Audition Expression & Posture Analyzer */}
      <CameraAuditionAnalyzer />

      {/* Mock Audition Simulator & Timer */}
      <MockAuditionSimulator />

      {/* Trainee Meditation, Breathwork & Mental Care */}
      <TraineeMeditationModule />

      {/* Concept Generator Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Dices className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">Générateur de Concept & Direction Artistique Idole</h3>
          </div>

          <button
            onClick={handleRandomConcept}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Changer de Concept</span>
          </button>
        </div>

        <div className="p-5 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700">
            Concept & Identité de Groupe :
          </span>
          <h4 className="text-xl font-extrabold text-purple-950">{CONCEPTS[conceptIndex].title}</h4>
          <p className="text-xs text-slate-700 leading-relaxed">{CONCEPTS[conceptIndex].desc}</p>
        </div>
      </div>

      {/* Trainee Lifecycle Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>Le Système de Trainee (Du Recrutement aux Débuts)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="font-bold text-base text-slate-900">Recrutement & Audition</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Audition mondiale ou casting sauvage. Les juges recherchent du potentiel brut, la capacité d'apprentissage et la présence scénique plutôt qu'une perfection immédiate.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="font-bold text-base text-slate-900">Formation Quotidienne</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Emploi du temps rigoureux : cours de chant, chorégraphie, travail de la voix, langue (coréen/anglais), expression scénique et préparation physique.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-pink-600 text-white font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="font-bold text-base text-slate-900">Évaluations Mensuelles</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chaque mois, les trainees présentent une performance solo et en groupe devant la direction de l'agence pour évaluer la progression et former la composition du futur groupe.
            </p>
          </div>
        </div>
      </div>

      {/* Major Agencies Overview */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            <span>Aperçu des 9 Grandes Agences (Labels)</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {KPOP_AGENCIES.map((agency) => (
              <button
                key={agency.id}
                onClick={() => setActiveAgencyId(agency.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeAgencyId === agency.id
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {agency.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected agency profile */}
        <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-200 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">{selectedAgency.koreanName}</span>
              <h4 className="text-2xl font-black text-slate-900">{selectedAgency.name}</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedAgency.famousGroups.map((group, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-white border border-purple-200 text-xs font-bold text-purple-900 shadow-xs">
                  {group}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-700">{selectedAgency.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-purple-800 block mb-1">Critères d'audition ciblés :</span>
              <p className="text-xs text-slate-700">{selectedAgency.auditionStyle}</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-indigo-800 block mb-1">Spécificités reconnues :</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedAgency.knownFor.map((k, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 text-[10px] font-semibold border border-indigo-200">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-audition Checklist */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-600" />
          <span>Checklist Pré-Audition Interactive</span>
        </h3>

        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                item.completed
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-medium"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {}}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer shrink-0"
              />
              <span className={`text-xs font-medium ${item.completed ? "line-through text-slate-400" : ""}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ & After Audition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <span>FAQ Auditions Fréquentes</span>
          </h3>
          <div className="space-y-3 text-xs text-slate-700">
            <div>
              <span className="font-bold text-purple-900 block">Faut-il parler coréen couramment dès l'audition ?</span>
              Non. Connaître les salutations de base et se présenter poliment montre du respect et de la motivation.
            </div>
            <div>
              <span className="font-bold text-purple-900 block">Quel style de maquillage privilégier ?</span>
              Un maquillage 'No-Makeup' naturel et frais qui met en valeur la santé de la peau sans masquer vos traits.
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <span>Que se passe-t-il Après l'Audition ?</span>
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            En cas de rappel (callback), vous serez invité à une deuxième étape en agence ou en ligne. En cas de refus, ne le prenez pas personnellement : les critères d'audition cherchent souvent un profil spécifique pour un concept précis à un moment donné. Continuez à travailler vos compétences !
          </p>
        </div>
      </div>
    </div>
  );
};
