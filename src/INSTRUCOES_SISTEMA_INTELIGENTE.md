# 🧠 SISTEMA DE QUIZ INTELIGENTE - GABARITOO

## 📋 Visão Geral

Este documento contém as instruções completas para implementar o **Sistema de Quiz Inteligente** do Gabaritoo, que inclui:

- ✅ **Banco de Dados Relacional** (Supabase/PostgreSQL)
- ✅ **Algoritmo de Repetição Espaçada**
- ✅ **Sistema de Embaralhamento de Opções**
- ✅ **Revisão Forçada de Erros**
- ✅ **Rastreamento Individual de Questões**
- ✅ **Gamificação Completa (XP, Níveis, Streak)**
- ✅ **Sistema de Arquétipos para Cargos**

---

## 🚀 PASSO 1: Executar o SQL no Supabase

### 1.1. Acessar o Editor SQL do Supabase

1. Acesse: https://supabase.com/dashboard/project/gcetjuilvhryduzchoow
2. No menu lateral, clique em **"SQL Editor"**
3. Clique em **"+ New Query"**

### 1.2. Copiar e Executar o Script

1. Abra o arquivo: `/supabase/migrations/001_create_quiz_schema.sql`
2. Copie **TODO** o conteúdo do arquivo
3. Cole no editor SQL do Supabase
4. Clique em **"Run"** (ou pressione Ctrl+Enter)

⚠️ **IMPORTANTE**: Se aparecer algum erro de "já existe", ignore. O SQL usa `IF NOT EXISTS` e `ON CONFLICT` para evitar duplicações.

### 1.3. Verificar se foi criado corretamente

Após executar, você deve ver as seguintes tabelas no menu **"Table Editor"**:

- ✅ `profiles` - Perfis dos usuários
- ✅ `subjects` - Matérias/Assuntos
- ✅ `archetypes` - Arquétipos de cargos
- ✅ `job_roles` - Cargos vinculados aos arquétipos
- ✅ `questions` - Banco de questões
- ✅ `user_question_progress` - Progresso individual por questão
- ✅ `study_sessions` - Histórico de sessões

---

## 🎯 PASSO 2: Inserir Questões de Exemplo

### 2.1. Criar questões no banco

Execute este SQL no **SQL Editor** para criar questões de exemplo:

```sql
-- Buscar IDs das matérias
DO $$
DECLARE
    v_subject_portugues UUID;
    v_subject_informatica UUID;
    v_subject_matematica UUID;
BEGIN
    -- Buscar IDs
    SELECT id INTO v_subject_portugues FROM public.subjects WHERE name = 'Português';
    SELECT id INTO v_subject_informatica FROM public.subjects WHERE name = 'Informática';
    SELECT id INTO v_subject_matematica FROM public.subjects WHERE name = 'Matemática';

    -- Inserir Questões de Português
    INSERT INTO public.questions (text, options, correct_option_id, subject_id, difficulty_level) VALUES
    (
        'Assinale a alternativa que apresenta ERRO de concordância verbal:',
        '[
            {"id": "a", "text": "Fazem dois anos que não o vejo."},
            {"id": "b", "text": "Devem haver soluções para este problema."},
            {"id": "c", "text": "Mais de um aluno faltou à prova."},
            {"id": "d", "text": "A maioria dos estudantes passou no exame."}
        ]'::jsonb,
        'b',
        v_subject_portugues,
        'medio'
    ),
    (
        'Qual das opções abaixo está correta quanto à colocação pronominal?',
        '[
            {"id": "a", "text": "Me disseram que você estava doente."},
            {"id": "b", "text": "Nunca te vi tão feliz."},
            {"id": "c", "text": "Falaram-me sobre o caso."},
            {"id": "d", "text": "Ninguém lhe contou a verdade."}
        ]'::jsonb,
        'd',
        v_subject_portugues,
        'dificil'
    );

    -- Inserir Questões de Informática
    INSERT INTO public.questions (text, options, correct_option_id, subject_id, difficulty_level) VALUES
    (
        'Qual das alternativas abaixo NÃO é um sistema operacional?',
        '[
            {"id": "a", "text": "Windows"},
            {"id": "b", "text": "Linux"},
            {"id": "c", "text": "Oracle"},
            {"id": "d", "text": "macOS"}
        ]'::jsonb,
        'c',
        v_subject_informatica,
        'facil'
    ),
    (
        'Em redes de computadores, o que significa a sigla IP?',
        '[
            {"id": "a", "text": "Internal Protocol"},
            {"id": "b", "text": "Internet Protocol"},
            {"id": "c", "text": "Integrated Protocol"},
            {"id": "d", "text": "Information Protocol"}
        ]'::jsonb,
        'b',
        v_subject_informatica,
        'medio'
    ),
    (
        'Qual linguagem de programação é conhecida como "A linguagem da web"?',
        '[
            {"id": "a", "text": "Python"},
            {"id": "b", "text": "Java"},
            {"id": "c", "text": "JavaScript"},
            {"id": "d", "text": "C++"}
        ]'::jsonb,
        'c',
        v_subject_informatica,
        'facil'
    );

    -- Inserir Questões de Matemática
    INSERT INTO public.questions (text, options, correct_option_id, subject_id, difficulty_level) VALUES
    (
        'Quanto é 15% de 200?',
        '[
            {"id": "a", "text": "25"},
            {"id": "b", "text": "30"},
            {"id": "c", "text": "35"},
            {"id": "d", "text": "40"}
        ]'::jsonb,
        'b',
        v_subject_matematica,
        'facil'
    ),
    (
        'A raiz quadrada de 144 é:',
        '[
            {"id": "a", "text": "10"},
            {"id": "b", "text": "11"},
            {"id": "c", "text": "12"},
            {"id": "d", "text": "13"}
        ]'::jsonb,
        'c',
        v_subject_matematica,
        'facil'
    );
END $$;
```

