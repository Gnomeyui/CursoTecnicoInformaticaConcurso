/**
 * 📝 TEMPLATE PARA ADICIONAR NOVAS QUESTÕES
 * 
 * INSTRUÇÕES:
 * 1. Copie este arquivo e renomeie (ex: questions_401_500.ts)
 * 2. Substitua "TEMPLATE" pelo nome da sua coleção
 * 3. Preencha as questões seguindo o formato abaixo
 * 4. Importe no /utils/questionManager.ts
 * 
 * ÚLTIMA QUESTÃO CADASTRADA: ID 400
 * PRÓXIMO ID DISPONÍVEL: 401
 */

export interface Question {
  id: number;
  materia: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export const QUESTIONS_TEMPLATE: Question[] = [
  // ========================================
  // EXEMPLO DE QUESTÃO COMPLETA
  // ========================================
  {
    id: 401,
    materia: "Redes - Protocolos",
    pergunta: "Qual protocolo é responsável por traduzir nomes de domínio em endereços IP?",
    opcoes: [
      "DHCP",
      "DNS",
      "FTP",
      "SMTP"
    ],
    correta: 1,
    explicacao: "O DNS (Domain Name System) é o protocolo responsável por resolver nomes de domínio (como www.exemplo.com) em endereços IP numéricos que os computadores entendem."
  },

  // ========================================
  // TEMPLATES VAZIOS PARA COPIAR E COLAR
  // ========================================
  
  // --- TEMPLATE: INFORMÁTICA - REDES ---
  {
    id: 402,
    materia: "Redes - Protocolos",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: SEGURANÇA ---
  {
    id: 403,
    materia: "Segurança - Criptografia",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: LINUX ---
  {
    id: 404,
    materia: "Linux - Comandos",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: WINDOWS ---
  {
    id: 405,
    materia: "Windows - Sistemas",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: HARDWARE ---
  {
    id: 406,
    materia: "Hardware - Componentes",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: LEGISLAÇÃO ---
  {
    id: 407,
    materia: "Legislação - ALE-RR",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: DIREITO ADMINISTRATIVO ---
  {
    id: 408,
    materia: "Direito Administrativo",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: PORTUGUÊS ---
  {
    id: 409,
    materia: "Português - Ortografia",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: LGPD ---
  {
    id: 410,
    materia: "LGPD - Fundamentos",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  },

  // --- TEMPLATE: GOVERNANÇA ---
  {
    id: 411,
    materia: "Governança - COBIT",
    pergunta: "",
    opcoes: [
      "",
      "",
      "",
      ""
    ],
    correta: 0,
    explicacao: ""
  }

  // ⚠️ ATENÇÃO: Não coloque vírgula após a última questão!
];

/**
 * 📋 CATEGORIAS DISPONÍVEIS (copie e cole):
 * 
 * INFORMÁTICA:
 * - "Informatica - Armazenamento"
 * - "Redes - Camadas"
 * - "Redes - Protocolos"
 * - "Redes - IPv4"
 * - "Redes - IPv6"
 * - "Redes - DNS"
 * - "Segurança - Criptografia"
 * - "Segurança - Ataques"
 * - "Segurança - Firewall"
 * - "Segurança - Autenticação"
 * - "Hardware - Componentes"
 * - "Hardware - Barramentos"
 * - "Linux - Comandos"
 * - "Linux - Permissões"
 * - "Windows - Sistemas"
 * - "Windows - Active Directory"
 * 
 * LEGISLAÇÃO:
 * - "Legislação - ALE-RR"
 * - "Legislação - Mesa Diretora"
 * - "Direito Administrativo"
 * - "Constitucional - Acumulação"
 * - "Processo Legislativo"
 * 
 * PORTUGUÊS:
 * - "Português - Ortografia"
 * - "Português - Sintaxe"
 * - "Português - Concordância"
 * - "Português - Regência"
 * - "Português - Interpretação"
 * 
 * LGPD:
 * - "LGPD - Fundamentos"
 * - "LGPD - Bases Legais"
 * - "LGPD - Direitos do Titular"
 * - "LGPD - Sanções"
 * - "LGPD - DPO"
 * 
 * GOVERNANÇA:
 * - "Governança - COBIT"
 * - "Governança - ITIL"
 * - "Governança - ISO"
 */

/**
 * 🔧 COMO USAR ESTE TEMPLATE:
 * 
 * 1. CRIE UM NOVO ARQUIVO (exemplo: questions_401_450.ts)
 * 2. COPIE TODO ESTE CONTEÚDO
 * 3. RENOMEIE "QUESTIONS_TEMPLATE" para "QUESTIONS_401_450"
 * 4. PREENCHA AS QUESTÕES
 * 5. IMPORTE NO /utils/questionManager.ts:
 * 
 *    import { QUESTIONS_401_450 } from '../data/questions_401_450';
 * 
 *    const allQuestions = [
 *      ...QUESTIONS,
 *      ...QUESTIONS_201_260,
 *      ...QUESTIONS_LOTE_14_23,
 *      ...QUESTIONS_401_450  // ← Adicione aqui
 *    ];
 * 
 * 6. SALVE E TESTE!
 */
