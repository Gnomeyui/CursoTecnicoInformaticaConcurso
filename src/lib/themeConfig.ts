import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ThemeType = 'deepFocus' | 'calmStudy' | 'highAlert' | 'minimalNeutral' | 'nightMode';

interface ThemeStyles {
  name: string;
  description: string;
  scientificEffect: string; // Novo: efeito psicológico
  // Classes CSS completas para o Tailwind
  gradient: string;
  button: string;
  primaryText: string;    // Cor do texto principal colorido
  bgLight: string;       // Fundo suave para ícones
  border: string;        // Cor da borda
  ring: string;          // Cor do anel de foco
  progress: string;      // Cor da barra de progresso
  // Adicionais para compatibilidade
  iconColor: string;     // Cor dos ícones (mesmo que primaryText)
  lightText: string;     // Texto em gradiente (sempre branco)
  progressBar: string;   // Mesmo que progress
  highlight: string;     // Fundo de destaque
  iconBg: string;        // Alias para bgLight (compatibilidade)
  softBg: string;        // Alias para bgLight (compatibilidade)
}

export const APP_THEMES: Record<ThemeType, ThemeStyles> = {
  // 1. Paleta "Concentração Profunda" - Azul petróleo (#0F2A44, #1F4E79)
  deepFocus: {
    name: "Concentração Profunda",
    description: "Sessões longas, leitura técnica e programação.",
    scientificEffect: "Estabilidade emocional e foco por longos períodos",
    gradient: "from-[#1F4E79] to-[#0F2A44] dark:from-[#1F4E79] dark:to-[#0F2A44]",
    button: "bg-[#1F4E79] hover:bg-[#0F2A44] dark:bg-[#1F4E79] dark:hover:bg-[#2A5A8F] text-white",
    primaryText: "text-[#1F4E79] dark:text-[#6B9BC3]",
    bgLight: "bg-[#E6E9ED] dark:bg-[#1F4E79]/20",
    border: "border-[#E6E9ED] dark:border-[#1F4E79]",
    ring: "ring-[#1F4E79]",
    progress: "bg-[#1F4E79] dark:bg-[#6B9BC3]",
    iconColor: "text-[#1F4E79] dark:text-[#6B9BC3]",
    lightText: "text-white",
    progressBar: "bg-[#1F4E79] dark:bg-[#6B9BC3]",
    highlight: "bg-[#E6E9ED] text-[#0F2A44] dark:bg-[#1F4E79]/20 dark:text-[#6B9BC3]",
    iconBg: "bg-[#E6E9ED] dark:bg-[#1F4E79]/20",
    softBg: "bg-[#F7F9FB] dark:bg-[#0F2A44]/30"
  },

  // 2. Paleta "Calma Cognitiva" - Verde musgo (#3A5F4B, #A8C3B1)
  calmStudy: {
    name: "Calma Cognitiva",
    description: "Leitura, resumos e estudo teórico.",
    scientificEffect: "Segurança mental e retenção de informação",
    gradient: "from-[#3A5F4B] to-[#6E6259] dark:from-[#3A5F4B] dark:to-[#2A4736]",
    button: "bg-[#3A5F4B] hover:bg-[#2F4D3C] dark:bg-[#3A5F4B] dark:hover:bg-[#4A7F5F] text-white",
    primaryText: "text-[#3A5F4B] dark:text-[#A8C3B1]",
    bgLight: "bg-[#F2EFEA] dark:bg-[#3A5F4B]/20",
    border: "border-[#A8C3B1] dark:border-[#3A5F4B]",
    ring: "ring-[#3A5F4B]",
    progress: "bg-[#3A5F4B] dark:bg-[#A8C3B1]",
    iconColor: "text-[#3A5F4B] dark:text-[#A8C3B1]",
    lightText: "text-white",
    progressBar: "bg-[#3A5F4B] dark:bg-[#A8C3B1]",
    highlight: "bg-[#F2EFEA] text-[#3A5F4B] dark:bg-[#3A5F4B]/20 dark:text-[#A8C3B1]",
    iconBg: "bg-[#F2EFEA] dark:bg-[#3A5F4B]/20",
    softBg: "bg-[#F2EFEA] dark:bg-[#2A4736]/30"
  },

  // 3. Paleta "Alta Atenção" - Azul escuro + Amarelo (#1C2331, #F2C94C)
  highAlert: {
    name: "Alta Atenção",
    description: "Questões, simulados e tarefas exigentes.",
    scientificEffect: "Aumento da vigilância sem estresse excessivo",
    gradient: "from-[#1C2331] to-[#27AE60] dark:from-[#1C2331] dark:to-[#0F1419]",
    button: "bg-[#27AE60] hover:bg-[#1F8A4D] dark:bg-[#27AE60] dark:hover:bg-[#34C772] text-white",
    primaryText: "text-[#1C2331] dark:text-[#F2C94C]",
    bgLight: "bg-[#F5F7FA] dark:bg-[#1C2331]/40",
    border: "border-[#9AA0A6] dark:border-[#27AE60]",
    ring: "ring-[#27AE60]",
    progress: "bg-[#27AE60] dark:bg-[#F2C94C]",
    iconColor: "text-[#27AE60] dark:text-[#F2C94C]",
    lightText: "text-white",
    progressBar: "bg-[#27AE60] dark:bg-[#F2C94C]",
    highlight: "bg-[#F2C94C]/20 text-[#1C2331] dark:bg-[#F2C94C]/20 dark:text-[#F2C94C]",
    iconBg: "bg-[#F5F7FA] dark:bg-[#27AE60]/20",
    softBg: "bg-[#F5F7FA] dark:bg-[#1C2331]/30"
  },

  // 4. Paleta "Minimalismo Neutro" - Cinza grafite (#2E2E2E, #5F6368)
  minimalNeutral: {
    name: "Minimalismo Neutro",
    description: "Zero distrações. Para quem se distrai fácil.",
    scientificEffect: "Redução de estímulos visuais e clareza cognitiva",
    gradient: "from-[#5F6368] to-[#2E2E2E] dark:from-[#5F6368] dark:to-[#1A1A1A]",
    button: "bg-[#5F6368] hover:bg-[#2E2E2E] dark:bg-[#5F6368] dark:hover:bg-[#7A7F85] text-white",
    primaryText: "text-[#2E2E2E] dark:text-[#DADCE0]",
    bgLight: "bg-[#FAFAFA] dark:bg-[#2E2E2E]/40",
    border: "border-[#DADCE0] dark:border-[#5F6368]",
    ring: "ring-[#5F6368]",
    progress: "bg-[#5F6368] dark:bg-[#3367D6]",
    iconColor: "text-[#5F6368] dark:text-[#DADCE0]",
    lightText: "text-white",
    progressBar: "bg-[#5F6368] dark:bg-[#3367D6]",
    highlight: "bg-[#DADCE0] text-[#2E2E2E] dark:bg-[#5F6368]/20 dark:text-[#DADCE0]",
    iconBg: "bg-[#FAFAFA] dark:bg-[#2E2E2E]/40",
    softBg: "bg-[#FAFAFA] dark:bg-[#2E2E2E]/30"
  },

  // 5. Paleta "Noturna / Dark Mode" - Preto azulado (#0D1117, #58A6FF)
  nightMode: {
    name: "Modo Noturno",
    description: "Reduz fadiga ocular. Ideal para noite.",
    scientificEffect: "Menor esforço visual e foco em baixa luz",
    gradient: "from-[#161B22] to-[#0D1117] dark:from-[#161B22] dark:to-[#0D1117]",
    button: "bg-[#58A6FF] hover:bg-[#3F8FE0] dark:bg-[#58A6FF] dark:hover:bg-[#79BBFF] text-white",
    primaryText: "text-[#161B22] dark:text-[#58A6FF]",
    bgLight: "bg-[#C9D1D9]/20 dark:bg-[#161B22]",
    border: "border-[#C9D1D9]/30 dark:border-[#58A6FF]/30",
    ring: "ring-[#58A6FF]",
    progress: "bg-[#58A6FF] dark:bg-[#3FB950]",
    iconColor: "text-[#58A6FF] dark:text-[#58A6FF]",
    lightText: "text-white",
    progressBar: "bg-[#58A6FF] dark:bg-[#3FB950]",
    highlight: "bg-[#C9D1D9]/20 text-[#0D1117] dark:bg-[#58A6FF]/20 dark:text-[#58A6FF]",
    iconBg: "bg-[#C9D1D9]/20 dark:bg-[#161B22]",
    softBg: "bg-[#C9D1D9]/10 dark:bg-[#0D1117]/50"
  }
};
