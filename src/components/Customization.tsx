import React from 'react';
import { 
  ArrowLeft, Type, Palette, Eye, Zap, Minimize2, 
  Check, Settings
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { useTheme } from '../context/ThemeContext';

interface CustomizationProps {
  onBack: () => void;
}

export function Customization({ onBack }: CustomizationProps) {
  const { settings, updateSettings } = useCustomization();
  const { isDarkMode } = useTheme();

  const fontSizes = [
    { value: 'small' as const, label: 'Pequeno', example: 'texto-exemplo' },
    { value: 'medium' as const, label: 'Médio', example: 'texto-exemplo' },
    { value: 'large' as const, label: 'Grande', example: 'texto-exemplo' },
    { value: 'xlarge' as const, label: 'Muito Grande', example: 'texto-exemplo' }
  ];

  const colorThemes = [
    { 
      value: 'default' as const, 
      label: 'Padrão', 
      colors: ['bg-red-500', 'bg-blue-500', 'bg-emerald-500'] 
    },
    { 
      value: 'blue' as const, 
      label: 'Azul', 
      colors: ['bg-blue-500', 'bg-sky-500', 'bg-indigo-500'] 
    },
    { 
      value: 'green' as const, 
      label: 'Verde', 
      colors: ['bg-green-500', 'bg-emerald-500', 'bg-teal-500'] 
    },
    { 
      value: 'purple' as const, 
      label: 'Roxo', 
      colors: ['bg-purple-500', 'bg-violet-500', 'bg-pink-500'] 
    },
    { 
      value: 'orange' as const, 
      label: 'Laranja', 
      colors: ['bg-orange-500', 'bg-orange-400', 'bg-orange-600'] 
    }
  ];

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
              <h1 className="text-2xl text-slate-900 dark:text-white">Personalização</h1>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Ajuste o aplicativo ao seu gosto
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto space-y-6">
        {/* Tamanho da Fonte */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Type className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg text-slate-900 dark:text-white">Tamanho da Fonte</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Ajuste para melhor legibilidade
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fontSizes.map(size => (
              <button
                key={size.value}
                onClick={() => updateSettings({ fontSize: size.value })}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  settings.fontSize === size.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`mb-2 ${
                  size.value === 'small' ? 'text-xs' :
                  size.value === 'medium' ? 'text-sm' :
                  size.value === 'large' ? 'text-base' : 'text-lg'
                }`}>
                  Aa
                </div>
                <div className="text-xs text-slate-600 dark:text-gray-400">{size.label}</div>
                {settings.fontSize === size.value && (
                  <Check className="w-4 h-4 text-blue-500 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
            <p className="text-slate-700 dark:text-gray-300">
              Esta é uma prévia do texto com o tamanho selecionado. O texto ficará assim em todo o aplicativo.
            </p>
          </div>
        </div>

        {/* Tema de Cores */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg text-slate-900 dark:text-white">Tema de Cores</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Escolha sua paleta de cores favorita
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {colorThemes.map(theme => (
              <button
                key={theme.value}
                onClick={() => updateSettings({ colorTheme: theme.value })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.colorTheme === theme.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex justify-center gap-1 mb-2">
                  {theme.colors.map((color, index) => (
                    <div key={index} className={`w-6 h-6 rounded-full ${color}`} />
                  ))}
                </div>
                <div className="text-sm text-slate-700 dark:text-gray-300">{theme.label}</div>
                {settings.colorTheme === theme.value && (
                  <Check className="w-4 h-4 text-blue-500 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
            <div className="flex gap-2 items-center">
              <div className="px-4 py-2 bg-[rgb(var(--color-primary))] text-white rounded-lg">
                Primária
              </div>
              <div className="px-4 py-2 bg-[rgb(var(--color-secondary))] text-white rounded-lg">
                Secundária
              </div>
              <div className="px-4 py-2 bg-[rgb(var(--color-accent))] text-white rounded-lg">
                Destaque
              </div>
            </div>
          </div>
        </div>

        {/* Acessibilidade */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg text-slate-900 dark:text-white">Acessibilidade</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Opções para melhor experiência
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Alto Contraste */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200 dark:bg-gray-600 rounded-lg">
                  <Eye className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-900 dark:text-white">Alto Contraste</div>
                  <div className="text-xs text-slate-600 dark:text-gray-400">
                    Aumenta o contraste para melhor visualização
                  </div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.highContrast
                    ? 'bg-green-500'
                    : 'bg-slate-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Redução de Movimento */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200 dark:bg-gray-600 rounded-lg">
                  <Zap className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-900 dark:text-white">Reduzir Movimento</div>
                  <div className="text-xs text-slate-600 dark:text-gray-400">
                    Minimiza animações e transições
                  </div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.reducedMotion
                    ? 'bg-green-500'
                    : 'bg-slate-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Modo Compacto */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200 dark:bg-gray-600 rounded-lg">
                  <Minimize2 className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-900 dark:text-white">Modo Compacto</div>
                  <div className="text-xs text-slate-600 dark:text-gray-400">
                    Reduz espaçamentos para mais conteúdo na tela
                  </div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ compactMode: !settings.compactMode })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.compactMode
                    ? 'bg-green-500'
                    : 'bg-slate-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.compactMode ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg text-slate-900 dark:text-white">Pré-visualização</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Veja como ficará o aplicativo
              </p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 rounded-xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
              <h4 className="text-slate-900 dark:text-white mb-2">Exemplo de Questão</h4>
              <p className="text-slate-700 dark:text-gray-300 mb-4">
                Qual é a diferença entre TCP e UDP no contexto de protocolos de transporte?
              </p>
              <div className="space-y-2">
                {['TCP é orientado a conexão', 'UDP garante entrega', 'Ambos são idênticos', 'Nenhuma das anteriores'].map((option, index) => (
                  <div key={index} className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg border border-slate-200 dark:border-gray-600">
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Responder
            </button>
          </div>
        </div>

        {/* Informação */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Dica:</strong> Todas as configurações são salvas automaticamente e aplicadas imediatamente em todo o aplicativo.
          </p>
        </div>
      </div>
    </div>
  );
}
