/**
 * ========================================
 * CUSTOMIZATION - TELA DE APARÊNCIA
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Exibir seletor de temas visuais
 * - Aplicar tema selecionado em tempo real
 * - Mostrar preview das cores de cada tema
 * 
 * ⚠️ IMPORTANTE PARA APK:
 * - Usa INLINE STYLES com cores HEX
 * - NÃO usa classes Tailwind para cores de tema
 * - Isso GARANTE que as cores funcionem no APK
 * 
 * COMO FUNCIONA:
 * 1. Usuário clica em um tema
 * 2. setPrimaryColor() atualiza CustomizationContext
 * 3. Context aplica data-theme no <html>
 * 4. Variáveis CSS --primary são atualizadas
 * 5. Preview usa theme.primaryHex (inline style)
 */

import React from 'react';
import { ArrowLeft, Check, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES, ThemeType, getThemeGradient } from '../lib/themeConfig';

interface CustomizationProps {
  onBack: () => void;
}

export function Customization({ onBack }: CustomizationProps) {
  const { primaryColor, setPrimaryColor } = useCustomization();

  return (
    <div className="min-h-screen bg-background pb-20 animate-in slide-in-from-right">
      
      {/* ========================================
          HEADER
          ======================================== */}
      <div className="bg-background/80 backdrop-blur-md p-4 sticky top-0 z-10 flex items-center gap-4 border-b border-border">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack} 
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Aparência</h1>
          <p className="text-xs text-muted-foreground">Escolha a sua atmosfera de estudo</p>
        </div>
      </div>

      <div className="p-6 max-w-xl mx-auto space-y-8">

        {/* ========================================
            SELETOR DE TEMAS
            ======================================== */}
        <section>
          <h2 className="text-sm font-bold text-muted-foreground uppercase mb-4 tracking-wider flex items-center gap-2">
            <Palette size={16} /> Paleta de Cores
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {(Object.keys(APP_THEMES) as ThemeType[]).map((themeKey) => {
              const theme = APP_THEMES[themeKey];
              const isSelected = primaryColor === themeKey;
              
              return (
                <button
                  key={themeKey}
                  onClick={() => setPrimaryColor(themeKey)}
                  className={`
                    relative group flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-300 text-left
                    ${isSelected 
                      ? `border-primary bg-primary/5 shadow-md scale-[1.02]` 
                      : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
                    }
                  `}
                >
                  {/* ========================================
                      PREVIEW DA COR (INLINE STYLE)
                      
                      ⚠️ CRÍTICO PARA APK:
                      - Usa style={{ background }} com gradiente CSS
                      - NÃO usa classes Tailwind ${theme.gradient}
                      - Cores são HEXADECIMAIS diretas do theme
                      - Isso GARANTE que funcione no APK!
                      ======================================== */}
                  <div 
                    className="w-full h-12 rounded-xl mb-3 shadow-sm group-hover:opacity-90 transition-opacity"
                    style={{
                      background: getThemeGradient(themeKey)
                    }}
                  />
                  
                  {/* Nome do tema */}
                  <span className={`font-bold text-sm ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {theme.name}
                  </span>
                  
                  {/* Descrição do tema */}
                  <span className="text-[10px] text-muted-foreground leading-tight mt-1 opacity-80">
                    {theme.description}
                  </span>

                  {/* ========================================
                      CHECK MARK (SE SELECIONADO)
                      
                      ⚠️ USA bg-primary (variável CSS)
                      Isso funciona porque o data-theme já foi aplicado
                      ======================================== */}
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

        {/* ========================================
            INFORMAÇÃO CIENTÍFICA
            ======================================== */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-foreground">
            🧠 <strong>Ciência das Cores:</strong> Cada paleta foi projetada para otimizar sua cognição:
          </p>
          <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
            <li>• <strong>Concentração Profunda:</strong> Azul petróleo reduz ansiedade em sessões longas</li>
            <li>• <strong>Calma Cognitiva:</strong> Verde musgo favorece memorização e leitura</li>
            <li>• <strong>Alta Atenção:</strong> Verde vibrante aumenta alerta sem estresse</li>
            <li>• <strong>Minimalismo Neutro:</strong> Cinza elimina distrações visuais</li>
            <li>• <strong>Modo Noturno:</strong> Azul claro protege seus olhos à noite</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
