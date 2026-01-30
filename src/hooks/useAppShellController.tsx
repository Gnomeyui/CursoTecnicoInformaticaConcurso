/**
 * ========================================
 * useAppShellController - Lógica do AppShell
 * ========================================
 * 
 * Custom Hook que centraliza TODA a lógica de negócio do AppShell.
 * O componente .tsx fica apenas com JSX puro.
 * 
 * Responsabilidades:
 * ✅ Gerenciamento de estado de navegação
 * ✅ Sincronização automática de dados
 * ✅ Configuração de status bar (Android)
 * ✅ Handler do botão "Voltar" físico
 * ✅ Analytics e tracking
 * ✅ Gerenciamento de celebrações
 */

import { useState, useEffect, useCallback } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';
import { useCustomization } from '../context/CustomizationContext';
import { trackEvent } from '../utils/analytics/simple-metrics';
import { syncService } from '../services/SyncService';
import { View, Difficulty } from '../app/AppRoutes';

// ========================================
// TIPOS
// ========================================

interface AppShellState {
  currentView: View;
  selectedSubject: string;
  selectedDifficulty: Difficulty;
  dailyScore: number;
  totalQuestions: number;
  showOnboarding: boolean;
  showSplash: boolean;
}

export interface UseAppShellControllerReturn {
  // Estado
  currentView: View;
  selectedSubject: string;
  selectedDifficulty: Difficulty;
  dailyScore: number;
  totalQuestions: number;
  showOnboarding: boolean;
  showSplash: boolean;
  showGloriaCelebration: boolean;
  showLevelUpCelebration: boolean;
  levelUpInfo: { oldLevel: number; newLevel: number } | null;
  
  // Handlers de navegação
  handleStartQuiz: () => void;
  handleSelectDifficulty: (difficulty: Difficulty) => void;
  handleBackToDashboard: () => void;
  handleBackFromDifficulty: () => void;
  handleOpenStatistics: () => void;
  handleOpenAchievements: () => void;
  handleOpenCustomization: () => void;
  handleOpenSettings: () => void;
  handleOpenSimulatedExam: () => void;
  handleOpenFlashcards: () => void;
  handleOpenRegimento: () => void;
  handleOpenProfiles: () => void;
  handleOpenStudyPlan: () => void;
  
  // Handlers de UI
  dismissGloriaCelebration: () => void;
  dismissLevelUpCelebration: () => void;
  handleOnboardingComplete: () => void;
  handleSplashFinish: () => void;
}

// ========================================
// STORAGE KEYS
// ========================================

const STORAGE_KEYS = {
  ONBOARDING: 'hasSeenOnboarding',
} as const;

// ========================================
// HOOK PRINCIPAL
// ========================================

