import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Eye, Users, DollarSign, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { analyticsData, videos } from '../data/mockData';
import { cn } from '../utils/cn';

type MetricKey = 'views' | 'subscribers' | 'revenue' | 'watchHours';

const metrics: { key: MetricKey; label: string; icon: React.ElementType; color: string; gradient: string }[] = [
  { key: 'views', label: 'Views', icon: Eye, color: '#7c3aed', gradient: 'from-purple-500/20' },
  { key: 'subscribers', label: 'Subscribers', icon: Users, color: '#06b6d4', gradient: 'from-cyan-500/20' },
  { key: 'revenue', label: 'Revenue ($)', icon: DollarSign, color: '#22c55e', gradient: 'from-green-500/20' },
  { key: 'watchHours', label: 'Watch Hours', icon: Clock, color: '#f97316', gradient: 'from-orange-500/20' },
];

const categoryData = [
  { name: 'Education', value: 55, color: '#7c3aed' },
  { name: 'Technology', value: 25, color: '#06b6d4' },
  { name: 'Vlog', value: 12, color: '#f97316' },
  { name: 'Other', value: 8, color: '#64748b' },
];

const trafficSources = [
  { source: 'Search', percentage: 38, color: 'bg-purple-500' },
  { source: 'Suggested', percentage: 28, color: 'bg-cyan-500' },
  { source: 'Browse', percentage: 18, color: 'bg-orange-500' },
  { source: 'External', percentage: 10, color: 'bg-green-500' },
  { source: 'Direct', percentage: 6, color: 'bg-gray-500' },
];

export function AnalyticsTab() {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('views');

  const currentMetric = metrics.find(m => m.key === activeMetric)!;
  const totalValue = analyticsData.reduce((sum, d) => sum + d[activeMetric], 0);
  const firstHalf = analyticsData.slice(0, 6).reduce((sum, d) => sum + d[activeMetric], 0);
  const secondHalf = analyticsData.slice(6).reduce((sum, d) => sum + d[activeMetric], 0);
  const growth = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf * 100) : 0;

  const topVideos = [...videos]
    .filter(v => v.views > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-sm text-yt-text-dim mt-1">Deep dive into your channel performance</p>
      </div>

      {/* Metric Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map(metric => {
          const Icon = metric.icon;
          const isActive = activeMetric === metric.key;
          const total = analyticsData.reduce((sum, d) => sum + d[metric.key], 0);
          return (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all',
                isActive
                  ? 'bg-gradient-to-br border-yt-accent/50 shadow-lg shadow-yt-accent/10'
                  : 'bg-yt-surface border-yt-border hover:border-yt-accent/30',
                isActive && metric.gradient
              )}
              style={isActive ? { borderColor: metric.color + '60' } : undefined}
            >
              <Icon className="w-5 h-5 mb-2" style={{ color: metric.color }} />
              <p className="text-xs text-yt-text-dim">{metric.label}</p>
              <p className="text-lg font-bold text-white mt-0.5">
                {metric.key === 'revenue' ? '$' : ''}{total.toLocaleString()}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Chart */}
      <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{currentMetric.label} Over Time</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-white">
                {currentMetric.key === 'revenue' ? '$' : ''}{totalValue.toLocaleString()}
              </span>
              <span className={cn(
                'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                growth >= 0 ? 'bg-yt-green/20 text-yt-green' : 'bg-yt-red/20 text-yt-red'
              )}>
                {growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(growth).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={analyticsData}>
            <defs>
              <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d4a" />
            <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1e30',
                border: '1px solid #2d2d4a',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={currentMetric.color}
              strokeWidth={2.5}
              fill={`url(#gradient-${activeMetric})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Performance */}
        <div className="lg:col-span-1 bg-yt-surface rounded-xl border border-yt-border p-5">
          <h3 className="text-lg font-semibold text-white mb-4">🏆 Top Videos</h3>
          <div className="space-y-3">
            {topVideos.map((video, i) => (
              <div key={video.id} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="text-lg font-bold text-yt-text-dim w-6 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{video.title}</p>
                  <p className="text-xs text-yt-text-dim">{video.views.toLocaleString()} views · ${video.revenue.toFixed(0)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-yt-accent">{video.ctr}% CTR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
          <h3 className="text-lg font-semibold text-white mb-4">📊 Content Mix</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e30',
                  border: '1px solid #2d2d4a',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-xs text-yt-text-dim">{cat.name}</span>
                <span className="text-xs font-medium text-white ml-auto">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
          <h3 className="text-lg font-semibold text-white mb-4">🌐 Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source, i) => (
              <div key={source.source} className="animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-yt-text-dim">{source.source}</span>
                  <span className="text-sm font-medium text-white">{source.percentage}%</span>
                </div>
                <div className="h-2 bg-yt-surface-2 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-1000', source.color)}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
        <h3 className="text-lg font-semibold text-white mb-4">💰 Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d4a" />
            <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1e30',
                border: '1px solid #2d2d4a',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
