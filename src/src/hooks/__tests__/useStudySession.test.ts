/**
 * @file useStudySession.test.ts
 * @description Testes unitários para o hook useStudySession
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStudySession } from '../useStudySession';
import { 
  mockToast, 
  mockStatsContext, 
  mockGameContext,
  mockQuestions,
} from '../../test/mocks';

// Mocks
vi.mock('sonner@2.0.3', () => ({
  toast: mockToast,
}));

vi.mock('../../context/StatsContext', () => ({
  useStats: () => mockStatsContext,
}));

vi.mock('../../context/GameContext', () => ({
  useGame: () => mockGameContext,
}));

describe('useStudySession Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Inicialização', () => {
    it('deve inicializar com loading true', () => {
      const { result } = renderHook(() => useStudySession());

      expect(result.current.loading).toBe(true);
    });

    it('deve carregar questões ao montar', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.questions.length).toBeGreaterThan(0);
      });
    });

    it('deve ter índice inicial 0', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.currentIndex).toBe(0);
      });
    });
  });

  describe('Navegação de Questões', () => {
    it('deve avançar para próxima questão', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentIndex).toBe(1);
    });

    it('deve voltar para questão anterior', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.nextQuestion();
        result.current.prevQuestion();
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('não deve voltar antes da primeira questão', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.prevQuestion();
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('deve voltar ao início ao passar da última questão', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const lastIndex = result.current.questions.length - 1;

      act(() => {
        // Ir até última questão
        for (let i = 0; i < lastIndex; i++) {
          result.current.nextQuestion();
        }
        // Tentar ir além
        result.current.nextQuestion();
      });

      expect(result.current.currentIndex).toBe(0);
    });
  });

  describe('Responder Questão', () => {
    it('deve registrar resposta correta', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const correctAnswer = result.current.currentQuestion?.correct_option_id;

      act(() => {
        result.current.handleAnswer(correctAnswer!);
      });

      expect(result.current.isAnswered).toBe(true);
      expect(result.current.isCorrect).toBe(true);
      expect(result.current.showExplanation).toBe(true);
    });

    it('deve registrar resposta incorreta', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const wrongAnswer = 'wrong-id';

      act(() => {
        result.current.handleAnswer(wrongAnswer);
      });

      expect(result.current.isAnswered).toBe(true);
      expect(result.current.isCorrect).toBe(false);
      expect(result.current.showExplanation).toBe(true);
    });

    it('deve adicionar XP ao acertar', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const correctAnswer = result.current.currentQuestion?.correct_option_id;

      act(() => {
        result.current.handleAnswer(correctAnswer!);
      });

      expect(mockGameContext.addXP).toHaveBeenCalled();
    });

    it('deve atualizar estatísticas', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const correctAnswer = result.current.currentQuestion?.correct_option_id;

      act(() => {
        result.current.handleAnswer(correctAnswer!);
      });

      expect(mockStatsContext.updateStats).toHaveBeenCalled();
    });

    it('não deve permitir responder duas vezes a mesma questão', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const correctAnswer = result.current.currentQuestion?.correct_option_id;

      act(() => {
        result.current.handleAnswer(correctAnswer!);
        result.current.handleAnswer('another-answer');
      });

      expect(mockGameContext.addXP).toHaveBeenCalledTimes(1);
    });
  });

  describe('Timer', () => {
    it('deve incrementar timer a cada segundo', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const initialTime = result.current.timeSpent;

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.timeSpent).toBe(initialTime + 1);
    });

    it('deve continuar contando mesmo ao trocar de questão', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      const timeBeforeNext = result.current.timeSpent;

      act(() => {
        result.current.nextQuestion();
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.timeSpent).toBe(timeBeforeNext + 3);
    });
  });

  describe('Progresso da Sessão', () => {
    it('deve calcular progresso corretamente', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const totalQuestions = result.current.questions.length;

      act(() => {
        // Responder primeira questão
        result.current.handleAnswer(result.current.currentQuestion?.correct_option_id!);
        result.current.nextQuestion();
      });

      expect(result.current.progress).toBe(1);
      expect(result.current.progressPercentage).toBe((1 / totalQuestions) * 100);
    });

    it('deve contar acertos corretamente', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        // Acertar questão 1
        result.current.handleAnswer(result.current.currentQuestion?.correct_option_id!);
        result.current.nextQuestion();
        
        // Errar questão 2
        result.current.handleAnswer('wrong-answer');
        result.current.nextQuestion();
        
        // Acertar questão 3
        result.current.handleAnswer(result.current.currentQuestion?.correct_option_id!);
      });

      expect(result.current.correctAnswers).toBe(2);
      expect(result.current.accuracy).toBeCloseTo(66.67, 1); // 2/3
    });
  });

  describe('Filtros de Questão', () => {
    it('deve permitir filtrar por matéria', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.filterBySubject('matematica');
      });

      await waitFor(() => {
        result.current.questions.forEach(q => {
          expect(q.subject_id).toBe('matematica');
        });
      });
    });

    it('deve permitir filtrar por dificuldade', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.filterByDifficulty('facil');
      });

      await waitFor(() => {
        result.current.questions.forEach(q => {
          expect(q.difficulty_level).toBe('facil');
        });
      });
    });

    it('deve limpar filtros', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const originalLength = result.current.questions.length;

      act(() => {
        result.current.filterBySubject('matematica');
      });

      await waitFor(() => {
        expect(result.current.questions.length).toBeLessThan(originalLength);
      });

      act(() => {
        result.current.clearFilters();
      });

      await waitFor(() => {
        expect(result.current.questions.length).toBe(originalLength);
      });
    });
  });

  describe('Modo Revisão', () => {
    it('deve identificar questões erradas', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const questionId = result.current.currentQuestion?.id;

      act(() => {
        result.current.handleAnswer('wrong-answer');
      });

      const wrongQuestions = JSON.parse(
        localStorage.getItem('alerr_wrong_questions') || '[]'
      );

      expect(wrongQuestions).toContain(questionId);
    });

    it('deve carregar apenas questões erradas no modo revisão', async () => {
      // Simular questões erradas salvas
      localStorage.setItem('alerr_wrong_questions', JSON.stringify(['q1', 'q2']));

      const { result } = renderHook(() => useStudySession({ reviewMode: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.questions.length).toBe(2);
        expect(result.current.questions.every(q => ['q1', 'q2'].includes(q.id))).toBe(true);
      });
    });
  });

  describe('Reset da Sessão', () => {
    it('deve resetar progresso ao chamar reset', async () => {
      const { result } = renderHook(() => useStudySession());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.handleAnswer(result.current.currentQuestion?.correct_option_id!);
        result.current.nextQuestion();
        vi.advanceTimersByTime(30000);
      });

      act(() => {
        result.current.resetSession();
      });

      expect(result.current.currentIndex).toBe(0);
      expect(result.current.timeSpent).toBe(0);
      expect(result.current.progress).toBe(0);
      expect(result.current.correctAnswers).toBe(0);
    });
  });
});
