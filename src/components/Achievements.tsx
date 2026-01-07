import React from 'react';
import { Trophy, Medal, Star, Target, Zap, Lock, ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';

interface AchievementsProps {
  onBack?: () => void;
}

export function Achievements({ onBack }: AchievementsProps = {}) {
  const { settings } = useCustomization();
  const theme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;

  // Dados Mockados para Demo
  const topUsers = [
    { name: "Ana Silva", xp: 2450, avatar: "A", color: "bg-yellow-500" },
    { name: "Você", xp: 1890, avatar: "V", color: `bg-gradient-to-r ${theme.gradient}` },
    { name: "João B.", xp: 1750, avatar: "J", color: "bg-orange-400" },
  ];

  const achievements = [
    { title: "Mestre do Foco", desc: "Estude 5 dias seguidos", icon: Zap, done: true },
    { title: "Primeiros 100", desc: "Acerte 100 questões", icon: Target, done: true },
    { title: "Imparável", desc: "Acerte 50 sem errar", icon: Trophy, done: false },
    { title: "Dedicação Total", desc: "Complete 10 simulados", icon: Medal, done: false },
    { title: "Estrela Cadente", desc: "Alcance 5000 XP", icon: Star, done: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 animate-in fade-in">
      
      {/* Header com Gradiente */}
      <div className={`relative overflow-hidden pb-12 pt-8 px-6 bg-gradient-to-br ${theme.gradient} rounded-b-[2.5rem] shadow-xl`}>
        {/* Botão Voltar */}
        <button 
          onClick={() => onBack ? onBack() : window.history.back()}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>
        
        <div className="relative z-10 text-white text-center">
          <h1 className="text-3xl font-black mb-1">Ranking Semanal</h1>
          <p className="text-white/80 text-sm font-medium">Você está no top 5%!</p>
        </div>
        {/* Decoração de fundo */}
        <Trophy className="absolute -bottom-6 -right-6 text-white/10 rotate-12" size={140} />
      </div>

      <div className="px-6 -mt-8 space-y-8 relative z-20">

        {/* 1. O PÓDIO (Cartão Principal) */}
        <Card className="border-none shadow-lg bg-white dark:bg-gray-800 backdrop-blur rounded-[2rem] p-6">
          <div className="flex items-end justify-center gap-4">
            {/* 2º Lugar */}
            <div className="flex flex-col items-center gap-2">
               <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 shadow">
                 {topUsers[2].avatar}
               </div>
               <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-t-xl flex items-center justify-center border-t-4 border-slate-300 dark:border-slate-600">
                 <span className="font-bold text-slate-400 text-xl">3</span>
               </div>
            </div>

            {/* 1º Lugar */}
            <div className="flex flex-col items-center gap-2">
               <div className="relative">
                 <Trophy className="text-yellow-500 absolute -top-6 left-1/2 -translate-x-1/2 drop-shadow-sm" size={24} fill="currentColor" />
                 <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/50 border-4 border-yellow-400 flex items-center justify-center font-bold text-yellow-700 dark:text-yellow-300 shadow-md">
                   {topUsers[0].avatar}
                 </div>
               </div>
               <div className="h-24 w-20 bg-yellow-50 dark:bg-yellow-900/30 rounded-t-2xl flex items-center justify-center border-t-4 border-yellow-400 shadow-yellow-100/50 shadow-inner">
                 <span className="font-black text-yellow-500 dark:text-yellow-400 text-3xl">1</span>
               </div>
            </div>

            {/* 3º Lugar */}
             <div className="flex flex-col items-center gap-2">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow bg-gradient-to-r ${theme.gradient}`}>
                 {topUsers[1].avatar}
               </div>
               <div className="h-20 w-16 bg-slate-50 dark:bg-slate-800 rounded-t-xl flex items-center justify-center border-t-4 border-slate-200 dark:border-slate-600">
                 <span className="font-bold text-slate-400 text-xl">2</span>
               </div>
            </div>
          </div>
          
          <div className="text-center mt-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
             <p className="text-sm font-bold text-gray-900 dark:text-white">
               Sua Pontuação: <span className={theme.text}>1890 XP</span>
             </p>
          </div>
        </Card>

        {/* 2. CONQUISTAS (Lista de Badges) */}
        <section>
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white px-2">Suas Conquistas</h3>
          <div className="space-y-3">
            {achievements.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  item.done 
                    ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                    : 'bg-gray-100 dark:bg-gray-800/50 border-transparent opacity-60'
                }`}
              >
                <div className={`p-3 rounded-xl ${item.done ? theme.bg : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {item.done ? (
                    <item.icon size={24} className={theme.text} />
                  ) : (
                    <Lock size={24} className="text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}