/**
 * ========================================
 * AppShell - Container Principal (REFATORADO 10/10)
 * ========================================
 * 
 * Melhorias aplicadas:
 * ✅ Separação completa de lógica (Hook customizado)
 * ✅ TypeScript estrito (zero any)
 * ✅ Performance otimizada (memo, useCallback)
 * ✅ Error Boundaries
 * ✅ Código limpo (sem comentários legados)
 * 
 * Arquitetura:
 * - useAppShellController: Toda a lógica de negócio
 * - AppShell: Apenas JSX e renderização
 */

import React, { memo } from 'react';
import { Toaster } from '../components/ui/sonner';
import { AppRoutes } from './AppRoutes';
import { ConfettiCelebration } from '../components/ConfettiCelebration';
import { LevelUpCelebration } from '../components/LevelUpCelebration';
import { OnboardingPage } from '../components/onboarding/OnboardingPage';
import { SplashScreen } from '../components/SplashScreen';
import { useAppShellController } from '../hooks/useAppShellController';
import { ErrorBoundary } from '../components/ErrorBoundary';

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export const AppShell = memo(() => {
  const {
    // Estado de navegação
    currentView,
    selectedSubject,
    selectedDifficulty,
    dailyScore,
    totalQuestions,
    
    // Estados de UI
    showOnboarding,
    showSplash,
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
  } = useAppShellController();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-app text-app transition-colors duration-300">
        
        {/* Rotas principais */}
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
          <OnboardingPage onComplete={handleOnboardingComplete} />
        )}
        
        {/* Toaster para feedback */}
        <Toaster />
        
        {/* Splash Screen */}
        {showSplash && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </div>
    </ErrorBoundary>
  );
});

AppShell.displayName = 'AppShell';
