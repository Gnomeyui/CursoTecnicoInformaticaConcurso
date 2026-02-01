/**
 * @file useSimulatedExam.ts
 * @description Custom Hook para lógica do Simulado
 * @pattern Headless Logic Pattern - Separação total de UI e Lógica
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useGame } from '../context/GameContext';
import { sqliteService } from '../lib/database/SQLiteService';

/**
 * Question Option Interface
 */
interface QuestionOption {
  id: string;
  text: string;
}

/**
 * Question Interface
 */
export interface Question {
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

/**
 * Exam State Types
 */
export type ExamState = 'config' | 'running' | 'finished';

/**
 * Exam Backup Interface
 */
interface ExamBackup {
  selectedQuestions: Question[];
  answers: { [key: number]: string };
  flaggedQuestions: number[];
  currentQuestionIndex: number;
  endTime: number;
  questionCount: number;
  timeLimit: number;
}

/**
 * Dados retornados pelo hook
 */
export interface SimulatedExamData {
  // State
  examState: ExamState;
  loading: boolean;
  
  // Config
  questionCount: number;
  timeLimit: number;
  selectedBanca: string;
  selectedNivel: string;
  
  // Questions
  selectedQuestions: Question[];
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  
  // Answers
  answers: { [key: number]: string };
  flaggedQuestions: Set<number>;
  
  // Timer
  timeRemaining: number;
  isLowTime: boolean;
  
  // Results
  score: number;
  accuracy: number;
  isPassed: boolean;
  
  // Progress
  progress: number;
  
