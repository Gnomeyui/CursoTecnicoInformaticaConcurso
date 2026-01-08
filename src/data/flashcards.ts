// src/data/flashcards.ts
// ====================================================================
// ARQUIVO LIMPO - Preparado para Supabase
// ====================================================================
// Os flashcards agora virão exclusivamente do banco de dados
// Tabela: flashcards (se implementada no Supabase)
// ====================================================================

export interface Flashcard {
  id: number;
  topico: string;
  frente: string;
  verso: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
}

/**
 * ⚠️ Array vazio: Todos os flashcards agora vêm do Supabase
 * 
 * Para popular flashcards no banco de dados:
 * 1. Crie uma tabela 'flashcards' no Supabase
 * 2. Insira os dados via SQL ou interface administrativa
 * 3. Implemente função RPC para busca inteligente (similar a get_smart_questions)
 */
export const flashcards: Flashcard[] = [];

/**
 * Referência para criação da tabela no Supabase:
 * 
 * CREATE TABLE public.flashcards (
 *   id BIGSERIAL PRIMARY KEY,
 *   topico TEXT NOT NULL,
 *   frente TEXT NOT NULL,
 *   verso TEXT NOT NULL,
 *   dificuldade TEXT CHECK (dificuldade IN ('Fácil', 'Média', 'Difícil')),
 *   perfil_concurso_id UUID REFERENCES public.concurso_profiles(id),
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * CREATE INDEX idx_flashcards_perfil ON public.flashcards(perfil_concurso_id);
 * CREATE INDEX idx_flashcards_topico ON public.flashcards(topico);
 */
