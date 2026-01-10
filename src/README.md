# 📚 Gabaritoo - App de Estudos para Concursos

Aplicativo Android nativo desenvolvido em React + Capacitor para estudos de concursos públicos.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Quiz Inteligente** - Sistema de questões com dificuldade adaptativa
- **Estatísticas Completas** - Gráficos de desempenho e progresso
- **Gamificação** - Sistema de XP, níveis e badges
- **Dashboard Analítico** - Visão geral do seu progresso
- **Modo Simulado** - Simulados cronometrados
- **Múltiplos Perfis** - Estude para diferentes cargos
- **Revisão Inteligente** - 30% questões erradas + 70% novas
- **Customização Visual** - 8 temas diferentes
- **Notificações Inteligentes** - Lembretes motivacionais
- **Regimento Interno** - Consulta de legislação
- **Flashcards** - Revisão rápida de conteúdo
- **Plano de Estudos** - Configurações personalizadas

## 🛠️ Tecnologias

- **React 18** + TypeScript
- **Capacitor 6** (Android)
- **SQLite** (Banco local)
- **Tailwind CSS 4.0**
- **Radix UI** (Componentes)
- **Recharts** (Gráficos)
- **Lucide React** (Ícones)

## 📦 Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Build do projeto
npm run build

# 3. Sincronizar com Android
npx cap sync android

# 4. Abrir no Android Studio
npx cap open android
```

## 🔧 Scripts Disponíveis

```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run android:build    # Build + sync + abrir Android Studio
npm run android:sync     # Apenas sincronizar com Android
npm run android:run      # Executar no dispositivo conectado
```

## ⚙️ Configurações Importantes

### Auto-Seed do Banco de Dados

Por padrão, o banco de dados SQLite começa **VAZIO**.

**Para habilitar auto-população com questões de teste:**

Edite `/hooks/useDatabaseSeed.ts`:
```typescript
const AUTO_SEED_ENABLED = true;  // Mude para true
```

**Comportamento:**
- `false` (padrão) = Banco vazio, precisa importar questões
- `true` = Auto-popula com 12 questões de exemplo do seedQuestions.ts

### Dashboard sem Dados Hardcoded

O Dashboard agora usa **dados reais** dos contextos:
- `useGame()` → XP e Nível
- `useStats()` → Estatísticas e Precisão

Se o banco estiver vazio, mostra:
```
Nível: 1
XP: 0
Precisão: 0%
"Nenhuma estatística registrada ainda. Comece a estudar!"
```

## 📱 Estrutura do Projeto

```
/
├── app/                  # Arquitetura principal
│   ├── AppProviders.tsx  # Providers de contexto
│   ├── AppRoutes.tsx     # Rotas da aplicação
│   └── AppShell.tsx      # Shell principal
├── components/           # Componentes React
│   ├── ui/              # Componentes de UI (Radix)
│   ├── Dashboard.tsx    # Dashboard principal
│   ├── Statistics.tsx   # Estatísticas
│   ├── Achievements.tsx # Gamificação
│   └── ...
├── context/             # Contexts React
│   ├── AppState/        # Estado global unificado
│   └── ...
├── data/                # Dados estáticos
│   ├── questions.ts     # Questões do quiz
│   └── badges.ts        # Sistema de badges
├── lib/                 # Bibliotecas core
│   ├── database/        # SQLite Service
│   └── themeConfig.ts   # Configuração de temas
├── hooks/               # Custom hooks
├── utils/               # Utilitários
└── styles/              # Estilos globais
```

## 🎯 Arquitetura

### Local-First Híbrida
- **SQLite** como banco principal
- **AppState** centralizado em `/context/AppState/`
- **Hooks especializados** para lógica de negócio
- **Componentes isolados** e reutilizáveis

### Fluxo de Dados
```
SQLiteService → AppState → Hooks → Components
```

## 🎨 Temas Disponíveis

1. **Oceano Profundo** - Azul escuro profissional
2. **Pôr do Sol** - Laranja vibrante
3. **Floresta** - Verde natural
4. **Ametista** - Roxo sofisticado
5. **Rubi** - Vermelho elegante
6. **Âmbar** - Dourado quente
7. **Menta** - Verde claro
8. **Lavanda** - Roxo suave

## 📊 Banco de Dados

### SQLite Local
- Tabela de questões
- Progresso do usuário
- Estatísticas
- Configurações

### Migrations
Localizadas em `/lib/database/migrations.ts`

## 🔔 Notificações

Sistema inteligente com:
- 200+ mensagens motivacionais
- Frequência configurável
- Baseado em performance
- Contexto adaptativo

## 🏆 Sistema de Gamificação

- **XP** - Ganhe experiência respondendo questões
- **Níveis** - 100 níveis disponíveis
- **Badges** - Conquistas especiais
- **Streaks** - Sequências de acertos

## 📝 Licença

Propriedade de desenvolvimento privado.

## 👨‍💻 Desenvolvimento

Desenvolvido para estudantes de concursos públicos com foco em:
- Interface intuitiva
- Performance otimizada
- Experiência offline-first
- Gamificação engajadora

---

**Versão:** 1.0.0  
**Status:** Em desenvolvimento ativo