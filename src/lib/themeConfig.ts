/**
 * ========================================
 * THEME CONFIG - CONFIGURAÇÃO DE TEMAS
 * ========================================
 * 
 * IMPORTANTE PARA APK:
 * - Usa cores HEXADECIMAIS diretas (não classes Tailwind)
 * - Cores são aplicadas via inline styles (garantido no APK)
 * - Cada tema tem uma COR PRINCIPAL que funciona SEMPRE
 * 
 * ESTRUTURA:
 * - 5 temas científicos baseados em psicologia cognitiva
 * - Cada tema tem nome, descrição, cores e gradientes
 * - Cores em formato HEX (#1F4E79) para máxima compatibilidade
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========================================
// TIPOS
// ========================================

export type ThemeType = 'deepFocus' | 'calmStudy' | 'highAlert' | 'minimalNeutral' | 'nightMode';

/**
 * Interface de estilos do tema
 * Inclui cores HEX para usar em inline styles
 */
interface ThemeStyles {
  /** Nome exibido para o usuário */
  name: string;
  
  /** Descrição curta do tema */
  description: string;
  
  /** Efeito psicológico/científico */
  scientificEffect: string;
  
  // ========================================
  // CORES HEXADECIMAIS (para inline styles)
  // ========================================
  
  /** Cor primária principal (HEX) - USA ESTA NO APK! */
  primaryHex: string;
  
  /** Cor secundária (HEX) */
  secondaryHex: string;
  
  /** Cor de fundo suave (HEX) */
  bgLightHex: string;
  
  /** Cor de texto principal (HEX) */
  textHex: string;
  
  // ========================================
  // CLASSES TAILWIND (para web/dev)
  // ========================================
  
  /** Gradiente (classes Tailwind) */
  gradient: string;
  
  /** Botão (classes Tailwind) */
  button: string;
  
  /** Texto primário (classes Tailwind) */
  primaryText: string;
  
  /** Fundo suave (classes Tailwind) */
  bgLight: string;
  
  /** Borda (classes Tailwind) */
  border: string;
  
  /** Anel de foco (classes Tailwind) */
  ring: string;
  
  /** Barra de progresso (classes Tailwind) */
  progress: string;
  
  // ========================================
  // ALIASES (compatibilidade)
  // ========================================
  
  iconColor: string;
  lightText: string;
  progressBar: string;
  highlight: string;
  iconBg: string;
  softBg: string;
}

// ========================================
// TEMAS DISPONÍVEIS
// ========================================

