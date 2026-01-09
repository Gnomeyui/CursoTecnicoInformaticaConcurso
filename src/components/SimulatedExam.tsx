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
      <div className="min-h-screen bg-app pb-20">
        <div className="bg-card-theme shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-xl font-bold">Configurar Simulado</h1>
          </div>
        </div>

        <div className="px-[16px] py-[151px] w-full max-w-full mx-[0px] my-[-3px]">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 px-[25px] py-[83px] mx-[-1px] my-[-138px]">
            <div className="text-center mb-[24px] mt-[-20px] mr-[-2px] ml-[0px] px-[12px] py-[18px]">
              <div className={`w-16 h-16 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold">Simulado Inteligente</h2>
              <p className="text-sm text-muted-foreground mt-1">
                70% Questões novas • 30% Revisão baseada nos seus erros
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Quantidade de Questões</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 30, 50].map(c => (
                    <button
                      key={c}
                      onClick={() => setQuestionCount(c)}
                      className={`py-2 rounded-lg font-medium transition-all ${
                        questionCount === c ? `${theme.button} text-white` : 'bg-secondary hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tempo (minutos)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 60, 90, 120].map(t => (
                    <button
                      key={t}
                      onClick={() => setTimeLimit(t)}
                      className={`py-2 rounded-lg font-medium transition-all ${
                        timeLimit === t ? `${theme.button} text-white` : 'bg-secondary hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={startExam}
              disabled={loading}
              className={`w-full mt-8 py-4 ${theme.button} rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-70`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              {loading ? 'Gerando Prova...' : 'Começar Agora'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Running View
  if (examState === 'running' && selectedQuestions.length > 0) {
    const question = selectedQuestions[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-app flex flex-col">
        {/* Header Compacto */}
        <div className="bg-card-theme border-b border-border sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Questão</span>
              <span className="font-bold text-lg">{currentQuestionIndex + 1}/{selectedQuestions.length}</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-secondary'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="h-1 bg-secondary w-full">
            <div 
              className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-300`}
              style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Conteúdo Scrollável */}
        <div className="flex-1 overflow-y-auto p-4 max-w-3xl mx-auto w-full">
          <div className="flex justify-between items-start mb-4">
             <div className="flex gap-2">
                <span className="px-2 py-1 bg-secondary rounded text-xs font-bold uppercase text-muted-foreground">
                  {question.difficulty_level || 'Geral'}
                </span>
                {question.banca && (
                  <span className="px-2 py-1 bg-secondary rounded text-xs font-bold uppercase text-muted-foreground">
                    {question.banca}
                  </span>
                )}
             </div>
             <button onClick={toggleFlag}>
               <Flag className={`w-5 h-5 ${flaggedQuestions.has(currentQuestionIndex) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
             </button>
          </div>

          <p className="text-lg leading-relaxed mb-8 font-medium">
            {question.text}
          </p>

          <div className="space-y-3 pb-20">
            {question.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => selectAnswer(opt.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                  answers[currentQuestionIndex] === opt.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-secondary'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                  answers[currentQuestionIndex] === opt.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {answers[currentQuestionIndex] === opt.id && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navegação */}
        <div className="bg-card-theme border-t border-border p-4 fixed bottom-0 w-full z-10">
          <div className="max-w-3xl mx-auto flex gap-3">
             <button 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(p => p - 1)}
                className="flex-1 py-3 bg-secondary rounded-xl font-bold disabled:opacity-50"
             >
               Anterior
             </button>
             
             {currentQuestionIndex === selectedQuestions.length - 1 ? (
               <button 
                 onClick={finishExam}
                 className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
               >
                 Finalizar
               </button>
             ) : (
               <button 
                 onClick={() => setCurrentQuestionIndex(p => p + 1)}
                 className={`flex-1 py-3 ${theme.button} text-white rounded-xl font-bold`}
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
    return (
      <div className="min-h-screen bg-app p-6 flex flex-col items-center justify-center">
        <div className="bg-card rounded-3xl p-8 shadow-xl w-full max-w-md text-center border border-border">
          <div className="mb-6 inline-flex p-4 rounded-full bg-secondary">
             {accuracy >= 70 ? <Trophy className="w-12 h-12 text-yellow-500" /> : <Target className="w-12 h-12 text-blue-500" />}
          </div>
          
          <h2 className="text-3xl font-bold mb-2">{accuracy >= 70 ? 'Aprovado!' : 'Treino Concluído'}</h2>
          <p className="text-muted-foreground mb-8">
            Você acertou {score} de {selectedQuestions.length} questões.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">{accuracy}%</div>
              <div className="text-xs text-green-600">Aproveitamento</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{score}</div>
              <div className="text-xs text-blue-600">Questões Corretas</div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className={`w-full py-4 ${theme.button} text-white rounded-xl font-bold shadow-lg`}
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return null;
}