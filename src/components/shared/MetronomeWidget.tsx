import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Activity, Zap, Volume2 } from "lucide-react";
import { soundEngine } from "../../utils/audio";

export const MetronomeWidget: React.FC = () => {
  const [bpm, setBpm] = useState<number>(115);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [accentBeat1, setAccentBeat1] = useState<boolean>(true);
  
  // Tap tempo state
  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    let intervalId: any = null;
    if (isPlaying) {
      const intervalMs = (60 / bpm) * 1000;
      intervalId = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = prev >= 8 ? 1 : prev + 1;
          const isAccent = accentBeat1 && (nextBeat === 1 || nextBeat === 5);
          soundEngine.playClick(isAccent ? 1200 : 700, isAccent ? 0.08 : 0.04, isAccent ? 0.5 : 0.25);
          return nextBeat;
        });
      }, intervalMs);
    } else {
      setCurrentBeat(1);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, bpm, accentBeat1]);

  const handleTapTempo = () => {
    const now = Date.now();
    const times = [...tapTimesRef.current, now].slice(-5); // Keep last 5 taps
    tapTimesRef.current = times;

    if (times.length >= 2) {
      const intervals = [];
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 220) {
        setBpm(calculatedBpm);
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600 animate-pulse" />
          <h3 className="font-bold text-slate-900 text-base">Métronome & Compte en 8 (Dance & Rhythm)</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isPlaying
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Arrêter" : "Démarrer Beat"}</span>
          </button>
        </div>
      </div>

      {/* BPM display & slider */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-xl border border-purple-200">
          <span className="text-3xl font-black text-purple-900 font-mono">{bpm}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">BPM (Battements/Min)</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Lent (60)</span>
            <span>Choréo (115)</span>
            <span>Rap/Fast (160)</span>
          </div>
          <input
            type="range"
            min="40"
            max="220"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
          <div className="flex justify-center gap-2 pt-1">
            {[80, 105, 120, 140].map((preset) => (
              <button
                key={preset}
                onClick={() => setBpm(preset)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                  bpm === preset
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                {preset} BPM
              </button>
            ))}
          </div>
        </div>

        {/* Tap Tempo Button */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            onClick={handleTapTempo}
            className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-purple-100 border border-slate-200 hover:border-purple-300 text-slate-800 hover:text-purple-900 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Tap Tempo (Tapez le rythme)</span>
          </button>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={accentBeat1}
              onChange={(e) => setAccentBeat1(e.target.checked)}
              className="accent-purple-600 rounded"
            />
            <span>Accentuer Temps 1 & 5</span>
          </label>
        </div>
      </div>

      {/* 8-Count LED Indicator Lights */}
      <div className="space-y-1.5 pt-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Visualiseur 8 Temps K-Pop :
        </span>
        <div className="grid grid-cols-8 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => {
            const isActive = isPlaying && currentBeat === count;
            const isAccent = count === 1 || count === 5;
            return (
              <div
                key={count}
                className={`p-3 rounded-xl border text-center transition-all duration-100 flex flex-col items-center justify-center ${
                  isActive
                    ? isAccent
                      ? "bg-purple-600 border-purple-700 text-white shadow-md scale-105 ring-2 ring-purple-300"
                      : "bg-pink-500 border-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-200"
                    : isAccent
                    ? "bg-purple-50 border-purple-200 text-purple-900 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                <span className="text-sm font-black font-mono">{count}</span>
                <span className="text-[9px] uppercase font-bold tracking-tight opacity-75">
                  {count === 1 ? "Start" : count === 5 ? "Half" : "Beat"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
