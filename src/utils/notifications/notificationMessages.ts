/**
 * BANCO DE 200 MENSAGENS MOTIVACIONAIS
 * 
 * Organizadas por:
 * - Contexto (morning, night, inactive, streak)
 * - Perfil (beginner, regular, advanced)
 * - Performance (low, medium, high)
 * 
 * Regras:
 * - Tom humano e acolhedor
 * - Frases curtas (ideais para push)
 * - Zero culpabilização
 * - Foco em constância, não intensidade
 */

import { NotificationContext, UserProfile, PerformanceLevel } from './types';

// ========================================
// MENSAGENS PRINCIPAIS (POR CONTEXTO + PERFIL)
// ========================================

const MESSAGES: Record<NotificationContext, Record<UserProfile, string[]>> = {
  
  // ========================================
  // MANHÃ (MORNING) - Começar o dia
  // ========================================
  morning: {
    beginner: [
      'Que tal começar o dia resolvendo algumas questões?',
      'Um pouco de estudo agora já faz diferença.',
      'Comece devagar. O importante é começar.',
      'Hoje é um bom dia para continuar.',
      'Alguns minutos agora já fazem diferença.',
      'Um dia produtivo começa com uma decisão simples: estudar.',
      'Não espere o momento ideal. Comece.',
      'Hoje é mais um passo na direção certa.',
      'O estudo de hoje já conta.',
      'Um dia produtivo começa agora.',
    ],
    regular: [
      'Manter o estudo pela manhã fortalece a rotina.',
      'Comece o dia avançando um pouco.',
      'Alguns minutos agora ajudam bastante.',
      'Estudar hoje deixa o amanhã mais leve.',
      'O hábito vence a procrastinação.',
      'Você não precisa acelerar, só continuar.',
      'O progresso vem da repetição diária.',
      'Voltar ao estudo fortalece o foco.',
      'A constância constrói resultados reais.',
      'Um pouco de estudo mantém o ritmo.',
    ],
    advanced: [
      'Comece o dia mantendo a disciplina.',
      'Constância desde cedo faz diferença.',
      'Hoje é dia de manter o ritmo.',
      'Seu compromisso diário é com você.',
      'Manter o hábito é mais importante que o tempo.',
      'Seu esforço diário está sendo acumulado.',
      'Disciplina é o que mantém o progresso.',
      'O caminho é feito de pequenos avanços.',
      'Hoje você pode manter o ritmo.',
      'Persistir é parte do processo.',
    ],
  },

  // ========================================
  // NOITE (NIGHT) - Encerrar o dia
  // ========================================
  night: {
    beginner: [
      'Que tal encerrar o dia com um pouco de estudo?',
      'Mesmo pouco hoje já conta.',
      'Estude no seu ritmo.',
      'Hoje pode ser leve e produtivo.',
      'Não precisa fazer tudo agora.',
      'O importante é não parar.',
      'Um pouco já ajuda.',
      'Mesmo pouco, já é avanço.',
      'Hoje pode ser um bom dia para voltar.',
      'Não se cobre. Continue.',
    ],
    regular: [
      'Finalizar o dia estudando reforça o hábito.',
      'Um pouco agora ajuda a manter a constância.',
      'Feche o dia avançando um pouco.',
      'Estudar hoje evita arrependimento depois.',
      'Faça o que pode hoje. O progresso vem.',
      'Um dia de cada vez, sempre avançando.',
      'Não precisa ser perfeito, só constante.',
      'Sua aprovação começa na rotina.',
      'Estudar agora é um investimento em você.',
      'Mesmo pouco, feito sempre, transforma.',
    ],
    advanced: [
      'Encerrar o dia com disciplina fortalece o foco.',
      'Mais um passo hoje faz diferença.',
      'Consistência também acontece à noite.',
      'A disciplina de hoje é a tranquilidade de amanhã.',
      'Vamos manter o ritmo?',
      'Constância vence motivação.',
      'Seu futuro agradece o estudo de hoje.',
      'Continue. Você está no caminho certo.',
      'A prática diária fortalece o aprendizado.',
      'Uma sessão hoje já faz diferença.',
    ],
  },

  // ========================================
  // INATIVO (INACTIVE) - Acolhimento
  // ========================================
  inactive: {
    beginner: [
      'Tudo bem dar uma pausa. Que tal voltar agora?',
      'Você pode retomar no seu ritmo.',
      'Recomeçar também é progresso.',
      'Voltar já é um ótimo passo.',
      'Você pode retomar no seu tempo.',
      'Sem cobrança. Apenas continue.',
      'Retomar o estudo é sinal de compromisso.',
      'Seu ritmo é respeitado.',
      'Cada retorno conta.',
      'Você não está atrasado.',
    ],
    regular: [
      'Retomar a rotina é o passo mais importante.',
      'Voltar hoje já é uma vitória.',
      'Continue de onde parou.',
      'Pequenos passos também levam longe.',
      'Seu objetivo começa com uma questão respondida.',
      'Alguns minutos de estudo já contam.',
      'Hoje é um ótimo dia para continuar.',
      'O hábito diário constrói resultados sólidos.',
      'Voltar ao app é um passo importante.',
      'Estudar hoje evita arrependimento depois.',
    ],
    advanced: [
      'Disciplina também é saber retomar.',
      'Não perca o ritmo. Volte hoje.',
      'Persistência constrói resultado.',
      'Persistir é mais importante que acelerar.',
      'Estudar hoje é aliviar a pressão do futuro.',
      'Um passo simples hoje já ajuda.',
      'Recomeçar faz parte.',
      'Retomar fortalece o hábito.',
      'Você pode seguir sem pressão.',
      'Continuar é o que importa.',
    ],
  },

  // ========================================
  // CONSTÂNCIA (STREAK) - Reconhecimento
  // ========================================
  streak: {
    beginner: [
      'Parabéns por manter a constância.',
      'Seu esforço diário está valendo a pena.',
      'Continue no seu ritmo.',
      'Você está evoluindo de forma consistente.',
      'Seu progresso está sendo construído.',
      'Cada retorno fortalece o aprendizado.',
      'Você está mais preparado que ontem.',
      'O estudo contínuo gera confiança.',
      'Seu esforço está sendo registrado.',
      'O progresso é silencioso, mas real.',
    ],
    regular: [
      'Ótimo trabalho mantendo a rotina.',
      'A constância está te levando longe.',
      'Persistir faz a diferença.',
      'A evolução vem com a prática diária.',
      'Estudar regularmente traz segurança.',
      'Você está criando uma base sólida.',
      'Aprender leva tempo — e você está investindo.',
      'Cada sessão contribui.',
      'Seu desempenho melhora com constância.',
      'Evoluir exige continuidade.',
    ],
    advanced: [
      'Consistência é o que separa resultados.',
      'Você está mantendo um ótimo ritmo.',
      'Disciplina bem construída.',
      'Você está no caminho certo.',
      'Persistir traz resultados visíveis.',
      'A consistência constrói domínio.',
      'Você está avançando gradualmente.',
      'O progresso vem do hábito.',
      'Seu esforço não é em vão.',
      'Estudar hoje fortalece a confiança.',
    ],
  },
};

