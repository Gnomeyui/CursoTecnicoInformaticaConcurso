export interface Question {
  id: number;
  subject: 'Informática' | 'Legislação' | 'Português' | 'LGPD' | 'Governança de TI';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  // INFORMÁTICA - Easy
  {
    id: 1,
    subject: 'Informática',
    difficulty: 'easy',
    question: 'Qual é a função do sistema operacional?',
    options: [
      'Apenas executar programas',
      'Gerenciar recursos de hardware e software',
      'Criar documentos',
      'Navegar na internet'
    ],
    correctAnswer: 1,
    explanation: 'O sistema operacional gerencia todos os recursos do computador, incluindo hardware e software.'
  },
  {
    id: 2,
    subject: 'Informática',
    difficulty: 'easy',
    question: 'O que significa CPU?',
    options: [
      'Central Processing Unit',
      'Computer Personal Unit',
      'Central Program Unit',
      'Computer Processing Utility'
    ],
    correctAnswer: 0,
    explanation: 'CPU significa Central Processing Unit (Unidade Central de Processamento).'
  },

  // INFORMÁTICA - Medium
  {
    id: 3,
    subject: 'Informática',
    difficulty: 'medium',
    question: 'Qual protocolo é usado para transferência segura de arquivos?',
    options: [
      'FTP',
      'HTTP',
      'SFTP',
      'SMTP'
    ],
    correctAnswer: 2,
    explanation: 'SFTP (SSH File Transfer Protocol) é usado para transferência segura de arquivos com criptografia.'
  },
  {
    id: 4,
    subject: 'Informática',
    difficulty: 'medium',
    question: 'O que é um firewall?',
    options: [
      'Um programa antivírus',
      'Um sistema de segurança que monitora e controla o tráfego de rede',
      'Um tipo de vírus',
      'Um navegador de internet'
    ],
    correctAnswer: 1,
    explanation: 'Firewall é um sistema de segurança que monitora e controla o tráfego de entrada e saída da rede.'
  },

  // INFORMÁTICA - Hard
  {
    id: 5,
    subject: 'Informática',
    difficulty: 'hard',
    question: 'Qual algoritmo de hash é considerado mais seguro atualmente?',
    options: [
      'MD5',
      'SHA-1',
      'SHA-256',
      'CRC32'
    ],
    correctAnswer: 2,
    explanation: 'SHA-256 é considerado o mais seguro entre as opções, sendo parte da família SHA-2.'
  },

  // LEGISLAÇÃO - Easy
  {
    id: 6,
    subject: 'Legislação',
    difficulty: 'easy',
    question: 'Qual lei regulamenta o acesso à informação no Brasil?',
    options: [
      'Lei 12.527/2011',
      'Lei 8.112/1990',
      'Lei 9.784/1999',
      'Lei 13.709/2018'
    ],
    correctAnswer: 0,
    explanation: 'A Lei 12.527/2011 (Lei de Acesso à Informação) regulamenta o direito constitucional de acesso à informação.'
  },
  {
    id: 7,
    subject: 'Legislação',
    difficulty: 'easy',
    question: 'O que define a Lei 8.112/1990?',
    options: [
      'Regime jurídico dos servidores públicos civis da União',
      'Processo administrativo federal',
      'Acesso à informação',
      'Proteção de dados'
    ],
    correctAnswer: 0,
    explanation: 'A Lei 8.112/1990 dispõe sobre o regime jurídico dos servidores públicos civis da União.'
  },

  // LEGISLAÇÃO - Medium
  {
    id: 8,
    subject: 'Legislação',
    difficulty: 'medium',
    question: 'Segundo a Lei de Acesso à Informação, qual o prazo para resposta a pedidos de informação?',
    options: [
      '10 dias',
      '15 dias',
      '20 dias',
      '30 dias'
    ],
    correctAnswer: 2,
    explanation: 'O prazo é de 20 dias, prorrogável por mais 10 dias mediante justificativa.'
  },

  // PORTUGUÊS - Easy
  {
    id: 9,
    subject: 'Português',
    difficulty: 'easy',
    question: 'Qual é o plural correto de "cidadão"?',
    options: [
      'Cidadãos',
      'Cidadães',
      'Cidadões',
      'Cidadans'
    ],
    correctAnswer: 0,
    explanation: 'O plural de "cidadão" é "cidadãos".'
  },
  {
    id: 10,
    subject: 'Português',
    difficulty: 'easy',
    question: 'Qual frase está corretamente escrita?',
    options: [
      'Havia muitas pessoas na festa',
      'Haviam muitas pessoas na festa',
      'Havia muitos pessoas na festa',
      'Houveram muitas pessoas na festa'
    ],
    correctAnswer: 0,
    explanation: 'O verbo "haver" no sentido de "existir" é impessoal e fica sempre no singular.'
  },

  // PORTUGUÊS - Medium
  {
    id: 11,
    subject: 'Português',
    difficulty: 'medium',
    question: 'Identifique a função sintática de "ao diretor" na frase: "Entreguei o relatório ao diretor".',
    options: [
      'Objeto direto',
      'Objeto indireto',
      'Complemento nominal',
      'Adjunto adverbial'
    ],
    correctAnswer: 1,
    explanation: '"Ao diretor" é objeto indireto, pois complementa o verbo transitivo direto e indireto "entregar".'
  },

  // LGPD - Easy
  {
    id: 12,
    subject: 'LGPD',
    difficulty: 'easy',
    question: 'O que significa LGPD?',
    options: [
      'Lei Geral de Proteção Digital',
      'Lei Geral de Proteção de Dados',
      'Lei Governamental de Proteção de Dados',
      'Lei Geral de Privacidade Digital'
    ],
    correctAnswer: 1,
    explanation: 'LGPD significa Lei Geral de Proteção de Dados (Lei 13.709/2018).'
  },
  {
    id: 13,
    subject: 'LGPD',
    difficulty: 'easy',
    question: 'Qual órgão é responsável por fiscalizar a LGPD?',
    options: [
      'ANPD',
      'CGU',
      'TCU',
      'STF'
    ],
    correctAnswer: 0,
    explanation: 'A ANPD (Autoridade Nacional de Proteção de Dados) é responsável por fiscalizar e aplicar a LGPD.'
  },

  // LGPD - Medium
  {
    id: 14,
    subject: 'LGPD',
    difficulty: 'medium',
    question: 'Qual das seguintes NÃO é uma base legal para tratamento de dados pessoais segundo a LGPD?',
    options: [
      'Consentimento do titular',
      'Cumprimento de obrigação legal',
      'Interesse comercial da empresa',
      'Proteção da vida'
    ],
    correctAnswer: 2,
    explanation: 'Interesse comercial isolado não é base legal. A LGPD exige bases específicas como consentimento, obrigação legal, etc.'
  },

  // LGPD - Hard
  {
    id: 15,
    subject: 'LGPD',
    difficulty: 'hard',
    question: 'Qual é o prazo para a ANPD se manifestar sobre reclamações após a admissibilidade?',
    options: [
      '30 dias',
      '60 dias',
      '90 dias',
      '120 dias'
    ],
    correctAnswer: 1,
    explanation: 'Segundo o art. 18, §11 da LGPD, a ANPD deve se manifestar em até 60 dias após admitir a reclamação.'
  },

  // GOVERNANÇA DE TI - Easy
  {
    id: 16,
    subject: 'Governança de TI',
    difficulty: 'easy',
    question: 'O que é COBIT?',
    options: [
      'Um sistema operacional',
      'Um framework de governança de TI',
      'Uma linguagem de programação',
      'Um tipo de banco de dados'
    ],
    correctAnswer: 1,
    explanation: 'COBIT (Control Objectives for Information and Related Technologies) é um framework de governança de TI.'
  },
  {
    id: 17,
    subject: 'Governança de TI',
    difficulty: 'easy',
    question: 'Qual biblioteca do ITIL trata da gestão de incidentes?',
    options: [
      'Service Strategy',
      'Service Design',
      'Service Operation',
      'Service Transition'
    ],
    correctAnswer: 2,
    explanation: 'Service Operation (Operação de Serviço) trata da gestão de incidentes no ITIL.'
  },

  // GOVERNANÇA DE TI - Medium
  {
    id: 18,
    subject: 'Governança de TI',
    difficulty: 'medium',
    question: 'Qual norma ISO trata da segurança da informação?',
    options: [
      'ISO 9001',
      'ISO 14001',
      'ISO 27001',
      'ISO 20000'
    ],
    correctAnswer: 2,
    explanation: 'ISO 27001 é a norma internacional para Sistemas de Gestão de Segurança da Informação (SGSI).'
  },
  {
    id: 19,
    subject: 'Governança de TI',
    difficulty: 'medium',
    question: 'O que é SLA em gestão de serviços de TI?',
    options: [
      'Service Level Agreement',
      'System Level Access',
      'Security Level Application',
      'Service Login Authorization'
    ],
    correctAnswer: 0,
    explanation: 'SLA (Service Level Agreement) é um acordo de nível de serviço entre provedor e cliente.'
  },

  // GOVERNANÇA DE TI - Hard
  {
    id: 20,
    subject: 'Governança de TI',
    difficulty: 'hard',
    question: 'Qual domínio do COBIT 2019 trata especificamente da entrega, serviço e suporte?',
    options: [
      'EDM (Evaluate, Direct and Monitor)',
      'APO (Align, Plan and Organise)',
      'BAI (Build, Acquire and Implement)',
      'DSS (Deliver, Service and Support)'
    ],
    correctAnswer: 3,
    explanation: 'DSS (Deliver, Service and Support) é o domínio do COBIT que trata da entrega, serviço e suporte.'
  },
];
