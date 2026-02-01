# 🚀 ARQUITETURA OFFLINE-FIRST - GABARITOO

**Data:** 01/02/2026  
**Versão:** 2.0  
**Status:** ✅ Implementado

---

## 📋 VISÃO GERAL

Esta arquitetura **elimina custos de banco de dados** e garante **performance instantânea** usando SQLite local.

### **Fluxo Completo:**

```
┌─────────────────────────────────────────────────────────────┐
│  1. USUÁRIO ESCOLHE PERFIL                                  │
│     ├─ Cargo: "Técnico Judiciário"                          │
│     ├─ Banca: "CESPE"                                        │
│     └─ Nível: "Médio"                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. APP BAIXA PACOTE DO SERVIDOR (1x)                       │
│     GET https://servidor.com/downloads/cespe/tecnico.json   │
│     ├─ Tamanho: ~500KB-2MB (comprimido)                     │
│     ├─ Conteúdo: 2.000 questões filtradas                   │
│     └─ Tempo: ~2-5 segundos                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. IMPORTA PARA SQLITE LOCAL                               │
│     ├─ Limpa questões antigas (evita duplicatas)            │
│     ├─ Insere 2.000 questões em transação única             │
│     └─ Tempo: <2 segundos                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. APP FUNCIONA 100% OFFLINE                               │
│     ├─ Lê questões do SQLite (instantâneo)                  │
│     ├─ Zero requisições ao servidor                         │
│     ├─ Zero custo de infraestrutura                         │
│     └─ Funciona sem internet                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 ECONOMIA DE CUSTOS

### **Cenário Antigo (Supabase):**

| Ação | Requisições | Custo/mês |
|------|------------|-----------|
| Usuário resolve 100 questões/dia | 3.000/mês | $0.10 |
| 1.000 usuários ativos | 3.000.000/mês | **$100** |
| 10.000 usuários ativos | 30.000.000/mês | **$1.000** |

### **Cenário Novo (Offline-First):**

| Ação | Requisições | Custo/mês |
|------|------------|-----------|
| Usuário baixa pacote 1x | 1/mês | $0.00001 |
| 1.000 usuários ativos | 1.000/mês | **$0.01** |
| 10.000 usuários ativos | 10.000/mês | **$0.10** |

**Economia:** 99,9% 🎉

---

## 🏗️ IMPLEMENTAÇÃO

### **Passo 1: Estrutura de Arquivos no Servidor**

```
gabaritoo-data/ (GitHub Pages, Cloudflare R2, etc)
├── downloads/
│   ├── cespe/
│   │   ├── tecnico-medio.json          (2.000 questões)
│   │   ├── tecnico-superior.json       (1.500 questões)
│   │   ├── analista-superior.json      (2.500 questões)
│   │   └── metadata.json               (versões, checksums)
│   │
│   ├── fcc/
│   │   ├── tecnico-medio.json
│   │   ├── analista-superior.json
│   │   └── metadata.json
│   │
│   └── vunesp/
│       ├── tecnico-medio.json
│       └── analista-superior.json
│
└── README.md
```

### **Passo 2: Formato do JSON**

**Arquivo:** `cespe/tecnico-medio.json`

```json
{
  "metadata": {
    "perfil": "Técnico Judiciário",
    "banca": "CESPE",
    "cargo": "Técnico",
    "nivel": "Médio",
    "versao": "2024-01-15",
    "total": 2000,
    "checksum": "sha256:abc123..."
  },
  "questoes": [
    {
      "id": "q_001",
      "materia": "Informática",
      "dificuldade": "medio",
      "pergunta": "Qual comando Linux lista arquivos ocultos?",
      "opcoes": [
        "ls -l",
        "ls -a",
        "ls -h",
        "ls -r"
      ],
      "correta": 1,
      "explicacao": "O comando 'ls -a' lista todos os arquivos, incluindo ocultos (que começam com ponto)."
    },
    {
      "id": "q_002",
      "materia": "Português",
      "dificuldade": "facil",
      "pergunta": "Qual a classe gramatical da palavra 'rapidamente'?",
      "opcoes": [
        "Adjetivo",
        "Advérbio",
        "Substantivo",
        "Verbo"
      ],
      "correta": 1,
      "explicacao": "Palavras terminadas em -mente são advérbios de modo."
    }
    // ... mais 1.998 questões
  ]
}
```

### **Passo 3: Gerar Pacotes (Script Python)**

```python
# scripts/gerar_pacotes.py
import json
import hashlib
from datetime import datetime

