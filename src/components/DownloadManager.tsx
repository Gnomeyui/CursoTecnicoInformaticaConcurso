/**
 * ========================================
 * DOWNLOAD MANAGER - GERENCIADOR DE DOWNLOADS
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Interface visual para download de pacotes
 * - Mostrar progresso e status
 * - Permitir escolher perfil e baixar
 * - Exibir estatísticas do banco local
 * 
 * USO:
 * <DownloadManager />
 * 
 * ONDE USAR:
 * - Tela de Configurações
 * - Tela de Perfis
 * - Primeira execução (onboarding)
 */

import React, { useState, useEffect } from 'react';
import { syncService } from '../services/SyncService';
import { Download, CheckCircle, AlertCircle, RefreshCw, Database, HardDrive } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

// ========================================
// TIPOS
// ========================================

interface DownloadManagerProps {
  perfilAtivo?: {
    cargo: string;
    banca: string;
    nivel: string;
  };
  onDownloadComplete?: () => void;
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export function DownloadManager({ perfilAtivo, onDownloadComplete }: DownloadManagerProps) {
  const [status, setStatus] = useState(syncService.getStatus());
  const [baixando, setBaixando] = useState(false);
  const [stats, setStats] = useState({ questions: 0, exams: 0 });

  // ========================================
  // CARREGAR STATUS E STATS
  // ========================================

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  async function carregarEstatisticas() {
    try {
      const estatisticas = await syncService.getEstatisticas();
      setStats({
        questions: estatisticas.questions,
        exams: estatisticas.exams
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  }

  // ========================================
  // HANDLER: BAIXAR PACOTE
  // ========================================

  async function handleBaixarPacote() {
    if (!perfilAtivo) {
      toast.error('Configure um perfil primeiro');
      return;
    }

    setBaixando(true);

    try {
      const sucesso = await syncService.baixarPacote(perfilAtivo);

      if (sucesso) {
        // Atualizar status e stats
        setStatus(syncService.getStatus());
        await carregarEstatisticas();

        // Callback de sucesso
        onDownloadComplete?.();
      }
    } catch (error) {
      console.error('Erro no download:', error);
    } finally {
      setBaixando(false);
    }
  }

  // ========================================
  // HANDLER: LIMPAR DADOS
  // ========================================

  async function handleLimparDados() {
    if (!confirm('Tem certeza? Isso apagará todas as questões baixadas.')) {
      return;
    }

    try {
      await syncService.limparTudo();
      
      setStatus(syncService.getStatus());
      setStats({ questions: 0, exams: 0 });
      
      toast.success('Dados limpos com sucesso');
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      toast.error('Erro ao limpar dados');
    }
  }

  // ========================================
  // VERIFICAR SE TEM QUESTÕES
  // ========================================

  const temQuestoes = stats.questions > 0;

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-4">
      
      {/* CARD: STATUS DA SINCRONIZAÇÃO */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${temQuestoes ? 'bg-success/20' : 'bg-muted'}`}>
            <Database className={`w-6 h-6 ${temQuestoes ? 'text-success' : 'text-muted-foreground'}`} />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Banco de Questões Local</h3>
              {temQuestoes && (
                <CheckCircle className="w-5 h-5 text-success" />
              )}
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">Questões</div>
                <div className="text-2xl font-bold">{stats.questions.toLocaleString()}</div>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">Provas</div>
                <div className="text-2xl font-bold">{stats.exams}</div>
              </div>
            </div>

            {/* Informações do perfil */}
            {status.perfilAtual && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-sm text-muted-foreground">Perfil Ativo</div>
                <div className="font-medium">{status.perfilAtual}</div>
                {status.ultimaSync && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Atualizado em {new Date(status.ultimaSync).toLocaleString('pt-BR')}
                  </div>
                )}
              </div>
            )}

            {/* Alerta se não tiver questões */}
            {!temQuestoes && (
              <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <div className="font-medium text-warning">Nenhuma questão baixada</div>
                  <div className="text-sm text-muted-foreground">
                    {perfilAtivo 
                      ? 'Clique em "Baixar Questões" para começar'
                      : 'Configure um perfil primeiro em "Perfis de Concurso"'
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* CARD: AÇÕES - OCULTO (download automático ao selecionar perfil) */}
      {false && (
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Ações</h3>
        
        <div className="space-y-3">
          {/* Botão: Baixar/Atualizar Questões */}
          <Button
            onClick={handleBaixarPacote}
            disabled={!perfilAtivo || baixando}
            className="w-full"
            size="lg"
          >
            {baixando ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Baixando...
              </>
            ) : temQuestoes ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Atualizar Questões
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Baixar Questões
              </>
            )}
          </Button>

          {/* Informação do tamanho estimado */}
          {perfilAtivo && !temQuestoes && (
            <div className="text-sm text-muted-foreground text-center">
              Tamanho estimado: ~1-2 MB
            </div>
          )}

          {/* Botão: Limpar Dados */}
          {temQuestoes && (
            <Button
              onClick={handleLimparDados}
              variant="outline"
              className="w-full"
            >
              <HardDrive className="w-5 h-5 mr-2" />
              Limpar Todos os Dados
            </Button>
          )}
        </div>
      </Card>
      )}

      {/* CARD: INFORMAÇÕES */}
      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Como Funciona
        </h3>
        
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">1.</span>
            <span>As questões são baixadas do servidor apenas uma vez</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">2.</span>
            <span>Ficam salvas no seu celular para acesso offline</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">3.</span>
            <span>Não consomem internet durante o estudo</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">4.</span>
            <span>Você pode atualizar quando quiser para pegar questões novas</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

// ========================================
// COMPONENTE COMPACTO (PARA DASHBOARD)
// ========================================

export function DownloadManagerCompact({ onOpenFull }: { onOpenFull?: () => void }) {
  const [temQuestoes, setTemQuestoes] = useState(false);
  const [stats, setStats] = useState({ questions: 0 });

  useEffect(() => {
    async function verificar() {
      const temDados = await syncService.temQuestoes();
      setTemQuestoes(temDados);

      if (temDados) {
        const estatisticas = await syncService.getEstatisticas();
        setStats({ questions: estatisticas.questions });
      }
    }
    verificar();
  }, []);

  if (temQuestoes) {
    return (
      <Card className="p-4 bg-success/10 border-success/20">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success" />
          <div className="flex-1">
            <div className="font-medium">Banco Local Ativo</div>
            <div className="text-sm text-muted-foreground">
              {stats.questions.toLocaleString()} questões disponíveis offline
            </div>
          </div>
          {onOpenFull && (
            <Button onClick={onOpenFull} variant="ghost" size="sm">
              Ver Detalhes
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-warning/10 border-warning/20">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-warning" />
        <div className="flex-1">
          <div className="font-medium">Baixe as Questões</div>
          <div className="text-sm text-muted-foreground">
            Configure seu perfil e baixe o banco de questões
          </div>
        </div>
        {onOpenFull && (
          <Button onClick={onOpenFull} variant="default" size="sm">
            Baixar Agora
          </Button>
        )}
      </div>
    </Card>
  );
}