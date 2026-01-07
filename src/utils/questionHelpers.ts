import { Question } from '../data/questions';

export interface ShuffledQuestion extends Omit<Question, 'correctAnswer'> {
  correctAnswer: number;
  originalCorrectAnswer: number;
  shuffleMap: number[]; // Mapeamento das posições originais
}

/**
 * Embaralha as alternativas de uma questão e ajusta o índice da resposta correta
 */
export function shuffleQuestionOptions(question: Question): ShuffledQuestion {
  const indices = question.options.map((_, i) => i);
  
  // Algoritmo Fisher-Yates para embaralhar
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Reordenar opções conforme os índices embaralhados
  const shuffledOptions = indices.map(i => question.options[i]);
  
  // Encontrar nova posição da resposta correta
  const newCorrectAnswer = indices.indexOf(question.correctAnswer);
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer,
    originalCorrectAnswer: question.correctAnswer,
    shuffleMap: indices,
  };
}

/**
 * Cria um array de questões mesclando questões novas com questões erradas para revisão
 * @param allQuestions - Todas as questões disponíveis
 * @param wrongQuestionIds - IDs das questões erradas para revisão
 * @param totalDesired - Total de questões desejadas na sessão (padrão: 10)
 * @param wrongPercentage - Porcentagem de questões erradas (padrão: 0.3 = 30%)
 * @returns Array de questões mescladas e embaralhadas
 */
export function mixQuestionsWithReview(
  allQuestions: Question[],
  wrongQuestionIds: number[],
  totalDesired: number = 10,
  wrongPercentage: number = 0.3
): Question[] {
  // Calcular quantas questões erradas incluir (arredondado para cima)
  const wrongCount = Math.min(
    Math.ceil(totalDesired * wrongPercentage),
    wrongQuestionIds.length
  );
  
  // Selecionar questões erradas
  const wrongQuestions = wrongQuestionIds
    .slice(0, wrongCount)
    .map(id => allQuestions.find(q => q.id === id))
    .filter((q): q is Question => q !== undefined);
  
  // Calcular quantas questões novas precisamos
  const newQuestionsNeeded = totalDesired - wrongQuestions.length;
  
  // Filtrar questões que não estão na lista de erradas
  const newQuestions = allQuestions
    .filter(q => !wrongQuestionIds.includes(q.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, newQuestionsNeeded);
  
  // Mesclar e embaralhar
  const mixed = [...wrongQuestions, ...newQuestions]
    .sort(() => Math.random() - 0.5);
  
  return mixed;
}

/**
 * Filtra questões baseado em dificuldade e matéria
 */
export function filterQuestions(
  questions: Question[],
  difficulty?: 'easy' | 'medium' | 'hard' | 'mix',
  subject?: string
): Question[] {
  let filtered = [...questions];
  
  if (difficulty && difficulty !== 'mix') {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  if (subject && subject !== 'all') {
    filtered = filtered.filter(q => q.subject === subject);
  }
  
  return filtered;
}
