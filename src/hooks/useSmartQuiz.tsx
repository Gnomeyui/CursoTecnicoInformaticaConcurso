/**
 * useSmartQuiz - Hook Inteligente para Quiz com SQLite
 * 
 * MODELO HÍBRIDO - Combina:
 * - Busca com JOIN (exams + questions)
 * - Sistema de shuffle de alternativas
 * - Lógica de mastered/critical
 * - Filtros avançados (disciplina, dificuldade)
 * - Sistema de XP e progressão
 */

import { useState, useCallback, useEffect } from 'react';
import { sqliteService } from '../lib/database/SQLiteService';

interface QuestionOption {
  id: string;
  text: string;
}

interface Question {
  id: number;
  questionNumber: number;
  discipline: string;
  statement: string;
  options: Record<string, string>;
  shuffledOptions: QuestionOption[]; // Para exibir embaralhado
  correctOption: string;
  // Dados da prova
  banca: string;
  orgao: string;
  cargo: string;
  ano: number;
  nivel: string;
}

interface UseSmartQuizProps {
  discipline?: string;
  quantidade?: number;
  excludeMastered?: boolean; // Excluir questões já dominadas
  prioritizeCritical?: boolean; // Priorizar questões críticas
  autoStart?: boolean;
  userId?: string;
}

/**
 * Função auxiliar para embaralhar array
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function useSmartQuiz({
  discipline,
  quantidade = 10,
  excludeMastered = false,
  prioritizeCritical = false,
  autoStart = true,
  userId = 'local_user'
}: UseSmartQuizProps = {}) {
  const [queue, setQueue] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca inteligente de questões
   */
  const fetchBlock = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await sqliteService.initialize();

      // Montar query dinâmica
      let sql = `
        SELECT 
          q.id,
          q.question_number,
          q.discipline,
          q.statement,
          q.options,
          q.correct_option,
          e.banca,
          e.orgao,
          e.cargo,
          e.ano,
          e.nivel,
          COALESCE(p.is_mastered, 0) as is_mastered,
          COALESCE(p.is_critical, 0) as is_critical,
          COALESCE(p.times_wrong_total, 0) as times_wrong
        FROM questions q
        INNER JOIN exams e ON q.exam_id = e.id
        LEFT JOIN user_question_progress p ON q.id = p.question_id AND p.user_id = ?
        WHERE 1=1
      `;
      const params: any[] = [userId];

      // Filtro de disciplina
      if (discipline) {
        sql += ' AND q.discipline = ?';
        params.push(discipline);
      }

      // Filtro de questões já dominadas
      if (excludeMastered) {
        sql += ' AND COALESCE(p.is_mastered, 0) = 0';
      }

      // Ordenação: Prioriza críticas primeiro, depois aleatório
      if (prioritizeCritical) {
        sql += ' ORDER BY is_critical DESC, times_wrong DESC, RANDOM()';
      } else {
        sql += ' ORDER BY RANDOM()';
      }

      sql += ' LIMIT ?';
      params.push(quantidade);

      const results = await sqliteService.query(sql, params);

      if (results.length === 0) {
        setError('Nenhuma questão encontrada com os filtros aplicados.');
        setQueue([]);
        return;
      }

      // Processar resultados
      const parsedQuestions: Question[] = results.map(row => {
        const optionsObj = JSON.parse(row.options);
        
        // Criar array de opções para shuffle
        const optionsArray: QuestionOption[] = Object.entries(optionsObj).map(([key, text]) => ({
          id: key,
          text: text as string
        }));

        return {
          id: row.id,
          questionNumber: row.question_number,
          discipline: row.discipline,
          statement: row.statement,
          options: optionsObj,
          shuffledOptions: shuffleArray(optionsArray), // Embaralhar alternativas
          correctOption: row.correct_option,
          banca: row.banca,
          orgao: row.orgao,
          cargo: row.cargo,
          ano: row.ano,
          nivel: row.nivel
        };
      });

      setQueue(parsedQuestions);
      setCurrentIndex(0);

      console.log(`✅ ${parsedQuestions.length} questões carregadas (Disciplina: ${discipline || 'Todas'})`);

    } catch (err) {
      console.error('❌ Erro ao buscar questões:', err);
      setError(`Erro ao carregar questões: ${err}`);
      setQueue([]);
    } finally {
      setLoading(false);
    }
  }, [discipline, quantidade, excludeMastered, prioritizeCritical, userId]);

  /**
   * Registra resposta e atualiza progresso + XP
   */
  const handleAnswer = useCallback(async (question: Question, selectedOptionId: string) => {
    const isCorrect = selectedOptionId === question.correctOption;

    try {
      // 1. Buscar progresso atual
      const existingProgress = await sqliteService.query(
        'SELECT * FROM user_question_progress WHERE user_id = ? AND question_id = ?',
        [userId, question.id]
      );

      const current = existingProgress[0] || {
        times_viewed: 0,
        times_correct: 0,
        times_wrong_total: 0
      };

      const newViewed = current.times_viewed + 1;
      const newCorrect = current.times_correct + (isCorrect ? 1 : 0);
      const newWrong = current.times_wrong_total + (isCorrect ? 0 : 1);

      // Regras de classificação
      const isMastered = newCorrect >= 4 ? 1 : 0; // ✅ Dominada após 4 acertos
      const isCritical = newWrong >= 3 ? 1 : 0;   // 🔴 Crítica após 3 erros

      // 2. Atualizar/Inserir progresso
      await sqliteService.execute(`
        INSERT OR REPLACE INTO user_question_progress (
          user_id, question_id, times_viewed, times_correct,
          times_wrong_total, is_mastered, is_critical, 
          last_answered_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `, [userId, question.id, newViewed, newCorrect, newWrong, isMastered, isCritical]);

      // 3. Atualizar XP do usuário
      if (isCorrect) {
        await sqliteService.execute(`
          UPDATE user_profile 
          SET xp = xp + 10,
              total_questions_answered = total_questions_answered + 1,
              correct_answers = correct_answers + 1,
              updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `, [userId]);
      } else {
        await sqliteService.execute(`
          UPDATE user_profile 
          SET total_questions_answered = total_questions_answered + 1,
              updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `, [userId]);
      }

      console.log(`${isCorrect ? '✅' : '❌'} Q${question.id}: ${isCorrect ? '+10 XP' : 'Errou'}`);

      return { isCorrect, isMastered: isMastered === 1, isCritical: isCritical === 1 };

    } catch (err) {
      console.error('❌ Erro ao salvar progresso:', err);
      return { isCorrect, isMastered: false, isCritical: false };
    }
  }, [userId]);

  /**
   * Navegar para próxima questão
   */
  const nextQuestion = useCallback(() => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, queue.length]);

  /**
   * Navegar para questão anterior
   */
  const previousQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  /**
   * Reiniciar quiz
   */
  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    fetchBlock();
  }, [fetchBlock]);

  /**
   * Auto-start (buscar questões automaticamente)
   */
  useEffect(() => {
    if (autoStart) {
      fetchBlock();
    }
  }, [autoStart, fetchBlock]);

  return {
    // Estado
    queue,
    currentIndex,
    loading,
    error,
    
    // Questão atual
    currentQuestion: queue[currentIndex] || null,
    totalQuestions: queue.length,
    isLastQuestion: currentIndex === queue.length - 1,
    isFirstQuestion: currentIndex === 0,
    isSessionComplete: currentIndex >= queue.length && queue.length > 0,
    
    // Ações
    handleAnswer,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    reload: fetchBlock
  };
}
