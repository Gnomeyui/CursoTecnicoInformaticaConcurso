# 🏗️ Arquitetura Escalável - Gabaritoo

## ✅ Auditoria Técnica Implementada

Este documento descreve a **nova arquitetura escalável** implementada no Gabaritoo seguindo as 3 correções obrigatórias para crescimento sem refatoração futura.

---

## 📋 Resumo das Correções

| Correção | Status | Impacto |
|----------|--------|---------|
| **3.1** - Desacoplar dados da UI | ✅ Completo | UI agnóstica de origem dos dados |
| **3.2** - Contratos explícitos | ✅ Completo | Troca Mock → API com 1 linha |
| **3.3** - Premium governa o app | ✅ Completo | Regras de negócio centralizadas |

---

## 🎯 3.1 - Dados Desacoplados da UI

### ❌ Antes (Problema)
```ts
// Component.tsx
import { QUESTIONS } from '../data/questions';

function MyComponent() {
  const questions = QUESTIONS.filter(q => q.banca === 'CESPE');
  // UI acoplada à origem dos dados ❌
}
```

### ✅ Depois (Solução)
```ts
// Component.tsx
import { useQuestions } from '../hooks/useQuestions';

function MyComponent() {
  const { questions } = useQuestions({ banca: 'CESPE' });
  // UI agnóstica - não sabe de onde vêm os dados ✅
}
```

### 📁 Estrutura Criada

```
domain/
├── repositories/
│   └── QuestionRepository.ts     # Interface do contrato
├── usecases/
│   ├── GetQuestions.ts           # Buscar questões
│   ├── GetRandomQuestions.ts     # Questões aleatórias
│   └── CountQuestions.ts         # Contar questões
└── services/
    └── EntitlementService.ts     # Controle premium

data/
└── repositories/
    └── MockQuestionRepository.ts # Implementação mock

core/
└── container.ts                  # Injeção de dependências

hooks/
├── useQuestions.ts               # Hook para buscar questões
├── useRandomQuestions.ts         # Hook para quiz
└── useEntitlement.ts             # Hook para verificar premium
```

---

## 🔌 3.2 - Contratos Explícitos

### Repositório (Interface)

```ts
// domain/repositories/QuestionRepository.ts
export interface QuestionRepository {
  getAll(filters?: QuestionFilters): Promise<Question[]>;
  getById(id: string): Promise<Question | null>;
  count(filters?: QuestionFilters): Promise<number>;
  getRandom(limit: number, filters?: QuestionFilters): Promise<Question[]>;
}
```

### Implementação Mock (Atual)

```ts
// data/repositories/MockQuestionRepository.ts
export class MockQuestionRepository implements QuestionRepository {
  async getAll(filters?: QuestionFilters): Promise<Question[]> {
    let data = QUESTIONS;
    // Aplica filtros
    if (filters?.banca) data = data.filter(q => q.banca === filters.banca);
    return data;
  }
  // ... outros métodos
}
```

### 🚀 Migração Futura (API)

**Quando tiver backend, basta criar:**

```ts
// data/repositories/ApiQuestionRepository.ts
export class ApiQuestionRepository implements QuestionRepository {
  async getAll(filters?: QuestionFilters): Promise<Question[]> {
    const response = await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify(filters)
    });
    return response.json();
  }
  // ... outros métodos
}
```

**E trocar UMA linha:**

```ts
// core/container.ts
// export const questionRepository = new MockQuestionRepository(); ❌
export const questionRepository = new ApiQuestionRepository(); ✅
```

**Pronto! Zero refatoração na UI.**

---

## 👑 3.3 - Premium Governa o App

### ❌ Antes (Problema)
```ts
// Lógica de premium espalhada por toda UI
if (user.plan === 'monthly' || user.plan === 'annual') {
  // Mostra feature premium
}
```

### ✅ Depois (Solução Centralizada)

```ts
// domain/services/EntitlementService.ts
export class EntitlementService {
  static isPremium(user: User): boolean {
    if (!user.premium) return false;
    if (!user.premiumExpiresAt) return true;
    return new Date(user.premiumExpiresAt) > new Date();
  }

  static canAccessFilters(user: User): boolean {
    return this.isPremium(user);
  }

  static getQuestionLimit(user: User): number {
    return this.isPremium(user) ? 10000 : 100;
  }
}
```

### 🎯 Uso na UI

```tsx
import { useEntitlement } from '../hooks/useEntitlement';

function FilterPanel() {
  const { canAccessFilters, getBlockMessage } = useEntitlement();

  if (!canAccessFilters) {
    return <UpgradeBanner message={getBlockMessage('filters')} />;
  }

  return <AdvancedFilters />;
}
```

---

## 📖 Guia de Uso

### 1️⃣ Buscar Questões com Filtros

