// src/lib/themeConfig.ts

export type ThemeType = 'focus' | 'calm' | 'creative' | 'energy' | 'comfort' | 'minimal' | 'ocean' | 'warmth';

interface ThemeStyles {
  name: string;
  description: string;
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
}

export const APP_THEMES: Record<ThemeType, ThemeStyles> = {
  focus: {
    name: "Azul Foco",
    description: "Ideal para concentração profunda e lógica.",
    gradient: "from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-950",
    button: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white",
    primaryText: "text-blue-700 dark:text-blue-300",
    bgLight: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-800/30",
    ring: "ring-blue-500",
    progress: "bg-blue-600 dark:bg-blue-500",
    iconColor: "text-blue-700 dark:text-blue-300",
    lightText: "text-white",
    progressBar: "bg-blue-600 dark:bg-blue-500",
    highlight: "bg-blue-50 dark:bg-blue-500/10"
  },
  calm: {
    name: "Verde Sálvia",
    description: "Reduz a ansiedade. Ótimo para revisões.",
    gradient: "from-emerald-500 to-teal-600 dark:from-emerald-900 dark:to-teal-950",
    button: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white",
    primaryText: "text-emerald-700 dark:text-emerald-300",
    bgLight: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-800/30",
    ring: "ring-emerald-500",
    progress: "bg-emerald-600 dark:bg-emerald-500",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    lightText: "text-white",
    progressBar: "bg-emerald-600 dark:bg-emerald-500",
    highlight: "bg-emerald-50 dark:bg-emerald-500/10"
  },
  creative: {
    name: "Roxo Místico",
    description: "Estimula a imaginação e imersão.",
    gradient: "from-violet-600 to-fuchsia-600 dark:from-violet-900 dark:to-fuchsia-950",
    button: "bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 text-white",
    primaryText: "text-violet-700 dark:text-violet-300",
    bgLight: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-800/30",
    ring: "ring-violet-500",
    progress: "bg-violet-600 dark:bg-violet-500",
    iconColor: "text-violet-700 dark:text-violet-300",
    lightText: "text-white",
    progressBar: "bg-violet-600 dark:bg-violet-500",
    highlight: "bg-violet-50 dark:bg-violet-500/10"
  },
  energy: {
    name: "Laranja Energia",
    description: "Para quando estás com sono. Desperta.",
    gradient: "from-orange-500 to-red-500 dark:from-orange-900 dark:to-red-950",
    button: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 text-white",
    primaryText: "text-orange-700 dark:text-orange-300",
    bgLight: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-800/30",
    ring: "ring-orange-500",
    progress: "bg-orange-600 dark:bg-orange-500",
    iconColor: "text-orange-700 dark:text-orange-300",
    lightText: "text-white",
    progressBar: "bg-orange-600 dark:bg-orange-500",
    highlight: "bg-orange-50 dark:bg-orange-500/10"
  },
  comfort: {
    name: "Rosa Suave",
    description: "Confortável e acolhedor para longas sessões.",
    gradient: "from-pink-500 to-rose-500 dark:from-pink-900 dark:to-rose-950",
    button: "bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600 text-white",
    primaryText: "text-pink-700 dark:text-pink-300",
    bgLight: "bg-pink-50 dark:bg-pink-500/10",
    border: "border-pink-200 dark:border-pink-800/30",
    ring: "ring-pink-500",
    progress: "bg-pink-600 dark:bg-pink-500",
    iconColor: "text-pink-700 dark:text-pink-300",
    lightText: "text-white",
    progressBar: "bg-pink-600 dark:bg-pink-500",
    highlight: "bg-pink-50 dark:bg-pink-500/10"
  },
  minimal: {
    name: "Cinza Grafite",
    description: "Sem distrações. Foco total no conteúdo.",
    gradient: "from-slate-600 to-slate-800 dark:from-slate-800 dark:to-black",
    button: "bg-slate-700 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white",
    primaryText: "text-slate-700 dark:text-slate-300",
    bgLight: "bg-slate-100 dark:bg-slate-800",
    border: "border-slate-200 dark:border-slate-700",
    ring: "ring-slate-500",
    progress: "bg-slate-700 dark:bg-slate-500",
    iconColor: "text-slate-700 dark:text-slate-300",
    lightText: "text-white",
    progressBar: "bg-slate-700 dark:bg-slate-500",
    highlight: "bg-slate-100 dark:bg-slate-800"
  },
  ocean: {
    name: "Ciano Oceano",
    description: "Fresco e claro. Ótimo para leitura.",
    gradient: "from-cyan-500 to-blue-500 dark:from-cyan-900 dark:to-blue-950",
    button: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white",
    primaryText: "text-cyan-700 dark:text-cyan-300",
    bgLight: "bg-cyan-50 dark:bg-cyan-500/10",
    border: "border-cyan-200 dark:border-cyan-800/30",
    ring: "ring-cyan-500",
    progress: "bg-cyan-600 dark:bg-cyan-500",
    iconColor: "text-cyan-700 dark:text-cyan-300",
    lightText: "text-white",
    progressBar: "bg-cyan-600 dark:bg-cyan-500",
    highlight: "bg-cyan-50 dark:bg-cyan-500/10"
  },
  warmth: {
    name: "Âmbar Dourado",
    description: "Sensação de progresso e conquista.",
    gradient: "from-amber-500 to-orange-500 dark:from-amber-900 dark:to-orange-950",
    button: "bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white",
    primaryText: "text-amber-800 dark:text-amber-300",
    bgLight: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-800/30",
    ring: "ring-amber-500",
    progress: "bg-amber-500 dark:bg-amber-600",
    iconColor: "text-amber-800 dark:text-amber-300",
    lightText: "text-white",
    progressBar: "bg-amber-500 dark:bg-amber-600",
    highlight: "bg-amber-50 dark:bg-amber-500/10"
  }
};