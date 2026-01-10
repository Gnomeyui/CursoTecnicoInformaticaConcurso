import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { AppState, AppAction } from './types';
import { appReducer, initialState } from './appReducer';

interface AppStateContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    // Carregar estado do localStorage
    const savedState = localStorage.getItem('gabaritoo_app_state');
    if (savedState) {
      try {
        return { ...initial, ...JSON.parse(savedState) };
      } catch (e) {
        console.error('Erro ao carregar estado:', e);
        return initial;
      }
    }
    return initial;
  });

  // Sincronizar com localStorage (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('gabaritoo_app_state', JSON.stringify(state));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Memorizar o valor do contexto para evitar re-renders desnecessários
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState deve ser usado dentro de AppStateProvider');
  }
  return context;
}
