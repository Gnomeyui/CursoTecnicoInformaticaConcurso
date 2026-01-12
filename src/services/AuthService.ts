/**
 * SERVIÇO - AUTENTICAÇÃO E PLANO
 * Controla o estado do usuário e plano (FREE/MENSAL/ANUAL)
 * 
 * 📌 Hoje: localStorage
 * 📌 Amanhã: backend
 */

import { User, PlanType } from '../domain/User';

const STORAGE_KEY = 'gabaritoo_user';

class AuthService {
  private user: User | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.premiumExpiresAt) {
          data.premiumExpiresAt = new Date(data.premiumExpiresAt);
        }
        this.user = data;
      } else {
        // Cria usuário FREE por padrão
        this.user = {
          id: 'user-' + Date.now(),
          plan: 'free',
          premium: false
        };
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  }

  private saveToStorage() {
    try {
      if (this.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  }

  setUser(user: User) {
    this.user = user;
    this.saveToStorage();
  }

  getUser(): User | null {
    return this.user;
  }

  getPlan(): PlanType {
    return this.user?.plan || 'free';
  }

  isPremium(): boolean {
    if (!this.user) return false;
    if (!this.user.premium) return false;

    if (this.user.premiumExpiresAt) {
      return new Date(this.user.premiumExpiresAt) > new Date();
    }

    return true;
  }

  /**
   * Ativa plano MENSAL (para testes ou após pagamento)
   */
  activateMonthly() {
    if (!this.user) {
      this.user = {
        id: 'user-' + Date.now(),
        plan: 'monthly',
        premium: true,
        premiumExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
      };
    } else {
      this.user.plan = 'monthly';
      this.user.premium = true;
      this.user.premiumExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
    this.saveToStorage();
  }

  /**
   * Ativa plano ANUAL (para testes ou após pagamento)
   */
  activateAnnual() {
    if (!this.user) {
      this.user = {
        id: 'user-' + Date.now(),
        plan: 'annual',
        premium: true,
        premiumExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 365 dias
      };
    } else {
      this.user.plan = 'annual';
      this.user.premium = true;
      this.user.premiumExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }
    this.saveToStorage();
  }

  /**
   * Simula ativação de premium (mantido para compatibilidade)
   */
  activatePremium(months: number = 1) {
    if (months >= 12) {
      this.activateAnnual();
    } else {
      this.activateMonthly();
    }
  }

  /**
   * Cancela assinatura (volta para FREE)
   */
  cancelSubscription() {
    if (this.user) {
      this.user.plan = 'free';
      this.user.premium = false;
      this.user.premiumExpiresAt = undefined;
      this.user.subscriptionId = undefined;
      this.saveToStorage();
    }
  }

  logout() {
    this.user = null;
    this.saveToStorage();
  }
}

export const authService = new AuthService();