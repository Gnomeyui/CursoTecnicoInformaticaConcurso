/**
 * HOOK - QUIZ ENGINE
 * Hook refatorado que usa o QuizEngine
 * 
 * ❌ Não busca dados
 * ❌ Não calcula lógica
 * ✅ Orquestra Engine + UI
 */

import { useEffect, useRef, useState } from 'react';
import { QuizEngine } from '../core/QuizEngine';
import { Question } from '../domain/Question';
import { questionRepository } from '../data/repositories/LocalQuestionRepository';
import { resultRepository } from '../data/repositories/ResultRepository';

interface QuizState {
  loading: boolean;
  finished: boolean;
  question: Question | null;
  stats: {
    total: number;
    correct: number;
    wrong: number;
    accuracy: number;
  } | null;
}

export function useQuizEngine() {
  const engineRef = useRef<QuizEngine>();
  const [state, setState] = useState<QuizState>({
    loading: true,
    finished: false,
    question: null,
    stats: null
  });

  if (!engineRef.current) {
    engineRef.current = new QuizEngine();
  }

  useEffect(() => {
    async function load() {
      const questions = await questionRepository.getFree();

      engineRef.current!.load(questions);

      setState({
        loading: false,
        finished: false,
        question: engineRef.current!.getCurrentQuestion(),
        stats: null
      });
    }

    load();
  }, []);

  function answer(selected: number, time: number) {
    const current = engineRef.current!.getCurrentQuestion();
    if (!current) return;

    const isCorrect = current.correta === selected;

    // Registra resposta no engine
    engineRef.current!.answer(current.id, selected, time);

    // Salva resultado para métricas
    resultRepository.add({
      questionId: current.id,
      disciplina: current.disciplina,
      assunto: current.assunto,
      correta: isCorrect,
      tempoSegundos: time,
      data: new Date()
    });

    if (engineRef.current!.hasNext()) {
      setState(prev => ({
        ...prev,
        question: engineRef.current!.getCurrentQuestion()
      }));
    } else {
      setState({
        loading: false,
        finished: true,
        question: null,
        stats: engineRef.current!.getStats()
      });
    }
  }

  function reset() {
    engineRef.current!.reset();

    setState({
      loading: false,
      finished: false,
      question: engineRef.current!.getCurrentQuestion(),
      stats: null
    });
  }

  return {
    ...state,
    answer,
    reset,
    currentIndex: engineRef.current?.getCurrentIndex() || 0,
    totalQuestions: engineRef.current?.getTotalQuestions() || 0
  };
}
