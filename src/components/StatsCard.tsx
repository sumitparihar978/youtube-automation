import { cn } from '../utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ElementType;
  color: string;
  delay?: number;
}

export function StatsCard({ title, value, change, icon: Icon, color, delay = 0 }: StatsCardProps) {
  return (
    <div
      className="animate-fade-in bg-yt-surface rounded-xl border border-yt-border p-5 hover:border-yt-accent/30 transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-yt-text-dim font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change !== undefined && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-xs font-medium',
              change >= 0 ? 'text-yt-green' : 'text-yt-red'
            )}>
              {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{Math.abs(change)}% from last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
          color
        )}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
