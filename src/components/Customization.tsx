import React from 'react';
import { ArrowLeft, Check, Type, Palette, Sparkles, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { useTheme } from '../context/ThemeContext';

interface CustomizationProps {
  onBack: () => void;
}

const THEME_PRESETS = [
  { 
    id: 'default' as const, 
    name: 'Azul Concurso', 
    description: 'Clássico e confiável',
    class: 'bg-blue-600',
    gradient: 'from-blue-500 to-blue-600'
  },
  { 
    id: 'modern' as const, 
    name: 'Índigo Premium', 
    description: 'Moderno e sofisticado',
    class: 'bg-indigo-600',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  { 
    id: 'forest' as const, 
    name: 'Verde Aprovação', 
    description: 'Motivação e crescimento',
    class: 'bg-emerald-600',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  { 
    id: 'sunset' as const, 
    name: 'Pôr do Sol', 
    description: 'Energia e criatividade',
    class: 'bg-gradient-to-r from-red-500 to-orange-500',
    gradient: 'from-red-500 to-orange-500'
  },
  { 
    id: 'purple' as const, 
    name: 'Roxo Criativo', 
    description: 'Inspiração e inovação',
    class: 'bg-gradient-to-r from-purple-500 to-pink-500',
    gradient: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'ocean' as const, 
    name: 'Oceano Azul', 
    description: 'Calma e foco',
    class: 'bg-cyan-600',
    gradient: 'from-cyan-500 to-cyan-600'
  },
];

const SPECIAL_MODES = [
  { 
    id: 'focus' as const, 
    name: 'Foco Total', 
    description: 'Contraste máximo para estudo',
    class: 'bg-amber-600',
    gradient: 'from-amber-500 to-amber-600',
    icon: '🎯'
  },
  { 
    id: 'calm' as const, 
    name: 'Anti-Ansiedade', 
    description: 'Verde-água suave',
    class: 'bg-teal-600',
    gradient: 'from-teal-500 to-teal-600',
    icon: '🧘'
  },
  { 
    id: 'reading' as const, 
    name: 'Modo Leitura', 
    description: 'Sépia para conforto visual',
    class: 'bg-slate-600',
    gradient: 'from-slate-500 to-slate-600',
    icon: '📖'
  },
];

export function Customization({ onBack }: CustomizationProps) {
  const { currentTheme, setTheme, isDarkMode } = useTheme();
  const [fontSize, setFontSize] = React.useState([16]);

  // Carregar tamanho da fonte salvo
  React.useEffect(() => {
    const saved = localStorage.getItem('alerr_font_size');
    if (saved) {
      setFontSize([Number(saved)]);
    }
  }, []);

  // Salvar tamanho da fonte
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    localStorage.setItem('alerr_font_size', value[0].toString());
    // Aplicar no document root para afetar todo o app
    document.documentElement.style.setProperty('--base-font-size', `${value[0]}px`);
  };

  const currentThemeData = [...THEME_PRESETS, ...SPECIAL_MODES].find(t => t.id === currentTheme);

  return (
    <div className="min-h-screen bg-app animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="bg-card-theme p-4 shadow-sm sticky top-0 z-10 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={24} />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-app">Personalização</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Customize o visual do app
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto pb-24">

        {/* 1. Temas Principais */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="size-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-app">Temas de Cores</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {THEME_PRESETS.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`
                  relative rounded-xl overflow-hidden transition-all shadow-sm
                  ${currentTheme === theme.id 
                    ? 'ring-4 ring-blue-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900 scale-[1.02]' 
                    : 'hover:scale-[1.01] active:scale-[0.98]'
                  }
                `}
              >
                {/* Cor de fundo */}
                <div className={`h-24 ${theme.class} flex items-center justify-center relative`}>
                  <span className="text-white font-bold text-lg drop-shadow-md">
                    {theme.name}
                  </span>
                  
                  {/* Check mark */}
                  {currentTheme === theme.id && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-1 shadow-lg animate-in zoom-in duration-200">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </div>
                
                {/* Descrição */}
                <div className="bg-white dark:bg-gray-800 p-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    {theme.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Modos Especiais */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-app">Modos Especiais de Estudo</h2>
          </div>
          
          <div className="space-y-3">
            {SPECIAL_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id)}
                className={`
                  w-full rounded-xl overflow-hidden transition-all shadow-sm
                  ${currentTheme === mode.id 
                    ? 'ring-4 ring-purple-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900' 
                    : 'hover:scale-[1.01] active:scale-[0.98]'
                  }
                `}
              >
                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4">
                  {/* Ícone grande */}
                  <div className={`w-16 h-16 ${mode.class} rounded-xl flex items-center justify-center text-3xl shadow-md`}>
                    {mode.icon}
                  </div>
                  
                  {/* Texto */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {mode.name}
                      </h3>
                      {currentTheme === mode.id && (
                        <Check size={18} className="text-purple-600 dark:text-purple-400" strokeWidth={3} />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Tamanho da Fonte */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Type className="size-5 text-green-500" />
            <h2 className="text-lg font-semibold text-app">Tamanho do Texto</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="text-center">
                  <Type size={14} className="text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">Pequeno</span>
                </div>
                <div className="text-center">
                  <Type size={20} className="text-gray-600 dark:text-gray-300 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">Médio</span>
                </div>
                <div className="text-center">
                  <Type size={28} className="text-gray-900 dark:text-white mx-auto mb-1" />
                  <span className="text-xs text-gray-500">Grande</span>
                </div>
              </div>
              
              <Slider 
                value={fontSize}
                max={24} 
                min={12} 
                step={2} 
                onValueChange={handleFontSizeChange}
                className="py-4"
              />
              
              <div className="text-center mt-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tamanho atual: 
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 ml-1">
                  {fontSize[0]}px
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. Pré-visualização */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Eye className="size-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-app">Pré-visualização</h2>
          </div>
          
          <Card className="overflow-hidden">
            <CardContent className="p-6 space-y-4">
              
              {/* Título da questão */}
              <div>
                <h3 
                  className={`font-bold mb-2 bg-gradient-to-r ${currentThemeData?.gradient || 'from-blue-500 to-blue-600'} bg-clip-text text-transparent`}
                  style={{ fontSize: `${fontSize[0] + 4}px` }}
                >
                  Questão 15 - Informática
                </h3>
                <p 
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  Qual protocolo é utilizado para transferência segura de arquivos através da internet, 
                  garantindo criptografia ponta-a-ponta?
                </p>
              </div>
              
              {/* Opções */}
              <div className="space-y-2">
                <div 
                  className={`p-3 rounded-lg bg-gradient-to-r ${currentThemeData?.gradient || 'from-blue-500 to-blue-600'} 
                    border-2 border-transparent text-white font-medium shadow-md`}
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  A) HTTPS (Opção Selecionada)
                </div>
                <div 
                  className="p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 
                    text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800"
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  B) HTTP
                </div>
                <div 
                  className="p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 
                    text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800"
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  C) FTP
                </div>
              </div>

              {/* Feedback */}
              <div 
                className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 
                  rounded-lg p-3 flex items-center gap-2"
              >
                <Check size={20} className="text-green-600 dark:text-green-400" />
                <span 
                  className="font-semibold text-green-800 dark:text-green-300"
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  Resposta Correta! +10 XP
                </span>
              </div>

            </CardContent>
          </Card>

          {/* Info adicional */}
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Dica:</strong> As alterações são aplicadas em tempo real e salvas automaticamente. 
              Experimente diferentes combinações até encontrar o visual perfeito para você!
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
