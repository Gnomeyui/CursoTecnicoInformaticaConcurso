/**
 * ========================================
 * THEME UTILS - UTILITÁRIOS DE TEMA
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Fornecer estilos inline que FUNCIONAM no APK
 * - Converter classes Tailwind em CSS direto
 * - Garantir compatibilidade total com WebView Android
 * 
 * ⚠️ IMPORTANTE:
 * - Use estas funções em vez de classes Tailwind
 * - Inline styles SEMPRE funcionam no APK
 * - Classes Tailwind arbitrárias podem falhar
 * 
 * USO:
 * const styles = getThemeStyles(theme);
 * <div style={styles.gradient}>...</div>
 */

import { APP_THEMES, ThemeType } from './themeConfig';

/**
 * Interface de estilos inline para React
 */
export interface ThemeInlineStyles {
  /** Gradiente de fundo (CSSProperties) */
  gradient: React.CSSProperties;
  
  /** Cor primária (CSSProperties) */
  primaryColor: React.CSSProperties;
  
  /** Background primário (CSSProperties) */
  primaryBg: React.CSSProperties;
  
  /** Background suave (CSSProperties) */
  lightBg: React.CSSProperties;
  
  /** Barra de progresso (CSSProperties) */
  progressBar: React.CSSProperties;
  
  /** Ícone colorido (CSSProperties) */
  iconColor: React.CSSProperties;
  
  /** Borda colorida (CSSProperties) */
  border: React.CSSProperties;
}

/**
 * Retorna estilos inline prontos para usar no JSX
 * 
 * ✅ GARANTIDO PARA APK
 * 
 * @param themeKey - Nome do tema
 * @returns Objeto com estilos inline
 * 
 * EXEMPLO:
 * const { theme } = useCustomization();
 * const styles = getThemeInlineStyles(theme.colorTheme);
 * 
 * <div style={styles.gradient}>
 *   <h1 style={styles.primaryColor}>Título</h1>
 * </div>
 */
export function getThemeInlineStyles(themeKey: ThemeType): ThemeInlineStyles {
  const theme = APP_THEMES[themeKey];
  
  return {
    // Gradiente de fundo
    gradient: {
      background: `linear-gradient(135deg, ${theme.primaryHex} 0%, ${theme.secondaryHex} 100%)`
    },
    
    // Cor de texto primária
    primaryColor: {
      color: theme.primaryHex
    },
    
    // Background sólido primário
    primaryBg: {
      backgroundColor: theme.primaryHex
    },
    
    // Background suave/claro
    lightBg: {
      backgroundColor: theme.bgLightHex
    },
    
    // Barra de progresso
    progressBar: {
      backgroundColor: theme.primaryHex
    },
    
    // Cor de ícone
    iconColor: {
      color: theme.primaryHex
    },
    
    // Borda colorida
    border: {
      borderColor: theme.primaryHex
    }
  };
}

/**
 * Retorna cor HEX do tema
 * Útil para usar em style={{ color: getThemeColor() }}
 * 
 * @param themeKey - Nome do tema
 * @returns Cor em formato HEX
 */
export function getThemeColor(themeKey: ThemeType): string {
  return APP_THEMES[themeKey].primaryHex;
}

/**
 * Retorna gradiente CSS do tema
 * Útil para usar em style={{ background: getThemeGradient() }}
 * 
 * @param themeKey - Nome do tema
 * @returns String de gradiente CSS
 */
export function getThemeGradient(themeKey: ThemeType): string {
  const { primaryHex, secondaryHex } = APP_THEMES[themeKey];
  return `linear-gradient(135deg, ${primaryHex} 0%, ${secondaryHex} 100%)`;
}

/**
 * Retorna objeto de estilo para usar diretamente
 * 
 * EXEMPLO:
 * <div style={getGradientStyle(theme)}>...</div>
 */
export function getGradientStyle(themeKey: ThemeType): React.CSSProperties {
  return {
    background: getThemeGradient(themeKey)
  };
}

/**
 * Retorna estilo de cor de texto
 * 
 * EXEMPLO:
 * <h1 style={getTextColorStyle(theme)}>Título</h1>
 */
export function getTextColorStyle(themeKey: ThemeType): React.CSSProperties {
  return {
    color: getThemeColor(themeKey)
  };
}

/**
 * Retorna estilo de background sólido
 * 
 * EXEMPLO:
 * <button style={getBgColorStyle(theme)}>Botão</button>
 */
export function getBgColorStyle(themeKey: ThemeType): React.CSSProperties {
  return {
    backgroundColor: getThemeColor(themeKey)
  };
}
