/**
 * HOOK - USE RANDOM QUESTIONS
 * Hook para buscar questões aleatórias (quiz)
 */

import { useState } from 'react';
import { useCases } from '../core/container';
import { Question } from '../domain/Question';
import { QuestionFilters } from '../domain/repositories/QuestionRepository';

export function useRandomQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuestions = async (limit: number, filters?: QuestionFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await useCases.getRandomQuestions.execute(limit, filters);
      setQuestions(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar questões aleatórias';
      setError(errorMessage);
      console.error('Erro ao buscar questões aleatórias:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    loading,
    error,
    getRandomQuestions,
  };
}
