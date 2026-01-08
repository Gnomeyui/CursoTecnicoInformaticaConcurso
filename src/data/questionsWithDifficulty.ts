// src/data/questionsWithDifficulty.ts
// ====================================================================
// ARQUIVO LIMPO - Preparado para Supabase
// ====================================================================
// A classificação de dificuldade agora é gerenciada no backend
// As questões virão com dificuldade já definida do banco de dados
// ====================================================================

import { Question } from './questions';

/**
 * Classifica automaticamente a dificuldade de uma questão
 * baseado em palavras-chave e complexidade
 * 
 * NOTA: Esta função está mantida apenas como referência.
 * No sistema real, a dificuldade vem do banco de dados.
 */
function autoDifficulty(question: Question): 'easy' | 'medium' | 'hard' {
  // Se já tem dificuldade, usa ela
  if (question.difficulty) {
    return question.difficulty;
  }

  const pergunta = question.question.toLowerCase();
  const materia = question.subject.toLowerCase();

  // Palavras-chave para FÁCIL (easy)
  const facilKeywords = [
    'o que é', 'qual é', 'significa', 'quantos',
    'qual comando', 'qual porta', 'responsável por',
    'utiliza', 'função', 'tipo de'
  ];

  // Palavras-chave para DIFÍCIL (hard)
  const dificilKeywords = [
    'exceto', 'incorreto', 'não', 'considerando',
    'analise', 'conforme', 'jurisprudência',
    'stf', 'tcu', 'múltiplos'
  ];

  // Palavras-chave para MÉDIO (medium)
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
    return 'hard';
  }

  if (hasMedio || isLong || isDificultMateria) {
    return 'medium';
  }

  if (hasFacil) {
    return 'easy';
  }

  // Padrão: médio
  return 'medium';
}

/**
 * Questões com dificuldade garantida
 * 
 * ⚠️ Array vazio: Todas as questões agora vêm do Supabase
 * com dificuldade já classificada no banco de dados.
 */
export const questionsWithDifficulty: Question[] = [];
