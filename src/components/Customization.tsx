import React from 'react';
import { ArrowLeft, Check, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES, ThemeType } from '../lib/themeConfig';

interface CustomizationProps {
  onBack: () => void;
}

export function Customization({ onBack }: CustomizationProps) {
  const { primaryColor, setPrimaryColor } = useCustomization();

  return (
    <div className="min-h-screen bg-background pb-20 animate-in slide-in-from-right">
      
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-md p-4 sticky top-0 z-10 flex items-center gap-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-muted">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Aparência</h1>
          <p className="text-xs text-muted-foreground">Escolha a sua atmosfera de estudo</p>
        </div>
      </div>

      <div className="p-6 max-w-xl mx-auto space-y-8">

        {/* 1. SELETOR DE TEMAS (GRID 8 OPÇÕES) */}
        <section>
          <h2 className="text-sm font-bold text-muted-foreground uppercase mb-4 tracking-wider flex items-center gap-2">
            <Palette size={16} /> Paleta de Cores
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {(Object.keys(APP_THEMES) as ThemeType[]).map((key) => {
              const theme = APP_THEMES[key];
              const isSelected = primaryColor === key;
              
              return (
                <button
                  key={key}
                  onClick={() => setPrimaryColor(key)}
                  className={`
                    relative group flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-300 text-left
                    ${isSelected 
                      ? `border-primary bg-primary/5 shadow-md scale-[1.02]` 
                      : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
                    }
                  `}
                >
                  {/* Bolinha de Cor */}
                  <div className={`w-full h-12 rounded-xl mb-3 bg-gradient-to-r ${theme.gradient} shadow-sm group-hover:opacity-90 transition-opacity`} />
                  
                  <span className={`font-bold text-sm ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {theme.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight mt-1 opacity-80">
                    {theme.description}
                  </span>

                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1 shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Info adicional */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-foreground">
            💡 <strong>Dica Científica:</strong> Escolha cores baseadas no seu objetivo:
          </p>
          <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
            <li>• <strong>Azul/Ciano:</strong> Concentração e raciocínio lógico</li>
            <li>• <strong>Verde:</strong> Reduz ansiedade em revisões</li>
            <li>• <strong>Roxo:</strong> Estimula criatividade</li>
            <li>• <strong>Laranja:</strong> Energia quando estiver com sono</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
