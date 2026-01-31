/**
 * @file Statistics.tsx (REFATORADO 10/10)
 * @description Componente de Estatísticas (UI Pura)
 * @pattern Presentation Component - Zero lógica de negócio
 */

import React from 'react';
import { ArrowLeft, TrendingUp, Target, Award, Clock, Zap, BookOpen, Calendar } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useStatistics } from '../hooks/useStatistics';

/**
 * Props do Statistics
 */
interface StatisticsProps {
  onBack: () => void;
}

/**
 * Componente de Statistics
 * 
 * @component
 * @example
 * ```tsx
 * <Statistics onBack={() => navigate('/')} />
 * ```
 */
export function Statistics({ onBack }: StatisticsProps) {
  // ============================================
  // HOOK (ÚNICA FONTE DE DADOS)
  // ============================================
  const stats = useStatistics();

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen p-6 pb-24 bg-background">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">Estatísticas</h1>
      </div>

      {/* Conteúdo */}
      <div className="space-y-6">
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Total Questions */}
          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-5 text-blue-500" />
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">
              {stats.detailedStats.totalQuestionsAnswered}
            </p>
            <p className="text-xs text-muted-foreground">questões</p>
          </div>

          {/* Accuracy */}
          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Award className="size-5 text-green-500" />
              <p className="text-sm text-muted-foreground">Precisão</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">
              {Math.round(stats.detailedStats.overallAccuracy)}%
            </p>
            <p className="text-xs text-muted-foreground">média</p>
          </div>

          {/* Streak */}
          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-5 text-orange-500" />
              <p className="text-sm text-muted-foreground">Sequência</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">
              {stats.detailedStats.currentStreak}
            </p>
            <p className="text-xs text-muted-foreground">dias</p>
          </div>

          {/* Study Time */}
          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-5 text-purple-500" />
              <p className="text-sm text-muted-foreground">Tempo</p>
            </div>
            <p className="text-2xl font-bold mb-1 text-foreground">
              {Math.round(stats.detailedStats.totalStudyTime / 60)}
            </p>
            <p className="text-xs text-muted-foreground">horas</p>
          </div>

          {/* Level Progress */}
          <div className="bg-card rounded-2xl p-4 shadow-md border border-border col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="size-5 text-yellow-500" />
              <p className="text-sm text-muted-foreground">Progresso</p>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-2xl font-bold text-foreground">Nível {stats.level}</p>
              <span className="text-sm text-muted-foreground">• {stats.xp} XP</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
                style={{ width: `${(stats.xp % 1000) / 10}%` }}
              />
            </div>
          </div>
        </div>

        {/* Distribution Chart (Pie) */}
        {stats.pieData.length > 0 && (
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              Distribuição por Matéria
            </h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="60%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={stats.chartColors[index % stats.chartColors.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="flex-1 space-y-3">
                {stats.pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ 
                        backgroundColor: stats.chartColors[index % stats.chartColors.length] 
                      }}
                    />
                    <span className="text-sm text-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Daily Progress (Line Chart) */}
        {stats.hasDataLast7Days ? (
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              Últimos 7 Dias
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.last7Days}>
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
                <Line 
                  type="monotone" 
                  dataKey="questões" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="acertos" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border text-center">
            <p className="text-muted-foreground">
              Nenhum dado dos últimos 7 dias disponível ainda
            </p>
          </div>
        )}

        {/* Weekly Activity (Area Chart) */}
        {stats.hasDataLast7Days && (
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="size-5 text-purple-500" />
              <h3 className="text-lg font-bold text-foreground">
                Atividade Semanal (Área)
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={stats.last7Days}>
                <defs>
                  <linearGradient id="colorQuestoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAcertos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="questões" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorQuestoes)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="acertos" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorAcertos)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Subjects Performance (Bar Chart) */}
        {stats.hasSubjectData ? (
          <>
            {/* Bar Chart */}
            <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
              <h3 className="text-lg font-bold mb-4 text-foreground">
                Desempenho por Matéria
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.subjectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100} 
                  />
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
              {stats.detailedStats.subjectStats.map((stat: any, index: number) => (
                <div 
                  key={stat.subject} 
                  className="bg-card rounded-2xl p-4 shadow-md border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-foreground">
                      {stat.subject}
                    </h4>
                    <span className="text-2xl font-bold text-foreground">
                      {Math.round(stat.accuracy)}%
                    </span>
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
            <p className="text-muted-foreground">
              Comece a responder questões para ver suas estatísticas!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
