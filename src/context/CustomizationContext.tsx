/**
 * ========================================
 * CUSTOMIZATION CONTEXT
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Gerenciar configurações de personalização visual do app
 * - Aplicar temas de cores (5 paletas científicas)
 * - Controlar tamanho de fonte, contraste, animações
 * - Persistir preferências no localStorage
 * 
 * TEMAS DISPONÍVEIS:
 * - deepFocus: Azul Petróleo #1F4E79 (Concentração)
 * - calmStudy: Verde Musgo #3A5F4B (Calma)
 * - highAlert: Verde Vibrante #27AE60 (Atenção)
 * - minimalNeutral: Cinza Grafite #5F6368 (Minimalismo)
 * - nightMode: Azul GitHub #58A6FF (Noturno)
 * 
 * USO:
 * const { settings, updateSettings, theme } = useCustomization();
 * 
 * SEGURANÇA:
 * ✅ Dados armazenados localmente (não sensíveis)
 * ✅ Validação de valores antes de aplicar
 * ✅ Fallback para valores padrão
 * 
 * MANUTENÇÃO:
 * - Adicionar novo tema: editar APP_THEMES em /lib/themeConfig.ts
 * - Adicionar nova configuração: atualizar CustomizationSettings
 * ========================================
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType, APP_THEMES } from '../lib/themeConfig';

// ========================================
// TYPES E INTERFACES
// ========================================

/**
 * Configurações de personalização do usuário
 */
export interface CustomizationSettings {
  /** Tamanho da fonte: small, medium, large, xlarge */
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  
  /** Tema de cores: deepFocus, calmStudy, highAlert, minimalNeutral, nightMode */
  colorTheme: ThemeType;
  
  /** Alto contraste para melhor legibilidade */
  highContrast: boolean;
  
  /** Reduzir animações (acessibilidade) */
  reducedMotion: boolean;
  
  /** Modo compacto (mais informação em menos espaço) */
  compactMode: boolean;
}

/**
 * Interface do contexto de customização
 */
interface CustomizationContextType {
  /** Configurações atuais */
  settings: CustomizationSettings;
  
  /** Atualizar configurações parcialmente */
  updateSettings: (settings: Partial<CustomizationSettings>) => void;
  
  /** [LEGADO] Cor primária - mantido para compatibilidade */
  primaryColor: ThemeType;
  
  /** [LEGADO] Setter de cor - mantido para compatibilidade */
  setPrimaryColor: (color: ThemeType) => void;
  
  /** Objeto do tema atual com todas as cores */
  theme: typeof APP_THEMES[ThemeType];
}

// ========================================
// CONTEXT E STORAGE
// ========================================

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

/** Chave do localStorage para persistência */
const STORAGE_KEY = 'alerr_customization_settings';

// ========================================
// PROVIDER
// ========================================

