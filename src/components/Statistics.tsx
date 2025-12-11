import React, { useState } from 'react';
import { 
  ArrowLeft, TrendingUp, Target, Award, Brain, Calendar,
  BarChart3, PieChart, Activity, Zap
} from 'lucide-react';
import { useStats } from '../context/StatsContext';
import { useTheme } from '../context/ThemeContext';
import { 
  LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface StatisticsProps {
  onBack: () => void;
}

export function Statistics({ onBack }: StatisticsProps) {
  const { detailedStats } = useStats();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'progress'>('overview');

  // Cores para os gráficos
  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

  // Preparar dados para gráfico de progresso diário (últimos 14 dias)
  const dailyProgressData = detailedStats.dailyStats.slice(-14).map(day => ({
    date: new Date(day.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    questões: day.questionsAnswered,
    acertos: day.correctAnswers,
    taxa: Math.round(day.accuracy)
  }));

  // Preparar dados para gráfico de pizza (matérias)
  const subjectPieData = detailedStats.subjectStats
    .sort((a, b) => b.totalQuestions - a.totalQuestions)
    .slice(0, 6)
    .map(subject => ({
      name: subject.subject.split(' - ')[0],
      value: subject.totalQuestions
    }));

  // Calcular estatísticas gerais
  const totalQuestions = detailedStats.subjectStats.reduce((sum, s) => sum + s.totalQuestions, 0);
  const totalCorrect = detailedStats.subjectStats.reduce((sum, s) => sum + s.correctAnswers, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalStudyDays = detailedStats.dailyStats.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-slate-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-2xl text-slate-900 dark:text-white">Estatísticas</h1>
              <p className="text-sm text-slate-600 dark:text-gray-400">Análise detalhada do seu desempenho</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Visão Geral
              </div>
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'subjects'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Por Matéria
              </div>
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'progress'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Progresso
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        {/* Visão Geral */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cards de Resumo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-2xl text-slate-900 dark:text-white">{totalQuestions}</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Questões</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="text-2xl text-slate-900 dark:text-white">{overallAccuracy}%</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Acurácia</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="text-2xl text-slate-900 dark:text-white">{totalStudyDays}</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Dias de Estudo</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="text-2xl text-slate-900 dark:text-white">{totalCorrect}</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Acertos</div>
              </div>
            </div>

            {/* Gráfico de Progresso Diário */}
            {dailyProgressData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Progresso dos Últimos 14 Dias
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="date" 
                      stroke={isDarkMode ? '#9ca3af' : '#64748b'}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke={isDarkMode ? '#9ca3af' : '#64748b'}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="questões" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Questões"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="acertos" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Acertos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Top 5 Matérias Mais Estudadas */}
            {subjectPieData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Distribuição por Matéria
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={subjectPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#ffffff' : '#000000'
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Por Matéria */}
        {activeTab === 'subjects' && (
          <div className="space-y-4">
            {/* Matérias Mais Fortes */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Matérias Mais Fortes
              </h3>
              <div className="space-y-3">
                {detailedStats.strongestSubjects.length > 0 ? (
                  detailedStats.strongestSubjects.map((subject, index) => (
                    <div key={subject.subject} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <span className="text-sm text-green-700 dark:text-green-300">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-700 dark:text-gray-300">{subject.subject}</span>
                          <span className="text-sm text-green-600 dark:text-green-400">{Math.round(subject.accuracy)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${subject.accuracy}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-gray-500">
                          {subject.totalQuestions} questões
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 dark:text-gray-400 text-center py-4">
                    Responda pelo menos 5 questões por matéria para ver estatísticas
                  </p>
                )}
              </div>
            </div>

            {/* Matérias para Melhorar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Matérias para Melhorar
              </h3>
              <div className="space-y-3">
                {detailedStats.weakestSubjects.length > 0 ? (
                  detailedStats.weakestSubjects.map((subject, index) => (
                    <div key={subject.subject} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                        <span className="text-sm text-orange-700 dark:text-orange-300">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-700 dark:text-gray-300">{subject.subject}</span>
                          <span className="text-sm text-orange-600 dark:text-orange-400">{Math.round(subject.accuracy)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${subject.accuracy}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-gray-500">
                          {subject.totalQuestions} questões
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 dark:text-gray-400 text-center py-4">
                    Responda pelo menos 5 questões por matéria para ver estatísticas
                  </p>
                )}
              </div>
            </div>

            {/* Todas as Matérias */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg text-slate-900 dark:text-white mb-4">Todas as Matérias</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {detailedStats.subjectStats
                  .sort((a, b) => b.totalQuestions - a.totalQuestions)
                  .map(subject => (
                    <div 
                      key={subject.subject}
                      className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-700 dark:text-gray-300">{subject.subject}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          subject.accuracy >= 80 
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : subject.accuracy >= 60
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                        }`}>
                          {Math.round(subject.accuracy)}%
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-slate-600 dark:text-gray-400">
                        <span>Total: {subject.totalQuestions}</span>
                        <span>✓ {subject.correctAnswers}</span>
                        <span>✗ {subject.wrongAnswers}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Progresso Temporal */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Taxa de Acerto ao Longo do Tempo */}
            {dailyProgressData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg text-slate-900 dark:text-white mb-4">Taxa de Acerto (Últimos 14 dias)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="date" 
                      stroke={isDarkMode ? '#9ca3af' : '#64748b'}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke={isDarkMode ? '#9ca3af' : '#64748b'}
                      style={{ fontSize: '12px' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="taxa" 
                      fill="#3b82f6" 
                      name="Taxa de Acerto (%)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Calendário de Atividade (últimos 30 dias) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg text-slate-900 dark:text-white mb-4">Histórico de Atividade</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }).map((_, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (29 - index));
                  const dateStr = date.toLocaleDateString();
                  const dayStats = detailedStats.dailyStats.find(d => d.date === dateStr);
                  const hasActivity = dayStats && dayStats.questionsAnswered > 0;
                  const intensity = dayStats 
                    ? Math.min(Math.floor(dayStats.questionsAnswered / 5), 4)
                    : 0;

                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg ${
                        !hasActivity 
                          ? 'bg-slate-100 dark:bg-gray-700'
                          : intensity === 1
                          ? 'bg-green-200 dark:bg-green-800'
                          : intensity === 2
                          ? 'bg-green-300 dark:bg-green-700'
                          : intensity === 3
                          ? 'bg-green-400 dark:bg-green-600'
                          : 'bg-green-500 dark:bg-green-500'
                      }`}
                      title={`${date.toLocaleDateString('pt-BR')}: ${dayStats?.questionsAnswered || 0} questões`}
                    />
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-600 dark:text-gray-400">
                <span>Menos</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-slate-100 dark:bg-gray-700 rounded" />
                  <div className="w-4 h-4 bg-green-200 dark:bg-green-800 rounded" />
                  <div className="w-4 h-4 bg-green-300 dark:bg-green-700 rounded" />
                  <div className="w-4 h-4 bg-green-400 dark:bg-green-600 rounded" />
                  <div className="w-4 h-4 bg-green-500 dark:bg-green-500 rounded" />
                </div>
                <span>Mais</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
