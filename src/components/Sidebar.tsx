import { 
  LayoutDashboard, 
  Film, 
  Calendar, 
  BarChart3, 
  Zap, 
  Lightbulb, 
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { TabType } from '../types';
import { cn } from '../utils/cn';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'content', label: 'Content', icon: Film },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'ideas', label: 'Ideas', icon: Lightbulb },
];

export function Sidebar({ activeTab, onTabChange, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-yt-surface border-r border-yt-border z-50 transition-all duration-300 flex flex-col',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-yt-border shrink-0">
        <div className="w-9 h-9 bg-gradient-to-br from-yt-red to-yt-accent rounded-lg flex items-center justify-center shrink-0">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-white tracking-tight">TubeFlow</h1>
            <p className="text-[10px] text-yt-text-dim -mt-0.5">Automation Suite</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-gradient-to-r from-yt-accent/20 to-yt-accent-2/10 text-white shadow-lg shadow-yt-accent/10'
                  : 'text-yt-text-dim hover:text-white hover:bg-white/5'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 shrink-0 transition-colors',
                  isActive ? 'text-yt-accent' : 'text-yt-text-dim group-hover:text-yt-accent-2'
                )}
              />
              {!collapsed && <span className="animate-fade-in">{tab.label}</span>}
              {isActive && (
                <div className="absolute left-0 w-[3px] h-8 bg-yt-accent rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Channel Info */}
      {!collapsed && (
        <div className="px-3 py-4 border-t border-yt-border animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yt-accent to-yt-accent-2 flex items-center justify-center text-white font-bold text-sm shrink-0">
              TF
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">TubeFlow Studio</p>
              <p className="text-xs text-yt-text-dim">284.5K subs</p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-yt-surface-2 border border-yt-border rounded-full flex items-center justify-center text-yt-text-dim hover:text-white hover:bg-yt-accent transition-all"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
