/**
 * HOOK - USE QUESTIONS WITH ENTITLEMENT
 * Hook que aplica regras de premium ao buscar questões
 * 
 * ✅ USA USE CASES COM LÓGICA DE NEGÓCIO
 */

import { useState, useEffect, useContext } from 'react';
import { useCases } from '../core/container';
import { Question } from '../domain/Question';
import { QuestionFilters } from '../domain/repositories/QuestionRepository';
import { AppStateContext } from '../context/AppState/AppStateContext';

export function useQuestionsWithEntitlement(filters?: QuestionFilters) {
  const { state } = useContext(AppStateContext);
  const user = state.user;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, [JSON.stringify(filters), user.plan]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // USA USE CASE COM ENTITLEMENT
      const data = await useCases.getQuestionsWithEntitlement.execute(user, filters);
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
