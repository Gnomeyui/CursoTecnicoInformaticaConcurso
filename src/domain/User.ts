/**
 * DOMÍNIO - USUÁRIO
 * Modelo de usuário e plano
 */

export type PlanType = 'free' | 'monthly' | 'annual';

export interface User {
  id: string;
  email?: string;
  nome?: string;
  plan: PlanType;
  premium: boolean; // true se monthly ou annual
  premiumExpiresAt?: Date;
  subscriptionId?: string; // ID da assinatura (Google Play)
}