import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowLeft, Clock, Trophy, Target, Play, Loader2, 
  Flag, ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useGame } from '../context/GameContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';
import { sqliteService } from '../lib/database/SQLiteService';

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
  dificuldade?: string; 
  opcoes?: any;
  correta?: any;
}

interface SimulatedExamProps {
  onBack: () => void;
}

export function SimulatedExam({ onBack }: SimulatedExamProps) {
  // isDarkMode removido - app é sempre light mode
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

  // Restauração de Backup
  useEffect(() => {
    const checkBackup = () => {
      const backup = localStorage.getItem('exam_backup');
      if (backup && examState === 'config') { 
        try {
          const data = JSON.parse(backup);
          
          // ⚠️ VALIDAR SE O BACKUP É VÁLIDO E NÃO EXPIROU
          if (data.endTime > Date.now() && data.selectedQuestions && data.selectedQuestions.length > 0) {
            if (window.confirm("Existe um simulado em andamento. Deseja continuar?")) {
              setSelectedQuestions(data.selectedQuestions);
              setAnswers(data.answers);
              setFlaggedQuestions(new Set(data.flaggedQuestions));
              setCurrentQuestionIndex(data.currentQuestionIndex);
              endTimeRef.current = data.endTime;
              setQuestionCount(data.questionCount);
              setTimeLimit(data.timeLimit);
              setExamState('running');
              console.log('✅ Simulado restaurado do backup');
            } else {
              localStorage.removeItem('exam_backup');
              console.log('🗑️ Backup descartado pelo usuário');
            }
          } else {
            // Backup inválido ou expirado
            localStorage.removeItem('exam_backup');
            console.log('🗑️ Backup expirado ou inválido removido');
          }
        } catch (error) {
          console.error('❌ Backup corrompido:', error);
          localStorage.removeItem('exam_backup');
        }
      }
    };
    checkBackup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

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

  // 🔥 BUSCAR QUESTÕES DO BANCO SQLITE REAL
  const startExam = async () => {
    setLoading(true);
    try {
      console.log('📚 Buscando questões do banco SQLite...');

      // Inicializar SQLite
      await sqliteService.initialize();

      // Buscar questões do banco real
      const result = await sqliteService.query(
        'SELECT * FROM questions ORDER BY RANDOM() LIMIT ?',
        [questionCount]
      );

      console.log(`📊 ${result.length} questões encontradas no banco`);

      // ⚠️ SE NÃO HOUVER QUESTÕES, MOSTRAR ERRO
      if (result.length === 0) {
        alert(
          '⚠️ Nenhuma Questão Encontrada!\n\n' +
          'O banco de dados está vazio.\n' +
          'Por favor, importe questões antes de iniciar o simulado.'
        );
        setLoading(false);
        return;
      }

      // Converter do formato do banco para o formato do componente
      const allQuestions: Question[] = result.map((q: any) => {
        let options: QuestionOption[] = [];
        
        try {
          const parsedOptions = typeof q.options === 'string' 
            ? JSON.parse(q.options) 
            : q.options;
          
          options = Object.entries(parsedOptions).map(([key, value]) => ({
            id: key.toLowerCase(),
            text: `${key}) ${value}`
          }));
        } catch (error) {
          console.error('Erro ao parsear opções:', error);
        }

        return {
          id: String(q.id),
          text: q.statement,
          options,
          correct_option_id: q.correct_option.toLowerCase(),
          subject_id: q.discipline,
          difficulty_level: 'medio',
          banca: q.banca,
          year: String(q.year || ''),
          exam_name: q.exam_name || 'Simulado'
        };
      });

      if (allQuestions.length === 0) {
        alert('Erro ao processar questões. Tente novamente.');
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

      console.log('✅ Simulado iniciado com sucesso!');

    } catch (error: any) {
      console.error('❌ Erro ao iniciar simulado:', error);
      alert(
        '❌ Erro ao Iniciar Simulado\n\n' +
        `${error.message || 'Erro desconhecido. Tente novamente.'}`
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FINALIZAR COM SEGURANÇA (OFFLINE)
  const finishExam = useCallback(async () => {
    let correctCount = 0;

    selectedQuestions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correct_option_id;

      if (isCorrect) correctCount++;
    });

    // Atualiza estado da UI
    setScore(correctCount);
    setExamState('finished');
    
    // Adicionar XP
    const xpGained = selectedQuestions.length * 10;
    addXP(xpGained);

    // Salvar histórico localmente
    const examHistory = JSON.parse(localStorage.getItem('exam_history') || '[]');
    examHistory.push({
      date: new Date().toISOString(),
      score: Math.round((correctCount / selectedQuestions.length) * 100),
      totalQuestions: selectedQuestions.length,
      correctAnswers: correctCount
    });
    localStorage.setItem('exam_history', JSON.stringify(examHistory));

  }, [selectedQuestions, answers, addXP]);

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

        {/* Conteúdo Central */}
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
                  Modo Offline: Treine com questões selecionadas do banco local.
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

        {/* Botão de Ação */}
        <div className="p-6 bg-app shrink-0">
          <button
            onClick={startExam}
            disabled={loading}
            className={`w-full max-w-md mx-auto py-4 ${theme.button} rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 transition-transform active:scale-95`}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Play className="w-6 h-6 fill-current" />}
            {loading ? 'Preparando...' : 'Iniciar Agora'}
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
      <div className="h-[100dvh] bg-app flex flex-col overflow-hidden">
        
        {/* 1. HEADER */}
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

        {/* 2. CONTEÚDO */}
        <div className="flex-1 overflow-y-auto p-4 w-full max-w-3xl mx-auto flex flex-col">
          
          <div className="space-y-6 my-auto">
            
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

            {/* Opções de Resposta */}
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

        {/* 3. FOOTER */}
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