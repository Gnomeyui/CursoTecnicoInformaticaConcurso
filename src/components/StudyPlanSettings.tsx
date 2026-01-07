import React, { useState } from 'react';
import { ArrowLeft, Clock, Zap, Bell, Volume2, Smartphone, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { useCustomization } from '../context/CustomizationContext';

interface StudyPlanSettingsProps {
  onBack: () => void;
}

export function StudyPlanSettings({ onBack }: StudyPlanSettingsProps) {
  const { settings } = useCustomization();
  
  // 🎨 MAPA DE ESTILOS SEGURO - Garante que as cores dinâmicas funcionem
  const styles = {
    blue:   { text: 'text-blue-600',   btn: 'bg-blue-600 hover:bg-blue-700' },
    green:  { text: 'text-green-600',  btn: 'bg-green-600 hover:bg-green-700' },
    purple: { text: 'text-purple-600', btn: 'bg-purple-600 hover:bg-purple-700' },
    orange: { text: 'text-orange-600', btn: 'bg-orange-600 hover:bg-orange-700' },
    default: { text: 'text-blue-600',   btn: 'bg-blue-600 hover:bg-blue-700' }
  }[settings.colorTheme] || { text: 'text-blue-600', btn: 'bg-blue-600 hover:bg-blue-700' };

  // Estados
  const [questionsPerBatch, setQuestionsPerBatch] = useState([10]);
  const [intervalMinutes, setIntervalMinutes] = useState([30]);
  const [timeRange, setTimeRange] = useState({ start: '08:00', end: '18:00' });
  const [alerts, setAlerts] = useState({ sound: true, vibration: true });

  const handleSave = () => {
    // Salvar no localStorage
    const planData = {
      questionsPerBatch: questionsPerBatch[0],
      intervalMinutes: intervalMinutes[0],
      timeRange,
      alerts
    };
    
    localStorage.setItem('gabaritoo_study_plan', JSON.stringify(planData));
    
    alert("✅ Plano salvo com sucesso! Você receberá notificações neste horário.");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 animate-in slide-in-from-right transition-colors duration-300">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-gray-900 p-4 sticky top-0 z-10 shadow-sm flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Plano de Estudos</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Personalize o seu ritmo</p>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-xl mx-auto">

        {/* 1. QUANTIDADE DE QUESTÕES */}
        <section>
          <div className={`flex items-center gap-2 mb-3 ${styles.text}`}>
            <Zap size={20} />
            <h2 className="font-bold text-gray-800 dark:text-gray-200">Ritmo de Estudo</h2>
          </div>
          
          <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 dark:border dark:border-gray-800">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Questões por rodada</span>
                  <span className={`text-xl font-bold ${styles.text}`}>{questionsPerBatch[0]}</span>
                </div>
                <Slider 
                  value={questionsPerBatch} 
                  onValueChange={setQuestionsPerBatch} 
                  max={50} 
                  min={5} 
                  step={5} 
                  className="py-2"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Você receberá {questionsPerBatch[0]} questões para resolver de cada vez.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. INTERVALO DE TEMPO */}
        <section>
          <div className={`flex items-center gap-2 mb-3 ${styles.text}`}>
            <Clock size={20} />
            <h2 className="font-bold text-gray-800 dark:text-gray-200">Intervalos</h2>
          </div>

          <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 dark:border dark:border-gray-800">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">A cada quanto tempo?</span>
                  <span className={`text-xl font-bold ${styles.text}`}>{intervalMinutes[0]} min</span>
                </div>
                <Slider 
                  value={intervalMinutes} 
                  onValueChange={setIntervalMinutes} 
                  max={120} 
                  min={10} 
                  step={10} 
                  className="py-2"
                />
                <p className="text-xs text-gray-400 mt-2">
                  O app lembrará você de estudar a cada {intervalMinutes[0]} minutos.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. HORÁRIO E NOTIFICAÇÕES */}
        <section>
          <div className={`flex items-center gap-2 mb-3 ${styles.text}`}>
            <Bell size={20} />
            <h2 className="font-bold text-gray-800 dark:text-gray-200">Horário Ativo</h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 mb-1 block uppercase">Início</label>
                <div className="relative">
                  <Sun className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    type="time" 
                    value={timeRange.start}
                    onChange={(e) => setTimeRange({...timeRange, start: e.target.value})}
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 mb-1 block uppercase">Fim</label>
                <div className="relative">
                  <Moon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    type="time" 
                    value={timeRange.end}
                    onChange={(e) => setTimeRange({...timeRange, end: e.target.value})}
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>

            {/* Sons e Vibração */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full text-yellow-600 dark:text-yellow-400">
                    <Volume2 size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Som de Notificação</span>
                </div>
                <Switch 
                  checked={alerts.sound}
                  onCheckedChange={(v) => setAlerts({...alerts, sound: v})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
                    <Smartphone size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vibração</span>
                </div>
                <Switch 
                  checked={alerts.vibration}
                  onCheckedChange={(v) => setAlerts({...alerts, vibration: v})}
                />
              </div>
            </div>

          </div>
        </section>

        {/* Botão Salvar com Cores Dinâmicas Seguras */}
        <div className="pt-4">
          <Button 
            className={`w-full py-6 text-lg font-bold shadow-lg text-white rounded-xl ${styles.btn}`}
            onClick={handleSave}
          >
            Salvar Plano de Estudos
          </Button>
        </div>

      </div>
    </div>
  );
}