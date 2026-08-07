import React, { useState, useEffect } from "react";
import { Gauge, Play, Pause, RotateCcw, Volume2, Music, Sparkles } from "lucide-react";
import { soundEngine } from "../../utils/audio";

export const PracticeSpeedMetronome: React.FC = () => {
  const [bpm, setBpm] = useState<number>(120);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedPercent, setSpeedPercent] = useState<number>(100);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      const adjustedBpm = Math.max(40, Math.round((bpm * speedPercent) / 100));
      const intervalMs = (60 / adjustedBpm) * 1000;

      interval = setInterval(() => {
        soundEngine.playBeep(true);
      }, intervalMs);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, bpm, speedPercent]);

  return (
    <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 text-white space-y-4 shadow-lg">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-base">Métronome & Variateur de Vitesse d'Entraînement K-Pop</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-950 text-indigo-300 rounded-full border border-indigo-500/30">
          Chorégraphie & Vocalises Ralenties
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase">Tempo d'Origine Morceau :</span>
            <span className="font-mono font-extrabold text-indigo-400 text-lg">{bpm} BPM</span>
          </div>
          <input
            type="range"
            min="60"
            max="180"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />

          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase block">Vitesse de Répétition :</span>
            <div className="flex gap-2">
              {[50, 75, 90, 100, 110].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setSpeedPercent(pct)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    speedPercent === pct
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-md"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Playback Box */}
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="font-mono">
            <span className="text-3xl font-black text-indigo-300">
              {Math.max(40, Math.round((bpm * speedPercent) / 100))} BPM
            </span>
            <span className="text-[10px] text-slate-500 block uppercase font-bold mt-0.5">
              Tempo Réel Sélectionné ({speedPercent}%)
            </span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full py-3 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isPlaying
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-950"
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? "Arrêter le Bip Métronome" : "Lancer le Métronome Rythmique"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
