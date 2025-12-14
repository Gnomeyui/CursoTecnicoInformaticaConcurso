import React, { useEffect } from 'react';
import { ArrowLeft, Trophy, Lock, Star, Zap, Target } from 'lucide-react';
import { useGame, getXPForLevel } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { ALL_BADGES } from '../data/badges';

interface AchievementsProps {
  onBack: () => void;
}

export function Achievements({ onBack }: AchievementsProps) {
  const { gameStats, markBadgesAsViewed } = useGame();
  const { isDarkMode } = useTheme();
  
  // 🔔 Marcar badges como visualizadas quando o componente é montado
  useEffect(() => {
    markBadgesAsViewed();
  }, []);

  const unlockedBadgeIds = gameStats.badges.map(b => b.id);
  const unlockedCount = gameStats.badges.length;
  const totalCount = ALL_BADGES.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Agrupar badges por categoria
  const categories = ['Iniciante', 'Dedicação', 'Volume', 'Desempenho', 'Progressão', 'Consistência', 'Elite'];

  // XP necessário para próximo nível
  const xpForNextLevel = getXPForLevel(gameStats.level);
  const currentLevelTotalXP = gameStats.level > 1 
    ? Array.from({ length: gameStats.level - 1 }).reduce((sum, _, i) => sum + getXPForLevel(i + 1), 0)
    : 0;
  const xpInCurrentLevel = gameStats.xp - currentLevelTotalXP;
  const xpProgress = (xpInCurrentLevel / xpForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-slate-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-2xl text-slate-900 dark:text-white">Conquistas</h1>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                {unlockedCount} de {totalCount} desbloqueadas ({completionPercentage}%)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto space-y-6">
        {/* Card de Nível e XP */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl">Nível {gameStats.level}</div>
                <div className="text-sm text-purple-100">
                  {xpInCurrentLevel} / {xpForNextLevel} XP
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">{gameStats.xp}</div>
              <div className="text-sm text-purple-100">XP Total</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-purple-100 text-center">
            {Math.round(xpProgress)}% para o próximo nível
          </div>
        </div>

        {/* Stats Rápidas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
            <div className="text-3xl mb-1">🔥</div>
            <div className="text-2xl text-slate-900 dark:text-white">{gameStats.streak}</div>
            <div className="text-sm text-slate-600 dark:text-gray-400">Dias Seguidos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
            <div className="text-3xl mb-1">📚</div>
            <div className="text-2xl text-slate-900 dark:text-white">{gameStats.studyDays.length}</div>
            <div className="text-sm text-slate-600 dark:text-gray-400">Dias de Estudo</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
            <div className="text-3xl mb-1">🎯</div>
            <div className="text-2xl text-slate-900 dark:text-white">
              {gameStats.totalQuestionsAnswered > 0 
                ? Math.round((gameStats.totalCorrectAnswers / gameStats.totalQuestionsAnswered) * 100)
                : 0}%
            </div>
            <div className="text-sm text-slate-600 dark:text-gray-400">Taxa de Acerto</div>
          </div>
        </div>

        {/* Badges por Categoria */}
        {categories.map(category => {
          const categoryBadges = ALL_BADGES.filter(b => b.category === category);
          const unlockedInCategory = categoryBadges.filter(b => unlockedBadgeIds.includes(b.id)).length;

          return (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  {category}
                </h3>
                <span className="text-sm text-slate-600 dark:text-gray-400">
                  {unlockedInCategory}/{categoryBadges.length}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryBadges.map(badge => {
                  const isUnlocked = unlockedBadgeIds.includes(badge.id);
                  const unlockedBadge = gameStats.badges.find(b => b.id === badge.id);
                  
                  // 🏆 Badge especial GLÓRIA - 2000 QUESTÕES (maior destaque)
                  const isGloriaBadge = badge.id === 'legend_student'; // Badge de 2000 questões
                  const isGloriaTag = isUnlocked && isGloriaBadge;

                  return (
                    <div
                      key={badge.id}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        isUnlocked
                          ? isGloriaBadge
                            ? 'bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/40 dark:via-orange-900/40 dark:to-red-900/40 border-yellow-500 dark:border-yellow-400 shadow-2xl ring-4 ring-yellow-300 dark:ring-yellow-600 animate-pulse'
                            : 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400 dark:border-yellow-600 shadow-md'
                          : 'bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-gray-600 opacity-60'
                      }`}
                    >
                      {!isUnlocked && (
                        <div className="absolute top-2 right-2">
                          <Lock className="w-4 h-4 text-slate-400 dark:text-gray-500" />
                        </div>
                      )}
                      
                      {/* Selo especial GLÓRIA */}
                      {isUnlocked && isGloriaTag && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce">
                          ✨ ÉPICO
                        </div>
                      )}

                      <div className="text-center">
                        <div className={`${isGloriaTag ? 'text-5xl' : 'text-4xl'} mb-2 ${!isUnlocked && 'grayscale'}`}>
                          {badge.icon}
                        </div>
                        <div className={`${isGloriaTag ? 'text-base font-bold' : 'text-sm'} text-slate-900 dark:text-white mb-1`}>
                          {badge.name}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-gray-400 mb-2">
                          {badge.description}
                        </div>

                        {isUnlocked && unlockedBadge?.unlockedAt && (
                          <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                            <Zap className="w-3 h-3" />
                            {new Date(unlockedBadge.unlockedAt).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Dica de Progresso */}
        {unlockedCount < totalCount && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm text-blue-900 dark:text-blue-200 mb-1">
                  Próxima Conquista
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Continue estudando para desbloquear mais badges! Cada conquista te dá XP extra e mostra seu progresso rumo ao TOP 1.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tudo Desbloqueado */}
        {unlockedCount === totalCount && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-center text-white shadow-lg">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-2xl mb-2">Parabéns!</h3>
            <p className="text-yellow-100">
              Você desbloqueou todas as conquistas! Você está pronto para o TOP 1 da ALE-RR! 🏆
            </p>
          </div>
        )}
      </div>
    </div>
  );
}