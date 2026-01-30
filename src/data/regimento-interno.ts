// src/data/regimento-interno.ts
// ====================================================================
// ARQUIVO LIMPO - Preparado para Supabase
// ====================================================================
// O conteúdo do Regimento Interno pode ser armazenado no Supabase
// para facilitar atualizações e gestão de versões
// ====================================================================

export interface RegimentoItem {
  id: string;
  titulo: string;
  conteudo: string;
  artigos: string[];
}

/**
 * ⚠️ Array vazio: O Regimento Interno agora pode vir do Supabase
 * 
 * Para armazenar no banco de dados:
 * 1. Crie uma tabela 'regimento_interno' no Supabase
 * 2. Insira os artigos e conteúdo organizados
 * 3. Implemente função para busca por artigo, título ou palavra-chave
 * 
 * Benefícios:
 * - Facilita atualizações quando o regimento mudar
 * - Permite busca textual avançada (Full Text Search)
 * - Histórico de versões (via timestamps)
 * - Sincronização automática entre dispositivos
 */
export const regimentoInterno: RegimentoItem[] = [];

/**
 * Estrutura completa do documento mantida para referência
 * (pode ser movida para o banco de dados posteriormente)
 */
export const regimentoData = {
  documento: {
    titulo: "Regimento Interno - Exemplo",
    ultima_atualizacao: "Para uso como exemplo de estrutura de dados",
    fonte_arquivo: "exemplo.pdf"
  },
  conteudo: [] as any[] // Conteúdo completo deve vir do Supabase
};

/**
 * Referência para criação da tabela no Supabase:
 * 
 * CREATE TABLE public.regimento_interno (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   titulo TEXT NOT NULL,
 *   capitulo TEXT,
 *   numero_artigo TEXT NOT NULL,
 *   texto_artigo TEXT NOT NULL,
 *   paragrafos TEXT[],
 *   incisos TEXT[],
 *   ordem INTEGER,
 *   versao TEXT DEFAULT '2021',
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * CREATE INDEX idx_regimento_artigo ON public.regimento_interno(numero_artigo);
 * CREATE INDEX idx_regimento_titulo ON public.regimento_interno USING gin(to_tsvector('portuguese', titulo));
 * CREATE INDEX idx_regimento_texto ON public.regimento_interno USING gin(to_tsvector('portuguese', texto_artigo));
 */