def gerar_pacote(banca, cargo, nivel, questoes_filtradas):
    """
    Filtra questões e gera arquivo JSON para download
    """
    pacote = {
        "metadata": {
            "perfil": f"{cargo} Judiciário",
            "banca": banca,
            "cargo": cargo,
            "nivel": nivel,
            "versao": datetime.now().strftime("%Y-%m-%d"),
            "total": len(questoes_filtradas),
            "checksum": calcular_checksum(questoes_filtradas)
        },
        "questoes": questoes_filtradas
    }
    
    # Salvar arquivo
    filename = f"downloads/{banca.lower()}/{cargo.lower()}-{nivel.lower()}.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(pacote, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Pacote gerado: {filename} ({len(questoes_filtradas)} questões)")

def calcular_checksum(questoes):
    """Gera hash SHA256 das questões para verificar integridade"""
    content = json.dumps(questoes, sort_keys=True)
    return hashlib.sha256(content.encode()).hexdigest()

# Exemplo de uso
questoes_cespe_tecnico = [
    # ... carregar do banco de dados ou CSV
]

gerar_pacote("CESPE", "Tecnico", "Medio", questoes_cespe_tecnico)
```

### **Passo 4: Hospedar Arquivos (GitHub Pages)**

```bash
# 1. Criar repositório
git init
git add downloads/
git commit -m "Add question packages"

# 2. Push para GitHub
git remote add origin https://github.com/seu-usuario/gabaritoo-data.git
git push -u origin main

# 3. Ativar GitHub Pages
# Settings → Pages → Source: main branch

# 4. Acessar em:
# https://seu-usuario.github.io/gabaritoo-data/downloads/cespe/tecnico-medio.json
```

### **Passo 5: Configurar URL no App**

**Arquivo:** `/services/SyncService.ts` (linha 51)

```typescript
const SERVER_URL = 'https://seu-usuario.github.io/gabaritoo-data/downloads';
```

---

## 📱 USO NO APP

### **Exemplo 1: Baixar Pacote ao Escolher Perfil**

**Arquivo:** `/components/ProfileSelector.tsx`

```typescript
import { syncService } from '../services/SyncService';

