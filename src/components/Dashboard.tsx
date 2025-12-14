import React from 'react';
import { 
  Trophy, Target, Flame, BookOpen, Settings as SettingsIcon,
  TrendingUp, Award, Zap, Brain, Layers, Moon, Sun, BarChart3, 
  Clock, Palette, Bell, FileText
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';

interface DashboardProps {
  dailyScore: number;
  totalQuestions: number;
  onStartQuiz: () => void;
  onStartFlashcards: () => void;
  onOpenSettings: () => void;
  onOpenStatistics: () => void;
  onOpenAchievements: () => void;
  onOpenSimulatedExam: () => void;
  onOpenRegimento: () => void;
  onOpenCustomization: () => void;
  onOpenNotifications: () => void;
}

export function Dashboard({ 
  dailyScore, 
  totalQuestions, 
  onStartQuiz, 
  onStartFlashcards, 
  onOpenSettings,
  onOpenStatistics,
  onOpenAchievements,
  onOpenSimulatedExam,
  onOpenRegimento,
  onOpenCustomization,
  onOpenNotifications
}: DashboardProps) {
  const accuracy = totalQuestions > 0 ? Math.round((dailyScore / totalQuestions) * 100) : 0;
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { gameStats, markBadgesAsViewed, getNewBadgesCount } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Header - Mobile Optimized */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-slate-200 dark:border-gray-700 transition-colors duration-200">
        <div className="px-3 sm:px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl text-slate-900 dark:text-white transition-colors duration-200">ALE-RR TOP 1</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mt-1 transition-colors duration-200">
                Técnico em Informática · Nível {gameStats.level}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                )}
              </button>
              {/* Settings Button */}
              <button 
                onClick={onOpenSettings}
                className="p-2 sm:p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
              >
                <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-6xl mx-auto">
        {/* Stats Cards - Mobile Stacked */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-3 sm:p-5 md:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
              <Trophy className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-200" />
            </div>
            <div className="text-xl sm:text-3xl md:text-4xl mb-1">{dailyScore}</div>
            <div className="text-[10px] sm:text-sm md:text-base text-emerald-100">Pontos Hoje</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 sm:p-5 md:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
              <Target className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-200" />
            </div>
            <div className="text-xl sm:text-3xl md:text-4xl mb-1">{accuracy}%</div>
            <div className="text-[10px] sm:text-sm md:text-base text-blue-100">Taxa de Acerto</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-3 sm:p-5 md:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
              <Award className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-200" />
            </div>
            <div className="text-xl sm:text-3xl md:text-4xl mb-1">{totalQuestions}</div>
            <div className="text-[10px] sm:text-sm md:text-base text-purple-100">Questões Respondidas</div>
          </div>
        </div>

        {/* Sequência e Nível */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div 
            onClick={onOpenAchievements}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-8 h-8" />
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-2xl sm:text-3xl mb-1">{gameStats.streak} dias</div>
            <div className="text-xs sm:text-sm text-orange-100">Sequência</div>
          </div>

          <div 
            onClick={onOpenAchievements}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8" />
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-2xl sm:text-3xl mb-1">Nível {gameStats.level}</div>
            <div className="text-xs sm:text-sm text-indigo-100">{gameStats.xp} XP</div>
          </div>
        </div>

        {/* Mode Selection - Two Big Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={onStartQuiz}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all active:scale-[0.98] touch-manipulation border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 p-4 sm:p-5 rounded-full">
                <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h2 className="text-lg sm:text-xl text-slate-900 dark:text-white mb-1 sm:mb-2">
              Quiz Interativo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400">
              Questões de múltipla escolha com explicações
            </p>
          </button>

          <button
            onClick={onStartFlashcards}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all active:scale-[0.98] touch-manipulation border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 sm:p-5 rounded-full">
                <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h2 className="text-lg sm:text-xl text-slate-900 dark:text-white mb-1 sm:mb-2">
              Flashcards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400">
              Memorize artigos do Regimento Interno
            </p>
          </button>
        </div>

        {/* Novas Funcionalidades - Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={onOpenStatistics}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-gray-700 text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-sm text-slate-900 dark:text-white mb-1">Estatísticas</div>
            <div className="text-xs text-slate-600 dark:text-gray-400">Gráficos e análises</div>
          </button>

          <button
            onClick={() => {
              onOpenAchievements(); // 🔔 Abre conquistas
              markBadgesAsViewed(); // 🔔 Marcar badges como visualizadas ao abrir
            }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-gray-700 text-center relative"
          >
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="text-sm text-slate-900 dark:text-white mb-1">Conquistas</div>
            <div className="text-xs text-slate-600 dark:text-gray-400">{gameStats.badges.length} badges desbloqueadas</div>
            {/* 🔔 Badge de notificação - só mostra se houver conquistas novas */}
            {getNewBadgesCount() > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center animate-pulse shadow-lg border-2 border-white dark:border-gray-800">
                {getNewBadgesCount()}
              </div>
            )}
          </button>

          <button
            onClick={onOpenSimulatedExam}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-gray-700 text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-sm text-slate-900 dark:text-white mb-1">Simulado</div>
            <div className="text-xs text-slate-600 dark:text-gray-400">Prova cronometrada</div>
          </button>

          <button
            onClick={onOpenRegimento}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-gray-700 text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="text-sm text-slate-900 dark:text-white mb-1">Regimento</div>
            <div className="text-xs text-slate-600 dark:text-gray-400">Texto completo ALE-RR</div>
          </button>

          <button
            onClick={onOpenCustomization}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-gray-700 text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-sm text-slate-900 dark:text-white mb-1">Personalizar</div>
            <div className="text-xs text-slate-600 dark:text-gray-400">Temas e cores</div>
          </button>

          <button
            onClick={onOpenNotifications}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-gray-700 text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Bell className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="text-sm text-slate-900 dark:text-white mb-1">Notificações</div>
            <div className="text-xs text-slate-600 dark:text-gray-400">Alertas e lembretes</div>
          </button>
        </div>
      </div>
    </div>
  );
}