import React from 'react';
import { ArrowLeft, Palette, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CustomizationProps {
  onBack: () => void;
}

export function Customization({ onBack }: CustomizationProps) {
  const { currentTheme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  const themes = [
    // --- APP PADRÃO ---
    {
      id: 'default' as const,
      name: 'Clássico',
      colors: 'from-blue-500 to-blue-600',
      preview: 'bg-blue-500',
    },
    {
      id: 'modern' as const,
      name: 'Moderno (Premium)',
      colors: 'from-indigo-500 to-indigo-600',
      preview: 'bg-indigo-500',
    },
    
    // --- MODOS DE ESTUDO ---
    {
      id: 'focus' as const,
      name: 'Foco Total',
      colors: 'from-amber-500 to-amber-600',
      preview: 'bg-amber-500',
    },
    {
      id: 'calm' as const,
      name: 'Anti-Ansiedade',
      colors: 'from-teal-500 to-teal-600',
      preview: 'bg-teal-500',
    },
    {
      id: 'reading' as const,
      name: 'Leitura Suave',
      colors: 'from-slate-500 to-slate-600',
      preview: 'bg-slate-500',
    },

    // --- OUTROS ---
    {
      id: 'forest' as const,
      name: 'Floresta',
      colors: 'from-emerald-500 to-emerald-600',
      preview: 'bg-emerald-500',
    },
    {
      id: 'ocean' as const,
      name: 'Oceano',
      colors: 'from-cyan-500 to-cyan-600',
      preview: 'bg-cyan-500',
    },
    {
      id: 'sunset' as const,
      name: 'Pôr do Sol',
      colors: 'from-red-500 to-orange-500',
      preview: 'bg-gradient-to-r from-red-500 to-orange-500',
    },
    {
      id: 'purple' as const,
      name: 'Criativo',
      colors: 'from-purple-500 to-pink-500',
      preview: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6 text-gray-700 dark:text-gray-300" />
        </button>
        <div>
          <h1 className="text-2xl">Personalização</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Customize a aparência do app
          </p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDarkMode ? (
              <Moon className="size-6 text-blue-500" />
            ) : (
              <Sun className="size-6 text-yellow-500" />
            )}
            <div>
              <h3 className="text-lg">Modo Escuro</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isDarkMode ? 'Ativado' : 'Desativado'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                isDarkMode ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="size-6 text-purple-500" />
          <h3 className="text-lg">Tema de Cores</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                currentTheme === theme.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${theme.preview}`} />
              <p className="text-sm text-center">{theme.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-lg mb-4">Prévia</h3>
        
        <div className="space-y-3">
          <button
            disabled
            className={`w-full bg-gradient-to-r ${
              themes.find(t => t.id === currentTheme)?.colors
            } text-white rounded-xl p-4`}
          >
            Botão Principal
          </button>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Este é um exemplo de card com o tema atual aplicado.
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Dica:</strong> As configurações de tema são salvas automaticamente e 
          serão mantidas mesmo após fechar o aplicativo.
        </p>
      </div>
    </div>
  );
}