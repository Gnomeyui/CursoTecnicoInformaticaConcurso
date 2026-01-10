import { AppAction, UserProfile, Progress, Stats, Preferences } from './types';

// Action Creators (funções puras que retornam actions)

export const setUser = (user: UserProfile): AppAction => ({
  type: 'SET_USER',
  payload: user
});

export const updateProgress = (progress: Partial<Progress>): AppAction => ({
  type: 'UPDATE_PROGRESS',
  payload: progress
});

export const updateStats = (stats: Partial<Stats>): AppAction => ({
  type: 'UPDATE_STATS',
  payload: stats
});

export const updatePreferences = (preferences: Partial<Preferences>): AppAction => ({
  type: 'UPDATE_PREFERENCES',
  payload: preferences
});

export const setLoading = (isLoading: boolean): AppAction => ({
  type: 'SET_LOADING',
  payload: isLoading
});

export const setError = (error: string | null): AppAction => ({
  type: 'SET_ERROR',
  payload: error
});

export const resetState = (): AppAction => ({
  type: 'RESET_STATE'
});
