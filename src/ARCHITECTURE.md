# 🏗️ ARQUITETURA DO GABARITOO

**Última atualização:** 10 de Janeiro de 2026  
**Versão:** 2.0 (Pós-Refatoração)

---

## 📱 VISÃO GERAL

**Gabaritoo** é um aplicativo Android **offline-first** para estudos de concursos públicos, com foco em questões práticas e gamificação.

**Stack Principal:**
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4
- **Mobile:** Capacitor 6 (Android nativo)
- **Database:** SQLite (local-first)
- **Analytics:** Sistema próprio de métricas

---

## 🗂️ ESTRUTURA DO PROJETO

```
/
├── /app                      → Arquitetura modular principal
│   ├── AppProviders.tsx      → Gerenciamento de contextos
│   ├── AppRoutes.tsx         → Roteamento de telas
│   └── AppShell.tsx          → Container e navegação
│
├── /components               → Componentes de UI
│   ├── /onboarding          → Telas de primeira execução
│   ├── /ui                  → Design system (shadcn/ui)
│   └── *.tsx                → Telas principais
│
├── /context                  → Gerenciamento de estado
│   ├── /AppState            → Estado centralizado (preferências, progresso)
│   ├── ThemeContext.tsx     → Temas (8 opções)
│   ├── GameContext.tsx      → XP, níveis, badges
│   └── ...
│
├── /services                 → Camada de negócios
│   └── SyncService.ts       → Sincronização servidor ↔ SQLite
│
├── /lib                      → Bibliotecas e utilitários
│   ├── /database
│   │   ├── SQLiteService.ts → Camada de acesso ao banco
│   │   └── migrations.ts    → Schema e migrations
│   └── EngineEstudos.ts     → Motor de seleção de questões
│
├── /hooks                    → React hooks customizados
│   ├── useSmartQuiz.tsx     → Lógica de quiz inteligente
│   ├── useProgress.ts       → Rastreamento de progresso
│   └── ...
│
├── /utils                    → Utilitários gerais
│   ├── /analytics
│   │   └── simple-metrics.ts → Rastreamento de uso
│   ├── /notifications
│   │   └── NotificationService.ts → Sistema de notificações
│   └── copy.ts              → Textos centralizados (UX Writing)
│
├── /data                     → Dados estáticos
│   ├── questions.ts         → Banco de questões
│   ├── badges.ts            → Sistema de conquistas
│   └── regimento-interno.ts → Conteúdo jurídico
│
├── /docs                     → Documentação (movida da raiz)
│   ├── /auditoria           → Relatórios técnicos
│   ├── /arquitetura         → Decisões de design
│   ├── /ui-ux               → Melhorias de interface
│   └── /seguranca           → Guias de segurança
│
└── App.tsx                   → Entrypoint (15 linhas)
```

---

## 🧩 ARQUITETURA MODULAR

### 1. **App.tsx** (Entrypoint)

**Responsabilidade:** Apenas compor providers e shell.

```typescript
export default function App() {
  return (
    <AppProviders>  {/* Contextos */}
      <AppShell />  {/* Navegação e estado */}
    </AppProviders>
  );
}
```

**Linhas:** 15  
**Dependências:** AppProviders, AppShell

---

### 2. **AppProviders.tsx** (Gerenciamento de Contextos)

**Responsabilidade:** Centralizar todos os React Contexts.

```typescript
export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <GameProvider>
        <StatsProvider>
          <CustomizationProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </CustomizationProvider>
        </StatsProvider>
      </GameProvider>
    </ThemeProvider>
  );
}
```

**Linhas:** 40  
**Benefícios:**
- Ordem de providers clara
- Fácil adicionar/remover contextos
- Testável isoladamente

---

### 3. **AppRoutes.tsx** (Gerenciamento de Rotas)

**Responsabilidade:** Renderizar tela atual baseado em estado.

