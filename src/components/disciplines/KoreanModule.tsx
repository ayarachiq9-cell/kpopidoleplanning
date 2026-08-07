import React, { useState } from "react";
import { Languages, Volume2, Award, Check, Sparkles, BookOpen, Calendar, Hash, Camera } from "lucide-react";
import {
  CONSONANTS,
  VOWELS,
  NUMBERS_DATA,
  ESSENTIAL_PHRASES,
  GRAMMAR_PARTICLES,
  ARTISTIC_VOCABULARY,
  DAYS_OF_WEEK,
  QUIZ_HANGEUL,
  QUIZ_PHRASES,
} from "../../data/koreanData";
import { soundEngine } from "../../utils/audio";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { KoreanFlashcardGame } from "./KoreanFlashcardGame";
import { KoreanAISearchAndExamples } from "./KoreanAISearchAndExamples";

export const KoreanModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"hangeul" | "numbers" | "phrases" | "grammar" | "quizzes">("hangeul");
  const [isHangeulScannerOpen, setIsHangeulScannerOpen] = useState(false);

  // Quiz 1 state
  const [q1Answers, setQ1Answers] = useState<Record<number, number>>({});
  const [q1Submitted, setQ1Submitted] = useState(false);

  // Quiz 2 state
  const [q2Answers, setQ2Answers] = useState<Record<number, number>>({});
  const [q2Submitted, setQ2Submitted] = useState(false);

  const calculateQuizScore = (answers: Record<number, number>, questions: typeof QUIZ_HANGEUL) => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-red-50 via-white to-purple-50 border border-red-200/80 shadow-sm">
        <div className="flex items-center gap-3 text-red-700 font-bold uppercase tracking-wider text-xs mb-2">
          <Languages className="w-4 h-4" />
          <span>Langue & Communication K-Pop</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Apprendre le Coréen (한글 - Hangeul)
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
          Maitrisez l'alphabet complet (19 consonnes, 21 voyelles), les nombres, le vocabulaire artistique et testez vos connaissances.
        </p>

        <button
          onClick={() => setIsHangeulScannerOpen(true)}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-200 transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Scanner Photo Calligraphie & Cahier Hangeul IA</span>
        </button>

        {/* Korean Flashcard Speed Game */}
        <div className="mt-6">
          <KoreanFlashcardGame />
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: "hangeul", label: "Alphabet Hangeul (40)" },
            { id: "numbers", label: "2 Systèmes de Nombres" },
            { id: "phrases", label: "Phrases & Vocabulaire" },
            { id: "grammar", label: "Particules & Jours" },
            { id: "quizzes", label: "Quiz Interactifs (2)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time AI Search Bar & K-Pop Phrase Generator with Audio Pronunciation */}
      <KoreanAISearchAndExamples />

      {/* Sub-tab 1: Alphabet Hangeul */}
      {activeSubTab === "hangeul" && (
        <div className="space-y-8">
          {/* Consonants */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Consonnes (14 Simples + 5 Doubles = 19)</span>
              <span className="text-xs font-normal text-slate-400">Cliquez pour écouter la prononciation</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {CONSONANTS.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => soundEngine.speakKorean(c.char)}
                  className={`p-3 rounded-xl border transition-all text-left group flex flex-col justify-between ${
                    c.type === "consonant_double"
                      ? "bg-red-950/40 border-red-500/40 hover:border-red-400"
                      : "bg-slate-950 border-slate-800 hover:border-red-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white group-hover:scale-110 transition-transform">{c.char}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold text-red-300 block">{c.romaja}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{c.sound}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vowels */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Voyelles (10 Simples + 11 Composées = 21)</span>
              <span className="text-xs font-normal text-slate-400">Cliquez pour écouter</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {VOWELS.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => soundEngine.speakKorean(v.char)}
                  className={`p-3 rounded-xl border transition-all text-left group flex flex-col justify-between ${
                    v.type === "vowel_compound"
                      ? "bg-indigo-950/40 border-indigo-500/40 hover:border-indigo-400"
                      : "bg-slate-950 border-slate-800 hover:border-red-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white group-hover:scale-110 transition-transform">{v.char}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold text-indigo-300 block">{v.romaja}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{v.sound}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Two Number Systems */}
      {activeSubTab === "numbers" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-bold text-white">Comparaison des 2 Systèmes de Nombres</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="p-3">N°</th>
                  <th className="p-3">Sino-Coréen (한자어)</th>
                  <th className="p-3">Usage Sino</th>
                  <th className="p-3">Natif Coréen (고유어)</th>
                  <th className="p-3">Usage Natif</th>
                  <th className="p-3 text-right">Écouter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {NUMBERS_DATA.map((item) => (
                  <tr key={item.number} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-3 font-bold text-white">{item.number}</td>
                    <td className="p-3">
                      <span className="text-sm font-extrabold text-red-300">{item.sinoKorean}</span>{" "}
                      <span className="text-slate-500">({item.sinoRomaja})</span>
                    </td>
                    <td className="p-3 text-slate-400">{item.sinoUsage}</td>
                    <td className="p-3">
                      <span className="text-sm font-extrabold text-indigo-300">{item.nativeKorean}</span>{" "}
                      <span className="text-slate-500">({item.nativeRomaja})</span>
                    </td>
                    <td className="p-3 text-slate-400">{item.nativeUsage}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => soundEngine.speakKorean(item.nativeKorean)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] inline-flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Natif</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Phrases & Vocabulary */}
      {activeSubTab === "phrases" && (
        <div className="space-y-6">
          {/* Phrases */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-400" />
              <span>Phrases Essentielles pour Auditions & Entraînements</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ESSENTIAL_PHRASES.map((phrase) => (
                <div key={phrase.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300">
                      {phrase.category}
                    </span>
                    <button
                      onClick={() => soundEngine.speakKorean(phrase.korean)}
                      className="p-1 rounded bg-slate-900 text-slate-300 hover:text-white text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Écouter</span>
                    </button>
                  </div>
                  <h4 className="text-base font-extrabold text-white">{phrase.korean}</h4>
                  <p className="text-xs text-red-300 font-mono">{phrase.romaja}</p>
                  <p className="text-xs text-slate-300">{phrase.translation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Artistic Vocab */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Vocabulaire Spécifique à la Pratique Artistique K-Pop</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {ARTISTIC_VOCABULARY.map((v, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-base font-black text-white">{v.korean}</span>
                  <span className="text-xs font-bold text-red-400 block">{v.romaja}</span>
                  <span className="text-xs text-slate-300 block pt-1">{v.french}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 4: Grammar & Days */}
      {activeSubTab === "grammar" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Particles */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Particules Grammaticales de Base</h3>
            <div className="space-y-3">
              {GRAMMAR_PARTICLES.map((p, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-red-300">{p.particle}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{p.name}</span>
                  </div>
                  <p className="text-xs text-slate-300">{p.usage}</p>
                  <div className="pt-2 border-t border-slate-900">
                    <p className="text-xs font-mono text-slate-200">{p.exampleKorean}</p>
                    <p className="text-[11px] text-slate-400 italic">{p.exampleTranslation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Days of the Week */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-400" />
              <span>Jours de la Semaine (요일)</span>
            </h3>

            <div className="space-y-2">
              {DAYS_OF_WEEK.map((d, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white">{d.day}</span>
                    <span className="text-xs text-slate-400 block">{d.element}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-red-300 block">{d.korean}</span>
                    <span className="text-xs font-mono text-slate-400">{d.romaja}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 5: Interactive Quizzes */}
      {activeSubTab === "quizzes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quiz 1: Hangeul */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Quiz 1 : Hangeul & Sons</h3>
              {q1Submitted && (
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Score : {calculateQuizScore(q1Answers, QUIZ_HANGEUL)} / {QUIZ_HANGEUL.length}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {QUIZ_HANGEUL.map((q) => (
                <div key={q.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400">Q{q.id}</span>
                    {q.audioText && (
                      <button
                        onClick={() => soundEngine.speakKorean(q.audioText!)}
                        className="text-[10px] text-red-300 hover:text-white flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" /> Écouter
                      </button>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-200">{q.question}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, i) => {
                      const isSelected = q1Answers[q.id] === i;
                      const isCorrect = i === q.correctIndex;
                      return (
                        <button
                          key={i}
                          disabled={q1Submitted}
                          onClick={() => setQ1Answers({ ...q1Answers, [q.id]: i })}
                          className={`p-2 rounded-lg text-xs text-left border transition-all ${
                            q1Submitted
                              ? isCorrect
                                ? "bg-emerald-950 border-emerald-500 text-emerald-200"
                                : isSelected
                                ? "bg-rose-950 border-rose-500 text-rose-200"
                                : "bg-slate-900 border-slate-800 text-slate-500"
                              : isSelected
                              ? "bg-red-900/50 border-red-500 text-red-200"
                              : "bg-slate-900 border-slate-800 text-slate-300"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!q1Submitted && (
              <button
                onClick={() => setQ1Submitted(true)}
                disabled={Object.keys(q1Answers).length < QUIZ_HANGEUL.length}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs disabled:opacity-50"
              >
                Valider Quiz 1
              </button>
            )}
          </div>

          {/* Quiz 2: Phrases & Vocab */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Quiz 2 : Phrases & Vocabulaire</h3>
              {q2Submitted && (
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Score : {calculateQuizScore(q2Answers, QUIZ_PHRASES)} / {QUIZ_PHRASES.length}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {QUIZ_PHRASES.map((q) => (
                <div key={q.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">Q{q.id}</span>
                    {q.audioText && (
                      <button
                        onClick={() => soundEngine.speakKorean(q.audioText!)}
                        className="text-[10px] text-indigo-300 hover:text-white flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" /> Écouter
                      </button>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-200">{q.question}</p>

                  <div className="space-y-1.5">
                    {q.options.map((opt, i) => {
                      const isSelected = q2Answers[q.id] === i;
                      const isCorrect = i === q.correctIndex;
                      return (
                        <button
                          key={i}
                          disabled={q2Submitted}
                          onClick={() => setQ2Answers({ ...q2Answers, [q.id]: i })}
                          className={`w-full p-2 rounded-lg text-xs text-left border transition-all ${
                            q2Submitted
                              ? isCorrect
                                ? "bg-emerald-950 border-emerald-500 text-emerald-200"
                                : isSelected
                                ? "bg-rose-950 border-rose-500 text-rose-200"
                                : "bg-slate-900 border-slate-800 text-slate-500"
                              : isSelected
                              ? "bg-indigo-900/50 border-indigo-500 text-indigo-200"
                              : "bg-slate-900 border-slate-800 text-slate-300"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!q2Submitted && (
              <button
                onClick={() => setQ2Submitted(true)}
                disabled={Object.keys(q2Answers).length < QUIZ_PHRASES.length}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs disabled:opacity-50 cursor-pointer"
              >
                Valider Quiz 2
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hangeul Calligraphy & Notebook Scanner Modal */}
      <MediaReviewModal
        isOpen={isHangeulScannerOpen}
        onClose={() => setIsHangeulScannerOpen(false)}
        type="korean_hangeul"
        title="Scanner Photo Calligraphie & Cahier Hangeul IA"
        description="Prenez une photo de vos exercices manuscrits en coréen ou de votre cahier pour recevoir une relecture bienveillante de la forme des caractères et des conseils de tracé."
      />
    </div>
  );
};
