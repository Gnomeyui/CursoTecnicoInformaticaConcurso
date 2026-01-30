/**
 * ========================================
 * VOUCHER SERVICE - SISTEMA DE CUPONS
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Validar códigos de voucher
 * - Ativar premium via cupom
 * - Controlar uso de vouchers (evitar reutilização)
 * - Registrar histórico de resgates
 * 
 * ⚠️ SEGURANÇA - IMPORTANTE:
 * ========================================
 * 🔴 Este serviço usa localStorage SEM CRIPTOGRAFIA
 * 🔴 Códigos podem ser vistos no código-fonte
 * 🔴 É TEMPORÁRIO - substituir por backend
 * 
 * 🚀 PRÓXIMOS PASSOS (PRODUÇÃO):
 * 1. Mover validação de vouchers para backend
 * 2. Gerar códigos únicos via API
 * 3. Implementar rate limiting (evitar brute force)
 * 4. Registrar uso em banco de dados
 * ========================================
 * 
 * COMO ADICIONAR NOVOS VOUCHERS:
 * 
 * 1. Edite o array VOUCHERS abaixo
 * 2. Adicione um novo objeto com:
 *    - code: Código do voucher (MAIÚSCULAS)
 *    - type: "monthly" ou "annual"
 *    - description: Descrição (opcional)
 * 
 * EXEMPLO:
 * {
 *   code: 'GABARITOO2024',
 *   type: 'monthly',
 *   description: 'Cupom de lançamento'
 * }
 * ========================================
 */

import { authService } from './AuthService';

// ========================================
// TIPOS
// ========================================

export type VoucherType = 'monthly' | 'annual';

export interface Voucher {
  /** Código do voucher (ex: "GABARITOO2024") */
  code: string;
  
  /** Tipo de plano que o voucher ativa */
  type: VoucherType;
  
  /** Descrição do voucher (opcional) */
  description?: string;
  
  /** Se o voucher já foi usado */
  used?: boolean;
  
  /** ID do usuário que usou o voucher */
  usedBy?: string;
  
  /** Data em que foi usado */
  usedAt?: Date;
}

export interface VoucherValidationResult {
  /** Se o código é válido */
  valid: boolean;
  
  /** Mensagem de erro (se inválido) */
  message?: string;
  
  /** Voucher encontrado (se válido) */
  voucher?: Voucher;
}

// ========================================
// LISTA DE VOUCHERS VÁLIDOS
// ========================================

/**
 * 📝 ADICIONE NOVOS VOUCHERS AQUI
 * 
 * EXEMPLOS DE USO:
 * - Cupons de lançamento
 * - Promoções especiais
 * - Brindes para influencers
 * - Códigos de parceiros
 */
const VOUCHERS: Voucher[] = [
  // 🎁 CUPONS DE EXEMPLO (1 mês)
  {
    code: 'GABARITOO2024',
    type: 'monthly',
    description: 'Cupom de lançamento - 1 mês grátis'
  },
  {
    code: 'PROMO30DIAS',
    type: 'monthly',
    description: 'Cupom promocional - 30 dias premium'
  },
  {
    code: 'BEMVINDO',
    type: 'monthly',
    description: 'Cupom de boas-vindas'
  },
  
  // 🎁 CUPONS DE EXEMPLO (1 ano)
  {
    code: 'GABARITOO1ANO',
    type: 'annual',
    description: 'Cupom especial - 1 ano grátis'
  },
  {
    code: 'CONCURSEIRO2024',
    type: 'annual',
    description: 'Cupom anual para concurseiros'
  },
  
  // 🎯 ADICIONE SEUS CUPONS AQUI:
  // {
  //   code: 'SEUCUPOM123',
  //   type: 'monthly',
  //   description: 'Descrição do cupom'
  // },
];

// ========================================
// CONSTANTES
// ========================================

/** Chave do localStorage para vouchers usados */
const STORAGE_KEY = 'gabaritoo_used_vouchers';

// ========================================
// VOUCHER SERVICE CLASS
// ========================================

class VoucherService {
  /** Lista de vouchers já usados (carregada do localStorage) */
  private usedVouchers: Set<string> = new Set();

  /**
   * Construtor - carrega vouchers usados do localStorage
   */
  constructor() {
    this.loadUsedVouchers();
  }

  // ========================================
  // PERSISTÊNCIA (PRIVADAS)
  // ========================================