```typescript
export function AppRoutes({ currentView, ...handlers }) {
  return (
    <>
      {currentView === 'dashboard' && <Dashboard {...} />}
      {currentView === 'study' && <StudySession {...} />}
      {currentView === 'statistics' && <Statistics {...} />}
      {/* ... outras telas */}
    </>
  );
}
```

**Linhas:** 160  
**Benefícios:**
- Roteamento explícito
- Fácil adicionar telas
- Props tipadas

---

### 4. **AppShell.tsx** (Container Principal)

**Responsabilidade:** Gerenciar estado de navegação e efeitos globais.

```typescript
export function AppShell() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Sincronização automática no boot
  useEffect(() => {
    syncService.autoSync();
  }, []);
  
  // Botão "Voltar" do Android
  useEffect(() => {
    setupBackButton();
  }, [currentView]);
  
  // Handlers de navegação
  const handleStartQuiz = () => { ... };
  
  return <AppRoutes currentView={currentView} ... />;
}
```

**Linhas:** 250  
**Responsabilidades:**
- Estado de navegação
- Sincronização de dados
- Listeners nativos (Android)
- Handlers de ações

---

## 🗄️ ARQUITETURA DE DADOS

### Modelo: **Offline-First Híbrido**

```
┌─────────────────┐
│   React State   │ ← Estado temporário (UI)
└────────┬────────┘
         │
┌────────▼────────┐
│  localStorage   │ ← Cache rápido (preferências)
└────────┬────────┘
         │
┌────────▼────────┐
│     SQLite      │ ← Fonte da verdade (questões, progresso)
└────────┬────────┘
         │
┌────────▼────────┐
│ Servidor (API)  │ ← Sincronização periódica
└─────────────────┘
```

---

### Camadas de Dados

| Camada | Tecnologia | Uso | Persistência |
|--------|------------|-----|--------------|
| **UI State** | React useState | Estado de telas | ❌ Não |
| **App State** | React Context | Preferências do usuário | ✅ localStorage |
| **Database** | SQLite | Questões, progresso | ✅ Persistente |
| **Server** | REST API | Sincronização | ✅ Remoto |

---

### SQLiteService - Camada de Acesso

```typescript
class SQLiteService {
  // Operações básicas
  async query(sql, params)         // SELECT
  async execute(sql, params)       // INSERT/UPDATE/DELETE
  async transaction(statements)    // Múltiplos comandos
  
  // Importação em massa
  async importQuestionsBatch(questions)
  async importExam(exam)
  
  // Utilitários
  async hasQuestions()
  async getDatabaseStats()
}
```

**Benefícios:**
- API consistente
- Transações atômicas
- Performance otimizada (bulk insert)

---

### Schema do Banco (SQLite)

```sql
-- Provas/Concursos
CREATE TABLE exams (
  id INTEGER PRIMARY KEY,
  banca TEXT,
  orgao TEXT,
  cargo TEXT,
  ano INTEGER,
  nivel TEXT
);

-- Questões
CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  exam_id INTEGER,
  question_number INTEGER,
  discipline TEXT,
  statement TEXT,
  options TEXT, -- JSON: {"A": "...", "B": "..."}
  correct_option TEXT,
  created_at TEXT,
  FOREIGN KEY (exam_id) REFERENCES exams(id)
);

-- Progresso do usuário
CREATE TABLE user_question_progress (
  id INTEGER PRIMARY KEY,
  question_id INTEGER,
  attempts INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  last_attempt_at TEXT,
  mastery_level TEXT DEFAULT 'New',
  FOREIGN KEY (question_id) REFERENCES questions(id)
);
```

---

## 🔄 FLUXO DE DADOS

### 1. Boot do App

```
1. App.tsx renderiza
   ↓
2. AppProviders carrega contextos
   ↓
3. AppShell executa useEffect
   ↓
4. syncService.autoSync() verifica questões
   ├─ Tem questões? → Verifica se passou 7 dias
   └─ Não tem? → Importa do servidor
       ↓
5. SQLiteService importa em transação única
   ↓
6. Dashboard renderiza com dados locais
```

