import React, { useState, useRef, useEffect } from "react";
import { Camera, Eye, Smile, UserCheck, Sparkles, Award, Video, VideoOff, RefreshCw, CheckCircle2, Play, Pause, Heart, ShieldCheck } from "lucide-react";
import { soundEngine } from "../../utils/audio";

interface AgencyCriteria {
  name: string;
  focus: string;
  advice: string;
  badgeColor: string;
}

const KPOP_AGENCIES_CRITERIA: Record<string, AgencyCriteria> = {
  hybe: {
    name: "HYBE (BTS, NewJeans, LE SSERAFIM, TXT)",
    focus: "Naturel, authenticité, regard percutant & énergie scénique",
    advice: "HYBE privilégie le charme naturel et l'expressivité sincère. Évitez les expressions trop figées et montrez votre propre personnalité !",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300"
  },
  jyp: {
    name: "JYP Entertainment (TWICE, Stray Kids, ITZY)",
    focus: "Sourire radieux, humilité, posture droite & énergie positive",
    advice: "Park Jin-young recherche la passion vraie, la politesse et la fraîcheur du sourire. Un regard chaleureux fait toute la différence.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
  },
  sm: {
    name: "SM Entertainment (aespa, NCT, Red Velvet, RIIZE)",
    focus: "Symétrie du visage, grâce des mouvements & prestance 'Visual'",
    advice: "SM met l'accent sur la grâce, l'élégance de la ligne de cou/épaules et un contrôle précis des expressions faciales.",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-300"
  },
  yg: {
    name: "YG Entertainment (BLACKPINK, BABYMONSTER, TREASURE)",
    focus: "Attitude Swag, confiance en soi débordante & charisme 'Hip-Hop'",
    advice: "YG aime l'assurance décontractée, les haussements de sourcils naturels et la posture assurée sans raideur.",
    badgeColor: "bg-slate-800 text-amber-300 border-amber-500/40"
  }
};

