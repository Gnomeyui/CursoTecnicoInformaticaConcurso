/**
 * AppProviders - Centralizador de Contextos
 * 
 * Separa a lógica de providers do App.tsx principal
 * Facilita testes e manutenção
 */

import React from 'react';
// ThemeProvider removido - CustomizationProvider já gerencia temas
import { GameProvider } from '../context/GameContext';
import { StatsProvider } from '../context/StatsContext';
import { CustomizationProvider } from '../context/CustomizationContext';
import { NotificationProvider } from '../context/NotificationContext';
import { WrongQuestionsProvider } from '../context/WrongQuestionsContext';
import { ConcursoProfileProvider } from '../context/ConcursoProfileContext';
import { SmartNotificationProvider } from '../context/SmartNotificationContext';
import { AppStateProvider } from '../context/AppState/AppStateContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CustomizationProvider>
      <GameProvider>
        <StatsProvider>
          <NotificationProvider>
            <WrongQuestionsProvider>
              <ConcursoProfileProvider>
                <SmartNotificationProvider>
                  <AppStateProvider>
                    {children}
                  </AppStateProvider>
                </SmartNotificationProvider>
              </ConcursoProfileProvider>
            </WrongQuestionsProvider>
          </NotificationProvider>
        </StatsProvider>
      </GameProvider>
    </CustomizationProvider>
  );
}