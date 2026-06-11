import { useState } from 'react';
import { Zap, Play, RotateCcw, Plus, ArrowRight, CheckCircle2, Clock, Settings } from 'lucide-react';
import { automationRules as initialRules } from '../data/mockData';
import { cn } from '../utils/cn';

export function AutomationTab() {
  const [rules, setRules] = useState(initialRules);

  const toggleRule = (id: string) => {
    setRules(prev =>
      prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
    );
  };

  const enabledCount = rules.filter(r => r.enabled).length;
  const totalRuns = rules.reduce((sum, r) => sum + r.runsCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Automation Rules</h2>
          <p className="text-sm text-yt-text-dim mt-1">Set up workflows to automate your YouTube channel</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-yt-accent to-yt-accent-2 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yt-green/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-yt-green" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{enabledCount}</p>
            <p className="text-xs text-yt-text-dim">Active Rules</p>
          </div>
        </div>
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yt-accent/20 flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-yt-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalRuns}</p>
            <p className="text-xs text-yt-text-dim">Total Runs</p>
          </div>
        </div>
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yt-accent-2/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-yt-accent-2" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">98.5%</p>
            <p className="text-xs text-yt-text-dim">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-4">
        {rules.map((rule, i) => (
          <div
            key={rule.id}
            className={cn(
              'bg-yt-surface rounded-xl border p-5 transition-all animate-fade-in',
              rule.enabled
                ? 'border-yt-accent/30 hover:border-yt-accent/50'
                : 'border-yt-border hover:border-yt-border opacity-70'
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Toggle */}
              <button
                onClick={() => toggleRule(rule.id)}
                className={cn(
                  'w-12 h-6 rounded-full shrink-0 relative transition-colors mt-1',
                  rule.enabled ? 'bg-yt-accent' : 'bg-yt-border'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all',
                    rule.enabled ? 'left-[26px]' : 'left-0.5'
                  )}
                />
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-white">{rule.name}</h4>
                  {rule.enabled && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-yt-green/20 text-yt-green font-medium">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-sm text-yt-text-dim mt-1">{rule.description}</p>

                {/* Flow */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs bg-yt-surface-2 px-3 py-1.5 rounded-lg border border-yt-border">
                    <Play className="w-3 h-3 text-yt-accent" />
                    {rule.trigger}
                  </span>
                  <ArrowRight className="w-4 h-4 text-yt-text-dim shrink-0" />
                  <span className="flex items-center gap-1.5 text-xs bg-yt-surface-2 px-3 py-1.5 rounded-lg border border-yt-border">
                    <Zap className="w-3 h-3 text-yt-yellow" />
                    {rule.action}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-3 text-xs text-yt-text-dim">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last run: {rule.lastRun}
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    {rule.runsCount} runs
                  </span>
                </div>
              </div>

              {/* Actions */}
              <button className="p-2 rounded-lg hover:bg-yt-surface-2 text-yt-text-dim hover:text-white transition-colors shrink-0">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Automations */}
      <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
        <h3 className="text-lg font-semibold text-white mb-4">✨ Suggested Automations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Auto-translate Subtitles', desc: 'Translate captions to 10+ languages automatically', icon: '🌍' },
            { title: 'Hashtag Optimizer', desc: 'Auto-generate trending hashtags for each upload', icon: '#️⃣' },
            { title: 'Engagement Booster', desc: 'Pin best comment & heart first 50 comments', icon: '💬' },
          ].map((suggestion, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-yt-surface-2 border border-yt-border/50 border-dashed hover:border-yt-accent/30 cursor-pointer transition-all group"
            >
              <span className="text-2xl">{suggestion.icon}</span>
              <h4 className="text-sm font-semibold text-white mt-2 group-hover:text-yt-accent transition-colors">
                {suggestion.title}
              </h4>
              <p className="text-xs text-yt-text-dim mt-1">{suggestion.desc}</p>
              <button className="mt-3 text-xs text-yt-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Add Rule <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
