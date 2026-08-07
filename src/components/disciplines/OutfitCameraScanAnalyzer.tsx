import React, { useState, useRef, useEffect } from "react";
import { Camera, Shirt, Sparkles, Upload, Video, VideoOff, RefreshCw, CheckCircle2, Volume2, Heart, Tag, Palette, ShieldCheck, Zap, Layers, Glasses } from "lucide-react";
import { soundEngine } from "../../utils/audio";

interface OutfitTrendAnalysis {
  matchScore: number;
  paletteAdvice: string;
  fitAdvice: string;
  accessoriesAdvice: string[];
  stageImpactTip: string;
  suggestedConcept: string;
}

const KPOP_TREND_PRESETS: Record<string, { name: string; desc: string; iconColor: string }> = {
  y2k: {
    name: "Y2K & Streetwear Cargo",
    desc: "Inspiré des années 2000 : pantalons baggy, baby tees, ceintures oversize et baskets compensées (NewJeans, XG).",
    iconColor: "text-pink-600 bg-pink-100 border-pink-300"
  },
  girlcrush: {
    name: "Girl Crush & Dark Techwear",
    desc: "Esthétique puissante : cuir, harnais légers, cuissardes, tons sombres métalliques (BLACKPINK, LE SSERAFIM).",
    iconColor: "text-purple-600 bg-purple-100 border-purple-300"
  },
  highteen: {
    name: "High Teen & Preppy Academy",
    desc: "Style écolier rétro chic : jupes à plis, blazers ajustés, chaussettes hautes et cravates imprimées (IVE, TWICE).",
    iconColor: "text-blue-600 bg-blue-100 border-blue-300"
  },
  ethereal: {
    name: "Ethereal & Soft Pastel Stage",
    desc: "Matières fluides, tons pastel doux, tulles, dentelles et détails brillants féeriques (aespa, ILLIT).",
    iconColor: "text-emerald-600 bg-emerald-100 border-emerald-300"
  },
  airport: {
    name: "Minimalist Chic & Airport Fashion",
    desc: "Élégance décontractée : vestes oversize, denims bruts, casquettes sobres et sacs minimalistes.",
    iconColor: "text-amber-600 bg-amber-100 border-amber-300"
  }
};

