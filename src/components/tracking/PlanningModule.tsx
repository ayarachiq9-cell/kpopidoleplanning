import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Bell,
  BellRing,
  BellOff,
  Sparkles,
  Flame,
  Volume2,
  Dices,
  Save,
  Check,
  Zap,
  MapPin,
  ListFilter,
  CheckSquare
} from "lucide-react";
import { soundEngine } from "../../utils/audio";

export type DisciplineType =
  | "Danse"
  | "Chant"
  | "Sport"
  | "Rap"
  | "Coréen"
  | "Méditation"
  | "Posture & Style";

export type DayOfWeek =
  | "Lundi"
  | "Mardi"
  | "Mercredi"
  | "Jeudi"
  | "Vendredi"
  | "Samedi"
  | "Dimanche";

export interface TrainingSession {
  id: string;
  day: DayOfWeek;
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "11:00"
  discipline: DisciplineType;
  title: string;
  location?: string;
  completed: boolean;
  reminderEnabled: boolean;
  reminderLeadTimeMinutes: number; // 0, 10, 15, 30
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche"
];

const DISCIPLINE_CONFIG: Record<
  DisciplineType,
  { label: string; bg: string; text: string; border: string; iconEmoji: string }
> = {
  Danse: {
    label: "Danse",
    bg: "bg-pink-100/90",
    text: "text-pink-900",
    border: "border-pink-300",
    iconEmoji: "💃"
  },
  Chant: {
    label: "Chant",
    bg: "bg-blue-100/90",
    text: "text-blue-900",
    border: "border-blue-300",
    iconEmoji: "🎤"
  },
  Sport: {
    label: "Sport & Cardio",
    bg: "bg-emerald-100/90",
    text: "text-emerald-900",
    border: "border-emerald-300",
    iconEmoji: "⚡"
  },
  Rap: {
    label: "Rap & Flow",
    bg: "bg-amber-100/90",
    text: "text-amber-900",
    border: "border-amber-300",
    iconEmoji: "🎧"
  },
  Coréen: {
    label: "Coréen & Vocab",
    bg: "bg-red-100/90",
    text: "text-red-900",
    border: "border-red-300",
    iconEmoji: "🇰🇷"
  },
  Méditation: {
    label: "Méditation & Mental",
    bg: "bg-cyan-100/90",
    text: "text-cyan-900",
    border: "border-cyan-300",
    iconEmoji: "🧘"
  },
  "Posture & Style": {
    label: "Posture & Style",
    bg: "bg-purple-100/90",
    text: "text-purple-900",
    border: "border-purple-300",
    iconEmoji: "✨"
  }
};

