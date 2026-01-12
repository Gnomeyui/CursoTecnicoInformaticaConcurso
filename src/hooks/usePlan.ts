/**
 * HOOK - PLANO DO USUÁRIO
 * Expõe estado do plano (FREE/PREMIUM) para componentes
 */

import { authService } from '../services/AuthService';

export function usePlan() {
  return {
    isPremium: authService.isPremium(),
    user: authService.getUser()
  };
}
