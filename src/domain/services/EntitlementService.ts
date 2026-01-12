/**
 * DOMAIN - ENTITLEMENT SERVICE
 * Camada de controle de acesso premium
 * PREMIUM AGORA GOVERNA O APP
 */

import { User } from '../User';

export class EntitlementService {
  
  /**
   * Verifica se o usuário tem plano premium ativo
   */
  static isPremium(user: User): boolean {
    if (!user.premium) return false;
    
    // Se não tem data de expiração, é premium indefinido (para testes)
    if (!user.premiumExpiresAt) return true;

    // Verifica se a assinatura ainda está válida
    return new Date(user.premiumExpiresAt) > new Date();
  }

  /**
   * Verifica se pode acessar filtros avançados
   */
  static canAccessFilters(user: User): boolean {
    return this.isPremium(user);
  }

  /**
   * Verifica se pode baixar questões offline
   */
  static canDownloadOffline(user: User): boolean {
    return this.isPremium(user);
  }

  /**
   * Verifica se pode fazer simulados cronometrados
   */
  static canAccessSimulados(user: User): boolean {
    return this.isPremium(user);
  }

  /**
   * Verifica se pode ver estatísticas completas
   */
  static canAccessFullStats(user: User): boolean {
    return this.isPremium(user);
  }

  /**
   * Verifica se tem acesso a todas as questões
   * FREE: 100 questões
   * PREMIUM: 10.000 questões
   */
  static getQuestionLimit(user: User): number {
    return this.isPremium(user) ? 10000 : 100;
  }

  /**
   * Verifica se o app deve exibir anúncios
   */
  static shouldShowAds(user: User): boolean {
    return !this.isPremium(user);
  }

  /**
   * Retorna o tipo de suporte do usuário
   */
  static getSupportLevel(user: User): 'community' | 'email' | 'priority' {
    if (!this.isPremium(user)) return 'community';
    return user.plan === 'annual' ? 'priority' : 'email';
  }

  /**
   * Verifica se a assinatura está próxima de expirar (7 dias)
   */
  static isExpiringSoon(user: User): boolean {
    if (!user.premium || !user.premiumExpiresAt) return false;
    
    const expiresAt = new Date(user.premiumExpiresAt);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiresAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  }

  /**
   * Verifica se a assinatura expirou
   */
  static isExpired(user: User): boolean {
    if (!user.premiumExpiresAt) return false;
    return new Date(user.premiumExpiresAt) <= new Date();
  }

  /**
   * Retorna mensagem de bloqueio de feature
   */
  static getBlockMessage(feature: string): string {
    const messages: Record<string, string> = {
      filters: '🔒 Filtros avançados disponíveis apenas para planos Premium',
      offline: '🔒 Download offline disponível apenas para planos Premium',
      simulados: '🔒 Simulados cronometrados disponíveis apenas para planos Premium',
      stats: '🔒 Estatísticas completas disponíveis apenas para planos Premium',
      questions: '🔒 Você atingiu o limite de 100 questões do plano Free. Assine Premium para acessar 10.000 questões!'
    };

    return messages[feature] || '🔒 Este recurso é exclusivo para usuários Premium';
  }
}
