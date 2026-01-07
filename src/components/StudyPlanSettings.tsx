import React, { useState } from 'react';
import { ArrowLeft, Clock, Zap, Bell, Volume2, Smartphone, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';

interface StudyPlanSettingsProps {
  onBack: () => void;
}

export function StudyPlanSettings({ onBack }: StudyPlanSettingsProps) {
  const { settings } = useCustomization();
  const activeTheme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;
  
  // Estados
  const [questionsPerBatch, setQuestionsPerBatch] = useState([10]);
  const [intervalMinutes, setIntervalMinutes] = useState([30]);
  const [timeRange, setTimeRange] = useState({ start: '08:00', end: '18:00' });
  const [alerts, setAlerts] = useState({ sound: true, vibration: true });

  return (
    <div className="min-h-screen bg-background pb-20 animate-in slide-in-from-right transition-colors duration-300">
      
      {/* HEADER */}
      <div className="bg-background/80 backdrop-blur-md p-4 sticky top-0 z-10 border-b border-border flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-muted">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Plano de Estudos</h1>
          <p className="text-xs text-muted-foreground">Personalize o seu ritmo</p>
        </div>
      </div>

      <div className="p-6 space-y-8 max-w-xl mx-auto">

        {/* 1. RITMO */}
        <section>
          <div className={`flex items-center gap-2 mb-4 ${activeTheme.text}`}>
            <Zap size={20} />
            <h2 className="font-bold text-foreground">Ritmo de Estudo</h2>
          </div>
          
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">Questões por rodada</span>
                  <span className={`text-xl font-bold ${activeTheme.text}`}>{questionsPerBatch}</span>
                </div>
                <Slider 
                  value={questionsPerBatch} 
                  onValueChange={setQuestionsPerBatch} 
                  max={50} 
                  min={5} 
                  step={5} 
                  className="py-2 cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Você receberá {questionsPerBatch} questões para resolver de cada vez.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. INTERVALO */}
        <section>
          <div className={`flex items-center gap-2 mb-4 ${activeTheme.text}`}>
            <Clock size={20} />
            <h2 className="font-bold text-foreground">Intervalos</h2>
          </div>

          <Card className="border-border bg-card shadow-sm">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">A cada quanto tempo?</span>
                  <span className={`text-xl font-bold ${activeTheme.text}`}>{intervalMinutes} min</span>
                </div>
                <Slider 
                  value={intervalMinutes} 
                  onValueChange={setIntervalMinutes} 
                  max={120} 
                  min={10} 
                  step={10} 
                  className="py-2 cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  O app lembrará você de estudar a cada {intervalMinutes} minutos.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. HORÁRIO E NOTIFICAÇÕES */}
        <section>
          <div className={`flex items-center gap-2 mb-4 ${activeTheme.text}`}>
            <Bell size={20} />
            <h2 className="font-bold text-foreground">Horário Ativo</h2>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm p-5 space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block uppercase tracking-wider">Início</label>
                <div className="relative">
                  <Sun className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="time" 
                    value={timeRange.start}
                    onChange={(e) => setTimeRange({...timeRange, start: e.target.value})}
                    className="pl-10 bg-background border-input text-foreground font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block uppercase tracking-wider">Fim</label>
                <div className="relative">
                  <Moon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="time" 
                    value={timeRange.end}
                    onChange={(e) => setTimeRange({...timeRange, end: e.target.value})}
                    className="pl-10 bg-background border-input text-foreground font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-border my-2"></div>

            {/* Sons e Vibração */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${activeTheme.bg}`}>
                    <Volume2 size={18} className={activeTheme.text} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Som de Notificação</span>
                </div>
                <Switch 
                  checked={alerts.sound}
                  onCheckedChange={(v) => setAlerts({...alerts, sound: v})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${activeTheme.bg}`}>
                    <Smartphone size={18} className={activeTheme.text} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Vibração</span>
                </div>
                <Switch 
                  checked={alerts.vibration}
                  onCheckedChange={(v) => setAlerts({...alerts, vibration: v})}
                />
              </div>
            </div>

          </div>
        </section>

        {/* Botão Salvar */}
        <div className="pt-4 pb-8">
          <Button 
            className={`w-full py-6 text-lg font-bold shadow-lg text-white rounded-xl transition-all active:scale-[0.98] ${activeTheme.btn}`}
            onClick={() => {
              alert("Plano salvo! Notificações agendadas.");
              onBack();
            }}
          >
            Salvar Plano de Estudos
          </Button>
        </div>

      </div>
    </div>
  );
}