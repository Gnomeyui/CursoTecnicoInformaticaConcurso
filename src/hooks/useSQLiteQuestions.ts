/**
 * ========================================
 * USE SQLITE QUESTIONS - HOOK OFFLINE-FIRST
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Buscar questões do SQLite local (zero custo)
 * - Filtrar por matéria, dificuldade, banca
 * - Suportar paginação e busca
 * - Cache inteligente com TanStack Query
 * 
 * VANTAGENS:
 * ========================================
 * ✅ Instantâneo (lê da memória do celular)
 * ✅ Funciona 100% offline
 * ✅ Zero custo de infraestrutura
 * ✅ Sem rate limits ou quotas
 * ✅ Escalável para milhões de questões
 * 
 * USO:
 * ========================================
 * const { questions, loading, error } = useSQLiteQuestions({
 *   materia: 'Informática',
 *   dificuldade: 'medio',
 *   limite: 20
 * });
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { sqliteService } from '../lib/database/SQLiteService';

// ========================================
// TIPOS
// ========================================

interface QuestionFilters {
  materia?: string;
  dificuldade?: 'facil' | 'medio' | 'dificil';
  banca?: string;
  busca?: string; // Busca textual no enunciado
  limite?: number;
  offset?: number;
}

interface Question {
  id: string;
  examId: number;
  number: number;
  discipline: string;
  statement: string;
  options: string[]; // Array de opções
  correctOption: string; // 'a', 'b', 'c', 'd'
  difficulty?: string;
  explanation?: string;
}

// ========================================
// HOOK PRINCIPAL
// ========================================

/**
 * Hook para buscar questões do SQLite local
 * 
 * FEATURES:
 * - Cache automático (TanStack Query)
 * - Revalidação inteligente
 * - Loading e error states
 * - Filtros múltiplos
 * 
 * @param filters - Filtros de busca
 * @returns Query com questões, loading e error
 */
