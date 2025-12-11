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

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const saved = localStorage.getItem('alerr_progress');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toLocaleDateString();
      if (data.date === today) {
        setDailyScore(data.score);
        setTotalQuestions(data.total);
      } else {
        saveProgress(0, 0);
      }
    }
  };

  const saveProgress = (score: number, total: number) => {
    const today = new Date().toLocaleDateString();
    localStorage.setItem('alerr_progress', JSON.stringify({ score, total, date: today }));
    setDailyScore(score);
    setTotalQuestions(total);
  };

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