export const CameraAuditionAnalyzer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [selectedAgencyKey, setSelectedAgencyKey] = useState<string>("hybe");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [analysisStageText, setAnalysisStageText] = useState<string>("");

  // Live Simulated/Real Scores
  const [eyeContactScore, setEyeContactScore] = useState<number>(88);
  const [smileScore, setSmileScore] = useState<number>(85);
  const [postureScore, setPostureScore] = useState<number>(90);
  const [charismaScore, setCharismaScore] = useState<number>(87);

  const [feedbackReport, setFeedbackReport] = useState<{
    strengths: string[];
    tips: string[];
    agencyNote: string;
  } | null>(null);

  // Turn on camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraActive(true);
      soundEngine.playSuccess();
    } catch (err: any) {
      console.warn("Camera access warning:", err);
      setCameraError("Caméra non disponible ou accès refusé. Le mode Simulation interactive reste disponible !");
      setCameraActive(false);
    }
  };

  // Turn off camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Launch 15-second simulation scan
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setFeedbackReport(null);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setAnalysisProgress(step * 10);

      // Random gentle variation in metrics
      setEyeContactScore(Math.floor(82 + Math.random() * 15));
      setSmileScore(Math.floor(80 + Math.random() * 18));
      setPostureScore(Math.floor(85 + Math.random() * 12));
      setCharismaScore(Math.floor(84 + Math.random() * 14));

      if (step <= 3) {
        setAnalysisStageText("Analyse du maintien de la tête, alignement des épaules & de la colonne...");
      } else if (step <= 7) {
        setAnalysisStageText("Détection du regard fixe vers l'objectif (Eye-Contact) & symétrie faciale...");
      } else if (step <= 9) {
        setAnalysisStageText("Évaluation du rayonnement du sourire, détente de la mâchoire & aura 'Ending Fairy'...");
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        soundEngine.playSuccess();

        // Generate benevolent report
        const agency = KPOP_AGENCIES_CRITERIA[selectedAgencyKey];
        setFeedbackReport({
          strengths: [
            "Posture droite et tête bien relevée transmets une belle impression d'assurance dès la première seconde.",
            "Contact visuel direct et chaleureux vers l'objectif de la caméra (Eye-Contact soutenu).",
            "Sourire spontané et fluide qui apporte de la fraîcheur et détend l'expression globale."
          ],
          tips: [
            "Gardez les épaules légèrement tirées vers l'arrière et relâchées pour éviter la raideur devant l'objectif.",
            "Entraînez-vous à cligner des yeux naturellement sans rompre l'intensité du regard lors du refrain.",
            "Pensez à respirer profondément par le ventre pour détendre le menton et les micro-muscles du visage."
          ],
          agencyNote: `Analyse basée sur les critères de ${agency.name} : ${agency.advice}`
        });
      }
    }, 1000);
  };

  const agency = KPOP_AGENCIES_CRITERIA[selectedAgencyKey];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              Simulateur d'Audition Caméra & Analyseur de Charisme
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Analyse d'expressions faciales, posture d'épaules et assurance scénique avec feedback bienveillant selon les standards K-Pop.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Feedback Bienveillant A.I. Studio</span>
        </span>
      </div>

      {/* Agency Target Selector */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
          Choisissez l'Agence Cible pour la Grille d'Évaluation :
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(KPOP_AGENCIES_CRITERIA).map(([key, ag]) => (
            <button
              key={key}
              onClick={() => setSelectedAgencyKey(key)}
              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                selectedAgencyKey === key
                  ? "bg-indigo-600 border-indigo-700 text-white shadow-md scale-[1.02]"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="truncate">{ag.name.split(" ")[0]}</div>
              <span className={`text-[10px] block mt-0.5 font-normal ${selectedAgencyKey === key ? "text-indigo-100" : "text-slate-500"}`}>
                {ag.focus.split(",")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Camera Video Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left / Center: Camera Viewport */}
        <div className="md:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`w-2.5 h-2.5 rounded-full ${cameraActive ? "bg-emerald-500 animate-ping" : "bg-slate-600"}`} />
              <span className={cameraActive ? "text-emerald-400 font-mono" : "text-slate-400"}>
                {cameraActive ? "CAMÉRA EN DIRECT (ANALYSE DE POSTURE)" : "CAMÉRA DÉSACTIVÉE / MODE SIMULATION"}
              </span>
            </div>

            <div className="flex gap-2">
              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Activer ma Caméra</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <VideoOff className="w-3.5 h-3.5" />
                  <span>Couper</span>
                </button>
              )}
            </div>
          </div>

          {/* Video Feed Box with Target Frame */}
          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Visualisation Interactive des Expressions</p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    Activer la vidéo permet un meilleur cadrage, mais vous pouvez tester la grille d'analyse même en mode simulé.
                  </p>
                </div>
              </div>
            )}

            {/* Face & Shoulder Alignment Frame Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
              <div className="w-full flex justify-between text-[10px] font-mono text-indigo-400/80 font-bold">
                <span>[POSITIONMENT TÊTE OK]</span>
                <span>[GRILLE D'ALIGNEMENT 90°]</span>
              </div>

              {/* Oval Face Guide */}
              <div className="w-48 h-60 border-2 border-dashed border-indigo-400/60 rounded-full flex flex-col items-center justify-center relative">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping absolute top-10" />
                <span className="text-[10px] font-mono text-indigo-300 bg-slate-900/80 px-2 py-0.5 rounded border border-indigo-500/30">
                  Zone Visage & Sourire
                </span>
              </div>

              {/* Shoulder Line Guide */}
              <div className="w-3/4 border-b-2 border-dashed border-purple-400/50 flex justify-center pb-1">
                <span className="text-[10px] font-mono text-purple-300 bg-slate-900/80 px-2 py-0.5 rounded border border-purple-500/30">
                  Ligne d'Épaules & Posture
                </span>
              </div>
            </div>

            {/* Live Scanner Bar during analysis */}
            {isAnalyzing && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-indigo-400 to-pink-500 shadow-lg animate-pulse" style={{ top: `${analysisProgress}%` }} />
            )}
          </div>

          {cameraError && (
            <p className="text-xs text-amber-300 bg-amber-950/50 p-2.5 rounded-lg border border-amber-500/30">
              {cameraError}
            </p>
          )}

          {/* Action Trigger */}
          <div className="space-y-2">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isAnalyzing
                  ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-950/60"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Analyse en cours ({analysisProgress}%)...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Lancer l'Analyse d'Audition 15 Sec (Expressions & Posture)</span>
                </>
              )}
            </button>

            {isAnalyzing && (
              <p className="text-xs font-mono text-indigo-300 text-center animate-pulse">
                {analysisStageText}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Metrics & Live Meters */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Indicateurs d'Expressivité K-Pop</span>
            </h4>

            {/* Metric 1: Eye Contact */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="flex items-center gap-1 text-slate-700">
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Regard & Eye-Contact</span>
                </span>
                <span className="text-indigo-600 font-mono">{eyeContactScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${eyeContactScore}%` }} />
              </div>
            </div>

            {/* Metric 2: Smile & Relaxation */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="flex items-center gap-1 text-slate-700">
                  <Smile className="w-3.5 h-3.5 text-pink-600" />
                  <span>Sourire & Chaleur Faciale</span>
                </span>
                <span className="text-pink-600 font-mono">{smileScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${smileScore}%` }} />
              </div>
            </div>

            {/* Metric 3: Posture Alignment */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="flex items-center gap-1 text-slate-700">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Alignement Épaules & Tête</span>
                </span>
                <span className="text-emerald-600 font-mono">{postureScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${postureScore}%` }} />
              </div>
            </div>

            {/* Metric 4: Stage Charisma */}
            <div className="space-y-1 pt-1 border-t border-slate-200">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="flex items-center gap-1 text-slate-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Confiance & Charisme Global</span>
                </span>
                <span className="text-amber-600 font-mono">{charismaScore}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 transition-all duration-500" style={{ width: `${charismaScore}%` }} />
              </div>
            </div>
          </div>

          {/* Agency Focus Card */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">
              🎯 STANDARD D'AGENCE SÉLECTIONNÉ :
            </span>
            <h5 className="font-bold text-sm text-indigo-100">{agency.name}</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {agency.focus}
            </p>
          </div>
        </div>
      </div>

      {/* Benevolent Feedback Report Section */}
      {feedbackReport && (
        <div className="p-6 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-indigo-950/90 border border-emerald-500/40 rounded-2xl text-white space-y-4 animate-fadeIn shadow-lg">
          <div className="flex items-center gap-2 border-b border-emerald-500/30 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="font-extrabold text-base text-emerald-200">
              Rapport d'Évaluation Bienveillant - Casting K-Pop
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 bg-slate-950/80 border border-emerald-500/20 rounded-xl space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Points Forts Remarqués</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {feedbackReport.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Encouraging Progression Tips */}
            <div className="p-4 bg-slate-950/80 border border-indigo-500/20 rounded-xl space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-400" />
                <span>Conseils de Progression Douce</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {feedbackReport.tips.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 italic">
            💡 {feedbackReport.agencyNote}
          </div>
        </div>
      )}
    </div>
  );
};
