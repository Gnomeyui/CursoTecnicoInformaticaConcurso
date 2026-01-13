import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'default' | 'forest' | 'ocean' | 'sunset' | 'purple' | 'modern' | 'focus' | 'calm' | 'reading';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');
  
  // 1. Inicialização Inteligente: LocalStorage -> Sistema -> Padrão (Light)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica se já existe preferência salva
    const savedMode = localStorage.getItem('alerr_dark_mode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // Se não, usa a preferência do sistema (mas não força)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    // Padrão: Light Mode
    return false;
  });

  // Carregar tema de cores (azul, roxo, etc)
  useEffect(() => {
    const savedTheme = localStorage.getItem('alerr_theme') as Theme | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // 2. Efeito Principal: Aplica a classe .dark e atualiza meta tag
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
      
      // Atualiza meta tag theme-color para modo escuro
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#020817'); // Slate 950
      }
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      
      // Atualiza meta tag theme-color para modo claro
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#3b82f6'); // Blue 500
      }
    }

    // Salva preferência no localStorage
    localStorage.setItem('alerr_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Aplica o tema de cores (data-theme)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('alerr_theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
