import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

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
  
  // 1. Inicialização: Recupera do localStorage ou usa o sistema
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('alerr_dark_mode');
    console.log('🔍 ThemeContext Init - Saved Mode:', savedMode);
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 2. Efeito: Aplica a classe .dark ao HTML e muda a StatusBar
  useEffect(() => {
    console.log('🎨 ThemeContext Effect - isDarkMode:', isDarkMode);
    const html = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark'); // Garante compatibilidade
      console.log('✅ Dark classes ADDED to html & body');
      
      if (Capacitor.isNativePlatform()) {
        StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
        StatusBar.setBackgroundColor({ color: '#020817' }).catch(() => {}); // Cor escura
      }
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      console.log('✅ Dark classes REMOVED from html & body');
      
      if (Capacitor.isNativePlatform()) {
        StatusBar.setStyle({ style: Style.Light }).catch(() => {});
        StatusBar.setBackgroundColor({ color: '#ffffff' }).catch(() => {}); // Cor clara
      }
    }

    localStorage.setItem('alerr_dark_mode', String(isDarkMode));
    console.log('💾 Saved to localStorage:', isDarkMode);
  }, [isDarkMode]);

  // 3. Efeito: Aplica o tema de cores (azul, roxo, etc)
  useEffect(() => {
    const savedTheme = localStorage.getItem('alerr_theme') as Theme | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('alerr_theme', currentTheme);
  }, [currentTheme]);

  const toggleDarkMode = () => {
    console.log('🌙 toggleDarkMode CALLED! Current:', isDarkMode, '→ New:', !isDarkMode);
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, isDarkMode, toggleDarkMode }}>
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
