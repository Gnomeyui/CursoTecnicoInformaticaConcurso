import React, { useState, useEffect } from 'react';
import { SmartQuizSession } from '../components/SmartQuizSession';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

/**
 * EXEMPLO 1: Integração Completa com Seleção de Cargo
 * 
 * Este componente mostra como:
 * 1. Buscar lista de cargos do banco
 * 2. Usuário seleciona o cargo desejado
 * 3. Sistema inicia o quiz com o arquétipo correto
 */
export function ExemploIntegracaoCompleta() {
  const [jobRoles, setJobRoles] = useState<any[]>([]);
  const [selectedJobRole, setSelectedJobRole] = useState<any | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Buscar usuário autenticado
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || 'demo-user-id');
    };
    getUser();
  }, []);

  // Buscar lista de cargos
  useEffect(() => {
    const fetchJobRoles = async () => {
      const { data, error } = await supabase
        .from('job_roles')
        .select('*, archetypes(*)') // JOIN com arquétipos
        .order('title');

      if (error) {
        console.error('Erro ao buscar cargos:', error);
      } else {
        setJobRoles(data || []);
      }
    };

    fetchJobRoles();
  }, []);

  const handleStartQuiz = () => {
    if (selectedJobRole) {
      setIsQuizActive(true);
    }
  };

  const handleSessionComplete = (stats: any) => {
    console.log('Sessão completa:', stats);
    setIsQuizActive(false);
    
    // Aqui você pode:
    // - Mostrar celebração
    // - Salvar estatísticas extras
    // - Oferecer próximo estudo
  };

  if (isQuizActive && selectedJobRole && userId) {
    return (
      <SmartQuizSession
        archetypeId={selectedJobRole.archetype_id}
        userId={userId}
        onSessionComplete={handleSessionComplete}
      />
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl mb-6 text-gray-900 dark:text-gray-100">
          Escolha seu Cargo
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selecione o cargo para o qual está estudando:
          </label>
          <select
            value={selectedJobRole?.id || ''}
            onChange={(e) => {
              const job = jobRoles.find(j => j.id === parseInt(e.target.value));
              setSelectedJobRole(job);
            }}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecione...</option>
            {jobRoles.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} - {job.nivel.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {selectedJobRole && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-6">
            <h2 className="text-xl mb-3 text-gray-900 dark:text-gray-100">
              Informações do Cargo
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Cargo:</strong> {selectedJobRole.title}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Nível:</strong> {selectedJobRole.nivel.toUpperCase()}
              </p>
              {selectedJobRole.archetypes && (
                <>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Arquétipo:</strong> {selectedJobRole.archetypes.name}
                  </p>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Distribuição de Matérias:
                    </p>
                    <div className="space-y-1">
                      {selectedJobRole.archetypes.subjects_weights.map((sw: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${sw.weight}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-32">
                            {sw.subject}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 w-12 text-right">
                            {sw.weight}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <button
          onClick={handleStartQuiz}
          disabled={!selectedJobRole}
          className={`
            w-full p-4 rounded-2xl font-semibold text-white transition-all
            ${selectedJobRole
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            }
          `}
        >
          {selectedJobRole ? 'Iniciar Quiz' : 'Selecione um cargo'}
        </button>
      </div>
    </div>
  );
}

/**
 * EXEMPLO 2: Buscar Estatísticas do Usuário
 */
export function ExemploEstatisticas() {
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Buscar perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      // Buscar progresso de questões
      const { data: progressData } = await supabase
        .from('user_question_progress')
        .select('*, questions(text, subject_id)')
        .eq('user_id', user.id)
        .order('last_answered_at', { ascending: false })
        .limit(10);

      setProgress(progressData || []);
    };

    fetchData();
  }, []);

  if (!profile) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Minhas Estatísticas</h1>

      {/* Perfil Geral */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Nível</p>
          <p className="text-3xl font-bold text-blue-500">{profile.nivel}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">XP Total</p>
          <p className="text-3xl font-bold text-yellow-500">{profile.xp}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
          <p className="text-3xl font-bold text-orange-500">{profile.streak_atual} dias</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Precisão</p>
          <p className="text-3xl font-bold text-green-500">
            {parseFloat(profile.precisao_global).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Últimas Questões */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
        <h2 className="text-xl mb-4">Últimas Questões Respondidas</h2>
        <div className="space-y-3">
          {progress.map((p) => (
            <div key={p.question_id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Visualizações: {p.times_viewed}/10
                </span>
                <div className="flex gap-2">
                  {p.is_mastered && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded-full">
                      Masterizada
                    </span>
                  )}
                  {p.is_critical && (
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-xs rounded-full">
                      Crítica
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Acertos: </span>
                  <span className="font-bold text-green-600">{p.times_correct}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Erros: </span>
                  <span className="font-bold text-red-600">{p.times_wrong_total}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Taxa: </span>
                  <span className="font-bold">
                    {p.times_viewed > 0
                      ? ((p.times_correct / p.times_viewed) * 100).toFixed(0)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * EXEMPLO 3: Caderno de Erros (Questões Críticas)
 */
export function ExemploCadernoErros() {
  const [criticalQuestions, setCriticalQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchCriticalQuestions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_question_progress')
        .select(`
          *,
          questions (
            id,
            text,
            options,
            correct_option_id,
            subjects (name)
          )
        `)
        .eq('user_id', user.id)
        .eq('is_critical', true)
        .order('times_wrong_total', { ascending: false });

      setCriticalQuestions(data || []);
    };

    fetchCriticalQuestions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6 text-red-600 dark:text-red-400">
        🚨 Caderno de Erros
      </h1>

      {criticalQuestions.length === 0 ? (
        <div className="bg-green-100 dark:bg-green-900/20 rounded-2xl p-6 text-center">
          <p className="text-green-800 dark:text-green-300">
            Parabéns! Você não tem questões críticas no momento.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {criticalQuestions.map((cq) => (
            <div key={cq.question_id} className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border-2 border-red-300 dark:border-red-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-gray-100 mb-2">
                    {cq.questions.text}
                  </p>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Matéria: {cq.questions.subjects?.name}
                  </span>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Erros</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {cq.times_wrong_total}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resposta Correta:
                </p>
                {cq.questions.options.map((opt: any) => (
                  opt.id === cq.questions.correct_option_id && (
                    <p key={opt.id} className="text-green-700 dark:text-green-400 font-medium">
                      {opt.text}
                    </p>
                  )
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Visualizações: </span>
                  <span className="font-bold">{cq.times_viewed}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Acertos: </span>
                  <span className="font-bold text-green-600">{cq.times_correct}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Taxa: </span>
                  <span className="font-bold">
                    {cq.times_viewed > 0
                      ? ((cq.times_correct / cq.times_viewed) * 100).toFixed(0)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
