/**
 * App.tsx - Entrypoint Principal
 * 
 * Arquitetura Modular:
 * - AppProviders: Gerencia todos os contextos
 * - AppShell: Gerencia navegação e estado
 * 
 * Refatorado conforme Auditoria 2.0 (10/01/2026)
 */

import React from 'react';
import { AppProviders } from './app/AppProviders';
import { AppShell } from './app/AppShell';

export default function App() {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  );
}
