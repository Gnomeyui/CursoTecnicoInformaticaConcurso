// --- TIPOS PARA O SISTEMA DE ESTUDOS INTELIGENTE ---

export type TipoConteudo = 'QUESTAO' | 'FLASHCARD';

// A menor unidade de resposta
export interface Alternativa {
  id: string;      // Ex: "opt_1"
  texto: string;   // Ex: "Boa Vista"
  correta: boolean; // Onde a verdade mora
}

// O item principal (pode ser Questão ou Flashcard)
export interface ItemEstudo {
  id: string;
  tipo: TipoConteudo;
  materia: string; // Ex: "Linux - Permissões" ou "História de Roraima"
  pergunta: string;
  alternativas: Alternativa[]; // Se for Flashcard, pode ter apenas 1 alternativa (a resposta)
  explicacao?: string; // Opcional
  dificuldade?: 'facil' | 'medio' | 'dificil';
}

// O histórico do usuário (O Cérebro)
export interface EstatisticaMateria {
  respondidas: number;
  erros: number;
  streak: number; // Sequência de acertos
  ultimaRevisao: Date | null;
}

export interface PerfilUsuario {
  // Histórico rápido de acesso: ID da Questão -> Boolean (Já fez?)
  questoesRespondidasIds: Set<string>; 
  
  // Estatísticas agrupadas por matéria (para o algoritmo de peso)
  statsPorMateria: Record<string, EstatisticaMateria>;
}

// Helper para converter Question do formato antigo para ItemEstudo
export interface QuestionLegacy {
  id: number;
  materia: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
}

// Helper para converter Flashcard
export interface FlashcardLegacy {
  id: number;
  topico: string;
  frente: string;
  verso: string;
  dificuldade: string;
}
