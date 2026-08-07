import React, { useState } from "react";
import { BookOpen, Plus, Trash2, CheckCircle, Brain, Sparkles, Save } from "lucide-react";
import { LearnItem } from "../../types";
import { PracticeSpeedMetronome } from "./PracticeSpeedMetronome";

const DEFAULT_LEARN_ITEMS: LearnItem[] = [
  { id: "l1", title: "Drama", artist: "aespa", type: "Danse", progress: 80, status: "En cours" },
  { id: "l2", title: "Magnetic", artist: "ILLIT", type: "Chant", progress: 100, status: "Maîtrisé" },
  { id: "l3", title: "LALISA Verse 2", artist: "LISA", type: "Rap", progress: 30, status: "En cours" },
];

export const ToLearnModule: React.FC = () => {
  const [items, setItems] = useState<LearnItem[]>(() => {
    const saved = localStorage.getItem("kpop_to_learn_items");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_LEARN_ITEMS;
  });

  // Form states
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [type, setType] = useState<"Danse" | "Chant" | "Rap">("Danse");

  const saveItems = (updated: LearnItem[]) => {
    setItems(updated);
    localStorage.setItem("kpop_to_learn_items", JSON.stringify(updated));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: LearnItem = {
      id: Date.now().toString(),
      title: title.trim(),
      artist: artist.trim() || "Artiste K-Pop",
      type,
      progress: 0,
      status: "À commencer",
    };

    saveItems([newItem, ...items]);
    setTitle("");
    setArtist("");
  };

  const handleUpdateProgress = (id: string, progress: number) => {
    const status: LearnItem["status"] =
      progress === 100 ? "Maîtrisé" : progress > 0 ? "En cours" : "À commencer";

    const updated = items.map((it) => (it.id === id ? { ...it, progress, status } : it));
    saveItems(updated);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    saveItems(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 border border-indigo-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-wider text-xs mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Objectifs & Répertoire</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Chansons & Chorégraphies à Apprendre
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
            Organisez votre liste d'apprentissage personnalisée et ajustez votre pourcentage de maîtrise au fil des répétitions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold shadow-sm whitespace-nowrap">
          <Save className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Sauvegarde Auto Active (localStorage)</span>
        </div>
      </div>

      {/* Practice Speed Variator & Metronome */}
      <PracticeSpeedMetronome />

      {/* Add New Item Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-400" />
          <span>Ajouter un morceau au répertoire</span>
        </h3>

        <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Titre du morceau (ex: Supernova)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Artiste / Groupe (ex: aespa)"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          >
            <option value="Danse">Danse</option>
            <option value="Chant">Chant</option>
            <option value="Rap">Rap</option>
          </select>
          <button
            type="submit"
            className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow transition-all"
          >
            Ajouter à la liste
          </button>
        </form>
      </div>

      {/* Items List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">Mon Répertoire en Cours ({items.length})</h3>

        {items.length === 0 ? (
          <p className="text-sm text-slate-500 italic py-4 text-center">Aucun morceau dans la liste pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        item.type === "Danse"
                          ? "bg-pink-950 text-pink-300 border border-pink-500/30"
                          : item.type === "Chant"
                          ? "bg-blue-950 text-blue-300 border border-blue-500/30"
                          : "bg-amber-950 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {item.type}
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        item.status === "Maîtrisé"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                          : item.status === "En cours"
                          ? "bg-indigo-950 text-indigo-300 border border-indigo-500/30"
                          : "bg-slate-900 text-slate-400 border border-slate-800"
                      }`}
                    >
                      {item.status} ({item.progress}%)
                    </span>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Avancement</span>
                    <span>{item.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={item.progress}
                    onChange={(e) => handleUpdateProgress(item.id, Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Memorization Tips */}
      <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400" />
          <span>Conseils Scientifiques de Mémorisation K-Pop</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-indigo-400 block mb-1">Découpage en Blocs de 8 Temps :</strong>
            Apprenez 8 temps par 8 temps en boucle lente avant d'accélérer au tempo réel. Ne pas passer au bloc suivant tant que le premier n'est pas automatique.
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-purple-400 block mb-1">Répétition Espacée :</strong>
            Revoyez la séquence apprise 1 heure après, puis le soir avant de dormir, et enfin le lendemain matin pour fixer la mémoire musculaire profonde.
          </div>
        </div>
      </div>
    </div>
  );
};
