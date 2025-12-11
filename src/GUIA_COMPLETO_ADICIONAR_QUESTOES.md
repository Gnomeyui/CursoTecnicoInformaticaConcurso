# 📚 GUIA COMPLETO - COMO ADICIONAR QUESTÕES

## 🎯 ONDE FICAM AS QUESTÕES ATUALMENTE

Seu aplicativo possui **1230 questões** distribuídas em **3 arquivos** na pasta `/data`:

```
/data/
  ├── questions.ts                  ← Questões 1-1200 (arquivo principal - ATIVO)
  ├── questions_201_260.ts          ← Questões antigas (arquivo legacy - NÃO USADO)
  ├── questions-lote-14-23.ts       ← Questões 301-330 (30 questões - NÃO INTEGRADO)
  └── flashcards.ts                 ← 200 Flashcards
```

**⚠️ IMPORTANTE:** 
- O arquivo **`questions.ts`** contém TODAS as 1200 questões funcionais (IDs 1-1200)
- Os arquivos `questions_201_260.ts` e `questions-lote-14-23.ts` NÃO estão sendo importados/usados
- Para adicionar novas questões, você deve adicionar no arquivo **`questions.ts`** ou criar um novo arquivo E importá-lo nos componentes

---

## 📝 FORMATO PADRÃO DE UMA QUESTÃO

Cada questão segue esta estrutura **EXATA**:

```typescript
{
  id: 401,                                    // Número único sequencial
  materia: "Redes - Protocolos",              // Categoria da questão
  pergunta: "Qual protocolo opera na camada de transporte?",
  opcoes: [
    "IP",
    "TCP",
    "Ethernet",
    "DNS"
  ],
  correta: 1,                                 // Índice da opção correta (0,1,2 ou 3)
  explicacao: "O TCP é um protocolo da camada 4 (Transporte) do modelo OSI, responsável por garantir a entrega confiável de pacotes."
}
```

### ⚠️ REGRAS IMPORTANTES:

- **`id`**: SEMPRE use o próximo número sequencial (não pule números!)
- **`materia`**: Use as categorias existentes para manter consistência
- **`opcoes`**: SEMPRE 4 alternativas (array com exatamente 4 strings)
- **`correta`**: Número de 0 a 3 (0=primeira opção, 1=segunda, 2=terceira, 3=quarta)
- **`explicacao`**: Seja detalhado! Isso ajuda no aprendizado
- **Vírgula final**: Coloque `,` após fechar cada questão (exceto a última antes do `]`)

---

## 🆕 MÉTODO 1: ADICIONAR QUESTÕES EM ARQUIVO EXISTENTE

### Passo a Passo:

1. **Abra o arquivo** onde quer adicionar (ex: `/data/questions.ts`)

2. **Role até o final** e encontre:
```typescript
  },  // ← Última questão existente
]; // ← Fechamento do array
```

3. **Cole ANTES do `];`** suas novas questões:
```typescript
  },  // ← Última questão existente (ID 1200)
  {
    id: 1201,
    materia: "Segurança - Criptografia",
    pergunta: "Qual algoritmo é considerado obsoleto para hash de senhas?",
    opcoes: ["SHA-256", "bcrypt", "MD5", "Argon2"],
    correta: 2,
    explicacao: "MD5 é considerado criptograficamente quebrado e não deve ser usado para senhas. Use bcrypt, Argon2 ou scrypt."
  },
  {
    id: 1202,
    materia: "Redes - IPv6",
    pergunta: "Quantos bits possui um endereço IPv6?",
    opcoes: ["32 bits", "64 bits", "128 bits", "256 bits"],
    correta: 2,
    explicacao: "IPv6 utiliza endereços de 128 bits, representados em hexadecimal separados por dois pontos."
  }
]; // ← Fechamento do array (NÃO MEXA NISSO)
```

4. **Salve o arquivo** (Ctrl+S ou Cmd+S)

---

## 🗂️ MÉTODO 2: CRIAR NOVO ARQUIVO DE QUESTÕES

### Quando criar um novo arquivo?
- Quando quiser organizar por lotes (ex: questões 401-500)
- Quando o arquivo atual ficar muito grande (> 200 questões)
- Para separar questões por banca (FGV, Cebraspe, etc.)

### Template de Novo Arquivo:

**Nome sugerido**: `/data/questions_401_500.ts`

