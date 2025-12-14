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
  const [dailyScore, setDailyScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mix');

  useEffect(() => {
    let listener: any;
    
    const setupListener = async () => {
      try {
        listener = await CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          if (currentView !== 'dashboard') {
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
  }, [currentView]);

  useEffect(() => {
    try {
      loadProgress();
    } catch (err) {
      console.error('Error loading progress:', err);
      setError('Error loading data. Trying again...');
      try {
        const corrupted = localStorage.getItem('alerr_progress');
        if (corrupted) {
          localStorage.setItem('alerr_progress_corrupted_backup', corrupted);
          localStorage.removeItem('alerr_progress');
        }
        saveProgress(0, 0);
        setError(null);
      } catch (clearErr) {
        console.error('Error clearing localStorage:', clearErr);
      }
    }
  }, []);

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('alerr_progress');
      if (saved) {
        const data = JSON.parse(saved);
        const today = new Date().toISOString().split('T')[0];
        if (data.date === today) {
          setDailyScore(data.score || 0);
          setTotalQuestions(data.total || 0);
        } else {
          saveProgress(0, 0);
        }
      }
    } catch (err) {
      console.error('Error in loadProgress:', err);
      throw err;
    }
  };

  const saveProgress = (score: number, total: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('alerr_progress', JSON.stringify({ score, total, date: today }));
      setDailyScore(score);
      setTotalQuestions(total);
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Erro ao Iniciar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Recarregar App
          </button>
        </div>
      </div>
    );
  }

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
            dailyScore={dailyScore} 
            totalQuestions={totalQuestions}
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
            dailyScore={dailyScore}
            onScoreUpdate={saveProgress}
          />
        )}
        {currentView === 'settings' && (
          <Settings onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'study-session' && (
          <StudySession 
            onBack={() => setCurrentView('dashboard')}
            dailyScore={dailyScore}
            totalQuestions={totalQuestions}
            onScoreUpdate={saveProgress}
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
            onComplete={saveProgress}
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