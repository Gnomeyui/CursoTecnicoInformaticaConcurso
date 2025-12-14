import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
import '../styles/globals.css';

// Capacitor Imports
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

// 1. ERROR BOUNDARY - Proteção contra crashes
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
    console.error("🔥 ERRO CRÍTICO NO APP:", error, errorInfo);
  }

  handleReset = () => {
    // Limpa TUDO que pode estar corrompido
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error("Erro ao limpar storage:", e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', fontWeight: 'bold' }}>
            Opa, algo deu errado!
          </h2>
          <p style={{ 
            color: '#aaa', 
            marginBottom: '20px', 
            maxWidth: '300px',
            fontSize: '0.875rem' 
          }}>
            {this.state.error?.message || "Erro desconhecido na inicialização"}
          </p>
          <button 
            onClick={this.handleReset}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            REINICIAR E LIMPAR DADOS
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 2. INICIALIZAÇÃO SEGURA DO CAPACITOR
const initializeCapacitor = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      console.log("📱 Iniciando plugins do Capacitor...");
      
      // Status Bar
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#3B82F6' });
        console.log("✓ StatusBar configurado");
      } catch (err) {
        console.error("❌ Erro no StatusBar:", err);
      }
      
      // Splash Screen
      try {
        setTimeout(async () => {
          await SplashScreen.hide();
          console.log("✓ SplashScreen ocultado");
        }, 1500);
      } catch (err) {
        console.error("❌ Erro no SplashScreen:", err);
      }
    }
  } catch (err) {
    console.error("❌ Erro geral no Capacitor:", err);
  }
};

// 3. RENDERIZAÇÃO SEGURA
const container = document.getElementById('root');

if (!container) {
  // Se não encontrar #root, mostrar erro direto no body
  document.body.innerHTML = `
    <div style="
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1a1a;
      color: white;
      font-family: sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">⚠️</h1>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Erro Fatal</h2>
        <p style="color: #aaa;">Elemento #root não encontrado no HTML</p>
      </div>
    </div>
  `;
} else {
  // Inicializar Capacitor
  initializeCapacitor();
  
  // Criar root e renderizar
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log("✅ App renderizado com sucesso!");
}
