import React, { useEffect } from 'react';
import { ArrowLeft, Trophy, Lock, Star, Zap, Target } from 'lucide-react';
import { useGame, getXPForLevel } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';

interface AchievementsProps {
  onBack: () => void;
}

// Todos os badges disponíveis
const ALL_BADGES = [
  {
    id: 'first_question',
    name: 'Primeira Questão',
    description: 'Respondeu sua primeira questão',
    icon: '🎯',
    target: 1,
    category: 'Iniciante'
  },
  {
    id: 'streak_7',
    name: 'Semana Completa',
    description: 'Estudou por 7 dias seguidos',
    icon: '🔥',
    target: 7,
    category: 'Dedicação'
  },
  {
    id: 'streak_30',
    name: 'Mês Dedicado',
    description: 'Estudou por 30 dias seguidos',
    icon: '💪',
    target: 30,
    category: 'Dedicação'
  },
  {
    id: 'questions_100',
    name: 'Centurião',
    description: 'Respondeu 100 questões',
    icon: '💯',
    target: 100,
    category: 'Volume'
  },
  {
    id: 'questions_500',
    name: 'Maratonista',
    description: 'Respondeu 500 questões',
    icon: '🏃',
    target: 500,
    category: 'Volume'
  },
  {
    id: 'questions_1000',
    name: 'Mestre',
    description: 'Respondeu 1000 questões',
    icon: '🎓',
    target: 1000,
    category: 'Volume'
  },
  {
    id: 'accuracy_80',
    name: 'Precisão',
    description: 'Manteve 80% de acerto em 50 questões',
    icon: '🎯',
    target: 50,
    category: 'Desempenho'
  },
  {
    id: 'level_5',
    name: 'Nível 5',
    description: 'Alcançou o nível 5',
    icon: '⭐',
    target: 5,
    category: 'Progressão'
  },
  {
    id: 'level_10',
    name: 'Nível 10',
    description: 'Alcançou o nível 10',
    icon: '🌟',
    target: 10,
    category: 'Progressão'
  },
  {
    id: 'level_20',
    name: 'Nível 20',
    description: 'Alcançou o nível 20',
    icon: '✨',
    target: 20,
    category: 'Progressão'
  },
  {
    id: 'study_days_30',
    name: '30 Dias de Estudo',
    description: 'Estudou em 30 dias diferentes',
    icon: '📚',
    target: 30,
    category: 'Consistência'
  },
  {
    id: 'study_days_60',
    name: '60 Dias de Estudo',
    description: 'Estudou em 60 dias diferentes',
    icon: '📖',
    target: 60,
    category: 'Consistência'
  },
  {
    id: 'top1_ready',
    name: 'Pronto para o TOP 1',
    description: 'Completou 1000 questões com 85% de acerto',
    icon: '🏆',
    target: 1000,
    category: 'Elite'
  },
  
  // === NOVAS CONQUISTAS (30) ===
  
  // CATEGORIA: Iniciante (3)
  {
    id: 'first_session',
    name: 'Primeira Jornada',
    description: 'Completou sua primeira sessão de estudos',
    icon: '🚀',
    target: 1,
    category: 'Iniciante'
  },
  {
    id: 'first_flashcard',
    name: 'Memória Ativa',
    description: 'Revisou seu primeiro flashcard',
    icon: '🧠',
    target: 1,
    category: 'Iniciante'
  },
  {
    id: 'questions_10',
    name: 'Aquecimento',
    description: 'Respondeu 10 questões',
    icon: '🎯',
    target: 10,
    category: 'Iniciante'
  },
  
  // CATEGORIA: Volume (5)
  {
    id: 'questions_250',
    name: 'Persistente',
    description: 'Respondeu 250 questões',
    icon: '💪',
    target: 250,
    category: 'Volume'
  },
  {
    id: 'questions_1500',
    name: 'Imparável',
    description: 'Respondeu 1.500 questões',
    icon: '⚡',
    target: 1500,
    category: 'Volume'
  },
  {
    id: 'questions_2000',
    name: 'GLÓRIA - 2000 QUESTÕES',
    description: 'COMPLETOU TODAS AS 2.000 QUESTÕES DO BANCO! 🎉',
    icon: '👑',
    target: 2000,
    category: 'Elite'
  },
  {
    id: 'daily_20',
    name: 'Ritmo Forte',
    description: 'Respondeu 20 questões em um único dia',
    icon: '🔥',
    target: 20,
    category: 'Volume'
  },
  {
    id: 'daily_50',
    name: 'Maratona Diária',
    description: 'Respondeu 50 questões em um único dia',
    icon: '🏃‍♂️',
    target: 50,
    category: 'Volume'
  },
  
  // CATEGORIA: Desempenho (5)
  {
    id: 'accuracy_90',
    name: 'Precisão Cirúrgica',
    description: 'Manteve 90% de acerto em 100 questões',
    icon: '🎯',
    target: 100,
    category: 'Desempenho'
  },
  {
    id: 'accuracy_95',
    name: 'Quase Perfeito',
    description: 'Manteve 95% de acerto em 50 questões',
    icon: '💎',
    target: 50,
    category: 'Desempenho'
  },
  {
    id: 'perfect_session',
    name: 'Sessão Perfeita',
    description: 'Acertou 100% das questões em uma sessão (mín. 10)',
    icon: '🌟',
    target: 10,
    category: 'Desempenho'
  },
  {
    id: 'comeback_master',
    name: 'Virada de Jogo',
    description: 'Acertou 10 questões seguidas após errar',
    icon: '🔄',
    target: 10,
    category: 'Desempenho'
  },
  {
    id: 'first_place',
    name: 'Ouro na Prova',
    description: 'Acertou 95% no modo Simulado',
    icon: '🥇',
    target: 1,
    category: 'Desempenho'
  },
  
  // CATEGORIA: Progressão (5)
  {
    id: 'level_15',
    name: 'Nível 15',
    description: 'Alcançou o nível 15',
    icon: '💫',
    target: 15,
    category: 'Progressão'
  },
  {
    id: 'level_30',
    name: 'Nível 30',
    description: 'Alcançou o nível 30',
    icon: '🌠',
    target: 30,
    category: 'Progressão'
  },
  {
    id: 'level_50',
    name: 'Nível 50 - LENDÁRIO',
    description: 'Alcançou o lendário nível 50',
    icon: '👑',
    target: 50,
    category: 'Progressão'
  },
  {
    id: 'xp_5000',
    name: 'Acumulador',
    description: 'Acumulou 5.000 XP',
    icon: '💰',
    target: 5000,
    category: 'Progressão'
  },
  {
    id: 'xp_10000',
    name: 'Milionário do Conhecimento',
    description: 'Acumulou 10.000 XP',
    icon: '💸',
    target: 10000,
    category: 'Progressão'
  },
  
  // CATEGORIA: Dedicação (5)
  {
    id: 'streak_3',
    name: 'Pegou o Ritmo',
    description: 'Estudou por 3 dias seguidos',
    icon: '🔥',
    target: 3,
    category: 'Dedicação'
  },
  {
    id: 'streak_14',
    name: 'Duas Semanas Firme',
    description: 'Estudou por 14 dias seguidos',
    icon: '🔥',
    target: 14,
    category: 'Dedicação'
  },
  {
    id: 'streak_60',
    name: 'Inabalável',
    description: 'Estudou por 60 dias seguidos',
    icon: '💎',
    target: 60,
    category: 'Dedicação'
  },
  {
    id: 'streak_100',
    name: 'APROVAÇÃO GARANTIDA',
    description: 'Estudou por 100 dias seguidos!',
    icon: '👑',
    target: 100,
    category: 'Dedicação'
  },
  {
    id: 'night_owl',
    name: 'Coruja da Madrugada',
    description: 'Estudou depois da meia-noite (00h-06h)',
    icon: '🦉',
    target: 1,
    category: 'Dedicação'
  },
  
  // CATEGORIA: Consistência (4)
  {
    id: 'study_days_90',
    name: '90 Dias de Estudo',
    description: 'Estudou em 90 dias diferentes',
    icon: '📚',
    target: 90,
    category: 'Consistência'
  },
  {
    id: 'study_days_120',
    name: '4 Meses Completos',
    description: 'Estudou em 120 dias diferentes',
    icon: '📖',
    target: 120,
    category: 'Consistência'
  },
  {
    id: 'morning_warrior',
    name: 'Guerreiro Matinal',
    description: 'Estudou 10 vezes antes das 8h da manhã',
    icon: '☀️',
    target: 10,
    category: 'Consistência'
  },
  {
    id: 'weekend_hero',
    name: 'Herói de Fim de Semana',
    description: 'Estudou em 10 sábados ou domingos',
    icon: '🦸',
    target: 10,
    category: 'Consistência'
  },
  
  // CATEGORIA: Elite (3)
  {
    id: 'specialist_mainframe',
    name: 'Especialista Mainframe',
    description: 'Acertou 50 questões de Mainframe',
    icon: '🖥️',
    target: 50,
    category: 'Elite'
  },
  {
    id: 'security_master',
    name: 'Guardião da Segurança',
    description: 'Acertou 100 questões de Segurança da Informação',
    icon: '🛡️',
    target: 100,
    category: 'Elite'
  },
  {
    id: 'ale_rr_legend',
    name: 'LENDA DA ALE-RR',
    description: 'Completou 1.800 questões com 90% de acerto',
    icon: '🏆',
    target: 1800,
    category: 'Elite'
  }
];

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
                  const isGloriaBadge = badge.id === 'questions_2000';
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