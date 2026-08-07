import React, { useState } from "react";
import { BookMarked, Smile, Plus, Heart, Trash2, Sparkles, Calendar, Camera } from "lucide-react";
import { JournalEntry } from "../../types";
import { MediaReviewModal } from "../shared/MediaReviewModal";
import { TraineeAffirmationCard } from "./TraineeAffirmationCard";

const MOODS = [
  { emoji: "🔥", label: "Inspiré(e)" },
  { emoji: "😃", label: "Motivé(e)" },
  { emoji: "🌟", label: "Fier(e)" },
  { emoji: "😐", label: "Fatigué(e)" },
  { emoji: "😰", label: "Stressé(e)" },
  { emoji: "🧘", label: "Serein(e)" },
];

const GUIDED_PROMPTS = [
  "Qu'as-tu appris de nouveau durant l'entraînement aujourd'hui ?",
  "Où as-tu ressenti une victoire personnelle ou un déclic technique ?",
  "Comment as-tu géré la fatigue ou un moment d'hésitation ?",
  "Quelle intention positive fixes-tu pour la session de demain ?",
];

const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "j1",
    date: "2026-08-06",
    moodEmoji: "🔥",
    moodLabel: "Inspiré(e)",
    promptQuestion: "Où as-tu ressenti une victoire personnelle ou un déclic technique ?",
    content: "Aujourd'hui j'ai enfin réussi la transition d'isolation d'épaule sur Wannabe ! La régularité de la chauffe a vraiment payé.",
    wins: "Maîtrise du bloc 4 de la chorégraphie.",
  },
];

export const JournalModule: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem("kpop_journal_entries");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_JOURNAL_ENTRIES;
  });

  const [isJournalScannerOpen, setIsJournalScannerOpen] = useState(false);

  // Form states
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [selectedPrompt, setSelectedPrompt] = useState(GUIDED_PROMPTS[0]);
  const [content, setContent] = useState("");
  const [wins, setWins] = useState("");

  const saveEntries = (updated: JournalEntry[]) => {
    setEntries(updated);
    localStorage.setItem("kpop_journal_entries", JSON.stringify(updated));
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      moodEmoji: selectedMood.emoji,
      moodLabel: selectedMood.label,
      promptQuestion: selectedPrompt,
      content: content.trim(),
      wins: wins.trim() || undefined,
    };

    saveEntries([newEntry, ...entries]);
    setContent("");
    setWins("");
  };

  const handleDelete = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-pink-50 via-white to-purple-50 border border-pink-200/80 shadow-sm">
        <div className="flex items-center gap-3 text-pink-600 font-bold uppercase tracking-wider text-xs mb-2">
          <BookMarked className="w-4 h-4" />
          <span>Introspection & Santé Mentale</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Journal Quotidien du Trainee
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
          Consignez vos réussites, exprimez votre humeur et développez un mental d'acier face aux défis de l'entraînement.
        </p>

        <button
          onClick={() => setIsJournalScannerOpen(true)}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md shadow-pink-200 transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Scanner Photo Carnet / Mood Board IA</span>
        </button>
      </div>

      {/* Trainee Daily Mindset Affirmation Card */}
      <TraineeAffirmationCard />

      {/* Write New Entry Form */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-pink-600" />
          <span>Écrire dans mon journal aujourd'hui</span>
        </h3>

        <form onSubmit={handleAddEntry} className="space-y-4">
          {/* Mood Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Sélecteur d'Humeur en Emoji :</label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.label}
                  onClick={() => setSelectedMood(m)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                    selectedMood.label === m.label
                      ? "bg-pink-100 border-pink-400 text-pink-900 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-base">{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guided Prompt Question */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Question d'Inspiration / Guided Prompt :</label>
            <select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-pink-500 focus:bg-white"
            >
              {GUIDED_PROMPTS.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Entry Content */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Vos réflexions de la journée :</label>
            <textarea
              rows={4}
              placeholder="Ex : Aujourd'hui, je me suis concentré(e) sur l'expression faciale. Même quand la fatigue est arrivée, j'ai gardé le sourire..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:bg-white placeholder-slate-400"
            />
          </div>

          {/* Small win of the day */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Petite Victoire du Jour (Optionnel) :</label>
            <input
              type="text"
              placeholder="Ex : 15 secondes de gainage en plus, bon soutien respiratoire"
              value={wins}
              onChange={(e) => setWins(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:bg-white placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md shadow-pink-200 transition-all cursor-pointer"
          >
            Sauvegarder l'entrée
          </button>
        </form>
      </div>

      {/* Past Entries Log */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Mes Entrées de Journal ({entries.length})</h3>

        <div className="space-y-4">
          {entries.map((item) => (
            <div key={item.id} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.moodEmoji}</span>
                  <div>
                    <span className="text-xs font-bold text-pink-600 block">{item.moodLabel}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                </div>

                <button onClick={() => handleDelete(item.id)} className="p-1 text-slate-400 hover:text-rose-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {item.promptQuestion && (
                <p className="text-xs font-semibold text-purple-700 italic">"{item.promptQuestion}"</p>
              )}

              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">{item.content}</p>

              {item.wins && (
                <div className="p-2.5 bg-pink-50 border border-pink-200 rounded-xl text-xs text-pink-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-pink-600" />
                  <span>Victoire : {item.wins}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Why keeping a journal helps */}
      <div className="bg-white border border-pink-200/80 rounded-2xl p-6 space-y-2 shadow-sm">
        <h3 className="text-base font-bold text-pink-700 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-600" />
          <span>Pourquoi tenir un journal est essentiel pour un Trainee ?</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Le rythme d'entraînement K-Pop est intense et exigeant. Poser ses émotions et ses victoires par écrit permet d'ancrer la mémoire musculaire, d'extérioriser le stress, de relativiser les moments de baisse de motivation et de mesurer le chemin parcouru !
        </p>
      </div>

      {/* Journal & Mood Board Scanner Modal */}
      <MediaReviewModal
        isOpen={isJournalScannerOpen}
        onClose={() => setIsJournalScannerOpen(false)}
        type="journal_board"
        title="Scanner Photo Carnet / Mood Board IA"
        description="Prenez une photo de votre carnet de notes ou de votre collage d'objectifs (vision board) pour recevoir une réaction bienveillante et des mots d'encouragement personnalisés."
      />
    </div>
  );
};
