import React from 'react';
import { ArrowLeft, Trophy, Target, Flame, Star, Award, Zap, Crown } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';

interface AchievementsProps {
  onBack: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  requirement: (stats: any, game: any) => boolean;
  progress?: (stats: any, game: any) => { current: number; total: number };
}

export function Achievements({ onBack }: AchievementsProps) {
  const { xp, level } = useGame();
  const { detailedStats } = useStats();

  const achievements: Achievement[] = [
    {
      id: 'first_steps',
      title: 'Primeiros Passos',
      description: 'Responda sua primeira questão',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 1,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 1), total: 1 }),
    },
    {
      id: 'rookie',
      title: 'Novato',
      description: 'Responda 50 questões',
      icon: Target,
      color: 'from-green-500 to-green-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 50,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 50), total: 50 }),
    },
    {
      id: 'student',
      title: 'Estudante',
      description: 'Responda 200 questões',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 200,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 200), total: 200 }),
    },
    {
      id: 'expert',
      title: 'Especialista',
      description: 'Responda 500 questões',
      icon: Trophy,
      color: 'from-purple-500 to-purple-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 500,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 500), total: 500 }),
    },
    {
      id: 'master',
      title: 'Mestre',
      description: 'Responda 1000 questões',
      icon: Crown,
      color: 'from-red-500 to-red-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 1000,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 1000), total: 1000 }),
    },
    {
      id: 'accurate',
      title: 'Precisão Perfeita',
      description: 'Alcance 90% de precisão geral',
      icon: Target,
      color: 'from-emerald-500 to-emerald-600',
      requirement: (stats) => stats.overallAccuracy >= 90,
      progress: (stats) => ({ current: Math.min(Math.round(stats.overallAccuracy), 90), total: 90 }),
    },
    {
      id: 'streak_7',
      title: 'Dedicação',
      description: 'Mantenha 7 dias de sequência',
      icon: Flame,
      color: 'from-orange-500 to-orange-600',
      requirement: (stats) => stats.currentStreak >= 7,
      progress: (stats) => ({ current: Math.min(stats.currentStreak, 7), total: 7 }),
    },
    {
      id: 'streak_30',
      title: 'Disciplina Total',
      description: 'Mantenha 30 dias de sequência',
      icon: Flame,
      color: 'from-red-500 to-red-600',
      requirement: (stats) => stats.longestStreak >= 30,
      progress: (stats) => ({ current: Math.min(stats.longestStreak, 30), total: 30 }),
    },
    {
      id: 'level_10',
      title: 'Em Ascensão',
      description: 'Alcance o nível 10',
      icon: Zap,
      color: 'from-cyan-500 to-cyan-600',
      requirement: (stats, game) => game.level >= 10,
      progress: (stats, game) => ({ current: Math.min(game.level, 10), total: 10 }),
    },
    {
      id: 'level_25',
      title: 'Veterano',
      description: 'Alcance o nível 25',
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600',
      requirement: (stats, game) => game.level >= 25,
      progress: (stats, game) => ({ current: Math.min(game.level, 25), total: 25 }),
    },
    {
      id: 'level_50',
      title: 'Lenda Viva',
      description: 'Alcance o nível 50',
      icon: Crown,
      color: 'from-pink-500 to-pink-600',
      requirement: (stats, game) => game.level >= 50,
      progress: (stats, game) => ({ current: Math.min(game.level, 50), total: 50 }),
    },
    {
      id: 'all_subjects',
      title: 'Polímata',
      description: 'Responda questões de todas as 5 matérias',
      icon: Award,
      color: 'from-violet-500 to-violet-600',
      requirement: (stats) => stats.subjectStats.length >= 5,
      progress: (stats) => ({ current: stats.subjectStats.length, total: 5 }),
    },
  ];

  const unlockedAchievements = achievements.filter(ach => 
    ach.requirement(detailedStats, { level, xp })
  );

  const lockedAchievements = achievements.filter(ach => 
    !ach.requirement(detailedStats, { level, xp })
  );

  return (
    <div className="min-h-screen p-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6" />
        </button>
        <div>
          <h1 className="text-2xl">Conquistas</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {unlockedAchievements.length} de {achievements.length} desbloqueadas
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progresso Geral</span>
          <span className="text-lg">
            {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
          </span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Trophy className="size-6 text-yellow-500" />
            Desbloqueadas
          </h2>
          <div className="space-y-3">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} flex-shrink-0`}>
                    <achievement.icon className="size-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-full" />
                      </div>
                      <span className="text-xs text-green-500">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Target className="size-6 text-gray-500" />
            Bloqueadas
          </h2>
          <div className="space-y-3">
            {lockedAchievements.map((achievement) => {
              const progress = achievement.progress 
                ? achievement.progress(detailedStats, { level, xp })
                : null;
              const progressPercentage = progress 
                ? (progress.current / progress.total) * 100 
                : 0;

              return (
                <div
                  key={achievement.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md opacity-60"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      <achievement.icon className="size-8 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                      {progress && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {progress.current}/{progress.total}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
