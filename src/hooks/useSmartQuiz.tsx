import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Utilitário: Fisher-Yates Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface QuestionOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  shuffledOptions?: QuestionOption[];
  correct_option_id: string;
  subject_id: string;
  difficulty_level: 'facil' | 'medio' | 'dificil';
}

interface UseSmartQuizOptions {
  archetypeId?: number;
  userId?: string;
  questionsPerBlock?: number;
}

export function useSmartQuiz({
  archetypeId,
  userId,
  questionsPerBlock = 10
}: UseSmartQuizOptions = {}) {
  const [queue, setQueue] = useState<Question[]>([]);
  const [mistakesQueue, setMistakesQueue] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentMode, setCurrentMode] = useState<'normal' | 'review_forced'>('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    xpGained: 0
  });

  // Preparar questão com embaralhamento de opções
  const prepareQuestion = useCallback((questionData: Question): Question => {
    const shuffledOptions = shuffleArray([...questionData.options]);
    return { ...questionData, shuffledOptions };
  }, []);

  // Buscar bloco de questões do banco
  const fetchBlock = useCallback(async () => {
    if (!archetypeId || !userId) {
      console.error('archetypeId e userId são obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_smart_questions', {
        p_user_id: userId,
        p_archetype_id: archetypeId,
        p_limit: questionsPerBlock
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const preparedQuestions = data.map(prepareQuestion);
        setQueue(preparedQuestions);
        setCurrentQuestionIndex(0);
        setCurrentMode('normal');
      } else {
        console.warn('Nenhuma questão encontrada para este arquétipo');
      }
    } catch (error) {
      console.error('Erro ao buscar questões:', error);
    } finally {
      setIsLoading(false);
    }
  }, [archetypeId, userId, questionsPerBlock, prepareQuestion]);

  // Atualizar estatísticas no banco
  const updateDatabaseStats = useCallback(async (
    questionId: string,
    isCorrect: boolean
  ) => {
    if (!userId) return;

    try {
      // Atualizar progresso da questão
      await supabase.rpc('update_question_progress', {
        p_user_id: userId,
        p_question_id: questionId,
        p_is_correct: isCorrect
      });

      // Calcular XP ganho (10 XP por acerto, 2 XP por tentativa)
      const xpGain = isCorrect ? 10 : 2;

      // Atualizar perfil do usuário
      await supabase.rpc('update_user_profile', {
        p_user_id: userId,
        p_xp_gain: xpGain,
        p_is_correct: isCorrect
      });

      // Atualizar estatísticas da sessão
      setSessionStats(prev => ({
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        xpGained: prev.xpGained + xpGain
      }));
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
    }
  }, [userId]);

  // Processar resposta do usuário
  const handleAnswer = useCallback(async (
    question: Question,
    selectedOptionId: string
  ) => {
    const isCorrect = selectedOptionId === question.correct_option_id;

    if (currentMode === 'normal') {
      // Modo Normal: Processa estatísticas
      await updateDatabaseStats(question.id, isCorrect);

      if (!isCorrect) {
        // Se errou, joga para a fila de revisão imediata
        const remixedQuestion = prepareQuestion(question);
        setMistakesQueue(prev => [...prev, remixedQuestion]);
      }

      // Avança para próxima questão
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Modo Review (O Loop de 30%): Só sai se acertar
      if (isCorrect) {
        // Remove da fila de erros
        setMistakesQueue(prev => prev.filter(q => q.id !== question.id));
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Se errar de novo na revisão, embaralha e joga pro fim da fila
        const remixedQuestion = prepareQuestion(question);
        setMistakesQueue(prev => {
          const filtered = prev.filter(q => q.id !== question.id);
          return [...filtered, remixedQuestion];
        });
        // Não avança, fica na mesma questão (mas com opções embaralhadas)
      }
    }

    return { isCorrect };
  }, [currentMode, updateDatabaseStats, prepareQuestion]);

  // Obter questão atual
  const getCurrentQuestion = useCallback((): Question | null => {
    // Se acabou o lote normal de 10, verifica se tem erros pra corrigir
    if (currentQuestionIndex >= queue.length && mistakesQueue.length > 0) {
      setCurrentMode('review_forced');
      setQueue(mistakesQueue);
      setMistakesQueue([]);
      setCurrentQuestionIndex(0);
      return mistakesQueue[0];
    }

    // Se acabou tudo
    if (currentQuestionIndex >= queue.length && mistakesQueue.length === 0) {
      return null; // Sessão finalizada
    }

    // Fluxo normal
    return queue[currentQuestionIndex] || null;
  }, [queue, mistakesQueue, currentQuestionIndex]);

  // Resetar sessão
  const resetSession = useCallback(() => {
    setQueue([]);
    setMistakesQueue([]);
    setCurrentQuestionIndex(0);
    setCurrentMode('normal');
    setSessionStats({
      questionsAnswered: 0,
      correctAnswers: 0,
      xpGained: 0
    });
  }, []);

  // Buscar perfil do usuário
  const fetchUserProfile = useCallback(async () => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  }, [userId]);

  return {
    // Estado
    queue,
    mistakesQueue,
    currentQuestionIndex,
    currentMode,
    isLoading,
    sessionStats,

    // Funções
    fetchBlock,
    handleAnswer,
    getCurrentQuestion,
    resetSession,
    fetchUserProfile,

    // Computed
    totalQuestions: queue.length + mistakesQueue.length,
    isSessionComplete: currentQuestionIndex >= queue.length && mistakesQueue.length === 0,
    accuracy: sessionStats.questionsAnswered > 0
      ? (sessionStats.correctAnswers / sessionStats.questionsAnswered) * 100
      : 0
  };
}
