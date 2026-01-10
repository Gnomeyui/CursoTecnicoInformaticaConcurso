import { AppState, AppAction } from './types';

export const initialState: AppState = {
  user: null,
  progress: {
    level: 1,
    currentXP: 0,
    xpForNextLevel: 100,
    streak: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  },
  stats: {
    daily: {
      questionsAnswered: 0,
      correctAnswers: 0,
      studyTime: 0,
      date: new Date().toISOString().split('T')[0]
    },
    weekly: {
      questionsAnswered: 0,
      correctAnswers: 0,
      studyTime: 0
    },
    monthly: {
      questionsAnswered: 0,
      correctAnswers: 0,
      studyTime: 0
    },
    bySubject: {}
  },
  preferences: {
    theme: 'light',
    colorTheme: 'focus',
    notifications: true,
    sound: false,
    dailyGoal: 50,
    studyInterval: 25,
    questionsPerSession: 10
  },
  isLoading: false,
  error: null
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          ...action.payload
        }
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload
        }
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