```tsx
import { useQuestions } from '../hooks/useQuestions';

function QuestionList() {
  const { questions, loading, error } = useQuestions({
    banca: 'CESPE',
    ano: 2024,
    disciplina: 'Português'
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      {questions.map(q => <QuestionCard key={q.id} question={q} />)}
    </div>
  );
}
```

### 2️⃣ Questões Aleatórias para Quiz

```tsx
import { useRandomQuestions } from '../hooks/useRandomQuestions';

function QuizScreen() {
  const { getRandomQuestions, loading } = useRandomQuestions();

  const startQuiz = async () => {
    const questions = await getRandomQuestions(10, {
      disciplina: 'Matemática'
    });
    // Iniciar quiz com as 10 questões aleatórias
  };

  return <Button onClick={startQuiz}>Iniciar Quiz</Button>;
}
```

### 3️⃣ Verificar Permissões Premium

```tsx
import { useEntitlement } from '../hooks/useEntitlement';

function SimulatedExamButton() {
  const { canAccessSimulados, getBlockMessage, isPremium } = useEntitlement();

  if (!canAccessSimulados) {
    return (
      <div>
        <p>{getBlockMessage('simulados')}</p>
        <Button>Assinar Premium</Button>
      </div>
    );
  }

  return <Button>Iniciar Simulado</Button>;
}
```

### 4️⃣ Bloquear Componentes Inteiros

```tsx
import { PremiumGate } from '../components/examples/PremiumGateExample';

function SettingsScreen() {
  return (
    <div>
      <BasicSettings />
      
      <PremiumGate feature="filters">
        <AdvancedFilters />
      </PremiumGate>
      
      <PremiumGate feature="stats">
        <DetailedStatistics />
      </PremiumGate>
    </div>
  );
}
```

---

## 🔄 Migração Gradual

Você **não precisa refatorar tudo de uma vez**. Migre gradualmente:

### Fase 1: Novos Componentes
- Use `useQuestions` em componentes novos
- Use `useEntitlement` para features premium novas

### Fase 2: Componentes Críticos
- Migre telas principais (Dashboard, Quiz)
- Substitua lógica premium espalhada

### Fase 3: Refatoração Completa
- Todos os componentes usam os novos hooks
- Remove código legado de `data/questions.ts`

---

## 📊 Benefícios Conquistados

| Área | Antes | Depois |
|------|-------|--------|
| **Acoplamento** | UI acoplada aos dados | UI agnóstica |
| **Migração API** | Refatorar tudo | 1 linha |
| **Premium** | Lógica espalhada | Centralizada |
| **Testabilidade** | Difícil | Fácil (mock/real) |
| **Manutenção** | Alta complexidade | Baixa complexidade |

---

## 🎯 Próximos Passos Lógicos

Agora que a arquitetura está preparada:

1. **Implementar filtros reais** usando `useQuestions({ ... })`
2. **Adicionar cache local** (SQLite/AsyncStorage)
3. **Implementar offline-first** (sync quando online)
4. **Criar backend próprio** (trocar 1 linha no container)

---

## 💡 Exemplo Completo: Quiz com Premium

```tsx
import { useRandomQuestions } from '../hooks/useRandomQuestions';
import { useEntitlement } from '../hooks/useEntitlement';
import { PremiumGate } from '../components/examples/PremiumGateExample';

function QuizScreen() {
  const { getRandomQuestions, loading } = useRandomQuestions();
  const { questionLimit, isPremium } = useEntitlement();
  
  const startQuiz = async () => {
    const limit = isPremium ? 20 : 10; // Premium = mais questões
    
    const questions = await getRandomQuestions(limit, {
      disciplina: selectedDisciplina,
      dificuldade: selectedDificuldade
    });
    
    // Iniciar quiz
  };

  return (
    <div>
      <h1>Quiz - Limite: {questionLimit} questões</h1>
      
      {/* Filtros de dificuldade só para premium */}
      <PremiumGate feature="filters">
        <DifficultyFilter />
      </PremiumGate>
      
      <Button onClick={startQuiz} disabled={loading}>
        {loading ? 'Carregando...' : 'Iniciar Quiz'}
      </Button>
    </div>
  );
}
```

---

## 🏆 Conclusão

O **Gabaritoo** agora possui:

✅ Arquitetura desacoplada e escalável  
✅ Preparado para migração API sem refatoração  
✅ Premium governando todas as features  
✅ Código limpo e testável  
✅ Pronto para crescimento exponencial  

**De "projeto promissor" para "produto enterprise-ready"** 🚀

---

## 📚 Referências Técnicas

- **Repository Pattern**: Martin Fowler - PoEAA
- **Use Cases (Clean Architecture)**: Uncle Bob
- **Entitlement Pattern**: SaaS Best Practices
- **Dependency Injection**: SOLID Principles

---

**Última atualização**: Janeiro 2026  
**Versão da Arquitetura**: 2.0  
**Status**: ✅ Produção
