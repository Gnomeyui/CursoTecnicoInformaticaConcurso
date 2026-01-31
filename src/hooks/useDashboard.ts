/**
 * @file useDashboard.ts
 * @description Custom Hook para lógica do Dashboard
 * @pattern Headless Logic Pattern - Separação total de UI e Lógica
 */

import { useMemo } from 'react';
import { useCustomization } from '../context/CustomizationContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';
import { getRandomMotivationalCTA } from '../utils/getRandomMotivationalCTA';
import { getThemeColor, getThemeGradient } from '../lib/themeUtils';

/**
 * Interface dos dados retornados pelo hook
 */
export interface DashboardData {
  // Profile
  profileName: string;
  hasActiveProfile: boolean;
  
  // Gamification
  xp: number;
  level: number;
  levelProgress: number;
  currentStreak: number;
  
  // Stats
  overallAccuracy: number;
  subjectStats: Array<{
    subject: string;
    accuracy: number;
  }>;
  hasStats: boolean;
  
  // UI
  motivationalText: string;
  themeColor: string;
  themeGradient: string;
  bgLightHex: string;
}

/**
 * Hook principal do Dashboard
 * 
 * @returns {DashboardData} Dados processados e prontos para exibição
 * 
 * @example
 * ```tsx
 * const dashboard = useDashboard();
 * 
 * return (
 *   <div>
 *     <h1>{dashboard.profileName}</h1>
 *     <p>XP: {dashboard.xp}</p>
 *   </div>
 * );
 * ```
 */
export const useDashboard = (): DashboardData => {
  // ============================================
  // 1. CONTEXTS
  // ============================================
  const { theme: currentTheme, settings } = useCustomization();
  const { activeProfile } = useConcursoProfile();
  const { xp, level } = useGame();
  const { detailedStats } = useStats();

  // ============================================
  // 2. COMPUTED VALUES (Memoized)
  // ============================================
  
  /**
   * Calcula o progresso do nível atual (0-100%)
   */
  const levelProgress = useMemo(() => {
    return (xp % 1000) / 10;
  }, [xp]);

  /**
   * Texto motivacional (gerado uma vez)
   */
  const motivationalText = useMemo(() => {
    return getRandomMotivationalCTA();
  }, []);

  /**
   * Cores do tema (inline styles para APK)
   */
  const themeColor = useMemo(() => {
    return getThemeColor(settings.colorTheme);
  }, [settings.colorTheme]);

  const themeGradient = useMemo(() => {
    return getThemeGradient(settings.colorTheme);
  }, [settings.colorTheme]);

  /**
   * Nome do perfil ativo
   */
  const profileName = useMemo(() => {
    return activeProfile ? activeProfile.nome : 'Selecionar Cargo';
  }, [activeProfile]);

  /**
   * Accuracy arredondado
   */
  const overallAccuracy = useMemo(() => {
    return Math.round(detailedStats.overallAccuracy);
  }, [detailedStats.overallAccuracy]);

  /**
   * Stats por matéria (arredondado)
   */
  const subjectStats = useMemo(() => {
    return detailedStats.subjectStats.map(subj => ({
      subject: subj.subject,
      accuracy: Math.round(subj.accuracy)
    }));
  }, [detailedStats.subjectStats]);

  // ============================================
  // 3. RETURN (Dados Processados)
  // ============================================
  return {
    // Profile
    profileName,
    hasActiveProfile: !!activeProfile,
    
    // Gamification
    xp,
    level,
    levelProgress,
    currentStreak: detailedStats.currentStreak,
    
    // Stats
    overallAccuracy,
    subjectStats,
    hasStats: subjectStats.length > 0,
    
    // UI
    motivationalText,
    themeColor,
    themeGradient,
    bgLightHex: currentTheme.bgLightHex
  };
};
