import React, { useState } from "react";
import { Scissors, Shirt, Sparkles, Star, Mic, CheckCircle2 } from "lucide-react";

interface ConceptStyle {
  id: string;
  name: string;
  kpopExamples: string;
  hairStyle: string;
  makeupFocus: string;
  outfitKeys: string;
  micStyle: string;
  icon: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
}

const STAGE_CONCEPTS: ConceptStyle[] = [
  {
    id: "techwear",
    name: "Techwear & Futuristic Cyber",
    kpopExamples: "Aespa, Stray Kids, NCT 127",
    hairStyle: "Queue de cheval haute ultra-lisse (Sleek Ponytail), mèches argentées ou tresses métalliques.",
    makeupFocus: "Eyeliner graphique néon, highlights métalliques, teint mat zéro défaut.",
    outfitKeys: "Sangles ajustables, gilet tactique, bottes compensées et accessoires réfléchissants.",
    micStyle: "Micro sans fil Noir Mat (Matte Black) avec anneau LED néon",
    icon: "⚡",
    colorBg: "bg-cyan-50",
    colorBorder: "border-cyan-300",
    colorText: "text-cyan-950"
  },
  {
    id: "y2k",
    name: "Y2K Revival & Streetwear",
    kpopExamples: "NewJeans, LE SSERAFIM, RIIZE",
    hairStyle: "Mini tresses encadrant le visage (Baby Braids), chignons doubles (Space Buns) ou casquette bicolore.",
    makeupFocus: "Blush rosé diffus sur le nez, gloss ultra-brillant (Juicy Lips), fard irisé.",
    outfitKeys: "Pantalon cargo oversized, top court rétro, ceintures larges à boucle.",
    micStyle: "Micro Chrome Métallique Effet Miroir",
    icon: "🍒",
    colorBg: "bg-pink-50",
    colorBorder: "border-pink-300",
    colorText: "text-pink-950"
  },
  {
    id: "royalty",
    name: "Royalty Elegance & Glamour",
    kpopExamples: "IVE, TWICE, Red Velvet",
    hairStyle: "Demi-queue attachée avec barette perles/strass (Half-Up), ou ondulations souples glamour (Hollywood Waves).",
    makeupFocus: "Strass collés sous les yeux (Glitter Tears), fard champagne, rouge à lèvres velours.",
    outfitKeys: "Robe en velours, dentelle fine, corsets structurés et bijoux scintillants.",
    micStyle: "Micro Or Rose (Rose Gold) Incrusté de Strass Swarovski",
    icon: "👑",
    colorBg: "bg-amber-50",
    colorBorder: "border-amber-300",
    colorText: "text-amber-950"
  },
  {
    id: "academy",
    name: "High-School Academy & Prep",
    kpopExamples: "ENHYPEN, TXT, STAYC",
    hairStyle: "Frange rideau naturelle (Curtain Bangs), carré droit texturé ou raie au milieu soignée.",
    makeupFocus: "Teint naturel 'No-Makeup Look', baume à lèvres teinté fraise, sourcils naturels.",
    outfitKeys: "Blazer ajusté avec écusson d'agence, cravate décontractée et jupe/pantalon à plis.",
    micStyle: "Micro Argent Brossé Classique",
    icon: "🎓",
    colorBg: "bg-blue-50",
    colorBorder: "border-blue-300",
    colorText: "text-blue-950"
  },
  {
    id: "dark_fantasy",
    name: "Dark Fantasy & Gothic Rock",
    kpopExamples: "DREAMCATCHER, ATEEZ, VIXX",
    hairStyle: "Cheveux noir corbeau déstructurés (Messy Shag) ou mèches rouge cramoisi / violet sombre.",
    makeupFocus: "Smokey eye ténébreux, lèvres dégradées bordeaux foncé (Bitten Lips).",
    outfitKeys: "Veste en cuir cloutée, chaînes en argent, bottes montantes à sangles.",
    micStyle: "Micro Rouge Cramoisi & Noir Corbeau",
    icon: "🦇",
    colorBg: "bg-purple-50",
    colorBorder: "border-purple-300",
    colorText: "text-purple-950"
  }
];

export const StageConceptStyleMatcher: React.FC = () => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>(() => {
    return localStorage.getItem("kpop_favorite_concept") || "y2k";
  });

  const concept = STAGE_CONCEPTS.find((c) => c.id === selectedConceptId) || STAGE_CONCEPTS[1];

  const handleSelect = (id: string) => {
    setSelectedConceptId(id);
    localStorage.setItem("kpop_favorite_concept", id);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-rose-600" />
          <h3 className="font-bold text-slate-900 text-base">Sélecteur de Concept Scénique, Coiffure & Style Micro</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
          Stylisme & Direction Artistique
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Sélectionnez le concept de votre chanson de couverture ou performance pour obtenir la combinaison Coiffure + Maquillage + Accessoires recommandée par les stylistes de Seoul.
      </p>

      {/* Concept Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {STAGE_CONCEPTS.map((c) => {
          const isSelected = selectedConceptId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => handleSelect(c.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-rose-600 border-rose-700 text-white shadow-md shadow-rose-200 scale-[1.02]"
                  : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span className="text-xl mb-1">{c.icon}</span>
              <div>
                <h4 className="font-extrabold text-xs leading-tight">{c.name.split(" & ")[0]}</h4>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-rose-100" : "text-slate-500"}`}>
                  {c.kpopExamples.split(",")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Concept Full Style Sheet */}
      <div className={`p-5 rounded-2xl border ${concept.colorBg} ${concept.colorBorder} space-y-4 animate-fadeIn`}>
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{concept.icon}</span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">{concept.name}</h4>
              <span className="text-xs font-bold text-slate-600">Groupes Références : {concept.kpopExamples}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="font-extrabold text-rose-900 block flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-rose-600" />
              <span>Coiffure & Accessoires Cheveux :</span>
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">{concept.hairStyle}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="font-extrabold text-rose-900 block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Focus Maquillage Scénique :</span>
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">{concept.makeupFocus}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="font-extrabold text-rose-900 block flex items-center gap-1.5">
              <Shirt className="w-4 h-4 text-rose-600" />
              <span>Éléments Clés de la Tenue :</span>
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">{concept.outfitKeys}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="font-extrabold text-rose-900 block flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-rose-600" />
              <span>Style de Micro sur Scène :</span>
            </span>
            <p className="text-slate-800 font-bold">{concept.micStyle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
