/**
 * HISTÓRICO DE MENSAGENS (ANTI-REPETIÇÃO)
 * 
 * Garante que o usuário não veja a mesma mensagem
 * em menos de 14 dias (ou 20 notificações)
 */

const HISTORY_KEY = 'notification_history';
const MAX_HISTORY = 20; // Mantém as últimas 20 mensagens

export function getHistory(): string[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao carregar histórico de notificações:', error);
    return [];
  }
}

export function saveHistory(message: string): void {
  try {
    const history = getHistory();
    const updated = [message, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Erro ao salvar histórico de notificações:', error);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Erro ao limpar histórico de notificações:', error);
  }
}