  // Actions
  setQuestionCount: (count: number) => void;
  setTimeLimit: (limit: number) => void;
  setBanca: (banca: string) => void;
  setNivel: (nivel: string) => void;
  startExam: () => Promise<void>;
  finishExam: () => void;
  selectAnswer: (answerOptionId: string) => void;
  toggleFlag: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  formatTime: (seconds: number) => string;
  reset: () => void;
}

/**
 * Hook principal do Simulado
 * 
 * @returns {SimulatedExamData} Dados e ações do simulado
 * 
 * @example
 * ```tsx
 * const exam = useSimulatedExam();
 * 
 * return (
 *   <div>
 *     <button onClick={exam.startExam}>Iniciar</button>
 *     <h1>{exam.currentQuestion?.text}</h1>
 *   </div>
 * );
 * ```
 */
export const useSimulatedExam = (): SimulatedExamData => {
  // ============================================
  // 1. CONTEXTS
  // ============================================
  const { addXP } = useGame();

  // ============================================
  // 2. STATE
  // ============================================
  const [examState, setExamState] = useState<ExamState>('config');
  const [questionCount, setQuestionCount] = useState(30);
  const [timeLimit, setTimeLimit] = useState(60);
  const [selectedBanca, setSelectedBanca] = useState('');
  const [selectedNivel, setSelectedNivel] = useState('');
  
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const endTimeRef = useRef<number>(0);

  // ============================================
  // 3. TIMER EFFECT
  // ============================================
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

  // ============================================
  // 4. BACKUP RESTORATION
  // ============================================
  useEffect(() => {
    const checkBackup = () => {
      const backup = localStorage.getItem('exam_backup');
      if (backup && examState === 'config') { 
        try {
          const data: ExamBackup = JSON.parse(backup);
          
          // Validar se o backup é válido e não expirou
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
  }, []);

  // ============================================
  // 5. BACKUP SAVE
  // ============================================
  useEffect(() => {
    if (examState === 'running') {
      const examBackup: ExamBackup = {
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

  // ============================================
  // 6. COMPUTED VALUES
  // ============================================
  const currentQuestion = useMemo(() => {
    return selectedQuestions[currentQuestionIndex] || null;
  }, [selectedQuestions, currentQuestionIndex]);

  const progress = useMemo(() => {
    if (selectedQuestions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
  }, [currentQuestionIndex, selectedQuestions.length]);

  const isLowTime = useMemo(() => {
    return timeRemaining < 300; // Menos de 5 minutos
  }, [timeRemaining]);

  const accuracy = useMemo(() => {
    if (selectedQuestions.length === 0) return 0;
    return Math.round((score / selectedQuestions.length) * 100);
  }, [score, selectedQuestions.length]);

  const isPassed = useMemo(() => {
    return accuracy >= 70;
  }, [accuracy]);

  // ============================================
  // 7. ACTIONS (CALLBACKS)
  // ============================================

  /**
   * Inicia o exame carregando questões do SQLite
   */
  const startExam = useCallback(async () => {
    setLoading(true);
    try {
      console.log('📚 Buscando questões do banco SQLite...');

      // Inicializar SQLite
      await sqliteService.initialize();

      // Construir query com filtros
      let query = `
        SELECT q.*, e.banca, e.ano, e.orgao, e.cargo, e.nivel
        FROM questions q
        JOIN exams e ON q.exam_id = e.id
        WHERE 1=1
      `;
      const params: any[] = [];

      // Filtro de Banca
      if (selectedBanca) {
        query += ' AND e.banca = ?';
        params.push(selectedBanca);
      }

      // Filtro de Nível
      if (selectedNivel) {
        query += ' AND e.nivel = ?';
        params.push(selectedNivel);
      }

      // Adicionar ORDER BY e LIMIT
      query += ' ORDER BY RANDOM() LIMIT ?';
      params.push(questionCount);

      console.log('🔍 Query:', query);
      console.log('🔍 Params:', params);

      // Buscar questões do banco real
      const result = await sqliteService.query(query, params);

      console.log(`📊 ${result.length} questões encontradas no banco`);

      // Se não houver questões, mostrar erro específico
      if (result.length === 0) {
        let errorMessage = '⚠️ Nenhuma Questão Encontrada!\n\n';
        
        if (selectedBanca || selectedNivel) {
          errorMessage += 'Não há questões disponíveis com os filtros selecionados:\n';
          if (selectedBanca) errorMessage += `• Banca: ${selectedBanca}\n`;
          if (selectedNivel) errorMessage += `• Nível: ${selectedNivel}\n`;
          errorMessage += '\nTente remover alguns filtros ou importe mais questões.';
        } else {
          errorMessage += 'O banco de dados está vazio.\nPor favor, importe questões antes de iniciar o simulado.';
        }
        
        alert(errorMessage);
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
          year: String(q.year || q.ano || ''),
          exam_name: `${q.cargo || 'Simulado'} - ${q.orgao || ''}`
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
  }, [questionCount, timeLimit, selectedBanca, selectedNivel]);

  /**
   * Finaliza o exame e salva resultado
   */
  const finishExam = useCallback(() => {
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

  /**
   * Seleciona uma resposta
   */
  const selectAnswer = useCallback((answerOptionId: string) => {
    try { 
      Haptics.impact({ style: ImpactStyle.Light }); 
    } catch (e) {
      // Haptics não disponível
    }
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerOptionId }));
  }, [currentQuestionIndex]);

  /**
   * Marca/desmarca questão como importante
   */
  const toggleFlag = useCallback(() => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.has(currentQuestionIndex) 
        ? newSet.delete(currentQuestionIndex) 
        : newSet.add(currentQuestionIndex);
      return newSet;
    });
  }, [currentQuestionIndex]);

  /**
   * Próxima questão
   */
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, selectedQuestions.length]);

  /**
   * Questão anterior
   */
  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  /**
   * Formata tempo em MM:SS
   */
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  /**
   * Define a banca selecionada
   */
  const setBanca = useCallback((banca: string) => {
    setSelectedBanca(banca);
  }, []);

  /**
   * Define o nível selecionado
   */
  const setNivel = useCallback((nivel: string) => {
    setSelectedNivel(nivel);
  }, []);

  /**
   * Reseta o simulado para config inicial
   */
  const reset = useCallback(() => {
    setExamState('config');
    setSelectedQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setTimeRemaining(0);
    setScore(0);
    localStorage.removeItem('exam_backup');
  }, []);

  // ============================================
  // 8. RETURN (Dados e Ações)
  // ============================================
  return {
    // State
    examState,
    loading,
    
    // Config
    questionCount,
    timeLimit,
    selectedBanca,
    selectedNivel,
    
    // Questions
    selectedQuestions,
    currentQuestionIndex,
    currentQuestion,
    
    // Answers
    answers,
    flaggedQuestions,
    
    // Timer
    timeRemaining,
    isLowTime,
    
    // Results
    score,
    accuracy,
    isPassed,
    
    // Progress
    progress,
    
    // Actions
    setQuestionCount,
    setTimeLimit,
    setBanca,
    setNivel,
    startExam,
    finishExam,
    selectAnswer,
    toggleFlag,
    nextQuestion,
    prevQuestion,
    formatTime,
    reset,
  };
};