---

### 2. Sessão de Estudo

```
1. Usuário clica "Iniciar Estudo"
   ↓
2. useSmartQuiz.getQuestions() executa
   ↓
3. SQLite retorna questões (70% novas + 30% erradas)
   ↓
4. Usuário responde questão
   ↓
5. handleAnswer() atualiza:
   ├─ user_question_progress (SQLite)
   ├─ GameContext (XP, níveis)
   └─ StatsContext (métricas)
       ↓
6. Celebração se subiu de nível
```

---

### 3. Sincronização de Dados

```
┌─────────────────────────────────────┐
│ SyncService.autoSync()              │
└──────────────┬──────────────────────┘
               │
    ┌──────────▼──────────┐
    │ Tem questões?       │
    └──────┬──────────┬───┘
           │          │
        SIM│          │NÃO
           │          │
           ▼          ▼
    ┌──────────┐  ┌──────────────────┐
    │Passou 7  │  │fetch do servidor │
    │dias?     │  │                  │
    └──┬───┬───┘  └────────┬─────────┘
       │   │               │
    SIM│   │NÃO            │
       │   │               │
       ▼   ▼               ▼
    ┌──────────────────────────┐
    │ importQuestionsBatch()   │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ localStorage.setItem │
    │ ('last_sync')        │
    └──────────────────────┘
```

---

## 🎨 SISTEMA DE TEMAS

**8 temas disponíveis:**
1. Default (Azul/Cinza)
2. Modern (Preto/Branco)
3. Reading (Sépia)
4. Focus (Alto contraste)
5. Calm (Verde água)
6. Forest (Verde escuro)
7. Ocean (Azul oceano)
8. Sunset (Laranja/Rosa)
9. Purple (Roxo)

**Implementação:**
- CSS Variables em `/styles/globals.css`
- ThemeContext gerencia estado
- Persistido em localStorage

---

## 🎮 SISTEMA DE GAMIFICAÇÃO

### Componentes:

| Sistema | Contexto | Persistência |
|---------|----------|--------------|
| **XP e Níveis** | GameContext | localStorage |
| **Conquistas** | GameContext | localStorage |
| **Streak** | StatsContext | localStorage |
| **Precisão** | StatsContext | SQLite |

### Cálculo de XP:

```typescript
const baseXP = 10;
const bonuses = {
  firstAttempt: 5,
  perfectStreak: 10,
  difficultyBonus: difficulty === 'hard' ? 15 : 0
};

totalXP = baseXP + bonuses;
```

---

## 📊 SISTEMA DE MÉTRICAS

**Arquivo:** `/utils/analytics/simple-metrics.ts`

### Eventos Rastreados:

| Evento | Quando | Dados |
|--------|--------|-------|
| `session_started` | Usuário abre o app | timestamp |
| `question_answered` | Responde questão | correct: boolean |
| `screen_viewed` | Muda de tela | screen: string |
| `time_spent` | Fecha sessão | minutes: number |
| `feature_used` | Usa funcionalidade | feature: string |

### Armazenamento:

```typescript
localStorage: {
  'gabaritoo_metrics': Event[],        // Últimos 1000 eventos
  'gabaritoo_current_day_metrics': {   // Métricas do dia
    date: '2026-01-10',
    sessionsStarted: 3,
    questionsAnswered: 42,
    correctAnswers: 32,
    timeSpentMinutes: 35
  }
}
```

---

## 🔔 SISTEMA DE NOTIFICAÇÕES

**Arquitetura:**
- `/utils/notifications/NotificationService.ts` → Core
- `SmartNotificationContext.tsx` → Estado global
- 200 mensagens contextuais em `notificationMessages.ts`

