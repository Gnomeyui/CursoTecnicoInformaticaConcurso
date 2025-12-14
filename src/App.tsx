import React, { useState, useEffect } from 'react';
import { QuizScreen } from './components/QuizScreen';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { FlashcardScreen } from './components/FlashcardScreen';
import { StudySession } from './components/StudySession';
import { Statistics } from './components/Statistics';
import { Achievements } from './components/Achievements';
import { SimulatedExam } from './components/SimulatedExam';
import { Customization } from './components/Customization';
import { NotificationSettings } from './components/NotificationSettings';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameContext';
import { StatsProvider } from './context/StatsContext';
import { NotificationProvider } from './context/NotificationContext';
import { CustomizationProvider } from './context/CustomizationContext';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'quiz' | 'study-session' | 'flashcards' | 'settings' | 
    'statistics' | 'achievements' | 'simulated-exam' | 'customization' | 'notifications'
  >('dashboard');
  const [dailyScore, setDailyScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      loadProgress();
    } catch (err) {
      console.error('Erro ao carregar progresso:', err);
      setError('Erro ao carregar dados. Tentando novamente...');
      // Tentar limpar localStorage corrompido
      try {
        localStorage.removeItem('alerr_progress');
        saveProgress(0, 0);
        setError(null);
      } catch (clearErr) {
        console.error('Erro ao limpar localStorage:', clearErr);
      }
    }
  }, []);

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('alerr_progress');
      if (saved) {
        const data = JSON.parse(saved);
        const today = new Date().toLocaleDateString();
        if (data.date === today) {
          setDailyScore(data.score || 0);
          setTotalQuestions(data.total || 0);
        } else {
          saveProgress(0, 0);
        }
      }
    } catch (err) {
      console.error('Erro em loadProgress:', err);
      throw err;
    }
  };

  const saveProgress = (score: number, total: number) => {
    try {
      const today = new Date().toLocaleDateString();
      localStorage.setItem('alerr_progress', JSON.stringify({ score, total, date: today }));
      setDailyScore(score);
      setTotalQuestions(total);
    } catch (err) {
      console.error('Erro ao salvar progresso:', err);
    }
  };

  // Tela de erro caso algo quebre
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

  return (
    <ThemeProvider>
      <CustomizationProvider>
        <GameProvider>
          <StatsProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                {currentView === 'dashboard' && (
                  <Dashboard 
                    dailyScore={dailyScore} 
                    totalQuestions={totalQuestions}
                    onStartQuiz={() => setCurrentView('study-session')}
                    onStartFlashcards={() => setCurrentView('flashcards')}
                    onOpenSettings={() => setCurrentView('settings')}
                    onOpenStatistics={() => setCurrentView('statistics')}
                    onOpenAchievements={() => setCurrentView('achievements')}
                    onOpenSimulatedExam={() => setCurrentView('simulated-exam')}
                  />
                )}
                {currentView === 'quiz' && (
                  <QuizScreen 
                    onBack={() => setCurrentView('dashboard')}
                    dailyScore={dailyScore}
                    onScoreUpdate={saveProgress}
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
                    onScoreUpdate={saveProgress}
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
              </div>
            </NotificationProvider>
          </StatsProvider>
        </GameProvider>
      </CustomizationProvider>
    </ThemeProvider>
  );
}