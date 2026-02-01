/**
 * @file NotificationTestPanel.tsx
 * @description Painel de testes para sistema de notificações e vibrações
 */

import React, { useState, useEffect } from 'react';
import { Bell, Vibrate, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NotificationScheduler } from '../utils/notifications/NotificationScheduler';
import { useSmartNotification } from '../context/SmartNotificationContext';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error' | 'running';
  message: string;
}

export function NotificationTestPanel() {
  const { config } = useSmartNotification();
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Atualizar contagem de notificações pendentes
  useEffect(() => {
    const loadPending = async () => {
      try {
        const pending = await LocalNotifications.getPending();
        setPendingCount(pending.notifications.length);
      } catch (error) {
        console.error('Erro ao carregar pendentes:', error);
      }
    };
    
    loadPending();
    const interval = setInterval(loadPending, 3000); // Atualiza a cada 3s
    return () => clearInterval(interval);
  }, []);

  const updateTest = (name: string, status: TestResult['status'], message: string) => {
    setTests(prev => {
      const existing = prev.find(t => t.name === name);
      if (existing) {
        return prev.map(t => t.name === name ? { ...t, status, message } : t);
      }
      return [...prev, { name, status, message }];
    });
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTests([]);

    // ========================================
    // TESTE 1: Verificar Permissões
    // ========================================
    updateTest('permissions', 'running', 'Verificando permissões...');
    try {
      const hasPermission = await NotificationScheduler.checkPermissions();
      if (hasPermission) {
        updateTest('permissions', 'success', '✅ Permissões concedidas');
      } else {
        updateTest('permissions', 'error', '❌ Permissões negadas');
        const granted = await NotificationScheduler.requestPermissions();
        if (granted) {
          updateTest('permissions', 'success', '✅ Permissões concedidas após solicitação');
        } else {
          updateTest('permissions', 'error', '❌ Usuário negou permissões');
        }
      }
    } catch (error: any) {
      updateTest('permissions', 'error', `❌ Erro: ${error.message}`);
    }

    // ========================================
    // TESTE 2: Testar Vibração
    // ========================================
    updateTest('vibration', 'running', 'Testando vibração...');
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
      await new Promise(resolve => setTimeout(resolve, 300));
      await Haptics.vibrate({ duration: 200 });
      updateTest('vibration', 'success', '✅ Vibração funcionando (você deve ter sentido 2 vibrações)');
    } catch (error: any) {
      updateTest('vibration', 'error', `⚠️ Vibração indisponível: ${error.message}`);
    }

    // ========================================
    // TESTE 3: Notificação Imediata
    // ========================================
    updateTest('immediate', 'running', 'Enviando notificação de teste...');
    try {
      const now = new Date();
      now.setSeconds(now.getSeconds() + 3); // 3 segundos no futuro

      await LocalNotifications.schedule({
        notifications: [{
          id: 999999,
          title: '🧪 Teste de Notificação',
          body: 'Se você está vendo isso, as notificações estão funcionando! 🎉',
          schedule: { at: now },
          sound: 'default',
          smallIcon: 'ic_stat_icon_config_sample',
        }]
      });

      updateTest('immediate', 'success', '✅ Notificação agendada para daqui 3 segundos');
    } catch (error: any) {
      updateTest('immediate', 'error', `❌ Erro ao agendar: ${error.message}`);
    }

    // ========================================
    // TESTE 4: Verificar Configurações
    // ========================================
    updateTest('config', 'running', 'Verificando configurações...');
    try {
      const configStatus = [];
      configStatus.push(`Habilitado: ${config.enabled ? '✅' : '❌'}`);
      configStatus.push(`Horário: ${config.startTime} - ${config.endTime}`);
      configStatus.push(`Intervalo: ${config.intervalMinutes} min`);
      configStatus.push(`Questões: ${config.questionsPerNotification}`);
      
      updateTest('config', 'success', configStatus.join(' | '));
    } catch (error: any) {
      updateTest('config', 'error', `❌ Erro: ${error.message}`);
    }

    // ========================================
    // TESTE 5: Listar Notificações Pendentes
    // ========================================
    updateTest('pending', 'running', 'Listando notificações agendadas...');
    try {
      const pending = await LocalNotifications.getPending();
      setPendingCount(pending.notifications.length);
      
      if (pending.notifications.length > 0) {
        const first = pending.notifications[0];
        updateTest('pending', 'success', 
          `✅ ${pending.notifications.length} notificações agendadas. Próxima: ${first.schedule?.at ? new Date(first.schedule.at).toLocaleString('pt-BR') : 'N/A'}`
        );
      } else {
        updateTest('pending', 'error', '⚠️ Nenhuma notificação agendada');
      }
    } catch (error: any) {
      updateTest('pending', 'error', `❌ Erro: ${error.message}`);
    }

    setIsRunning(false);
  };

  const testVibrationOnly = async () => {
    try {
      // Vibração curta
      await Haptics.impact({ style: ImpactStyle.Light });
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Vibração média
      await Haptics.impact({ style: ImpactStyle.Medium });
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Vibração forte
      await Haptics.impact({ style: ImpactStyle.Heavy });
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Vibração personalizada
      await Haptics.vibrate({ duration: 500 });
      
      alert('✅ Teste de vibração concluído! Você deve ter sentido 4 vibrações diferentes.');
    } catch (error) {
      alert('⚠️ Vibração não disponível neste dispositivo');
    }
  };

  const sendTestNotification = async () => {
    try {
      const now = new Date();
      now.setSeconds(now.getSeconds() + 2);

      await LocalNotifications.schedule({
        notifications: [{
          id: Math.floor(Math.random() * 1000000),
          title: '📚 Gabaritoo - Teste',
          body: 'Esta é uma notificação de teste! Toque para abrir o app.',
          schedule: { at: now },
          sound: 'default',
          smallIcon: 'ic_stat_icon_config_sample',
        }]
      });

      // Vibração de confirmação
      await Haptics.impact({ style: ImpactStyle.Medium });
      alert('✅ Notificação agendada para 2 segundos!');
    } catch (error) {
      alert('❌ Erro ao enviar notificação de teste');
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          🧪 Teste de Notificações
        </h2>
        <p className="text-sm text-muted-foreground">
          Verifique se o sistema de lembretes está funcionando corretamente
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {pendingCount}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Notificações Agendadas
          </div>
        </div>
        <div className={`${config.enabled ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'} p-4 rounded-xl text-center`}>
          <div className={`text-3xl font-bold ${config.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {config.enabled ? 'ON' : 'OFF'}
          </div>
          <div className={`text-xs ${config.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mt-1`}>
            Status do Sistema
          </div>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="space-y-3">
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Executando Testes...
            </>
          ) : (
            <>
              <Bell className="w-5 h-5" />
              Executar Todos os Testes
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={testVibrationOnly}
            className="py-3 px-4 bg-purple-600 text-white rounded-xl font-semibold shadow-lg hover:bg-purple-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Vibrate className="w-5 h-5" />
            Testar Vibração
          </button>
          
          <button
            onClick={sendTestNotification}
            className="py-3 px-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Bell className="w-5 h-5" />
            Enviar Notificação
          </button>
        </div>
      </div>

      {/* Test Results */}
      {tests.length > 0 && (
        <div className="bg-card rounded-xl p-4 space-y-3 border border-border">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Resultados dos Testes
          </h3>
          
          {tests.map((test, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
              <div className="mt-0.5">
                {getStatusIcon(test.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground capitalize">
                  {test.name.replace(/-/g, ' ')}
                </div>
                <div className="text-xs text-muted-foreground break-words">
                  {test.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Config Info */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-xs space-y-2">
        <div className="font-bold text-foreground">📋 Configurações Atuais:</div>
        <div className="text-muted-foreground space-y-1">
          <div>• Lembretes: {config.enabled ? '✅ Habilitados' : '❌ Desabilitados'}</div>
          <div>• Horário: {config.startTime} às {config.endTime}</div>
          <div>• Intervalo: A cada {config.intervalMinutes} minutos</div>
          <div>• Questões por lembrete: {config.questionsPerNotification}</div>
          <div>• Acumular questões: {config.allowAccumulation ? 'Sim' : 'Não'}</div>
        </div>
      </div>
    </div>
  );
}
