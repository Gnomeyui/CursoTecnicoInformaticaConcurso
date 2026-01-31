/**
 * @file mocks.ts
 * @description Mocks compartilhados para testes
 */

import { vi } from 'vitest';

// Mock de Toast (Sonner)
export const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
};

// Mock de Navigate (React Router)
export const mockNavigate = vi.fn();

// Mock de Contexts
export const mockStatsContext = {
  detailedStats: {
    totalQuestionsAnswered: 100,
    overallAccuracy: 75,
    currentStreak: 5,
    totalStudyTime: 3600,
    dailyStats: [
      { date: '2026-01-25', questionsAnswered: 10, correctAnswers: 7 },
      { date: '2026-01-26', questionsAnswered: 15, correctAnswers: 12 },
      { date: '2026-01-27', questionsAnswered: 12, correctAnswers: 9 },
      { date: '2026-01-28', questionsAnswered: 8, correctAnswers: 6 },
      { date: '2026-01-29', questionsAnswered: 20, correctAnswers: 15 },
      { date: '2026-01-30', questionsAnswered: 18, correctAnswers: 14 },
      { date: '2026-01-31', questionsAnswered: 17, correctAnswers: 12 },
    ],
    subjectStats: [
      { subject: 'Português', questionsAnswered: 30, correctAnswers: 22, accuracy: 73.33 },
      { subject: 'Matemática', questionsAnswered: 25, correctAnswers: 20, accuracy: 80 },
      { subject: 'Direito', questionsAnswered: 20, correctAnswers: 15, accuracy: 75 },
      { subject: 'Informática', questionsAnswered: 15, correctAnswers: 12, accuracy: 80 },
      { subject: 'Atualidades', questionsAnswered: 10, correctAnswers: 6, accuracy: 60 },
    ],
  },
  addCompletedExam: vi.fn(),
  updateStats: vi.fn(),
};

export const mockGameContext = {
  xp: 5500,
  level: 6,
  achievements: ['first_study', 'week_streak'],
  addXP: vi.fn(),
  unlockAchievement: vi.fn(),
};

export const mockCustomizationContext = {
  settings: {
    colorTheme: 'focus',
    darkMode: false,
  },
  theme: {
    name: 'Focus',
    primary: '#3b82f6',
    secondary: '#10b981',
  },
  updateSettings: vi.fn(),
};

// Mock de Services
export const mockAuthService = {
  isPremium: vi.fn(() => false),
  getUser: vi.fn(() => ({
    id: 'user-123',
    name: 'João Silva',
    email: 'joao@example.com',
    plan: 'FREE',
    premiumExpiresAt: null,
  })),
  getPlan: vi.fn(() => 'FREE'),
  cancelSubscription: vi.fn(),
};

export const mockVoucherService = {
  redeem: vi.fn((code: string) => {
    if (code === 'VALID2024') {
      return {
        valid: true,
        voucher: {
          code: 'VALID2024',
          type: 'monthly',
          duration: 30,
        },
      };
    }
    return {
      valid: false,
      message: '❌ Código inválido',
    };
  }),
};

// Mock de Questions
export const mockQuestions = [
  {
    id: 'q1',
    text: 'Qual é a capital do Brasil?',
    options: [
      { id: 'opt1', text: 'São Paulo' },
      { id: 'opt2', text: 'Rio de Janeiro' },
      { id: 'opt3', text: 'Brasília' },
      { id: 'opt4', text: 'Salvador' },
    ],
    correct_option_id: 'opt3',
    subject_id: 'geografia',
    difficulty_level: 'facil',
    year: '2024',
    banca: 'CESPE',
    explanation: 'Brasília é a capital federal do Brasil desde 1960.',
  },
  {
    id: 'q2',
    text: 'Quanto é 2 + 2?',
    options: [
      { id: 'opt1', text: '3' },
      { id: 'opt2', text: '4' },
      { id: 'opt3', text: '5' },
      { id: 'opt4', text: '6' },
    ],
    correct_option_id: 'opt2',
    subject_id: 'matematica',
    difficulty_level: 'facil',
    year: '2024',
    banca: 'FGV',
    explanation: '2 + 2 = 4.',
  },
  {
    id: 'q3',
    text: 'Quem escreveu Dom Casmurro?',
    options: [
      { id: 'opt1', text: 'Machado de Assis' },
      { id: 'opt2', text: 'José de Alencar' },
      { id: 'opt3', text: 'Clarice Lispector' },
      { id: 'opt4', text: 'Carlos Drummond de Andrade' },
    ],
    correct_option_id: 'opt1',
    subject_id: 'portugues',
    difficulty_level: 'medio',
    year: '2023',
    banca: 'FCC',
    explanation: 'Dom Casmurro foi escrito por Machado de Assis em 1899.',
  },
];

// Mock de SQLite Service
export const mockSqliteService = {
  query: vi.fn((sql: string) => {
    if (sql.includes('SELECT')) {
      return Promise.resolve(mockQuestions);
    }
    return Promise.resolve([]);
  }),
  execute: vi.fn(() => Promise.resolve({ changes: 1 })),
};
