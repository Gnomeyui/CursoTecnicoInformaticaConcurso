// src/data/questions.ts
// ====================================================================
// ARQUIVO LIMPO - Preparado para Supabase
// ====================================================================
// As questões agora virão exclusivamente do banco de dados via RPC
// Função: get_smart_questions (definida em /supabase/migrations)
// ====================================================================

export interface Question {
  id: number;
  subject: 'Informática' | 'Legislação' | 'Português' | 'LGPD' | 'Governança de TI';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  // Campos para rastreamento de origem
  banca?: string; // Ex: "CESPE", "FCC", "VUNESP", "IBFC", "FGV", etc.
  ano?: number; // Ex: 2024, 2023, etc.
  concurso?: string; // Ex: "ALE-RR - Técnico em Informática", "TRE-RO - Analista"
}

// Lista de bancas organizadoras comuns (referência para cadastro)
export const bancas = [
  'CESPE/CEBRASPE',
  'FCC',
  'FGV',
  'VUNESP',
  'IBFC',
  'AOCP',
  'IDECAN',
  'QUADRIX',
  'IADES',
  'CONSULPLAN',
  'Outra'
] as const;

// ⚠️ Array vazio: Todas as questões agora vêm do Supabase
export const questions: Question[] = [];
