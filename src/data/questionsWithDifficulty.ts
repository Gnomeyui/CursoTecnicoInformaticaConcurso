// Wrapper que adiciona dificuldade automaticamente às questões que não possuem
import { Question, QUESTIONS } from './questions';

/**
 * Classifica automaticamente a dificuldade de uma questão
 * baseado em palavras-chave e complexidade
 */
function autoDifficulty(question: Question): 'facil' | 'medio' | 'dificil' {
  // Se já tem dificuldade, usa ela
  if (question.dificuldade) {
    return question.dificuldade;
  }

  const pergunta = question.pergunta.toLowerCase();
  const materia = question.materia.toLowerCase();

  // Palavras-chave para FÁCIL
  const facilKeywords = [
    'o que é', 'qual é', 'significa', 'quantos',
    'qual comando', 'qual porta', 'responsável por',
    'utiliza', 'função', 'tipo de'
  ];

  // Palavras-chave para DIFÍCIL
  const dificilKeywords = [
    'exceto', 'incorreto', 'não', 'considerando',
    'analise', 'conforme', 'jurisprudência',
    'stf', 'tcu', 'múltiplos'
  ];

  // Palavras-chave para MÉDIO
  const medioKeywords = [
    'diferença', 'comparação', 'quando', 'como',
    'configurar', 'técnico', 'administrador',
    'melhor', 'adequado', 'recomendado'
  ];

  // Tamanho da pergunta
  const isLong = pergunta.length > 200;
  const isVeryLong = pergunta.length > 300;

  // Verifica palavras-chave
  const hasFacil = facilKeywords.some(kw => pergunta.includes(kw));
  const hasDificil = dificilKeywords.some(kw => pergunta.includes(kw));
  const hasMedio = medioKeywords.some(kw => pergunta.includes(kw));

  // Matérias complexas
  const isDificultMateria = 
    materia.includes('constitucional') ||
    materia.includes('administrativo') ||
    materia.includes('jurisprudência');

  // Lógica de classificação
  if (hasDificil || isVeryLong) {
    return 'dificil';
  }

  if (hasMedio || isLong || isDificultMateria) {
    return 'medio';
  }

  if (hasFacil) {
    return 'facil';
  }

  // Padrão: médio
  return 'medio';
}

/**
 * Questões com dificuldade garantida
 * Adiciona automaticamente quando não existir
 */
export const QUESTIONS_WITH_DIFFICULTY: Question[] = QUESTIONS.map(q => ({
  ...q,
  dificuldade: q.dificuldade || autoDifficulty(q)
}));
