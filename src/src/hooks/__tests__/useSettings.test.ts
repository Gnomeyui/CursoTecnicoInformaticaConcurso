/**
 * @file useSettings.test.ts
 * @description Testes unitários para o hook useSettings
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSettings } from '../useSettings';
import { 
  mockToast, 
  mockCustomizationContext,
  mockAuthService,
  mockVoucherService,
} from '../../test/mocks';

// Mocks
vi.mock('sonner@2.0.3', () => ({
  toast: mockToast,
}));

vi.mock('../../context/CustomizationContext', () => ({
  useCustomization: () => mockCustomizationContext,
}));

vi.mock('../../services/AuthService', () => ({
  authService: mockAuthService,
}));

vi.mock('../../services/VoucherService', () => ({
  voucherService: mockVoucherService,
}));

describe('useSettings Hook', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockAuthService.isPremium.mockReturnValue(false);
    mockAuthService.getUser.mockReturnValue({
      id: 'user-123',
      name: 'João Silva',
      email: 'joao@example.com',
      plan: 'FREE',
      premiumExpiresAt: null,
    });
    mockAuthService.getPlan.mockReturnValue('FREE');
  });

  describe('Inicialização', () => {
    it('deve inicializar com dados corretos', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.isPremium).toBe(false);
      expect(result.current.user).toBeDefined();
      expect(result.current.plan).toBe('FREE');
      expect(result.current.settings).toBeDefined();
      expect(result.current.theme).toBeDefined();
    });

    it('deve carregar configurações do contexto', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.settings.colorTheme).toBe('focus');
      expect(result.current.settings.darkMode).toBe(false);
    });

    it('deve inicializar com estado de voucher vazio', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.voucherCode).toBe('');
      expect(result.current.isRedeeming).toBe(false);
    });

    it('deve inicializar com plan selector fechado', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.showPlanSelector).toBe(false);
    });
  });

  describe('Plan Selector', () => {
    it('deve abrir plan selector', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setShowPlanSelector(true);
      });

      expect(result.current.showPlanSelector).toBe(true);
    });

    it('deve fechar plan selector', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setShowPlanSelector(true);
        result.current.setShowPlanSelector(false);
      });

      expect(result.current.showPlanSelector).toBe(false);
    });
  });

  describe('Status Premium', () => {
    it('deve identificar usuário FREE', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.isPremium).toBe(false);
      expect(result.current.plan).toBe('FREE');
    });

    it('deve identificar usuário PREMIUM', () => {
      mockAuthService.isPremium.mockReturnValue(true);
      mockAuthService.getPlan.mockReturnValue('PREMIUM');
      mockAuthService.getUser.mockReturnValue({
        id: 'user-123',
        name: 'João Silva',
        email: 'joao@example.com',
        plan: 'PREMIUM',
        premiumExpiresAt: '2026-12-31',
      });

      const { result } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.isPremium).toBe(true);
      expect(result.current.plan).toBe('PREMIUM');
      expect(result.current.user.premiumExpiresAt).toBe('2026-12-31');
    });
  });

  describe('Cancelar Assinatura', () => {
    it('deve cancelar assinatura com confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      global.confirm = vi.fn(() => true);

      act(() => {
        result.current.handleCancelSubscription();
      });

      expect(mockAuthService.cancelSubscription).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('cancelada')
      );
    });

    it('não deve cancelar sem confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      global.confirm = vi.fn(() => false);

      act(() => {
        result.current.handleCancelSubscription();
      });

      expect(mockAuthService.cancelSubscription).not.toHaveBeenCalled();
    });
  });

  describe('Reset de Progresso', () => {
    it('deve apagar todos os dados com dupla confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      // Simular dados existentes
      localStorage.setItem('gabaritoo_app_state', 'data');
      localStorage.setItem('alerr_game_data', 'data');
      localStorage.setItem('alerr_stats', 'data');

      global.confirm = vi.fn(() => true);

      act(() => {
        result.current.handleResetProgress();
      });

      expect(localStorage.getItem('gabaritoo_app_state')).toBeNull();
      expect(localStorage.getItem('alerr_game_data')).toBeNull();
      expect(localStorage.getItem('alerr_stats')).toBeNull();
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('apagados')
      );
    });

    it('não deve apagar dados sem primeira confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      localStorage.setItem('gabaritoo_app_state', 'data');

      global.confirm = vi.fn()
        .mockReturnValueOnce(false); // Primeira confirmação negada

      act(() => {
        result.current.handleResetProgress();
      });

      expect(localStorage.getItem('gabaritoo_app_state')).not.toBeNull();
    });

    it('não deve apagar dados sem segunda confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      localStorage.setItem('gabaritoo_app_state', 'data');

      global.confirm = vi.fn()
        .mockReturnValueOnce(true)  // Primeira confirmação OK
        .mockReturnValueOnce(false); // Segunda confirmação negada

      act(() => {
        result.current.handleResetProgress();
      });

      expect(localStorage.getItem('gabaritoo_app_state')).not.toBeNull();
    });

    it('deve limpar TODAS as chaves específicas', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      const keysToTest = [
        'gabaritoo_app_state',
        'alerr_game_data',
        'alerr_stats',
        'alerr_wrong_questions',
        'alerr_answered_questions',
        'concurso_profiles',
        'alerr_customization',
        'studyPlan',
        'exam_backup',
      ];

      // Preencher todas as chaves
      keysToTest.forEach(key => localStorage.setItem(key, 'test-data'));

      global.confirm = vi.fn(() => true);

      act(() => {
        result.current.handleResetProgress();
      });

      // Verificar que todas foram limpas
      keysToTest.forEach(key => {
        expect(localStorage.getItem(key)).toBeNull();
      });
    });
  });

  describe('Reset de Configurações', () => {
    it('deve resetar apenas configurações, mantendo progresso', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      // Configurações (devem ser apagadas)
      localStorage.setItem('studyPlan', 'config');
      localStorage.setItem('alerr_customization', 'config');
      
      // Progresso (deve ser mantido)
      localStorage.setItem('alerr_game_data', 'progress');
      localStorage.setItem('alerr_stats', 'progress');

      global.confirm = vi.fn(() => true);

      act(() => {
        result.current.handleResetSettings();
      });

      // Configurações apagadas
      expect(localStorage.getItem('studyPlan')).toBeNull();
      expect(localStorage.getItem('alerr_customization')).toBeNull();
      
      // Progresso mantido
      expect(localStorage.getItem('alerr_game_data')).toBe('progress');
      expect(localStorage.getItem('alerr_stats')).toBe('progress');

      expect(mockToast.success).toHaveBeenCalledWith(
        expect.stringContaining('resetadas')
      );
    });

    it('não deve resetar sem confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      localStorage.setItem('studyPlan', 'config');

      global.confirm = vi.fn(() => false);

      act(() => {
        result.current.handleResetSettings();
      });

      expect(localStorage.getItem('studyPlan')).not.toBeNull();
    });
  });

  describe('Logout', () => {
    it('deve fazer logout com confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      global.confirm = vi.fn(() => true);

      act(() => {
        result.current.handleLogout();
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Logout')
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('não deve fazer logout sem confirmação', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      global.confirm = vi.fn(() => false);

      act(() => {
        result.current.handleLogout();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Voucher', () => {
    it('deve permitir digitar código do voucher', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setVoucherCode('TEST123');
      });

      expect(result.current.voucherCode).toBe('TEST123');
    });

    it('deve resgatar voucher válido', async () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setVoucherCode('VALID2024');
      });

      await act(async () => {
        result.current.handleRedeemVoucher();
        
        // Avançar timer para simular delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      });

      expect(mockVoucherService.redeem).toHaveBeenCalledWith('VALID2024');
      expect(mockToast.success).toHaveBeenCalledWith(
        expect.stringContaining('ativado com sucesso')
      );
    });

    it('deve mostrar erro para voucher inválido', async () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setVoucherCode('INVALID');
      });

      await act(async () => {
        result.current.handleRedeemVoucher();
        await new Promise(resolve => setTimeout(resolve, 1000));
      });

      expect(mockToast.error).toHaveBeenCalled();
    });

    it('não deve resgatar voucher vazio', () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.handleRedeemVoucher();
      });

      expect(mockToast.error).toHaveBeenCalledWith(
        expect.stringContaining('Digite um código')
      );
      expect(mockVoucherService.redeem).not.toHaveBeenCalled();
    });

    it('deve mostrar loading durante resgate', async () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setVoucherCode('VALID2024');
      });

      act(() => {
        result.current.handleRedeemVoucher();
      });

      expect(result.current.isRedeeming).toBe(true);

      await waitFor(() => {
        expect(result.current.isRedeeming).toBe(false);
      }, { timeout: 2000 });
    });

    it('deve limpar código após resgate bem-sucedido', async () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setVoucherCode('VALID2024');
      });

      await act(async () => {
        result.current.handleRedeemVoucher();
        await new Promise(resolve => setTimeout(resolve, 1000));
      });

      expect(result.current.voucherCode).toBe('');
    });

    it('não deve limpar código após resgate falho', async () => {
      const { result } = renderHook(() => useSettings(mockOnClose));

      act(() => {
        result.current.setVoucherCode('INVALID');
      });

      await act(async () => {
        result.current.handleRedeemVoucher();
        await new Promise(resolve => setTimeout(resolve, 1000));
      });

      expect(result.current.voucherCode).toBe('INVALID');
    });
  });

  describe('Memoização de Callbacks', () => {
    it('handleCancelSubscription deve ser estável', () => {
      const { result, rerender } = renderHook(() => useSettings(mockOnClose));

      const firstCallback = result.current.handleCancelSubscription;
      
      rerender();
      
      const secondCallback = result.current.handleCancelSubscription;

      expect(firstCallback).toBe(secondCallback);
    });

    it('handleResetProgress deve ser estável', () => {
      const { result, rerender } = renderHook(() => useSettings(mockOnClose));

      const firstCallback = result.current.handleResetProgress;
      
      rerender();
      
      const secondCallback = result.current.handleResetProgress;

      expect(firstCallback).toBe(secondCallback);
    });

    it('handleLogout deve ser estável', () => {
      const { result, rerender } = renderHook(() => useSettings(mockOnClose));

      const firstCallback = result.current.handleLogout;
      
      rerender();
      
      const secondCallback = result.current.handleLogout;

      expect(firstCallback).toBe(secondCallback);
    });
  });

  describe('Integração com Dados do Usuário', () => {
    it('deve refletir mudanças no status premium', () => {
      mockAuthService.isPremium.mockReturnValue(false);

      const { result, rerender } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.isPremium).toBe(false);

      mockAuthService.isPremium.mockReturnValue(true);

      rerender();

      expect(result.current.isPremium).toBe(true);
    });

    it('deve carregar dados de expiração premium', () => {
      mockAuthService.getUser.mockReturnValue({
        id: 'user-123',
        name: 'João Silva',
        email: 'joao@example.com',
        plan: 'PREMIUM',
        premiumExpiresAt: '2026-12-31',
      });

      const { result } = renderHook(() => useSettings(mockOnClose));

      expect(result.current.user.premiumExpiresAt).toBe('2026-12-31');
    });
  });
});
