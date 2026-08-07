export type MainSection =
  | "disciplines"
  | "kpop_guide"
  | "planning"
  | "meditation"
  | "nutrition"
  | "to_learn"
  | "scores"
  | "journal"
  | "chat";

export interface MoodCheckIn {
  id: string;
  date: string;
  time: string;
  moodLevel: number;
  moodLabel: string;
  moodEmoji: string;
  energyLevel: number;
  stressLevel: number;
  notes?: string;
}

export interface MeditationSession {
  id: string;
  title: string;
  durationMinutes: number;
  category: "Gestion du Stress Pre-Audition" | "Ancrage Vocal & Respiration" | "Visualisation Scénique" | "Récupération Après Danse" | "Sommeil & Sérénité Trainee";
  description: string;
  audioTonePitch: number;
  benefits: string[];
}

export type DisciplineTab =
  | "skin"
  | "hair"
  | "singing"
  | "dance"
  | "sport"
  | "rap"
  | "korean";

export interface ChoreographyItem {
  id: string;
  title: string;
  artist: string;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  mastered: boolean;
  notes?: string;
}

export interface LearnItem {
  id: string;
  title: string;
  artist: string;
  type: "Danse" | "Chant" | "Rap";
  progress: number; // 0 to 100
  status: "À commencer" | "En cours" | "Maîtrisé";
}

export interface EvaluationEntry {
  id: string;
  date: string;
  discipline: "Chant" | "Danse" | "Rap" | "Sport" | "Général";
  overallScore: number; // 1 to 5
  techniqueRating: number; // 1 to 5
  energyRating: number; // 1 to 5
  charismaRating: number; // 1 to 5
  notes?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  moodEmoji: string;
  moodLabel: string;
  content: string;
  promptQuestion?: string;
  wins?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "mentor";
  text: string;
  image?: string;
  timestamp: string;
}

export interface Agency {
  id: string;
  name: string;
  koreanName: string;
  description: string;
  knownFor: string[];
  auditionStyle: string;
  famousGroups: string[];
  logoBg: string;
}

export interface SkinQuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    type: "seche" | "mixte" | "grasse" | "sensible";
  }[];
}
