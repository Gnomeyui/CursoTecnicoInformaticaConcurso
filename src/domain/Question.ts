/**
 * DOMÍNIO - QUESTÃO
 * Modelo unificado de questão para todo o app
 */

export interface Question {
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: number; // índice da resposta correta (0-3)
  
  // Metadados
  cargo?: string;
  banca?: string;
  ano?: number;
  estado?: string;
  cidade?: string;
  disciplina: string;
  assunto: string;
  
  // Opcionais
  explicacao?: string;
  dificuldade?: 'facil' | 'medio' | 'dificil';
}
