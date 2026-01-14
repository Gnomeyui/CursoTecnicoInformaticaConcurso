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
  const [isDarkMode, setIsDarkMode] = useState(false); // SEMPRE LIGHT MODE

  // Carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem('alerr_theme') as Theme | null;
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
    
    // FORÇAR LIGHT MODE - remover dark mode do localStorage
    localStorage.removeItem('alerr_dark_mode');
    setIsDarkMode(false);
  }, []);

  // Aplicar tema ao HTML
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    html.setAttribute('data-theme', currentTheme);
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('alerr_theme', currentTheme);
  }, [currentTheme]);

  // Aplicar LIGHT MODE FORÇADO ao HTML
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // SEMPRE REMOVER dark class
    html.classList.remove('dark');
    body.classList.remove('dark');
    
    localStorage.removeItem('alerr_dark_mode');
  }, [isDarkMode]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const toggleDarkMode = () => {
    // DESABILITADO - não faz nada
    return;
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isDarkMode: false, toggleDarkMode }}>
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