// Tipos centralizados do estado da aplicação

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface Progress {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  streak: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface Stats {
  daily: {
    questionsAnswered: number;
    correctAnswers: number;
    studyTime: number;
    date: string;
  };
  weekly: {
    questionsAnswered: number;
    correctAnswers: number;
    studyTime: number;
  };
  monthly: {
    questionsAnswered: number;
    correctAnswers: number;
    studyTime: number;
  };
  bySubject: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
  }>;
}

export interface Preferences {
  theme: 'light' | 'dark';
  colorTheme: string;
  notifications: boolean;
  sound: boolean;
  dailyGoal: number;
  studyInterval: number;
  questionsPerSession: number;
}

export interface AppState {
  user: UserProfile | null;
  progress: Progress;
  stats: Stats;
  preferences: Preferences;
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<Progress> }
  | { type: 'UPDATE_STATS'; payload: Partial<Stats> }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<Preferences> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };
