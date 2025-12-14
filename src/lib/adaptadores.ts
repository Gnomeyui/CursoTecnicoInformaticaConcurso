/**
 * ADAPTADORES PARA CONVERTER DADOS LEGADOS
 * Converte o formato antigo (QUESTIONS e FLASHCARDS) para o novo ItemEstudo
 */

import { QUESTIONS } from '../data/questions';
import { FLASHCARDS } from '../data/flashcards';
import { engineEstudos } from './EngineEstudos';
import { ItemEstudo } from '../types/estudos';

/**
 * Converte todas as 1.950 questões para o novo formato
 */
export function getTodosBancoQuestoes(): ItemEstudo[] {
  return engineEstudos.converterQuestoesLegacy(QUESTIONS as any);
}

/**
 * Converte todos os flashcards para o novo formato
 */
export function getTodosBancoFlashcards(): ItemEstudo[] {
  return engineEstudos.converterFlashcardsLegacy(FLASHCARDS as any);
}

/**
 * Banco unificado (Questões + Flashcards)
 */
export function getBancoCompleto(): ItemEstudo[] {
  return [
    ...getTodosBancoQuestoes(),
    ...getTodosBancoFlashcards()
  ];
}

/**
 * Filtrar por matéria
 */
export function filtrarPorMateria(banco: ItemEstudo[], materia: string): ItemEstudo[] {
  if (materia === 'Todas') return banco;
  return banco.filter(item => item.materia === materia);
}

/**
 * Obter lista de todas as matérias únicas
 */
export function getTodasMaterias(banco: ItemEstudo[]): string[] {
  const materias = new Set(banco.map(item => item.materia));
  return ['Todas', ...Array.from(materias).sort()];
}

/**
 * Filtrar por tipo (Questão ou Flashcard)
 */
export function filtrarPorTipo(banco: ItemEstudo[], tipo: 'QUESTAO' | 'FLASHCARD'): ItemEstudo[] {
  return banco.filter(item => item.tipo === tipo);
}

/**
 * Obter estatísticas do banco
 */
export function getEstatisticasBanco(banco: ItemEstudo[]) {
  const porMateria: Record<string, number> = {};
  const porTipo: Record<string, number> = { QUESTAO: 0, FLASHCARD: 0 };
  const porDificuldade: Record<string, number> = { facil: 0, medio: 0, dificil: 0 };

  banco.forEach(item => {
    // Por matéria
    porMateria[item.materia] = (porMateria[item.materia] || 0) + 1;
    
    // Por tipo
    porTipo[item.tipo]++;
    
    // Por dificuldade
    if (item.dificuldade) {
      porDificuldade[item.dificuldade]++;
    }
  });

  return {
    total: banco.length,
    porMateria,
    porTipo,
    porDificuldade,
    materiasUnicas: Object.keys(porMateria).length
  };
}