```typescript
export interface Question {
  id: number;
  materia: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export const QUESTIONS_401_500: Question[] = [
  {
    id: 401,
    materia: "Governança - COBIT",
    pergunta: "O COBIT 2019 é baseado em quantos princípios fundamentais?",
    opcoes: ["3 princípios", "5 princípios", "6 princípios", "7 princípios"],
    correta: 2,
    explicacao: "O COBIT 2019 possui 6 princípios: Prover Valor, Abordagem Holística, Sistema de Governança Dinâmico, Governança Distinta de Gestão, Adaptado às Necessidades da Empresa, e Sistema de Governança Fim-a-Fim."
  },
  {
    id: 402,
    materia: "LGPD - Fundamentos",
    pergunta: "Qual é a autoridade nacional responsável por fiscalizar o cumprimento da LGPD?",
    opcoes: ["CGU", "TCU", "ANPD", "MPF"],
    correta: 2,
    explicacao: "A ANPD (Autoridade Nacional de Proteção de Dados) é o órgão responsável por zelar, implementar e fiscalizar o cumprimento da LGPD no Brasil."
  },
  {
    id: 403,
    materia: "Linux - Comandos",
    pergunta: "Qual comando exibe os processos em execução em tempo real?",
    opcoes: ["ps aux", "top", "kill", "df -h"],
    correta: 1,
    explicacao: "O comando 'top' exibe uma lista dinâmica de processos em execução, atualizada em tempo real, mostrando uso de CPU, memória, etc."
  }
  // ... adicione quantas questões quiser
];
```

### Depois de criar o arquivo:

**IMPORTANTE**: Você precisa importar no `/utils/questionManager.ts`:

1. Abra `/utils/questionManager.ts`
2. Adicione o import:
```typescript
import { QUESTIONS_401_500 } from '../data/questions_401_500';
```
3. Adicione no array de merge:
```typescript
const allQuestions = [
  ...QUESTIONS,
  ...QUESTIONS_201_260,
  ...QUESTIONS_LOTE_14_23,
  ...QUESTIONS_401_500  // ← Nova linha
];
```

---

## 📋 CATEGORIAS DE MATÉRIAS EXISTENTES

Use estas categorias para manter consistência:

### 🖥️ **Informática:**
- `"Informatica - Armazenamento"`
- `"Redes - Camadas"`
- `"Redes - Protocolos"`
- `"Redes - IPv4"`
- `"Redes - IPv6"`
- `"Segurança - Criptografia"`
- `"Segurança - Ataques"`
- `"Segurança - Firewall"`
- `"Hardware - Componentes"`
- `"Hardware - Barramentos"`
- `"Linux - Comandos"`
- `"Linux - Permissões"`
- `"Windows - Sistemas"`
- `"Windows - Active Directory"`

### ⚖️ **Legislação:**
- `"Legislação - ALE-RR"`
- `"Legislação - Mesa Diretora"`
- `"Legislação - Vacância"`
- `"Direito Administrativo"`
- `"Constitucional - Acumulação"`
- `"Processo Legislativo"`

### 📖 **Português:**
- `"Português - Ortografia"`
- `"Português - Sintaxe"`
- `"Português - Concordância"`
- `"Português - Regência"`
- `"Português - Interpretação"`

### 🔐 **LGPD:**
- `"LGPD - Fundamentos"`
- `"LGPD - Direitos do Titular"`
- `"LGPD - Sanções"`
- `"LGPD - DPO"`

### 🎯 **Governança:**
- `"Governança - COBIT"`
- `"Governança - ITIL"`
- `"Governança - ISO"`

---

## ✅ CHECKLIST ANTES DE ADICIONAR

- [ ] Verifiquei o **último ID usado** (atualmente: 1200)
- [ ] Minhas questões começam no **próximo número** (1201, 1202, 1203...)
- [ ] Cada questão tem **exatamente 4 opções**
- [ ] O índice `correta` está **correto** (0, 1, 2 ou 3)
- [ ] Coloquei **vírgula após cada questão** (menos a última)
- [ ] Testei se a explicação está **clara e educativa**
- [ ] Usei uma **categoria existente** da lista acima

---

## 🚀 EXEMPLO PRÁTICO - ADICIONAR 5 QUESTÕES

Vou adicionar questões 1201-1205 no arquivo `/data/questions.ts`:

```typescript
  }, // ← Última questão ID 1200
  {
    id: 1201,
    materia: "Segurança - Autenticação",
    pergunta: "Qual fator de autenticação é caracterizado como 'algo que você possui'?",
    opcoes: [
      "Senha",
      "Token físico",
      "Impressão digital",
      "PIN"
    ],
    correta: 1,
    explicacao: "Os fatores de autenticação são: algo que você sabe (senha/PIN), algo que você possui (token/cartão), e algo que você é (biometria)."
  },
  {
    id: 1202,
    materia: "Redes - DNS",
    pergunta: "Qual tipo de registro DNS aponta um domínio para um endereço IPv6?",
    opcoes: [
      "A",
      "AAAA",
      "CNAME",
      "MX"
    ],
    correta: 1,
    explicacao: "Registro A aponta para IPv4, AAAA aponta para IPv6, CNAME cria um alias, e MX indica servidores de email."
  },
  {
    id: 1203,
    materia: "Linux - Permissões",
    pergunta: "O que representa a permissão 'rwxr-xr--' em formato octal?",
    opcoes: [
      "644",
      "755",
      "754",
      "764"
    ],
    correta: 2,
    explicacao: "rwx=7 (dono), r-x=5 (grupo), r--=4 (outros). Portanto: 754."
  },
  {
    id: 1204,
    materia: "LGPD - Bases Legais",
    pergunta: "Qual base legal permite o tratamento de dados pessoais quando há risco à vida?",
    opcoes: [
      "Consentimento",
      "Legítimo interesse",
      "Proteção da vida",
      "Execução de contrato"
    ],
    correta: 2,
    explicacao: "A LGPD permite tratamento de dados sem consentimento quando necessário para proteção da vida ou incolumidade física do titular ou de terceiros (Art. 7º, VII)."
  },
  {
    id: 1205,
    materia: "Governança - ITIL",
    pergunta: "No ITIL 4, qual prática lida com a resolução rápida de interrupções não planejadas?",
    opcoes: [
      "Change Management",
      "Problem Management",
      "Incident Management",
      "Service Request Management"
    ],
    correta: 2,
    explicacao: "Incident Management (Gerenciamento de Incidentes) foca na restauração rápida do serviço após interrupções. Problem Management busca a causa raiz."
  }
]; // ← NÃO MEXA NESTA LINHA
```

---

## 💾 ARQUIVO PRONTO PARA COPIAR E COLAR

Se quiser criar um **novo arquivo limpo**, copie este template:

**Arquivo**: `/data/questions_PERSONALIZADAS.ts`

```typescript
export interface Question {
  id: number;
  materia: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export const QUESTIONS_PERSONALIZADAS: Question[] = [
  {
    id: 401,
    materia: "Redes - Protocolos",
    pergunta: "ADICIONE SUA PERGUNTA AQUI",
    opcoes: [
      "Opção A",
      "Opção B",
      "Opção C",
      "Opção D"
    ],
    correta: 0,
    explicacao: "ADICIONE SUA EXPLICAÇÃO DETALHADA AQUI"
  }
  // Adicione mais questões aqui
];
```

Depois importe no `/utils/questionManager.ts`:

```typescript
import { QUESTIONS_PERSONALIZADAS } from '../data/questions_PERSONALIZADAS';

// E adicione no merge:
const allQuestions = [
  ...QUESTIONS,
  ...QUESTIONS_201_260,
  ...QUESTIONS_LOTE_14_23,
  ...QUESTIONS_PERSONALIZADAS  // ← Nova linha
];
```

---

## 🎯 DICAS PARA CRIAR QUESTÕES DE QUALIDADE

### ✅ **Boas práticas:**
- Use enunciados claros e objetivos
- Evite pegadinhas desnecessárias
- Faça explicações didáticas (não só "porque sim")
- Misture níveis de dificuldade (fácil, médio, difícil)
- Cite a legislação/norma quando aplicável

### ❌ **Evite:**
- Questões ambíguas ou com múltiplas respostas corretas
- Opções muito óbvias (ex: três erradas e uma certa demais)
- Copiar questões literalmente de provas (direitos autorais)
- Questões muito longas que cansam a leitura

---

## 🔢 CONTROLE DE IDs - ÚLTIMA QUESTÃO

**Total de questões no arquivo principal**: 1200

**Última questão cadastrada**: ID **1200**

**Próxima questão a adicionar**: ID **1201**

Atualize este documento sempre que adicionar questões para manter o controle!

---

## 📞 PRECISA DE AJUDA?

Se tiver dificuldade para adicionar ou quiser que eu adicione questões para você, me envie no formato:

```
ID: 401
Matéria: Redes - Protocolos
Pergunta: Qual protocolo...?
A) Opção 1
B) Opção 2
C) Opção 3
D) Opção 4
Correta: B
Explicação: Porque...
```

E eu converto para o formato TypeScript automaticamente!

---

**Bons estudos rumo ao TOP 5! 🚀🏆**