function ProfileSelector() {
  const [perfil, setPerfil] = useState({
    cargo: 'Técnico Judiciário',
    banca: 'CESPE',
    nivel: 'Médio'
  });

  const handleSalvarPerfil = async () => {
    // 1. Salvar perfil no contexto
    updateProfile(perfil);

    // 2. Baixar pacote de questões
    const sucesso = await syncService.baixarPacote(perfil);

    if (sucesso) {
      toast.success('Perfil configurado! Questões baixadas.');
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <select onChange={(e) => setPerfil({...perfil, cargo: e.target.value})}>
        <option value="Técnico Judiciário">Técnico</option>
        <option value="Analista Legislativo">Analista</option>
      </select>

      <select onChange={(e) => setPerfil({...perfil, banca: e.target.value})}>
        <option value="CESPE">CESPE</option>
        <option value="FCC">FCC</option>
        <option value="VUNESP">VUNESP</option>
      </select>

      <button onClick={handleSalvarPerfil}>
        Salvar Perfil e Baixar Questões
      </button>
    </div>
  );
}
```

### **Exemplo 2: Usar Questões no Quiz**

**Arquivo:** `/components/QuizScreen.tsx`

```typescript
import { useSQLiteQuestions } from '../hooks/useSQLiteQuestions';

function QuizScreen() {
  const { data: questions, isLoading } = useSQLiteQuestions({
    materia: 'Informática',
    dificuldade: 'medio',
    limite: 20
  });

  if (isLoading) {
    return <div>Carregando questões...</div>;
  }

  return (
    <div>
      <h1>Quiz de Informática</h1>
      {questions?.map((q, index) => (
        <QuestionCard key={q.id} question={q} number={index + 1} />
      ))}
    </div>
  );
}
```

### **Exemplo 3: Sincronização Automática no Boot**

**Arquivo:** `/app/AppShell.tsx`

```typescript
import { syncService } from '../services/SyncService';
import { useConcursoProfile } from '../context/ConcursoProfileContext';

function AppShell() {
  const { perfilAtivo } = useConcursoProfile();

  useEffect(() => {
    // Sincronizar automaticamente no boot do app
    if (perfilAtivo) {
      syncService.autoSync({
        cargo: perfilAtivo.cargo,
        banca: perfilAtivo.banca,
        nivel: perfilAtivo.nivel
      });
    }
  }, [perfilAtivo]);

  return (
    // ... resto do app
  );
}
```

### **Exemplo 4: Botão "Atualizar Questões" nas Configurações**

**Arquivo:** `/components/Settings.tsx`

```typescript
import { syncService } from '../services/SyncService';

function Settings() {
  const { perfilAtivo } = useConcursoProfile();

  const handleAtualizarQuestoes = async () => {
    if (!perfilAtivo) {
      toast.error('Configure um perfil primeiro');
      return;
    }

    const sucesso = await syncService.baixarPacote({
      cargo: perfilAtivo.cargo,
      banca: perfilAtivo.banca,
      nivel: perfilAtivo.nivel
    });

    if (sucesso) {
      toast.success('Questões atualizadas!');
    }
  };

  return (
    <div>
      <h2>Configurações</h2>
      
      <button onClick={handleAtualizarQuestoes}>
        🔄 Atualizar Questões
      </button>

      <SyncStatus />
    </div>
  );
}

function SyncStatus() {
  const status = syncService.getStatus();

  return (
    <div className="bg-card p-4 rounded-lg">
      <h3>Status da Sincronização</h3>
      <p>Perfil: {status.perfilAtual || 'Nenhum'}</p>
      <p>Total de questões: {status.totalQuestoes}</p>
      <p>Última atualização: {status.ultimaSync ? new Date(status.ultimaSync).toLocaleString() : 'Nunca'}</p>
      <p>Versão: {status.versaoAtual || 'N/A'}</p>
    </div>
  );
}
```

---

## 🧪 TESTES

### **Teste 1: Verificar SQLite**

```typescript
import { sqliteService } from './lib/database/SQLiteService';

async function testarSQLite() {
  await sqliteService.initialize();
  
  const stats = await sqliteService.getDatabaseStats();
  console.log('Estatísticas:', stats);
  
  const temQuestoes = await sqliteService.hasQuestions();
  console.log('Tem questões?', temQuestoes);
}
```

### **Teste 2: Download de Pacote**

```typescript
import { syncService } from './services/SyncService';

async function testarDownload() {
  const sucesso = await syncService.baixarPacote({
    cargo: 'Técnico',
    banca: 'CESPE',
    nivel: 'Médio'
  });
  
  console.log('Download bem-sucedido?', sucesso);
}
```

### **Teste 3: Buscar Questões**

```typescript
import { sqliteService } from './lib/database/SQLiteService';

async function testarBusca() {
  const questoes = await sqliteService.query(
    'SELECT * FROM questions WHERE discipline = ? LIMIT 5',
    ['Informática']
  );
  
  console.log('Questões encontradas:', questoes);
}
```

---

## 📊 MONITORAMENTO

### **Métricas Importantes:**

1. **Taxa de sucesso de download:**
   - Meta: >95%
   - Monitorar: erros de rede, timeouts

2. **Tempo médio de download:**
   - Meta: <5 segundos
   - Otimizar: compressão gzip, CDN

3. **Uso de armazenamento:**
   - Meta: <10MB por perfil
   - Otimizar: limpar questões antigas

4. **Performance de queries:**
   - Meta: <50ms por busca
   - Otimizar: índices no SQLite

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ **SyncService implementado**
2. ✅ **Hook useSQLiteQuestions criado**
3. 🎯 **Gerar arquivos JSON** (próximo)
4. ⏳ **Hospedar no GitHub Pages**
5. ⏳ **Integrar em ProfileSelector**
6. ⏳ **Atualizar hooks existentes**

---

**Documentação criada por:** Equipe Gabaritoo  
**Data:** 01/02/2026  
**Status:** Pronto para implementação
