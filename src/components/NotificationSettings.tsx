import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bell, BellOff, Clock, MessageSquare, 
  Check, AlertCircle, Plus, Trash2
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

interface NotificationSettingsProps {
  onBack: () => void;
}

const isNative = Capacitor.isNativePlatform();

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const { settings, updateSettings, requestPermission, hasPermission, scheduleNotifications } = useNotifications();
  const { isDarkMode } = useTheme();
  const [customTime, setCustomTime] = useState('09:00');

  useEffect(() => {
    if (settings.enabled && hasPermission) {
      scheduleNotifications();
    }
  }, [settings.enabled, hasPermission]);

  const handleEnableNotifications = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (granted) {
        updateSettings({ enabled: true });
        if (isNative) {
          try {
            await Haptics.impact({ style: ImpactStyle.Medium });
          } catch (e) {
            console.log('Vibração não disponível');
          }
        }
      } else {
        alert('❌ Permissão negada! Por favor, ative as notificações nas configurações do dispositivo.');
      }
    } else {
      updateSettings({ enabled: !settings.enabled });
      if (isNative) {
        try {
          await Haptics.impact({ style: ImpactStyle.Light });
        } catch (e) {
          console.log('Vibração não disponível');
        }
      }
    }
  };

  const handleFrequencyChange = async (frequency: 'low' | 'medium' | 'high') => {
    updateSettings({ frequency });
    if (isNative) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {
        console.log('Vibração não disponível');
      }
    }
  };

  const handleAddTime = async () => {
    if (customTime && !settings.times.includes(customTime)) {
      updateSettings({ times: [...settings.times, customTime].sort() });
      setCustomTime('09:00');
      if (isNative) {
        try {
          await Haptics.impact({ style: ImpactStyle.Medium });
        } catch (e) {
          console.log('Vibração não disponível');
        }
      }
    }
  };

  const handleRemoveTime = async (time: string) => {
    updateSettings({ times: settings.times.filter(t => t !== time) });
    if (isNative) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {
        console.log('Vibração não disponível');
      }
    }
  };

  const testNotification = async () => {
    if (!hasPermission) {
      alert('❌ Você precisa permitir notificações primeiro.');
      return;
    }

    if (isNative) {
      // Android/iOS - Usar Capacitor
      try {
        // Vibrar primeiro
        try {
          await Haptics.vibrate({ duration: 500 });
        } catch (e) {
          console.log('Vibração não disponível');
        }

        // Enviar notificação de teste IMEDIATA
        await LocalNotifications.schedule({
          notifications: [
            {
              id: 9999,
              title: '🧪 Teste de Notificação',
              body: 'Tudo funcionando perfeitamente! Você receberá lembretes nos horários configurados. 🚀',
              schedule: { at: new Date(Date.now() + 500) }, // 0.5 segundos
              channelId: 'study-reminders',
              sound: 'default',
              smallIcon: 'ic_launcher',
              extra: { type: 'test' }
            }
          ]
        });

        console.log('✅ Notificação de teste enviada! (Nativo)');
        
        // Feedback visual
        alert('✅ Notificação enviada! Verifique a barra de notificações.');
      } catch (error) {
        console.error('Erro ao testar notificação:', error);
        alert('❌ Erro ao testar notificação. Verifique as permissões do dispositivo.');
      }
    } else {
      // Web - Usar Notification API
      try {
        const notification = new Notification('🧪 Teste de Notificação', {
          body: 'Tudo funcionando perfeitamente! Você receberá lembretes nos horários configurados. 🚀',
          icon: '/icon.svg',
          tag: 'test'
        });

        // Vibrar se disponível
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        console.log('✅ Notificação de teste enviada! (Web)');
      } catch (error) {
        console.error('Erro ao testar notificação:', error);
        alert('❌ Erro ao testar notificação. Verifique as permissões do navegador.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-slate-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-2xl text-slate-900 dark:text-white">Notificações</h1>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Configure lembretes de estudo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto space-y-6">
        {/* Status das Notificações */}
        <div className={`rounded-2xl p-6 shadow-lg ${
          settings.enabled && hasPermission
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-slate-500 to-slate-600'
        } text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {settings.enabled && hasPermission ? (
                <Bell className="w-12 h-12" />
              ) : (
                <BellOff className="w-12 h-12" />
              )}
              <div>
                <h3 className="text-xl mb-1">
                  {settings.enabled && hasPermission ? 'Notificações Ativas' : 'Notificações Desativadas'}
                </h3>
                <p className="text-sm text-white/80">
                  {settings.enabled && hasPermission 
                    ? `${settings.times.length} lembretes configurados`
                    : 'Ative para receber lembretes'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleEnableNotifications}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                settings.enabled ? 'bg-white/30' : 'bg-white/20'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                settings.enabled ? 'translate-x-8' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Permissão Necessária */}
        {!hasPermission && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm text-yellow-900 dark:text-yellow-200 mb-1">
                  Permissão Necessária
                </h4>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                  Para receber notificações, você precisa permitir que o navegador envie alertas.
                  {' '}No celular, certifique-se de permitir notificações nas configurações do sistema também.
                </p>
                <button
                  onClick={requestPermission}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm transition-colors"
                >
                  Solicitar Permissão
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Frequência */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg text-slate-900 dark:text-white">Frequência</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Quantas vezes por dia deseja ser lembrado?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleFrequencyChange('low')}
              disabled={!settings.enabled}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                settings.frequency === 'low'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
              } ${!settings.enabled && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="text-2xl mb-2">1x</div>
              <div className="text-xs text-slate-600 dark:text-gray-400">Baixa</div>
              {settings.frequency === 'low' && (
                <Check className="w-4 h-4 text-blue-500 mx-auto mt-2" />
              )}
            </button>
            <button
              onClick={() => handleFrequencyChange('medium')}
              disabled={!settings.enabled}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                settings.frequency === 'medium'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
              } ${!settings.enabled && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="text-2xl mb-2">3x</div>
              <div className="text-xs text-slate-600 dark:text-gray-400">Média</div>
              {settings.frequency === 'medium' && (
                <Check className="w-4 h-4 text-blue-500 mx-auto mt-2" />
              )}
            </button>
            <button
              onClick={() => handleFrequencyChange('high')}
              disabled={!settings.enabled}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                settings.frequency === 'high'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
              } ${!settings.enabled && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="text-2xl mb-2">5x</div>
              <div className="text-xs text-slate-600 dark:text-gray-400">Alta</div>
              {settings.frequency === 'high' && (
                <Check className="w-4 h-4 text-blue-500 mx-auto mt-2" />
              )}
            </button>
          </div>
        </div>

        {/* Horários */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg text-slate-900 dark:text-white">Horários</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Defina quando deseja receber os lembretes
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {settings.times.map(time => (
              <div 
                key={time}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-500 dark:text-gray-400" />
                  <span className="text-slate-900 dark:text-white font-mono">
                    {time}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveTime(time)}
                  disabled={!settings.enabled}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              disabled={!settings.enabled}
              className="flex-1 px-4 py-2 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
            />
            <button
              onClick={handleAddTime}
              disabled={!settings.enabled}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>
        </div>

        {/* Mensagens Motivacionais */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm text-slate-900 dark:text-white">
                  Mensagens Motivacionais
                </div>
                <div className="text-xs text-slate-600 dark:text-gray-400">
                  Receba frases inspiradoras nas notificações
                </div>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ motivationalMessages: !settings.motivationalMessages })}
              disabled={!settings.enabled}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.motivationalMessages
                  ? 'bg-green-500'
                  : 'bg-slate-300 dark:bg-gray-600'
              } ${!settings.enabled && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings.motivationalMessages ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Testar Notificação */}
        {hasPermission && (
          <button
            onClick={testNotification}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Bell className="w-5 h-5" />
            Testar Notificação Agora
          </button>
        )}

        {/* Informação */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="space-y-2">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              📱 <strong>Como funcionam as notificações:</strong>
            </p>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 ml-4 list-disc">
              <li>Mantenha a aba do app aberta para receber lembretes</li>
              <li>Adicione o app à tela inicial para instalá-lo como PWA</li>
              <li>As notificações aparecerão nos horários configurados</li>
              <li>Clique na notificação para focar no app e começar a estudar</li>
            </ul>
          </div>
        </div>
        
        {/* Status Técnico */}
        <div className="bg-slate-50 dark:bg-gray-800 rounded-xl p-4 border border-slate-200 dark:border-gray-700">
          <h4 className="text-sm text-slate-700 dark:text-gray-300 mb-2">Status do Sistema</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${hasPermission ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-slate-600 dark:text-gray-400">
                Permissão: {hasPermission ? 'Concedida' : 'Negada'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${settings.enabled ? 'bg-green-500' : 'bg-slate-400'}`} />
              <span className="text-slate-600 dark:text-gray-400">
                Notificações: {settings.enabled ? 'Ligadas' : 'Desligadas'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${settings.times.length > 0 ? 'bg-green-500' : 'bg-slate-400'}`} />
              <span className="text-slate-600 dark:text-gray-400">
                Horários: {settings.times.length} configurados
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${'Notification' in window ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-slate-600 dark:text-gray-400">
                Suporte: {'Notification' in window ? 'Disponível' : 'Indisponível'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}