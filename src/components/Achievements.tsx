import React from 'react';
import { ArrowLeft, Trophy, Target, Flame, Star, Award, Zap, Crown, BookOpen, Brain, Clock, TrendingUp, Shield, Rocket, Heart, Check, Medal, Users, Coffee, Moon, Sun, Calendar, Smile, ThumbsUp, Gift, Sparkles, Lightbulb, Battery, ChevronUp, Eye, Crosshair } from 'lucide-react';
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
    // INÍCIO - Primeiras conquistas
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
      id: 'questions_10',
      title: 'Aquecimento',
      description: 'Responda 10 questões',
      icon: BookOpen,
      color: 'from-sky-500 to-sky-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 10,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 10), total: 10 }),
    },
    {
      id: 'questions_25',
      title: 'Iniciante',
      description: 'Responda 25 questões',
      icon: Target,
      color: 'from-teal-500 to-teal-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 25,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 25), total: 25 }),
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
      id: 'questions_100',
      title: 'Centenário',
      description: 'Responda 100 questões',
      icon: Medal,
      color: 'from-lime-500 to-lime-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 100,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 100), total: 100 }),
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
      id: 'questions_350',
      title: 'Persistente',
      description: 'Responda 350 questões',
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 350,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 350), total: 350 }),
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
      id: 'questions_750',
      title: 'Determinado',
      description: 'Responda 750 questões',
      icon: Shield,
      color: 'from-fuchsia-500 to-fuchsia-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 750,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 750), total: 750 }),
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
      id: 'questions_1500',
      title: 'Incansável',
      description: 'Responda 1500 questões',
      icon: Rocket,
      color: 'from-rose-500 to-rose-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 1500,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 1500), total: 1500 }),
    },
    {
      id: 'questions_2000',
      title: 'Lenda',
      description: 'Responda 2000 questões',
      icon: Crown,
      color: 'from-pink-500 to-pink-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 2000,
      progress: (stats) => ({ current: Math.min(stats.totalQuestionsAnswered, 2000), total: 2000 }),
    },

    // PRECISÃO - Conquistas de acerto
    {
      id: 'accurate_50',
      title: 'Mira Certeira',
      description: 'Alcance 50% de precisão geral',
      icon: Crosshair,
      color: 'from-blue-400 to-blue-500',
      requirement: (stats) => stats.overallAccuracy >= 50,
      progress: (stats) => ({ current: Math.min(Math.round(stats.overallAccuracy), 50), total: 50 }),
    },
    {
      id: 'accurate_60',
      title: 'Bom Desempenho',
      description: 'Alcance 60% de precisão geral',
      icon: Target,
      color: 'from-cyan-500 to-cyan-600',
      requirement: (stats) => stats.overallAccuracy >= 60,
      progress: (stats) => ({ current: Math.min(Math.round(stats.overallAccuracy), 60), total: 60 }),
    },
    {
      id: 'accurate_70',
      title: 'Acima da Média',
      description: 'Alcance 70% de precisão geral',
      icon: TrendingUp,
      color: 'from-teal-500 to-teal-600',
      requirement: (stats) => stats.overallAccuracy >= 70,
      progress: (stats) => ({ current: Math.min(Math.round(stats.overallAccuracy), 70), total: 70 }),
    },
    {
      id: 'accurate_80',
      title: 'Excelente',
      description: 'Alcance 80% de precisão geral',
      icon: Award,
      color: 'from-green-500 to-green-600',
      requirement: (stats) => stats.overallAccuracy >= 80,
      progress: (stats) => ({ current: Math.min(Math.round(stats.overallAccuracy), 80), total: 80 }),
    },
    {
      id: 'accurate',
      title: 'Precisão Perfeita',
      description: 'Alcance 90% de precisão geral',
      icon: Eye,
      color: 'from-emerald-500 to-emerald-600',
      requirement: (stats) => stats.overallAccuracy >= 90,
      progress: (stats) => ({ current: Math.min(Math.round(stats.overallAccuracy), 90), total: 90 }),
    },
    {
      id: 'accurate_95',
      title: 'Mestre da Precisão',
      description: 'Alcance 95% de precisão geral',
      icon: Crown,
      color: 'from-yellow-500 to-yellow-600',
      requirement: (stats) => stats.overallAccuracy >= 95,
      progress: (stats) => ({ current: Math.min(Math.round(stats.overallAccuracy), 95), total: 95 }),
    },

    // SEQUÊNCIA - Conquistas de streak
    {
      id: 'streak_3',
      title: 'Começando Bem',
      description: 'Mantenha 3 dias de sequência',
      icon: Flame,
      color: 'from-yellow-400 to-yellow-500',
      requirement: (stats) => stats.currentStreak >= 3,
      progress: (stats) => ({ current: Math.min(stats.currentStreak, 3), total: 3 }),
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
      id: 'streak_14',
      title: 'Duas Semanas',
      description: 'Mantenha 14 dias de sequência',
      icon: Flame,
      color: 'from-red-400 to-red-500',
      requirement: (stats) => stats.longestStreak >= 14,
      progress: (stats) => ({ current: Math.min(stats.longestStreak, 14), total: 14 }),
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
      id: 'streak_60',
      title: 'Dois Meses Forte',
      description: 'Mantenha 60 dias de sequência',
      icon: Flame,
      color: 'from-red-600 to-red-700',
      requirement: (stats) => stats.longestStreak >= 60,
      progress: (stats) => ({ current: Math.min(stats.longestStreak, 60), total: 60 }),
    },
    {
      id: 'streak_100',
      title: 'Inabalável',
      description: 'Mantenha 100 dias de sequência',
      icon: Flame,
      color: 'from-red-700 to-red-800',
      requirement: (stats) => stats.longestStreak >= 100,
      progress: (stats) => ({ current: Math.min(stats.longestStreak, 100), total: 100 }),
    },

    // NÍVEIS - Conquistas de level
    {
      id: 'level_5',
      title: 'Nível 5',
      description: 'Alcance o nível 5',
      icon: Zap,
      color: 'from-blue-400 to-blue-500',
      requirement: (stats, game) => game.level >= 5,
      progress: (stats, game) => ({ current: Math.min(game.level, 5), total: 5 }),
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
      id: 'level_15',
      title: 'Progredindo',
      description: 'Alcance o nível 15',
      icon: ChevronUp,
      color: 'from-teal-500 to-teal-600',
      requirement: (stats, game) => game.level >= 15,
      progress: (stats, game) => ({ current: Math.min(game.level, 15), total: 15 }),
    },
    {
      id: 'level_20',
      title: 'Experiente',
      description: 'Alcance o nível 20',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      requirement: (stats, game) => game.level >= 20,
      progress: (stats, game) => ({ current: Math.min(game.level, 20), total: 20 }),
    },
    {
      id: 'level_25',
      title: 'Veterano',
      description: 'Alcance o nível 25',
      icon: Medal,
      color: 'from-indigo-500 to-indigo-600',
      requirement: (stats, game) => game.level >= 25,
      progress: (stats, game) => ({ current: Math.min(game.level, 25), total: 25 }),
    },
    {
      id: 'level_30',
      title: 'Elite',
      description: 'Alcance o nível 30',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      requirement: (stats, game) => game.level >= 30,
      progress: (stats, game) => ({ current: Math.min(game.level, 30), total: 30 }),
    },
    {
      id: 'level_40',
      title: 'Mestre Avançado',
      description: 'Alcance o nível 40',
      icon: Trophy,
      color: 'from-violet-500 to-violet-600',
      requirement: (stats, game) => game.level >= 40,
      progress: (stats, game) => ({ current: Math.min(game.level, 40), total: 40 }),
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

    // XP - Conquistas de experiência
    {
      id: 'xp_1000',
      title: 'Mil Pontos',
      description: 'Acumule 1000 XP',
      icon: Star,
      color: 'from-yellow-400 to-yellow-500',
      requirement: (stats, game) => game.xp >= 1000,
      progress: (stats, game) => ({ current: Math.min(game.xp, 1000), total: 1000 }),
    },
    {
      id: 'xp_5000',
      title: 'Colecionador de XP',
      description: 'Acumule 5000 XP',
      icon: Sparkles,
      color: 'from-amber-500 to-amber-600',
      requirement: (stats, game) => game.xp >= 5000,
      progress: (stats, game) => ({ current: Math.min(game.xp, 5000), total: 5000 }),
    },
    {
      id: 'xp_10000',
      title: 'Mestre do XP',
      description: 'Acumule 10000 XP',
      icon: Trophy,
      color: 'from-orange-500 to-orange-600',
      requirement: (stats, game) => game.xp >= 10000,
      progress: (stats, game) => ({ current: Math.min(game.xp, 10000), total: 10000 }),
    },

    // MATÉRIAS - Conquistas específicas
    {
      id: 'all_subjects',
      title: 'Polímata',
      description: 'Responda questões de todas as 5 matérias',
      icon: BookOpen,
      color: 'from-violet-500 to-violet-600',
      requirement: (stats) => stats.subjectStats.length >= 5,
      progress: (stats) => ({ current: stats.subjectStats.length, total: 5 }),
    },
    {
      id: 'subject_master_informatica',
      title: 'Mestre em Informática',
      description: 'Responda 100 questões de Informática',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      requirement: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Informática');
        return subject && subject.questionsAnswered >= 100;
      },
      progress: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Informática');
        return { current: subject ? Math.min(subject.questionsAnswered, 100) : 0, total: 100 };
      },
    },
    {
      id: 'subject_master_legislacao',
      title: 'Mestre em Legislação',
      description: 'Responda 100 questões de Legislação',
      icon: Shield,
      color: 'from-indigo-500 to-indigo-600',
      requirement: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Legislação');
        return subject && subject.questionsAnswered >= 100;
      },
      progress: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Legislação');
        return { current: subject ? Math.min(subject.questionsAnswered, 100) : 0, total: 100 };
      },
    },
    {
      id: 'subject_master_portugues',
      title: 'Mestre em Português',
      description: 'Responda 100 questões de Português',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      requirement: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Português');
        return subject && subject.questionsAnswered >= 100;
      },
      progress: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Português');
        return { current: subject ? Math.min(subject.questionsAnswered, 100) : 0, total: 100 };
      },
    },
    {
      id: 'subject_master_lgpd',
      title: 'Mestre em LGPD',
      description: 'Responda 100 questões de LGPD',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      requirement: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'LGPD');
        return subject && subject.questionsAnswered >= 100;
      },
      progress: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'LGPD');
        return { current: subject ? Math.min(subject.questionsAnswered, 100) : 0, total: 100 };
      },
    },
    {
      id: 'subject_master_governanca',
      title: 'Mestre em Governança',
      description: 'Responda 100 questões de Governança de TI',
      icon: Award,
      color: 'from-cyan-500 to-cyan-600',
      requirement: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Governança de TI');
        return subject && subject.questionsAnswered >= 100;
      },
      progress: (stats) => {
        const subject = stats.subjectStats.find((s: any) => s.subject === 'Governança de TI');
        return { current: subject ? Math.min(subject.questionsAnswered, 100) : 0, total: 100 };
      },
    },

    // ESPECIAIS - Conquistas únicas
    {
      id: 'early_bird',
      title: 'Madrugador',
      description: 'Estude pela manhã (6h-9h)',
      icon: Sun,
      color: 'from-yellow-400 to-yellow-500',
      requirement: (stats) => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 9 && stats.totalQuestionsAnswered >= 1;
      },
    },
    {
      id: 'night_owl',
      title: 'Coruja Noturna',
      description: 'Estude à noite (21h-23h)',
      icon: Moon,
      color: 'from-indigo-500 to-indigo-600',
      requirement: (stats) => {
        const hour = new Date().getHours();
        return hour >= 21 && hour < 23 && stats.totalQuestionsAnswered >= 1;
      },
    },
    {
      id: 'weekend_warrior',
      title: 'Guerreiro de Fim de Semana',
      description: 'Estude no fim de semana',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      requirement: (stats) => {
        const day = new Date().getDay();
        return (day === 0 || day === 6) && stats.totalQuestionsAnswered >= 1;
      },
    },
    {
      id: 'perfectionist',
      title: 'Perfeccionista',
      description: 'Acerte 20 questões seguidas',
      icon: Check,
      color: 'from-green-500 to-green-600',
      requirement: (stats) => stats.totalCorrectAnswers >= 20 && stats.totalQuestionsAnswered === stats.totalCorrectAnswers,
    },
    {
      id: 'resilient',
      title: 'Resiliente',
      description: 'Continue após errar 10 questões',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 30 && (stats.totalQuestionsAnswered - stats.totalCorrectAnswers) >= 10,
    },
    {
      id: 'energized',
      title: 'Energizado',
      description: 'Responda 50 questões em um dia',
      icon: Battery,
      color: 'from-lime-500 to-lime-600',
      requirement: (stats) => {
        const today = new Date().toISOString().split('T')[0];
        const todayStat = stats.dailyStats.find((d: any) => d.date === today);
        return todayStat && todayStat.questionsAnswered >= 50;
      },
    },
    {
      id: 'marathon',
      title: 'Maratonista',
      description: 'Responda 100 questões em um dia',
      icon: Rocket,
      color: 'from-orange-500 to-orange-600',
      requirement: (stats) => {
        const today = new Date().toISOString().split('T')[0];
        const todayStat = stats.dailyStats.find((d: any) => d.date === today);
        return todayStat && todayStat.questionsAnswered >= 100;
      },
    },
    {
      id: 'first_perfect',
      title: 'Perfeição Inicial',
      description: 'Acerte as primeiras 5 questões',
      icon: ThumbsUp,
      color: 'from-teal-500 to-teal-600',
      requirement: (stats) => stats.totalQuestionsAnswered >= 5 && stats.totalCorrectAnswers >= 5,
    },
    {
      id: 'ale_rr_champion',
      title: 'Campeão ALE-RR',
      description: 'Complete todas as conquistas principais',
      icon: Crown,
      color: 'from-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
      requirement: (stats, game) => 
        stats.totalQuestionsAnswered >= 2000 && 
        stats.overallAccuracy >= 90 && 
        game.level >= 50 && 
        stats.longestStreak >= 100,
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
          <ArrowLeft className="size-6 text-gray-700 dark:text-gray-300" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-gray-100">Conquistas</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {unlockedAchievements.length} de {achievements.length} desbloqueadas
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progresso Geral</span>
          <span className="text-lg text-gray-900 dark:text-gray-100">
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
          <h2 className="text-xl mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
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
                    <h3 className="text-lg mb-1 text-gray-900 dark:text-gray-100">{achievement.title}</h3>
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
          <h2 className="text-xl mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
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
                      <h3 className="text-lg mb-1 text-gray-900 dark:text-gray-100">{achievement.title}</h3>
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