import { Eye, Users, Clock, DollarSign, TrendingUp, Film, MousePointerClick, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatsCard } from './StatsCard';
import { channelStats, analyticsData, videos, workflowSteps } from '../data/mockData';
import { cn } from '../utils/cn';

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}



const workflowStatusColors: Record<string, string> = {
  completed: 'bg-yt-green',
  'in-progress': 'bg-yt-yellow',
  pending: 'bg-yt-border',
};

export function DashboardTab() {
  const recentVideos = videos.filter(v => v.status === 'published').slice(0, 3);
  const inProgress = videos.filter(v => !['published', 'idea'].includes(v.status));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Subscribers"
          value={formatNumber(channelStats.subscribers)}
          change={channelStats.subscriberGrowth}
          icon={Users}
          color="bg-gradient-to-br from-yt-accent to-purple-600"
          delay={0}
        />
        <StatsCard
          title="Total Views"
          value={formatNumber(channelStats.totalViews)}
          change={18.2}
          icon={Eye}
          color="bg-gradient-to-br from-yt-accent-2 to-teal-600"
          delay={100}
        />
        <StatsCard
          title="Watch Hours"
          value={formatNumber(channelStats.watchHours)}
          change={14.7}
          icon={Clock}
          color="bg-gradient-to-br from-yt-orange to-amber-600"
          delay={200}
        />
        <StatsCard
          title="Revenue (30d)"
          value={`$${formatNumber(channelStats.estimatedRevenue)}`}
          change={22.1}
          icon={DollarSign}
          color="bg-gradient-to-br from-yt-green to-emerald-600"
          delay={300}
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-yt-surface rounded-xl border border-yt-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Channel Growth</h3>
              <p className="text-sm text-yt-text-dim">Views & subscriber trends</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-yt-accent" /> Views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-yt-accent-2" /> Subscribers
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="subsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
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
                dataKey="views"
                stroke="#7c3aed"
                strokeWidth={2}
                fill="url(#viewsGradient)"
              />
              <Area
                type="monotone"
                dataKey="subscribers"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#subsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-yt-surface-2">
              <div className="flex items-center gap-3">
                <MousePointerClick className="w-4 h-4 text-yt-accent" />
                <span className="text-sm text-yt-text-dim">Avg CTR</span>
              </div>
              <span className="text-sm font-semibold text-white">{channelStats.avgCTR}%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yt-surface-2">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-yt-accent-2" />
                <span className="text-sm text-yt-text-dim">Avg View Duration</span>
              </div>
              <span className="text-sm font-semibold text-white">{channelStats.avgViewDuration}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yt-surface-2">
              <div className="flex items-center gap-3">
                <Film className="w-4 h-4 text-yt-orange" />
                <span className="text-sm text-yt-text-dim">Total Videos</span>
              </div>
              <span className="text-sm font-semibold text-white">{channelStats.totalVideos}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yt-surface-2">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-yt-green" />
                <span className="text-sm text-yt-text-dim">Growth Rate</span>
              </div>
              <span className="text-sm font-semibold text-yt-green">+{channelStats.subscriberGrowth}%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yt-surface-2">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-yt-yellow" />
                <span className="text-sm text-yt-text-dim">In Production</span>
              </div>
              <span className="text-sm font-semibold text-white">{inProgress.length} videos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Videos */}
        <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
          <h3 className="text-lg font-semibold text-white mb-4">🔥 Top Performing Videos</h3>
          <div className="space-y-3">
            {recentVideos.map((video, i) => (
              <div
                key={video.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-yt-surface-2 hover:bg-yt-border/30 transition-colors animate-slide-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yt-accent to-yt-accent-2 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  #{i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{video.title}</p>
                  <div className="flex gap-3 mt-1 text-xs text-yt-text-dim">
                    <span>{formatNumber(video.views)} views</span>
                    <span>CTR {video.ctr}%</span>
                    <span>${video.revenue.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
          <h3 className="text-lg font-semibold text-white mb-4">⚡ Current Workflow</h3>
          <div className="space-y-3">
            {workflowSteps.map((step, i) => (
              <div
                key={step.id}
                className="flex items-center gap-3 animate-slide-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={cn(
                  'w-3 h-3 rounded-full shrink-0',
                  workflowStatusColors[step.status]
                )} />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className={cn(
                      'text-sm font-medium',
                      step.status === 'completed' ? 'text-yt-text-dim line-through' : 'text-white'
                    )}>
                      {step.name}
                    </p>
                    <p className="text-xs text-yt-text-dim">{step.assignee} · Due {step.dueDate}</p>
                  </div>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    step.status === 'completed' && 'bg-yt-green/20 text-yt-green',
                    step.status === 'in-progress' && 'bg-yt-yellow/20 text-yt-yellow',
                    step.status === 'pending' && 'bg-gray-500/20 text-gray-400',
                  )}>
                    {step.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