// ========================================
// MENSAGENS POR PERFORMANCE (COMPLEMENTARES)
// ========================================

const PERFORMANCE_MESSAGES: Record<PerformanceLevel, string[]> = {
  low: [
    'Resolver questões é aprender de verdade.',
    'Cada questão respondida te deixa mais preparado.',
    'Praticar hoje é errar menos na prova.',
    'Questões revelam onde você pode melhorar.',
    'Treinar agora evita surpresas depois.',
    'Uma questão de cada vez.',
    'Praticar é o caminho mais curto para evoluir.',
    'Resolver questões fortalece a confiança.',
    'A prática mostra o que realmente importa.',
    'Treinar hoje aumenta seu domínio do conteúdo.',
  ],
  medium: [
    'Vamos treinar um pouco?',
    'Que tal testar seus conhecimentos agora?',
    'Estudar sem praticar não é suficiente. Vamos praticar?',
    'Questões transformam teoria em aprendizado.',
    'Aprender é praticar.',
    'Hoje você pode avançar mais um pouco.',
    'Prática constante gera segurança.',
    'Treinar agora ajuda a fixar o conteúdo.',
    'Vamos continuar praticando?',
    'Hora de colocar o conhecimento em prática.',
  ],
  high: [
    'Você está evoluindo mais do que imagina.',
    'Seu progresso é construído dia após dia.',
    'Cada sessão fortalece seu caminho.',
    'Olhe o quanto você já avançou.',
    'Evoluir é resultado de constância.',
    'O estudo diário constrói confiança.',
    'Você está ficando mais preparado.',
    'Seu esforço está sendo registrado.',
    'Aprender é um processo, e você está nele.',
    'Cada dia estudado conta.',
  ],
};

// ========================================
// MENSAGENS INSPIRADORAS (BONUS)
// ========================================

const INSPIRATIONAL_MESSAGES: string[] = [
  'A excelência é um hábito. (Aristóteles)',
  'Não espere. O tempo nunca será perfeito. (Napoleon Hill)',
  'O sucesso é a soma de pequenos esforços repetidos.',
  'Disciplina é liberdade.',
  'O futuro depende do que você faz hoje. (Gandhi)',
  'A constância supera o talento quando o talento não é constante.',
  'Grandes resultados vêm da persistência.',
  'Aprender é um processo contínuo.',
  'Quem estuda hoje, colhe amanhã.',
  'O esforço diário constrói a vitória.',
  'Nada substitui a prática.',
  'A preparação traz confiança.',
  'Estudar é um ato de respeito com seu futuro.',
  'O hábito constrói o resultado.',
  'Cada dia de estudo é um avanço silencioso.',
  'Não desista do que você começou.',
  'A disciplina mantém você quando a motivação falha.',
  'O conhecimento cresce com a prática.',
  'Persistir é parte do sucesso.',
  'Estudar é acreditar em si mesmo.',
];

// ========================================
// FUNÇÃO PRINCIPAL: OBTER MENSAGEM
// ========================================

import { getHistory, saveHistory } from './notificationHistory';

export function getMotivationalMessage(
  context: NotificationContext,
  profile: UserProfile,
  performance?: PerformanceLevel
): string {
  const history = getHistory();
  
  // Pool principal por contexto e perfil
  const mainPool = MESSAGES[context][profile];
  
  // Pool complementar por performance (se fornecido)
  const performancePool = performance ? PERFORMANCE_MESSAGES[performance] : [];
  
  // Pool combinado
  const combinedPool = [...mainPool, ...performancePool];
  
  // Filtrar mensagens não utilizadas recentemente
  const available = combinedPool.filter(msg => !history.includes(msg));
  
  // Se todas foram usadas, usar pool inspiracional como fallback
  let message: string;
  
  if (available.length === 0) {
    const inspirationalAvailable = INSPIRATIONAL_MESSAGES.filter(
      msg => !history.includes(msg)
    );
    
    if (inspirationalAvailable.length > 0) {
      message = inspirationalAvailable[
        Math.floor(Math.random() * inspirationalAvailable.length)
      ];
    } else {
      // Último fallback: resetar e pegar qualquer uma
      message = combinedPool[Math.floor(Math.random() * combinedPool.length)];
    }
  } else {
    message = available[Math.floor(Math.random() * available.length)];
  }
  
  saveHistory(message);
  return message;
}