export function CustomizationProvider({ children }: { children: ReactNode }) {
  // Estado das configurações com valores padrão
  const [settings, setSettings] = useState<CustomizationSettings>({
    fontSize: 'medium',
    colorTheme: 'deepFocus', // Tema padrão: Azul Concentração
    highContrast: false,
    reducedMotion: false,
    compactMode: false
  });

  // ========================================
  // LIFECYCLE: Carregar ao montar
  // ========================================
  useEffect(() => {
    loadSettings();
  }, []);

  // ========================================
  // LIFECYCLE: Salvar e aplicar ao mudar
  // ========================================
  useEffect(() => {
    saveSettings();
    applySettings();
  }, [settings]);

  // ========================================
  // FUNÇÕES DE PERSISTÊNCIA
  // ========================================

  /**
   * Carrega configurações salvas do localStorage
   * Inclui migração automática de valores antigos
   */
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const data = JSON.parse(saved);
      
      // ========================================
      // MIGRAÇÃO DE TEMAS ANTIGOS
      // ========================================
      // Mapeia valores antigos para os 5 novos temas científicos
      const colorThemeMap: Record<string, ThemeType> = {
        // Valores antigos (ocean, forest, etc) -> Novos temas
        'default': 'deepFocus',
        'blue': 'deepFocus',
        'focus': 'deepFocus',
        'ocean': 'deepFocus',
        'green': 'calmStudy',
        'calm': 'calmStudy',
        'forest': 'calmStudy',
        'purple': 'highAlert',
        'creative': 'highAlert',
        'orange': 'highAlert',
        'energy': 'highAlert',
        'comfort': 'calmStudy',
        'minimal': 'minimalNeutral',
        'sunset': 'minimalNeutral',
        'warmth': 'nightMode'
      };
      
      // Aplicar migração se necessário
      if (data.colorTheme && colorThemeMap[data.colorTheme]) {
        data.colorTheme = colorThemeMap[data.colorTheme];
      }
      
      // ========================================
      // VALIDAÇÃO DE TEMA
      // ========================================
      // Garantir que seja um dos 5 temas válidos
      const validThemes: ThemeType[] = [
        'deepFocus', 
        'calmStudy', 
        'highAlert', 
        'minimalNeutral', 
        'nightMode'
      ];
      
      if (!validThemes.includes(data.colorTheme)) {
        data.colorTheme = 'deepFocus'; // Fallback para padrão
      }
      
      setSettings(data);
    } catch (error) {
      console.error('❌ Erro ao carregar configurações de personalização:', error);
      // Mantém valores padrão em caso de erro
    }
  };

  /**
   * Salva configurações no localStorage
   */
  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('❌ Erro ao salvar configurações de personalização:', error);
    }
  };

  // ========================================
  // APLICAÇÃO DAS CONFIGURAÇÕES
  // ========================================

  /**
   * Aplica as configurações no DOM
   * Modifica classes e atributos do elemento <html>
   */
  const applySettings = () => {
    const root = document.documentElement;

    // ========================================
    // 1. APLICAR TEMA DE CORES
    // ========================================
    // Define o atributo data-theme que ativa as variáveis CSS
    // Ver /styles/globals.css para ver como [data-theme="..."] funciona
    root.setAttribute('data-theme', settings.colorTheme);

    // ========================================
    // 2. FORÇAR LIGHT MODE SEMPRE
    // ========================================
    // O app é SEMPRE light mode (fundo branco, texto preto)
    // Apenas as cores primárias mudam com os temas
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';

    // ========================================
    // 3. APLICAR TAMANHO DE FONTE
    // ========================================
    const fontSizes = {
      small: '14px',   // Para quem prefere texto menor
      medium: '16px',  // Padrão
      large: '18px',   // Mais legível
      xlarge: '20px'   // Acessibilidade
    };
    root.style.fontSize = fontSizes[settings.fontSize];

    // ========================================
    // 4. APLICAR ALTO CONTRASTE
    // ========================================
    // Adiciona classe CSS que aumenta contraste de cores
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // ========================================
    // 5. APLICAR REDUÇÃO DE MOVIMENTO
    // ========================================
    // Desabilita animações (importante para acessibilidade)
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // ========================================
    // 6. APLICAR MODO COMPACTO
    // ========================================
    // Reduz espaçamentos para mostrar mais conteúdo
    if (settings.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }
  };

  // ========================================
  // FUNÇÕES PÚBLICAS
  // ========================================

  /**
   * Atualiza configurações parcialmente
   * Exemplo: updateSettings({ colorTheme: 'calmStudy' })
   */
  const updateSettings = (newSettings: Partial<CustomizationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  /**
   * [LEGADO] Setter de cor primária
   * Mantido para compatibilidade com código antigo
   */
  const setPrimaryColor = (color: ThemeType) => {
    updateSettings({ colorTheme: color });
  };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <CustomizationContext.Provider value={{ 
      settings, 
      updateSettings,
      // Compatibilidade com código antigo:
      primaryColor: settings.colorTheme,
      setPrimaryColor,
      // Acesso direto ao objeto do tema com todas as cores:
      theme: APP_THEMES[settings.colorTheme]
    }}>
      {children}
    </CustomizationContext.Provider>
  );
}

// ========================================
// HOOK CUSTOMIZADO
// ========================================

/**
 * Hook para acessar o contexto de customização
 * 
 * USO:
 * const { settings, updateSettings, theme } = useCustomization();
 * 
 * ERRO:
 * Lança erro se usado fora do CustomizationProvider
 */
export function useCustomization() {
  const context = useContext(CustomizationContext);
  
  if (!context) {
    throw new Error('❌ useCustomization must be used within CustomizationProvider');
  }
  
  return context;
}
