import React from "react";
import { Sparkles, Star, Utensils, BookOpen, Award, BookMarked, MessageSquare, Flame, Calendar, HeartPulse } from "lucide-react";
import { DisciplineTab, MainSection } from "../types";

interface NavigationProps {
  activeSection: MainSection;
  setActiveSection: (section: MainSection) => void;
  activeDiscipline: DisciplineTab;
  setActiveDiscipline: (tab: DisciplineTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
  activeDiscipline,
  setActiveDiscipline,
}) => {
  const mainNavItems = [
    { id: "disciplines" as MainSection, label: "Disciplines Pratiques", icon: Flame },
    { id: "kpop_guide" as MainSection, label: "Devenir Idole K-Pop", icon: Star },
    { id: "planning" as MainSection, label: "Planning & Rappels", icon: Calendar },
    { id: "meditation" as MainSection, label: "Méditation & Bien-être", icon: HeartPulse },
    { id: "nutrition" as MainSection, label: "Alimentation & Eau", icon: Utensils },
    { id: "to_learn" as MainSection, label: "À Apprendre", icon: BookOpen },
    { id: "scores" as MainSection, label: "Scores & Evalu", icon: Award },
    { id: "journal" as MainSection, label: "Journal", icon: BookMarked },
    { id: "chat" as MainSection, label: "Parle-moi (IA)", icon: MessageSquare },
  ];

  const disciplineTabs = [
    { id: "skin" as DisciplineTab, label: "✨ Peau" },
    { id: "hair" as DisciplineTab, label: "💇‍♀️ Cheveux & Styles" },
    { id: "singing" as DisciplineTab, label: "🎤 Chant" },
    { id: "dance" as DisciplineTab, label: "💃 Danse" },
    { id: "sport" as DisciplineTab, label: "⚡ Sport" },
    { id: "rap" as DisciplineTab, label: "🎧 Rap" },
    { id: "korean" as DisciplineTab, label: "🇰🇷 Coréen" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 rounded-2xl blur-sm opacity-40 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 fill-current animate-pulse text-pink-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black font-heading text-slate-900 tracking-wide">
                K-POP <span className="text-gradient-purple-pink">TRAINEE COMPANION</span>
              </h1>
              <span className="text-[10px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                PRO IDOL
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">
              Studio d'entraînement, coaching scénique & analytics
            </p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-purple-200/80 text-purple-900 text-xs font-semibold shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">K-Mentor IA Actif</span>
        </div>
      </div>

      {/* Primary Section Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-x-auto no-scrollbar">
        <nav className="flex space-x-1.5 py-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-pink-500 text-white shadow-md shadow-purple-200 border border-purple-400/30 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-purple-600"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Secondary Discipline Sub-bar (Only when on Disciplines section) */}
      {activeSection === "disciplines" && (
        <div className="bg-slate-50/90 border-t border-slate-200/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
            <div className="flex space-x-2 py-2.5">
              {disciplineTabs.map((tab) => {
                const isActive = activeDiscipline === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDiscipline(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-purple-100 text-purple-900 border border-purple-300 shadow-sm ring-1 ring-purple-400/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
