/**
 * AppProviders - Centralizador de Contextos
 * 
 * Separa a lógica de providers do App.tsx principal
 * Facilita testes e manutenção
 */

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { GameProvider } from '../context/GameContext';
import { StatsProvider } from '../context/StatsContext';
import { CustomizationProvider } from '../context/CustomizationContext';
import { NotificationProvider } from '../context/NotificationContext';
import { WrongQuestionsProvider } from '../context/WrongQuestionsContext';
import { ConcursoProfileProvider } from '../context/ConcursoProfileContext';
import { SmartNotificationProvider } from '../context/SmartNotificationContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <GameProvider>
        <StatsProvider>
          <CustomizationProvider>
            <NotificationProvider>
              <WrongQuestionsProvider>
                <ConcursoProfileProvider>
                  <SmartNotificationProvider>
                    {children}
                  </SmartNotificationProvider>
                </ConcursoProfileProvider>
              </WrongQuestionsProvider>
            </NotificationProvider>
          </CustomizationProvider>
        </StatsProvider>
      </GameProvider>
    </ThemeProvider>
  );
}
