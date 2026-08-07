import React, { useState } from "react";
import { Users, Move, Sparkles, Play, RotateCcw, ArrowRight, Layers } from "lucide-react";

interface MemberPosition {
  id: number;
  name: string;
  role: "Center" | "Main Dancer" | "Sub Dancer" | "Visual";
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  isCenter?: boolean;
}

interface StageFormation {
  id: string;
  name: string;
  description: string;
  members: MemberPosition[];
}

const FORMATIONS: StageFormation[] = [
  {
    id: "v_shape",
    name: "Formation en V (V-Shape Point Choreo)",
    description: "La formation reine de la K-Pop pour mettre en valeur le/la Center tout en créant un effet de relief puissant.",
    members: [
      { id: 1, name: "Membre 1 (Center)", role: "Center", x: 50, y: 35, isCenter: true },
      { id: 2, name: "Membre 2", role: "Main Dancer", x: 38, y: 55 },
      { id: 3, name: "Membre 3", role: "Main Dancer", x: 62, y: 55 },
      { id: 4, name: "Membre 4", role: "Sub Dancer", x: 26, y: 75 },
      { id: 5, name: "Membre 5", role: "Sub Dancer", x: 74, y: 75 },
    ]
  },
  {
    id: "diagonal",
    name: "Ligne Diagonale Dynamique (Canon & Wave)",
    description: "Parfaite pour les mouvements en canon (vague) et les ouvertures de refrains explosives.",
    members: [
      { id: 1, name: "Membre 1 (Center)", role: "Center", x: 20, y: 25, isCenter: true },
      { id: 2, name: "Membre 2", role: "Sub Dancer", x: 35, y: 40 },
      { id: 3, name: "Membre 3", role: "Main Dancer", x: 50, y: 55 },
      { id: 4, name: "Membre 4", role: "Sub Dancer", x: 65, y: 70 },
      { id: 5, name: "Membre 5", role: "Visual", x: 80, y: 85 },
    ]
  },
  {
    id: "diamond",
    name: "Losange Compact (Diamond Formation)",
    description: "Idéal pour les rotations rapides et les transitions de centre de scène lors des solos.",
    members: [
      { id: 1, name: "Membre 1 (Center)", role: "Center", x: 50, y: 25, isCenter: true },
      { id: 2, name: "Membre 2", role: "Main Dancer", x: 32, y: 55 },
      { id: 3, name: "Membre 3", role: "Main Dancer", x: 68, y: 55 },
      { id: 4, name: "Membre 4", role: "Visual", x: 50, y: 85 },
      { id: 5, name: "Membre 5", role: "Sub Dancer", x: 50, y: 55 },
    ]
  },
  {
    id: "staggered",
    name: "Deux Lignes Décalées (2-Row Block)",
    description: "Optimise l'espace sur scène pour les chorégraphies d'ensemble très denses et synchronisées.",
    members: [
      { id: 1, name: "Membre 1 (Center)", role: "Center", x: 50, y: 35, isCenter: true },
      { id: 2, name: "Membre 2", role: "Sub Dancer", x: 30, y: 35 },
      { id: 3, name: "Membre 3", role: "Sub Dancer", x: 70, y: 35 },
      { id: 4, name: "Membre 4", role: "Main Dancer", x: 40, y: 70 },
      { id: 5, name: "Membre 5", role: "Main Dancer", x: 60, y: 70 },
    ]
  }
];

export const ChoreoFormationSimulator: React.FC = () => {
  const [currentFormationId, setCurrentFormationId] = useState<string>("v_shape");
  const [selectedMember, setSelectedMember] = useState<MemberPosition | null>(null);

  const activeFormation = FORMATIONS.find((f) => f.id === currentFormationId) || FORMATIONS[0];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-slate-900 text-base">Simulateur de Formations & Placements Scéniques K-Pop</h3>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
          5 Danseurs (Standard Groupe)
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Comprenez comment les agences organisent les lignes de danse pour maximiser l'impact visuel et les transitions de caméra MCOUNTDOWN/Inkigayo.
      </p>

      {/* Formation Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {FORMATIONS.map((fmt) => (
          <button
            key={fmt.id}
            onClick={() => {
              setCurrentFormationId(fmt.id);
              setSelectedMember(null);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentFormationId === fmt.id
                ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {fmt.name.split(" (")[0]}
          </button>
        ))}
      </div>

      <div className="p-4 bg-purple-50/60 border border-purple-200/80 rounded-2xl">
        <h4 className="font-extrabold text-purple-950 text-sm mb-1">{activeFormation.name}</h4>
        <p className="text-xs text-slate-700">{activeFormation.description}</p>
      </div>

      {/* Virtual Stage Grid Canvas */}
      <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-2xl border-2 border-slate-800 overflow-hidden shadow-inner p-4 flex flex-col justify-between">
        {/* Stage Lighting Effect Top */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-purple-500/20 to-transparent pointer-events-none" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-600/80 text-white text-[9px] font-black uppercase tracking-widest z-10">
          FOND DE SCÈNE (BACKSTAGE / SCREEN)
        </div>

        {/* Center Grid Lines */}
        <div className="absolute inset-0 border-t border-b border-dashed border-slate-700/40 pointer-events-none top-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 border-l border-r border-dashed border-slate-700/40 pointer-events-none left-1/2 -translate-x-1/2" />

        {/* Member Markers */}
        <div className="relative w-full h-full">
          {activeFormation.members.map((m) => {
            const isSelected = selectedMember?.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMember(m)}
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer ${
                  m.isCenter
                    ? "w-12 h-12 bg-pink-600 text-white ring-4 ring-pink-300/80 shadow-lg z-20 scale-110"
                    : isSelected
                    ? "w-11 h-11 bg-purple-600 text-white ring-4 ring-purple-300 z-20 scale-105"
                    : "w-10 h-10 bg-slate-800 text-slate-200 hover:bg-slate-700 border-2 border-purple-400/50 shadow-md z-10"
                }`}
              >
                <span className="text-xs font-black font-mono">{m.id}</span>
                <span className="text-[8px] font-bold uppercase tracking-tight opacity-90">
                  {m.isCenter ? "CTR" : `M${m.id}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage Front Audience / Camera Line */}
        <div className="relative w-full pt-2 border-t border-pink-500/30 flex justify-between items-center text-[10px] font-bold text-pink-400">
          <span>🎥 CAMÉRA PRINCIPALE</span>
          <span className="px-2 py-0.5 rounded bg-pink-950/80 border border-pink-500/40 text-pink-300">AVANT-SCÈNE (AUDIENCE)</span>
          <span>🎥 CAMÉRA 2</span>
        </div>
      </div>

      {/* Selected Member Info */}
      {selectedMember && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between flex-wrap gap-2 animate-fadeIn">
          <div>
            <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-widest block">
              Détail du Rôle en Formation :
            </span>
            <span className="text-sm font-black text-slate-900">{selectedMember.name}</span>
            <span className="text-xs text-slate-600 block mt-0.5">Rôle attribué : <strong>{selectedMember.role}</strong></span>
          </div>
          <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-900 font-bold text-xs">
            Position X: {selectedMember.x}% | Y: {selectedMember.y}%
          </span>
        </div>
      )}
    </div>
  );
};
