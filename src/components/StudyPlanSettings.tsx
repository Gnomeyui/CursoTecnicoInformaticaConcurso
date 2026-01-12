import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Zap, Bell, Volume2, Smartphone, Save, Music, Upload, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { NotificationScheduler } from '../utils/notifications/NotificationScheduler';
import { NotificationSounds } from '../utils/notifications/NotificationSounds';

interface StudyPlanSettingsProps {
  onBack: () => void;
  onOpenNotifications?: () => void;
}

export function StudyPlanSettings({ onBack, onOpenNotifications }: StudyPlanSettingsProps) {
  // Inicializa estados com valores do localStorage ou padrão
  const [dailyGoal, setDailyGoal] = useState([20]);
  const [batchSize, setBatchSize] = useState([10]);
  const [intervalMinutes, setIntervalMinutes] = useState([30]);
  const [notificationTime, setNotificationTime] = useState({ start: '08:00', end: '18:00' });
  const [preferences, setPreferences] = useState({ sound: true, vibration: true });
  const [notificationSound, setNotificationSound] = useState('padrao');
  const [customSoundFile, setCustomSoundFile] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('alerr_notifications_enabled');
    return saved ? JSON.parse(saved) : true;
  });

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
      setNotificationSound(parsed.notificationSound || 'padrao');
      setCustomSoundFile(parsed.customSoundFile || null);
    }
  }, []);

  // Função de Salvar
  const handleSave = () => {
    const settings = { dailyGoal, batchSize, intervalMinutes, notificationTime, preferences, notificationSound, customSoundFile };
    localStorage.setItem('studyPlan', JSON.stringify(settings));
    
    // Aqui você pode chamar uma função para reagendar as notificações locais (se usar Capacitor)
    // scheduleNotifications(settings); 
    
    // Feedback visual
    alert("✅ Plano salvo com sucesso!"); 
    onBack();
  };

  // Handler para upload de arquivo de áudio
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verifica se é um arquivo de áudio
      if (file.type.startsWith('audio/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setCustomSoundFile(result);
          setNotificationSound('personalizado');
        };
        reader.readAsDataURL(file);
      } else {
        alert('⚠️ Por favor, escolha um arquivo de áudio (MP3, WAV, etc.)');
      }
    }
  };

  // Nome do arquivo personalizado
  const getCustomFileName = () => {
    if (!customSoundFile) return null;
    return 'Arquivo personalizado';
  };

  // Função para tocar o som de notificação
  const playNotificationSound = (sound: string) => {
    NotificationSounds.play(sound, customSoundFile || undefined);
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
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={dailyGoal[0]} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 5;
                        setDailyGoal([Math.min(Math.max(val, 5), 1000)]);
                      }}
                      min={5}
                      max={1000}
                      className="w-20 h-8 text-center text-lg font-bold text-blue-600 border-2 border-blue-200 focus:border-blue-400 rounded-lg px-[8px] py-[4px] mx-[7px] my-[-1px]"
                    />
                    <span className="text-sm font-medium text-blue-600">questões</span>
                  </div>
                </div>
                <Slider value={dailyGoal} onValueChange={setDailyGoal} max={100} min={5} step={5} className="py-2" />
                <p className="text-xs text-gray-400 mt-2">Ajuste conforme seu tempo disponível.</p>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Questões por Rodada</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={batchSize[0]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 3;
                        setBatchSize([Math.min(Math.max(val, 3), 9999)]);
                      }}
                      className="w-20 h-8 text-center text-lg font-bold text-blue-600 border-2 border-blue-200 focus:border-blue-400 rounded-lg px-2"
                      min={3}
                      max={9999}
                    />
                    <span className="text-sm font-medium text-blue-600">questões</span>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={intervalMinutes[0]} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setIntervalMinutes([Math.min(Math.max(val, 1), 100)]);
                      }}
                      min={1}
                      max={100}
                      className="w-16 h-8 text-center text-lg font-bold text-purple-600 border-2 border-purple-200 focus:border-purple-400 rounded-lg px-2"
                    />
                    <span className="text-sm font-medium text-purple-600">min</span>
                  </div>
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
            {/* Notificações Inteligentes */}
            {onOpenNotifications ? (
              <button 
                onClick={onOpenNotifications}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 dark:bg-red-500/20 p-2 rounded-full text-red-600 dark:text-red-400">
                    <Bell size={18} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium block">Notificações Inteligentes</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {notificationsEnabled ? 'Ativadas' : 'Desativadas'}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            ) : (
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 dark:bg-red-500/20 p-2 rounded-full text-red-600 dark:text-red-400">
                    <Bell size={18} />
                  </div>
                  <span className="text-sm font-medium">Notificações Inteligentes</span>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={(v) => {
                    setNotificationsEnabled(v);
                    localStorage.setItem('alerr_notifications_enabled', JSON.stringify(v));
                  }} 
                />
              </div>
            )}
            
            {/* Toque de Alerta */}
            {preferences.sound && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2 mb-3">
                  <Music size={16} className="text-orange-600" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Toque do Alerta</span>
                </div>
                
                <div className="space-y-2">
                  {/* Opções predefinidas */}
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="sound" 
                      value="padrao" 
                      checked={notificationSound === 'padrao'}
                      onChange={(e) => setNotificationSound(e.target.value)}
                      className="w-4 h-4 text-orange-600" 
                    />
                    <span className="text-sm flex-1">🔔 Padrão</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        playNotificationSound('padrao');
                      }}
                      className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-full transition-colors"
                      aria-label="Testar som padrão"
                    >
                      <Volume2 size={16} className="text-orange-600" />
                    </button>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="sound" 
                      value="suave" 
                      checked={notificationSound === 'suave'}
                      onChange={(e) => setNotificationSound(e.target.value)}
                      className="w-4 h-4 text-orange-600" 
                    />
                    <span className="text-sm flex-1">🎵 Suave</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        playNotificationSound('suave');
                      }}
                      className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-full transition-colors"
                      aria-label="Testar som suave"
                    >
                      <Volume2 size={16} className="text-blue-600" />
                    </button>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="sound" 
                      value="energico" 
                      checked={notificationSound === 'energico'}
                      onChange={(e) => setNotificationSound(e.target.value)}
                      className="w-4 h-4 text-orange-600" 
                    />
                    <span className="text-sm flex-1">⚡ Enérgico</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        playNotificationSound('energico');
                      }}
                      className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-full transition-colors"
                      aria-label="Testar som enérgico"
                    >
                      <Volume2 size={16} className="text-red-600" />
                    </button>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="sound" 
                      value="sino" 
                      checked={notificationSound === 'sino'}
                      onChange={(e) => setNotificationSound(e.target.value)}
                      className="w-4 h-4 text-orange-600" 
                    />
                    <span className="text-sm flex-1">🔕 Sino</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        playNotificationSound('sino');
                      }}
                      className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-full transition-colors"
                      aria-label="Testar som sino"
                    >
                      <Volume2 size={16} className="text-purple-600" />
                    </button>
                  </label>
                  
                  {/* Opção Personalizado */}
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="sound" 
                      value="personalizado" 
                      checked={notificationSound === 'personalizado'}
                      onChange={(e) => setNotificationSound(e.target.value)}
                      className="w-4 h-4 text-orange-600" 
                    />
                    <span className="text-sm flex-1">🎧 Personalizado</span>
                    {customSoundFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          playNotificationSound('personalizado');
                        }}
                        className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-full transition-colors"
                        aria-label="Testar som personalizado"
                      >
                        <Volume2 size={16} className="text-green-600" />
                      </button>
                    )}
                  </label>
                  
                  {/* Upload de arquivo quando personalizado está selecionado */}
                  {notificationSound === 'personalizado' && (
                    <div className="ml-7 mt-2 space-y-2">
                      <label className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                        <Upload size={16} />
                        <span className="text-sm font-medium">Escolher arquivo de áudio</span>
                        <input 
                          type="file" 
                          accept="audio/*" 
                          onChange={handleFileUpload}
                          className="hidden" 
                        />
                      </label>
                      
                      {customSoundFile && (
                        <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                          <span>✓</span>
                          <span>{getCustomFileName()}</span>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-400">Formatos: MP3, WAV, OGG, M4A</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Smartphone size={18} /></div>
                <span className="text-sm font-medium">Vibração</span>
              </div>
              <Switch checked={preferences.vibration} onCheckedChange={(v) => setPreferences({...preferences, vibration: v})} />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600"><Volume2 size={18} /></div>
                <span className="text-sm font-medium">Sons</span>
              </div>
              <Switch checked={preferences.sound} onCheckedChange={(v) => setPreferences({...preferences, sound: v})} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}