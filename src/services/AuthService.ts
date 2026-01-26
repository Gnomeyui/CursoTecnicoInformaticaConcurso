/**
 * ========================================
 * AUTH SERVICE - AUTENTICAÇÃO E PLANOS
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Gerenciar usuário logado (local)
 * - Controlar plano atual (FREE, MENSAL, ANUAL)
 * - Validar status premium
 * - Persistir dados no localStorage
 * 
 * ⚠️ SEGURANÇA - IMPORTANTE:
 * ========================================
 * 🔴 Este serviço usa localStorage SEM CRIPTOGRAFIA
 * 🔴 Dados podem ser manipulados pelo usuário no DevTools
 * 🔴 Não há validação de pagamento real
 * 🔴 É TEMPORÁRIO - substituir por backend/Firebase
 * 
 * ⚠️ NÃO use para:
 * - Armazenar dados sensíveis (senhas, tokens, cartões)
 * - Validar pagamentos reais
 * - Controlar acesso a dados críticos
 * 
 * ✅ OK para:
 * - Protótipo e testes
 * - Demonstração de funcionalidades
 * - Controle de UI (mostrar/ocultar features)
 * 
 * 🚀 PRÓXIMOS PASSOS (PRODUÇÃO):
 * 1. Integrar com backend (Node.js/Firebase)
 * 2. Implementar JWT para autenticação
 * 3. Validar assinaturas com Stripe/PagSeguro
 * 4. Criptografar dados sensíveis
 * 5. Implementar rate limiting
 * ========================================
 * 
 * USO:
 * import { authService } from './services/AuthService';
 * 
 * // Verificar se é premium
 * const isPremium = authService.isPremium();
 * 
 * // Obter plano atual
 * const plan = authService.getPlan(); // 'free' | 'monthly' | 'annual'
 * 
 * // Ativar premium (APENAS PARA TESTES)
 * authService.activateMonthly(); // Ativa por 30 dias
 * authService.activateAnnual();  // Ativa por 365 dias
 * 
 * MANUTENÇÃO:
 * - Substituir por serviço de backend antes de produção
 * - Adicionar validação de pagamento real
 * - Implementar renovação automática
 * ========================================
 */

import { User, PlanType } from '../domain/User';

// ========================================
// CONSTANTES
// ========================================

/** Chave do localStorage para dados do usuário */
const STORAGE_KEY = 'gabaritoo_user';

/** Duração do plano mensal em milissegundos (30 dias) */
const MONTHLY_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

/** Duração do plano anual em milissegundos (365 dias) */
const ANNUAL_DURATION_MS = 365 * 24 * 60 * 60 * 1000;

// ========================================
// AUTH SERVICE CLASS
// ========================================

class AuthService {
  /** Usuário atualmente logado (null = não logado) */
  private user: User | null = null;

  /**
   * Construtor - carrega dados do localStorage
   */
  constructor() {
    this.loadFromStorage();
  }

  // ========================================
  // PERSISTÊNCIA (PRIVADAS)
  // ========================================

