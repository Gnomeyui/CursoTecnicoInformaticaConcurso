/**
 * useDatabaseSeed - Hook para popular o banco com questões iniciais
 * 
 * MODELO HÍBRIDO:
 * - Verifica se banco está vazio
 * - Insere prova + questões em transação
 * - Executa apenas uma vez (idempotente)
 */

import { useEffect, useState } from 'react';
import { sqliteService } from '../lib/database/SQLiteService';
import { seedData } from '../data/seedQuestions';

export function useDatabaseSeed() {
  const [isSeeding, setIsSeeding] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const seedDatabase = async () => {
      try {
        console.log('🌱 Iniciando processo de seed do banco...');

        // 1. Inicializar SQLite
        await sqliteService.initialize();

        // 2. Verificar se já tem questões
        const result = await sqliteService.query('SELECT COUNT(*) as count FROM questions');
        const count = result[0]?.count || 0;

        if (count === 0) {
          console.log('📦 Banco vazio detectado. Inserindo prova e questões...');

          // 3. Inserir o cabeçalho da prova primeiro
          await sqliteService.execute(
            `INSERT INTO exams (banca, orgao, cargo, ano, nivel) VALUES (?, ?, ?, ?, ?)`,
            [
              seedData.exam.banca,
              seedData.exam.orgao,
              seedData.exam.cargo,
              seedData.exam.ano,
              seedData.exam.nivel
            ]
          );

          // 4. Buscar o ID da prova inserida
          const examResult = await sqliteService.query(
            'SELECT id FROM exams WHERE cargo = ? AND ano = ? LIMIT 1',
            [seedData.exam.cargo, seedData.exam.ano]
          );
          const examId = examResult[0]?.id;

          if (!examId) {
            throw new Error('Erro ao obter ID da prova inserida');
          }

          // 5. Inserir questões em transação (mais rápido e seguro)
          const statements = seedData.questions.map(q => ({
            sql: `
              INSERT INTO questions (
                exam_id, question_number, discipline, statement, options, correct_option
              ) VALUES (?, ?, ?, ?, ?, ?)
            `,
            params: [
              examId,
              q.question_number,
              q.discipline,
              q.statement,
              JSON.stringify(q.options), // Converter objeto para JSON string
              q.correct_option
            ]
          }));

          await sqliteService.transaction(statements);

          console.log(`✅ Seed concluído! 1 prova e ${seedData.questions.length} questões inseridas.`);
        } else {
          console.log(`⚡ Banco já populado com ${count} questões. Pulando seed.`);
        }

        setIsReady(true);

      } catch (err) {
        console.error('❌ Erro ao popular banco:', err);
        setError(`Erro ao inicializar banco: ${err}`);
      } finally {
        setIsSeeding(false);
      }
    };

    seedDatabase();
  }, []);

  return { isSeeding, isReady, error };
}
