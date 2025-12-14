import React, { useState, useEffect } from 'react';
import { ChevronLeft, Target, Trash2 } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [dailyGoal, setDailyGoal] = useState(20);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('alerr_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setDailyGoal(settings.dailyGoal || 20);
    }

    // Carregar última vez que salvou
    const lastSavedStr = localStorage.getItem('alerr_settings_last_saved');
    if (lastSavedStr) {
      setLastSaved(new Date(lastSavedStr));
    }
  }, []);

  // 🚀 NOVO: Salvar automaticamente quando a meta diária mudar
  useEffect(() => {
    // Aguardar 800ms após a última mudança antes de salvar (debounce)
    const timer = setTimeout(() => {
      if (dailyGoal > 0) {
        saveSettingsAutomatically();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [dailyGoal]);

  // 🚀 NOVA FUNÇÃO: Salvar automaticamente (sem alert)
  const saveSettingsAutomatically = () => {
    setIsSaving(true);
    
    const saved = localStorage.getItem('alerr_settings');
    const existingSettings = saved ? JSON.parse(saved) : {};
    
    const settings = {
      ...existingSettings,
      dailyGoal
    };
    
    localStorage.setItem('alerr_settings', JSON.stringify(settings));
    
    // Salvar timestamp
    const now = new Date();
    setLastSaved(now);
    localStorage.setItem('alerr_settings_last_saved', now.toISOString());
    
    console.log('✅ Meta diária salva automaticamente:', dailyGoal);
    
    setTimeout(() => setIsSaving(false), 500);
  };

  const saveSettings = () => {
    const saved = localStorage.getItem('alerr_settings');
    const existingSettings = saved ? JSON.parse(saved) : {};
    
    const settings = {
      ...existingSettings,
      dailyGoal
    };
    localStorage.setItem('alerr_settings', JSON.stringify(settings));
    
    // Salvar timestamp
    const now = new Date();
    setLastSaved(now);
    localStorage.setItem('alerr_settings_last_saved', now.toISOString());
    
    alert('Configurações salvas com sucesso!');
  };

  const resetProgress = () => {
    if (confirm('Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('alerr_progress');
      alert('Progresso resetado!');
      onBack();
    }
  };

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
        <h1 className="text-2xl sm:text-3xl text-slate-900 dark:text-white mb-6 sm:mb-8">Configurações Gerais</h1>

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
          <div className="text-center mb-3">
            <span className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400">{dailyGoal}</span>
            <span className="text-sm sm:text-base text-slate-600 dark:text-gray-400 ml-2">questões/dia</span>
          </div>

          {/* Indicador de salvamento automático */}
          {isSaving && (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 border border-blue-300 dark:border-blue-600 animate-pulse">
              <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                💾 Salvando automaticamente...
              </p>
            </div>
          )}

          {lastSaved && !isSaving && (
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2 border border-green-300 dark:border-green-600">
              <p className="text-xs text-green-700 dark:text-green-300 text-center">
                ✅ Salvo: {lastSaved.toLocaleTimeString('pt-BR')}
              </p>
            </div>
          )}
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