/**
 * AppShell - Container Principal da Aplicação
 * 
 * Gerencia:
 * - Estado global de navegação
 * - Handlers de navegação
 * - Celebrações e Onboarding
 * - Listener do botão "Voltar" do Android
 */

import React, { useState, useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';
import { useCustomization } from '../context/CustomizationContext';
import { ConfettiCelebration } from '../components/ConfettiCelebration';
import { LevelUpCelebration } from '../components/LevelUpCelebration';
import { OnboardingPage } from '../components/onboarding/OnboardingPage';
import { SplashScreen } from '../components/SplashScreen';
import { AppRoutes, View, Difficulty } from './AppRoutes';
import { trackEvent } from '../utils/analytics/simple-metrics';
import { syncService } from '../services/SyncService';
import { Toaster } from '../components/ui/sonner';

export function AppShell() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mix');
  const [dailyScore, setDailyScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('hasSeenOnboarding');
  });
  // SPLASH DESATIVADO TEMPORARIAMENTE
  const [showSplash, setShowSplash] = useState(false);
  // const [showSplash, setShowSplash] = useState(() => {
  //   // Mostra splash apenas se não estiver no onboarding
  //   return !!localStorage.getItem('hasSeenOnboarding');
  // });
  
  const { showLevelUpCelebration, dismissLevelUpCelebration, levelUpInfo, showGloriaCelebration, dismissGloriaCelebration } = useGame();
  const { getTodayStats } = useStats();
  const { primaryColor: currentTheme } = useCustomization();

  // ========================================
  // CARREGAR ESTATÍSTICAS DO DIA
  // ========================================
  useEffect(() => {
    const todayStats = getTodayStats();
    setDailyScore(todayStats.correctAnswers);
    setTotalQuestions(todayStats.questionsAnswered);
  }, [getTodayStats]);

  // ========================================
  // 🔄 SINCRONIZAÇÃO AUTOMÁTICA NO BOOT
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
  }, []); // Executa apenas uma vez no mount

  // ========================================
  // ATUALIZAR COR DA STATUS BAR (ANDROID)
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
  // 🔙 HANDLER DO BOTÃO FÍSICO "VOLTAR" DO ANDROID
  // ========================================
  useEffect(() => {
    let backButtonListener: any;

    const setupBackButton = async () => {
      try {
        backButtonListener = await CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          console.log('🔙 Botão "Voltar" pressionado. View atual:', currentView);

          if (currentView !== 'dashboard') {
            handleBackToDashboard();
          } else {
            CapacitorApp.minimizeApp();
          }
        });

        console.log('✅ Listener do botão "Voltar" configurado');
      } catch (error) {
        console.log('ℹ️ Plugin Capacitor App não disponível (provavelmente em web)');
      }
    };

    setupBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [currentView]);

  // ========================================
  // NAVIGATION HANDLERS
  // ========================================
  const handleStartQuiz = () => {
    trackEvent.sessionStarted(); // 📊 Métrica
    trackEvent.screenViewed('difficulty-selector');
    setSelectedSubject('all');
    setCurrentView('difficulty');
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    trackEvent.screenViewed('study-session');
    setSelectedDifficulty(difficulty);
    setCurrentView('study');
  };

  const handleBackToDashboard = () => {
    trackEvent.screenViewed('dashboard');
    setCurrentView('dashboard');
    setSelectedSubject('');
    setSelectedDifficulty('mix');
    
    const todayStats = getTodayStats();
    setDailyScore(todayStats.correctAnswers);
    setTotalQuestions(todayStats.questionsAnswered);
  };

  const handleBackFromDifficulty = () => {
    trackEvent.screenViewed('dashboard');
    setCurrentView('dashboard');
    setSelectedSubject('');
  };

  const handleOpenStatistics = () => {
    trackEvent.screenViewed('statistics');
    setCurrentView('statistics');
  };
  
  const handleOpenAchievements = () => {
    trackEvent.screenViewed('achievements');
    setCurrentView('achievements');
  };
  
  const handleOpenCustomization = () => {
    trackEvent.screenViewed('customization');
    setCurrentView('customization');
  };
  
  const handleOpenSettings = () => {
    trackEvent.screenViewed('settings');
    setCurrentView('settings');
  };
  
  const handleOpenSimulatedExam = () => {
    trackEvent.screenViewed('simulated-exam');
    setCurrentView('simulatedExam');
  };
  
  const handleOpenFlashcards = () => {
    trackEvent.screenViewed('flashcards');
    setCurrentView('flashcards');
  };
  
  const handleOpenRegimento = () => {
    trackEvent.screenViewed('regimento');
    setCurrentView('regimento');
  };
  
  const handleOpenProfiles = () => {
    trackEvent.screenViewed('profiles');
    setCurrentView('profiles');
  };
  
  const handleOpenStudyPlan = () => {
    trackEvent.screenViewed('study-plan');
    setCurrentView('studyPlan');
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-app text-app transition-colors duration-300">
      
      {/* Rotas/Telas */}
      <AppRoutes 
        currentView={currentView}
        selectedSubject={selectedSubject}
        selectedDifficulty={selectedDifficulty}
        dailyScore={dailyScore}
        totalQuestions={totalQuestions}
        onStartQuiz={handleStartQuiz}
        onSelectDifficulty={handleSelectDifficulty}
        onBackToDashboard={handleBackToDashboard}
        onBackFromDifficulty={handleBackFromDifficulty}
        onOpenStatistics={handleOpenStatistics}
        onOpenAchievements={handleOpenAchievements}
        onOpenCustomization={handleOpenCustomization}
        onOpenSettings={handleOpenSettings}
        onOpenSimulatedExam={handleOpenSimulatedExam}
        onOpenFlashcards={handleOpenFlashcards}
        onOpenRegimento={handleOpenRegimento}
        onOpenProfiles={handleOpenProfiles}
        onOpenStudyPlan={handleOpenStudyPlan}
      />

      {/* Celebrações */}
      {showGloriaCelebration && (
        <ConfettiCelebration onDismiss={dismissGloriaCelebration} />
      )}

      {showLevelUpCelebration && levelUpInfo && (
        <LevelUpCelebration
          oldLevel={levelUpInfo.oldLevel}
          newLevel={levelUpInfo.newLevel}
          onDismiss={dismissLevelUpCelebration}
        />
      )}

      {/* Onboarding (primeira vez) */}
      {showOnboarding && (
        <OnboardingPage 
          onComplete={() => {
            setShowOnboarding(false);
          }} 
        />
      )}
      
      {/* Toaster para mensagens de feedback */}
      <Toaster />
      
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen 
          onFinish={() => {
            setShowSplash(false);
          }} 
        />
      )}
    </div>
  );
}