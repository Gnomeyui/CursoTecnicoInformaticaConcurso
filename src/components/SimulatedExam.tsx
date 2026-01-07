import { Haptics, NotificationType } from '@capacitor/haptics';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import { questions, Question } from '../data/questions';
import { selectSmartQuestions, shuffleQuestionOptions } from '../utils/questionManager';

interface SimulatedExamProps {
  onBack: () => void;
  // 🔧 CORREÇÃO FINAL: Removida prop onComplete - não precisa mais atualizar score manualmente
}

export function SimulatedExam({ onBack }: SimulatedExamProps) {
  const { isDarkMode } = useTheme();
  const { recordSimulatedExam } = useGame();
  const [examState, setExamState] = useState<'config' | 'running' | 'finished'>('config');
  const [questionCount, setQuestionCount] = useState(30);
  const [timeLimit, setTimeLimit] = useState(60); // minutos
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const endTimeRef = useRef<number>(0); // 🔧 CORREÇÃO: Armazena timestamp de término
  const [showExitConfirmation, setShowExitConfirmation] = useState(false); // 🔧 CORREÇÃO: Alerta de saída

  // 🔧 CORREÇÃO: Timer com Timestamp (funciona em background)
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

  // 🔧 CORREÇÃO: Persistência automática do simulado
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

  // 🔧 CORREÇÃO: Restaurar simulado ao carregar
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

  const startExam = () => {
    // Selecionar questões inteligentes
    const selected = selectSmartQuestions(questions, questionCount);
    
    setSelectedQuestions(selected);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions(new Set());
    endTimeRef.current = Date.now() + (timeLimit * 60 * 1000); // converter para milissegundos
    setExamState('running');
  };

  const finishExam = () => {
    // Calcular pontuação
    let correctCount = 0;
    selectedQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setExamState('finished');
    // 🔧 CORREÇÃO: Registrar simulado completado
    recordSimulatedExam();
  };

  const selectAnswer = (answerIndex: number) => {
    // 🔧 CORREÇÃO: Adicionar feedback tátil ao selecionar resposta
    try {
      Haptics.impact({ style: 'light' });
    } catch (error) {
      // Haptics pode não estar disponível no navegador
      console.log('Haptics não disponível');
    }
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
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
  const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  // Configuração
  if (examState === 'config') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-slate-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                aria-label="Voltar para o menu principal"
                className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-2xl text-slate-900 dark:text-white">Modo Simulado</h1>
                <p className="text-sm text-slate-600 dark:text-gray-400">Configure seu simulado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl text-slate-900 dark:text-white mb-2">Simulado de Prova</h2>
              <p className="text-slate-600 dark:text-gray-400">
                Teste seus conhecimentos em condições reais de prova
              </p>
            </div>

            {/* Número de Questões */}
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-2">
                Número de Questões
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 30, 40, 50].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-xl transition-all ${
                      questionCount === count
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Tempo Limite */}
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-2">
                Tempo Limite (minutos)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 45, 60, 90].map(time => (
                  <button
                    key={time}
                    onClick={() => setTimeLimit(time)}
                    className={`py-3 rounded-xl transition-all ${
                      timeLimit === time
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
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
                  <p className="mb-2"><strong>Condições do Simulado:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>O tempo é limitado e será contado regressivamente</li>
                    <li>Você pode marcar questões para revisar depois</li>
                    <li>Não é possível pausar o simulado</li>
                    <li>Resultados serão exibidos ao final</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Botão Iniciar */}
            <button
              onClick={startExam}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Iniciar Simulado
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Prova em Andamento
  if (examState === 'running' && currentQuestion) {
    const isLowTime = timeRemaining < 300; // Menos de 5 minutos

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header com Timer */}
        <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-slate-200 dark:border-gray-700 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-600 dark:text-gray-400">
                  Questão {currentQuestionIndex + 1} de {selectedQuestions.length}
                </div>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isLowTime 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="mt-3 w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto">
          {/* Questão Principal */}
          <div className="flex-1 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              {/* Categoria e Marcar */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm">
                  {currentQuestion.subject}
                </span>
                <button
                  onClick={toggleFlag}
                  className={`p-2 rounded-lg transition-colors ${
                    flaggedQuestions.has(currentQuestionIndex)
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                      : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Pergunta */}
              <h3 className="text-lg text-slate-900 dark:text-white mb-6">
                {currentQuestion.question}
              </h3>

              {/* Opções */}
              <div className="space-y-3">
                {currentQuestion.options.map((opcao, index) => {
                  const isSelected = answers[currentQuestionIndex] === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300 dark:border-gray-600'
                        }`}>
                          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <span className="text-slate-700 dark:text-gray-300">{opcao}</span>
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
                className="flex-1 py-3 bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-xl hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => goToQuestion(Math.min(selectedQuestions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === selectedQuestions.length - 1}
                className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>

            {/* Finalizar */}
            <button
              onClick={finishExam}
              className="w-full py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Finalizar Simulado ({answeredCount}/{selectedQuestions.length} respondidas)
            </button>
          </div>

          {/* Mapa de Questões */}
          <div className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg sticky top-24">
              <h4 className="text-sm text-slate-700 dark:text-gray-300 mb-3">Mapa de Questões</h4>
              <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto">
                {selectedQuestions.map((_, index) => {
                  const isAnswered = answers.hasOwnProperty(index);
                  const isFlagged = flaggedQuestions.has(index);
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`aspect-square rounded-lg text-sm flex items-center justify-center relative ${
                        isCurrent
                          ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                          : isAnswered
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-600'
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

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-gray-700 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  Atual
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                  <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded" />
                  Respondida
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                  <div className="w-4 h-4 bg-slate-100 dark:bg-gray-700 rounded" />
                  Não respondida
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Resultado
  if (examState === 'finished') {
    const accuracy = Math.round((score / selectedQuestions.length) * 100);
    const isPassed = accuracy >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="px-4 sm:px-6 py-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
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
              
              <h2 className="text-3xl text-slate-900 dark:text-white mb-2">
                {isPassed ? 'Parabéns!' : 'Continue Estudando!'}
              </h2>
              <p className="text-slate-600 dark:text-gray-400">
                {isPassed 
                  ? 'Você teve um excelente desempenho!'
                  : 'Revise os conteúdos e tente novamente'
                }
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl text-blue-600 dark:text-blue-400 mb-1">{accuracy}%</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Acurácia</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl text-green-600 dark:text-green-400 mb-1">{score}</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Acertos</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl text-red-600 dark:text-red-400 mb-1">
                  {selectedQuestions.length - score}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Erros</div>
              </div>
            </div>

            {/* Revisão de Questões */}
            <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <h3 className="text-lg text-slate-900 dark:text-white mb-4">Revisão das Questões</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedQuestions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  const wasAnswered = userAnswer !== undefined;

                  return (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4"
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
                          <div className="text-sm text-slate-600 dark:text-gray-400 mb-1">
                            Questão {index + 1} - {question.subject}
                          </div>
                          <div className="text-sm text-slate-900 dark:text-white mb-2">
                            {question.question}
                          </div>
                          {wasAnswered && !isCorrect && (
                            <div className="text-xs space-y-1">
                              <div className="text-red-600 dark:text-red-400">
                                Sua resposta: {question.options[userAnswer]}
                              </div>
                              <div className="text-green-600 dark:text-green-400">
                                Correta: {question.options[question.correctAnswer]}
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
                className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Novo Simulado
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-xl hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}