import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Clock, Flag, CheckCircle, XCircle, AlertCircle, 
  Trophy, Target, Play 
} from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface QuestionOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correct_option_id: string;
  subject_id: string;
  difficulty_level: 'facil' | 'medio' | 'dificil';
  year?: string;
  banca?: string;
  exam_name?: string;
}

interface SimulatedExamProps {
  onBack: () => void;
}

export function SimulatedExam({ onBack }: SimulatedExamProps) {
  const { isDarkMode } = useTheme();
  const { recordSimulatedExam } = useGame();
  const { selectedProfile } = useConcursoProfile();
  
  // Estados principais
  const [examState, setExamState] = useState<'config' | 'running' | 'finished'>('config');
  const [questionCount, setQuestionCount] = useState(30);
  const [timeLimit, setTimeLimit] = useState(60); // minutos
  
  // Estados da prova
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const endTimeRef = useRef<number>(0);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  // Timer com Timestamp (funciona em background)
  useEffect(() => {
    if (examState === 'running') {
      const timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          finishExam();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examState]);

  // Persistência automática do simulado
  useEffect(() => {
    if (examState === 'running') {
      const examBackup = {
        selectedQuestions,
        answers,
        flaggedQuestions: Array.from(flaggedQuestions),
        currentQuestionIndex,
        endTime: endTimeRef.current,
        questionCount,
        timeLimit
      };
      localStorage.setItem('exam_backup', JSON.stringify(examBackup));
    } else {
      localStorage.removeItem('exam_backup');
    }
  }, [examState, answers, currentQuestionIndex, flaggedQuestions]);

  // Restaurar simulado ao carregar
  useEffect(() => {
    const backup = localStorage.getItem('exam_backup');
    if (backup) {
      try {
        const data = JSON.parse(backup);
        const now = Date.now();
        
        // Só restaura se ainda tem tempo
        if (data.endTime > now) {
          setSelectedQuestions(data.selectedQuestions);
          setAnswers(data.answers);
          setFlaggedQuestions(new Set(data.flaggedQuestions));
          setCurrentQuestionIndex(data.currentQuestionIndex);
          endTimeRef.current = data.endTime;
          setQuestionCount(data.questionCount);
          setTimeLimit(data.timeLimit);
          setExamState('running');
        } else {
          localStorage.removeItem('exam_backup');
        }
      } catch (error) {
        console.error('Erro ao restaurar simulado:', error);
        localStorage.removeItem('exam_backup');
      }
    }
  }, []);

  // 🔥 BUSCAR QUESTÕES INTELIGENTES DO SUPABASE
  const startExam = async () => {
    setLoading(true);

    try {
      // ID do usuário (pode vir de autenticação - por enquanto usa um ID fixo ou do localStorage)
      const userId = localStorage.getItem('user_id') || 'guest-user';
      
      // ID do arquétipo baseado no perfil selecionado
      const archetypeId = selectedProfile?.archetypeId || 1;

      // Chamar função RPC do Supabase
      const { data, error } = await supabase.rpc('get_smart_questions', {
        p_user_id: userId,
        p_archetype_id: archetypeId,
        p_limit: questionCount
      });

      if (error) {
        console.error('Erro ao buscar questões:', error);
        alert('Erro ao carregar simulado. Verifique o console.');
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        alert('Não há questões disponíveis para este perfil no momento!');
        setLoading(false);
        return;
      }

      // Configurar simulado
      setSelectedQuestions(data);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setFlaggedQuestions(new Set());
      endTimeRef.current = Date.now() + (timeLimit * 60 * 1000);
      setExamState('running');
      setLoading(false);
    } catch (error) {
      console.error('Erro ao iniciar simulado:', error);
      alert('Erro ao iniciar simulado');
      setLoading(false);
    }
  };

  // 🔥 FINALIZAR SIMULADO E SALVAR NO BANCO
  const finishExam = async () => {
    // Calcular pontuação
    let correctCount = 0;
    const userId = localStorage.getItem('user_id') || 'guest-user';

    // Processar cada questão respondida
    for (let index = 0; index < selectedQuestions.length; index++) {
      const question = selectedQuestions[index];
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correct_option_id;

      if (isCorrect) {
        correctCount++;
      }

      // 🔥 SALVAR PROGRESSO NO BANCO DE DADOS
      if (userAnswer) {
        try {
          // Buscar progresso atual
          const { data: progress } = await supabase
            .from('user_question_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('question_id', question.id)
            .single();

          const currentStats = progress || {
            times_viewed: 0,
            times_correct: 0,
            times_wrong_total: 0
          };

          const updates = {
            user_id: userId,
            question_id: question.id,
            times_viewed: currentStats.times_viewed + 1,
            last_answered_at: new Date().toISOString(),
            times_correct: isCorrect 
              ? currentStats.times_correct + 1 
              : currentStats.times_correct,
            times_wrong_total: !isCorrect 
              ? currentStats.times_wrong_total + 1 
              : currentStats.times_wrong_total,
            is_mastered: false,
            is_critical: false
          };

          // 🔥 APLICAR REGRAS DE OURO
          if (isCorrect && updates.times_correct > 4) {
            updates.is_mastered = true; // Nunca mais aparece
          }
          if (!isCorrect && updates.times_wrong_total > 6) {
            updates.is_critical = true; // Vai para a UTI
          }

          // Salvar no banco
          await supabase.from('user_question_progress').upsert(updates);
        } catch (error) {
          console.error('Erro ao salvar progresso:', error);
        }
      }
    }

    setScore(correctCount);
    setExamState('finished');
    recordSimulatedExam();
  };

  const selectAnswer = (answerOptionId: string) => {
    // Feedback tátil
    try {
      Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.log('Haptics não disponível');
    }
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerOptionId
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const progress = selectedQuestions.length > 0 
    ? ((currentQuestionIndex + 1) / selectedQuestions.length) * 100 
    : 0;
  const answeredCount = Object.keys(answers).length;

  // 🎨 TELA DE CONFIGURAÇÃO
  if (examState === 'config') {
    return (
      <div className="min-h-screen bg-app">
        <div className="bg-card-theme shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                aria-label="Voltar para o menu principal"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-2xl text-app">Modo Simulado</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure seu simulado inteligente
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
          <div className="bg-card-theme rounded-2xl p-8 shadow-lg space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-theme rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl text-app mb-2">Simulado Inteligente</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Questões personalizadas do Supabase para {selectedProfile?.name || 'seu perfil'}
              </p>
            </div>

            {/* Número de Questões */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Número de Questões
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 30, 40, 50].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-xl transition-all ${
                      questionCount === count
                        ? 'bg-gradient-theme text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Tempo Limite */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Tempo Limite (minutos)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 45, 60, 90].map(time => (
                  <button
                    key={time}
                    onClick={() => setTimeLimit(time)}
                    className={`py-3 rounded-xl transition-all ${
                      timeLimit === time
                        ? 'bg-gradient-theme text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {time}min
                  </button>
                ))}
              </div>
            </div>

            {/* Avisos */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="mb-2"><strong>Sistema Inteligente:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Questões adaptadas ao seu perfil de concurso</li>
                    <li>Acertos salvos automaticamente (Mastered após 4 acertos)</li>
                    <li>Erros rastreados para revisão (UTI após 6 erros)</li>
                    <li>Estatísticas sincronizadas com o banco de dados</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Botão Iniciar */}
            <button
              onClick={startExam}
              disabled={loading}
              className="w-full bg-gradient-theme text-white py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              {loading ? 'Carregando Questões...' : 'Iniciar Simulado'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🎯 PROVA EM ANDAMENTO
  if (examState === 'running' && currentQuestion) {
    const isLowTime = timeRemaining < 300; // Menos de 5 minutos

    return (
      <div className="min-h-screen bg-app">
        {/* Header com Timer */}
        <div className="bg-card-theme shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Questão {currentQuestionIndex + 1} de {selectedQuestions.length}
                </div>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isLowTime 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-theme h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto">
          {/* Questão Principal */}
          <div className="flex-1 space-y-4">
            <div className="bg-card-theme rounded-2xl p-6 shadow-lg">
              {/* Metadados e Marcar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {currentQuestion.year && (
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      📅 {currentQuestion.year}
                    </span>
                  )}
                  {currentQuestion.banca && (
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      🏛️ {currentQuestion.banca}
                    </span>
                  )}
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                    {currentQuestion.difficulty_level}
                  </span>
                </div>
                <button
                  onClick={toggleFlag}
                  className={`p-2 rounded-lg transition-colors ${
                    flaggedQuestions.has(currentQuestionIndex)
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Pergunta */}
              <h3 className="text-lg text-app mb-6 leading-relaxed">
                {currentQuestion.text}
              </h3>

              {/* Opções */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestionIndex] === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => selectAnswer(option.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <span className="uppercase text-sm font-bold opacity-60 w-6">
                          {option.id})
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 flex-1">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navegação */}
            <div className="flex gap-3">
              <button
                onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                ← Anterior
              </button>
              <button
                onClick={() => goToQuestion(Math.min(selectedQuestions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === selectedQuestions.length - 1}
                className="flex-1 py-3 bg-gradient-theme text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Próxima →
              </button>
            </div>

            {/* Finalizar */}
            <button
              onClick={finishExam}
              className="w-full py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-bold"
            >
              <CheckCircle className="w-5 h-5" />
              Finalizar Simulado ({answeredCount}/{selectedQuestions.length} respondidas)
            </button>
          </div>

          {/* Mapa de Questões */}
          <div className="lg:w-80">
            <div className="bg-card-theme rounded-2xl p-4 shadow-lg sticky top-24">
              <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-semibold">
                Mapa de Questões
              </h4>
              <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto">
                {selectedQuestions.map((_, index) => {
                  const isAnswered = answers.hasOwnProperty(index);
                  const isFlagged = flaggedQuestions.has(index);
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`aspect-square rounded-lg text-sm flex items-center justify-center relative font-semibold ${
                        isCurrent
                          ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                          : isAnswered
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {index + 1}
                      {isFlagged && (
                        <Flag className="w-3 h-3 absolute -top-1 -right-1 text-yellow-500" fill="currentColor" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  Atual
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded" />
                  Respondida
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 rounded" />
                  Não respondida
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🏆 RESULTADO
  if (examState === 'finished') {
    const accuracy = Math.round((score / selectedQuestions.length) * 100);
    const isPassed = accuracy >= 70;

    return (
      <div className="min-h-screen bg-app">
        <div className="px-4 sm:px-6 py-8 max-w-4xl mx-auto">
          <div className="bg-card-theme rounded-2xl p-8 shadow-lg">
            {/* Resultado Principal */}
            <div className="text-center mb-8">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isPassed 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : 'bg-gradient-to-br from-orange-400 to-red-500'
              }`}>
                {isPassed ? (
                  <Trophy className="w-16 h-16 text-white" />
                ) : (
                  <Target className="w-16 h-16 text-white" />
                )}
              </div>
              
              <h2 className="text-3xl text-app mb-2 font-bold">
                {isPassed ? 'Parabéns!' : 'Continue Estudando!'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isPassed 
                  ? 'Você teve um excelente desempenho!'
                  : 'Revise os conteúdos e tente novamente'
                }
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl text-blue-600 dark:text-blue-400 mb-1 font-bold">
                  {accuracy}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Acurácia</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl text-green-600 dark:text-green-400 mb-1 font-bold">
                  {score}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl text-red-600 dark:text-red-400 mb-1 font-bold">
                  {selectedQuestions.length - score}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Erros</div>
              </div>
            </div>

            {/* Info do Sistema Inteligente */}
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-bold mb-1">✅ Dados Salvos no Banco!</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Progresso sincronizado com o Supabase</li>
                    <li>Questões certas contabilizadas para "Mastered"</li>
                    <li>Questões erradas marcadas para revisão</li>
                    <li>Estatísticas disponíveis no dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Revisão de Questões */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <h3 className="text-lg text-app mb-4 font-bold">Revisão das Questões</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedQuestions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correct_option_id;
                  const wasAnswered = userAnswer !== undefined;

                  return (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : wasAnswered ? (
                            <XCircle className="w-6 h-6 text-red-500" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Questão {index + 1} - {question.difficulty_level}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white mb-2">
                            {question.text}
                          </div>
                          {wasAnswered && !isCorrect && (
                            <div className="text-xs space-y-1">
                              <div className="text-red-600 dark:text-red-400">
                                ❌ Sua resposta: {question.options.find(o => o.id === userAnswer)?.text}
                              </div>
                              <div className="text-green-600 dark:text-green-400 font-medium">
                                ✅ Correta: {question.options.find(o => o.id === question.correct_option_id)?.text}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={() => setExamState('config')}
                className="flex-1 py-3 bg-gradient-theme text-white rounded-xl hover:shadow-lg transition-all font-bold"
              >
                🔄 Novo Simulado
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-bold"
              >
                🏠 Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