export function useSQLiteQuestions(
  filters: QuestionFilters = {}
): UseQueryResult<Question[], Error> {
  return useQuery({
    queryKey: ['sqlite-questions', filters],
    queryFn: async () => {
      // 1. Construir query SQL baseada nos filtros
      const { sql, params } = buildQuery(filters);

      // 2. Executar query no SQLite
      console.log('🔍 Buscando questões:', { sql, params });
      const rows = await sqliteService.query(sql, params);

      // 3. Transformar resultados
      const questions = rows.map((row) => ({
        id: row.id || String(row.question_number),
        examId: row.exam_id,
        number: row.question_number,
        discipline: row.discipline,
        statement: row.statement,
        options: parseOptions(row.options),
        correctOption: row.correct_option,
        difficulty: row.difficulty,
        explanation: row.explanation,
      }));

      console.log(`✅ ${questions.length} questões encontradas`);
      return questions;
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    gcTime: 1000 * 60 * 30, // Manter em memória por 30 minutos
  });
}

// ========================================
// QUERY BUILDER
// ========================================

/**
 * Constrói query SQL baseada nos filtros
 * 
 * EXEMPLOS:
 * 
 * Filtro simples:
 * { materia: 'Informática' }
 * → SELECT * FROM questions WHERE discipline = 'Informática'
 * 
 * Filtro múltiplo:
 * { materia: 'Informática', dificuldade: 'medio' }
 * → SELECT * FROM questions WHERE discipline = 'Informática' AND difficulty = 'medio'
 * 
 * Com busca textual:
 * { busca: 'Linux' }
 * → SELECT * FROM questions WHERE statement LIKE '%Linux%'
 * 
 * @param filters - Filtros de busca
 * @returns { sql, params } para executar no SQLite
 */
function buildQuery(filters: QuestionFilters): { sql: string; params: any[] } {
  const conditions: string[] = [];
  const params: any[] = [];

  // Base da query
  let sql = 'SELECT * FROM questions';

  // ========================================
  // FILTRO: MATÉRIA
  // ========================================
  if (filters.materia) {
    conditions.push('discipline = ?');
    params.push(filters.materia);
  }

  // ========================================
  // FILTRO: DIFICULDADE
  // ========================================
  if (filters.dificuldade) {
    conditions.push('difficulty = ?');
    params.push(filters.dificuldade);
  }

  // ========================================
  // FILTRO: BANCA (se tiver na migration)
  // ========================================
  if (filters.banca) {
    // Busca via JOIN com tabela exams
    sql = `
      SELECT q.* 
      FROM questions q
      JOIN exams e ON q.exam_id = e.id
    `;
    conditions.push('e.banca = ?');
    params.push(filters.banca);
  }

  // ========================================
  // FILTRO: BUSCA TEXTUAL
  // ========================================
  if (filters.busca && filters.busca.trim()) {
    conditions.push('statement LIKE ?');
    params.push(`%${filters.busca}%`);
  }

  // ========================================
  // MONTAR WHERE
  // ========================================
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // ========================================
  // ORDENAÇÃO ALEATÓRIA
  // ========================================
  // Mistura as questões para cada execução (evita decorar ordem)
  sql += ' ORDER BY RANDOM()';

  // ========================================
  // LIMITE E PAGINAÇÃO
  // ========================================
  if (filters.limite) {
    sql += ' LIMIT ?';
    params.push(filters.limite);
  }

  if (filters.offset) {
    sql += ' OFFSET ?';
    params.push(filters.offset);
  }

  return { sql, params };
}

// ========================================
// PARSERS
// ========================================

/**
 * Parse opções de JSON string para array
 * 
 * FORMATO NO BANCO:
 * "{\"a\": \"Opção A\", \"b\": \"Opção B\", \"c\": \"Opção C\", \"d\": \"Opção D\"}"
 * 
 * RETORNO:
 * ["Opção A", "Opção B", "Opção C", "Opção D"]
 */
function parseOptions(optionsJson: string): string[] {
  try {
    const parsed = JSON.parse(optionsJson);

    // Se já é array, retorna direto
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // Se é objeto {a: '...', b: '...'}
    if (typeof parsed === 'object') {
      return Object.values(parsed);
    }

    throw new Error('Formato de opções inválido');
  } catch (error) {
    console.error('Erro ao parsear opções:', error);
    return [];
  }
}

// ========================================
// HOOKS ESPECIALIZADOS
// ========================================

/**
 * Hook para buscar UMA questão específica por ID
 */
export function useSQLiteQuestion(id: string): UseQueryResult<Question | null, Error> {
  return useQuery({
    queryKey: ['sqlite-question', id],
    queryFn: async () => {
      const rows = await sqliteService.query(
        'SELECT * FROM questions WHERE id = ? LIMIT 1',
        [id]
      );

      if (rows.length === 0) {
        return null;
      }

      const row = rows[0];
      return {
        id: row.id || String(row.question_number),
        examId: row.exam_id,
        number: row.question_number,
        discipline: row.discipline,
        statement: row.statement,
        options: parseOptions(row.options),
        correctOption: row.correct_option,
        difficulty: row.difficulty,
        explanation: row.explanation,
      };
    },
    staleTime: 1000 * 60 * 10, // Cache por 10 minutos
  });
}

/**
 * Hook para contar total de questões (com filtros)
 */
export function useSQLiteQuestionCount(
  filters: Omit<QuestionFilters, 'limite' | 'offset'> = {}
): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: ['sqlite-question-count', filters],
    queryFn: async () => {
      // Adaptar query para COUNT
      const { sql: baseSql, params } = buildQuery(filters);
      
      // Substituir SELECT * por SELECT COUNT(*)
      const sql = baseSql.replace('SELECT *', 'SELECT COUNT(*) as total');
      
      // Remover ORDER BY (desnecessário para COUNT)
      const cleanSql = sql.replace(/ORDER BY.*$/i, '');

      const rows = await sqliteService.query(cleanSql, params);
      
      return rows[0]?.total || 0;
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para listar matérias disponíveis (para filtro)
 */
export function useSQLiteDisciplines(): UseQueryResult<string[], Error> {
  return useQuery({
    queryKey: ['sqlite-disciplines'],
    queryFn: async () => {
      const rows = await sqliteService.query(
        'SELECT DISTINCT discipline FROM questions ORDER BY discipline'
      );
      
      return rows.map((r) => r.discipline);
    },
    staleTime: 1000 * 60 * 30, // Cache por 30 minutos (muda pouco)
  });
}

// ========================================
// EXPORTS
// ========================================

export type { Question, QuestionFilters };
