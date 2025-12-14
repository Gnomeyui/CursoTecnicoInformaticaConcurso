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
    console.error("🔥 ERRO CRÍTICO CAPTURADO:", error, errorInfo);
  }

  handleReset = () => {
    // Limpa dados que podem estar travando o app
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
          backgroundColor: '#111827',
          color: '#fff',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>⚠️</h1>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Algo deu errado na inicialização
          </h2>
          <p style={{ 
            color: '#9CA3AF', 
            margin: '20px 0', 
            fontSize: '0.9rem', 
            maxWidth: '300px', 
            wordBreak: 'break-word' 
          }}>
            {this.state.error?.message || "Erro desconhecido"}
          </p>
          <button 
            onClick={this.handleReset}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            LIMPAR DADOS E REINICIAR
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
      background: #111827;
      color: white;
      font-family: sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">⚠️</h1>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Erro Fatal</h2>
        <p style="color: #9CA3AF;">Elemento #root não encontrado no HTML</p>
      </div>
    </div>
  `;
} else {
  // Inicializar Capacitor
  initializeCapacitor();
  
  // Criar root e renderizar com ErrorBoundary
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
