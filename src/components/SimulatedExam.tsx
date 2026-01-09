import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, Clock, Flag, CheckCircle, XCircle, AlertCircle, 
  Trophy, Target, Play, Loader2
} from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';
import { supabase } from '../utils/supabase/client';

// Interfaces (Mantidas)
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
  // Mapeamento caso o banco venha em português ou inglês, ajuste conforme seu DB
  dificuldade?: string; 
  opcoes?: any;
  correta?: any;
}

interface SimulatedExamProps {
  onBack: () => void;
}

export function SimulatedExam({ onBack }: SimulatedExamProps) {
  const { isDarkMode } = useTheme();
  const { addXP } = useGame();
  const { selectedProfile } = useConcursoProfile();
  const { settings } = useCustomization();
  const theme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;
  
  // Estados
  const [examState, setExamState] = useState<'config' | 'running' | 'finished'>('config');
  const [questionCount, setQuestionCount] = useState(30);
  const [timeLimit, setTimeLimit] = useState(60); 
  
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const endTimeRef = useRef<number>(0);

  // Timer
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

  // Restauração de Backup (Melhorada para evitar loops)
  useEffect(() => {
    const checkBackup = () => {
      const backup = localStorage.getItem('exam_backup');
      if (backup && examState === 'config') { // Só restaura se estiver na config
        try {
          const data = JSON.parse(backup);
          if (data.endTime > Date.now()) {
            if (window.confirm("Existe um simulado em andamento. Deseja continuar?")) {
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
          } else {
            localStorage.removeItem('exam_backup');
          }
        } catch (error) {
          console.error('Backup corrompido', error);
          localStorage.removeItem('exam_backup');
        }
      }
    };
    checkBackup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executa apenas no mount

  // Salvar Backup
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
    } else if (examState === 'finished') {
      localStorage.removeItem('exam_backup');
    }
  }, [examState, answers, currentQuestionIndex, flaggedQuestions, selectedQuestions, questionCount, timeLimit]);

  // 🔥 LÓGICA CORRIGIDA DE BUSCA DE QUESTÕES
  const startExam = async () => {
    setLoading(true);
    try {
      // 1. Obter Usuário Real
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      if (!userId) {
        alert("Você precisa estar logado para iniciar o simulado.");
        setLoading(false);
        return;
      }

      const archetypeId = selectedProfile?.archetypeId || 1;
      const novasLimit = Math.ceil(questionCount * 0.7);
      const erradasLimit = questionCount - novasLimit;

      // 2. Buscar IDs de questões que o usuário JÁ respondeu
      // Isso substitui a subquery SQL inválida
      const { data: answeredData, error: answeredError } = await supabase
        .from('user_question_progress')
        .select('question_id')
        .eq('user_id', userId);

      if (answeredError) throw answeredError;

      const answeredIds = answeredData?.map(item => item.question_id) || [];

      // 3. Buscar Questões NOVAS (Excluindo as respondidas via filtro JS ou .not.in com array)
      let queryNovas = supabase
        .from('questions')
        .select('*')
        .eq('concurso_perfil_id', archetypeId);
      
      // Se houver questões respondidas, excluí-las
      if (answeredIds.length > 0) {
        // Nota: Se houver MUITAS questões (>1000), isso pode dar erro de URL length.
        // O ideal é usar uma RPC (Stored Procedure) no futuro.
        queryNovas = queryNovas.not('id', 'in', `(${answeredIds.join(',')})`);
      }

      const { data: novasQuestions, error: novasError } = await queryNovas.limit(novasLimit);
      
      if (novasError) throw novasError;

      // 4. Buscar Questões Erradas (Revisão)
      const { data: progressData } = await supabase
        .from('user_question_progress')
        .select('question_id')
        .eq('user_id', userId)
        .eq('is_mastered', false)
        .gt('times_wrong_total', 0) // Só as que errou
        .order('times_wrong_total', { ascending: false })
        .limit(erradasLimit);

      let erradasQuestions: any[] = [];
      if (progressData && progressData.length > 0) {
        const idsRevisao = progressData.map(p => p.question_id);
        const { data: questionsRevisao } = await supabase
          .from('questions')
          .select('*')
          .in('id', idsRevisao);
        erradasQuestions = questionsRevisao || [];
      }

      // 5. Combinar e Fallback
      let allQuestions = [...(novasQuestions || []), ...erradasQuestions];

      // Se ainda faltar questões, pegar aleatórias do banco (fallback)
      if (allQuestions.length < questionCount) {
        const remaining = questionCount - allQuestions.length;
        // Pega IDs que já temos para não repetir
        const currentIds = allQuestions.map(q => q.id);
        
        let queryFallback = supabase
          .from('questions')
          .select('*')
          .eq('concurso_perfil_id', archetypeId);
          
        if (currentIds.length > 0) {
           queryFallback = queryFallback.not('id', 'in', `(${currentIds.join(',')})`);
        }
          
        const { data: fallbackQuestions } = await queryFallback.limit(remaining);
        
        if (fallbackQuestions) {
          allQuestions.push(...fallbackQuestions);
        }
      }

      if (allQuestions.length === 0) {
        alert('Não foram encontradas questões para este perfil.');
        setLoading(false);
        return;
      }

      // Embaralhar
      const shuffled = allQuestions.sort(() => Math.random() - 0.5);

      setSelectedQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setFlaggedQuestions(new Set());
      endTimeRef.current = Date.now() + (timeLimit * 60 * 1000);
      setExamState('running');

    } catch (error: any) {
      console.error('Erro fatal ao iniciar simulado:', error);
      alert(`Erro ao iniciar: ${error.message || 'Verifique sua conexão.'}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FINALIZAR COM SEGURANÇA
  const finishExam = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id; // Se não tiver user, não salva progresso, mas finaliza a UI

    let correctCount = 0;

    selectedQuestions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correct_option_id;

      if (isCorrect) correctCount++;
    });

    // Atualiza estado da UI primeiro para feedback rápido
    setScore(correctCount);
    setExamState('finished');
    
    // Adicionar XP pelo simulado (10 XP por questão respondida)
    const xpGained = selectedQuestions.length * 10;
    addXP(xpGained);

    // Salvar histórico de simulados
    const examHistory = JSON.parse(localStorage.getItem('exam_history') || '[]');
    examHistory.push({
      date: new Date().toISOString(),
      score: Math.round((correctCount / selectedQuestions.length) * 100),
      totalQuestions: selectedQuestions.length,
      correctAnswers: correctCount
    });
    localStorage.setItem('exam_history', JSON.stringify(examHistory));

    // Processamento em Background (não bloqueia UI)
    if (userId) {
      processExamResultsBackground(userId, selectedQuestions, answers);
    }
  }, [selectedQuestions, answers, addXP]);

  // Função auxiliar para salvar sem travar a tela
  const processExamResultsBackground = async (userId: string, questions: Question[], userAnswers: {[key: number]: string}) => {
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      const userAnswer = userAnswers[index];
      if (!userAnswer) continue;

      const isCorrect = userAnswer === question.correct_option_id;

      try {
        const { data: existing } = await supabase
          .from('user_question_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('question_id', question.id)
          .single();

        const current = existing || { times_correct: 0, times_wrong_total: 0, times_viewed: 0 };
        
        const updates = {
          user_id: userId,
          question_id: question.id,
          times_viewed: current.times_viewed + 1,
          last_answered_at: new Date().toISOString(),
          times_correct: isCorrect ? current.times_correct + 1 : current.times_correct,
          times_wrong_total: !isCorrect ? current.times_wrong_total + 1 : current.times_wrong_total,
          is_mastered: (isCorrect && (current.times_correct + 1) > 4),
          is_critical: (!isCorrect && (current.times_wrong_total + 1) > 6)
        };

        await supabase.from('user_question_progress').upsert(updates);
      } catch (err) {
        console.error('Erro sync background', err);
      }
    }
  };

  // Funções de UI
  const selectAnswer = (answerOptionId: string) => {
    try { Haptics.impact({ style: ImpactStyle.Light }); } catch (e) {}
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerOptionId }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.has(currentQuestionIndex) ? newSet.delete(currentQuestionIndex) : newSet.add(currentQuestionIndex);
      return newSet;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // -- RENDERIZAÇÃO (VIEWS) --

  // Config View
  if (examState === 'config') {
    return (
      <div className="h-[100dvh] bg-app flex flex-col">
        {/* Header */}
        <div className="bg-card-theme shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Configurar Simulado</h1>
          </div>
        </div>

        {/* Conteúdo Central com Scroll se precisar */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${theme.gradient} rounded-2xl rotate-3 flex items-center justify-center mx-auto shadow-xl`}>
                <Trophy className="w-10 h-10 text-white -rotate-3" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Simulado Inteligente</h2>
                <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                  Algoritmo que prioriza questões novas e revisa seus erros automaticamente.
                </p>
              </div>
            </div>

            {/* Configurações */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border space-y-6 px-[21px] py-[47px]">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  Quantidade de Questões
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[10, 20, 30, 50].map(c => (
                    <button
                      key={c}
                      onClick={() => setQuestionCount(c)}
                      className={`h-12 rounded-xl font-bold text-sm transition-all border-2 ${
                        questionCount === c 
                          ? `border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300` 
                          : 'border-transparent bg-secondary text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Tempo Limite (minutos)
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[30, 60, 90, 120].map(t => (
                    <button
                      key={t}
                      onClick={() => setTimeLimit(t)}
                      className={`h-12 rounded-xl font-bold text-sm transition-all border-2 ${
                        timeLimit === t 
                          ? `border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300` 
                          : 'border-transparent bg-secondary text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Ação no Rodapé */}
        <div className="p-6 bg-app shrink-0">
          <button
            onClick={startExam}
            disabled={loading}
            className={`w-full max-w-md mx-auto py-4 ${theme.button} rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 transition-transform active:scale-95`}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Play className="w-6 h-6 fill-current" />}
            {loading ? 'Preparando Prova...' : 'Iniciar Agora'}
          </button>
        </div>
      </div>
    );
  }

  // Running View
  if (examState === 'running' && selectedQuestions.length > 0) {
    const question = selectedQuestions[currentQuestionIndex];
    const isLowTime = timeRemaining < 300;

    return (
      // h-[100dvh] garante altura total real do celular
      <div className="h-[100dvh] bg-app flex flex-col overflow-hidden">
        
        {/* 1. HEADER (Fixo no Topo) */}
        <div className="bg-card-theme shadow-sm border-b border-gray-200 dark:border-gray-700 z-20 shrink-0">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Questão</span>
              <span className="font-bold text-lg leading-none text-app">
                {currentQuestionIndex + 1} <span className="text-gray-400 text-sm font-normal">/ {selectedQuestions.length}</span>
              </span>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-sm ${
              isLowTime 
                ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 animate-pulse' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-foreground'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold text-sm">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="h-1 bg-gray-100 dark:bg-gray-800 w-full">
            <div 
              className={`h-full ${theme.button} transition-all duration-500`}
              style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 2. CONTEÚDO (Expande no Meio - flex-1) */}
        <div className="flex-1 overflow-y-auto p-4 w-full max-w-3xl mx-auto flex flex-col">
          
          <div className="space-y-6 my-auto"> {/* my-auto centraliza se for pequeno, mas deixa rolar se for grande */}
            
            {/* Cartão da Pergunta */}
            <div className="bg-card-theme rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30">
                      {question.difficulty_level || 'Geral'}
                    </span>
                    {question.banca && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-gray-50 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                        {question.banca}
                      </span>
                    )}
                 </div>
                 <button onClick={toggleFlag} className="p-1 -mr-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                   <Flag className={`w-5 h-5 ${flaggedQuestions.has(currentQuestionIndex) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                 </button>
              </div>

              <h3 className="text-lg font-medium text-app leading-relaxed">
                {question.text}
              </h3>
            </div>

            {/* Opções de Resposta (Separadas do enunciado) */}
            <div className="space-y-3">
              {question.options.map((opt) => {
                 const isSelected = answers[currentQuestionIndex] === opt.id;
                 return (
                  <button
                    key={opt.id}
                    onClick={() => selectAnswer(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 active:scale-[0.99] group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                        : 'border-transparent bg-white dark:bg-gray-800 shadow-sm hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                    </div>
                    <span className={`text-base ${isSelected ? 'text-blue-900 dark:text-blue-100 font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                      {opt.text}
                    </span>
                  </button>
                 );
              })}
            </div>
          </div>
        </div>

        {/* 3. FOOTER (Fixo no Fundo) */}
        <div className="bg-card-theme border-t border-gray-200 dark:border-gray-800 p-4 shrink-0 z-20">
          <div className="max-w-3xl mx-auto flex gap-4">
             <button 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(p => p - 1)}
                className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold disabled:opacity-50 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
             >
               Anterior
             </button>
             
             {currentQuestionIndex === selectedQuestions.length - 1 ? (
               <button 
                 onClick={finishExam}
                 className="flex-1 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all active:scale-95"
               >
                 Finalizar Prova
               </button>
             ) : (
               <button 
                 onClick={() => setCurrentQuestionIndex(p => p + 1)}
                 className={`flex-1 py-3.5 ${theme.button} text-white rounded-xl font-bold shadow-lg transition-all active:scale-95`}
               >
                 Próxima
               </button>
             )}
          </div>
        </div>
      </div>
    );
  }

  // Result View
  if (examState === 'finished') {
    const accuracy = Math.round((score / selectedQuestions.length) * 100);
    const isPassed = accuracy >= 70;
    
    return (
      <div className="min-h-[100dvh] bg-app flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-card-theme rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 text-center space-y-6">
          {/* Ícone de Resultado */}
          <div className="mb-6 inline-flex p-4 rounded-full bg-secondary">
            {isPassed ? <Trophy className="w-12 h-12 text-yellow-500" /> : <Target className="w-12 h-12 text-blue-500" />}
          </div>
          
          {/* Título e Mensagem */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{isPassed ? 'Aprovado!' : 'Treino Concluído'}</h2>
            <p className="text-muted-foreground">
              Você acertou {score} de {selectedQuestions.length} questões.
            </p>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">{accuracy}%</div>
              <div className="text-xs text-green-600 dark:text-green-500">Aproveitamento</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{score}</div>
              <div className="text-xs text-blue-600 dark:text-blue-500">Questões Corretas</div>
            </div>
          </div>

          {/* Botão de Voltar */}
          <div className="pt-4">
            <button
              onClick={onBack}
              className={`w-full py-3.5 ${theme.button} text-white rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all`}
            >
              VOLTAR AO INÍCIO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}