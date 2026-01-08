import React from 'react';
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
    <div className="min-h-screen p-6 pb-24 bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">Estatísticas</h1>
      </div>

      {/* Todo o conteúdo em uma única página */}
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-5 text-blue-500" />
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">{detailedStats.totalQuestionsAnswered}</p>
            <p className="text-xs text-muted-foreground">questões</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Award className="size-5 text-green-500" />
              <p className="text-sm text-muted-foreground">Precisão</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">{Math.round(detailedStats.overallAccuracy)}%</p>
            <p className="text-xs text-muted-foreground">média</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-5 text-orange-500" />
              <p className="text-sm text-muted-foreground">Sequência</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">{detailedStats.currentStreak}</p>
            <p className="text-xs text-muted-foreground">dias</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-5 text-purple-500" />
              <p className="text-sm text-muted-foreground">Tempo</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">{Math.round(detailedStats.totalStudyTime / 60)}</p>
            <p className="text-xs text-muted-foreground">horas</p>
          </div>
        </div>

        {/* Distribution Chart */}
        {pieData.length > 0 && (
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">Distribuição por Matéria</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="60%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
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
              
              <div className="flex-1 space-y-3">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Daily Progress */}
        {last7Days.length > 0 ? (
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">Últimos 7 Dias</h3>
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
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border text-center">
            <p className="text-muted-foreground">Nenhum dado dos últimos 7 dias disponível ainda</p>
          </div>
        )}

        {/* Subjects Performance */}
        {subjectData.length > 0 ? (
          <>
            {/* Bar Chart */}
            <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
              <h3 className="text-lg font-bold mb-4 text-foreground">Desempenho por Matéria</h3>
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
                <div key={stat.subject} className="bg-card rounded-2xl p-4 shadow-md border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-foreground">{stat.subject}</h4>
                    <span className="text-2xl font-bold text-foreground">{Math.round(stat.accuracy)}%</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{stat.questionsAnswered} questões</span>
                    <span>•</span>
                    <span>{stat.correctAnswers} acertos</span>
                  </div>
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
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
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border text-center">
            <p className="text-muted-foreground">Comece a responder questões para ver suas estatísticas!</p>
          </div>
        )}
      </div>
    </div>
  );
}