---

## 🔧 PASSO 3: Integrar no Frontend

### 3.1. Usar o Hook `useSmartQuiz`

No seu componente, importe e use o hook:

```tsx
import { useSmartQuiz } from '../hooks/useSmartQuiz';

function MyQuizComponent() {
  const { fetchBlock, getCurrentQuestion, handleAnswer } = useSmartQuiz({
    archetypeId: 2, // Técnico em Informática
    userId: 'seu-user-id-aqui',
    questionsPerBlock: 10
  });

  // Usar as funções...
}
```

### 3.2. Ou usar o Componente Pronto

```tsx
import { SmartQuizSession } from '../components/SmartQuizSession';

function App() {
  return (
    <SmartQuizSession
      archetypeId={2}
      userId="seu-user-id-aqui"
      onSessionComplete={(stats) => {
        console.log('Sessão completa!', stats);
      }}
    />
  );
}
```

---

## 📊 COMO FUNCIONA O ALGORITMO

### 1. **Busca de Questões Inteligente**

O sistema usa a função SQL `get_smart_questions()` que:

- Busca questões baseadas nos **pesos do arquétipo**
- Evita questões já **masterizadas** (>4 acertos)
- Evita questões **críticas** (>6 erros)
- Evita questões que já apareceram **10 vezes**
- Distribui as questões proporcionalmente por matéria

**Exemplo**: Arquétipo "Técnico em Informática":
- 40% Informática → 4 questões
- 20% LGPD → 2 questões
- 20% Governança de TI → 2 questões
- 15% Português → 1-2 questões
- 5% Legislação → 0-1 questões

### 2. **Sistema de Embaralhamento**

Toda vez que uma questão é carregada:
- As opções A, B, C, D são **embaralhadas** usando Fisher-Yates
- Isso força o usuário a **LER** ao invés de decorar posições
- No banco, a opção correta é salva por ID, não por posição

### 3. **Revisão Forçada (O Loop de 30%)**

Quando o usuário **erra** uma questão:
- A questão vai para a **fila de revisão imediata**
- Após terminar o bloco de 10, entra no **Modo Revisão**
- O usuário **não pode avançar** até acertar
- Se errar de novo, as opções são **embaralhadas novamente**

### 4. **Sistema de Progresso Individual**

Cada questão tem um registro em `user_question_progress`:

```
times_viewed: 0-10 (máx 10 aparições)
times_correct: 0-∞ (>4 = masterizada)
times_wrong_total: 0-∞ (>6 = crítica)
is_mastered: true/false
is_critical: true/false
```

**Regras**:
- ✅ **Masterizada**: Acertou mais de 4 vezes → Sai da rotação
- ❌ **Crítica**: Errou mais de 6 vezes → Vai para "Caderno de Erros"
- 🔁 **Limite de 10**: Apareceu 10 vezes → Arquivada

---

## 🎮 GAMIFICAÇÃO

### XP e Níveis

- **+10 XP** por resposta correta
- **+2 XP** por tentativa (mesmo errando)
- **100 XP** = 1 nível
- Níveis salvos em `profiles.nivel`

### Streak (Sequência)

- Contador de dias consecutivos estudando
- Salvo em `profiles.streak_atual`
- Recorde em `profiles.maior_streak`

### Estatísticas

- **Precisão Global**: Média de acertos de todas as questões
- **Total de Questões**: Contador incremental
- Salvas em `profiles`

---

## 🎯 CRIAR NOVOS ARQUÉTIPOS

Para adicionar um novo tipo de cargo:

```sql
-- 1. Criar o arquétipo
INSERT INTO public.archetypes (name, nivel, subjects_weights) VALUES
(
    'Médico',
    'superior',
    '[
        {"subject": "Medicina", "weight": 50},
        {"subject": "SUS", "weight": 30},
        {"subject": "Português", "weight": 20}
    ]'
);

-- 2. Vincular cargos ao arquétipo
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT 
    'Médico Clínico Geral', 
    id,
    'superior'
FROM public.archetypes 
WHERE name = 'Médico';
```

---

## 📝 PRÓXIMOS PASSOS

1. ✅ Executar o SQL no Supabase
2. ✅ Inserir questões de exemplo
3. ✅ Testar o componente `SmartQuizSession`
4. 📊 Criar um **dashboard de estatísticas**
5. 📚 Implementar o **Caderno de Erros** (questões críticas)
6. 🎯 Criar mais arquétipos para todos os 439 cargos
7. 📖 Importar questões reais de provas anteriores

---

## 🐛 TROUBLESHOOTING

### Erro: "relation does not exist"

**Solução**: Execute o SQL completo novamente.

### Erro: "function get_smart_questions does not exist"

**Solução**: A função está no SQL. Execute a seção de FUNÇÕES.

### Questões não aparecem

**Solução**: Insira questões de exemplo usando o SQL fornecido.

### RLS bloqueando acesso

**Solução**: As políticas RLS estão configuradas. Certifique-se de estar autenticado.

---

## 🎉 CONCLUSÃO

Com este sistema, o Gabaritoo agora tem:

- ✅ Repetição espaçada inteligente
- ✅ Rastreamento individual de cada questão
- ✅ Sistema de revisão forçada
- ✅ Gamificação completa
- ✅ Suporte para 439 cargos diferentes
- ✅ Escalabilidade para milhares de questões

**O sistema está pronto para uso!** 🚀
