import { useCallback } from 'react';
import { useAppState } from '../context/AppState/AppStateContext';
import { updatePreferences } from '../context/AppState/actions';
import { Preferences } from '../context/AppState/types';

export function usePreferences() {
  const { state, dispatch } = useAppState();
  const { preferences } = state;

  const updateSetting = useCallback(<K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) => {
    dispatch(updatePreferences({ [key]: value }));
  }, [dispatch]);

  const toggleNotifications = useCallback(() => {
    dispatch(updatePreferences({
      notifications: !preferences.notifications
    }));
  }, [preferences.notifications, dispatch]);

  const toggleSound = useCallback(() => {
    dispatch(updatePreferences({
      sound: !preferences.sound
    }));
  }, [preferences.sound, dispatch]);

  const setDailyGoal = useCallback((goal: number) => {
    const validGoal = Math.max(5, Math.min(1000, goal));
    dispatch(updatePreferences({
      dailyGoal: validGoal
    }));
  }, [dispatch]);

  const setStudyInterval = useCallback((interval: number) => {
    const validInterval = Math.max(1, Math.min(100, interval));
    dispatch(updatePreferences({
      studyInterval: validInterval
    }));
  }, [dispatch]);

  const setQuestionsPerSession = useCallback((count: number) => {
    const validCount = Math.max(3, Math.min(9999, count));
    dispatch(updatePreferences({
      questionsPerSession: validCount
    }));
  }, [dispatch]);

  return {
    preferences,
    updateSetting,
    toggleNotifications,
    toggleSound,
    setDailyGoal,
    setStudyInterval,
    setQuestionsPerSession
  };
}
