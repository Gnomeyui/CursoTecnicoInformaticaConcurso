import { Question } from '../data/questions';

export interface QuestionHistory {
  questionId: number;
  lastSeen: string; // ISO date
  timesAnswered: number;
  timesCorrect: number;
  timesWrong: number;
  lastResult: 'correct' | 'wrong' | null;
}

export interface QuestionStats {
  [questionId: number]: QuestionHistory;
}

const STORAGE_KEY = 'alerr_question_history';

/**
 * Carrega o histórico de questões do localStorage
 */
export function loadQuestionHistory(): QuestionStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
  }
  return {};
}

/**
 * Salva o histórico de questões no localStorage
 */
export function saveQuestionHistory(history: QuestionStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
  }
}

/**
 * Registra que uma questão foi respondida
 */
export function recordAnswer(
  questionId: number, 
  wasCorrect: boolean
): void {
  const history = loadQuestionHistory();
  const existing = history[questionId];

  if (existing) {
    history[questionId] = {
      ...existing,
      lastSeen: new Date().toISOString(),
      timesAnswered: existing.timesAnswered + 1,
      timesCorrect: wasCorrect ? existing.timesCorrect + 1 : existing.timesCorrect,
      timesWrong: wasCorrect ? existing.timesWrong : existing.timesWrong + 1,
      lastResult: wasCorrect ? 'correct' : 'wrong'
    };
  } else {
    history[questionId] = {
      questionId,
      lastSeen: new Date().toISOString(),
      timesAnswered: 1,
      timesCorrect: wasCorrect ? 1 : 0,
      timesWrong: wasCorrect ? 0 : 1,
      lastResult: wasCorrect ? 'correct' : 'wrong'
    };
  }

  saveQuestionHistory(history);
}

/**
 * Verifica quantos dias se passaram desde a última vez que viu a questão
 */
function daysSinceLastSeen(lastSeen: string): number {
  const last = new Date(lastSeen);
  const now = new Date();
  const diff = now.getTime() - last.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Calcula o peso de uma questão para revisão
 * Quanto MAIOR o peso, mais prioritária para aparecer
 */
function calculateReviewWeight(history: QuestionHistory | undefined): number {
  if (!history) return 1000; // Questão nova = prioridade máxima

  const days = daysSinceLastSeen(history.lastSeen);
  const errorRate = history.timesAnswered > 0 
    ? history.timesWrong / history.timesAnswered 
    : 0;

  // Questões que você ERROU voltam mais rápido
  if (history.lastResult === 'wrong') {
    if (days >= 2) return 500; // Errou há 2+ dias = revisar AGORA
    if (days >= 1) return 300; // Errou ontem = revisar logo
    return 50; // Errou hoje = não repetir tanto
  }

  // Questões que você ACERTOU voltam mais devagar
  if (history.lastResult === 'correct') {
    if (days >= 7) return 200; // Acertou há 7+ dias = revisar
    if (days >= 3) return 100; // Acertou há 3+ dias = pode revisar
    return 10; // Acertou recentemente = baixa prioridade
  }

  // Taxa de erro alta = prioridade alta
  if (errorRate > 0.5) return 400; // Erra mais que acerta = foco!
  if (errorRate > 0.3) return 250; // Erra às vezes = revisar

  return 150; // Caso padrão
}

/**
 * Seleciona questões de forma inteligente:
 * - A cada 10 questões: 7 novas + 2 erradas antigas + 1 acertada antiga
 * - Nunca repete questão na mesma sessão
 * - Embaralha tudo no final
 */
export function selectSmartQuestions(
  allQuestions: Question[],
  count: number,
  sessionUsedIds: Set<number> = new Set()
): Question[] {
  const history = loadQuestionHistory();
  
  // Separar questões por categoria
  const neverSeen: Question[] = [];
  const wrongBefore: Question[] = [];
  const correctBefore: Question[] = [];

  allQuestions.forEach(q => {
    // Pular questões já usadas nesta sessão
    if (sessionUsedIds.has(q.id)) return;

    const hist = history[q.id];
    
    if (!hist) {
      neverSeen.push(q);
    } else if (hist.lastResult === 'wrong') {
      wrongBefore.push(q);
    } else if (hist.lastResult === 'correct') {
      correctBefore.push(q);
    } else {
      neverSeen.push(q);
    }
  });

  // Ordenar por peso (prioridade)
  wrongBefore.sort((a, b) => {
    const weightA = calculateReviewWeight(history[a.id]);
    const weightB = calculateReviewWeight(history[b.id]);
    return weightB - weightA; // Maior peso primeiro
  });

  correctBefore.sort((a, b) => {
    const weightA = calculateReviewWeight(history[a.id]);
    const weightB = calculateReviewWeight(history[b.id]);
    return weightB - weightA;
  });

  // Embaralhar questões novas
  shuffleArray(neverSeen);

  // Calcular proporções (a cada 10 questões: 7 novas, 2 erradas, 1 acertada)
  const newCount = Math.floor(count * 0.7); // 70% novas
  const wrongCount = Math.floor(count * 0.2); // 20% erradas
  const correctCount = count - newCount - wrongCount; // 10% acertadas

  const selected: Question[] = [];

  // Adicionar questões novas
  selected.push(...neverSeen.slice(0, newCount));

  // Adicionar questões erradas (alta prioridade)
  selected.push(...wrongBefore.slice(0, wrongCount));

  // Adicionar questões acertadas (revisão)
  selected.push(...correctBefore.slice(0, correctCount));

  // Se não tiver questões suficientes, preencher com o que tiver
  if (selected.length < count) {
    const remaining = count - selected.length;
    const pool = [...neverSeen, ...wrongBefore, ...correctBefore]
      .filter(q => !selected.includes(q))
      .slice(0, remaining);
    selected.push(...pool);
  }

  // IMPORTANTE: Embaralhar tudo no final para misturar novas com revisões
  shuffleArray(selected);

  return selected.slice(0, count);
}

/**
 * Embaralha as alternativas de uma questão (muda ordem A/B/C/D)
 */
export function shuffleQuestionOptions(question: Question): Question {
  const options = [...question.opcoes];
  const correctAnswer = question.correta;
  const correctText = options[correctAnswer];

  // Embaralhar array de opções
  shuffleArray(options);

  // Encontrar nova posição da resposta correta
  const newCorrectIndex = options.indexOf(correctText);

  return {
    ...question,
    opcoes: options,
    correta: newCorrectIndex
  };
}

/**
 * Fisher-Yates shuffle (embaralhamento eficiente)
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Obtém estatísticas gerais do usuário
 */
export function getGlobalStats(): {
  totalQuestionsSeen: number;
  totalAnswered: number;
  totalCorrect: number;
  totalWrong: number;
  averageAccuracy: number;
} {
  const history = loadQuestionHistory();
  const entries = Object.values(history);

  const totalQuestionsSeen = entries.length;
  const totalAnswered = entries.reduce((sum, h) => sum + h.timesAnswered, 0);
  const totalCorrect = entries.reduce((sum, h) => sum + h.timesCorrect, 0);
  const totalWrong = entries.reduce((sum, h) => sum + h.timesWrong, 0);
  const averageAccuracy = totalAnswered > 0 
    ? Math.round((totalCorrect / totalAnswered) * 100) 
    : 0;

  return {
    totalQuestionsSeen,
    totalAnswered,
    totalCorrect,
    totalWrong,
    averageAccuracy
  };
}

/**
 * Limpa histórico antigo (opcional - para resetar)
 */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}