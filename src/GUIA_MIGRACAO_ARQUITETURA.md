# 🔄 Guia de Migração - Nova Arquitetura

## Como Migrar Componentes Existentes

Este guia mostra **passo a passo** como migrar componentes que hoje acessam dados diretamente para usar a nova arquitetura escalável.

---

## 📦 Caso 1: Componente que Lista Questões

### ❌ ANTES (Código Atual)

```tsx
import { QUESTIONS } from '../data/questions';
import { useContext } from 'react';
import { ConcursoProfileContext } from '../context/ConcursoProfileContext';

function QuestionListOld() {
  const { selectedProfile } = useContext(ConcursoProfileContext);
  
  // Filtragem manual e hardcoded
  const questions = QUESTIONS.filter(q => {
    if (selectedProfile?.cargo) {
      return q.cargo === selectedProfile.cargo;
    }
    return true;
  });

  return (
    <div>
      <h2>Total: {questions.length} questões</h2>
      {questions.map(q => (
        <div key={q.id}>{q.enunciado}</div>
      ))}
    </div>
  );
}
```

### ✅ DEPOIS (Nova Arquitetura)

```tsx
import { useQuestions } from '../hooks/useQuestions';
import { useContext } from 'react';
import { ConcursoProfileContext } from '../context/ConcursoProfileContext';

function QuestionListNew() {
  const { selectedProfile } = useContext(ConcursoProfileContext);
  
  // Usa hook com filtros
  const { questions, loading, error } = useQuestions({
    cargo: selectedProfile?.cargo
  });

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Total: {questions.length} questões</h2>
      {questions.map(q => (
        <div key={q.id}>{q.enunciado}</div>
      ))}
    </div>
  );
}
```

### 🎯 Benefícios
- ✅ UI não sabe de onde vêm os dados
- ✅ Estados de loading/error gerenciados
- ✅ Fácil trocar mock por API

---

## 🎲 Caso 2: Quiz com Questões Aleatórias

### ❌ ANTES

```tsx
import { QUESTIONS } from '../data/questions';
import { useState } from 'react';

function QuizScreenOld() {
  const [quizQuestions, setQuizQuestions] = useState([]);

  const startQuiz = () => {
    // Embaralha manualmente
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    setQuizQuestions(selected);
  };

  return (
    <button onClick={startQuiz}>Iniciar Quiz</button>
  );
}
```

### ✅ DEPOIS

```tsx
import { useRandomQuestions } from '../hooks/useRandomQuestions';

function QuizScreenNew() {
  const { getRandomQuestions, questions, loading } = useRandomQuestions();

  const startQuiz = async () => {
    await getRandomQuestions(10, {
      disciplina: 'Português'
    });
  };

  return (
    <button onClick={startQuiz} disabled={loading}>
      {loading ? 'Carregando...' : 'Iniciar Quiz'}
    </button>
  );
}
```

---

## 🔒 Caso 3: Feature Bloqueada por Premium

### ❌ ANTES

```tsx
import { useContext } from 'react';
import { AppStateContext } from '../context/AppState/AppStateContext';

function AdvancedFiltersOld() {
  const { state } = useContext(AppStateContext);
  
  // Lógica de premium espalhada
  const isPremium = state.user.plan === 'monthly' || state.user.plan === 'annual';

  if (!isPremium) {
    return <div>🔒 Recurso premium</div>;
  }

  return <div>Filtros Avançados</div>;
}
```

### ✅ DEPOIS (Opção 1: Hook)

```tsx
import { useEntitlement } from '../hooks/useEntitlement';

function AdvancedFiltersNew() {
  const { canAccessFilters, getBlockMessage } = useEntitlement();

  if (!canAccessFilters) {
    return <div>{getBlockMessage('filters')}</div>;
  }

  return <div>Filtros Avançados</div>;
}
```

### ✅ DEPOIS (Opção 2: Component Gate)

```tsx
import { PremiumGate } from '../components/examples/PremiumGateExample';

function SettingsScreen() {
  return (
    <div>
      <PremiumGate feature="filters">
        <AdvancedFilters />
      </PremiumGate>
    </div>
  );
}
```

---

## 📊 Caso 4: Estatísticas com Limite de Questões

### ❌ ANTES

```tsx
import { QUESTIONS } from '../data/questions';
import { useContext } from 'react';
import { AppStateContext } from '../context/AppState/AppStateContext';

function StatsScreenOld() {
  const { state } = useContext(AppStateContext);
  const isPremium = state.user.premium;
  
  // Lógica de limite hardcoded
  const limit = isPremium ? 10000 : 100;
  const availableQuestions = QUESTIONS.slice(0, limit);

  return (
    <div>
      <p>Questões disponíveis: {availableQuestions.length}</p>
      <p>Limite: {limit}</p>
    </div>
  );
}
```

### ✅ DEPOIS

```tsx
import { useQuestions } from '../hooks/useQuestions';
import { useEntitlement } from '../hooks/useEntitlement';

function StatsScreenNew() {
  const { questionLimit, isPremium } = useEntitlement();
  const { questions } = useQuestions();
  
  // Limita automaticamente baseado no plano
  const availableQuestions = questions.slice(0, questionLimit);

  return (
    <div>
      <p>Questões disponíveis: {availableQuestions.length}</p>
      <p>Limite do plano: {questionLimit}</p>
      {!isPremium && <UpgradeButton />}
    </div>
  );
}
```

