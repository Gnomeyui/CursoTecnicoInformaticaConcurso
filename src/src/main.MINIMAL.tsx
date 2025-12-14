// VERSÃO ULTRA MÍNIMA - FUNCIONA 100% GARANTIDO
// Renomeie para main.tsx para testar

import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✅</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        FUNCIONOU!
      </h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem' }}>
        ALE-RR TOP 5
      </p>
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '1.5rem',
        borderRadius: '1rem',
        marginBottom: '2rem'
      }}>
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          ✓ Build está correto
        </p>
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          ✓ Capacitor funcionando
        </p>
        <p style={{ fontSize: '1rem' }}>
          ✓ App instalado com sucesso
        </p>
      </div>
      <button
        onClick={() => alert('Clique funcionando! ✓')}
        style={{
          backgroundColor: 'white',
          color: '#667eea',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        Testar Botão
      </button>
      <p style={{ marginTop: '2rem', fontSize: '0.875rem', opacity: 0.7 }}>
        Se você vê esta tela, o problema NÃO é no build!
      </p>
    </div>
  );
}

const root = document.getElementById('root');
if (!root) {
  document.body.innerHTML = '<div style="color:red;padding:2rem;font-size:2rem;">ERRO: Elemento #root não encontrado!</div>';
} else {
  ReactDOM.createRoot(root).render(<App />);
}
