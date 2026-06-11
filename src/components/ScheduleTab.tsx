import { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { scheduleItems } from '../data/mockData';
import { cn } from '../utils/cn';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const platformColors: Record<string, string> = {
  'YouTube': 'bg-red-500/20 text-red-400 border-red-500/30',
  'YouTube Shorts': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'TikTok': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Instagram': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const statusIcons = {
  pending: <Clock className="w-4 h-4 text-yt-yellow" />,
  published: <CheckCircle2 className="w-4 h-4 text-yt-green" />,
  failed: <AlertCircle className="w-4 h-4 text-yt-red" />,
};

export function ScheduleTab() {
  const [currentMonth, setCurrentMonth] = useState(1); // Feb
  const [currentYear] = useState(2025);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const getScheduleForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduleItems.filter(s => s.date === dateStr);
  };

  const pendingCount = scheduleItems.filter(s => s.status === 'pending').length;
  const publishedCount = scheduleItems.filter(s => s.status === 'published').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Upload Schedule</h2>
          <p className="text-sm text-yt-text-dim mt-1">Plan and schedule your content across platforms</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-yt-accent to-yt-accent-2 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Schedule Upload
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yt-yellow/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-yt-yellow" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{pendingCount}</p>
            <p className="text-xs text-yt-text-dim">Scheduled</p>
          </div>
        </div>
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yt-green/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-yt-green" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{publishedCount}</p>
            <p className="text-xs text-yt-text-dim">Published</p>
          </div>
        </div>
        <div className="bg-yt-surface rounded-xl border border-yt-border p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yt-accent/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-yt-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{scheduleItems.length}</p>
            <p className="text-xs text-yt-text-dim">Total Posts</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-yt-surface rounded-xl border border-yt-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {months[currentMonth]} {currentYear}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}
                className="p-1.5 rounded-lg hover:bg-yt-surface-2 text-yt-text-dim hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}
                className="p-1.5 rounded-lg hover:bg-yt-surface-2 text-yt-text-dim hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-xs font-medium text-yt-text-dim py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              const schedule = day ? getScheduleForDay(day) : [];
              return (
                <div
                  key={i}
                  className={cn(
                    'min-h-[80px] rounded-lg p-2 text-xs transition-colors',
                    day
                      ? 'bg-yt-surface-2 hover:bg-yt-border/30 cursor-pointer'
                      : 'bg-transparent'
                  )}
                >
                  {day && (
                    <>
                      <span className={cn(
                        'text-sm font-medium',
                        schedule.length > 0 ? 'text-yt-accent' : 'text-yt-text-dim'
                      )}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {schedule.map(s => (
                          <div
                            key={s.id}
                            className={cn(
                              'px-1.5 py-0.5 rounded text-[10px] truncate border',
                              platformColors[s.platform] || 'bg-yt-border/50 text-yt-text-dim border-yt-border'
                            )}
                          >
                            {s.time}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-yt-surface rounded-xl border border-yt-border p-5">
          <h3 className="text-lg font-semibold text-white mb-4">📋 Upcoming Posts</h3>
          <div className="space-y-3">
            {scheduleItems.map((item, i) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-yt-surface-2 border border-yt-border/50 animate-slide-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded border',
                        platformColors[item.platform] || 'bg-yt-border/50 text-yt-text-dim border-yt-border'
                      )}>
                        {item.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-yt-text-dim">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div className="shrink-0 ml-2">
                    {statusIcons[item.status]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
