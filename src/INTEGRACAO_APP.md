# 🚀 GUIA DE INTEGRAÇÃO NO APP.TSX

## ✅ MODELO HÍBRIDO IMPLEMENTADO

Combinamos o melhor dos dois mundos:

### Do Modelo Anterior:
- ✅ Schema normalizado (exams + questions com JOIN)
- ✅ Service Pattern robusto
- ✅ Transações seguras

### Do Seu Dossiê:
- ✅ Shuffle de alternativas (anti-cola)
- ✅ Sistema mastered/critical inteligente
- ✅ JSON fácil de editar
- ✅ Sistema de XP automático

---

## 📦 ARQUIVOS CRIADOS

```
/lib/database/SQLiteService.ts        ✅ Motor do banco (normalizado)
/data/seedQuestions.ts                ✅ 10 questões FGV 2024
/hooks/useDatabaseSeed.ts             ✅ Seed automático
/hooks/useSmartQuiz.tsx               ✅ Hook inteligente híbrido
/components/QuizTestScreen.tsx        ✅ Tela de teste completa
```

---

## 🎯 INTEGRAÇÃO NO APP.TSX

### **Opção 1: Integração Simples (Somente Teste)**

```typescript
import React from 'react';
import { useDatabaseSeed } from './hooks/useDatabaseSeed';
import { QuizTestScreen } from './components/QuizTestScreen';

function App() {
  const { isSeeding, isReady, error } = useDatabaseSeed();

  // Tela de loading
  if (isSeeding || !isReady) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
          Preparando banco de questões...
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Isso acontece apenas uma vez
        </p>
      </div>
    );
  }

  // Erro
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-red-600 dark:text-red-400 text-xl font-bold mb-4">Erro ao Inicializar</h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  // App pronto
  return <QuizTestScreen />;
}

export default App;
```

---

### **Opção 2: Integração com Rotas (React Router)**

```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDatabaseSeed } from './hooks/useDatabaseSeed';

// Seus componentes existentes
import { Dashboard } from './components/Dashboard';
import { QuizTestScreen } from './components/QuizTestScreen';
import { Statistics } from './components/Statistics';
import { Settings } from './components/Settings';

function App() {
  const { isSeeding, isReady } = useDatabaseSeed();

  if (isSeeding || !isReady) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<QuizTestScreen />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

### **Opção 3: Usar no Seu Sistema Existente**

Se você já tem um sistema de quiz, substitua o hook antigo:

```typescript
// ❌ ANTES (hook antigo)
import { useQuestions } from './hooks/useQuestions';

// ✅ AGORA (hook híbrido)
import { useSmartQuiz } from './hooks/useSmartQuiz';

