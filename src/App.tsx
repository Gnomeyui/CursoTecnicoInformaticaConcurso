import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { StudySession } from './components/StudySession';
import { Statistics } from './components/Statistics';
import { Achievements } from './components/Achievements';
import { Customization } from './components/Customization';
import { DifficultySelector } from './components/DifficultySelector';
import { ConfettiCelebration } from './components/ConfettiCelebration';
import { LevelUpCelebration } from './components/LevelUpCelebration';
import { SimulatedExam } from './components/SimulatedExam';
import { FlashcardScreen } from './components/FlashcardScreen';
import { RegimentoInterno } from './components/RegimentoInterno';
import { Settings } from './components/Settings';
import { ProfileSelector } from './components/ProfileSelector';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { GameProvider, useGame } from './context/GameContext';
import { StatsProvider, useStats } from './context/StatsContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { NotificationProvider } from './context/NotificationContext';
import { WrongQuestionsProvider } from './context/WrongQuestionsContext';
import { ConcursoProfileProvider } from './context/ConcursoProfileContext';
import { SmartNotificationProvider } from './context/SmartNotificationContext';

type View = 
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
  | 'profiles';

type Difficulty = 'easy' | 'medium' | 'hard' | 'mix';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mix');
  const [dailyScore, setDailyScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  const { showLevelUpCelebration, dismissLevelUpCelebration, levelUpInfo, showGloriaCelebration, dismissGloriaCelebration } = useGame();
  const { getTodayStats } = useStats();
  const { isDarkMode, currentTheme } = useTheme();

  // Carregar estatísticas do dia
  useEffect(() => {
    const todayStats = getTodayStats();
    setDailyScore(todayStats.correctAnswers);
    setTotalQuestions(todayStats.questionsAnswered);
  }, [getTodayStats]);

  // Atualizar cor da status bar com o tema
  useEffect(() => {
    const updateStatusBar = async () => {
      if (typeof window !== 'undefined' && 'StatusBar' in window) {
        const StatusBar = (window as any).StatusBar;
        
        // Mapa de cores para cada tema
        const themeColors: Record<string, { light: string; dark: string }> = {
          default: { light: '#f8fafc', dark: '#0f172a' },
          modern: { light: '#f9fafb', dark: '#030712' },
          reading: { light: '#f5f5f4', dark: '#1c1917' },
          focus: { light: '#ffffff', dark: '#000000' },
          calm: { light: '#f0fdfa', dark: '#042f2e' },
          forest: { light: '#f8fafc', dark: '#0f172a' },
          ocean: { light: '#f8fafc', dark: '#0f172a' },
          sunset: { light: '#f8fafc', dark: '#0f172a' },
          purple: { light: '#f8fafc', dark: '#0f172a' },
        };
        
        const color = isDarkMode 
          ? themeColors[currentTheme]?.dark || '#0f172a'
          : themeColors[currentTheme]?.light || '#ffffff';
        
        if (isDarkMode) {
          StatusBar?.setStyle('dark-content');
        } else {
          StatusBar?.setStyle('light-content');
        }
        
        StatusBar?.setBackgroundColor(color);
      }
    };
    
    updateStatusBar();
  }, [isDarkMode, currentTheme]);

  const handleStartQuiz = () => {
    setSelectedSubject('all'); // Todas as matérias por padrão
    setCurrentView('difficulty');
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentView('study');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSubject('');
    setSelectedDifficulty('mix');
    
    // Recarregar estatísticas
    const todayStats = getTodayStats();
    setDailyScore(todayStats.correctAnswers);
    setTotalQuestions(todayStats.questionsAnswered);
  };

  const handleBackFromDifficulty = () => {
    setCurrentView('dashboard');
    setSelectedSubject('');
  };

  const handleOpenStatistics = () => {
    setCurrentView('statistics');
  };

  const handleOpenAchievements = () => {
    setCurrentView('achievements');
  };

  const handleOpenCustomization = () => {
    setCurrentView('customization');
  };

  const handleOpenSettings = () => {
    setCurrentView('settings');
  };

  const handleOpenSimulatedExam = () => {
    setCurrentView('simulatedExam');
  };

  const handleOpenFlashcards = () => {
    setCurrentView('flashcards');
  };

  const handleOpenRegimento = () => {
    setCurrentView('regimento');
  };

  const handleOpenProfiles = () => {
    setCurrentView('profiles');
  };

  return (
    <div className="min-h-screen bg-app text-app transition-colors duration-300">
      {/* Renderização condicional baseada na view atual */}
      {currentView === 'dashboard' && (
        <Dashboard
          dailyScore={dailyScore}
          totalQuestions={totalQuestions}
          onStartQuiz={handleStartQuiz}
          onOpenStatistics={handleOpenStatistics}
          onOpenAchievements={handleOpenAchievements}
          onOpenCustomization={handleOpenCustomization}
          onOpenSimulatedExam={handleOpenSimulatedExam}
          onOpenFlashcards={handleOpenFlashcards}
          onOpenRegimento={handleOpenRegimento}
          onOpenSettings={handleOpenSettings}
          onOpenProfiles={handleOpenProfiles}
        />
      )}

      {currentView === 'difficulty' && (
        <DifficultySelector
          onSelectDifficulty={handleSelectDifficulty}
          onBack={handleBackFromDifficulty}
        />
      )}

      {currentView === 'study' && (
        <StudySession
          subject={selectedSubject}
          difficulty={selectedDifficulty}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'statistics' && (
        <Statistics onBack={handleBackToDashboard} />
      )}

      {currentView === 'achievements' && (
        <Achievements onBack={handleBackToDashboard} />
      )}

      {currentView === 'customization' && (
        <Customization onBack={handleBackToDashboard} />
      )}

      {currentView === 'settings' && (
        <Settings onBack={handleBackToDashboard} />
      )}

      {currentView === 'simulatedExam' && (
        <SimulatedExam onBack={handleBackToDashboard} />
      )}

      {currentView === 'flashcards' && (
        <FlashcardScreen onBack={handleBackToDashboard} />
      )}

      {currentView === 'regimento' && (
        <RegimentoInterno onBack={handleBackToDashboard} />
      )}

      {currentView === 'profiles' && (
        <ProfileSelector onBack={handleBackToDashboard} />
      )}

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
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <StatsProvider>
          <CustomizationProvider>
            <NotificationProvider>
              <WrongQuestionsProvider>
                <ConcursoProfileProvider>
                  <SmartNotificationProvider>
                    <AppContent />
                  </SmartNotificationProvider>
                </ConcursoProfileProvider>
              </WrongQuestionsProvider>
            </NotificationProvider>
          </CustomizationProvider>
        </StatsProvider>
      </GameProvider>
    </ThemeProvider>
  );
}