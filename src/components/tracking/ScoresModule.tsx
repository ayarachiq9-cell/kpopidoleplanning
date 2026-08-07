import React, { useState } from "react";
import { Award, Star, Plus, TrendingUp, Calendar, Trash2, Save } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { EvaluationEntry } from "../../types";
import { HexagonSkillsRadar } from "./HexagonSkillsRadar";

const INITIAL_EVALUATIONS: EvaluationEntry[] = [
  { id: "e1", date: "2026-08-01", discipline: "Danse", overallScore: 3.5, techniqueRating: 3, energyRating: 4, charismaRating: 3, notes: "Bonne énergie sur Hype Boy, attention aux isolations." },
  { id: "e2", date: "2026-08-03", discipline: "Chant", overallScore: 4.0, techniqueRating: 4, energyRating: 4, charismaRating: 4, notes: "Soutien respiratoire solide sur le chorus." },
  { id: "e3", date: "2026-08-05", discipline: "Rap", overallScore: 4.2, techniqueRating: 4, energyRating: 5, charismaRating: 4, notes: "Flow rapide et clair sur le verse 90 BPM." },
  { id: "e4", date: "2026-08-07", discipline: "Danse", overallScore: 4.5, techniqueRating: 4, energyRating: 5, charismaRating: 5, notes: "Excellente présence scénique et regard caméras !" },
];

export const ScoresModule: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationEntry[]>(() => {
    const saved = localStorage.getItem("kpop_evaluations_log");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_EVALUATIONS;
  });

  // New eval form states
  const [discipline, setDiscipline] = useState<EvaluationEntry["discipline"]>("Danse");
  const [technique, setTechnique] = useState(4);
  const [energy, setEnergy] = useState(4);
  const [charisma, setCharisma] = useState(4);
  const [notes, setNotes] = useState("");

  const saveEvals = (updated: EvaluationEntry[]) => {
    setEvaluations(updated);
    localStorage.setItem("kpop_evaluations_log", JSON.stringify(updated));
  };

  const handleAddEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    const avgScore = Number(((technique + energy + charisma) / 3).toFixed(1));

    const newEval: EvaluationEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      discipline,
      overallScore: avgScore,
      techniqueRating: technique,
      energyRating: energy,
      charismaRating: charisma,
      notes: notes.trim() || undefined,
    };

    saveEvals([...evaluations, newEval]);
    setNotes("");
  };

  const handleDelete = (id: string) => {
    saveEvals(evaluations.filter((e) => e.id !== id));
  };

  // Recharts chart data
  const chartData = evaluations.map((item) => ({
    date: item.date.slice(5),
    Technique: item.techniqueRating,
    Énergie: item.energyRating,
    Charisme: item.charismaRating,
    Moyenne: item.overallScore,
  }));

  const renderStarSelector = (value: number, onChange: (val: number) => void, label: string) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300">{label}</span>
        <span className="text-xs font-mono font-bold text-purple-400">{value} / 5★</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onChange(star)}
            className={`p-1 transition-transform ${star <= value ? "text-amber-400 hover:scale-110" : "text-slate-700 hover:text-slate-500"}`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-pink-950/70 border border-purple-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-purple-400 font-bold uppercase tracking-wider text-xs mb-2">
            <Award className="w-4 h-4" />
            <span>Suivi des Évaluations Mensuelles</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Scores, Grille à 3 Critères & Graphique
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
            Évaluez chaque séance selon les 3 pilliers K-Pop : Technique, Énergie et Charisme. Suivez votre courbe de progression.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold shadow-sm whitespace-nowrap">
          <Save className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Sauvegarde Auto Active (localStorage)</span>
        </div>
      </div>

      {/* Idol Hexagon Skills Radar Profile */}
      <HexagonSkillsRadar />

      {/* Progress Chart Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span>Évolution des Performances au Fil du Temps</span>
        </h3>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0, 5]} stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
              />
              <Line type="monotone" dataKey="Technique" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Énergie" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Charisme" stroke="#c084fc" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 text-xs pt-2">
          <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
            <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" /> Technique
          </span>
          <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" /> Énergie
          </span>
          <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
            <span className="w-3 h-3 rounded-full bg-purple-400 inline-block" /> Charisme
          </span>
        </div>
      </div>

      {/* Add New Session Evaluation Form */}
      <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-purple-400" />
          <span>Saisir une Nouvelle Évaluation de Séance</span>
        </h3>

        <form onSubmit={handleAddEvaluation} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Discipline</label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="Danse">Danse</option>
                <option value="Chant">Chant</option>
                <option value="Rap">Rap</option>
                <option value="Sport">Sport</option>
                <option value="Général">Général</option>
              </select>
            </div>

            {renderStarSelector(technique, setTechnique, "1. Technique / Précision")}
            {renderStarSelector(energy, setEnergy, "2. Énergie / Endurance")}
            {renderStarSelector(charisma, setCharisma, "3. Charisme / Regard")}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Notes & Remarques du Coach / Personnelles</label>
            <input
              type="text"
              placeholder="Ex: Belle synchro sur les 8 temps, maintenir l'expression faciale sur la fin."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow transition-all"
          >
            Enregistrer l'évaluation
          </button>
        </form>
      </div>

      {/* Evaluations History Log */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">Historique des Évaluations ({evaluations.length})</h3>

        <div className="space-y-3">
          {evaluations.map((item) => (
            <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                    {item.discipline}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-amber-400 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {item.overallScore} / 5
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
                <span>Technique : <strong className="text-sky-400">{item.techniqueRating}★</strong></span>
                <span>Énergie : <strong className="text-rose-400">{item.energyRating}★</strong></span>
                <span>Charisme : <strong className="text-purple-400">{item.charismaRating}★</strong></span>
              </div>

              {item.notes && <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-900">{item.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
