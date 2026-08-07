import React, { useState } from "react";
import { Award, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface SkillPoint {
  skill: string;
  score: number; // 0 to 100
}

export const HexagonSkillsRadar: React.FC = () => {
  const [skills, setSkills] = useState<SkillPoint[]>(() => {
    const saved = localStorage.getItem("kpop_radar_skills");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { skill: "Chant (Vocal)", score: 80 },
      { skill: "Danse (Choreo)", score: 85 },
      { skill: "Rap (Flow)", score: 75 },
      { skill: "Charisme (Facial)", score: 90 },
      { skill: "Coréen (Hangeul)", score: 70 },
      { skill: "Endurance (Stamina)", score: 80 },
    ];
  });

  const handleScoreChange = (index: number, newScore: number) => {
    const updated = [...skills];
    updated[index].score = newScore;
    setSkills(updated);
    localStorage.setItem("kpop_radar_skills", JSON.stringify(updated));
  };

  const totalScore = Math.round(skills.reduce((acc, curr) => acc + curr.score, 0) / skills.length);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-slate-900 text-base">Profil Hexagonal d'Idole K-Pop (Skill Balance Radar)</h3>
        </div>

        <span className="text-xs font-extrabold px-3 py-1 bg-purple-50 text-purple-900 rounded-full border border-purple-200">
          Global Trainee Score : {totalScore} / 100 pts
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Ajustez vos 6 compétences fondamentales pour visualiser votre profil d'équilibre artistique inspiré des fiches d'évaluation des agences de Seoul.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Recharts Radar Chart */}
        <div className="w-full h-72 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center justify-center shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skills}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="skill" stroke="#cbd5e1" tick={{ fill: "#f1f5f9", fontSize: 11, fontWeight: "bold" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
              <Radar
                name="Trainee Skills"
                dataKey="score"
                stroke="#c084fc"
                fill="#a855f7"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Sliders Control Panel */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-extrabold text-slate-800 block mb-2">
            Ajuster vos niveaux actuels (/100) :
          </span>

          {skills.map((item, idx) => (
            <div key={item.skill} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">{item.skill}</span>
                <span className="font-mono font-extrabold text-purple-700">{item.score} %</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={item.score}
                onChange={(e) => handleScoreChange(idx, Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
