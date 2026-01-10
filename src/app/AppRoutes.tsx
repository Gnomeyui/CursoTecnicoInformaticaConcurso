/**
 * AppRoutes - Gerenciador de Rotas/Telas
 * 
 * Separa a lógica de roteamento do App.tsx
 * Facilita navegação e organização
 */

import React from 'react';
import Dashboard from '../components/Dashboard';
import { StudySession } from '../components/StudySession';
import { Statistics } from '../components/Statistics';
import { Achievements } from '../components/Achievements';
import { Customization } from '../components/Customization';
import { DifficultySelector } from '../components/DifficultySelector';
import { SimulatedExam } from '../components/SimulatedExam';
import { FlashcardScreen } from '../components/FlashcardScreen';
import { RegimentoInterno } from '../components/RegimentoInterno';
import { Settings } from '../components/Settings';
import { ProfileSelector } from '../components/ProfileSelector';
import { StudyPlanSettings } from '../components/StudyPlanSettings';

export type View = 
  | 'dashboard' 
  | 'difficulty' 
  | 'study' 
  | 'statistics' 
  | 'achievements' 
  | 'customization'
  | 'settings'
  | 'simulatedExam'
  | 'flashcards'
  | 'regimento'
  | 'profiles'
  | 'studyPlan';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'mix';

interface AppRoutesProps {
  currentView: View;
  selectedSubject: string;
  selectedDifficulty: Difficulty;
  dailyScore: number;
  totalQuestions: number;
  onStartQuiz: () => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBackToDashboard: () => void;
  onBackFromDifficulty: () => void;
  onOpenStatistics: () => void;
  onOpenAchievements: () => void;
  onOpenCustomization: () => void;
  onOpenSettings: () => void;
  onOpenSimulatedExam: () => void;
  onOpenFlashcards: () => void;
  onOpenRegimento: () => void;
  onOpenProfiles: () => void;
  onOpenStudyPlan: () => void;
}

export function AppRoutes({
  currentView,
  selectedSubject,
  selectedDifficulty,
  dailyScore,
  totalQuestions,
  onStartQuiz,
  onSelectDifficulty,
  onBackToDashboard,
  onBackFromDifficulty,
  onOpenStatistics,
  onOpenAchievements,
  onOpenCustomization,
  onOpenSettings,
  onOpenSimulatedExam,
  onOpenFlashcards,
  onOpenRegimento,
  onOpenProfiles,
  onOpenStudyPlan
}: AppRoutesProps) {
  
  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard
          dailyScore={dailyScore}
          totalQuestions={totalQuestions}
          onStartQuiz={onStartQuiz}
          onOpenStatistics={onOpenStatistics}
          onOpenAchievements={onOpenAchievements}
          onOpenCustomization={onOpenCustomization}
          onOpenSimulatedExam={onOpenSimulatedExam}
          onOpenFlashcards={onOpenFlashcards}
          onOpenRegimento={onOpenRegimento}
          onOpenSettings={onOpenSettings}
          onOpenProfiles={onOpenProfiles}
          onOpenStudyPlan={onOpenStudyPlan}
        />
      )}

      {currentView === 'difficulty' && (
        <DifficultySelector
          onSelectDifficulty={onSelectDifficulty}
          onBack={onBackFromDifficulty}
        />
      )}

      {currentView === 'study' && (
        <StudySession
          subject={selectedSubject}
          difficulty={selectedDifficulty}
          onBack={onBackToDashboard}
        />
      )}

      {currentView === 'statistics' && (
        <Statistics onBack={onBackToDashboard} />
      )}

      {currentView === 'achievements' && (
        <Achievements onBack={onBackToDashboard} />
      )}

      {currentView === 'customization' && (
        <Customization onBack={onBackToDashboard} />
      )}

      {currentView === 'settings' && (
        <Settings 
          onClose={onBackToDashboard}
          onOpenCustomization={onOpenCustomization}
          onOpenProfile={onOpenProfiles}
          onOpenStudyPlan={onOpenStudyPlan}
        />
      )}

      {currentView === 'simulatedExam' && (
        <SimulatedExam onBack={onBackToDashboard} />
      )}

      {currentView === 'flashcards' && (
        <FlashcardScreen onBack={onBackToDashboard} />
      )}

      {currentView === 'regimento' && (
        <RegimentoInterno onBack={onBackToDashboard} />
      )}

      {currentView === 'profiles' && (
        <ProfileSelector onBack={onBackToDashboard} />
      )}

      {currentView === 'studyPlan' && (
        <StudyPlanSettings onBack={onBackToDashboard} />
      )}
    </>
  );
}