const DEFAULT_TRAINEE_SCHEDULE: TrainingSession[] = [
  {
    id: "s1",
    day: "Lundi",
    startTime: "09:00",
    endTime: "10:30",
    discipline: "Sport",
    title: "Cardio HIIT & Endurances Sautée",
    location: "Salle de Fitness",
    completed: true,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 15
  },
  {
    id: "s2",
    day: "Lundi",
    startTime: "11:00",
    endTime: "13:00",
    discipline: "Chant",
    title: "Technique Vocale, Vocalises & Soutien Diaphragme",
    location: "Studio Vocal A",
    completed: true,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 10
  },
  {
    id: "s3",
    day: "Lundi",
    startTime: "14:30",
    endTime: "17:30",
    discipline: "Danse",
    title: "Knife Dance & Synchronisation de Groupe",
    location: "Grand Studio Miroirs",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 15
  },
  {
    id: "s4",
    day: "Lundi",
    startTime: "18:00",
    endTime: "19:00",
    discipline: "Coréen",
    title: "Vocabulaire d'Audition & Journal de Trainee",
    location: "Salle d'Étude",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 10
  },
  {
    id: "s5",
    day: "Mardi",
    startTime: "09:30",
    endTime: "11:30",
    discipline: "Danse",
    title: "Isolation Hip-Hop, Popping & Isométrie",
    location: "Grand Studio Miroirs",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 15
  },
  {
    id: "s6",
    day: "Mardi",
    startTime: "14:00",
    endTime: "16:00",
    discipline: "Posture & Style",
    title: "Pose Caméra, Eye-Contact & Ending Fairy",
    location: "Studio Photo / Vidéo",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 10
  },
  {
    id: "s7",
    day: "Mardi",
    startTime: "16:30",
    endTime: "18:00",
    discipline: "Rap",
    title: "Diction Rapide & Flow Micro",
    location: "Studio Enregistrement B",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 15
  },
  {
    id: "s8",
    day: "Mercredi",
    startTime: "10:00",
    endTime: "11:30",
    discipline: "Sport",
    title: "Pilates Trainee & Souplesse des Épaules",
    location: "Salle de Fitness",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 15
  },
  {
    id: "s9",
    day: "Mercredi",
    startTime: "13:30",
    endTime: "16:30",
    discipline: "Danse",
    title: "Mémorisation Accélérée de Chorégraphie",
    location: "Grand Studio Miroirs",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 15
  },
  {
    id: "s10",
    day: "Jeudi",
    startTime: "09:00",
    endTime: "10:30",
    discipline: "Sport",
    title: "Renforcement Sangle Abdominale & Cardio",
    location: "Salle de Fitness",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 10
  },
  {
    id: "s11",
    day: "Jeudi",
    startTime: "11:00",
    endTime: "12:30",
    discipline: "Coréen",
    title: "Diction & Salutations d'Agence",
    location: "Salle d'Étude",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 10
  },
  {
    id: "s12",
    day: "Vendredi",
    startTime: "10:00",
    endTime: "12:00",
    discipline: "Chant",
    title: "Simulation Évaluation Mensuelle Solo",
    location: "Studio Vocal A",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 15
  },
  {
    id: "s13",
    day: "Vendredi",
    startTime: "17:30",
    endTime: "18:30",
    discipline: "Méditation",
    title: "Respiration Diaphragmatique Anti-Stress",
    location: "Espace Sérénité",
    completed: false,
    reminderEnabled: true,
    reminderLeadTimeMinutes: 10
  }
];

