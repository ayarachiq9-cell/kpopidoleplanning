import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { SkinModule } from "./components/disciplines/SkinModule";
import { HairStyleModule } from "./components/disciplines/HairStyleModule";
import { SingingModule } from "./components/disciplines/SingingModule";
import { DanceModule } from "./components/disciplines/DanceModule";
import { SportModule } from "./components/disciplines/SportModule";
import { RapModule } from "./components/disciplines/RapModule";
import { KoreanModule } from "./components/disciplines/KoreanModule";
import { TraineeGuideModule } from "./components/tracking/TraineeGuideModule";
import { NutritionModule } from "./components/tracking/NutritionModule";
import { PlanningModule } from "./components/tracking/PlanningModule";
import { MeditationModule } from "./components/tracking/MeditationModule";
import { ToLearnModule } from "./components/tracking/ToLearnModule";
import { ScoresModule } from "./components/tracking/ScoresModule";
import { JournalModule } from "./components/tracking/JournalModule";
import { ParleMoiChat } from "./components/ai/ParleMoiChat";
import { DisciplineTab, MainSection } from "./types";

export function App() {
  const [activeSection, setActiveSection] = useState<MainSection>("disciplines");
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineTab>("skin");

  const renderDisciplineContent = () => {
    switch (activeDiscipline) {
      case "skin":
        return <SkinModule />;
      case "hair":
        return <HairStyleModule />;
      case "singing":
        return <SingingModule />;
      case "dance":
        return <DanceModule />;
      case "sport":
        return <SportModule />;
      case "rap":
        return <RapModule />;
      case "korean":
        return <KoreanModule />;
      default:
        return <SkinModule />;
    }
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "disciplines":
        return renderDisciplineContent();
      case "kpop_guide":
        return <TraineeGuideModule />;
      case "planning":
        return <PlanningModule />;
      case "meditation":
        return <MeditationModule />;
      case "nutrition":
        return <NutritionModule />;
      case "to_learn":
        return <ToLearnModule />;
      case "scores":
        return <ScoresModule />;
      case "journal":
        return <JournalModule />;
      case "chat":
        return <ParleMoiChat />;
      default:
        return renderDisciplineContent();
    }
  };

  const currentKey = activeSection === "disciplines" ? `disc-${activeDiscipline}` : `sec-${activeSection}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-500 selection:text-white flex flex-col relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="ambient-glow">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeDiscipline={activeDiscipline}
          setActiveDiscipline={setActiveDiscipline}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-md py-6 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700">K-Pop Trainee Studio</span>
            </div>
            <p>© 2026 Trainee Companion — Coaching bienveillant, positif et d'excellence scénique.</p>
            <div className="flex space-x-4 text-slate-500 font-medium">
              <span className="hover:text-slate-800 transition-colors">v2.5 Idol Edition</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
