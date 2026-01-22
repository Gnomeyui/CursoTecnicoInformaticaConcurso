import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

type Theme = 'default' | 'ocean' | 'forest' | 'sunset' | 'purple';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Carrega o tema salvo ou usa o padrão
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    return (localStorage.getItem('alerr_theme') as Theme) || 'default';
  });

  useEffect(() => {
    const html = document.documentElement;
    
    // 1. Remove qualquer traço de dark mode antigo
    html.classList.remove('dark');
    html.classList.add('light'); // Força light mode
    html.style.colorScheme = 'light';

    // 2. Aplica o tema colorido selecionado
    html.setAttribute('data-theme', currentTheme);
    localStorage.setItem('alerr_theme', currentTheme);

    // 3. Força a barra de status a ser Clara (ícones escuros)
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light }).catch(() => {});
      StatusBar.setBackgroundColor({ color: '#ffffff' }).catch(() => {});
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
