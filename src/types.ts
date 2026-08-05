export type NewsCategory = 
  | 'all'
  | 'web-dev'
  | 'mobile'
  | 'software'
  | 'ai-cloud'
  | 'millerz-insights'
  | 'design-ux';

export type ViewMode = 'grid' | 'list' | 'compact' | 'magazine';

export type SentimentType = 'bullish' | 'neutral' | 'crucial' | 'emerging';

export interface AISummary {
  executiveSummary: string;
  keyTakeaways: string[];
  impactAnalysis: string;
  codeSnippetOrAction?: string;
  millerzRecommendation?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent?: string;
  category: NewsCategory;
  source: {
    name: string;
    url: string;
    logo?: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  author: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  millerzTake?: string;
  techTags: string[];
  impactScore: number; // 1 - 100
  sentiment: SentimentType;
  aiSummary?: AISummary;
  viewsCount?: number;
  likesCount?: number;
}

export interface ProjectQuotation {
  quotationId: string;
  clientName: string;
  companyName?: string;
  email: string;
  projectType: 'Web Platform' | 'Mobile App' | 'AI & Cloud System' | 'Enterprise Full-Stack' | 'Design System & UI';
  features: string[];
  targetTimeline: string;
  estimatedPriceRange: {
    min: number;
    max: number;
    currency: string;
  };
  itemizedScope: {
    moduleName: string;
    description: string;
    estimatedHours: number;
    cost: number;
  }[];
  architectureProposal: string;
  recommendedTechStack: string[];
  deliveryMilestones: {
    phase: string;
    weeks: number;
    deliverables: string;
  }[];
  generatedAt: string;
  validityDays: number;
  status: 'draft' | 'submitted' | 'approved';
}

export interface UserPreferences {
  selectedCategories: NewsCategory[];
  viewMode: ViewMode;
  theme: 'dark-obsidian' | 'dark-cyan' | 'dark-midnight';
  autoRefreshSeconds: number; // e.g. 30, 60, 120, 0 = off
  enableSoundNotifications: boolean;
  notificationTopics: NewsCategory[];
  minImpactScoreFilter: number;
  newsletterSubscribed: boolean;
  email: string;
  pushEnabled: boolean;
  savedArticleIds: string[];
  readArticleIds: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NewsCategory;
  timestamp: string;
  read: boolean;
  linkArticleId?: string;
  priority: 'high' | 'normal' | 'breaking';
}

export interface SubscriptionRecord {
  id: string;
  email: string;
  createdAt: string;
  topics: NewsCategory[];
  frequency: 'instant' | 'daily' | 'weekly';
  status: 'active' | 'paused';
  pushToken?: string;
}

export interface MillerzProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  type: 'Web Platform' | 'Mobile App' | 'AI System' | 'Design System';
  metrics: string;
  imageUrl: string;
  featuredArticleId?: string;
}
