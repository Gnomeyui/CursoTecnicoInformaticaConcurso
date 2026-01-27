import React, { useState } from 'react';
import { Button } from '../ui/button';
import { BookOpen, Brain, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { COPY } from '../../utils/copy';
import { GabaritooLogo } from '../GabaritooLogo';

interface OnboardingPageProps {
  onComplete: () => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'promise',
      title: COPY.onboarding.slide1.title,
      subtitle: COPY.onboarding.slide1.text,
      description: '',
      icon: <GabaritooLogo size="lg" />,
      bgGradient: 'from-indigo-500 to-purple-600',
      buttonText: COPY.onboarding.slide1.button
    },
    {
      id: 'method',
      title: COPY.onboarding.slide2.title,
      subtitle: '',
      steps: [
        { 
          icon: <BookOpen className="w-10 h-10" />, 
          text: COPY.onboarding.slide2.steps[0].title, 
          description: COPY.onboarding.slide2.steps[0].text, 
          color: 'text-blue-600' 
        },
        { 
          icon: <Brain className="w-10 h-10" />, 
          text: COPY.onboarding.slide2.steps[1].title, 
          description: COPY.onboarding.slide2.steps[1].text, 
          color: 'text-purple-600' 
        },
        { 
          icon: <TrendingUp className="w-10 h-10" />, 
          text: COPY.onboarding.slide2.steps[2].title, 
          description: COPY.onboarding.slide2.steps[2].text, 
          color: 'text-green-600' 
        }
      ],
      bgGradient: 'from-blue-500 to-cyan-600',
      buttonText: COPY.onboarding.slide2.button
    },
    {
      id: 'control',
      title: COPY.onboarding.slide3.title,
      subtitle: COPY.onboarding.slide3.text,
      description: '',
      icon: <TrendingUp className="w-20 h-20 text-green-600" />,
      bgGradient: 'from-green-500 to-emerald-600',
      buttonText: COPY.onboarding.slide3.button
    }
  ];

  const currentSlideData = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      localStorage.setItem('hasSeenOnboarding', 'true');
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-[200] flex items-center justify-center">
      
      {/* Conteúdo Principal */}
      <div className="w-full max-w-md px-6 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
        
        {/* SLIDE 1: PROMESSA */}
        {currentSlide === 0 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              {currentSlideData.icon}
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                {currentSlideData.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                {currentSlideData.subtitle}
              </p>
              <p className="text-base text-gray-500 dark:text-gray-400">
                {currentSlideData.description}
              </p>
            </div>

            <div className="pt-8">
              <Button 
                onClick={handleNext}
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                {currentSlideData.buttonText}
              </Button>
            </div>
          </div>
        )}

        {/* SLIDE 2: MÉTODO */}
        {currentSlide === 1 && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight px-[4px] py-[0px] mt-[26px] mr-[0px] mb-[13px] ml-[0px]">
                {currentSlideData.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                {currentSlideData.subtitle}
              </p>
            </div>

            <div className="space-y-6 py-4">
              {currentSlideData.steps?.map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col gap-3 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${step.color} p-3 bg-gray-50 dark:bg-gray-700 rounded-xl`}>
                      {step.icon}
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white flex-1 text-left">
                      {step.text}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-left pl-[4.5rem]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleNext}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg font-bold py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2 justify-center">
                {currentSlideData.buttonText} <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </div>
        )}

        {/* SLIDE 3: CONTROLE */}
        {currentSlide === 2 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              {currentSlideData.icon}
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                {currentSlideData.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                {currentSlideData.subtitle}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-2xl border-2 border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-300 font-bold text-lg">
                {COPY.onboarding.slide3.commitment}
              </p>
            </div>

            <div className="pt-8 space-y-3">
              <Button 
                onClick={handleNext}
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg font-bold py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <span className="flex items-center gap-2 justify-center">
                  {currentSlideData.buttonText} <Check className="w-5 h-5" />
                </span>
              </Button>
              
              <button
                onClick={() => {
                  localStorage.setItem('hasSeenOnboarding', 'true');
                  onComplete();
                }}
                className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm py-2 transition-colors"
              >
                {COPY.onboarding.slide3.skip}
              </button>
            </div>
          </div>
        )}

        {/* Indicadores */}
        <div className="flex justify-center gap-2 pt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-indigo-600' 
                  : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}