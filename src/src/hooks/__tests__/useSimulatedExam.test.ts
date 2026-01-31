/**
 * @file useSimulatedExam.test.ts
 * @description Testes unitários para o hook useSimulatedExam
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSimulatedExam } from '../useSimulatedExam';
import { 
  mockToast, 
  mockStatsContext, 
  mockGameContext,
  mockQuestions,
  mockSqliteService 
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

vi.mock('../../lib/database/sqliteService', () => ({
  sqliteService: mockSqliteService,
}));

describe('useSimulatedExam Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Inicialização', () => {
    it('deve inicializar com estado "config"', () => {
      const { result } = renderHook(() => useSimulatedExam());

      expect(result.current.examState).toBe('config');
      expect(result.current.loading).toBe(false);
      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('deve ter configuração inicial padrão', () => {
      const { result } = renderHook(() => useSimulatedExam());

      expect(result.current.questionCount).toBe(20);
      expect(result.current.timeLimitMinutes).toBe(60);
    });
  });

  describe('Configuração do Exame', () => {
    it('deve atualizar número de questões', () => {
      const { result } = renderHook(() => useSimulatedExam());

      act(() => {
        result.current.setQuestionCount(30);
      });

      expect(result.current.questionCount).toBe(30);
    });

    it('deve atualizar tempo limite', () => {
      const { result } = renderHook(() => useSimulatedExam());

      act(() => {
        result.current.setTimeLimitMinutes(90);
      });

      expect(result.current.timeLimitMinutes).toBe(90);
    });

    it('deve atualizar matéria selecionada', () => {
      const { result } = renderHook(() => useSimulatedExam());

      act(() => {
        result.current.setSelectedSubject('matematica');
      });

      expect(result.current.selectedSubject).toBe('matematica');
    });
  });

  describe('Início do Exame', () => {
    it('deve carregar questões e iniciar exame', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      expect(result.current.examState).toBe('running');
      expect(result.current.questions.length).toBeGreaterThan(0);
      expect(mockToast.success).toHaveBeenCalledWith(
        expect.stringContaining('Simulado iniciado!')
      );
    });

    it('deve configurar timer corretamente', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      act(() => {
        result.current.setTimeLimitMinutes(10);
      });

      await act(async () => {
        await result.current.startExam();
      });

      expect(result.current.timeRemaining).toBe(600); // 10 minutos em segundos
    });

    it('deve fazer backup no localStorage ao iniciar', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      const backup = localStorage.getItem('exam_backup');
      expect(backup).not.toBeNull();
    });
  });

  describe('Timer', () => {
    it('deve decrementar timer a cada segundo', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      const initialTime = result.current.timeRemaining;

      act(() => {
        vi.advanceTimersByTime(1000); // 1 segundo
      });

      expect(result.current.timeRemaining).toBe(initialTime - 1);
    });

    it('deve finalizar exame quando tempo acabar', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      act(() => {
        result.current.setTimeLimitMinutes(1); // 1 minuto
      });

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        vi.advanceTimersByTime(61000); // 61 segundos (garantir que passou)
      });

      await waitFor(() => {
        expect(result.current.examState).toBe('finished');
      });
    });

    it('deve pausar timer ao finalizar exame', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      const timeBeforeFinish = result.current.timeRemaining;

      act(() => {
        result.current.finishExam();
      });

      act(() => {
        vi.advanceTimersByTime(5000); // 5 segundos
      });

      expect(result.current.timeRemaining).toBe(timeBeforeFinish);
    });
  });

  describe('Navegação de Questões', () => {
    it('deve avançar para próxima questão', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(1);
    });

    it('deve voltar para questão anterior', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.nextQuestion();
        result.current.prevQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('não deve avançar além da última questão', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      const lastIndex = result.current.questions.length - 1;

      act(() => {
        for (let i = 0; i < lastIndex + 5; i++) {
          result.current.nextQuestion();
        }
      });

      expect(result.current.currentQuestionIndex).toBeLessThanOrEqual(lastIndex);
    });

    it('não deve voltar antes da primeira questão', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.prevQuestion();
        result.current.prevQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('deve navegar diretamente para questão específica', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.goToQuestion(5);
      });

      expect(result.current.currentQuestionIndex).toBe(5);
    });
  });

  describe('Respostas', () => {
    it('deve registrar resposta corretamente', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      const questionId = result.current.currentQuestion?.id;

      act(() => {
        result.current.selectAnswer(questionId!, 'opt1');
      });

      expect(result.current.answers[questionId!]).toBe('opt1');
    });

    it('deve permitir alterar resposta', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      const questionId = result.current.currentQuestion?.id;

      act(() => {
        result.current.selectAnswer(questionId!, 'opt1');
        result.current.selectAnswer(questionId!, 'opt2');
      });

      expect(result.current.answers[questionId!]).toBe('opt2');
    });

    it('deve contar questões respondidas', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.selectAnswer(result.current.questions[0].id, 'opt1');
        result.current.selectAnswer(result.current.questions[1].id, 'opt2');
        result.current.selectAnswer(result.current.questions[2].id, 'opt3');
      });

      expect(result.current.answeredCount).toBe(3);
    });

    it('deve calcular porcentagem de conclusão', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      act(() => {
        result.current.setQuestionCount(10);
      });

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.selectAnswer(result.current.questions[0].id, 'opt1');
        result.current.selectAnswer(result.current.questions[1].id, 'opt2');
      });

      expect(result.current.completionPercentage).toBe(20); // 2/10 = 20%
    });
  });

  describe('Finalização e Resultado', () => {
    it('deve calcular nota corretamente', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      // Responder 2 corretas de 3 questões (66.67%)
      act(() => {
        result.current.selectAnswer(
          result.current.questions[0].id, 
          result.current.questions[0].correct_option_id
        );
        result.current.selectAnswer(
          result.current.questions[1].id, 
          result.current.questions[1].correct_option_id
        );
        result.current.selectAnswer(
          result.current.questions[2].id, 
          'wrong-answer'
        );
      });

      act(() => {
        result.current.finishExam();
      });

      expect(result.current.correctCount).toBe(2);
      expect(result.current.score).toBeCloseTo(66.67, 1);
    });

    it('deve salvar resultado no histórico', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.finishExam();
      });

      expect(mockStatsContext.addCompletedExam).toHaveBeenCalled();
      
      const examData = mockStatsContext.addCompletedExam.mock.calls[0][0];
      expect(examData).toHaveProperty('score');
      expect(examData).toHaveProperty('totalQuestions');
      expect(examData).toHaveProperty('correctAnswers');
    });

    it('deve limpar backup ao finalizar', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.finishExam();
      });

      const backup = localStorage.getItem('exam_backup');
      expect(backup).toBeNull();
    });

    it('deve adicionar XP ao finalizar', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.finishExam();
      });

      expect(mockGameContext.addXP).toHaveBeenCalled();
    });

    it('deve mostrar toast de sucesso ao finalizar', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.finishExam();
      });

      expect(mockToast.success).toHaveBeenCalledWith(
        expect.stringContaining('Simulado finalizado!')
      );
    });
  });

  describe('Backup e Restore', () => {
    it('deve restaurar exame de backup ao montar', async () => {
      // Simular backup existente
      const backup = {
        examState: 'running',
        questions: mockQuestions,
        answers: { q1: 'opt1' },
        currentQuestionIndex: 2,
        timeRemaining: 1800,
        startTime: Date.now(),
      };
      localStorage.setItem('exam_backup', JSON.stringify(backup));

      const { result } = renderHook(() => useSimulatedExam());

      await waitFor(() => {
        expect(result.current.examState).toBe('running');
        expect(result.current.currentQuestionIndex).toBe(2);
        expect(result.current.answers).toEqual({ q1: 'opt1' });
      });
    });

    it('deve atualizar backup a cada resposta', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.selectAnswer(result.current.questions[0].id, 'opt1');
      });

      const backup = JSON.parse(localStorage.getItem('exam_backup') || '{}');
      expect(backup.answers).toHaveProperty(result.current.questions[0].id);
    });
  });

  describe('Resetar Exame', () => {
    it('deve limpar todas as respostas ao resetar', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.selectAnswer(result.current.questions[0].id, 'opt1');
        result.current.resetExam();
      });

      expect(result.current.examState).toBe('config');
      expect(result.current.answers).toEqual({});
      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('deve limpar backup ao resetar', async () => {
      const { result } = renderHook(() => useSimulatedExam());

      await act(async () => {
        await result.current.startExam();
      });

      act(() => {
        result.current.resetExam();
      });

      const backup = localStorage.getItem('exam_backup');
      expect(backup).toBeNull();
    });
  });
});
