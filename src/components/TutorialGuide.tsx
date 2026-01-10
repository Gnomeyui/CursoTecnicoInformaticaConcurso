import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Check, X, MapPin } from 'lucide-react';

interface TutorialGuideProps {
  onComplete: () => void;
  setTab: (tab: 'dashboard' | 'statistics' | 'achievements' | 'simulatedExam' | 'studyPlan') => void;
}

export const TutorialGuide: React.FC<TutorialGuideProps> = ({ onComplete, setTab }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenTutorial_v3');
    if (!hasSeen) {
      setIsVisible(true);
      setTab('dashboard');
    }
  }, [setTab]);

  const handleFinish = () => {
    localStorage.setItem('hasSeenTutorial_v3', 'true');
    setIsVisible(false);
    setTab('dashboard');
    onComplete();
  };

  const steps = [
    {
      targetTab: 'dashboard' as const,
      title: "🏠 Visão Geral",
      text: "Este é o seu Painel. Acompanhe seu Nível, XP e Ofensiva aqui no topo.",
      position: "bottom",
      highlight: "top"
    },
    {
      targetTab: 'studyPlan' as const,
      title: "🎯 Plano de Estudos",
      text: "Configure sua meta diária, intervalo de estudo e quantas questões resolver por rodada.",
      position: "top",
      highlight: "center"
    },
    {
      targetTab: 'simulatedExam' as const,
      title: "⏱️ Hora da Prova",
      text: "Simulados completos com cronômetro real. Ideal para testar seus conhecimentos a fundo.",
      position: "top",
      highlight: "center"
    },
    {
      targetTab: 'statistics' as const,
      title: "📊 Estatísticas",
      text: "Veja gráficos detalhados do seu desempenho e descubra onde precisa melhorar.",
      position: "top",
      highlight: "center"
    },
    {
      targetTab: 'achievements' as const,
      title: "🏆 Conquistas",
      text: "Ganhe XP, suba de nível e desbloqueie badges especiais conforme você estuda!",
      position: "top",
      highlight: "center"
    },
    {
      targetTab: 'dashboard' as const,
      title: "🔔 Mantenha a Ofensiva",
      text: "Configure lembretes de estudo nas Configurações para não perder dias seguidos estudando!",
      position: "bottom",
      highlight: "top-right"
    }
  ];

  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
      // Pequeno delay para transição suave
      setTimeout(() => {
        setTab(steps[nextStep].targetTab);
      }, 150);
    } else {
      handleFinish();
    }
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    // CAMADA 1: Container Invisível mas que bloqueia cliques errados (vidro transparente)
    <div className="fixed inset-0 z-[100] flex flex-col">
      
      {/* Área flexível para posicionar o cartão (Cima, Meio, Baixo) */}
      <div className={`flex-1 flex flex-col p-4 transition-all duration-500 ${
        step.position === 'top' ? 'justify-start mt-16' : 
        step.position === 'center' ? 'justify-center' : 
        'justify-end mb-20'
      }`}>
        
        {/* O CARTÃO DO TUTORIAL */}
        <Card className="w-full max-w-sm mx-auto border-2 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.25)] dark:shadow-[0_0_50px_rgba(99,102,241,0.4)] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md animate-in zoom-in-95 duration-300">
          
          {/* Botão Pular discreto */}
          <button 
            onClick={handleFinish}
            className="absolute right-2 top-2 p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors z-10"
            title="Pular Tutorial"
          >
            <X size={18} />
          </button>

          <CardContent className="pt-6 pb-2 text-center relative">
            {/* Ícone decorativo flutuando */}
            <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400 animate-bounce">
              <MapPin size={24} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {step.text}
            </p>
            
            {/* Badge de progresso */}
            <div className="mt-3">
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                {currentStep + 1} de {steps.length}
              </span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center px-6 pb-6 pt-2">
            {/* Indicador de passos (Bolinhas) */}
            <div className="flex gap-1.5">
              {steps.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <Button 
              onClick={handleNext} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-transform active:scale-95"
            >
              {currentStep === steps.length - 1 ? (
                <span className="flex items-center gap-2">Vamos lá! <Check size={16}/></span>
              ) : (
                <span className="flex items-center gap-2">Próximo <ArrowRight size={16}/></span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* CAMADA DE DESTAQUE
          Cria uma borda piscante ao redor da tela inteira para indicar que é um tutorial 
      */}
      <div className="absolute inset-0 border-4 border-indigo-500/30 dark:border-indigo-400/40 pointer-events-none animate-pulse" />
    </div>
  );
};
