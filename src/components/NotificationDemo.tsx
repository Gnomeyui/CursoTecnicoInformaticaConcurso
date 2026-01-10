/**
 * COMPONENTE DE DEMONSTRAÇÃO DO SISTEMA DE NOTIFICAÇÕES
 * 
 * Este componente serve para:
 * 1. Testar o sistema de notificações
 * 2. Mostrar exemplos de uso
 * 3. Servir de referência para implementação real
 * 
 * IMPORTANTE: Este é apenas um DEMO. No app real, você deve:
 * - Integrar com o sistema de permissões do navegador
 * - Agendar notificações em background
 * - Usar Web Push API ou service workers
 */

import React, { useState } from 'react';
import { Bell, RefreshCw, Trash2, Play } from 'lucide-react';
import { Button } from './ui/button';
import { 
  NotificationService, 
  UserStudyStats,
  UserProfile 
} from '../utils/notifications';

export function NotificationDemo() {
  const [message, setMessage] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile>('regular');
  
  // Stats simulados (no app real, viriam do contexto/estado global)
  const [stats, setStats] = useState<UserStudyStats>({
    lastStudyAt: new Date(),
    streakDays: 5,
    averageAccuracy: 68,
    questionsAnsweredToday: 12
  });

  const generateMessage = () => {
    const service = new NotificationService(profile, stats);
    const msg = service.forceGenerateMessage();
    setMessage(msg);
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Este navegador não suporta notificações');
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      alert('Permissão concedida! Clique em "Testar Notificação"');
    }
  };

  const sendTestNotification = () => {
    const service = new NotificationService(profile, stats);
    const msg = service.forceGenerateMessage();
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Gabaritoo', {
        body: msg,
        icon: '/icon.png',
        badge: '/badge.png'
      });
    } else {
      alert('Permissão de notificações não concedida');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
              <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sistema de Notificações
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                200 mensagens motivacionais adaptativas
              </p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Configurações</h2>
          
          {/* Perfil do Usuário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Perfil do Usuário
            </label>
            <div className="flex gap-2">
              {(['beginner', 'regular', 'advanced'] as UserProfile[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setProfile(p)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    profile === p
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {p === 'beginner' && 'Iniciante'}
                  {p === 'regular' && 'Regular'}
                  {p === 'advanced' && 'Avançado'}
                </button>
              ))}
            </div>
          </div>

          {/* Stats do Usuário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Streak (dias)
              </label>
              <input
                type="number"
                value={stats.streakDays}
                onChange={(e) => setStats({ ...stats, streakDays: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Acurácia (%)
              </label>
              <input
                type="number"
                value={stats.averageAccuracy}
                onChange={(e) => setStats({ ...stats, averageAccuracy: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={generateMessage}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Gerar Mensagem
          </Button>
          
          <Button
            onClick={sendTestNotification}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
          >
            <Play className="w-4 h-4 mr-2" />
            Testar Notificação
          </Button>
        </div>

        {/* Mensagem Gerada */}
        {message && (
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-lg leading-relaxed">{message}</p>
            </div>
          </div>
        )}

        {/* Ações Avançadas */}
        <div className="flex gap-4">
          <Button
            onClick={requestPermission}
            variant="outline"
            className="flex-1"
          >
            Solicitar Permissão
          </Button>
          
          <Button
            onClick={() => {
              NotificationService.resetFrequencyControl();
              alert('Controle de frequência resetado');
            }}
            variant="outline"
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Resetar Sistema
          </Button>
        </div>

        {/* Informações */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">
            ℹ️ Como funciona
          </h3>
          <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
            <li>• Sistema detecta contexto automaticamente (manhã/noite/inativo/streak)</li>
            <li>• Adapta tom ao perfil do usuário (iniciante/regular/avançado)</li>
            <li>• Ajusta mensagens baseado no desempenho (acurácia)</li>
            <li>• Evita repetição de mensagens (últimas 20)</li>
            <li>• Controla frequência para evitar spam</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
