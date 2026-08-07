import React, { useState, useRef } from "react";
import { X, Upload, Camera, Mic, Sparkles, AlertCircle, Loader2 } from "lucide-react";

interface MediaReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  type:
    | "performance_singing"
    | "performance_dance"
    | "performance_rap"
    | "hair"
    | "outfit"
    | "food"
    | "skin"
    | "sport_posture"
    | "korean_hangeul"
    | "journal_board";
  title: string;
  description: string;
  onAnalysisResult?: (analysis: string) => void;
}

export const MediaReviewModal: React.FC<MediaReviewModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  description,
  onAnalysisResult,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mediaNote, setMediaNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 12 * 1024 * 1024) {
        setError("Le fichier ne doit pas dépasser 12 Mo.");
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze-multimodal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          image: selectedImage,
          mediaNote,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite lors de l'analyse.");
      }

      setResult(data.analysis);
      if (onAnalysisResult) {
        onAnalysisResult(data.analysis);
      }
    } catch (err: any) {
      setError(err?.message || "Erreur lors de la connexion avec le service IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl text-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-600">{description}</p>

          {/* Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-700">
              Photo ou Vidéo de la prestation / tenue
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative rounded-xl overflow-hidden border border-purple-200 bg-slate-50 max-h-60 flex justify-center items-center">
                <img
                  src={selectedImage}
                  alt="Aperçu"
                  className="max-h-56 object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-slate-900/80 text-white rounded-full p-1 hover:bg-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/60 text-center"
              >
                <div className="p-3 rounded-full bg-purple-100 border border-purple-200 text-purple-600 mb-2">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  Cliquez pour charger une photo / vidéo
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  JPG, PNG, MP4 jusqu'à 12 Mo
                </p>
              </div>
            )}
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-700 mb-1">
              Notes supplémentaires ou question pour le coach IA (Optionnel)
            </label>
            <textarea
              value={mediaNote}
              onChange={(e) => setMediaNote(e.target.value)}
              placeholder="Ex: J'aimerais un avis sur la synchronisation et mon expression scénique sur le refrain..."
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white placeholder-slate-400"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Analysis Result Display */}
          {result && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Résultat d'évaluation IA</span>
              </div>
              <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Fermer
          </button>
          <button
            onClick={handleAnalyze}
            disabled={loading || (!selectedImage && !mediaNote)}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyse en cours...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Lancer l'analyse IA</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