---

## 🔍 Caso 5: Busca com Múltiplos Filtros

### ❌ ANTES

```tsx
import { QUESTIONS } from '../data/questions';
import { useState, useEffect } from 'react';

function SearchScreenOld() {
  const [banca, setBanca] = useState('');
  const [ano, setAno] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let filtered = QUESTIONS;
    
    if (banca) {
      filtered = filtered.filter(q => q.banca === banca);
    }
    
    if (ano) {
      filtered = filtered.filter(q => q.ano === ano);
    }
    
    setResults(filtered);
  }, [banca, ano]);

  return <div>Resultados: {results.length}</div>;
}
```

### ✅ DEPOIS

```tsx
import { useQuestions } from '../hooks/useQuestions';
import { useState } from 'react';

function SearchScreenNew() {
  const [banca, setBanca] = useState('');
  const [ano, setAno] = useState<number | undefined>();

  // Hook reativo aos filtros
  const { questions, loading } = useQuestions({
    banca: banca || undefined,
    ano
  });

  return (
    <div>
      {loading ? (
        <p>Buscando...</p>
      ) : (
        <p>Resultados: {questions.length}</p>
      )}
    </div>
  );
}
```

---

## 🎯 Checklist de Migração

Para migrar um componente, siga este checklist:

### 1️⃣ Identificar o Padrão Atual

- [ ] Importa `QUESTIONS` diretamente?
- [ ] Faz filtros manuais?
- [ ] Tem lógica de premium espalhada?
- [ ] Embaralha questões manualmente?

### 2️⃣ Escolher o Hook Adequado

| Necessidade | Hook |
|-------------|------|
| Listar com filtros | `useQuestions()` |
| Questões aleatórias | `useRandomQuestions()` |
| Verificar premium | `useEntitlement()` |
| Bloquear componente | `<PremiumGate>` |

### 3️⃣ Refatorar

- [ ] Importar hook apropriado
- [ ] Substituir acesso direto a `QUESTIONS`
- [ ] Usar filtros via parâmetros
- [ ] Tratar estados de loading/error
- [ ] Remover lógica de premium inline

### 4️⃣ Testar

- [ ] Funciona sem filtros?
- [ ] Funciona com filtros?
- [ ] Loading aparece?
- [ ] Error é tratado?
- [ ] Premium bloqueia corretamente?

---

## 📋 Exemplos de Filtros Comuns

```tsx
// Por banca
const { questions } = useQuestions({ banca: 'CESPE' });

// Por cargo
const { questions } = useQuestions({ cargo: 'Técnico' });

// Por ano
const { questions } = useQuestions({ ano: 2024 });

// Por disciplina
const { questions } = useQuestions({ disciplina: 'Português' });

// Múltiplos filtros
const { questions } = useQuestions({
  banca: 'CESPE',
  ano: 2024,
  disciplina: 'Matemática',
  dificuldade: 'medio'
});

// Por perfil de concurso
const { questions } = useQuestions({
  perfil: 'Técnico Legislativo'
});
```

---

## 🚀 Componentes Prioritários para Migrar

Sugestão de ordem de migração:

### Alta Prioridade
1. **Dashboard** - Tela principal
2. **QuizTestScreen** - Quiz principal
3. **SimulatedExam** - Simulados
4. **Statistics** - Estatísticas

### Média Prioridade
5. **StudySession** - Sessão de estudos
6. **FlashcardScreen** - Flashcards
7. **SmartQuizSession** - Quiz inteligente

### Baixa Prioridade
8. Componentes de listagem
9. Componentes auxiliares
10. Telas de configuração

---

## 💡 Dicas Importantes

### ✅ DO (Faça)
- Use `useQuestions` para listar
- Use `useRandomQuestions` para quiz
- Use `useEntitlement` para verificar premium
- Trate loading e error states
- Centralize lógica de premium

### ❌ DON'T (Não Faça)
- Não importe `QUESTIONS` diretamente
- Não faça filtros manuais
- Não espalhe lógica de premium
- Não ignore estados de loading
- Não acesse dados sem repositório

---

## 🎓 Quando a Migração Estiver Completa

Você poderá:

1. **Remover imports antigos**
   ```ts
   // ❌ Remover
   import { QUESTIONS } from '../data/questions';
   ```

2. **Trocar mock por API com 1 linha**
   ```ts
   // core/container.ts
   export const questionRepository = new ApiQuestionRepository();
   ```

3. **Adicionar cache sem quebrar nada**
   ```ts
   export const questionRepository = new CachedQuestionRepository();
   ```

---

## 📞 Precisa de Ajuda?

Se encontrar dificuldades na migração:

1. Consulte este guia
2. Veja exemplos em `/components/examples/`
3. Leia `/ARQUITETURA_ESCALAVEL.md`
4. Teste com um componente simples primeiro

---

**Boa migração! 🚀**
