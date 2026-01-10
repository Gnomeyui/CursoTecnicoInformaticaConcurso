/**
 * COPY CENTRALIZADO DO APP
 * 
 * Regras:
 * - Tom calmo, direto e encorajador
 * - Nunca usar jargão técnico (algoritmo, sistema, engine)
 * - Mensagens curtas e acolhedoras
 * - Pergunte sempre: "Eu falaria isso para um amigo estudando?"
 */

export const COPY = {
  
  // ========================================
  // 1) ONBOARDING
  // ========================================
  onboarding: {
    slide1: {
      title: 'Você não está sozinho nessa jornada',
      text: 'Este app foi criado para te ajudar a estudar com constância, usando questões reais de concurso.',
      button: 'Vamos começar'
    },
    slide2: {
      title: 'Seu estudo funciona assim',
      steps: [
        {
          icon: '📚',
          title: 'Pratique um pouco por dia',
          text: 'Questões organizadas e adaptadas ao seu ritmo.'
        },
        {
          icon: '🧠',
          title: 'Acompanhe sua evolução',
          text: 'Veja onde você está melhorando e onde precisa de atenção.'
        },
        {
          icon: '📊',
          title: 'Foque no que importa',
          text: 'O app identifica o que realmente precisa ser revisado.'
        }
      ],
      button: 'Entendi'
    },
    slide3: {
      title: 'Não precisa estudar muito. Precisa estudar sempre.',
      text: 'Constância vence intensidade. Vamos juntos nessa jornada?',
      button: 'Começar a estudar'
    }
  },

  // ========================================
  // 2) HOME / DASHBOARD
  // ========================================
  home: {
    title: 'Seu estudo hoje',
    subtitle: {
      withProgress: 'Continue de onde parou ou comece um novo conteúdo.',
      firstTime: 'Você ainda não iniciou seus estudos. Que tal começar agora?'
    },
    mainButton: 'Iniciar estudo',
    
    // Frases motivacionais variadas para o botão principal (20 opções)
    motivationalCTA: [
      'Estude hoje e chegue mais perto da aprovação.',
      'Falta pouco pra bater a meta diária!',
      'Alguns minutos agora já fazem diferença.',
      'Continue de onde parou.',
      'Seu progresso está te esperando.',
      'Que tal resolver algumas questões?',
      'Um pouco hoje, muito amanhã.',
      'Manter o ritmo é o segredo.',
      'Cada sessão te aproxima do objetivo.',
      'Hoje é dia de evoluir.',
      'Vamos continuar avançando?',
      'Seu esforço de hoje conta.',
      'Pratique agora e ganhe confiança.',
      'Continue construindo seu caminho.',
      'Foco no que importa: estudar.',
      'Mais um passo rumo à aprovação.',
      'Hora de fortalecer o aprendizado.',
      'Avance no seu ritmo.',
      'Estudar agora é investir em você.',
      'Comece agora, sem pressão.'
    ],
    
    // Cards
    cards: {
      streak: (days: number) => `${days} dias seguidos`,
      level: (level: number) => `Nível ${level}`,
      accuracy: 'Precisão',
      trending: 'SUBINDO',
      allGood: 'Tudo em dia! Sem erros pendentes.',
      attention: 'Atenção!',
      criticalErrors: (count: number) => `${count} erros críticos.`,
      correctButton: 'Corrigir'
    },
    
    // Seção de progresso
    progress: {
      title: 'Seu Progresso',
      questions: (total: number) => `${total} questões`
    }
  },

  // ========================================
  // 3) TOOLTIPS / GUIA INICIAL
  // ========================================
  tooltips: {
    step1: 'Comece seu estudo por aqui.',
    step2: 'Aqui você acompanha seu progresso ao longo do tempo.',
    step3: 'Estes conteúdos merecem uma revisão.'
  },

  // ========================================
  // 4) SESSÃO DE ESTUDO
  // ========================================
  study: {
    beforeQuestion: 'Leia com atenção e responda no seu tempo.',
    
    feedback: {
      correct: {
        title: 'Boa! Você acertou 👏',
        text: 'Continue assim. Cada acerto conta.'
      },
      incorrect: {
        title: 'Tudo bem errar',
        text: 'Esse conteúdo pode ser revisado mais tarde. Errar também faz parte do aprendizado.'
      }
    },
    
    result: {
      title: 'Sessão concluída',
      summary: (answered: number, correct: number, toReview: number) => ({
        answered: `Você respondeu ${answered} questões`,
        correct: `Acertos: ${correct}`,
        toReview: `Conteúdos para revisar: ${toReview}`
      }),
      message: 'Um passo de cada vez faz toda a diferença.',
      buttons: {
        continue: 'Continuar estudando',
        home: 'Voltar ao início'
      }
    }
  },

  // ========================================
  // 5) ESTATÍSTICAS / PROGRESSO
  // ========================================
  statistics: {
    title: 'Seu progresso',
    subtitle: 'Acompanhe como seus estudos estão evoluindo ao longo do tempo.',
    empty: 'Conforme você estuda, seus resultados aparecem aqui.'
  },

  // ========================================
  // 6) REVISÃO
  // ========================================
  review: {
    title: 'Conteúdos para revisar',
    subtitle: 'Estes são os assuntos que merecem um pouco mais de atenção.'
  },

  // ========================================
  // 7) CONFIGURAÇÕES
  // ========================================
  settings: {
    title: 'Preferências',
    subtitle: 'Ajuste o app para o seu jeito de estudar.',
    options: {
      appearance: 'Aparência',
      studyPace: 'Ritmo de estudo',
      notifications: 'Notificações'
    }
  },

  // ========================================
  // 8) LOADING
  // ========================================
  loading: {
    preparing: 'Preparando seu estudo…',
    content: 'Carregando conteúdo…',
    almostReady: 'Quase tudo pronto…'
  },

  // ========================================
  // 9) ERROS
  // ========================================
  errors: {
    generic: {
      title: 'Algo não saiu como esperado.',
      text: 'Tente novamente em alguns instantes.'
    },
    connection: {
      title: 'Não conseguimos conectar agora.',
      text: 'Verifique sua internet e tente novamente.'
    }
  },

  // ========================================
  // 10) BOTÕES PADRÃO
  // ========================================
  buttons: {
    start: 'Começar',
    continue: 'Continuar',
    back: 'Voltar',
    reviewLater: 'Revisar depois',
    tryAgain: 'Tentar novamente',
    finishSession: 'Finalizar sessão',
    next: 'Próximo',
    previous: 'Anterior',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },

  // ========================================
  // 11) MENU INFERIOR
  // ========================================
  bottomNav: {
    study: 'Estudar',
    simulated: 'Simulados',
    achievements: 'Conquistas'
  },

  // ========================================
  // 12) NOTIFICAÇÕES
  // ========================================
  notifications: {
    permission: {
      title: 'Quer receber lembretes motivacionais?',
      text: 'Enviaremos mensagens curtas para te ajudar a manter o ritmo de estudos.',
      allow: 'Permitir',
      deny: 'Não agora'
    },
    settings: {
      title: 'Lembretes de estudo',
      description: 'Receba notificações motivacionais para manter seu ritmo.',
      enabled: 'Ativado',
      disabled: 'Desativado'
    }
  }

} as const;