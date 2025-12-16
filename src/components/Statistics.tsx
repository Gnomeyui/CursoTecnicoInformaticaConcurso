import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Target, Award, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStats } from '../context/StatsContext';
import { useGame } from '../context/GameContext';

interface StatisticsProps {
  onBack: () => void;
}

export function Statistics({ onBack }: StatisticsProps) {
  const { detailedStats } = useStats();
  const { xp, level } = useGame();
  const [view, setView] = useState<'overview' | 'daily' | 'subjects'>('overview');

  // Preparar dados para gráficos
  const last7Days = detailedStats.dailyStats
    .slice(-7)
    .map(stat => ({
      date: new Date(stat.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      questões: stat.questionsAnswered,
      acertos: stat.correctAnswers,
    }));

  const subjectData = detailedStats.subjectStats.map(stat => ({
    name: stat.subject,
    questões: stat.questionsAnswered,
    acertos: stat.correctAnswers,
    precisão: Math.round(stat.accuracy),
  }));

  const pieData = detailedStats.subjectStats.map(stat => ({
    name: stat.subject,
    value: stat.questionsAnswered,
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen p-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-2xl">Estatísticas</h1>
      </div>

      {/* View Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setView('overview')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            view === 'overview' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setView('daily')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            view === 'daily' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Progresso Diário
        </button>
        <button
          onClick={() => setView('subjects')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            view === 'subjects' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Por Matéria
        </button>
      </div>

      {/* Overview */}
      {view === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Target className="size-5 text-blue-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              </div>
              <p className="text-2xl mb-1">{detailedStats.totalQuestionsAnswered}</p>
              <p className="text-xs text-gray-500">questões</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Award className="size-5 text-green-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Precisão</p>
              </div>
              <p className="text-2xl mb-1">{Math.round(detailedStats.overallAccuracy)}%</p>
              <p className="text-xs text-gray-500">média</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="size-5 text-orange-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Sequência</p>
              </div>
              <p className="text-2xl mb-1">{detailedStats.currentStreak}</p>
              <p className="text-xs text-gray-500">dias</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-5 text-purple-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Tempo</p>
              </div>
              <p className="text-2xl mb-1">{Math.round(detailedStats.totalStudyTime / 60)}</p>
              <p className="text-xs text-gray-500">horas</p>
            </div>
          </div>

          {/* Distribution Chart */}
          {pieData.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg mb-4">Distribuição por Matéria</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Daily Progress */}
      {view === 'daily' && (
        <div className="space-y-6">
          {last7Days.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg mb-4">Últimos 7 Dias</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="questões" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="acertos" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md text-center">
              <p className="text-gray-600 dark:text-gray-400">Nenhum dado disponível ainda</p>
            </div>
          )}
        </div>
      )}

      {/* Subjects */}
      {view === 'subjects' && (
        <div className="space-y-6">
          {subjectData.length > 0 ? (
            <>
              {/* Bar Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                <h3 className="text-lg mb-4">Desempenho por Matéria</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="precisão" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Subject Cards */}
              <div className="space-y-3">
                {detailedStats.subjectStats.map((stat, index) => (
                  <div key={stat.subject} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg">{stat.subject}</h4>
                      <span className="text-2xl">{Math.round(stat.accuracy)}%</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{stat.questionsAnswered} questões</span>
                      <span>•</span>
                      <span>{stat.correctAnswers} acertos</span>
                    </div>
                    <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${stat.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md text-center">
              <p className="text-gray-600 dark:text-gray-400">Comece a responder questões para ver suas estatísticas!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
