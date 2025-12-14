// 🏆 Sistema de Conquistas (Badges)
// Centralizando a definição de todas as conquistas do jogo

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  condition: (stats: {
    totalQuestionsAnswered: number;
    correctAnswers: number;
    streak: number;
    level: number;
    simulatedExamsCompleted: number;
  }) => boolean;
}

export const ALL_BADGES: Badge[] = [
  // INICIANTE
  {
    id: 'first_question',
    name: 'Primeira Questão',
    description: 'Responda sua primeira questão',
    icon: '🎯',
    category: 'Iniciante',
    condition: (stats) => stats.totalQuestionsAnswered >= 1,
  },

  // VOLUME
  {
    id: 'bronze_student',
    name: 'Estudante Bronze',
    description: 'Responda 50 questões',
    icon: '🥉',
    category: 'Volume',
    condition: (stats) => stats.totalQuestionsAnswered >= 50,
  },
  {
    id: 'silver_student',
    name: 'Estudante Prata',
    description: 'Responda 100 questões',
    icon: '🥈',
    category: 'Volume',
    condition: (stats) => stats.totalQuestionsAnswered >= 100,
  },
  {
    id: 'gold_student',
    name: 'Estudante Ouro',
    description: 'Responda 250 questões',
    icon: '🥇',
    category: 'Volume',
    condition: (stats) => stats.totalQuestionsAnswered >= 250,
  },
  {
    id: 'diamond_student',
    name: 'Estudante Diamante',
    description: 'Responda 500 questões',
    icon: '💎',
    category: 'Volume',
    condition: (stats) => stats.totalQuestionsAnswered >= 500,
  },
  {
    id: 'master_student',
    name: 'Mestre dos Estudos',
    description: 'Responda 1000 questões',
    icon: '🎓',
    category: 'Volume',
    condition: (stats) => stats.totalQuestionsAnswered >= 1000,
  },
  {
    id: 'legend_student',
    name: 'Lenda Viva',
    description: 'Responda 2000 questões',
    icon: '👑',
    category: 'Elite',
    condition: (stats) => stats.totalQuestionsAnswered >= 2000,
  },

  // DEDICAÇÃO (STREAK)
  {
    id: 'streak_3',
    name: 'Aquecendo',
    description: 'Acerte 3 questões seguidas',
    icon: '🔥',
    category: 'Dedicação',
    condition: (stats) => stats.streak >= 3,
  },
  {
    id: 'streak_5',
    name: 'Em Chamas',
    description: 'Acerte 5 questões seguidas',
    icon: '🔥🔥',
    category: 'Dedicação',
    condition: (stats) => stats.streak >= 5,
  },
  {
    id: 'streak_10',
    name: 'Incandescente',
    description: 'Acerte 10 questões seguidas',
    icon: '🔥🔥🔥',
    category: 'Dedicação',
    condition: (stats) => stats.streak >= 10,
  },
  {
    id: 'streak_20',
    name: 'Invencível',
    description: 'Acerte 20 questões seguidas',
    icon: '⚡',
    category: 'Dedicação',
    condition: (stats) => stats.streak >= 20,
  },
  {
    id: 'streak_50',
    name: 'Perfeito',
    description: 'Acerte 50 questões seguidas',
    icon: '💫',
    category: 'Elite',
    condition: (stats) => stats.streak >= 50,
  },

  // DESEMPENHO (Acurácia)
  {
    id: 'accuracy_50',
    name: 'Aprendiz',
    description: 'Tenha 50% de acertos',
    icon: '📚',
    category: 'Desempenho',
    condition: (stats) => {
      if (stats.totalQuestionsAnswered < 10) return false;
      return (stats.correctAnswers / stats.totalQuestionsAnswered) >= 0.5;
    },
  },
  {
    id: 'accuracy_70',
    name: 'Competente',
    description: 'Tenha 70% de acertos (mínimo 50 questões)',
    icon: '🎓',
    category: 'Desempenho',
    condition: (stats) => {
      if (stats.totalQuestionsAnswered < 50) return false;
      return (stats.correctAnswers / stats.totalQuestionsAnswered) >= 0.7;
    },
  },
  {
    id: 'accuracy_85',
    name: 'Expert',
    description: 'Tenha 85% de acertos (mínimo 100 questões)',
    icon: '🌟',
    category: 'Desempenho',
    condition: (stats) => {
      if (stats.totalQuestionsAnswered < 100) return false;
      return (stats.correctAnswers / stats.totalQuestionsAnswered) >= 0.85;
    },
  },
  {
    id: 'accuracy_95',
    name: 'Gênio',
    description: 'Tenha 95% de acertos (mínimo 200 questões)',
    icon: '🧠',
    category: 'Elite',
    condition: (stats) => {
      if (stats.totalQuestionsAnswered < 200) return false;
      return (stats.correctAnswers / stats.totalQuestionsAnswered) >= 0.95;
    },
  },

  // PROGRESSÃO (Níveis)
  {
    id: 'level_5',
    name: 'Nível 5',
    description: 'Alcance o nível 5',
    icon: '⭐',
    category: 'Progressão',
    condition: (stats) => stats.level >= 5,
  },
  {
    id: 'level_10',
    name: 'Nível 10',
    description: 'Alcance o nível 10',
    icon: '⭐⭐',
    category: 'Progressão',
    condition: (stats) => stats.level >= 10,
  },
  {
    id: 'level_20',
    name: 'Nível 20',
    description: 'Alcance o nível 20',
    icon: '⭐⭐⭐',
    category: 'Progressão',
    condition: (stats) => stats.level >= 20,
  },
  {
    id: 'level_30',
    name: 'Nível 30',
    description: 'Alcance o nível 30',
    icon: '🌠',
    category: 'Progressão',
    condition: (stats) => stats.level >= 30,
  },
  {
    id: 'level_50',
    name: 'Nível 50 - Mestre Supremo',
    description: 'Alcance o nível 50',
    icon: '👑',
    category: 'Elite',
    condition: (stats) => stats.level >= 50,
  },

  // CONSISTÊNCIA (Simulados)
  {
    id: 'first_exam',
    name: 'Primeiro Simulado',
    description: 'Complete seu primeiro simulado',
    icon: '📝',
    category: 'Consistência',
    condition: (stats) => stats.simulatedExamsCompleted >= 1,
  },
  {
    id: 'exam_veteran',
    name: 'Veterano em Simulados',
    description: 'Complete 5 simulados',
    icon: '📋',
    category: 'Consistência',
    condition: (stats) => stats.simulatedExamsCompleted >= 5,
  },
  {
    id: 'exam_master',
    name: 'Mestre em Simulados',
    description: 'Complete 10 simulados',
    icon: '📊',
    category: 'Consistência',
    condition: (stats) => stats.simulatedExamsCompleted >= 10,
  },
  {
    id: 'exam_legend',
    name: 'Lenda dos Simulados',
    description: 'Complete 25 simulados',
    icon: '🏅',
    category: 'Elite',
    condition: (stats) => stats.simulatedExamsCompleted >= 25,
  },
];