  /**
   * Carrega lista de vouchers já usados do localStorage
   */
  private loadUsedVouchers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      
      if (saved) {
        const data = JSON.parse(saved);
        this.usedVouchers = new Set(data);
        console.log('✅ Vouchers usados carregados:', this.usedVouchers.size);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar vouchers usados:', error);
      this.usedVouchers = new Set();
    }
  }

  /**
   * Salva lista de vouchers usados no localStorage
   */
  private saveUsedVouchers() {
    try {
      const data = Array.from(this.usedVouchers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('💾 Vouchers usados salvos');
    } catch (error) {
      console.error('❌ Erro ao salvar vouchers usados:', error);
    }
  }

  /**
   * Marca um voucher como usado
   */
  private markAsUsed(code: string) {
    this.usedVouchers.add(code.toUpperCase());
    this.saveUsedVouchers();
  }

  /**
   * Verifica se um voucher já foi usado
   */
  private isUsed(code: string): boolean {
    return this.usedVouchers.has(code.toUpperCase());
  }

  // ========================================
  // VALIDAÇÃO PÚBLICA
  // ========================================

  /**
   * Valida um código de voucher
   * 
   * @param code - Código do voucher a ser validado
   * @returns Resultado da validação
   */
  validate(code: string): VoucherValidationResult {
    // Normalizar código (maiúsculas, sem espaços)
    const normalizedCode = code.trim().toUpperCase();

    // Verificar se o código está vazio
    if (!normalizedCode) {
      return {
        valid: false,
        message: '❌ Digite um código de voucher'
      };
    }

    // Buscar voucher na lista
    const voucher = VOUCHERS.find(v => v.code === normalizedCode);

    // Verificar se o código existe
    if (!voucher) {
      return {
        valid: false,
        message: '❌ Código inválido ou inexistente'
      };
    }

    // Verificar se já foi usado
    if (this.isUsed(normalizedCode)) {
      return {
        valid: false,
        message: '❌ Este voucher já foi utilizado'
      };
    }

    // Código válido!
    return {
      valid: true,
      voucher: { ...voucher }
    };
  }

  /**
   * Resgata um voucher e ativa o plano correspondente
   * 
   * @param code - Código do voucher a ser resgatado
   * @returns Resultado do resgate
   */
  redeem(code: string): VoucherValidationResult {
    // Validar código
    const validation = this.validate(code);

    // Se inválido, retornar erro
    if (!validation.valid || !validation.voucher) {
      return validation;
    }

    const { voucher } = validation;
    const normalizedCode = code.trim().toUpperCase();

    try {
      // Ativar plano de acordo com o tipo do voucher
      if (voucher.type === 'monthly') {
        authService.activateMonthly();
        console.log('✅ Plano MENSAL ativado via voucher:', normalizedCode);
      } else if (voucher.type === 'annual') {
        authService.activateAnnual();
        console.log('✅ Plano ANUAL ativado via voucher:', normalizedCode);
      }

      // Marcar voucher como usado
      this.markAsUsed(normalizedCode);

      // Sucesso!
      return {
        valid: true,
        voucher: { ...voucher, used: true, usedAt: new Date() }
      };
      
    } catch (error) {
      console.error('❌ Erro ao resgatar voucher:', error);
      
      return {
        valid: false,
        message: '❌ Erro ao ativar voucher. Tente novamente.'
      };
    }
  }

  /**
   * Retorna lista de vouchers disponíveis (apenas códigos)
   * ⚠️ Em produção, esta função deve ser removida (expõe códigos)
   */
  getAvailableVouchers(): string[] {
    return VOUCHERS
      .filter(v => !this.isUsed(v.code))
      .map(v => v.code);
  }

  /**
   * Verifica se um usuário pode usar vouchers
   * (Pode adicionar lógica de limite por usuário aqui)
   */
  canUseVoucher(): boolean {
    // Por enquanto, qualquer um pode usar
    // Em produção, pode adicionar limites:
    // - Máximo de X vouchers por usuário
    // - Apenas usuários FREE podem usar
    // - Cooldown entre vouchers
    return true;
  }

  /**
   * [ADMIN] Reseta todos os vouchers usados
   * ⚠️ APENAS PARA TESTES - Remover em produção
   */
  resetAllVouchers() {
    console.warn('⚠️ RESETANDO TODOS OS VOUCHERS (TESTE APENAS)');
    this.usedVouchers.clear();
    this.saveUsedVouchers();
    console.log('✅ Vouchers resetados');
  }
}

// ========================================
// SINGLETON EXPORT
// ========================================

/**
 * Instância única do VoucherService (Singleton)
 * 
 * USO:
 * import { voucherService } from './services/VoucherService';
 * const result = voucherService.redeem('GABARITOO2024');
 */
export const voucherService = new VoucherService();

// ========================================
// NOTAS PARA PRODUÇÃO
// ========================================

/**
 * 🚀 CHECKLIST PARA PRODUÇÃO:
 * 
 * [ ] Mover lista de vouchers para backend/banco de dados
 * [ ] Implementar geração de códigos únicos via API
 * [ ] Adicionar rate limiting (evitar brute force)
 * [ ] Implementar limite de uso por usuário
 * [ ] Adicionar expiração de vouchers
 * [ ] Implementar vouchers de uso único vs múltiplo
 * [ ] Adicionar tracking de origem do voucher
 * [ ] Implementar vouchers com condições (ex: primeiro uso apenas)
 * [ ] Adicionar analytics de conversão de vouchers
 * [ ] Implementar webhook de notificação quando voucher usado
 * 
 * 📚 MELHORIAS FUTURAS:
 * - Vouchers com desconto percentual
 * - Vouchers com limite de uso (ex: primeiros 100 usuários)
 * - Vouchers com data de expiração
 * - Vouchers para features específicas
 * - Programa de afiliados com vouchers personalizados
 */
