import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CustomizationSettings {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  colorTheme: 'default' | 'blue' | 'green' | 'purple' | 'orange';
  highContrast: boolean;
  reducedMotion: boolean;
  compactMode: boolean;
}

interface CustomizationContextType {
  settings: CustomizationSettings;
  updateSettings: (settings: Partial<CustomizationSettings>) => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

const STORAGE_KEY = 'alerr_customization_settings';

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CustomizationSettings>({
    fontSize: 'medium',
    colorTheme: 'default',
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

    // Aplicar tema de cores
    const themes = {
      default: {
        primary: '239 68 68', // red-500
        secondary: '59 130 246', // blue-500
        accent: '16 185 129' // emerald-500
      },
      blue: {
        primary: '59 130 246', // blue-500
        secondary: '14 165 233', // sky-500
        accent: '99 102 241' // indigo-500
      },
      green: {
        primary: '34 197 94', // green-500
        secondary: '16 185 129', // emerald-500
        accent: '20 184 166' // teal-500
      },
      purple: {
        primary: '168 85 247', // purple-500
        secondary: '139 92 246', // violet-500
        accent: '236 72 153' // pink-500
      },
      orange: {
        primary: '249 115 22', // orange-500
        secondary: '251 146 60', // orange-400
        accent: '234 88 12' // orange-600
      }
    };
    
    const theme = themes[settings.colorTheme];
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);

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

  return (
    <CustomizationContext.Provider value={{ settings, updateSettings }}>
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
