export type VideoStatus = 'idea' | 'scripting' | 'recording' | 'editing' | 'thumbnail' | 'scheduled' | 'published';

export interface Video {
  id: string;
  title: string;
  description: string;
  status: VideoStatus;
  thumbnail?: string;
  scheduledDate?: string;
  publishedDate?: string;
  views: number;
  likes: number;
  comments: number;
  duration: string;
  tags: string[];
  category: string;
  ctr: number;
  avgViewDuration: string;
  revenue: number;
}

export interface ChannelStats {
  subscribers: number;
  totalViews: number;
  totalVideos: number;
  watchHours: number;
  estimatedRevenue: number;
  avgCTR: number;
  avgViewDuration: string;
  subscriberGrowth: number;
}

export interface AnalyticsData {
  date: string;
  views: number;
  subscribers: number;
  revenue: number;
  watchHours: number;
}

export interface ContentIdea {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  estimatedViews: string;
  addedDate: string;
  notes: string;
}

export interface ScheduleItem {
  id: string;
  videoId: string;
  title: string;
  date: string;
  time: string;
  platform: string;
  status: 'pending' | 'published' | 'failed';
}

export interface WorkflowStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  assignee: string;
  dueDate: string;
}

export type TabType = 'dashboard' | 'content' | 'schedule' | 'analytics' | 'automation' | 'ideas';
