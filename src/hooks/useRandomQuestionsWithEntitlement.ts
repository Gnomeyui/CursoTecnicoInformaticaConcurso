/**
 * HOOK - USE RANDOM QUESTIONS WITH ENTITLEMENT
 * Hook que aplica regras de premium ao buscar questões aleatórias
 * 
 * ✅ USA USE CASES COM LÓGICA DE NEGÓCIO
 */

import { useState, useContext } from 'react';
import { useCases } from '../core/container';
import { Question } from '../domain/Question';
import { QuestionFilters } from '../domain/repositories/QuestionRepository';
import { AppStateContext } from '../context/AppState/AppStateContext';

export function useRandomQuestionsWithEntitlement() {
  const { state } = useContext(AppStateContext);
  const user = state.user;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuestions = async (limit: number, filters?: QuestionFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      // USA USE CASE COM ENTITLEMENT
      const data = await useCases.getRandomQuestionsWithEntitlement.execute(user, limit, filters);
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
