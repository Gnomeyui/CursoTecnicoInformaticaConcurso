// APP DE TESTE MÍNIMO - Use para diagnosticar crash
// Renomeie para App.tsx se quiser testar

import React from 'react';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem'
      }}>
        ✅
      </div>
      
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        APP FUNCIONANDO!
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        marginBottom: '2rem',
        opacity: 0.9,
        textAlign: 'center'
      }}>
        ALE-RR TOP 5
      </p>
      
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '1rem',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          ✓ React carregado
        </p>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          ✓ Capacitor funcionando
        </p>
        <p style={{ fontSize: '0.875rem' }}>
          ✓ Build correto
        </p>
      </div>
      
      <button
        onClick={() => {
          alert('Botão funcionando! ✓');
        }}
        style={{
          marginTop: '2rem',
          backgroundColor: 'white',
          color: '#667eea',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Testar Interação
      </button>
      
      <p style={{
        marginTop: '2rem',
        fontSize: '0.75rem',
        opacity: 0.7
      }}>
        Se você vê esta tela, o build está correto!
      </p>
    </div>
  );
}
