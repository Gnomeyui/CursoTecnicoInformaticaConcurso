/**
 * Utilitário para limpar completamente dados do simulado
 * 
 * USO:
 * - Limpa backup do localStorage
 * - Remove histórico de exames
 * - Reseta estado do simulado
 */

export function clearSimulatedExamData() {
  console.log('🧹 Limpando dados do simulado...');
  
  // Remover backup de simulado em andamento
  localStorage.removeItem('exam_backup');
  
  // Opcional: Limpar histórico (descomente se necessário)
  // localStorage.removeItem('exam_history');
  
  console.log('✅ Dados do simulado limpos');
}

/**
 * Limpa TODOS os dados do app (use com cuidado!)
 */
export function clearAllAppData() {
  console.log('🧹 LIMPANDO TODOS OS DADOS DO APP...');
  
  // Dados do simulado
  localStorage.removeItem('exam_backup');
  localStorage.removeItem('exam_history');
  
  // Dados do quiz
  localStorage.removeItem('quiz_backup');
  
  // Dados de progresso (GameContext)
  localStorage.removeItem('alerr_game_data');
  
  // Dados de estatísticas (StatsContext)
  localStorage.removeItem('alerr_stats');
  
  // Questões erradas (WrongQuestionsContext)
  localStorage.removeItem('alerr_wrong_questions');
  
  // Personalização
  localStorage.removeItem('alerr_customization');
  
  // Perfil de concurso
  localStorage.removeItem('alerr_active_profile');
  localStorage.removeItem('alerr_profiles');
  
  // Notificações
  localStorage.removeItem('alerr_notification_settings');
  localStorage.removeItem('alerr_pending_questions');
  
  console.log('✅ TODOS OS DADOS LIMPOS! Recarregue a página.');
  
  return true;
}
