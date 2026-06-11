import { useState } from 'react';
import { Eye, ThumbsUp, MessageSquare, Clock, Search, Filter, Plus, GripVertical, DollarSign } from 'lucide-react';
import { videos as initialVideos } from '../data/mockData';
import { VideoStatus } from '../types';
import { cn } from '../utils/cn';

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

const statusConfig: Record<VideoStatus, { label: string; color: string; bg: string }> = {
  idea: { label: '💡 Idea', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  scripting: { label: '✍️ Scripting', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  recording: { label: '🎬 Recording', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  editing: { label: '✂️ Editing', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  thumbnail: { label: '🎨 Thumbnail', color: 'text-pink-400', bg: 'bg-pink-500/20' },
  scheduled: { label: '📅 Scheduled', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  published: { label: '✅ Published', color: 'text-green-400', bg: 'bg-green-500/20' },
};

const allStatuses: VideoStatus[] = ['idea', 'scripting', 'recording', 'editing', 'thumbnail', 'scheduled', 'published'];

export function ContentTab() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<VideoStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const filtered = initialVideos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || v.status === filter;
    return matchSearch && matchFilter;
  });

  const kanbanColumns = allStatuses.map(status => ({
    status,
    ...statusConfig[status],
    videos: initialVideos.filter(v => v.status === status),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Pipeline</h2>
          <p className="text-sm text-yt-text-dim mt-1">Manage your video production workflow</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-yt-accent to-yt-accent-2 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Video
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yt-text-dim" />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-yt-surface border border-yt-border rounded-lg text-sm text-white placeholder-yt-text-dim focus:outline-none focus:border-yt-accent transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yt-text-dim" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as VideoStatus | 'all')}
              className="pl-10 pr-8 py-2.5 bg-yt-surface border border-yt-border rounded-lg text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-yt-accent"
            >
              <option value="all">All Status</option>
              {allStatuses.map(s => (
                <option key={s} value={s}>{statusConfig[s].label}</option>
              ))}
            </select>
          </div>
          <div className="flex bg-yt-surface border border-yt-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-2 text-xs font-medium transition-colors',
                viewMode === 'list' ? 'bg-yt-accent text-white' : 'text-yt-text-dim hover:text-white'
              )}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={cn(
                'px-3 py-2 text-xs font-medium transition-colors',
                viewMode === 'kanban' ? 'bg-yt-accent text-white' : 'text-yt-text-dim hover:text-white'
              )}
            >
              Board
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="bg-yt-surface rounded-xl border border-yt-border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-yt-border text-xs font-semibold text-yt-text-dim uppercase tracking-wider">
            <div className="col-span-5">Video</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-center">Views</div>
            <div className="col-span-1 text-center">CTR</div>
            <div className="col-span-1 text-center">Likes</div>
            <div className="col-span-1 text-center">Revenue</div>
            <div className="col-span-1 text-center">Duration</div>
          </div>
          {filtered.map((video, i) => (
            <div
              key={video.id}
              className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-yt-border/50 hover:bg-yt-surface-2/50 transition-colors animate-fade-in cursor-pointer"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="col-span-5 flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-yt-border cursor-grab shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{video.title}</p>
                  <div className="flex gap-1.5 mt-1">
                    {video.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-yt-border/50 text-yt-text-dim">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={cn(
                  'text-xs px-2.5 py-1 rounded-full font-medium',
                  statusConfig[video.status].bg,
                  statusConfig[video.status].color
                )}>
                  {statusConfig[video.status].label}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center gap-1 text-sm text-yt-text-dim">
                <Eye className="w-3 h-3" />
                {formatNumber(video.views)}
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm text-yt-text-dim">
                {video.ctr > 0 ? `${video.ctr}%` : '—'}
              </div>
              <div className="col-span-1 flex items-center justify-center gap-1 text-sm text-yt-text-dim">
                <ThumbsUp className="w-3 h-3" />
                {formatNumber(video.likes)}
              </div>
              <div className="col-span-1 flex items-center justify-center gap-1 text-sm text-yt-text-dim">
                <DollarSign className="w-3 h-3" />
                {video.revenue > 0 ? `$${video.revenue.toFixed(0)}` : '—'}
              </div>
              <div className="col-span-1 flex items-center justify-center gap-1 text-sm text-yt-text-dim">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map((col) => (
            <div
              key={col.status}
              className="min-w-[260px] max-w-[300px] bg-yt-surface rounded-xl border border-yt-border flex flex-col"
            >
              <div className="px-4 py-3 border-b border-yt-border flex items-center justify-between">
                <span className={cn('text-sm font-semibold', col.color)}>
                  {col.label}
                </span>
                <span className="text-xs bg-yt-border/50 text-yt-text-dim px-2 py-0.5 rounded-full">
                  {col.videos.length}
                </span>
              </div>
              <div className="p-3 space-y-2 flex-1">
                {col.videos.map((video) => (
                  <div
                    key={video.id}
                    className="p-3 bg-yt-surface-2 rounded-lg border border-yt-border/50 hover:border-yt-accent/30 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-medium text-white leading-snug">{video.title}</p>
                    <div className="flex gap-1.5 mt-2">
                      {video.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-yt-border/50 text-yt-text-dim">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {video.views > 0 && (
                      <div className="flex items-center gap-3 mt-2 text-xs text-yt-text-dim">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(video.views)}</span>
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{formatNumber(video.likes)}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{formatNumber(video.comments)}</span>
                      </div>
                    )}
                  </div>
                ))}
                {col.videos.length === 0 && (
                  <div className="text-center py-8 text-yt-text-dim text-xs">No videos</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
