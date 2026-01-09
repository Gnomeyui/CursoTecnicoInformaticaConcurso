import React from 'react';
import { Trophy, Medal, Star, Target, Zap, Lock, ArrowLeft, Award, Flame, Heart, Book, CheckCircle, TrendingUp, Crown, Rocket, Clock, Brain, Sparkles, Shield, Mountain, Flag, Gift, Gauge, CalendarCheck, GraduationCap, Swords, Sun, Moon, Footprints, PartyPopper, Hexagon, Gem, Hourglass, AlarmClock, Activity, Crosshair, Anchor, CircleDot, Milestone, Wind, Timer, BarChart3, Repeat, Lightbulb, Coffee, Battery } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';
import { useStats } from '../context/StatsContext';
import { useGame } from '../context/GameContext';

interface AchievementsProps {
  onBack?: () => void;
}

export function Achievements({ onBack }: AchievementsProps = {}) {
  const { settings } = useCustomization();
  const theme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;
  
  // 🎯 DADOS REAIS DO APP
  const { detailedStats } = useStats();
  const { xp, level } = useGame();
  
  const totalQuestoes = detailedStats.totalQuestionsAnswered;
  const totalAcertos = detailedStats.totalCorrectAnswers;
  const acuraciaGeral = detailedStats.overallAccuracy || 0;
  const diasEstudo = detailedStats.currentStreak;
  const maiorSequencia = detailedStats.longestStreak;
  const tempoTotal = detailedStats.totalStudyTime;
  
  // Calcular simulados do localStorage
  const simuladosData = JSON.parse(localStorage.getItem('exam_history') || '[]');
  const simuladosCompletos = simuladosData.length;
  const simuladosPerfeitos = simuladosData.filter((s: any) => s.score === 100).length;
  
  // Calcular questões hoje
  const hojeDateStr = new Date().toISOString().split('T')[0];
  const hojeStats = detailedStats.dailyStats.find(d => d.date === hojeDateStr);
  const questoesHoje = hojeStats?.questionsAnswered || 0;
  
  // Calcular maior sequência de acertos (aproximação)
  const maiorSequenciaAcertos = Math.floor(totalAcertos * 0.15); // Estimativa conservadora

  const achievements = [
    // INICIANTE (1-10) - Ícones de progresso
    { 
      title: "Primeiros Passos", 
      desc: "Responda sua primeira questão", 
      icon: Footprints, 
      done: totalQuestoes >= 1,
      progress: `${Math.min(totalQuestoes, 1)}/1`
    },
    { 
      title: "Estudante Dedicado", 
      desc: "Responda 10 questões", 
      icon: Book, 
      done: totalQuestoes >= 10,
      progress: `${Math.min(totalQuestoes, 10)}/10`
    },
    { 
      title: "Caminhando Firme", 
      desc: "Responda 50 questões", 
      icon: Target, 
      done: totalQuestoes >= 50,
      progress: `${Math.min(totalQuestoes, 50)}/50`
    },
    { 
      title: "Século Completo", 
      desc: "Responda 100 questões", 
      icon: CheckCircle, 
      done: totalQuestoes >= 100,
      progress: `${Math.min(totalQuestoes, 100)}/100`
    },
    { 
      title: "Maratonista", 
      desc: "Responda 500 questões", 
      icon: Activity, 
      done: totalQuestoes >= 500,
      progress: `${Math.min(totalQuestoes, 500)}/500`
    },
    { 
      title: "Milhar Conquistado", 
      desc: "Responda 1000 questões", 
      icon: Mountain, 
      done: totalQuestoes >= 1000,
      progress: `${Math.min(totalQuestoes, 1000)}/1000`
    },
    { 
      title: "Lenda Viva", 
      desc: "Responda 5000 questões", 
      icon: Crown, 
      done: totalQuestoes >= 5000,
      progress: `${Math.min(totalQuestoes, 5000)}/5000`
    },
    { 
      title: "Mestre Supremo", 
      desc: "Responda 10000 questões", 
      icon: Trophy, 
      done: totalQuestoes >= 10000,
      progress: `${Math.min(totalQuestoes, 10000)}/10000`
    },
    { 
      title: "Deus do Conhecimento", 
      desc: "Responda 25000 questões", 
      icon: Sparkles, 
      done: totalQuestoes >= 25000,
      progress: `${Math.min(totalQuestoes, 25000)}/25000`
    },
    { 
      title: "Inigualável", 
      desc: "Responda 50000 questões", 
      icon: Gem, 
      done: totalQuestoes >= 50000,
      progress: `${Math.min(totalQuestoes, 50000)}/50000`
    },

    // PRECISÃO (11-20) - Ícones de mira/precisão
    { 
      title: "Pontaria Afiada", 
      desc: "Acerte 10 questões seguidas", 
      icon: Crosshair, 
      done: maiorSequenciaAcertos >= 10,
      progress: `${Math.min(maiorSequenciaAcertos, 10)}/10`
    },
    { 
      title: "Mira Certeira", 
      desc: "Acerte 25 questões seguidas", 
      icon: Target, 
      done: maiorSequenciaAcertos >= 25,
      progress: `${Math.min(maiorSequenciaAcertos, 25)}/25`
    },
    { 
      title: "Atirador de Elite", 
      desc: "Acerte 50 questões seguidas", 
      icon: Anchor, 
      done: maiorSequenciaAcertos >= 50,
      progress: `${Math.min(maiorSequenciaAcertos, 50)}/50`
    },
    { 
      title: "Perfeccionista", 
      desc: "Acerte 100 questões seguidas", 
      icon: Star, 
      done: maiorSequenciaAcertos >= 100,
      progress: `${Math.min(maiorSequenciaAcertos, 100)}/100`
    },
    { 
      title: "Precisão Cirúrgica", 
      desc: "Mantenha 90% de acertos em 100 questões", 
      icon: Brain, 
      done: totalQuestoes >= 100 && acuraciaGeral >= 90,
      progress: `${acuraciaGeral.toFixed(1)}%/90%`
    },
    { 
      title: "Acuracidade Total", 
      desc: "Mantenha 95% de acertos em 200 questões", 
      icon: Gauge, 
      done: totalQuestoes >= 200 && acuraciaGeral >= 95,
      progress: `${acuraciaGeral.toFixed(1)}%/95%`
    },
    { 
      title: "Imaculado", 
      desc: "Complete um simulado sem erros", 
      icon: Shield, 
      done: simuladosPerfeitos >= 1,
      progress: `${simuladosPerfeitos}/1`
    },
    { 
      title: "Perfeição Absoluta", 
      desc: "Complete 5 simulados sem erros", 
      icon: Hexagon, 
      done: simuladosPerfeitos >= 5,
      progress: `${Math.min(simuladosPerfeitos, 5)}/5`
    },
    { 
      title: "100% Master", 
      desc: "Gabarite 10 simulados diferentes", 
      icon: Medal, 
      done: simuladosPerfeitos >= 10,
      progress: `${Math.min(simuladosPerfeitos, 10)}/10`
    },
    { 
      title: "Infalível", 
      desc: "Acerte todas em 20 simulados", 
      icon: Rocket, 
      done: simuladosPerfeitos >= 20,
      progress: `${Math.min(simuladosPerfeitos, 20)}/20`
    },

    // STREAK & CONSISTÊNCIA (21-30) - Ícones de fogo/tempo
    { 
      title: "Compromisso", 
      desc: "Estude 3 dias seguidos", 
      icon: Flame, 
      done: diasEstudo >= 3,
      progress: `${Math.min(diasEstudo, 3)}/3`
    },
    { 
      title: "Mestre do Foco", 
      desc: "Estude 7 dias seguidos", 
      icon: Zap, 
      done: diasEstudo >= 7,
      progress: `${Math.min(diasEstudo, 7)}/7`
    },
    { 
      title: "Disciplina Inabalável", 
      desc: "Estude 15 dias seguidos", 
      icon: CalendarCheck, 
      done: diasEstudo >= 15,
      progress: `${Math.min(diasEstudo, 15)}/15`
    },
    { 
      title: "Guerreiro Incansável", 
      desc: "Estude 30 dias seguidos", 
      icon: Swords, 
      done: diasEstudo >= 30,
      progress: `${Math.min(diasEstudo, 30)}/30`
    },
    { 
      title: "Diamante Bruto", 
      desc: "Estude 60 dias seguidos", 
      icon: Gem, 
      done: diasEstudo >= 60,
      progress: `${Math.min(diasEstudo, 60)}/60`
    },
    { 
      title: "Lenda do Tempo", 
      desc: "Estude 100 dias seguidos", 
      icon: Hourglass, 
      done: diasEstudo >= 100,
      progress: `${Math.min(diasEstudo, 100)}/100`
    },
    { 
      title: "Eterno Estudante", 
      desc: "Estude 365 dias seguidos", 
      icon: Crown, 
      done: diasEstudo >= 365,
      progress: `${Math.min(diasEstudo, 365)}/365`
    },
    { 
      title: "Madrugador", 
      desc: "Estude antes das 6h da manhã 10 vezes", 
      icon: Sun, 
      done: false, // Requer tracking de horário
      progress: `0/10`
    },
    { 
      title: "Coruja Noturna", 
      desc: "Estude depois das 23h 10 vezes", 
      icon: Moon, 
      done: false, // Requer tracking de horário
      progress: `0/10`
    },
    { 
      title: "Pontualidade", 
      desc: "Mantenha horários regulares por 14 dias", 
      icon: AlarmClock, 
      done: diasEstudo >= 14, // Aproximação
      progress: `${Math.min(diasEstudo, 14)}/14`
    },

    // VELOCIDADE (31-35) - Ícones de velocidade
    { 
      title: "Raio Veloz", 
      desc: "Responda 50 questões em um dia", 
      icon: Wind, 
      done: questoesHoje >= 50,
      progress: `${Math.min(questoesHoje, 50)}/50`
    },
    { 
      title: "Relâmpago", 
      desc: "Responda 100 questões em um dia", 
      icon: Zap, 
      done: questoesHoje >= 100,
      progress: `${Math.min(questoesHoje, 100)}/100`
    },
    { 
      title: "Supersônico", 
      desc: "Responda 200 questões em um dia", 
      icon: Rocket, 
      done: questoesHoje >= 200,
      progress: `${Math.min(questoesHoje, 200)}/200`
    },
    { 
      title: "Velocista", 
      desc: "Complete um simulado em menos de 30 minutos", 
      icon: Timer, 
      done: false, // Requer tracking de tempo de simulado
      progress: `0/1`
    },
    { 
      title: "Flash do Saber", 
      desc: "Responda 500 questões em uma semana", 
      icon: Activity, 
      done: false, // Requer cálculo semanal
      progress: `0/500`
    },

    // XP & NÍVEIS (36-42) - Ícones de progressão
    { 
      title: "Aprendiz", 
      desc: "Alcance 500 XP", 
      icon: GraduationCap, 
      done: xp >= 500,
      progress: `${Math.min(xp, 500)}/500`
    },
    { 
      title: "Estudante", 
      desc: "Alcance 1500 XP", 
      icon: Book, 
      done: xp >= 1500,
      progress: `${Math.min(xp, 1500)}/1500`
    },
    { 
      title: "Competente", 
      desc: "Alcance 3000 XP", 
      icon: TrendingUp, 
      done: xp >= 3000,
      progress: `${Math.min(xp, 3000)}/3000`
    },
    { 
      title: "Especialista", 
      desc: "Alcance 5000 XP", 
      icon: Star, 
      done: xp >= 5000,
      progress: `${Math.min(xp, 5000)}/5000`
    },
    { 
      title: "Mestre", 
      desc: "Alcance 10000 XP", 
      icon: Award, 
      done: xp >= 10000,
      progress: `${Math.min(xp, 10000)}/10000`
    },
    { 
      title: "Grão-Mestre", 
      desc: "Alcance 25000 XP", 
      icon: Crown, 
      done: xp >= 25000,
      progress: `${Math.min(xp, 25000)}/25000`
    },
    { 
      title: "Lendário", 
      desc: "Alcance 50000 XP", 
      icon: Trophy, 
      done: xp >= 50000,
      progress: `${Math.min(xp, 50000)}/50000`
    },

    // SIMULADOS (43-47) - Ícones de batalha
    { 
      title: "Primeira Batalha", 
      desc: "Complete seu primeiro simulado", 
      icon: Flag, 
      done: simuladosCompletos >= 1,
      progress: `${Math.min(simuladosCompletos, 1)}/1`
    },
    { 
      title: "Guerreiro", 
      desc: "Complete 5 simulados", 
      icon: Shield, 
      done: simuladosCompletos >= 5,
      progress: `${Math.min(simuladosCompletos, 5)}/5`
    },
    { 
      title: "Veterano", 
      desc: "Complete 20 simulados", 
      icon: Medal, 
      done: simuladosCompletos >= 20,
      progress: `${Math.min(simuladosCompletos, 20)}/20`
    },
    { 
      title: "Comandante", 
      desc: "Complete 50 simulados", 
      icon: Swords, 
      done: simuladosCompletos >= 50,
      progress: `${Math.min(simuladosCompletos, 50)}/50`
    },
    { 
      title: "General", 
      desc: "Complete 100 simulados", 
      icon: Crown, 
      done: simuladosCompletos >= 100,
      progress: `${Math.min(simuladosCompletos, 100)}/100`
    },

    // ESPECIAIS (48-50) - Ícones únicos
    { 
      title: "Presenteado", 
      desc: "Desbloqueie um tema personalizado", 
      icon: Gift, 
      done: settings.colorTheme !== 'focus', // Mudou o tema padrão
      progress: settings.colorTheme !== 'focus' ? '1/1' : '0/1'
    },
    { 
      title: "Festeiro", 
      desc: "Estude no seu aniversário", 
      icon: PartyPopper, 
      done: false, // Requer data de aniversário
      progress: `0/1`
    },
    { 
      title: "Coração de Ouro", 
      desc: "Complete 1000 questões com amor pelo estudo", 
      icon: Heart, 
      done: totalQuestoes >= 1000,
      progress: `${Math.min(totalQuestoes, 1000)}/1000`
    },
  ];

  // Calcular estatísticas
  const conquistasDesbloqueadas = achievements.filter(a => a.done).length;
  const porcentagemCompleta = Math.round((conquistasDesbloqueadas / achievements.length) * 100);

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
          <h1 className="text-3xl font-black mb-1">Conquistas</h1>
          <p className="text-white/80 text-sm font-medium">Desbloqueie todas as 50 medalhas!</p>
        </div>
        {/* Decoração de fundo */}
        <Trophy className="absolute -bottom-6 -right-6 text-white/10 rotate-12" size={140} />
      </div>

      <div className="px-6 -mt-8 space-y-8 relative z-20">

        {/* Card de Progresso Geral */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-black text-foreground">{conquistasDesbloqueadas}/50</h3>
              <p className="text-sm text-muted-foreground">Conquistas Desbloqueadas</p>
            </div>
            <div className={`text-4xl font-black ${theme.primaryText}`}>
              {porcentagemCompleta}%
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-500 rounded-full`}
              style={{ width: `${porcentagemCompleta}%` }}
            />
          </div>
          
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{totalQuestoes}</div>
              <div className="text-xs text-muted-foreground">Questões</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{diasEstudo}</div>
              <div className="text-xs text-muted-foreground">Dias Seguidos</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{xp}</div>
              <div className="text-xs text-muted-foreground">XP Total</div>
            </div>
          </div>
        </div>

        {/* CONQUISTAS (Lista de Badges) */}
        <section>
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
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg ${
                  item.done 
                    ? `${theme.bgLight} ${theme.primaryText}` 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {item.progress}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}