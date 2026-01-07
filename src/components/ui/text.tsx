import React from 'react';

/**
 * SISTEMA DE TEXTO COM CONTRASTE GARANTIDO
 * 
 * Regras:
 * - Light Mode: Fundo branco (#fff) → Texto preto (#000) ou cinza escuro (30%)
 * - Dark Mode: Fundo preto (#0a0f1a) → Texto branco (#fff) ou cinza claro (85%)
 */

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'muted';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function Text({ 
  children, 
  variant = 'primary', 
  as: Component = 'p',
  className = '',
  ...props 
}: TextProps) {
  
  const variantClasses = {
    // Texto principal: Preto em light / Branco em dark
    primary: 'text-foreground', // #000 / #fff
    
    // Texto secundário: Cinza escuro em light / Cinza claro em dark
    secondary: 'text-muted-foreground', // 30% / 85%
    
    // Texto mutado: Ainda legível mas mais suave
    muted: 'text-muted-foreground/80'
  };

  return (
    <Component 
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * HEADING COM CONTRASTE MÁXIMO
 * Sempre usa text-foreground para garantir preto/branco
 */
export function Heading({ 
  children, 
  as: Component = 'h2',
  className = '',
  ...props 
}: TextProps) {
  return (
    <Component 
      className={`text-foreground font-bold ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * SUBTÍTULO COM CONTRASTE GARANTIDO
 * Usa muted-foreground mas sempre legível
 */
export function Subtext({ 
  children, 
  className = '',
  ...props 
}: Omit<TextProps, 'as' | 'variant'>) {
  return (
    <p 
      className={`text-muted-foreground text-sm ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * LABEL COM CONTRASTE GARANTIDO
 * Para formulários e inputs
 */
export function Label({ 
  children, 
  htmlFor,
  className = '',
  ...props 
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label 
      htmlFor={htmlFor}
      className={`text-foreground font-medium text-sm ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
