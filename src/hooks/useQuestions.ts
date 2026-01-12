/**
 * HOOK - USE QUESTIONS
 * Hook para buscar questões usando a nova arquitetura
 * UI AGNÓSTICA de onde vêm os dados
 */

import { useState, useEffect } from 'react';
import { useCases } from '../core/container';
import { Question } from '../domain/Question';
import { QuestionFilters } from '../domain/repositories/QuestionRepository';

export function useQuestions(filters?: QuestionFilters) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, [JSON.stringify(filters)]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await useCases.getQuestions.execute(filters);
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar questões');
      console.error('Erro ao carregar questões:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    loadQuestions();
  };

  return {
    questions,
    loading,
    error,
    refresh,
  };
}
