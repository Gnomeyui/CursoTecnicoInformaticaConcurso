import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Zap, Bell, Volume2, Smartphone, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';

interface StudyPlanSettingsProps {
  onBack: () => void;
}

export function StudyPlanSettings({ onBack }: StudyPlanSettingsProps) {
  // Inicializa estados com valores do localStorage ou padrão
  const [dailyGoal, setDailyGoal] = useState([20]);
  const [batchSize, setBatchSize] = useState([10]);
  const [intervalMinutes, setIntervalMinutes] = useState([30]);
  const [notificationTime, setNotificationTime] = useState({ start: '08:00', end: '18:00' });
  const [preferences, setPreferences] = useState({ sound: true, vibration: true });

  // Carregar dados ao abrir
  useEffect(() => {
    const savedPlan = localStorage.getItem('studyPlan');
    if (savedPlan) {
      const parsed = JSON.parse(savedPlan);
      setDailyGoal(parsed.dailyGoal || [20]);
      setBatchSize(parsed.batchSize || [10]);
      setIntervalMinutes(parsed.intervalMinutes || [30]);
      setNotificationTime(parsed.notificationTime || { start: '08:00', end: '18:00' });
      setPreferences(parsed.preferences || { sound: true, vibration: true });
    }
  }, []);

  // Função de Salvar
  const handleSave = () => {
    const settings = { dailyGoal, batchSize, intervalMinutes, notificationTime, preferences };
    localStorage.setItem('studyPlan', JSON.stringify(settings));
    
    // Aqui você pode chamar uma função para reagendar as notificações locais (se usar Capacitor)
    // scheduleNotifications(settings); 
    
    // Feedback visual
    alert("✅ Plano salvo com sucesso!"); 
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 animate-in slide-in-from-right">
      
      {/* Header com Botão Salvar */}
      <div className="bg-white dark:bg-gray-800 p-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Meu Plano</h1>
        </div>
        <Button onClick={handleSave} size="sm" className="bg-blue-600 text-white gap-2 hover:bg-blue-700">
          <Save size={16} /> Salvar
        </Button>
      </div>

      <div className="p-4 space-y-6 max-w-xl mx-auto">

        {/* 1. Meta Diária */}
        <section>
          <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold px-1">
            <Zap size={18} /> Metas
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6 space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Meta Diária</span>
                  <span className="text-lg font-bold text-blue-600">{dailyGoal} questões</span>
                </div>
                <Slider value={dailyGoal} onValueChange={setDailyGoal} max={100} min={5} step={5} className="py-2" />
                <p className="text-xs text-gray-400 mt-2">Ajuste conforme seu tempo disponível.</p>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Questões por Rodada</span>
                  <span className="text-lg font-bold text-blue-600">{batchSize}</span>
                </div>
                <Slider value={batchSize} onValueChange={setBatchSize} max={500} min={3} step={1} className="py-2" />
                <p className="text-xs text-gray-400 mt-2">De 3 a 500 questões por sessão.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Horários */}
        <section>
          <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold px-1">
            <Clock size={18} /> Rotina
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Intervalo de Estudo</span>
                  <span className="text-lg font-bold text-purple-600">{intervalMinutes} min</span>
                </div>
                <Slider value={intervalMinutes} onValueChange={setIntervalMinutes} max={100} min={1} step={1} className="py-2" />
                <p className="text-xs text-gray-400 mt-2">Notificações de 1 a 100 minutos.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Início</label>
                  <Input type="time" value={notificationTime.start} onChange={(e) => setNotificationTime({...notificationTime, start: e.target.value})} className="bg-gray-50 border-0" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Fim</label>
                  <Input type="time" value={notificationTime.end} onChange={(e) => setNotificationTime({...notificationTime, end: e.target.value})} className="bg-gray-50 border-0" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Notificações */}
        <section>
          <div className="flex items-center gap-2 mb-3 text-orange-600 font-bold px-1">
            <Bell size={18} /> Alertas
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600"><Volume2 size={18} /></div>
                <span className="text-sm font-medium">Sons</span>
              </div>
              <Switch checked={preferences.sound} onCheckedChange={(v) => setPreferences({...preferences, sound: v})} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Smartphone size={18} /></div>
                <span className="text-sm font-medium">Vibração</span>
              </div>
              <Switch checked={preferences.vibration} onCheckedChange={(v) => setPreferences({...preferences, vibration: v})} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
