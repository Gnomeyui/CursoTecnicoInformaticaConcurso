import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell, Target, Clock, Trash2, Zap, BookOpen } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [dailyGoal, setDailyGoal] = useState(20);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('22:00');
  const [intervalMinutes, setIntervalMinutes] = useState(30);
  const [questionsPerSession, setQuestionsPerSession] = useState(10);
  const [flashcardsPerSession, setFlashcardsPerSession] = useState(2);

  useEffect(() => {
    const saved = localStorage.getItem('alerr_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setDailyGoal(settings.dailyGoal || 20);
      setNotificationsEnabled(settings.notificationsEnabled ?? true);
      setStartTime(settings.startTime || '08:00');
      setEndTime(settings.endTime || '22:00');
      setIntervalMinutes(settings.intervalMinutes || 30);
      setQuestionsPerSession(settings.questionsPerSession || 10);
      setFlashcardsPerSession(settings.flashcardsPerSession || 2);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      dailyGoal,
      notificationsEnabled,
      startTime,
      endTime,
      intervalMinutes,
      questionsPerSession,
      flashcardsPerSession
    };
    localStorage.setItem('alerr_settings', JSON.stringify(settings));
    alert('Configurações salvas com sucesso!');
  };

  const resetProgress = () => {
    if (confirm('Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('alerr_progress');
      alert('Progresso resetado!');
      onBack();
    }
  };

  // Calcular quantas sessões serão necessárias
  const sessionsNeeded = Math.ceil(dailyGoal / questionsPerSession);
  
  // Calcular horas disponíveis
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  const availableMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
  const availableHours = Math.floor(availableMinutes / 60);
  const availableMins = availableMinutes % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header - Mobile Optimized */}
      <div className="bg-gray-50 dark:bg-gray-800 shadow-sm border-b border-slate-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-3 sm:px-4 py-3">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 touch-manipulation min-h-[44px]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm sm:text-base">Voltar</span>
          </button>
        </div>
      </div>

      <div className="px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl text-slate-900 dark:text-white mb-6 sm:mb-8">Configurações</h1>

        {/* Daily Goal - Mobile Optimized */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-md mb-4 sm:mb-6 border border-slate-200 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg sm:text-xl text-slate-900 dark:text-white">Meta Diária</h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 mb-4">
            Quantas questões você quer responder por dia?
          </p>
          <input
            type="range"
            min="5"
            max="500"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
            className="w-full mb-3 touch-manipulation slider-custom"
            style={{ 
              height: '44px',
              borderRadius: '12px',
              background: `linear-gradient(to right, var(--slider-fill) 0%, var(--slider-fill) ${((dailyGoal - 5) / (500 - 5)) * 100}%, var(--slider-track) ${((dailyGoal - 5) / (500 - 5)) * 100}%, var(--slider-track) 100%)`
            }}
          />
          <div className="text-center">
            <span className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400">{dailyGoal}</span>
            <span className="text-sm sm:text-base text-slate-600 dark:text-gray-400 ml-2">questões/dia</span>
          </div>
        </div>

        {/* Notifications - Mobile Friendly */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-md mb-4 sm:mb-6 border border-slate-200 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg sm:text-xl text-slate-900 dark:text-white">Lembretes</h2>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm sm:text-base text-slate-700 dark:text-gray-300">Ativar notificações</span>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative w-16 h-8 rounded-full transition-colors touch-manipulation ${
                notificationsEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  notificationsEnabled ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {notificationsEnabled && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-gray-700">
              <div className="flex items-center gap-2 sm:gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-gray-400" />
                <h3 className="text-sm sm:text-base text-slate-900 dark:text-white">Horário Ativo</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-slate-600 dark:text-gray-400 mb-2">Das</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-sm sm:text-base touch-manipulation"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-slate-600 dark:text-gray-400 mb-2">Até</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-sm sm:text-base touch-manipulation"
                  />
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-2 leading-relaxed">
                💡 Nota: Para receber notificações web, permita notificações no seu navegador quando solicitado.
              </p>
            </div>
          )}
        </div>

        {/* Session Settings - Mobile Friendly */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 sm:p-6 shadow-md mb-4 sm:mb-6 border-2 border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-lg sm:text-xl text-slate-900 dark:text-white">Sessões de Estudo</h2>
          </div>
          
          <div className="space-y-5">
            {/* Intervalo entre sessões */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                <h3 className="text-sm sm:text-base text-slate-900 dark:text-white">A cada quantos minutos?</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setIntervalMinutes(mins)}
                    className={`py-3 px-2 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                      intervalMinutes === mins 
                        ? 'bg-green-600 text-white shadow-lg scale-105' 
                        : 'bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-600 hover:border-green-500'
                    }`}
                  >
                    {mins}min
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={intervalMinutes}
                  onChange={(e) => setIntervalMinutes(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none text-sm touch-manipulation"
                  placeholder="Personalizar"
                />
                <span className="text-xs text-slate-600 dark:text-gray-400">minutos</span>
              </div>
            </div>
            
            {/* Questões por sessão */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                <h3 className="text-sm sm:text-base text-slate-900 dark:text-white">Quantas questões por vez?</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[5, 10, 15, 20].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setQuestionsPerSession(qty)}
                    className={`py-3 px-2 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                      questionsPerSession === qty 
                        ? 'bg-green-600 text-white shadow-lg scale-105' 
                        : 'bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-600 hover:border-green-500'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={questionsPerSession}
                  onChange={(e) => setQuestionsPerSession(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none text-sm touch-manipulation"
                  placeholder="Personalizar"
                />
                <span className="text-xs text-slate-600 dark:text-gray-400">questões</span>
              </div>
            </div>
            
            {/* Flashcards antes das questões */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm sm:text-base text-slate-900 dark:text-white">Flashcards antes das questões</h3>
              </div>
              
              <p className="text-xs text-slate-600 dark:text-gray-400 mb-3">
                🧠 <strong>Aquecimento cerebral:</strong> Revise flashcards do Regimento ALE-RR ANTES de responder questões!
              </p>
              
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[0, 1, 2, 3, 5].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setFlashcardsPerSession(qty)}
                    className={`py-2 px-1 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                      flashcardsPerSession === qty 
                        ? 'bg-purple-600 text-white shadow-lg scale-105' 
                        : 'bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-600 hover:border-purple-500'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={flashcardsPerSession}
                  onChange={(e) => setFlashcardsPerSession(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-lg border border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none text-sm touch-manipulation"
                  placeholder="Personalizar"
                />
                <span className="text-xs text-slate-600 dark:text-gray-400">flashcards</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-3 border border-purple-300 dark:border-purple-600">
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  {flashcardsPerSession === 0 
                    ? "⚠️ Desabilitado: Vai direto para as questões" 
                    : `✅ Ativo: ${flashcardsPerSession} flashcard${flashcardsPerSession > 1 ? 's' : ''} + ${questionsPerSession} questões`
                  }
                </p>
              </div>
            </div>
            
            {/* Resumo calculado */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-green-300 dark:border-green-600">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-2">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Seu Plano de Estudos:</h4>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
                    <p>📊 <strong>{sessionsNeeded} sessões</strong> por dia</p>
                    <p>⏰ Uma sessão a cada <strong>{intervalMinutes} minutos</strong></p>
                    {flashcardsPerSession > 0 && (
                      <p>🧠 <strong>{flashcardsPerSession} flashcard{flashcardsPerSession > 1 ? 's' : ''}</strong> (aquecimento)</p>
                    )}
                    <p>📝 <strong>{questionsPerSession} questões</strong> por sessão</p>
                    <p>🎯 Total: <strong>{dailyGoal} questões/dia</strong></p>
                    <p className="text-green-700 dark:text-green-400 font-medium pt-2">
                      ⏳ Tempo ativo: {availableHours}h{availableMins}m ({startTime} - {endTime})
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
              💡 <strong>Exemplo:</strong> Se você configurar "A cada 30 minutos fazer 10 questões", 
              o app te lembrará de estudar 10 questões a cada meia hora durante o horário ativo.
            </p>
          </div>
        </div>

        {/* Save Button - Mobile Touch Friendly */}
        <button
          onClick={saveSettings}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 sm:py-5 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-200 mb-4 sm:mb-6 text-base sm:text-lg touch-manipulation"
        >
          Salvar Configurações
        </button>

        {/* Danger Zone - Mobile Optimized */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5 sm:p-6 border border-red-200 dark:border-red-700">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
            <h2 className="text-lg sm:text-xl text-red-900 dark:text-red-300">Zona de Perigo</h2>
          </div>
          <p className="text-sm sm:text-base text-red-700 dark:text-red-300 mb-4">
            Resetar todo o progresso (pontos, estatísticas e histórico).
          </p>
          <button
            onClick={resetProgress}
            className="bg-red-600 text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-red-700 transition-colors active:scale-95 text-sm sm:text-base touch-manipulation min-h-[44px]"
          >
            Resetar Progresso
          </button>
        </div>
      </div>
    </div>
  );
}