export const PlanningModule: React.FC = () => {
  const [sessions, setSessions] = useState<TrainingSession[]>(() => {
    const saved = localStorage.getItem("kpop_weekly_schedule_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_TRAINEE_SCHEDULE;
  });

  const [selectedDayFilter, setSelectedDayFilter] = useState<string>("Semaine");
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );

  const [showNotificationToast, setShowNotificationToast] = useState<{
    title: string;
    body: string;
    time: string;
    discipline: DisciplineType;
  } | null>(null);

  // Form states for creating a new session
  const [newDay, setNewDay] = useState<DayOfWeek>("Lundi");
  const [newStartTime, setNewStartTime] = useState("10:00");
  const [newEndTime, setNewEndTime] = useState("11:30");
  const [newDiscipline, setNewDiscipline] = useState<DisciplineType>("Danse");
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("Studio Principal");
  const [newReminderLead, setNewReminderLead] = useState<number>(15);
  const [isAddingSession, setIsAddingSession] = useState(false);

  // Save sessions to localStorage
  const saveSchedule = (updated: TrainingSession[]) => {
    setSessions(updated);
    localStorage.setItem("kpop_weekly_schedule_v2", JSON.stringify(updated));
  };

  // Request browser Web Push Notification Permission
  const requestNotificationPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
        soundEngine.playSuccess();
        if (perm === "granted") {
          new Notification("🔔 Planning K-Pop Trainee Actif", {
            body: "Les rappels de séances de Danse, Chant et Sport sont désormais activés !",
            icon: "/favicon.ico"
          });
        }
      } catch (e) {
        console.warn("Notification permission error:", e);
      }
    }
  };

  // Test immediate push notification
  const triggerTestPushNotification = (session?: TrainingSession) => {
    const testTitle = session ? `⏰ Rappel Séance : ${session.title}` : "💃 Rappel K-Pop : Séance de Danse Imminente !";
    const testBody = session
      ? `Dans ${session.reminderLeadTimeMinutes} minutes à ${session.location || "Studio"}`
      : "Votre entraînement de Knife Dance commence dans 15 minutes au Grand Studio Miroirs.";
    const discipline = session ? session.discipline : "Danse";
    const timeStr = session ? session.startTime : "14:30";

    // Play sound notification
    soundEngine.playSuccess();

    // Trigger Browser Push if granted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(testTitle, {
          body: testBody,
          icon: "/favicon.ico"
        });
      } catch (e) {}
    }

    // Trigger In-App Animated Push Banner
    setShowNotificationToast({
      title: testTitle,
      body: testBody,
      time: timeStr,
      discipline
    });

    setTimeout(() => {
      setShowNotificationToast(null);
    }, 6000);
  };

  // Handle Add New Session
  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSession: TrainingSession = {
      id: Date.now().toString(),
      day: newDay,
      startTime: newStartTime,
      endTime: newEndTime,
      discipline: newDiscipline,
      title: newTitle.trim(),
      location: newLocation.trim() || "Studio",
      completed: false,
      reminderEnabled: true,
      reminderLeadTimeMinutes: newReminderLead
    };

    const updated = [...sessions, newSession];
    saveSchedule(updated);
    setNewTitle("");
    setIsAddingSession(false);
    soundEngine.playSuccess();
  };

  // Toggle Session Completion
  const toggleCompleted = (id: string) => {
    const updated = sessions.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s));
    saveSchedule(updated);
    soundEngine.playClick(800, 0.05);
  };

  // Toggle Session Reminder
  const toggleReminder = (id: string) => {
    const updated = sessions.map((s) => (s.id === id ? { ...s, reminderEnabled: !s.reminderEnabled } : s));
    saveSchedule(updated);
    soundEngine.playClick(1000, 0.05);
  };

  // Delete Session
  const handleDeleteSession = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    saveSchedule(updated);
    soundEngine.playClick(500, 0.05);
  };

  // Load Presets
  const loadPreset = (presetType: "hybe" | "dance" | "vocal" | "clear") => {
    if (presetType === "clear") {
      saveSchedule([]);
      soundEngine.playClick(400, 0.05);
      return;
    }
    if (presetType === "hybe") {
      saveSchedule(DEFAULT_TRAINEE_SCHEDULE);
      soundEngine.playSuccess();
      return;
    }
    if (presetType === "dance") {
      const danceHeavy: TrainingSession[] = [
        { id: "d1", day: "Lundi", startTime: "09:00", endTime: "12:00", discipline: "Danse", title: "Isolation, Popping & Footwork", location: "Studio A", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 15 },
        { id: "d2", day: "Lundi", startTime: "14:00", endTime: "17:00", discipline: "Danse", title: "Chorégraphie Girl Crush / Boy Group", location: "Studio A", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 15 },
        { id: "d3", day: "Mardi", startTime: "10:00", endTime: "12:30", discipline: "Sport", title: "Cardio HIIT & Endurance Scénique", location: "Fitness", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 10 },
        { id: "d4", day: "Mercredi", startTime: "13:00", endTime: "17:00", discipline: "Danse", title: "Mastery Knife Dance & Alignement Miroir", location: "Studio A", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 15 },
        { id: "d5", day: "Vendredi", startTime: "14:00", endTime: "17:00", discipline: "Danse", title: "Spécial Freestyle & Expressivité Scénique", location: "Studio B", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 15 }
      ];
      saveSchedule(danceHeavy);
      soundEngine.playSuccess();
      return;
    }
    if (presetType === "vocal") {
      const vocalHeavy: TrainingSession[] = [
        { id: "v1", day: "Lundi", startTime: "10:00", endTime: "12:30", discipline: "Chant", title: "Vocalises, Agilité & Registre Aigu", location: "Studio Vocal", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 15 },
        { id: "v2", day: "Mardi", startTime: "14:00", endTime: "16:00", discipline: "Chant", title: "Pratique Chant Live sous Effort", location: "Studio Vocal", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 10 },
        { id: "v3", day: "Mercredi", startTime: "10:00", endTime: "12:00", discipline: "Rap", title: "Rhythm Flow & Diction Rapide", location: "Micro Studio", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 10 },
        { id: "v4", day: "Jeudi", startTime: "14:00", endTime: "16:30", discipline: "Chant", title: "Harmonies à Plusieurs Voix & Duo", location: "Studio Vocal", completed: false, reminderEnabled: true, reminderLeadTimeMinutes: 15 }
      ];
      saveSchedule(vocalHeavy);
      soundEngine.playSuccess();
    }
  };

  // Filtered sessions
  const displayedSessions = sessions.filter((s) => {
    if (selectedDayFilter === "Semaine") return true;
    return s.day === selectedDayFilter;
  });

  // Calculate statistics
  const totalSessionsCount = sessions.length;
  const completedCount = sessions.filter((s) => s.completed).length;
  const completionPercentage = totalSessionsCount > 0 ? Math.round((completedCount / totalSessionsCount) * 100) : 0;

  // Total Hours breakdown
  const hoursByDiscipline: Record<string, number> = {};
  sessions.forEach((s) => {
    const [startH, startM] = s.startTime.split(":").map(Number);
    const [endH, endM] = s.endTime.split(":").map(Number);
    const duration = (endH * 60 + endM - (startH * 60 + startM)) / 60;
    const durHours = duration > 0 ? duration : 1;
    hoursByDiscipline[s.discipline] = (hoursByDiscipline[s.discipline] || 0) + durHours;
  });

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Interactive Floating Push Notification Banner Toast */}
      {showNotificationToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-900 border-2 border-pink-500 rounded-2xl p-4 text-white shadow-2xl animate-bounce">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white shrink-0">
                <BellRing className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
                  🔔 RAPPEL EN DIRECT ({showNotificationToast.time})
                </span>
                <h4 className="text-sm font-extrabold text-white">{showNotificationToast.title}</h4>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationToast(null)}
              className="text-xs text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            {showNotificationToast.body}
          </p>
        </div>
      )}

      {/* Hero Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-purple-400 font-bold uppercase tracking-wider text-xs mb-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Gestion d'Emploi du Temps K-Pop Trainee</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Planning Hebdomadaire & Rappels Notifications
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
            Organisez vos entraînements quotidiens de Danse, Chant, Sport et Coréen. Activez les notifications push pour ne jamais manquer une répétition !
          </p>
        </div>

        {/* Push Notification Controls */}
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <button
            onClick={requestNotificationPermission}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all border shadow-md ${
              notificationPermission === "granted"
                ? "bg-emerald-600/30 text-emerald-300 border-emerald-500/40"
                : "bg-pink-600 hover:bg-pink-500 text-white border-pink-400/40"
            }`}
          >
            {notificationPermission === "granted" ? (
              <>
                <Bell className="w-4 h-4 text-emerald-400" />
                <span>Notifications Push Actives 🔔</span>
              </>
            ) : (
              <>
                <BellRing className="w-4 h-4 animate-bounce" />
                <span>Activer les Notifications Push</span>
              </>
            )}
          </button>

          <button
            onClick={() => triggerTestPushNotification()}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>Tester une Notification Instantanée</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Progression Hebdomadaire
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{completionPercentage}%</span>
            <span className="text-xs text-slate-500 font-bold">
              {completedCount} / {totalSessionsCount} séances
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Breakdown Hours */}
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Volume Danse Prévu
          </span>
          <div className="text-2xl font-black text-pink-600">
            {hoursByDiscipline["Danse"] || 0} heures <span className="text-xs font-bold text-slate-400">/sem.</span>
          </div>
          <p className="text-[11px] text-slate-500">Chorégraphies & Knife Dance</p>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Volume Chant & Vocal
          </span>
          <div className="text-2xl font-black text-blue-600">
            {hoursByDiscipline["Chant"] || 0} heures <span className="text-xs font-bold text-slate-400">/sem.</span>
          </div>
          <p className="text-[11px] text-slate-500">Vocalises & Évaluations</p>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Volume Sport & Cardio
          </span>
          <div className="text-2xl font-black text-emerald-600">
            {hoursByDiscipline["Sport"] || 0} heures <span className="text-xs font-bold text-slate-400">/sem.</span>
          </div>
          <p className="text-[11px] text-slate-500">HIIT, Souplesse & Pilates</p>
        </div>
      </div>

      {/* Preset Schedule Templates & Add Session Trigger */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-extrabold text-slate-900 text-sm md:text-base">
              Modèles d'Emploi du Temps Préconfigurés
            </h3>
          </div>

          <button
            onClick={() => setIsAddingSession(!isAddingSession)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une Séance au Planning</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadPreset("hybe")}
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold cursor-pointer transition-all"
          >
            🏢 Programme Officiel Trainee (HYBE/SM)
          </button>
          <button
            onClick={() => loadPreset("dance")}
            className="px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-200 text-xs font-bold cursor-pointer transition-all"
          >
            💃 Spécial Marathon Danse
          </button>
          <button
            onClick={() => loadPreset("vocal")}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold cursor-pointer transition-all"
          >
            🎤 Spécial Marathon Vocal
          </button>
          <button
            onClick={() => loadPreset("clear")}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 text-xs font-bold cursor-pointer transition-all ml-auto"
          >
            🧹 Effacer Tout
          </button>
        </div>

        {/* Add Session Collapsible Form */}
        {isAddingSession && (
          <form
            onSubmit={handleAddSession}
            className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4 animate-fadeIn"
          >
            <h4 className="font-extrabold text-xs text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-400" />
              <span>Créer une Nouvelle Séance d'Entraînement :</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Day selector */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Jour :</label>
                <select
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value as DayOfWeek)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {DAYS_OF_WEEK.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start & End Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Début :</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Fin :</label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Discipline */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Discipline :</label>
                <select
                  value={newDiscipline}
                  onChange={(e) => setNewDiscipline(e.target.value as DisciplineType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {Object.keys(DISCIPLINE_CONFIG).map((disc) => (
                    <option key={disc} value={disc}>
                      {DISCIPLINE_CONFIG[disc as DisciplineType].iconEmoji} {disc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reminder Lead Time */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Rappel Notification :</label>
                <select
                  value={newReminderLead}
                  onChange={(e) => setNewReminderLead(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={0}>À l'heure exacte</option>
                  <option value={10}>10 minutes avant</option>
                  <option value={15}>15 minutes avant</option>
                  <option value={30}>30 minutes avant</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Titre de la Séance :</label>
                <input
                  type="text"
                  placeholder="Ex: Knife Dance & Isolation des épaules"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Lieu / Studio :</label>
                <input
                  type="text"
                  placeholder="Ex: Studio Mirail A / Maison"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddingSession(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Enregistrer au Planning
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Filter Tabs by Day of Week */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedDayFilter("Semaine")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDayFilter === "Semaine"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Semaine Complète ({sessions.length})
            </button>

            {DAYS_OF_WEEK.map((day) => {
              const dayCount = sessions.filter((s) => s.day === day).length;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDayFilter(day)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedDayFilter === day
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{day}</span>
                  {dayCount > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        selectedDayFilter === day ? "bg-purple-800 text-purple-100" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {dayCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sessions Calendar Schedule List */}
        <div className="space-y-4">
          {selectedDayFilter === "Semaine" ? (
            // Grouped by Days
            DAYS_OF_WEEK.map((day) => {
              const daySessions = sessions.filter((s) => s.day === day);
              if (daySessions.length === 0) return null;

              return (
                <div key={day} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-600" />
                      <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">{day}</h4>
                    </div>
                    <span className="text-xs text-slate-500 font-bold font-mono">
                      {daySessions.filter((s) => s.completed).length} / {daySessions.length} réalisées
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {daySessions.map((s) => (
                      <SessionCard
                        key={s.id}
                        session={s}
                        onToggleCompleted={toggleCompleted}
                        onToggleReminder={toggleReminder}
                        onDelete={handleDeleteSession}
                        onTestPush={triggerTestPushNotification}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Single Day View
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                Séances du {selectedDayFilter} ({displayedSessions.length})
              </h4>

              {displayedSessions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <p className="text-xs font-bold text-slate-600">Aucune séance planifiée pour le {selectedDayFilter}.</p>
                  <button
                    onClick={() => {
                      setNewDay(selectedDayFilter as DayOfWeek);
                      setIsAddingSession(true);
                    }}
                    className="text-xs font-bold text-purple-600 hover:underline cursor-pointer"
                  >
                    + Ajouter une séance pour ce jour
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {displayedSessions.map((s) => (
                    <SessionCard
                      key={s.id}
                      session={s}
                      onToggleCompleted={toggleCompleted}
                      onToggleReminder={toggleReminder}
                      onDelete={handleDeleteSession}
                      onTestPush={triggerTestPushNotification}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {sessions.length === 0 && (
            <div className="p-10 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
              <p className="text-sm font-bold text-slate-700">Votre planning est actuellement vide.</p>
              <button
                onClick={() => loadPreset("hybe")}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer"
              >
                Charger le Programme Officiel Trainee (HYBE/SM)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Subcomponent for each session card
interface SessionCardProps {
  session: TrainingSession;
  onToggleCompleted: (id: string) => void;
  onToggleReminder: (id: string) => void;
  onDelete: (id: string) => void;
  onTestPush: (s: TrainingSession) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onToggleCompleted,
  onToggleReminder,
  onDelete,
  onTestPush
}) => {
  const config = DISCIPLINE_CONFIG[session.discipline] || DISCIPLINE_CONFIG["Danse"];

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 space-y-3 flex flex-col justify-between ${
        session.completed
          ? "bg-slate-50/80 border-slate-200 opacity-75"
          : `${config.bg} ${config.border} shadow-xs`
      }`}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{config.iconEmoji}</span>
            <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded ${config.text} bg-white/70 border border-slate-200/60`}>
              {session.discipline}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-slate-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {session.startTime} - {session.endTime}
              </span>
            </span>

            <button
              onClick={() => onDelete(session.id)}
              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
              title="Supprimer la séance"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h5 className={`font-extrabold text-sm ${session.completed ? "line-through text-slate-500" : "text-slate-900"}`}>
          {session.title}
        </h5>

        {session.location && (
          <p className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span>{session.location}</span>
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
        {/* Toggle Complete Checkbox Button */}
        <button
          onClick={() => onToggleCompleted(session.id)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-all ${
            session.completed
              ? "bg-emerald-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${session.completed ? "text-white" : "text-slate-400"}`} />
          <span>{session.completed ? "Séance Réalisée ✓" : "Marquer comme Faite"}</span>
        </button>

        {/* Reminder Toggle & Test */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleReminder(session.id)}
            className={`p-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
              session.reminderEnabled
                ? "bg-purple-600 text-white border-purple-700 shadow-xs"
                : "bg-white text-slate-400 border-slate-200"
            }`}
            title="Activer/Désactiver le rappel notification"
          >
            {session.reminderEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {session.reminderEnabled ? `${session.reminderLeadTimeMinutes}m` : "Off"}
            </span>
          </button>

          <button
            onClick={() => onTestPush(session)}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs cursor-pointer"
            title="Tester l'alarme notification pour cette séance"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
