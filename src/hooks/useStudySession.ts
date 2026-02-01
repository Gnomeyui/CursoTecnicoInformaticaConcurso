/**
 * @file useStudySession.ts
 * @description Custom Hook para lógica da Sessão de Estudos
 * @pattern Headless Logic Pattern - Separação total de UI e Lógica
 * @updated 2026-02-01 - Migrado para SQLite Offline-First
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';
import { useWrongQuestions } from '../context/WrongQuestionsContext';
import { sqliteService } from '../lib/database/SQLiteService';
import { 
  shuffleQuestionOptions, 
  mixQuestionsWithReview, 
  ShuffledQuestion 
} from '../utils/questionHelpers';

/**
 * Difficulty types
 */
export type Difficulty = 'easy' | 'medium' | 'hard' | 'mix';

/**
 * Session status types
 */
export type SessionStatus = 'loading' | 'ready' | 'empty' | 'error';

/**
 * Question from SQLite
 */
interface SQLiteQuestion {
  id: string | number;
  exam_id: number;
  question_number: number;
  discipline: string;
  statement: string;
  options: string; // JSON string
  correct_option: string; // 'a', 'b', 'c', 'd'
  difficulty?: string;
  explanation?: string;
}

/**
 * Dados retornados pelo hook
 */
export interface StudySessionData {
  // Question State
  currentQuestion: ShuffledQuestion | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  
  // Answer State
  selectedAnswer: number | null;
  showExplanation: boolean;
  
  // Session Stats
  sessionStats: {
    correct: number;
    total: number;
    accuracy: number;
  };
  
  // Review State
  isReviewQuestion: boolean;
  reviewQuestionIds: number[];
  
  // Progress
  progressPercentage: number;
  
  // Status
  status: SessionStatus;
  
  // Actions
  selectAnswer: (index: number) => void;
  confirmAnswer: () => void;
  nextQuestion: () => void;
  getDifficultyColor: (diff: string) => string;
}

/**
 * Converte questão do SQLite para formato interno
 */
function convertSQLiteQuestion(q: SQLiteQuestion): any {
  try {
    // Parse options de JSON string para objeto
    const optionsObj = typeof q.options === 'string' 
      ? JSON.parse(q.options) 
      : q.options;

    // Converter {a: '...', b: '...', c: '...', d: '...'} para array
    const optionsArray = Array.isArray(optionsObj)
      ? optionsObj
      : Object.values(optionsObj);

    // Mapear dificuldade SQLite -> formato interno
    const difficultyMap: Record<string, Difficulty> = {
      'facil': 'easy',
      'medio': 'medium',
      'dificil': 'hard',
      'easy': 'easy',
      'medium': 'medium',
      'hard': 'hard'
    };

    const difficulty = difficultyMap[q.difficulty?.toLowerCase() || 'medium'] || 'medium';

    // Mapear letra correta (a, b, c, d) para índice (0, 1, 2, 3)
    const correctAnswerMap: Record<string, number> = {
      'a': 0, 'b': 1, 'c': 2, 'd': 3
    };

    const correctAnswer = correctAnswerMap[q.correct_option.toLowerCase()] ?? 0;

    return {
      id: Number(q.id) || Number(q.question_number),
      question: q.statement,
      subject: q.discipline,
      options: optionsArray,
      correctAnswer,
      difficulty,
      explanation: q.explanation || ''
    };
  } catch (error) {
    console.error('Erro ao converter questão SQLite:', error, q);
    return null;
  }
}

/**
 * Hook principal da Sessão de Estudos
 * 
 * @param difficulty - Dificuldade selecionada
 * @param subject - Matéria selecionada (opcional)
 * @param onSessionEnd - Callback quando sessão termina
 * 
 * @returns {StudySessionData} Dados e ações da sessão
 * 
 * @example
 * ```tsx
 * const session = useStudySession('medium', 'Matemática', handleEnd);
 * 
 * return (
 *   <div>
 *     <h1>{session.currentQuestion?.question}</h1>
 *     <button onClick={() => session.selectAnswer(0)}>A</button>
 *   </div>
 * );
 * ```
 */
