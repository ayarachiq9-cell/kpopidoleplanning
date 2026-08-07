import React, { useState } from "react";
import { Languages, Volume2, RotateCcw, Check, X, Award, Sparkles, Flame, Play } from "lucide-react";
import { soundEngine } from "../../utils/audio";

interface Flashcard {
  id: number;
  korean: string;
  pronunciation: string;
  french: string;
  category: "Artiste & Scène" | "Studio & Danse" | "Agence & Début";
}

const KOREAN_FLASHCARDS: Flashcard[] = [
  { id: 1, korean: "센터", pronunciation: "Sen-teo", french: "Center (Membre au centre de la chorégraphie)", category: "Artiste & Scène" },
  { id: 2, korean: "메인보컬", pronunciation: "Me-in-bo-keol", french: "Vocaliste Principal(e)", category: "Artiste & Scène" },
  { id: 3, korean: "엔딩요정", pronunciation: "En-ding-yo-jeong", french: "Ending Fairy (Gros plan final de caméra)", category: "Artiste & Scène" },
  { id: 4, korean: "연습생", pronunciation: "Yeon-seup-saeng", french: "Trainee (Élève en formation dans l'agence)", category: "Agence & Début" },
  { id: 5, korean: "데뷔", pronunciation: "De-bwi", french: "Début Officiel sur scène", category: "Agence & Début" },
  { id: 6, korean: "컴백", pronunciation: "Keom-baek", french: "Comeback (Sortie de nouvel album & promos)", category: "Artiste & Scène" },
  { id: 7, korean: "칼군무", pronunciation: "Kal-gun-mu", french: "Chorégraphie 'Lame de Couteau' (Synchro parfaite)", category: "Studio & Danse" },
  { id: 8, korean: "음악방송", pronunciation: "Eum-ak-bang-song", french: "Émission musicale télévisée (MCOUNTDOWN, Inkigayo)", category: "Artiste & Scène" },
  { id: 9, korean: "응원봉", pronunciation: "Eung-won-bong", french: "Lightstick de fans officiel", category: "Artiste & Scène" },
  { id: 10, korean: "월말평가", pronunciation: "Wol-mal-pyeong-ga", french: "Évaluation Mensuelle décisive devant les juges", category: "Agence & Début" },
];

export const KoreanFlashcardGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [reviewedCount, setReviewedCount] = useState<number>(0);

  const card = KOREAN_FLASHCARDS[currentIndex];

  const playAudio = (text: string) => {
    soundEngine.speakKorean(text);
  };

  const handleNext = (known: boolean) => {
    if (known) {
      setScore((s) => s + 10);
      setStreak((s) => s + 1);
      soundEngine.playSuccess();
    } else {
      setStreak(0);
      soundEngine.playBeep(false);
    }

    setReviewedCount((r) => r + 1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % KOREAN_FLASHCARDS.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setStreak(0);
    setReviewedCount(0);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-slate-900 text-base">Jeu de Flashcards Mémorisation Hangeul Vocabulaire K-Pop</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Score : <strong className="text-red-700">{score} pts</strong>
          </span>
          <span className="text-xs font-bold text-slate-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Série : {streak}</span>
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Testez votre mémoire sur les termes coréens indispensables du quotidien d'un Trainee. Cliquez sur la carte pour révéler la traduction et écouter la prononciation vocale.
      </p>

      {/* Main Interactive Flashcard */}
      <div className="flex flex-col items-center space-y-4">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-md h-56 rounded-3xl border-2 p-6 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 shadow-md ${
            isFlipped
              ? "bg-slate-900 border-red-500 text-white ring-4 ring-red-500/20"
              : "bg-gradient-to-br from-red-500 via-rose-600 to-pink-600 border-red-400 text-white hover:scale-[1.01]"
          }`}
        >
          <div className="w-full flex items-center justify-between text-[11px] font-bold opacity-80">
            <span>{card.category}</span>
            <span>Carte {currentIndex + 1} / {KOREAN_FLASHCARDS.length}</span>
          </div>

          {!isFlipped ? (
            <div className="space-y-2 my-auto">
              <span className="text-4xl font-extrabold tracking-wider block font-sans">{card.korean}</span>
              <span className="text-xs font-mono font-medium opacity-90 block">[{card.pronunciation}]</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mt-2">
                Cliquez pour retourner 🔄
              </span>
            </div>
          ) : (
            <div className="space-y-2 my-auto">
              <span className="text-xl font-bold text-red-400 block">{card.french}</span>
              <span className="text-2xl font-extrabold text-white block">{card.korean}</span>
              <span className="text-xs font-mono text-slate-300 block">Prononciation : {card.pronunciation}</span>
            </div>
          )}

          <div className="w-full flex items-center justify-center pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playAudio(card.korean);
              }}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Prononcer Vocalement (Audio)</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 w-full max-w-md pt-2">
          <button
            onClick={() => handleNext(false)}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4 text-rose-600" />
            <span>À revoir</span>
          </button>
          <button
            onClick={() => handleNext(true)}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Mémorisé !</span>
          </button>
        </div>
      </div>
    </div>
  );
};