export const APP_THEMES: Record<ThemeType, ThemeStyles> = {
  // ========================================
  // TEMA 1: CONCENTRAÇÃO PROFUNDA
  // ========================================
  deepFocus: {
    name: "Concentração Profunda",
    description: "Sessões longas, leitura técnica e programação.",
    scientificEffect: "Estabilidade emocional e foco por longos períodos",
    
    // ✅ CORES HEX (GARANTIDAS NO APK)
    primaryHex: "#1F4E79",     // Azul Petróleo
    secondaryHex: "#0F2A44",   // Azul Escuro
    bgLightHex: "#E6E9ED",     // Cinza Azulado Claro
    textHex: "#0F2A44",        // Texto Escuro
    
    // Classes Tailwind (para web)
    gradient: "from-[#1F4E79] to-[#0F2A44]",
    button: "bg-[#1F4E79] hover:bg-[#0F2A44] text-white",
    primaryText: "text-[#1F4E79]",
    bgLight: "bg-[#E6E9ED]",
    border: "border-[#E6E9ED]",
    ring: "ring-[#1F4E79]",
    progress: "bg-[#1F4E79]",
    iconColor: "text-[#1F4E79]",
    lightText: "text-white",
    progressBar: "bg-[#1F4E79]",
    highlight: "bg-[#E6E9ED] text-[#0F2A44]",
    iconBg: "bg-[#E6E9ED]",
    softBg: "bg-[#F7F9FB]"
  },

  // ========================================
  // TEMA 2: CALMA COGNITIVA
  // ========================================
  calmStudy: {
    name: "Calma Cognitiva",
    description: "Leitura, resumos e estudo teórico.",
    scientificEffect: "Segurança mental e retenção de informação",
    
    // ✅ CORES HEX (GARANTIDAS NO APK)
    primaryHex: "#3A5F4B",     // Verde Musgo
    secondaryHex: "#2A4736",   // Verde Escuro
    bgLightHex: "#F2EFEA",     // Bege Claro
    textHex: "#2A4736",        // Texto Escuro Verde
    
    // Classes Tailwind (para web)
    gradient: "from-[#3A5F4B] to-[#2A4736]",
    button: "bg-[#3A5F4B] hover:bg-[#2F4D3C] text-white",
    primaryText: "text-[#3A5F4B]",
    bgLight: "bg-[#F2EFEA]",
    border: "border-[#A8C3B1]",
    ring: "ring-[#3A5F4B]",
    progress: "bg-[#3A5F4B]",
    iconColor: "text-[#3A5F4B]",
    lightText: "text-white",
    progressBar: "bg-[#3A5F4B]",
    highlight: "bg-[#F2EFEA] text-[#3A5F4B]",
    iconBg: "bg-[#F2EFEA]",
    softBg: "bg-[#F2EFEA]"
  },

  // ========================================
  // TEMA 3: ALTA ATENÇÃO
  // ========================================
  highAlert: {
    name: "Alta Atenção",
    description: "Questões, simulados e tarefas exigentes.",
    scientificEffect: "Aumento da vigilância sem estresse excessivo",
    
    // ✅ CORES HEX (GARANTIDAS NO APK)
    primaryHex: "#27AE60",     // Verde Vibrante
    secondaryHex: "#1F8A4D",   // Verde Escuro
    bgLightHex: "#F5F7FA",     // Cinza Claro
    textHex: "#1C2331",        // Texto Escuro
    
    // Classes Tailwind (para web)
    gradient: "from-[#1C2331] to-[#27AE60]",
    button: "bg-[#27AE60] hover:bg-[#1F8A4D] text-white",
    primaryText: "text-[#1C2331]",
    bgLight: "bg-[#F5F7FA]",
    border: "border-[#9AA0A6]",
    ring: "ring-[#27AE60]",
    progress: "bg-[#27AE60]",
    iconColor: "text-[#27AE60]",
    lightText: "text-white",
    progressBar: "bg-[#27AE60]",
    highlight: "bg-[#F2C94C]/20 text-[#1C2331]",
    iconBg: "bg-[#F5F7FA]",
    softBg: "bg-[#F5F7FA]"
  },

  // ========================================
  // TEMA 4: MINIMALISMO NEUTRO
  // ========================================
  minimalNeutral: {
    name: "Minimalismo Neutro",
    description: "Zero distrações. Para quem se distrai fácil.",
    scientificEffect: "Redução de estímulos visuais e clareza cognitiva",
    
    // ✅ CORES HEX (GARANTIDAS NO APK)
    primaryHex: "#5F6368",     // Cinza Grafite
    secondaryHex: "#2E2E2E",   // Cinza Escuro
    bgLightHex: "#FAFAFA",     // Cinza Muito Claro
    textHex: "#2E2E2E",        // Texto Escuro
    
    // Classes Tailwind (para web)
    gradient: "from-[#5F6368] to-[#2E2E2E]",
    button: "bg-[#5F6368] hover:bg-[#2E2E2E] text-white",
    primaryText: "text-[#2E2E2E]",
    bgLight: "bg-[#FAFAFA]",
    border: "border-[#DADCE0]",
    ring: "ring-[#5F6368]",
    progress: "bg-[#5F6368]",
    iconColor: "text-[#5F6368]",
    lightText: "text-white",
    progressBar: "bg-[#5F6368]",
    highlight: "bg-[#DADCE0] text-[#2E2E2E]",
    iconBg: "bg-[#FAFAFA]",
    softBg: "bg-[#FAFAFA]"
  },

  // ========================================
  // TEMA 5: MODO NOTURNO
  // ========================================
  nightMode: {
    name: "Modo Noturno",
    description: "Reduz fadiga ocular. Ideal para noite.",
    scientificEffect: "Menor esforço visual e foco em baixa luz",
    
    // ✅ CORES HEX (GARANTIDAS NO APK)
    primaryHex: "#58A6FF",     // Azul GitHub
    secondaryHex: "#161B22",   // Preto Azulado
    bgLightHex: "#C9D1D9",     // Cinza Azulado
    textHex: "#0D1117",        // Preto Puro
    
    // Classes Tailwind (para web)
    gradient: "from-[#161B22] to-[#0D1117]",
    button: "bg-[#58A6FF] hover:bg-[#3F8FE0] text-white",
    primaryText: "text-[#161B22]",
    bgLight: "bg-[#C9D1D9]/20",
    border: "border-[#C9D1D9]/30",
    ring: "ring-[#58A6FF]",
    progress: "bg-[#58A6FF]",
    iconColor: "text-[#58A6FF]",
    lightText: "text-white",
    progressBar: "bg-[#58A6FF]",
    highlight: "bg-[#C9D1D9]/20 text-[#0D1117]",
    iconBg: "bg-[#C9D1D9]/20",
    softBg: "bg-[#C9D1D9]/10"
  }
};

/**
 * Pega a cor HEX de um tema
 * Use esta função para aplicar cores via inline styles no APK
 * 
 * @param theme - Nome do tema
 * @returns Cor primária em formato HEX
 */
export function getThemeColorHex(theme: ThemeType): string {
  return APP_THEMES[theme].primaryHex;
}

/**
 * Pega o gradiente CSS de um tema
 * Use esta função para criar gradientes via inline styles
 * 
 * @param theme - Nome do tema
 * @returns String de gradiente CSS
 */
export function getThemeGradient(theme: ThemeType): string {
  const { primaryHex, secondaryHex } = APP_THEMES[theme];
  return `linear-gradient(135deg, ${primaryHex} 0%, ${secondaryHex} 100%)`;
}
