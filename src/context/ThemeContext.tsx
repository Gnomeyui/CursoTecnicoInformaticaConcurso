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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem('alerr_theme') as Theme | null;
    const savedDarkMode = localStorage.getItem('alerr_dark_mode');
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Aplicar tema ao HTML
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    html.setAttribute('data-theme', currentTheme);
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('alerr_theme', currentTheme);
  }, [currentTheme]);

  // Aplicar dark mode ao HTML
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }
    
    localStorage.setItem('alerr_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
