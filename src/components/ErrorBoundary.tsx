/**
 * ========================================
 * ErrorBoundary - Captura de Erros React
 * ========================================
 * 
 * Componente de classe que captura erros em toda a árvore
 * de componentes filhos e exibe uma UI de fallback elegante.
 * 
 * Baseado em: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

// ========================================
// TIPOS
// ========================================

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// ========================================
// COMPONENTE
// ========================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Atualiza o estado para renderizar a UI de fallback
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log do erro para serviço de monitoramento (ex: Sentry)
    console.error('🔴 ErrorBoundary capturou erro:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Enviar para serviço de logging (Sentry, LogRocket, etc)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    this.handleReset();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // UI customizada de fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI padrão de erro
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-6">
                
                {/* Ícone de erro */}
                <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>

                {/* Título */}
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Ops! Algo deu errado
                  </h1>
                  <p className="text-muted-foreground">
                    Ocorreu um erro inesperado. Nossa equipe foi notificada.
                  </p>
                </div>

                {/* Detalhes do erro (apenas em DEV) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="w-full">
                    <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Ver detalhes técnicos
                    </summary>
                    <div className="mt-4 p-4 bg-muted rounded-lg text-left overflow-auto max-h-60">
                      <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo && (
                        <pre className="text-xs text-muted-foreground overflow-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    onClick={this.handleReset}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Tentar Novamente
                  </Button>
                  
                  <Button
                    onClick={this.handleGoHome}
                    className="w-full sm:w-auto"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Voltar ao Início
                  </Button>
                </div>

                {/* Mensagem de suporte */}
                <p className="text-xs text-muted-foreground">
                  Se o problema persistir, entre em contato com o suporte.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// ========================================
// VARIANTE FUNCIONAL (HOC)
// ========================================

/**
 * HOC para envolver componentes individuais com ErrorBoundary
 * 
 * Uso:
 * export default withErrorBoundary(MeuComponente);
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
