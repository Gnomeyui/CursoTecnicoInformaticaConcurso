import React from 'react';
import { Trophy, Target, TrendingUp, Settings, Award, BarChart3 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';

interface DashboardProps {
  dailyScore: number;
  totalQuestions: number;
  onStartQuiz: () => void;
  onOpenStatistics: () => void;
  onOpenAchievements: () => void;
  onOpenCustomization: () => void;
}

export function Dashboard({
  dailyScore,
  totalQuestions,
  onStartQuiz,
  onOpenStatistics,
  onOpenAchievements,
  onOpenCustomization,
}: DashboardProps) {
  const { xp, level, getLevelProgress } = useGame();
  const { detailedStats } = useStats();
  
  const progressPercentage = getLevelProgress();
  const accuracy = totalQuestions > 0 ? (dailyScore / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-screen p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">ALE-RR TOP 1</h1>
          <p className="text-gray-600 dark:text-gray-400">Técnico em Informática</p>
        </div>
        <button
          onClick={onOpenCustomization}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Settings className="size-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-3xl p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 mb-1">Nível Atual</p>
            <h2 className="text-4xl">{level}</h2>
          </div>
          <Trophy className="size-16 text-blue-100 opacity-50" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-blue-100">
            <span>Progresso para Nível {level + 1}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-3 bg-blue-400/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-blue-100">{xp} XP</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Daily Score */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Target className="size-5 text-green-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Hoje</p>
          </div>
          <p className="text-2xl mb-1">{dailyScore}/{totalQuestions}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {totalQuestions > 0 ? `${Math.round(accuracy)}% acerto` : 'Comece a estudar!'}
          </p>
        </div>

        {/* Streak */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-5 text-orange-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Sequência</p>
          </div>
          <p className="text-2xl mb-1">{detailedStats.currentStreak} dias</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Recorde: {detailedStats.longestStreak} dias
          </p>
        </div>

        {/* Total Questions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="size-5 text-purple-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
          <p className="text-2xl mb-1">{detailedStats.totalQuestionsAnswered}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">questões</p>
        </div>

        {/* Overall Accuracy */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Award className="size-5 text-yellow-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Precisão</p>
          </div>
          <p className="text-2xl mb-1">
            {detailedStats.totalQuestionsAnswered > 0 
              ? Math.round(detailedStats.overallAccuracy) 
              : 0}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">média geral</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <button
          onClick={onStartQuiz}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
        >
          <div className="text-left">
            <h3 className="text-xl mb-1">Iniciar Quiz</h3>
            <p className="text-sm text-blue-100">Responda questões do concurso</p>
          </div>
          <Trophy className="size-8" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenStatistics}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
          >
            <BarChart3 className="size-6 text-purple-500 mb-2" />
            <p className="text-sm">Estatísticas</p>
          </button>

          <button
            onClick={onOpenAchievements}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
          >
            <Award className="size-6 text-yellow-500 mb-2" />
            <p className="text-sm">Conquistas</p>
          </button>
        </div>
      </div>
    </div>
  );
}
