import React from 'react';
import { Trophy, Medal, Star, Target, Zap, Lock, ArrowLeft, Award, Flame, Heart, Book, CheckCircle, TrendingUp, Crown, Rocket, Clock, Brain, Sparkles, Shield, Mountain, Flag, Users, Gift, Gauge, CalendarCheck, Lightbulb, GraduationCap, Swords, Smile, BarChart3, Coffee, Sun, Moon, Footprints, ThumbsUp, PartyPopper, Hexagon, Gem, CircleDot, Hourglass, AlarmClock, Activity, Crosshair, Anchor } from 'lucide-react';
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
    // INICIANTE (1-10)
    { title: "Primeiros Passos", desc: "Responda sua primeira questão", icon: Footprints, done: true },
    { title: "Estudante Dedicado", desc: "Responda 10 questões", icon: Book, done: true },
    { title: "Caminhando Firme", desc: "Responda 50 questões", icon: Target, done: true },
    { title: "Século Completo", desc: "Responda 100 questões", icon: CheckCircle, done: true },
    { title: "Maratonista", desc: "Responda 500 questões", icon: Activity, done: false },
    { title: "Milhar Conquistado", desc: "Responda 1000 questões", icon: Mountain, done: false },
    { title: "Lenda Viva", desc: "Responda 5000 questões", icon: Crown, done: false },
    { title: "Mestre Supremo", desc: "Responda 10000 questões", icon: Trophy, done: false },
    { title: "Deus do Conhecimento", desc: "Responda 25000 questões", icon: Sparkles, done: false },
    { title: "Inigualável", desc: "Responda 50000 questões", icon: Gem, done: false },

    // PRECISÃO (11-20)
    { title: "Pontaria Afiada", desc: "Acerte 10 questões seguidas", icon: Crosshair, done: true },
    { title: "Mira Certeira", desc: "Acerte 25 questões seguidas", icon: Award, done: false },
    { title: "Atirador de Elite", desc: "Acerte 50 questões seguidas", icon: Anchor, done: false },
    { title: "Perfeccionista", desc: "Acerte 100 questões seguidas", icon: Star, done: false },
    { title: "Precisão Cirúrgica", desc: "Mantenha 90% de acertos em 100 questões", icon: Brain, done: false },
    { title: "Acuracidade Total", desc: "Mantenha 95% de acertos em 200 questões", icon: Gauge, done: false },
    { title: "Imaculado", desc: "Complete um simulado sem erros", icon: Shield, done: false },
    { title: "Perfeição Absoluta", desc: "Complete 5 simulados sem erros", icon: Hexagon, done: false },
    { title: "100% Master", desc: "Gabarite 10 simulados diferentes", icon: Medal, done: false },
    { title: "Infalível", desc: "Acerte todas em 20 simulados", icon: Rocket, done: false },

    // STREAK & CONSISTÊNCIA (21-30)
    { title: "Compromisso", desc: "Estude 3 dias seguidos", icon: Flame, done: true },
    { title: "Mestre do Foco", desc: "Estude 7 dias seguidos", icon: Zap, done: true },
    { title: "Disciplina Inabalável", desc: "Estude 15 dias seguidos", icon: CalendarCheck, done: false },
    { title: "Guerreiro Incansável", desc: "Estude 30 dias seguidos", icon: Swords, done: false },
    { title: "Diamante Bruto", desc: "Estude 60 dias seguidos", icon: Gem, done: false },
    { title: "Lenda do Tempo", desc: "Estude 100 dias seguidos", icon: Hourglass, done: false },
    { title: "Eterno Estudante", desc: "Estude 365 dias seguidos", icon: Crown, done: false },
    { title: "Madrugador", desc: "Estude antes das 6h da manhã 10 vezes", icon: Sun, done: false },
    { title: "Coruja Noturna", desc: "Estude depois das 23h 10 vezes", icon: Moon, done: false },
    { title: "Pontualidade", desc: "Mantenha horários regulares por 14 dias", icon: AlarmClock, done: false },

    // VELOCIDADE (31-35)
    { title: "Raio Veloz", desc: "Responda 50 questões em um dia", icon: Rocket, done: false },
    { title: "Relâmpago", desc: "Responda 100 questões em um dia", icon: Zap, done: false },
    { title: "Supersônico", desc: "Responda 200 questões em um dia", icon: Gauge, done: false },
    { title: "Velocista", desc: "Complete um simulado em menos de 30 minutos", icon: Clock, done: false },
    { title: "Flash do Saber", desc: "Responda 500 questões em uma semana", icon: Activity, done: false },

    // XP & NÍVEIS (36-42)
    { title: "Aprendiz", desc: "Alcance 500 XP", icon: GraduationCap, done: true },
    { title: "Estudante", desc: "Alcance 1500 XP", icon: Book, done: true },
    { title: "Competente", desc: "Alcance 3000 XP", icon: TrendingUp, done: false },
    { title: "Especialista", desc: "Alcance 5000 XP", icon: Star, done: false },
    { title: "Mestre", desc: "Alcance 10000 XP", icon: Award, done: false },
    { title: "Grão-Mestre", desc: "Alcance 25000 XP", icon: Crown, done: false },
    { title: "Lendário", desc: "Alcance 50000 XP", icon: Trophy, done: false },

    // SIMULADOS (43-47)
    { title: "Primeira Batalha", desc: "Complete seu primeiro simulado", icon: Flag, done: true },
    { title: "Guerreiro", desc: "Complete 5 simulados", icon: Shield, done: false },
    { title: "Veterano", desc: "Complete 20 simulados", icon: Medal, done: false },
    { title: "Comandante", desc: "Complete 50 simulados", icon: Swords, done: false },
    { title: "General", desc: "Complete 100 simulados", icon: Crown, done: false },

    // ESPECIAIS (48-50)
    { title: "Presenteado", desc: "Desbloqueie um tema personalizado", icon: Gift, done: true },
    { title: "Festeiro", desc: "Estude no seu aniversário", icon: PartyPopper, done: false },
    { title: "Coração de Ouro", desc: "Complete 1000 questões com amor pelo estudo", icon: Heart, done: false },
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
        <Card className="border-none shadow-lg bg-card backdrop-blur rounded-[2rem] p-6">
          <div className="flex items-end justify-center gap-4">
            {/* 2º Lugar */}
            <div className="flex flex-col items-center gap-2">
               <div className="w-12 h-12 rounded-full bg-muted border-2 border-border flex items-center justify-center font-bold text-muted-foreground shadow">
                 {topUsers[2].avatar}
               </div>
               <div className="h-16 w-16 bg-muted rounded-t-xl flex items-center justify-center border-t-4 border-border">
                 <span className="font-bold text-muted-foreground text-xl">3</span>
               </div>
            </div>

            {/* 1º Lugar */}
            <div className="flex flex-col items-center gap-2">
               <div className="relative">
                 <Trophy className="text-yellow-500 absolute -top-6 left-1/2 -translate-x-1/2 drop-shadow-sm" size={24} fill="currentColor" />
                 <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-500/20 border-4 border-yellow-400 flex items-center justify-center font-bold text-yellow-700 dark:text-yellow-400 shadow-md">
                   {topUsers[0].avatar}
                 </div>
               </div>
               <div className="h-24 w-20 bg-yellow-50 dark:bg-yellow-500/10 rounded-t-2xl flex items-center justify-center border-t-4 border-yellow-400 shadow-yellow-100/50 shadow-inner">
                 <span className="font-black text-yellow-500 dark:text-yellow-400 text-3xl">1</span>
               </div>
            </div>

            {/* 3º Lugar */}
             <div className="flex flex-col items-center gap-2">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow bg-gradient-to-r ${theme.gradient}`}>
                 {topUsers[1].avatar}
               </div>
               <div className="h-20 w-16 bg-muted rounded-t-xl flex items-center justify-center border-t-4 border-border">
                 <span className="font-bold text-muted-foreground text-xl">2</span>
               </div>
            </div>
          </div>
          
          <div className="text-center mt-6 p-3 bg-muted rounded-xl">
             <p className="text-sm font-bold text-foreground">
               Sua Pontuação: <span className={theme.primaryText}>1890 XP</span>
             </p>
          </div>
        </Card>

        {/* 2. CONQUISTAS (Lista de Badges) */}
        <section>
          <h3 className="font-bold text-lg mb-4 text-foreground px-2">Suas Conquistas</h3>
          <div className="space-y-3">
            {achievements.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  item.done 
                    ? 'bg-card border-border shadow-sm' 
                    : 'bg-muted/50 border-transparent opacity-60'
                }`}
              >
                <div className={`p-3 rounded-xl ${item.done ? theme.bgLight : 'bg-muted'}`}>
                  {item.done ? (
                    <item.icon size={24} className={theme.primaryText} />
                  ) : (
                    <Lock size={24} className="text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}