  /**
   * Carrega dados do usuário do localStorage
   * Se não existir, cria usuário FREE por padrão
   * 
   * ⚠️ SEGURANÇA: Dados não são criptografados!
   */
  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      
      if (saved) {
        // Carregar usuário existente
        const data = JSON.parse(saved);
        
        // Converter data de expiração de string para Date
        if (data.premiumExpiresAt) {
          data.premiumExpiresAt = new Date(data.premiumExpiresAt);
        }
        
        this.user = data;
        
        console.log('✅ Usuário carregado:', {
          id: data.id,
          plan: data.plan,
          premium: data.premium,
          expires: data.premiumExpiresAt
        });
      } else {
        // Criar usuário FREE por padrão
        this.user = {
          id: 'user-' + Date.now(), // ID temporário baseado em timestamp
          plan: 'free',
          premium: false
        };
        this.saveToStorage();
        
        console.log('✅ Usuário FREE criado:', this.user.id);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar usuário do localStorage:', error);
      
      // Em caso de erro, criar usuário FREE limpo
      this.user = {
        id: 'user-' + Date.now(),
        plan: 'free',
        premium: false
      };
    }
  }

  /**
   * Salva dados do usuário no localStorage
   * 
   * ⚠️ SEGURANÇA: Dados não são criptografados!
   * Qualquer pessoa com acesso ao DevTools pode modificar
   */
  private saveToStorage() {
    try {
      if (this.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
        console.log('💾 Usuário salvo no localStorage');
      } else {
        localStorage.removeItem(STORAGE_KEY);
        console.log('🗑️ Usuário removido do localStorage');
      }
    } catch (error) {
      console.error('❌ Erro ao salvar usuário no localStorage:', error);
    }
  }

  // ========================================
  // GETTERS PÚBLICOS
  // ========================================

  /**
   * Retorna o usuário atual
   * @returns User ou null se não estiver logado
   */
  getUser(): User | null {
    return this.user;
  }

  /**
   * Retorna o plano atual do usuário
   * @returns 'free' | 'monthly' | 'annual'
   */
  getPlan(): PlanType {
    return this.user?.plan || 'free';
  }

  /**
   * Verifica se o usuário tem acesso premium VÁLIDO
   * 
   * LÓGICA:
   * 1. Verifica se user existe
   * 2. Verifica se premium flag está true
   * 3. Se tem data de expiração, verifica se não expirou
   * 
   * @returns true se premium válido, false caso contrário
   */
  isPremium(): boolean {
    // Não logado = não premium
    if (!this.user) return false;
    
    // Flag premium não ativada = não premium
    if (!this.user.premium) return false;

    // Se tem data de expiração, verificar se ainda não expirou
    if (this.user.premiumExpiresAt) {
      const now = new Date();
      const expiresAt = new Date(this.user.premiumExpiresAt);
      const isValid = expiresAt > now;
      
      if (!isValid) {
        console.warn('⚠️ Plano premium EXPIRADO em:', expiresAt);
        
        // Auto-downgrade para FREE
        this.cancelSubscription();
        return false;
      }
      
      return true;
    }

    // Premium sem data de expiração = premium vitalício (teste)
    return true;
  }

  // ========================================
  // SETTERS PÚBLICOS
  // ========================================

  /**
   * Define um novo usuário
   * ⚠️ Sobrescreve usuário atual completamente
   * 
   * @param user - Objeto User completo
   */
  setUser(user: User) {
    this.user = user;
    this.saveToStorage();
    console.log('✅ Usuário atualizado:', user.id, user.plan);
  }

  // ========================================
  // ATIVAÇÃO DE PLANOS
  // ========================================
  
  /**
   * ⚠️ TESTE APENAS - Ativa plano MENSAL (30 dias)
   * 
   * 🔴 IMPORTANTE:
   * - Esta função NÃO valida pagamento
   * - Deve ser usada APENAS para testes
   * - Em produção, substituir por integração com gateway de pagamento
   * 
   * FLUXO PRODUÇÃO:
   * 1. Usuário clica em "Assinar Mensal"
   * 2. Redireciona para Stripe/PagSeguro
   * 3. Após pagamento confirmado, backend chama esta função
   * 4. Backend retorna JWT com claims de premium
   */
  activateMonthly() {
    console.warn('⚠️ ATIVANDO PLANO MENSAL (TESTE APENAS)');
    
    if (!this.user) {
      // Criar usuário se não existir
      this.user = {
        id: 'user-' + Date.now(),
        plan: 'monthly',
        premium: true,
        premiumExpiresAt: new Date(Date.now() + MONTHLY_DURATION_MS)
      };
    } else {
      // Atualizar usuário existente
      this.user.plan = 'monthly';
      this.user.premium = true;
      this.user.premiumExpiresAt = new Date(Date.now() + MONTHLY_DURATION_MS);
    }
    
    this.saveToStorage();
    
    console.log('✅ Plano MENSAL ativado até:', this.user.premiumExpiresAt);
  }

  /**
   * ⚠️ TESTE APENAS - Ativa plano ANUAL (365 dias)
   * 
   * 🔴 IMPORTANTE:
   * - Esta função NÃO valida pagamento
   * - Deve ser usada APENAS para testes
   * - Em produção, substituir por integração com gateway de pagamento
   * 
   * FLUXO PRODUÇÃO:
   * 1. Usuário clica em "Assinar Anual"
   * 2. Redireciona para Stripe/PagSeguro
   * 3. Após pagamento confirmado, backend chama esta função
   * 4. Backend retorna JWT com claims de premium
   */
  activateAnnual() {
    console.warn('⚠️ ATIVANDO PLANO ANUAL (TESTE APENAS)');
    
    if (!this.user) {
      // Criar usuário se não existir
      this.user = {
        id: 'user-' + Date.now(),
        plan: 'annual',
        premium: true,
        premiumExpiresAt: new Date(Date.now() + ANNUAL_DURATION_MS)
      };
    } else {
      // Atualizar usuário existente
      this.user.plan = 'annual';
      this.user.premium = true;
      this.user.premiumExpiresAt = new Date(Date.now() + ANNUAL_DURATION_MS);
    }
    
    this.saveToStorage();
    
    console.log('✅ Plano ANUAL ativado até:', this.user.premiumExpiresAt);
  }

  /**
   * [LEGADO] Ativa premium por número de meses
   * Mantido para compatibilidade com código antigo
   * 
   * @param months - Número de meses (12+ = anual, <12 = mensal)
   */
  activatePremium(months: number = 1) {
    console.warn('⚠️ USANDO MÉTODO LEGADO activatePremium()');
    
    if (months >= 12) {
      this.activateAnnual();
    } else {
      this.activateMonthly();
    }
  }

  // ========================================
  // CANCELAMENTO E LOGOUT
  // ========================================

  /**
   * Cancela assinatura premium
   * Volta para plano FREE imediatamente
   * 
   * 🔴 EM PRODUÇÃO:
   * - Deve chamar API do gateway de pagamento
   * - Cancelar renovação automática
   * - Manter acesso até o fim do período pago
   */
  cancelSubscription() {
    console.warn('⚠️ CANCELANDO ASSINATURA');
    
    if (this.user) {
      this.user.plan = 'free';
      this.user.premium = false;
      this.user.premiumExpiresAt = undefined;
      this.user.subscriptionId = undefined;
      this.saveToStorage();
      
      console.log('✅ Assinatura cancelada - voltou para FREE');
    }
  }

  /**
   * Desloga o usuário
   * Remove TODOS os dados do localStorage
   * 
   * ⚠️ Isso NÃO remove dados de:
   * - GameContext (XP, nível)
   * - StatsContext (estatísticas)
   * - CustomizationContext (temas)
   * 
   * Para reset completo, usar Settings > "Resetar Progresso"
   */
  logout() {
    console.warn('⚠️ FAZENDO LOGOUT');
    
    this.user = null;
    this.saveToStorage();
    
    console.log('✅ Logout concluído');
  }
}