**Inteligência:**
- Frequência adaptativa (reduz se ignorar 3x)
- Mensagens baseadas em contexto (streak, hora do dia)
- Horários otimizados (7h, 12h, 19h)

---

## 🔒 SEGURANÇA

### Práticas Implementadas:

| Aspecto | Status | Implementação |
|---------|--------|---------------|
| **Credenciais** | ✅ | Nenhuma hardcoded |
| **Sanitização** | ✅ | Sem innerHTML, eval() |
| **Tipagem** | ✅ | TypeScript strict |
| **localStorage** | ⚠️ | Cache, não fonte da verdade |
| **SQL Injection** | ✅ | Prepared statements |

### Melhorias Futuras:

- [ ] Checksums para dados críticos
- [ ] Validação de integridade
- [ ] Criptografia de progresso sensível

---

## 🧪 TESTABILIDADE

### Pontos Fortes:

- ✅ Arquitetura modular
- ✅ Responsabilidades separadas
- ✅ Props tipadas
- ✅ Funções puras em utils

### Pontos a Melhorar:

- [ ] Cobertura de testes atual: **0%**
- [ ] Meta inicial: **30%**
- [ ] Prioridade: SQLiteService, SyncService, hooks

---

## 🚀 DECISÕES TÉCNICAS

### Por que SQLite?

**Vantagens:**
- ✅ Offline-first real
- ✅ Performance local excelente
- ✅ Sem dependência de servidor
- ✅ Sem custos recorrentes

**Desvantagens:**
- ❌ Sincronização manual necessária
- ❌ Mais complexidade inicial

---

### Por que NÃO Supabase?

**Motivos:**
1. **Custo** → Free tier limitado
2. **Dependência** → App quebra se Supabase cair
3. **Complexidade** → RLS, auth, migrations remotas
4. **Offline** → Supabase não é offline-first

**Migração:**
- Removido em 10/01/2026 (Auditoria 2.1)
- Substituído por SQLite + API própria

---

### Por que Capacitor (e não React Native)?

**Vantagens:**
- ✅ Web-first (reutiliza código web)
- ✅ Menos complexidade
- ✅ Build mais rápido
- ✅ Fácil debug (Chrome DevTools)

---

## 📈 ROADMAP ARQUITETURAL

### Curto Prazo (1-2 meses):

- [ ] Testes automatizados (30% cobertura)
- [ ] CI/CD básico (GitHub Actions)
- [ ] Logs estruturados (Sentry)

### Médio Prazo (3-6 meses):

- [ ] API REST própria (substituir JSON estático)
- [ ] Sincronização delta (apenas mudanças)
- [ ] Cache inteligente de imagens

### Longo Prazo (6-12 meses):

- [ ] Versão iOS (Capacitor)
- [ ] PWA (Progressive Web App)
- [ ] Multiplayer (rankings, desafios)

---

## 🆘 TROUBLESHOOTING

### Problema: SQLite não inicializa

**Causa:** Plugin Capacitor não instalado

**Solução:**
```bash
npm install @capacitor-community/sqlite
npx cap sync android
```

---

### Problema: Sincronização falha

**Causa:** Arquivo `/data/questions.json` não existe

**Solução:**
```bash
mkdir -p public/data
# Colocar questions.json lá
```

---

### Problema: Build quebra após remover Supabase

**Causa:** Imports remanescentes

**Solução:**
```bash
grep -r "@supabase/supabase-js" .
# Remover imports encontrados
```

---

## 📚 REFERÊNCIAS

- [Documentação Capacitor](https://capacitorjs.com)
- [Capacitor SQLite Plugin](https://github.com/capacitor-community/sqlite)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Context Best Practices](https://react.dev/learn/passing-data-deeply-with-context)

---

**Última revisão:** 10 de Janeiro de 2026  
**Próxima revisão:** Pós-testes com usuários

---

**📖 Este documento é a fonte da verdade para decisões arquiteturais do projeto.**
