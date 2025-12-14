import React, { useState, useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { FlashcardScreen } from './components/FlashcardScreen';
import { StudySession } from './components/StudySession';
import { Statistics } from './components/Statistics';
import { Achievements } from './components/Achievements';
import { SimulatedExam } from './components/SimulatedExam';
import { Customization } from './components/Customization';
import { NotificationSettings } from './components/NotificationSettings';
import { RegimentoInterno } from './components/RegimentoInterno';
import { DifficultySelector, Difficulty } from './components/DifficultySelector';
import { ConfettiCelebration } from './components/ConfettiCelebration';
import { LevelUpCelebration } from './components/LevelUpCelebration';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider, useGame } from './context/GameContext';
import { StatsProvider } from './context/StatsContext';
import { NotificationProvider } from './context/NotificationContext';
import { CustomizationProvider } from './context/CustomizationContext';

function AppContent() {
  const { 
    showGloriaCelebration, 
    dismissGloriaCelebration,
    showLevelUpCelebration,
    dismissLevelUpCelebration,
    levelUpInfo
  } = useGame();
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'study-session' | 'flashcards' | 'settings' | 
    'statistics' | 'achievements' | 'simulated-exam' | 'customization' | 'notifications' | 'regimento' |
    'difficulty-selector'
  >('dashboard');
  const [error, setError] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mix');
  
  // 🔧 CORREÇÃO FINAL: useRef para evitar recriar listener em cada mudança de view
  const currentViewRef = React.useRef(currentView);
  currentViewRef.current = currentView;

  useEffect(() => {
    let listener: any;
    
    const setupListener = async () => {
      try {
        listener = await CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          // Usar ref em vez de closure do currentView
          if (currentViewRef.current !== 'dashboard') {
            setCurrentView('dashboard');
          } else {
            CapacitorApp.exitApp();
          }
        });
      } catch (error) {
        console.log('Back button listener not available');
      }
    };

    setupListener();

    return () => {
      if (listener && typeof listener.remove === 'function') {
        try {
          listener.remove();
        } catch (error) {
          console.log('Error removing listener');
        }
      }
    };
  }, []); // 🔧 Array vazio = roda só uma vez no mount

  const handleOpenRegimento = () => {
    setCurrentView('regimento');
  };

  const handleOpenCustomization = () => {
    setCurrentView('customization');
  };

  const handleOpenNotifications = () => {
    setCurrentView('notifications');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {currentView === 'dashboard' && (
          <Dashboard 
            onStartQuiz={() => setCurrentView('difficulty-selector')}
            onStartFlashcards={() => setCurrentView('flashcards')}
            onOpenSettings={() => setCurrentView('settings')}
            onOpenStatistics={() => setCurrentView('statistics')}
            onOpenAchievements={() => setCurrentView('achievements')}
            onOpenSimulatedExam={() => setCurrentView('simulated-exam')}
            onOpenRegimento={handleOpenRegimento}
            onOpenCustomization={handleOpenCustomization}
            onOpenNotifications={handleOpenNotifications}
          />
        )}
        {currentView === 'flashcards' && (
          <FlashcardScreen 
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        {currentView === 'settings' && (
          <Settings onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'study-session' && (
          <StudySession 
            onBack={() => setCurrentView('dashboard')}
            difficulty={selectedDifficulty}
          />
        )}
        {currentView === 'statistics' && (
          <Statistics onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'achievements' && (
          <Achievements onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'simulated-exam' && (
          <SimulatedExam 
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        {currentView === 'customization' && (
          <Customization onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'notifications' && (
          <NotificationSettings onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'regimento' && (
          <RegimentoInterno onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'difficulty-selector' && (
          <DifficultySelector
            onSelectDifficulty={(diff) => {
              setSelectedDifficulty(diff);
              setCurrentView('study-session');
            }}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </div>
      
      {showGloriaCelebration && (
        <ConfettiCelebration
          show={showGloriaCelebration}
          onComplete={dismissGloriaCelebration}
          title="🏆 GLÓRIA! 🏆"
          message="Você completou todas as 2.000 questões do banco!"
          icon="👑"
        />
      )}
      
      {showLevelUpCelebration && levelUpInfo && (
        <LevelUpCelebration
          show={showLevelUpCelebration}
          onComplete={dismissLevelUpCelebration}
          oldLevel={levelUpInfo.oldLevel}
          newLevel={levelUpInfo.newLevel}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CustomizationProvider>
        <GameProvider>
          <StatsProvider>
            <NotificationProvider>
              <AppContent />
            </NotificationProvider>
          </StatsProvider>
        </GameProvider>
      </CustomizationProvider>
    </ThemeProvider>
  );
}