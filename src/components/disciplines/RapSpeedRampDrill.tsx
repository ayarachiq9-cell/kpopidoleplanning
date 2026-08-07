import React, { useState, useEffect, useRef } from "react";
import { Zap, Play, Square, FastForward, Activity, Sparkles, Volume2, Flame } from "lucide-react";
import { soundEngine } from "../../utils/audio";

const RAP_DRILL_VERSES = [
  {
    title: "Triplets K-Pop Flow (DÉBIT TRIPLETS - 3 SYLLABES PAR TEMPS)",
    bars: [
      "Ki-na-ma ta-ka-ti, Su-per-star, Fi-re-light,",
      "On the beat, on the stage, in the zone, Al-ways right!",
      "Fast de-li-ve-ry, Double time, Catch the rh-yme,",
      "K-Pop Trai-nee power up, Re-a-dy for the show-time!"
    ],
    syllablesPerLine: 12
  },
  {
    title: "Articulation & Fast Consonants (VITESSE & CLARTÉ DES CONSONNES)",
    bars: [
      "Bouncing on the bassline, Breaking all the rules now,",
      "Step into the spotlight, Never gonna slow down,",
      "Precision in the movement, Rhythm in my heartbeat,",
      "Idol in the making, Standing on my own feet!"
    ],
    syllablesPerLine: 11
  }
];

export const RapSpeedRampDrill: React.FC = () => {
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number>(0);
  const [startBpm, setStartBpm] = useState<number>(85);
  const [targetBpm, setTargetBpm] = useState<number>(135);
  const [currentBpm, setCurrentBpm] = useState<number>(85);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBarIndex, setCurrentBarIndex] = useState<number>(0);
  const [currentBeat, setCurrentBeat] = useState<number>(1);

  const timerRef = useRef<any>(null);

  const verse = RAP_DRILL_VERSES[selectedVerseIndex];

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = (60 / currentBpm) * 1000;
      timerRef.current = setInterval(() => {
        setCurrentBeat((prevBeat) => {
          let nextBeat = prevBeat + 1;
          if (nextBeat > 4) {
            nextBeat = 1;
            // Advance bar
            setCurrentBarIndex((prevBar) => {
              const nextBar = (prevBar + 1) % verse.bars.length;
              // If looped back to start of verse, increase BPM
              if (nextBar === 0) {
                setCurrentBpm((bpm) => {
                  const newBpm = bpm + 6;
                  if (newBpm >= targetBpm) {
                    return targetBpm;
                  }
                  return newBpm;
                });
              }
              return nextBar;
            });
          }

          const isAccent = nextBeat === 1;
          soundEngine.playClick(isAccent ? 1300 : 800, isAccent ? 0.06 : 0.03, isAccent ? 0.6 : 0.3);
          return nextBeat;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentBpm, targetBpm, verse]);

  const handleStart = () => {
    setCurrentBpm(startBpm);
    setCurrentBarIndex(0);
    setCurrentBeat(1);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentBarIndex(0);
    setCurrentBeat(1);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FastForward className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-900 text-base">Entraîneur D'Accélération de Flow (Speed Ramp Rap Drill)</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
          Double-Time & Articulation
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Ce drill accélère automatiquement la vitesse du beat à chaque boucle (+6 BPM) pour travailler l'endurance de diction et le débit rapide sans bafouiller.
      </p>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Verse selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Exercice de Flow :</label>
          <select
            value={selectedVerseIndex}
            onChange={(e) => {
              setSelectedVerseIndex(Number(e.target.value));
              handleStop();
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-amber-500"
          >
            {RAP_DRILL_VERSES.map((v, i) => (
              <option key={i} value={i}>
                {v.title}
              </option>
            ))}
          </select>
        </div>

        {/* BPM Start & Target */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">BPM Départ :</label>
            <input
              type="number"
              min="60"
              max="120"
              value={startBpm}
              onChange={(e) => setStartBpm(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 text-center font-mono"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">BPM Cible Max :</label>
            <input
              type="number"
              min="100"
              max="180"
              value={targetBpm}
              onChange={(e) => setTargetBpm(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 text-center font-mono"
            />
          </div>
        </div>

        {/* Play/Stop Controls */}
        <div className="flex items-center justify-end gap-2 pt-4 md:pt-0">
          {isPlaying ? (
            <button
              onClick={handleStop}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Arrêter le Drill</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Démarrer le Drill Accéléré</span>
            </button>
          )}
        </div>
      </div>

      {/* Real-time BPM Indicator */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-600 text-white font-mono font-black text-xl flex items-center justify-center shadow-md">
            {currentBpm}
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest block">
              VITESSE ACTUELLE EN DIRECT :
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              {currentBpm >= targetBpm ? "🔥 Vitesse Maximale Atteinte !" : `En augmentation (+6 BPM par boucle)`}
            </span>
          </div>
        </div>

        {/* Beat LED */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((b) => (
            <div
              key={b}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-all ${
                isPlaying && currentBeat === b
                  ? b === 1
                    ? "bg-amber-600 text-white scale-110 ring-2 ring-amber-300"
                    : "bg-amber-500 text-white scale-105"
                  : "bg-white text-slate-400 border border-slate-200"
              }`}
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Prompts Teleprompter View */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Prompteur Rap en Direct (Posez la voix en synchronisation avec la mesure) :
        </span>

        <div className="space-y-2">
          {verse.bars.map((bar, idx) => {
            const isCurrentBar = isPlaying && currentBarIndex === idx;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                  isCurrentBar
                    ? "bg-amber-600 border-amber-700 text-white shadow-md scale-[1.01] ring-2 ring-amber-200"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                    isCurrentBar ? "bg-white text-amber-900" : "bg-slate-200 text-slate-700"
                  }`}>
                    {idx + 1}
                  </span>
                  <p className={`text-sm font-bold tracking-wide ${isCurrentBar ? "text-white" : "text-slate-900"}`}>
                    {bar}
                  </p>
                </div>

                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded shrink-0 ${
                  isCurrentBar ? "bg-amber-800 text-amber-100" : "bg-slate-200 text-slate-600"
                }`}>
                  {verse.syllablesPerLine} syl.
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
