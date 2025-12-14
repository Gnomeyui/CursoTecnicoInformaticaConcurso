import React from 'react';
import { useEngineEstudos } from '../hooks/useEngineEstudos';
import { getTodosBancoQuestoes, getEstatisticasBanco } from '../lib/adaptadores';
import { Brain, TrendingUp, AlertCircle, RotateCcw, Target } from 'lucide-react';

/**
 * Painel de Debug/Estatísticas da Engine de Estudos
 * Use este componente para visualizar o funcionamento do algoritmo
 */
export function EngineDebugPanel() {
  const { perfil, getEstatisticas, resetarPerfil, gerarSessao } = useEngineEstudos();
  
  const banco = getTodosBancoQuestoes();
  const estatsBanco = getEstatisticasBanco(banco);
  const estatsUsuario = getEstatisticas();

  const testarSessao = () => {
    const sessao = gerarSessao(banco, 10);
    console.log('🎯 SESSÃO GERADA:', sessao);
    alert(`Sessão de 10 questões gerada! Veja o console (F12)`);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-700">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Engine de Estudos Inteligente
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sistema Adaptativo com Nivelamento e Embaralhamento
          </p>
        </div>
      </div>

      {/* Estatísticas do Banco */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          Banco de Questões
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total:</span>
            <span className="ml-2 font-bold text-blue-600 dark:text-blue-400">
              {estatsBanco.total}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Matérias:</span>
            <span className="ml-2 font-bold text-green-600 dark:text-green-400">
              {estatsBanco.materiasUnicas}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Questões:</span>
            <span className="ml-2 font-bold text-purple-600 dark:text-purple-400">
              {estatsBanco.porTipo.QUESTAO}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Flashcards:</span>
            <span className="ml-2 font-bold text-pink-600 dark:text-pink-400">
              {estatsBanco.porTipo.FLASHCARD}
            </span>
          </div>
        </div>
      </div>

      {/* Estatísticas do Usuário */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Seu Progresso
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Respondidas:</span>
            <span className="ml-2 font-bold text-emerald-600 dark:text-emerald-400">
              {estatsUsuario.totalRespondidas}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Erros:</span>
            <span className="ml-2 font-bold text-red-600 dark:text-red-400">
              {estatsUsuario.totalErros}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600 dark:text-gray-400">Taxa de Acerto:</span>
            <span className="ml-2 font-bold text-blue-600 dark:text-blue-400">
              {estatsUsuario.totalRespondidas > 0
                ? (((estatsUsuario.totalRespondidas - estatsUsuario.totalErros) / estatsUsuario.totalRespondidas) * 100).toFixed(1)
                : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Matérias com Mais Erros */}
      {estatsUsuario.materiasMaisErradas.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Matérias com Mais Erros (Prioridade)
          </h4>
          <div className="space-y-2">
            {estatsUsuario.materiasMaisErradas.map((m, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300 truncate">
                    {m.materia}
                  </span>
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    {m.taxa.toFixed(0)}% erro
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${m.taxa}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ações */}
      <div className="flex gap-2">
        <button
          onClick={testarSessao}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all active:scale-95"
        >
          Testar Sessão (10q)
        </button>
        <button
          onClick={resetarPerfil}
          className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-all active:scale-95"
          title="Resetar Perfil"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Info Técnica */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <p className="text-xs text-blue-800 dark:text-blue-300">
          <strong>🧠 Algoritmo Ativo:</strong> O sistema usa <em>peso adaptativo</em> baseado na sua taxa de erro por matéria. 
          Quanto mais você erra, mais a matéria volta. A proporção de revisão é: 5q→1rev, 10q→3rev, 50q→20rev.
        </p>
      </div>
    </div>
  );
}
