import React, { useState } from "react";
import { Mic, Volume2, Award, Sparkles, Music, Check, RefreshCw } from "lucide-react";
import { soundEngine } from "../../utils/audio";

interface VoiceType {
  name: string;
  range: string;
  lowestNote: string;
  highestNote: string;
  kpopIdols: string[];
  description: string;
}

const VOICE_TYPES: VoiceType[] = [
  {
    name: "Soprano (Aiguë)",
    range: "C4 - C6",
    lowestNote: "C4",
    highestNote: "C6",
    kpopIdols: ["Wendy (Red Velvet)", "Taeyeon (SNSD)", "Solar (MAMAMOO)", "Sowon"],
    description: "Voix brillante et cristalline capable d'atteindre des notes très aiguës et des harmonies éclatantes."
  },
  {
    name: "Mezzo-Soprano (Médium Aigu)",
    range: "A3 - A5",
    lowestNote: "A3",
    highestNote: "A5",
    kpopIdols: ["Rosé (BLACKPINK)", "Jihyo (TWICE)", "Nayeon (TWICE)", "Hwasa (MAMAMOO)"],
    description: "Voix polyvalente, chaleureuse et dynamique, très fréquente dans les mélodies phares de la K-Pop."
  },
  {
    name: "Alto / Contralto (Grave Feminin)",
    range: "F3 - F5",
    lowestNote: "F3",
    highestNote: "F5",
    kpopIdols: ["Yuqi ((G)I-DLE)", "Moonbyul (MAMAMOO)", "Ryujin (ITZY)"],
    description: "Timbre profond, velouté et magnétique, parfait pour les refrains poignants et les transitions soul."
  },
  {
    name: "Ténor (Aigu Masculin)",
    range: "C3 - C5",
    lowestNote: "C3",
    highestNote: "C5",
    kpopIdols: ["Jungkook (BTS)", "Chen (EXO)", "DK (SEVENTEEN)", "Eunkwang (BTOB)"],
    description: "Voix claire, agile et puissante capable d'atteindre les hautes notes de tête et falsettos."
  },
  {
    name: "Baryton (Médium Masculin)",
    range: "G2 - G4",
    lowestNote: "G2",
    highestNote: "G4",
    kpopIdols: ["V / Taehyung (BTS)", "Bang Chan (Stray Kids)", "Jaehyun (NCT)"],
    description: "Timbre chaud, riche et charismatique, idéal pour apporter de la profondeur aux morceaux."
  },
  {
    name: "Basse (Grave Masculin)",
    range: "E2 - E4",
    lowestNote: "E2",
    highestNote: "E4",
    kpopIdols: ["Felix (Stray Kids)", "I.M (MONSTA X)"],
    description: "Voix très grave, impressionnante et percutante, emblématique des intros et parties rap ténébreuses."
  }
];

const ALL_NOTES = [
  "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
  "C6"
];

export const VocalRangeTester: React.FC = () => {
  const [lowestSelected, setLowestSelected] = useState<string>("C4");
  const [highestSelected, setHighestSelected] = useState<string>("C5");
  const [matchedVoice, setMatchedVoice] = useState<VoiceType | null>(null);

  const playNote = (note: string) => {
    soundEngine.playNote(note, 0.7, "triangle");
  };

  const calculateClassification = () => {
    const lowIdx = ALL_NOTES.indexOf(lowestSelected);
    const highIdx = ALL_NOTES.indexOf(highestSelected);

    if (lowIdx >= highIdx) {
      alert("La note la plus aiguë doit être supérieure à la note la plus grave.");
      return;
    }

    // Determine best match based on pitch
    if (lowIdx <= ALL_NOTES.indexOf("G2")) {
      setMatchedVoice(VOICE_TYPES[5]); // Basse
    } else if (lowIdx <= ALL_NOTES.indexOf("B2") || highIdx <= ALL_NOTES.indexOf("G4")) {
      setMatchedVoice(VOICE_TYPES[4]); // Baryton
    } else if (lowIdx <= ALL_NOTES.indexOf("D3") || highIdx <= ALL_NOTES.indexOf("C5")) {
      setMatchedVoice(VOICE_TYPES[3]); // Tenor
    } else if (lowIdx <= ALL_NOTES.indexOf("G3")) {
      setMatchedVoice(VOICE_TYPES[2]); // Alto
    } else if (highIdx <= ALL_NOTES.indexOf("B5")) {
      setMatchedVoice(VOICE_TYPES[1]); // Mezzo
    } else {
      setMatchedVoice(VOICE_TYPES[0]); // Soprano
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Testeur & Profiler de Tessiture Vocale (Voice Range)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
          Trouvez vos Idoles de Référence
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Sélectionnez la note la plus basse et la plus haute que vous chantez confortablement. Cliquez sur les boutons pour écouter la note exacte et comparer avec votre voix.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lowest note picker */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">1. Note la plus Grave (Lowest Pitch) :</span>
            <button
              onClick={() => playNote(lowestSelected)}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Écouter {lowestSelected}</span>
            </button>
          </div>
          <select
            value={lowestSelected}
            onChange={(e) => {
              setLowestSelected(e.target.value);
              playNote(e.target.value);
            }}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-blue-500"
          >
            {ALL_NOTES.slice(0, 30).map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>

        {/* Highest note picker */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">2. Note la plus Aiguë (Highest Pitch) :</span>
            <button
              onClick={() => playNote(highestSelected)}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Écouter {highestSelected}</span>
            </button>
          </div>
          <select
            value={highestSelected}
            onChange={(e) => {
              setHighestSelected(e.target.value);
              playNote(e.target.value);
            }}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-blue-500"
          >
            {ALL_NOTES.slice(10).map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center pt-1">
        <button
          onClick={calculateClassification}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-200 transition-all cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyser ma Tessiture & Trouver mes Idoles K-Pop</span>
        </button>
      </div>

      {matchedVoice && (
        <div className="p-5 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-700" />
              <h4 className="text-lg font-black text-blue-950">{matchedVoice.name}</h4>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-black font-mono">
              Étendue : {lowestSelected} → {highestSelected}
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">{matchedVoice.description}</p>

          <div className="pt-2 border-t border-blue-200">
            <span className="text-[11px] font-bold text-blue-900 block mb-2">
              🎤 Idoles K-Pop de Référence partageant ce type de voix :
            </span>
            <div className="flex flex-wrap gap-2">
              {matchedVoice.kpopIdols.map((idol, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white border border-blue-300 rounded-lg text-xs font-bold text-blue-950 shadow-xs"
                >
                  {idol}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