function MeuComponente() {
  const {
    currentQuestion,
    handleAnswer,
    nextQuestion,
    loading
  } = useSmartQuiz({
    discipline: 'Noções de Informática',  // Filtra por matéria
    quantidade: 15,                        // 15 questões
    excludeMastered: true,                 // Exclui já dominadas
    prioritizeCritical: true               // Prioriza críticas
  });

  // Resto do código...
}
```

---

## 🎮 RECURSOS DO HOOK HÍBRIDO

### **useSmartQuiz({ ... })**

#### **Parâmetros:**
```typescript
{
  discipline?: string;          // Filtrar por matéria
  quantidade?: number;          // Quantas questões (padrão: 10)
  excludeMastered?: boolean;    // Excluir já dominadas (padrão: false)
  prioritizeCritical?: boolean; // Priorizar críticas (padrão: false)
  autoStart?: boolean;          // Buscar ao montar (padrão: true)
  userId?: string;              // ID do usuário (padrão: 'local_user')
}
```

#### **Retorno:**
```typescript
{
  // Estado
  queue: Question[];              // Todas as questões carregadas
  currentIndex: number;           // Índice atual (0-based)
  loading: boolean;               // Carregando questões?
  error: string | null;           // Mensagem de erro
  
  // Questão Atual
  currentQuestion: Question;      // Questão sendo exibida
  totalQuestions: number;         // Total de questões
  isLastQuestion: boolean;        // É a última?
  isFirstQuestion: boolean;       // É a primeira?
  isSessionComplete: boolean;     // Terminou?
  
  // Ações
  handleAnswer: (q, optionId) => Promise<{isCorrect, isMastered, isCritical}>;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuiz: () => void;
  reload: () => void;            // Recarregar questões
}
```

#### **Estrutura da Question:**
```typescript
{
  id: number;
  questionNumber: number;
  discipline: string;
  statement: string;
  options: { A: "...", B: "...", C: "...", D: "...", E: "..." };
  shuffledOptions: [{ id: "A", text: "..." }, ...];  // 🎲 Embaralhado!
  correctOption: string;
  
  // Dados da prova
  banca: string;
  orgao: string;
  cargo: string;
  ano: number;
  nivel: string;
}
```

---

## 🎯 CASOS DE USO

### **1. Quiz Normal (Todas as Questões)**
```typescript
const quiz = useSmartQuiz({ quantidade: 10 });
```

### **2. Filtrar por Matéria**
```typescript
const quiz = useSmartQuiz({ 
  discipline: 'Língua Portuguesa',
  quantidade: 5
});
```

### **3. Modo Revisão (Só Erradas)**
```typescript
const quiz = useSmartQuiz({ 
  prioritizeCritical: true,  // Prioriza questões com muitos erros
  excludeMastered: true,     // Exclui já dominadas
  quantidade: 20
});
```

### **4. Modo Simulado (Sem Filtros)**
```typescript
const quiz = useSmartQuiz({ 
  excludeMastered: false,
  prioritizeCritical: false,
  quantidade: 60  // Prova completa
});
```

---

## 📊 SISTEMA DE PROGRESSO AUTOMÁTICO

Ao chamar `handleAnswer(question, optionId)`, o sistema:

1. ✅ Salva a resposta (certa/errada)
2. ✅ Atualiza contadores (times_correct, times_wrong_total)
3. ✅ Classifica automaticamente:
   - **Mastered:** 4+ acertos consecutivos
   - **Critical:** 3+ erros totais
4. ✅ Adiciona XP (+10 por acerto)
5. ✅ Atualiza perfil (total_questions_answered, correct_answers)

**Você não precisa fazer nada!** 🎉

---

## 🧪 TESTANDO

### **1. Execute:**
```bash
npm install
npm run dev
```

### **2. Abra o console (F12) e veja:**
```
🌱 Iniciando processo de seed do banco...
📦 Banco vazio detectado. Inserindo prova e questões...
✅ Seed concluído! 1 prova e 10 questões inseridas.
✅ 10 questões carregadas (Disciplina: Todas)
```

### **3. Teste respondendo:**
- Clique em uma alternativa
- Veja o feedback (verde/vermelho)
- Confira no console: `✅ Q1: +10 XP` ou `❌ Q2: Errou`

---

## 🔥 PRÓXIMOS PASSOS

1. ✅ **Integrar no App.tsx** (escolha uma opção acima)
2. ✅ **Testar o QuizTestScreen**
3. 📝 **Adicionar mais questões** em `/data/seedQuestions.ts`
4. 🎨 **Personalizar UI** do QuizTestScreen se necessário
5. 🔌 **Conectar com Dashboard** (usar dados do user_profile)
6. 📊 **Exibir estatísticas** (buscar de user_question_progress)

---

## ❓ DÚVIDAS FREQUENTES

### **Q: Como adiciono mais questões?**
A: Edite `/data/seedQuestions.ts` e adicione no array `questions`.

### **Q: Como mudo as regras de mastered/critical?**
A: Edite `/hooks/useSmartQuiz.tsx` nas linhas 154-155.

### **Q: Posso usar com outros hooks do app?**
A: Sim! O hook é independente e retorna dados puros.

### **Q: Como consulto o progresso do usuário?**
A: Use `sqliteService.query('SELECT * FROM user_question_progress WHERE user_id = ?', ['local_user'])`.

### **Q: Como consulto o XP atual?**
A: Use `sqliteService.query('SELECT xp, level FROM user_profile WHERE user_id = ?', ['local_user'])`.

---

## 📌 LEMBRE-SE

- ✅ O seed roda **apenas uma vez** (banco vazio)
- ✅ As alternativas são **embaralhadas** a cada carregamento
- ✅ O progresso é **salvo automaticamente**
- ✅ Tudo funciona **100% offline**

**Pronto para usar!** 🚀
