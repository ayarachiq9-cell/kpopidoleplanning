import React, { useState, useEffect } from "react";
import { Zap, Play, Pause, RotateCcw, Heart, Flame, Shield, Award, CheckCircle2 } from "lucide-react";
import { soundEngine } from "../../utils/audio";

export const StaminaPulseTimer: React.FC = () => {
  const [round, setRound] = useState<number>(1);
  const [phase, setPhase] = useState<"sprint" | "rest">("sprint");
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedTabatas, setCompletedTabatas] = useState<number>(() => {
    return Number(localStorage.getItem("kpop_completed_tabatas") || 0);
  });

  useEffect(() => {
    let timer: any = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const isSprintEnding = phase === "sprint";
            soundEngine.playBeep(!isSprintEnding);

            if (isSprintEnding) {
              setPhase("rest");
              return 10;
            } else {
              if (round >= 8) {
                // Completed Tabata!
                setIsRunning(false);
                soundEngine.playSuccess();
                const newTotal = completedTabatas + 1;
                setCompletedTabatas(newTotal);
                localStorage.setItem("kpop_completed_tabatas", newTotal.toString());
                setRound(1);
                setPhase("sprint");
                return 20;
              } else {
                setRound((r) => r + 1);
                setPhase("sprint");
                return 20;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, phase, round, completedTabatas]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRound(1);
    setPhase("sprint");
    setTimeLeft(20);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-600" />
          <h3 className="font-bold text-slate-900 text-base">Chronomètre Tabata Stamina Idol (4 Min Cardio Boost)</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200 flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          <span>Tabatas Complétés : {completedTabatas}</span>
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Le protocole Tabata (20s d'effort maximal / 10s de repos x 8 rounds) est la méthode #1 des agences pour développer une résistance pulmonaire à toute épreuve lors des concerts et performances marathon.
      </p>

      {/* Main Display Box */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-md ${
        phase === "sprint"
          ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-500"
          : "bg-slate-900 text-white border-slate-800"
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded ${
              phase === "sprint" ? "bg-white/20 text-white" : "bg-emerald-500/20 text-emerald-400"
            }`}>
              {phase === "sprint" ? "🔥 SPRINT MAXIMAL (20S)" : "🧘 REPOS ACTIF & INHALATION (10S)"}
            </span>
            <h4 className="text-2xl font-black mt-2">
              {phase === "sprint" ? "Sauts, High-Kicks & Burpees" : "Inspiration Profonde par le Nez"}
            </h4>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center font-mono">
              <span className="text-4xl font-black block">{timeLeft}s</span>
              <span className="text-[10px] opacity-80 uppercase font-bold tracking-wider">Round {round} / 8</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleStartPause}
                className="p-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-black/30 hover:bg-black/50 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Round Progress Bar */}
        <div className="w-full bg-black/20 rounded-full h-2 mt-4 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${((round - 1 + (phase === "rest" ? 1 : (20 - timeLeft) / 20)) / 8) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