export const OutfitCameraScanAnalyzer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>("y2k");

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStageText, setScanStageText] = useState<string>("");

  const [analysisResult, setAnalysisResult] = useState<OutfitTrendAnalysis | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

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
      setCameraError("Caméra non disponible ou refusée. Vous pouvez importer une photo de votre tenue ci-dessous !");
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

  // Capture current frame from video stream
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Flip horizontally to match mirror preview
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      soundEngine.playClick(900, 0.1);
      runOutfitAnalysis();
    }
  };

  // Handle uploaded photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
          soundEngine.playClick(1000, 0.1);
          runOutfitAnalysis();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Run simulated AI Scan
  const runOutfitAnalysis = () => {
    setIsScanning(true);
    setScanProgress(0);
    setAnalysisResult(null);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setScanProgress(step * 20);

      if (step <= 2) {
        setScanStageText("Détection de la silhouette, des proportions haut/bas & du fit global...");
      } else if (step <= 3) {
        setScanStageText("Analyse de la palette de couleurs & contraste sous les projecteurs de scène...");
      } else if (step <= 4) {
        setScanStageText("Identification des accessoires (ceintures, bijoux, bijoux de tête & chaussures)...");
      } else {
        clearInterval(interval);
        setIsScanning(false);
        soundEngine.playSuccess();

        // Generate tailored K-Pop trend recommendations
        const preset = KPOP_TREND_PRESETS[selectedPresetKey];
        let res: OutfitTrendAnalysis;

        if (selectedPresetKey === "y2k") {
          res = {
            matchScore: 92,
            paletteAdvice: "Excellente harmonie ! Les nuances métalliques et le contraste entre le haut et le bas rappellent parfaitement le style Y2K iconique de la 4ème génération.",
            fitAdvice: "Silhouette équilibrée : le haut ajusté associé à la coupe amples du bas valorise vos mouvements de danse tout en offrant une grande aisance sur scène.",
            accessoriesAdvice: [
              "Ajoutez une ceinture métallique double boucle ou une chaîne de taille argentée pour marquer la ligne de hanches.",
              "Complétez avec un bonnet fin ou des barrettes papillon Y2K rétro.",
              "Pour les chaussures, privilégiez des sneakers compensées blanches pour amortir les réceptions de saut."
            ],
            stageImpactTip: "Ce style capte magnifiquement la lumière lors des plans serrés 'Ending Fairy' et apporte une grande énergie visuelle.",
            suggestedConcept: "Streetwear Y2K Retro & Dance Performance"
          };
        } else if (selectedPresetKey === "girlcrush") {
          res = {
            matchScore: 89,
            paletteAdvice: "Palette sombre et contrastée très efficace ! Le noir ou gris anthracite combiné à des touches réfléchissantes crée une présence scénique imposante.",
            fitAdvice: "Coupe structurée avec une excellente liberté de mouvement au niveau des épaules et des genoux pour les chorégraphies intenses.",
            accessoriesAdvice: [
              "Choker en cuir souple ou collier ras-de-cou argenté à maillons épais.",
              "Gants de scène sans doigts (fingerless gloves) pour accentuer la gestuelle des mains.",
              "Bottes montantes légères avec semelles crantées antidérapantes."
            ],
            stageImpactTip: "Parfait pour les concepts Girl Crush lourds en basses trap. Votre tenue renvoie une assurance naturelle immédiate.",
            suggestedConcept: "Dark Techwear & High Intensity Girl Crush"
          };
        } else if (selectedPresetKey === "highteen") {
          res = {
            matchScore: 94,
            paletteAdvice: "Superbe fraîcheur ! Les teintes équilibrées apportent un look 'High Teen' chaleureux et très photogénique.",
            fitAdvice: "Les lignes droites et la coupe ajustée flattent la posture sans entraver la respiration ni l'amplitude des bras.",
            accessoriesAdvice: [
              "Cravate fine ou ruban noir noué col chemise.",
              "Chaussettes hautes blanches avec baskets rétro à semelle basse.",
              "Serre-tête rembourré ou barette latérale dorée."
            ],
            stageImpactTip: "Idéal pour les concepts Pop/Academy légers. Ce look diffuse une énergie positive communicative devant le jury.",
            suggestedConcept: "Preppy Academy & Bright Pop"
          };
        } else if (selectedPresetKey === "ethereal") {
          res = {
            matchScore: 91,
            paletteAdvice: "Harmonie pastel très douce. Les nuances claires reflètent la lumière de manière féerique.",
            fitAdvice: "Tissus fluides et légers qui créent un magnifique effet visuel de mouvement en rotation ou en saut.",
            accessoriesAdvice: [
              "Bijoux de corps étincelants ou strass légers.",
              "Rubans satinés aux poignets ou dans les cheveux.",
              "Bottines souples couleur chair ou blanc cassé."
            ],
            stageImpactTip: "S'accorde sublimement avec les chorégraphies aux gestes amples et aux mélodies vocales cristallines.",
            suggestedConcept: "Soft Ethereal & Fantasy Stage"
          };
        } else {
          res = {
            matchScore: 88,
            paletteAdvice: "Look intemporel et raffiné ! La palette neutre dégage un chic naturel 'Airport Fashion'.",
            fitAdvice: "Coupe oversize confortable qui allie aisance totale et prestance visuelle naturelle.",
            accessoriesAdvice: [
              "Lunettes de soleil tendance à monture rectangulaire.",
              "Casquette minimale en coton peigné.",
              "Sac à bandoulière croisée compact."
            ],
            stageImpactTip: "Un style épuré et moderne parfait pour les vlogs d'entraînement et les vidéos de répétition 'Dance Practice'.",
            suggestedConcept: "Minimalist Chic & Airport VIBE"
          };
        }

        setAnalysisResult(res);
      }
    }, 600);
  };

  // Voice narration of tips
  const speakAdvice = () => {
    if (!analysisResult) return;
    setIsSpeaking(true);
    const textToRead = `Analyse de style K-Pop. Score de concordance : ${analysisResult.matchScore} pour cent. Palette : ${analysisResult.paletteAdvice} Conseils d'accessoires : ${analysisResult.accessoriesAdvice.join(". ")}`;
    soundEngine.speakKorean(textToRead);
    setTimeout(() => setIsSpeaking(false), 8000);
  };

  const currentPreset = KPOP_TREND_PRESETS[selectedPresetKey];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-pink-600" />
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              Scanner Photo de Tenue IA - Analyse des Tendances K-Pop
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Scannez votre outfit de répétition ou de scène pour recevoir des recommandations bienveillantes sur l'harmonie des couleurs, les coupes et les accessoires tendance.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-pink-50 text-pink-700 rounded-full border border-pink-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Avis Style 100% Bienveillant</span>
        </span>
      </div>

      {/* K-Pop Aesthetic Style Selector */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
          1. Sélectionnez l'Esthétique K-Pop Cible pour Votre Tenue :
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {Object.entries(KPOP_TREND_PRESETS).map(([key, item]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPresetKey(key);
                soundEngine.playClick(700, 0.05);
              }}
              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex flex-col justify-between ${
                selectedPresetKey === key
                  ? "bg-pink-600 border-pink-700 text-white shadow-md scale-[1.02]"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="truncate">{item.name.split("&")[0]}</div>
              <span className={`text-[10px] block mt-1 font-normal ${selectedPresetKey === key ? "text-pink-100" : "text-slate-500"}`}>
                {item.name.split("&")[1] || "Concept"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Camera / Image Input Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Camera Feed / Image Canvas Viewport */}
        <div className="md:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`w-2.5 h-2.5 rounded-full ${cameraActive ? "bg-emerald-500 animate-ping" : "bg-slate-600"}`} />
              <span className={cameraActive ? "text-emerald-400 font-mono" : "text-slate-400"}>
                {cameraActive ? "CAMÉRA ACTIVES (ALIGNEMENT TENUE)" : "MODE PHOTO EN ATTENTE"}
              </span>
            </div>

            <div className="flex gap-2">
              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Activer la Caméra</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <VideoOff className="w-3.5 h-3.5" />
                  <span>Désactiver</span>
                </button>
              )}

              {/* Upload alternative */}
              <label className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>Importer une Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Camera Video or Captured Image Frame */}
          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {capturedImage ? (
              <div className="relative w-full h-full">
                <img
                  src={capturedImage}
                  alt="Captured Outfit"
                  className="w-full h-full object-contain bg-black"
                />
                {/* AI Detection Bounding Boxes Overlay */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  <div className="border-2 border-dashed border-pink-400/80 rounded-lg p-1 w-2/3 mx-auto bg-pink-950/30 text-[10px] font-mono text-pink-200 flex justify-between">
                    <span>[ZONE HAUT / CROP TOP / JACKET]</span>
                    <span className="text-emerald-400">DETECTED</span>
                  </div>
                  <div className="border-2 border-dashed border-purple-400/80 rounded-lg p-1 w-3/4 mx-auto bg-purple-950/30 text-[10px] font-mono text-purple-200 flex justify-between">
                    <span>[ZONE BAS / CARGO / SKIRT]</span>
                    <span className="text-emerald-400">DETECTED</span>
                  </div>
                  <div className="border-2 border-dashed border-amber-400/80 rounded-lg p-1 w-1/2 mx-auto bg-amber-950/30 text-[10px] font-mono text-amber-200 flex justify-between">
                    <span>[SNEAKERS / FOOTWEAR]</span>
                    <span className="text-emerald-400">DETECTED</span>
                  </div>
                </div>
              </div>
            ) : cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Shirt className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Cadre de Scan Outfit Plein Pied ou Buste</p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    Activez votre caméra ou importez une photo montrant votre haut, votre bas et vos accessoires de style.
                  </p>
                </div>
              </div>
            )}

            {/* Target Alignment Overlay lines when camera active */}
            {cameraActive && !capturedImage && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-4">
                <div className="text-[10px] font-mono text-pink-400 bg-slate-900/80 px-2 py-0.5 rounded border border-pink-500/30">
                  ↑ Positionnez la Tête & Épaules en Haut
                </div>
                <div className="w-4/5 h-3/4 border-2 border-dashed border-pink-500/50 rounded-2xl flex flex-col items-center justify-center relative">
                  <span className="text-[10px] font-mono text-pink-300 bg-slate-900/80 px-2 py-0.5 rounded">
                    Cadre Scanner Outfit
                  </span>
                </div>
                <div className="text-[10px] font-mono text-amber-400 bg-slate-900/80 px-2 py-0.5 rounded border border-amber-500/30">
                  ↓ Chaussures en Bas du Cadrage
                </div>
              </div>
            )}

            {/* Scanning Bar Animation */}
            {isScanning && (
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 shadow-lg animate-pulse"
                style={{ top: `${scanProgress}%` }}
              />
            )}
          </div>

          {cameraError && (
            <p className="text-xs text-amber-300 bg-amber-950/50 p-2.5 rounded-lg border border-amber-500/30">
              {cameraError}
            </p>
          )}

          {/* Action Trigger Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              {cameraActive && (
                <button
                  onClick={capturePhoto}
                  disabled={isScanning}
                  className="flex-1 py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capturer la Photo & Lancer l'Analyse</span>
                </button>
              )}

              {capturedImage && (
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    setAnalysisResult(null);
                    soundEngine.playClick(600, 0.05);
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Nouveau Scan</span>
                </button>
              )}

              {!cameraActive && !capturedImage && (
                <button
                  onClick={runOutfitAnalysis}
                  disabled={isScanning}
                  className="w-full py-3.5 px-6 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Tester le Scanner de Tenue avec l'Esthétique "{currentPreset.name.split("&")[0]}"</span>
                </button>
              )}
            </div>

            {isScanning && (
              <p className="text-xs font-mono text-pink-300 text-center animate-pulse pt-1">
                {scanStageText}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Preset Details & Target Vibe */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-extrabold text-pink-400 uppercase tracking-widest block">
              🎯 ESTHÉTIQUE K-POP CIBLE SÉLECTIONNÉE :
            </span>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${currentPreset.iconColor}`}>
                {currentPreset.name.split("&")[0]}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPreset.desc}
            </p>
          </div>

          <div className="p-4 bg-pink-50 border border-pink-200 rounded-2xl space-y-2">
            <span className="text-xs font-extrabold text-pink-800 uppercase tracking-wider block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-pink-600" />
              <span>Garantie Style Bienveillant</span>
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              L'IA analyse uniquement les vêtements, les harmonies de couleurs, les proportions de coupe et les accessoires K-Pop. Aucun commentaire n'est fait sur la morphologie ou la taille.
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="p-6 bg-gradient-to-r from-pink-950 via-slate-900 to-purple-950 border border-pink-500/40 rounded-2xl text-white space-y-5 animate-fadeIn shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-pink-500/30 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="font-extrabold text-base text-pink-200">
                Rapport d'Analyse Style & Tendances K-Pop
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-pink-900/80 text-pink-200 text-xs font-bold rounded-full border border-pink-500/40 font-mono">
                Concordance Vibe : {analysisResult.matchScore}%
              </span>

              <button
                onClick={speakAdvice}
                className="px-3 py-1 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "animate-bounce" : ""}`} />
                <span>{isSpeaking ? "Lecture..." : "Écouter l'Avis IA"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Color Palette Advice */}
            <div className="p-4 bg-slate-950/80 border border-pink-500/20 rounded-xl space-y-2">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-4 h-4" />
                <span>Couleurs & Lumière de Scène</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {analysisResult.paletteAdvice}
              </p>
            </div>

            {/* Fit & Silhouette */}
            <div className="p-4 bg-slate-950/80 border border-purple-500/20 rounded-xl space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Fit, Proportions & Liberté de Mouvement</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {analysisResult.fitAdvice}
              </p>
            </div>

            {/* K-Pop Accessories Recommender */}
            <div className="p-4 bg-slate-950/80 border border-amber-500/20 rounded-xl space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Glasses className="w-4 h-4" />
                <span>Accessoires Clés Suggérés</span>
              </span>
              <ul className="space-y-1 text-xs text-slate-200">
                {analysisResult.accessoriesAdvice.map((acc, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{acc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 bg-pink-950/60 border border-pink-500/30 rounded-xl text-xs text-pink-200 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 shrink-0" />
            <span>
              <strong>Conseil Impact Scène :</strong> {analysisResult.stageImpactTip} (Concept suggéré : {analysisResult.suggestedConcept})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