export function useAppShellController(): UseAppShellControllerReturn {
  
  // ========================================
  // CONTEXTOS
  // ========================================
  
  const { 
    showLevelUpCelebration, 
    dismissLevelUpCelebration, 
    levelUpInfo, 
    showGloriaCelebration, 
    dismissGloriaCelebration 
  } = useGame();
  
  const { getTodayStats } = useStats();
  const { primaryColor: currentTheme } = useCustomization();

  // ========================================
  // ESTADO LOCAL
  // ========================================
  
  const [state, setState] = useState<AppShellState>({
    currentView: 'dashboard',
    selectedSubject: '',
    selectedDifficulty: 'mix',
    dailyScore: 0,
    totalQuestions: 0,
    showOnboarding: !localStorage.getItem(STORAGE_KEYS.ONBOARDING),
    showSplash: false, // Desativado temporariamente
  });

  // ========================================
  // INICIALIZAÇÃO DO APP
  // ========================================
  
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Inicializando aplicação...');
        
        // Sincroniza questões automaticamente
        await syncService.autoSync();
        
        // Mostra estatísticas do banco
        const stats = await syncService.getLocalStats();
        console.log('📊 Banco de dados:', stats);
        
      } catch (error) {
        console.error('⚠️ Erro na inicialização:', error);
        // Não bloqueia o app
      }
    };

    initializeApp();
  }, []);

  // ========================================
  // CARREGAR ESTATÍSTICAS DO DIA
  // ========================================
  
  useEffect(() => {
    const todayStats = getTodayStats();
    setState(prev => ({
      ...prev,
      dailyScore: todayStats.correctAnswers,
      totalQuestions: todayStats.questionsAnswered,
    }));
  }, [getTodayStats]);

  // ========================================
  // ATUALIZAR STATUS BAR (ANDROID)
  // ========================================
  
  useEffect(() => {
    const updateStatusBar = async () => {
      if (typeof window !== 'undefined' && 'StatusBar' in window) {
        const StatusBar = (window as any).StatusBar;
        const color = currentTheme || '#ffffff';
        
        StatusBar?.setStyle('light-content');
        StatusBar?.setBackgroundColor(color);
      }
    };
    
    updateStatusBar();
  }, [currentTheme]);

  // ========================================
  // HANDLER DO BOTÃO "VOLTAR" (ANDROID)
  // ========================================
  
  useEffect(() => {
    let backButtonListener: any;

    const setupBackButton = async () => {
      try {
        backButtonListener = await CapacitorApp.addListener(
          'backButton', 
          ({ canGoBack }) => {
            console.log('🔙 Botão "Voltar" pressionado. View atual:', state.currentView);

            if (state.currentView !== 'dashboard') {
              handleBackToDashboard();
            } else {
              CapacitorApp.minimizeApp();
            }
          }
        );

        console.log('✅ Listener do botão "Voltar" configurado');
      } catch (error) {
        console.log('ℹ️ Plugin Capacitor App não disponível (web)');
      }
    };

    setupBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [state.currentView]); // Atualiza quando currentView muda

  // ========================================
  // NAVIGATION HANDLERS (useCallback para performance)
  // ========================================
  
  const handleStartQuiz = useCallback(() => {
    trackEvent.sessionStarted();
    trackEvent.screenViewed('difficulty-selector');
    
    setState(prev => ({
      ...prev,
      selectedSubject: 'all',
      currentView: 'difficulty',
    }));
  }, []);

  const handleSelectDifficulty = useCallback((difficulty: Difficulty) => {
    trackEvent.screenViewed('study-session');
    
    setState(prev => ({
      ...prev,
      selectedDifficulty: difficulty,
      currentView: 'study',
    }));
  }, []);

  const handleBackToDashboard = useCallback(() => {
    trackEvent.screenViewed('dashboard');
    
    const todayStats = getTodayStats();
    
    setState(prev => ({
      ...prev,
      currentView: 'dashboard',
      selectedSubject: '',
      selectedDifficulty: 'mix',
      dailyScore: todayStats.correctAnswers,
      totalQuestions: todayStats.questionsAnswered,
    }));
  }, [getTodayStats]);

  const handleBackFromDifficulty = useCallback(() => {
    trackEvent.screenViewed('dashboard');
    
    setState(prev => ({
      ...prev,
      currentView: 'dashboard',
      selectedSubject: '',
    }));
  }, []);

  const handleOpenStatistics = useCallback(() => {
    trackEvent.screenViewed('statistics');
    setState(prev => ({ ...prev, currentView: 'statistics' }));
  }, []);
  
  const handleOpenAchievements = useCallback(() => {
    trackEvent.screenViewed('achievements');
    setState(prev => ({ ...prev, currentView: 'achievements' }));
  }, []);
  
  const handleOpenCustomization = useCallback(() => {
    trackEvent.screenViewed('customization');
    setState(prev => ({ ...prev, currentView: 'customization' }));
  }, []);
  
  const handleOpenSettings = useCallback(() => {
    trackEvent.screenViewed('settings');
    setState(prev => ({ ...prev, currentView: 'settings' }));
  }, []);
  
  const handleOpenSimulatedExam = useCallback(() => {
    trackEvent.screenViewed('simulated-exam');
    setState(prev => ({ ...prev, currentView: 'simulatedExam' }));
  }, []);
  
  const handleOpenFlashcards = useCallback(() => {
    trackEvent.screenViewed('flashcards');
    setState(prev => ({ ...prev, currentView: 'flashcards' }));
  }, []);
  
  const handleOpenRegimento = useCallback(() => {
    trackEvent.screenViewed('regimento');
    setState(prev => ({ ...prev, currentView: 'regimento' }));
  }, []);
  
  const handleOpenProfiles = useCallback(() => {
    trackEvent.screenViewed('profiles');
    setState(prev => ({ ...prev, currentView: 'profiles' }));
  }, []);
  
  const handleOpenStudyPlan = useCallback(() => {
    trackEvent.screenViewed('study-plan');
    setState(prev => ({ ...prev, currentView: 'studyPlan' }));
  }, []);

  // ========================================
  // UI HANDLERS
  // ========================================
  
  const handleOnboardingComplete = useCallback(() => {
    setState(prev => ({ ...prev, showOnboarding: false }));
  }, []);

  const handleSplashFinish = useCallback(() => {
    setState(prev => ({ ...prev, showSplash: false }));
  }, []);

  // ========================================
  // RETORNO
  // ========================================
  
  return {
    // Estado
    ...state,
    showGloriaCelebration,
    showLevelUpCelebration,
    levelUpInfo,
    
    // Handlers de navegação
    handleStartQuiz,
    handleSelectDifficulty,
    handleBackToDashboard,
    handleBackFromDifficulty,
    handleOpenStatistics,
    handleOpenAchievements,
    handleOpenCustomization,
    handleOpenSettings,
    handleOpenSimulatedExam,
    handleOpenFlashcards,
    handleOpenRegimento,
    handleOpenProfiles,
    handleOpenStudyPlan,
    
    // Handlers de UI
    dismissGloriaCelebration,
    dismissLevelUpCelebration,
    handleOnboardingComplete,
    handleSplashFinish,
  };
}
