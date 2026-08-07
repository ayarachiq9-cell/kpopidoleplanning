import React, { useState, useEffect, useRef } from "react";
import { Music, Play, Square, Volume2, Sparkles, ChevronRight, RefreshCw } from "lucide-react";
import { soundEngine } from "../../utils/audio";

const PIANO_NOTES = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"];

const SCALE_PATTERNS = [
  {
    id: "5note",
    name: "Gamme 5 Notes (Do-Re-Mi-Fa-Sol-Fa-Mi-Re-Do)",
    offsets: [0, 2, 4, 5, 7, 5, 4, 2, 0],
    desc: "Idéal pour échauffer les cordes vocales et assouplir la transition poitrine-tête."
  },
  {
    id: "arpeggio",
    name: "Arpège Triade (Do-Mi-Sol-Do'-Sol-Mi-Do)",
    offsets: [0, 4, 7, 12, 7, 4, 0],
    desc: "Développe l'agilité vocale, la précision des intervalles et le contrôle du souffle."
  },
  {
    id: "siren",
    name: "Sirène Glissando & Lip Trills (Octave)",
    offsets: [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0],
    desc: "Parfait pour les vibés de lèvres (Lip Trills) et le placement du masque nasal."
  }
];

export const VocalScaleGenerator: React.FC = () => {
  const [selectedKeyIndex, setSelectedKeyIndex] = useState<number>(0); // 0 = C4
  const [selectedPattern, setSelectedPattern] = useState<string>("5note");
  const [bpm, setBpm] = useState<number>(100);
  const [isPlayingScale, setIsPlayingScale] = useState<boolean>(false);
  const [activeNoteName, setActiveNoteName] = useState<string | null>(null);

  const scaleTimeoutRef = useRef<any>(null);

  const baseNotes = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "A4"];

  const playSingleNote = (note: string) => {
    setActiveNoteName(note);
    soundEngine.playNote(note, 0.6, "triangle");
    setTimeout(() => setActiveNoteName(null), 500);
  };

  const stopScale = () => {
    setIsPlayingScale(false);
    if (scaleTimeoutRef.current) clearTimeout(scaleTimeoutRef.current);
    setActiveNoteName(null);
  };

  const playScaleRun = () => {
    stopScale();
    setIsPlayingScale(true);

    const pattern = SCALE_PATTERNS.find((p) => p.id === selectedPattern) || SCALE_PATTERNS[0];
    const baseFreqIndex = selectedKeyIndex; // index in PIANO_NOTES
    const intervalMs = (60 / bpm) * 1000 * 0.75;

    let step = 0;

    const playNextStep = () => {
      if (step >= pattern.offsets.length) {
        setIsPlayingScale(false);
        setActiveNoteName(null);
        return;
      }

      const noteOffset = pattern.offsets[step];
      const targetIndex = Math.min(baseFreqIndex + noteOffset, PIANO_NOTES.length - 1);
      const targetNote = PIANO_NOTES[targetIndex];

      setActiveNoteName(targetNote);
      soundEngine.playNote(targetNote, (intervalMs / 1000) * 0.9, "triangle");

      step++;
      scaleTimeoutRef.current = setTimeout(playNextStep, intervalMs);
    };

    playNextStep();
  };

  useEffect(() => {
    return () => stopScale();
  }, []);

  const patternObj = SCALE_PATTERNS.find((p) => p.id === selectedPattern);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Music className="w-5 h-5 text-blue-600" />
            <span>Générateur d'Échelles Vocales Syntétiseur Piano</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Chantez en vocalises guidées sur de vraies notes de piano synthétisées.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isPlayingScale ? (
            <button
              onClick={stopScale}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm cursor-pointer transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Arrêter la Vocalise</span>
            </button>
          ) : (
            <button
              onClick={playScaleRun}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-200 cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Lancer Vocalise (Piano)</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Key Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tonalité de Départ :</label>
          <div className="flex flex-wrap gap-1.5">
            {baseNotes.map((note, idx) => (
              <button
                key={note}
                onClick={() => {
                  setSelectedKeyIndex(idx);
                  playSingleNote(note);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  selectedKeyIndex === idx
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Type de Vocalise :</label>
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {SCALE_PATTERNS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {patternObj && <p className="text-[11px] text-slate-500 mt-1.5 leading-tight">{patternObj.desc}</p>}
        </div>

        {/* Tempo & Active Note Display */}
        <div className="flex flex-col justify-between space-y-2">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Vitesse (Tempo) :</span>
              <span className="font-mono text-blue-600">{bpm} BPM</span>
            </div>
            <input
              type="range"
              min="60"
              max="160"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-900">Note En Jouée :</span>
            <span className="text-lg font-black font-mono text-blue-700">
              {activeNoteName ? activeNoteName : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Piano Keyboard Visualiser */}
      <div className="space-y-2 pt-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Piano Virtuel Intractif (Cliquez pour jouer) :
        </span>

        <div className="flex items-end justify-center gap-1 p-4 bg-slate-100 rounded-2xl border border-slate-200/80 overflow-x-auto">
          {PIANO_NOTES.map((note) => {
            const isSharp = note.includes("#");
            const isActive = activeNoteName === note;

            return (
              <button
                key={note}
                onClick={() => playSingleNote(note)}
                className={`transition-all rounded-b-lg font-bold font-mono text-[10px] flex flex-col justify-end p-1 select-none cursor-pointer ${
                  isSharp
                    ? `w-8 h-24 ${
                        isActive ? "bg-purple-600 text-white scale-105" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                      } -mx-2 z-10 shadow-md`
                    : `w-11 h-36 ${
                        isActive
                          ? "bg-blue-500 text-white scale-105 shadow-md"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                      } shadow-xs`
                }`}
              >
                <span>{note}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
