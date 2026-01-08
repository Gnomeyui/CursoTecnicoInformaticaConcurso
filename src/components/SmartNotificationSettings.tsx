import React from 'react';
import { Bell, Clock, Hash, Layers, AlertCircle } from 'lucide-react';
import { useSmartNotification } from '../context/SmartNotificationContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';

export function SmartNotificationSettings() {
  const { config, updateConfig, getPendingCount } = useSmartNotification();
  const { activeProfile } = useConcursoProfile();

  const pendingCount = activeProfile ? getPendingCount(activeProfile.id) : 0;

  const intervalOptions = [
    { value: 10, label: '10 minutos' },
    { value: 15, label: '15 minutos' },
    { value: 30, label: '30 minutos' },
    { value: 60, label: '1 hora' },
    { value: 120, label: '2 horas' },
  ];

  const questionOptions = [
    { value: 5, label: '5 questões' },
    { value: 10, label: '10 questões' },
    { value: 15, label: '15 questões' },
    { value: 20, label: '20 questões' },
    { value: 30, label: '30 questões' },
  ];

  return (
    <div className="space-y-6">
      {/* Header com Status */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl mb-1">Notificações Inteligentes</h3>
            <p className="text-sm opacity-90">
              Sistema automático de lembretes para estudos
            </p>
          </div>
          <Bell className="size-8 opacity-80" />
        </div>

        {/* Status */}
        <div className="bg-white/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Status:</span>
            <span className={`px-3 py-1 rounded-full text-xs ${
              config.enabled
                ? 'bg-green-500 text-white'
                : 'bg-gray-500 text-white'
            }`}>
              {config.enabled ? 'Ativado' : 'Desativado'}
            </span>
          </div>

          {config.enabled && (
            <>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Horário:</span>
                <span className="font-semibold">{config.startTime} - {config.endTime}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Intervalo:</span>
                <span className="font-semibold">{config.intervalMinutes} min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Questões por vez:</span>
                <span className="font-semibold">{config.questionsPerNotification}</span>
              </div>
            </>
          )}
        </div>

        {/* Questões Pendentes */}
        {pendingCount > 0 && (
          <div className="mt-4 bg-yellow-500/20 rounded-xl p-4 border-2 border-yellow-300/30">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5" />
              <div>
                <p className="text-sm font-semibold">Questões Pendentes</p>
                <p className="text-xs opacity-90">
                  Você tem {pendingCount} questões acumuladas para responder
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ativar/Desativar */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-foreground mb-1">Ativar Notificações</h4>
            <p className="text-sm text-muted-foreground">
              Receba lembretes automáticos para estudar
            </p>
          </div>
          <button
            onClick={() => updateConfig({ enabled: !config.enabled })}
            className={`relative w-14 h-8 rounded-full transition-colors flex items-center ${
              config.enabled
                ? 'bg-blue-500'
                : 'bg-muted'
            }`}
          >
            <span
              className={`w-6 h-6 bg-white rounded-full transition-transform shadow-md ${
                config.enabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {config.enabled && (
        <>
          {/* Horário de Início */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="size-5 text-blue-500" />
              <div>
                <h4 className="text-foreground">Horário de Início</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Quando começar a enviar notificações
                </p>
              </div>
            </div>
            <input
              type="time"
              value={config.startTime}
              onChange={(e) => updateConfig({ startTime: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground focus:border-blue-500 outline-none"
            />
          </div>

          {/* Horário de Término */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="size-5 text-purple-500" />
              <div>
                <h4 className="text-foreground">Horário de Término</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Quando parar de enviar notificações
                </p>
              </div>
            </div>
            <input
              type="time"
              value={config.endTime}
              onChange={(e) => updateConfig({ endTime: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground focus:border-blue-500 outline-none"
            />
          </div>

          {/* Intervalo entre Notificações */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="size-5 text-green-500" />
              <div>
                <h4 className="text-foreground">Intervalo entre Notificações</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  A cada quanto tempo receber lembretes
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {intervalOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateConfig({ intervalMinutes: option.value })}
                  className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                    config.intervalMinutes === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      : 'border-border bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade de Questões */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Hash className="size-5 text-orange-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-foreground">Questões por Notificação</h4>
                  <span className="text-2xl font-bold text-blue-500">
                    {config.questionsPerNotification}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Quantas questões responder por vez (máximo 1000)
                </p>
              </div>
            </div>
            
            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="1000"
                value={config.questionsPerNotification}
                onChange={(e) => updateConfig({ questionsPerNotification: parseInt(e.target.value) })}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
                style={{
                  background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${(config.questionsPerNotification / 1000) * 100}%, rgb(229 231 235) ${(config.questionsPerNotification / 1000) * 100}%, rgb(229 231 235) 100%)`
                }}
              />
              
              {/* Marcadores de referência */}
              <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>1</span>
                <span>250</span>
                <span>500</span>
                <span>750</span>
                <span>1000</span>
              </div>
              
              {/* Sugestões rápidas */}
              <div className="flex gap-2 pt-2">
                {[5, 10, 20, 50, 100].map(value => (
                  <button
                    key={value}
                    onClick={() => updateConfig({ questionsPerNotification: value })}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      config.questionsPerNotification === value
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Permitir Acumulação */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-foreground mb-1">Acumular Questões</h4>
                <p className="text-sm text-muted-foreground">
                  Se não fizer, acumula para próxima vez
                </p>
              </div>
              <button
                onClick={() => updateConfig({ allowAccumulation: !config.allowAccumulation })}
                className={`relative w-14 h-8 rounded-full transition-colors flex items-center ${
                  config.allowAccumulation
                    ? 'bg-blue-500'
                    : 'bg-muted'
                }`}
              >
                <span
                  className={`w-6 h-6 bg-white rounded-full transition-transform shadow-md ${
                    config.allowAccumulation ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Explicação do Sistema */}
          <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700">
            <h4 className="text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
              <AlertCircle className="size-5" />
              Como Funciona
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Notificações enviadas automaticamente no intervalo configurado</li>
              <li>• Apenas dentro do horário de início/término</li>
              <li>• Se não responder, questões acumulam para próxima notificação</li>
              <li>• Questões específicas do perfil de concurso ativo</li>
              <li>• Sistema funciona mesmo com app fechado (no Android)</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}