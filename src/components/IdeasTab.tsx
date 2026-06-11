import { useState } from 'react';
import { Lightbulb, Plus, Star, ArrowRight, Calendar, Eye, MessageSquare, Sparkles } from 'lucide-react';
import { contentIdeas as initialIdeas } from '../data/mockData';
import { cn } from '../utils/cn';
import { ContentIdea } from '../types';

const priorityConfig: Record<string, { label: string; color: string; bg: string }> = {
  high: { label: 'High Priority', color: 'text-red-400', bg: 'bg-red-500/20' },
  medium: { label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  low: { label: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/20' },
};

export function IdeasTab() {
  const [ideas, setIdeas] = useState<ContentIdea[]>(initialIdeas);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const addIdea = () => {
    if (!newTitle.trim()) return;
    const idea: ContentIdea = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      category: 'General',
      estimatedViews: 'TBD',
      addedDate: new Date().toISOString().split('T')[0],
      notes: '',
    };
    setIdeas(prev => [idea, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setShowForm(false);
  };

  const removeIdea = (id: string) => {
    setIdeas(prev => prev.filter(i => i.id !== id));
  };

  const highCount = ideas.filter(i => i.priority === 'high').length;
  const mediumCount = ideas.filter(i => i.priority === 'medium').length;
  const lowCount = ideas.filter(i => i.priority === 'low').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Ideas</h2>
          <p className="text-sm text-yt-text-dim mt-1">Brainstorm and organize your video ideas</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-yt-accent to-yt-accent-2 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Idea
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yt-accent/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-yt-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{ideas.length}</p>
            <p className="text-xs text-yt-text-dim">Total Ideas</p>
          </div>
        </div>
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <Star className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{highCount}</p>
            <p className="text-xs text-yt-text-dim">High Priority</p>
          </div>
        </div>
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{mediumCount}</p>
            <p className="text-xs text-yt-text-dim">Medium Priority</p>
          </div>
        </div>
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Star className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{lowCount}</p>
            <p className="text-xs text-yt-text-dim">Low Priority</p>
          </div>
        </div>
      </div>

      {/* New Idea Form */}
      {showForm && (
        <div className="bg-yt-surface rounded-xl border border-yt-accent/30 p-5 animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yt-accent" />
            Add New Idea
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Video title idea..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-4 py-3 bg-yt-surface-2 border border-yt-border rounded-lg text-sm text-white placeholder-yt-text-dim focus:outline-none focus:border-yt-accent transition-colors"
            />
            <textarea
              placeholder="Description and notes..."
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-yt-surface-2 border border-yt-border rounded-lg text-sm text-white placeholder-yt-text-dim focus:outline-none focus:border-yt-accent transition-colors resize-none"
            />
            <div className="flex items-center gap-3">
              <span className="text-sm text-yt-text-dim">Priority:</span>
              {(['high', 'medium', 'low'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setNewPriority(p)}
                  className={cn(
                    'text-xs px-3 py-1.5 rounded-lg font-medium transition-colors',
                    newPriority === p
                      ? cn(priorityConfig[p].bg, priorityConfig[p].color)
                      : 'bg-yt-surface-2 text-yt-text-dim hover:text-white'
                  )}
                >
                  {priorityConfig[p].label}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={addIdea}
                className="bg-yt-accent text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-yt-accent/80 transition-colors"
              >
                Add Idea
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-yt-text-dim hover:text-white border border-yt-border hover:border-yt-accent/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea, i) => {
          const priority = priorityConfig[idea.priority];
          return (
            <div
              key={idea.id}
              className="bg-yt-surface rounded-xl border border-yt-border p-5 hover:border-yt-accent/30 transition-all group animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className={cn(
                  'text-[10px] px-2 py-0.5 rounded-full font-medium',
                  priority.bg,
                  priority.color
                )}>
                  {priority.label}
                </span>
                <button
                  onClick={() => removeIdea(idea.id)}
                  className="text-yt-text-dim hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
              <h4 className="text-base font-semibold text-white mt-3 leading-snug">{idea.title}</h4>
              <p className="text-sm text-yt-text-dim mt-2 line-clamp-2">{idea.description}</p>

              <div className="flex items-center gap-3 mt-4 text-xs text-yt-text-dim">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {idea.estimatedViews}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {idea.addedDate}
                </span>
              </div>

              {idea.notes && (
                <div className="mt-3 p-2 rounded bg-yt-surface-2 border border-yt-border/50">
                  <p className="text-xs text-yt-text-dim flex items-start gap-1">
                    <MessageSquare className="w-3 h-3 mt-0.5 shrink-0" />
                    {idea.notes}
                  </p>
                </div>
              )}

              <button className="mt-4 text-xs text-yt-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Move to Production <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
