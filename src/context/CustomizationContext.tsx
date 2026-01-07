import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importe o ThemeType do nosso novo arquivo
import { ThemeType, APP_THEMES } from '../lib/themeConfig';

export interface CustomizationSettings {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  colorTheme: ThemeType; // <--- Atualizado para usar as 8 paletas
  highContrast: boolean;
  reducedMotion: boolean;
  compactMode: boolean;
}

interface CustomizationContextType {
  settings: CustomizationSettings;
  updateSettings: (settings: Partial<CustomizationSettings>) => void;
  // Compatibilidade com código antigo
  primaryColor: ThemeType;
  setPrimaryColor: (color: ThemeType) => void;
  // Novo: acesso direto ao tema
  theme: typeof APP_THEMES[ThemeType];
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

const STORAGE_KEY = 'alerr_customization_settings';

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CustomizationSettings>({
    fontSize: 'medium',
    colorTheme: 'focus', // Padrão: Azul Foco
    highContrast: false,
    reducedMotion: false,
    compactMode: false
  });

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
    applySettings();
  }, [settings]);

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        
        // MIGRAÇÃO: Converter valores antigos para novos
        const colorThemeMap: Record<string, ThemeType> = {
          'default': 'focus',
          'blue': 'focus',
          'green': 'calm',
          'purple': 'creative',
          'orange': 'energy'
        };
        
        // Se o colorTheme for um valor antigo, migrar
        if (data.colorTheme && colorThemeMap[data.colorTheme]) {
          data.colorTheme = colorThemeMap[data.colorTheme];
        }
        
        // Garantir que seja um valor válido
        const validThemes: ThemeType[] = ['focus', 'calm', 'creative', 'energy', 'comfort', 'minimal', 'ocean', 'warmth'];
        if (!validThemes.includes(data.colorTheme)) {
          data.colorTheme = 'focus';
        }
        
        setSettings(data);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações de personalização:', error);
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Erro ao salvar configurações de personalização:', error);
    }
  };

  const applySettings = () => {
    const root = document.documentElement;

    // Aplicar tamanho de fonte
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    };
    root.style.fontSize = fontSizes[settings.fontSize];

    // Aplicar alto contraste
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Aplicar redução de movimento
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Aplicar modo compacto
    if (settings.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }
  };

  const updateSettings = (newSettings: Partial<CustomizationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Compatibilidade com código antigo
  const setPrimaryColor = (color: ThemeType) => {
    updateSettings({ colorTheme: color });
  };

  return (
    <CustomizationContext.Provider value={{ 
      settings, 
      updateSettings,
      primaryColor: settings.colorTheme,
      setPrimaryColor,
      theme: APP_THEMES[settings.colorTheme]
    }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within CustomizationProvider');
  }
  return context;
}