export const useStudySession = (
  difficulty: Difficulty,
  subject?: string,
  onSessionEnd?: () => void
): StudySessionData => {
  // ============================================
  // 1. CONTEXTS
  // ============================================
  const { addXP } = useGame();
  const { recordAnswer } = useStats();
  const { 
    recordWrongAnswer, 
    recordCorrectReview, 
    getWrongQuestionsForReview 
  } = useWrongQuestions();

  // ============================================
  // 2. STATE
  // ============================================
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<ShuffledQuestion[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [reviewQuestionIds, setReviewQuestionIds] = useState<number[]>([]);
  const [status, setStatus] = useState<SessionStatus>('loading');

  // ============================================
  // 3. LOAD QUESTIONS FROM SQLITE
  // ============================================
  useEffect(() => {
    let isMounted = true;

    const loadQuestions = async () => {
      try {
        setStatus('loading');
        console.log('📚 Carregando questões do SQLite...');
        console.log('🎯 Filtros:', { difficulty, subject });

        // Inicializar SQLite
        await sqliteService.initialize();

        // Construir query com filtros
        let query = 'SELECT * FROM questions WHERE 1=1';
        const params: any[] = [];

        // Filtro de matéria
        if (subject && subject !== 'all') {
          query += ' AND discipline = ?';
          params.push(subject);
        }

        // Filtro de dificuldade (se não for 'mix')
        if (difficulty !== 'mix') {
          const difficultyMap: Record<Difficulty, string> = {
            'easy': 'facil',
            'medium': 'medio',
            'hard': 'dificil',
            'mix': 'medio' // fallback
          };
          
          query += ' AND difficulty = ?';
          params.push(difficultyMap[difficulty]);
        }

        // Ordenar aleatoriamente e limitar
        query += ' ORDER BY RANDOM() LIMIT 10';

        console.log('🔍 Query:', query);
        console.log('🔍 Params:', params);

        // Executar query
        const results = await sqliteService.query(query, params);

        console.log(`✅ ${results.length} questões encontradas`);

        if (!isMounted) return;

        // Verificar se há questões
        if (results.length === 0) {
          console.warn('⚠️ Nenhuma questão encontrada com os filtros:', { difficulty, subject });
          setStatus('empty');
          setSessionQuestions([]);
          return;
        }

        // Converter questões do SQLite para formato interno
        const convertedQuestions = results
          .map(convertSQLiteQuestion)
          .filter(q => q !== null);

        if (convertedQuestions.length === 0) {
          console.error('❌ Erro ao converter questões');
          setStatus('error');
          return;
        }

        console.log('📝 Questões convertidas:', convertedQuestions.length);

        // Obter questões erradas para revisão (máximo 2 repetições)
        const wrongIds = getWrongQuestionsForReview(2);
        setReviewQuestionIds(wrongIds);

        console.log('🔄 Questões erradas disponíveis para revisão:', wrongIds.length);

        // Mesclar questões novas com questões de revisão (30% de revisão)
        const mixedQuestions = mixQuestionsWithReview(
          convertedQuestions, 
          wrongIds, 
          10, 
          0.3
        );

        console.log('📝 Questões da sessão:', mixedQuestions.length);
        console.log('🔄 Questões de revisão incluídas:', 
          mixedQuestions.filter(q => wrongIds.includes(q.id)).length
        );

        // Embaralhar as alternativas de cada questão
        const shuffledQuestions = mixedQuestions.map(q => shuffleQuestionOptions(q));

        setSessionQuestions(shuffledQuestions);
        setStatus('ready');

      } catch (error) {
        console.error('❌ Erro ao carregar questões do SQLite:', error);
        
        if (isMounted) {
          setStatus('error');
          setSessionQuestions([]);
        }
      }
    };

    loadQuestions();

    return () => {
      isMounted = false;
    };
  }, [difficulty, subject, getWrongQuestionsForReview]);

  // ============================================
  // 4. COMPUTED VALUES
  // ============================================
  const currentQuestion = useMemo(() => {
    return sessionQuestions[currentQuestionIndex] || null;
  }, [sessionQuestions, currentQuestionIndex]);

  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex === sessionQuestions.length - 1;
  }, [currentQuestionIndex, sessionQuestions.length]);

  const isReviewQuestion = useMemo(() => {
    return currentQuestion ? reviewQuestionIds.includes(currentQuestion.id) : false;
  }, [currentQuestion, reviewQuestionIds]);

  const progressPercentage = useMemo(() => {
    if (sessionQuestions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / sessionQuestions.length) * 100;
  }, [currentQuestionIndex, sessionQuestions.length]);

  const accuracy = useMemo(() => {
    if (sessionStats.total === 0) return 0;
    return Math.round((sessionStats.correct / sessionStats.total) * 100);
  }, [sessionStats]);

  // ============================================
  // 5. ACTIONS (CALLBACKS)
  // ============================================

  /**
   * Seleciona uma resposta
   */
  const selectAnswer = useCallback((index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  }, [showExplanation]);

  /**
   * Confirma a resposta selecionada
   */
  const confirmAnswer = useCallback(() => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Registrar resposta
    recordAnswer(currentQuestion.subject, isCorrect);
    
    // Atualizar stats da sessão
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    
    // Gerenciar questões erradas
    if (isCorrect && isReviewQuestion) {
      // Se acertou uma questão de revisão, registrar
      recordCorrectReview(currentQuestion.id);
    } else if (!isCorrect) {
      // Se errou, adicionar/atualizar na lista de erradas
      recordWrongAnswer(currentQuestion.id, currentQuestion.subject);
    }
    
    // Adicionar XP baseado na dificuldade
    if (isCorrect) {
      const xpMap = { easy: 5, medium: 10, hard: 20 };
      addXP(xpMap[currentQuestion.difficulty]);
    }
    
    setShowExplanation(true);
  }, [
    selectedAnswer, 
    currentQuestion, 
    isReviewQuestion, 
    recordAnswer, 
    recordCorrectReview, 
    recordWrongAnswer, 
    addXP
  ]);

  /**
   * Navega para próxima questão ou finaliza sessão
   */
  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      // Fim da sessão
      onSessionEnd?.();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [isLastQuestion, onSessionEnd]);

  /**
   * Retorna classe de cor baseada na dificuldade
   */
  const getDifficultyColor = useCallback((diff: string): string => {
    const colors = {
      easy: 'text-green-500 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20',
      hard: 'text-red-500 bg-red-100 dark:bg-red-900/20',
    };
    return colors[diff as keyof typeof colors] || colors.medium;
  }, []);

  // ============================================
  // 6. RETURN (Dados e Ações)
  // ============================================
  return {
    // Question State
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: sessionQuestions.length,
    isLastQuestion,
    
    // Answer State
    selectedAnswer,
    showExplanation,
    
    // Session Stats
    sessionStats: {
      ...sessionStats,
      accuracy
    },
    
    // Review State
    isReviewQuestion,
    reviewQuestionIds,
    
    // Progress
    progressPercentage,
    
    // Status
    status,
    
    // Actions
    selectAnswer,
    confirmAnswer,
    nextQuestion,
    getDifficultyColor,
  };
};
