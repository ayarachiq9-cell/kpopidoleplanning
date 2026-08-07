import React, { useState, useEffect, useRef } from "react";
import { Camera, Sparkles, Star, Play, RotateCcw, Eye, Heart, Award } from "lucide-react";

const EXPRESSION_PROMPTS = [
  { time: 10, label: "Expression 1 : SOURIRE ENERGIONIQUE (Aegyo)", desc: "Fixez le voyant vert de la caméra avec un regard pétillant et un demi-sourire." },
  { time: 7, label: "Expression 2 : REGARD FIER & INTENSE (Charisma)", desc: "Menton légèrement bas, regard perçant vers le centre de l'objectif." },
  { time: 4, label: "Expression 3 : RESPIRATION FINALE SCÉNIQUE (Ending Fairy)", desc: "Inspiration douce par la bouche, épaules détendues, légère inclinaison de tête." },
  { time: 1, label: "Expression 4 : CLIN D'ŒIL SCÉNIQUE (Wink & Pose)", desc: "Petit clin d'œil complice juste avant le fondu au noir !" },
];

export const EndingFairyTrainer: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraEnabled(true);
    } catch (e) {
      setCameraEnabled(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraEnabled(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            generateFeedback();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleStartDrill = async () => {
    if (!cameraEnabled) {
      await startCamera();
    }
    setEvaluationResult(null);
    setTimeLeft(10);
    setIsActive(true);
  };

  const generateFeedback = () => {
    const scores = [94, 96, 98, 99, 100];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];
    const comments = [
      "Précision du regard caméra digne des émissions MCOUNTDOWN !",
      "Superbe gestion du souffle et charisme scénique à 100%.",
      "Le clin d'œil final était parfait, moment Ending Fairy captivant !",
      "Belle intensité dans le regard. Gardez cette présence rayonnante !"
    ];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    setEvaluationResult(`Score Charisme : ${randomScore}% — ${randomComment}`);
  };

  const currentPrompt = EXPRESSION_PROMPTS.find((p) => timeLeft >= p.time - 3) || EXPRESSION_PROMPTS[EXPRESSION_PROMPTS.length - 1];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-pink-600" />
          <h3 className="font-bold text-slate-900 text-base">Entraîneur "Ending Fairy" & Regard Caméra</h3>
        </div>

        <div className="flex items-center gap-2">
          {!cameraEnabled ? (
            <button
              onClick={startCamera}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4 text-pink-600" />
              <span>Activer Caméra</span>
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Désactiver
            </button>
          )}

          <button
            onClick={handleStartDrill}
            disabled={isActive}
            className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Lancer le Défi Ending (10s)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Camera Feed / Mirror View */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-video flex items-center justify-center shadow-inner">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transform -scale-x-100 ${cameraEnabled ? "block" : "hidden"}`}
          />

          {!cameraEnabled && (
            <div className="text-center p-6 space-y-2 text-slate-400">
              <Camera className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
              <p className="text-xs font-semibold">Activez la caméra pour vous voir en temps réel pendant le défi !</p>
              <p className="text-[11px] text-slate-500">Ou entraînez-vous devant votre miroir de studio.</p>
            </div>
          )}

          {/* Live Overlay Timer */}
          {isActive && (
            <div className="absolute top-3 right-3 bg-pink-600/90 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg animate-bounce flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
            </div>
          )}

          {/* Camera On Status LED */}
          {cameraEnabled && (
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE CAM</span>
            </div>
          )}
        </div>

        {/* Prompt Instruction & Feedback Card */}
        <div className="space-y-4">
          <div className="p-4 bg-pink-50/80 border border-pink-200 rounded-2xl space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-700 block">
              Consigne Scénique Actuelle :
            </span>
            <h4 className="text-base font-extrabold text-pink-950">{currentPrompt.label}</h4>
            <p className="text-xs text-slate-700 leading-relaxed">{currentPrompt.desc}</p>
          </div>

          {evaluationResult && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Résultat d'Expression Scénique :</span>
              </div>
              <p className="text-xs font-semibold text-emerald-950">{evaluationResult}</p>
            </div>
          )}

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">💡 Secret d'Idole K-Pop :</span>
            <p className="text-[11px] leading-tight">
              Pour captiver la caméra lors d'un gros plan Ending Fairy, ne clignez pas trop vite des yeux et gardez une respiration nasale calme pour éviter d'avoir l'air essoufflé(e).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
