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
  const theme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;

  // Estados
  const [questionsPerBatch, setQuestionsPerBatch] = useState([10]);
  const [intervalMinutes, setIntervalMinutes] = useState([30]);
  const [timeRange, setTimeRange] = useState({ start: '08:00', end: '18:00' });
  const [alerts, setAlerts] = useState({ sound: true, vibration: true });

  return (
    <div className="min-h-screen bg-background pb-20 animate-in slide-in-from-right">
      
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md p-4 sticky top-0 z-10 border-b border-border flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-accent text-foreground">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Plano de Estudos</h1>
          <p className="text-xs text-muted-foreground">Personalize o seu ritmo</p>
        </div>
      </div>

      <div className="p-6 space-y-8 max-w-xl mx-auto">

        {/* SECTION: RITMO */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${theme.bg}`}>
               <Zap size={18} className={theme.text} />
            </div>
            <h2 className="font-bold text-foreground text-sm uppercase tracking-wide">Intensidade</h2>
          </div>
          
          <Card className="border-border bg-card shadow-sm rounded-3xl">
            <CardContent className="pt-6 space-y-8">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between mb-4 items-center">
                  <span className="font-medium text-foreground">Questões por rodada</span>
                  <span className={`text-lg font-bold ${theme.text} bg-muted px-3 py-1 rounded-md`}>
                    {questionsPerBatch}
                  </span>
                </div>
                <Slider 
                  value={questionsPerBatch} 
                  onValueChange={setQuestionsPerBatch} 
                  max={50} min={5} step={5} 
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground mt-2">Menos questões = Mais foco.</p>
              </div>

              {/* Slider 2 */}
               <div>
                <div className="flex justify-between mb-4 items-center">
                  <span className="font-medium text-foreground">Intervalo</span>
                  <span className={`text-lg font-bold ${theme.text} bg-muted px-3 py-1 rounded-md`}>
                    {intervalMinutes} min
                  </span>
                </div>
                <Slider 
                  value={intervalMinutes} 
                  onValueChange={setIntervalMinutes} 
                  max={120} min={10} step={10} 
                  className="py-2"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SECTION: ALERTAS */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${theme.bg}`}>
               <Bell size={18} className={theme.text} />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Notificações</h2>
          </div>

          <Card className="border-border bg-card shadow-sm rounded-3xl overflow-hidden divide-y divide-border">
            
             <div className="p-5 grid grid-cols-2 gap-4 bg-muted/30">
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block uppercase">Início</label>
                <div className="relative">
                  <Sun className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="time" 
                    value={timeRange.start}
                    onChange={(e) => setTimeRange({...timeRange, start: e.target.value})}
                    className="pl-9 bg-background border-border text-foreground font-medium h-10 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block uppercase">Fim</label>
                <div className="relative">
                  <Moon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="time" 
                    value={timeRange.end}
                    onChange={(e) => setTimeRange({...timeRange, end: e.target.value})}
                    className="pl-9 bg-background border-border text-foreground font-medium h-10 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-500/20 p-2 rounded-full">
                    <Volume2 size={18} className="text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="font-medium text-foreground">Sons</span>
                </div>
                <Switch checked={alerts.sound} onCheckedChange={(v) => setAlerts({...alerts, sound: v})} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-full">
                    <Smartphone size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-foreground">Vibração</span>
                </div>
                <Switch checked={alerts.vibration} onCheckedChange={(v) => setAlerts({...alerts, vibration: v})} />
              </div>
            </div>
          </Card>
        </section>

        {/* Ação */}
        <div className="pt-4">
          <Button 
            className={`w-full py-6 text-lg font-bold shadow-lg rounded-2xl transition-transform active:scale-[0.98] ${theme.button} text-white`}
            onClick={() => {
              alert("Plano salvo!");
              onBack();
            }}
          >
            Salvar Alterações
          </Button>
        </div>

      </div>
    </div>
  );
}