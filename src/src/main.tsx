import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import '../styles/globals.css';

// Capacitor Imports
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary capturou erro:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#1F2937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '2rem',
            maxWidth: '28rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💥</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Erro Crítico
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
              {this.state.error?.message || 'Algo deu errado'}
            </p>
            <button
              onClick={() => {
                // Limpar todo localStorage e recarregar
                try {
                  localStorage.clear();
                } catch (e) {
                  console.error('Erro ao limpar localStorage:', e);
                }
                window.location.reload();
              }}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Reiniciar App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Configurar Capacitor de forma segura
const initializeApp = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      // Configurar Status Bar
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#3B82F6' });
      } catch (err) {
        console.error('Erro ao configurar StatusBar:', err);
      }
      
      // Esconder splash screen
      try {
        setTimeout(async () => {
          await SplashScreen.hide();
        }, 1500);
      } catch (err) {
        console.error('Erro ao esconder SplashScreen:', err);
      }
    }
  } catch (err) {
    console.error('Erro na inicialização do Capacitor:', err);
  }
};

// Inicializar app
initializeApp();

// Renderizar app com Error Boundary
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Elemento root não encontrado!');
}