// ========================================
// SINGLETON EXPORT
// ========================================

/**
 * Instância única do AuthService (Singleton)
 * 
 * USO:
 * import { authService } from './services/AuthService';
 * const isPremium = authService.isPremium();
 */
export const authService = new AuthService();

// ========================================
// NOTAS PARA PRODUÇÃO
// ========================================

/**
 * 🚀 CHECKLIST PARA PRODUÇÃO:
 * 
 * [ ] Implementar backend de autenticação
 * [ ] Integrar com Stripe/PagSeguro/Mercado Pago
 * [ ] Implementar JWT para sessão
 * [ ] Adicionar refresh tokens
 * [ ] Implementar renovação automática
 * [ ] Criptografar dados sensíveis
 * [ ] Adicionar rate limiting
 * [ ] Implementar auditoria de ações
 * [ ] Adicionar 2FA (opcional)
 * [ ] Implementar recuperação de senha
 * [ ] Adicionar validação de email
 * [ ] Implementar webhook de pagamento
 * [ ] Adicionar logs de auditoria
 * [ ] Implementar GDPR compliance
 * 
 * 📚 RECURSOS:
 * - Firebase Auth: https://firebase.google.com/docs/auth
 * - Stripe Subscriptions: https://stripe.com/docs/billing/subscriptions
 * - JWT: https://jwt.io/
 */
