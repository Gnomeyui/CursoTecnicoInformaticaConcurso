import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WrongQuestionRecord {
  questionId: number;
  subject: string;
  timesShown: number; // Quantas vezes foi mostrada
  lastShown: string; // Data da última vez mostrada
  incorrectCount: number; // Quantas vezes errou
}

interface WrongQuestionsContextType {
  recordWrongAnswer: (questionId: number, subject: string) => void;
  recordCorrectReview: (questionId: number) => void;
  getWrongQuestionsForReview: (maxRepeats?: number) => number[];
  shouldShowQuestion: (questionId: number, maxRepeats?: number) => boolean;
  getQuestionStats: (questionId: number) => WrongQuestionRecord | undefined;
  clearAllWrongQuestions: () => void;
}

const WrongQuestionsContext = createContext<WrongQuestionsContextType | undefined>(undefined);

export function WrongQuestionsProvider({ children }: { children: ReactNode }) {
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestionRecord[]>([]);

  // Carregar dados salvos
  useEffect(() => {
    const saved = localStorage.getItem('alerr_wrong_questions');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setWrongQuestions(data);
      } catch (e) {
        console.error('Erro ao carregar questões erradas:', e);
      }
    }
  }, []);

  // Salvar dados
  useEffect(() => {
    localStorage.setItem('alerr_wrong_questions', JSON.stringify(wrongQuestions));
  }, [wrongQuestions]);

  const recordWrongAnswer = (questionId: number, subject: string) => {
    setWrongQuestions(prev => {
      const existing = prev.find(q => q.questionId === questionId);
      
      if (existing) {
        // Atualizar registro existente
        return prev.map(q => 
          q.questionId === questionId
            ? {
                ...q,
                incorrectCount: q.incorrectCount + 1,
                lastShown: new Date().toISOString(),
              }
            : q
        );
      } else {
        // Criar novo registro
        return [
          ...prev,
          {
            questionId,
            subject,
            timesShown: 1,
            lastShown: new Date().toISOString(),
            incorrectCount: 1,
          }
        ];
      }
    });
  };

  const recordCorrectReview = (questionId: number) => {
    setWrongQuestions(prev => 
      prev.map(q => 
        q.questionId === questionId
          ? {
              ...q,
              timesShown: q.timesShown + 1,
              lastShown: new Date().toISOString(),
            }
          : q
      )
    );
  };

  const getWrongQuestionsForReview = (maxRepeats: number = 2): number[] => {
    // Retorna IDs de questões que ainda não foram mostradas maxRepeats vezes
    return wrongQuestions
      .filter(q => q.timesShown < maxRepeats)
      .sort((a, b) => {
        // Priorizar questões com mais erros
        if (b.incorrectCount !== a.incorrectCount) {
          return b.incorrectCount - a.incorrectCount;
        }
        // Depois, questões mostradas há mais tempo
        return new Date(a.lastShown).getTime() - new Date(b.lastShown).getTime();
      })
      .map(q => q.questionId);
  };

  const shouldShowQuestion = (questionId: number, maxRepeats: number = 2): boolean => {
    const record = wrongQuestions.find(q => q.questionId === questionId);
    if (!record) return true;
    return record.timesShown < maxRepeats;
  };

  const getQuestionStats = (questionId: number): WrongQuestionRecord | undefined => {
    return wrongQuestions.find(q => q.questionId === questionId);
  };

  const clearAllWrongQuestions = () => {
    setWrongQuestions([]);
  };

  return (
    <WrongQuestionsContext.Provider
      value={{
        recordWrongAnswer,
        recordCorrectReview,
        getWrongQuestionsForReview,
        shouldShowQuestion,
        getQuestionStats,
        clearAllWrongQuestions,
      }}
    >
      {children}
    </WrongQuestionsContext.Provider>
  );
}

export function useWrongQuestions() {
  const context = useContext(WrongQuestionsContext);
  if (!context) {
    throw new Error('useWrongQuestions deve ser usado dentro de WrongQuestionsProvider');
  }
  return context;
}
