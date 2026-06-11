import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardTab } from './components/DashboardTab';
import { ContentTab } from './components/ContentTab';
import { ScheduleTab } from './components/ScheduleTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { AutomationTab } from './components/AutomationTab';
import { IdeasTab } from './components/IdeasTab';
import { TabType } from './types';
import { cn } from './utils/cn';
import { Bell, Search, Settings, Command } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabTitles: Record<TabType, string> = {
    dashboard: '📊 Dashboard',
    content: '🎬 Content Pipeline',
    schedule: '📅 Upload Schedule',
    analytics: '📈 Analytics',
    automation: '⚡ Automation',
    ideas: '💡 Ideas Bank',
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'content': return <ContentTab />;
      case 'schedule': return <ScheduleTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'automation': return <AutomationTab />;
      case 'ideas': return <IdeasTab />;
    }
  };

  return (
    <div className="min-h-screen bg-yt-dark text-yt-text">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main
        className={cn(
          'transition-all duration-300 min-h-screen',
          sidebarCollapsed ? 'ml-[68px]' : 'ml-[240px]'
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-yt-dark/80 backdrop-blur-xl border-b border-yt-border">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-white">{tabTitles[activeTab]}</h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden sm:flex items-center gap-2 bg-yt-surface border border-yt-border rounded-lg px-3 py-2 text-sm text-yt-text-dim w-64 hover:border-yt-accent/30 transition-colors cursor-pointer">
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <div className="ml-auto flex items-center gap-0.5 text-[10px] bg-yt-surface-2 px-1.5 py-0.5 rounded">
                  <Command className="w-3 h-3" /> K
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-yt-surface text-yt-text-dim hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-yt-red animate-pulse" />
              </button>

              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-yt-surface text-yt-text-dim hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yt-accent to-yt-accent-2 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:ring-2 hover:ring-yt-accent/50 transition-all">
                TF
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}

export default App;
