'use client';

import React, { useState } from 'react';
import { 
  NewsCategory, 
  NewsArticle, 
  UserPreferences, 
  NotificationItem, 
  ViewMode 
} from '@/src/types';
import { INITIAL_NEWS } from '@/src/data/initialNews';
import { Header } from '@/src/components/Header';
import { HeroSection } from '@/src/components/HeroSection';
import { CategoryPills } from '@/src/components/CategoryPills';
import { ArticleCard } from '@/src/components/ArticleCard';
import { MillerzShowcase } from '@/src/components/MillerzShowcase';
import { ArticleDetailModal } from '@/src/components/ArticleDetailModal';
import { PreferencesModal } from '@/src/components/PreferencesModal';
import { SubscriptionDrawer } from '@/src/components/SubscriptionDrawer';
import { NotificationDrawer } from '@/src/components/NotificationDrawer';
import { PushToast } from '@/src/components/PushToast';
import { QuoteGeneratorModal } from '@/src/components/QuoteGeneratorModal';
import { Footer } from '@/src/components/Footer';
import { playPushNotificationSound, playClickSound } from '@/src/utils/audio';

export default function Home() {
  // Articles Data State
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Selected Article Modal State
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // User Preferences & Subscription State
  const [preferences, setPreferences] = useState<UserPreferences>({
    selectedCategories: ['web-dev', 'mobile', 'software', 'ai-cloud', 'millerz-insights'],
    viewMode: 'grid',
    theme: 'dark-obsidian',
    autoRefreshSeconds: 60,
    enableSoundNotifications: true,
    notificationTopics: ['web-dev', 'mobile', 'software', 'ai-cloud'],
    minImpactScoreFilter: 10,
    newsletterSubscribed: true,
    email: 'engineering@millerz.tech',
    pushEnabled: true,
    savedArticleIds: ['news-1', 'news-3'],
    readArticleIds: []
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: '⚡ Next.js 16 App Router Live',
      message: 'Millerz Engineering initialized Next.js 16 App Router with Turbopack and Gemini AI.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      category: 'web-dev',
      linkArticleId: 'news-1',
      priority: 'high'
    },
    {
      id: 'notif-2',
      title: '📱 iOS & Android Quantum UI System',
      message: 'New responsive mobile components updated in Millerz Design System.',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      read: true,
      category: 'mobile',
      linkArticleId: 'news-2',
      priority: 'normal'
    }
  ]);

  // Toast State for Push Event Simulation
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // UI Drawers & Modals Control
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Loading & Filter States
  const [isGeneratingPulse, setIsGeneratingPulse] = useState(false);
  const [isOnlySaved, setIsOnlySaved] = useState(false);

  // Unread Count
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Filter Articles
  const filteredArticles = articles.filter(art => {
    if (isOnlySaved && !preferences.savedArticleIds.includes(art.id)) {
      return false;
    }

    if (activeCategory !== 'all' && art.category !== activeCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSummary = art.summary.toLowerCase().includes(q);
      const matchTags = (art.techTags || []).some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchTags) return false;
    }

    return true;
  });

  // Toggle Bookmark/Saved
  const handleToggleBookmark = (articleId: string) => {
    if (preferences.enableSoundNotifications) playClickSound();
    setPreferences(prev => {
      const isSaved = prev.savedArticleIds.includes(articleId);
      const updated = isSaved 
        ? prev.savedArticleIds.filter(id => id !== articleId)
        : [...prev.savedArticleIds, articleId];
      return { ...prev, savedArticleIds: updated };
    });
  };

  // Like Article
  const handleLikeArticle = (articleId: string) => {
    if (preferences.enableSoundNotifications) playClickSound();
    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return { ...art, likesCount: (art.likesCount || 0) + 1 };
      }
      return art;
    }));
  };

  // Trigger Real-time Push Event
  const handleTriggerTestPush = async () => {
    try {
      const res = await fetch('/api/notifications/trigger-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '🚀 Millerz Next.js 16 App Router Online',
          message: 'Instant AI Quotation Generator and Route Handlers are active.',
          category: 'web-dev'
        })
      });

      const data = await res.json();
      if (data.status === 'success' && data.notification) {
        const notif: NotificationItem = {
          ...data.notification,
          priority: 'high'
        };
        setNotifications(prev => [notif, ...prev]);
        setActiveToast(notif);
        if (preferences.enableSoundNotifications) {
          playPushNotificationSound();
        }
      }
    } catch (e) {
      console.error("Push trigger error:", e);
    }
  };

  // AI Live Pulse News Scan
  const handleGeneratePulse = () => {
    setIsGeneratingPulse(true);
    setTimeout(() => {
      const freshArticle: NewsArticle = {
        id: `pulse-${Date.now()}`,
        title: 'Next.js 16 App Router & Turbopack Performance Blueprint',
        summary: 'Millerz Engineering publishes benchmarks on Next.js 16 sub-10ms response times, route handlers, and server-side secret isolation.',
        fullContent: `Next.js 16 represents a major leap in full-stack JavaScript architecture. With Turbopack as the default compiler and enhanced App Router handlers, enterprise web applications build 75% faster and deliver near-zero cold starts.

Millerz Technologies integrates Next.js 16 across client projects to ensure top-tier lighthouse scores, server-side secret isolation, and rich React 19 motion transitions.`,
        category: 'web-dev',
        source: {
          name: 'Millerz Tech Radar',
          url: 'https://millerz.dev/blog/nextjs-16'
        },
        publishedAt: 'Just Now',
        readTime: '3 min read',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
        author: 'Chief Architect @ Millerz',
        techTags: ['Next.js 16', 'Turbopack', 'React 19', 'Performance'],
        impactScore: 98,
        sentiment: 'bullish',
        likesCount: 18
      };

      setArticles(prev => [freshArticle, ...prev]);
      setIsGeneratingPulse(false);

      const notifItem: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: '✨ New Next.js 16 Intelligence',
        message: freshArticle.title,
        timestamp: new Date().toISOString(),
        read: false,
        category: 'web-dev',
        linkArticleId: freshArticle.id,
        priority: 'high'
      };

      setNotifications(prev => [notifItem, ...prev]);
      setActiveToast(notifItem);
      if (preferences.enableSoundNotifications) {
        playPushNotificationSound();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0E0C] text-[#F3F5F3] font-sans selection:bg-[#C85223] selection:text-white flex flex-col justify-between">
      
      {/* Real-time Push Toast */}
      {activeToast && (
        <PushToast
  notification={activeToast}
  onDismiss={() => setActiveToast(null)}
  onClickToast={(artId) => {
    const found = articles.find(a => a.id === artId);
    if (found) setSelectedArticle(found);
    setActiveToast(null);
  }}
/>
      )}

      {/* 1. Header with Millerz Logo & Actions */}
      <Header
        preferences={preferences}
        unreadNotificationsCount={unreadNotifCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onOpenSubscriptions={() => setIsSubscriptionsOpen(true)}
        onOpenSaved={() => setIsOnlySaved(!isOnlySaved)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onGeneratePulse={handleGeneratePulse}
        isGeneratingPulse={isGeneratingPulse}
        onToggleSound={() => setPreferences(p => ({ ...p, enableSoundNotifications: !p.enableSoundNotifications }))}
        onTriggerTestPush={handleTriggerTestPush}
      />

      {/* 2. Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1 w-full">
        
        {/* Hero Section */}
        <HeroSection 
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onExploreCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Millerz Projects Showcase */}
        <MillerzShowcase 
          onSelectProjectNews={(articleId) => {
            const found = articles.find(a => a.id === articleId);
            if (found) setSelectedArticle(found);
          }}
        />

        {/* Categories & Filter Bar */}
        <div className="space-y-4 pt-4 border-t border-[#212E25]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C85223] animate-pulse"></span>
                <span>Engineering Tech Radar & Articles</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {isOnlySaved ? 'Showing bookmarked reading list' : 'Real-time updates on Next.js 16 Web Platforms, Mobile Apps, Cloud Architecture & AI'}
              </p>
            </div>

            {/* Saved Toggle Pill */}
            {isOnlySaved && (
              <button
                onClick={() => setIsOnlySaved(false)}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-[#25432D] text-[#C29845] border border-[#345D3F] font-mono text-xs font-bold"
              >
                Show All Articles
              </button>
            )}
          </div>

          <CategoryPills
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Article Cards Grid */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filteredArticles.map((article) => (
           <ArticleCard
  key={article.id}
  article={article}
  viewMode={viewMode}
  isSaved={preferences.savedArticleIds.includes(article.id)}
  isRead={preferences.readArticleIds.includes(article.id)}
  onToggleSave={handleToggleBookmark}
  onSelectArticle={setSelectedArticle}
  onAnalyzeAI={(article) => {
    console.log(article);
  }}
/>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-20 text-center space-y-3 bg-[#131A15] rounded-3xl border border-[#212E25]">
            <p className="font-mono text-sm text-gray-400">
              No engineering articles match your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setIsOnlySaved(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#25432D] text-white font-mono text-xs font-bold hover:bg-[#345D3F] transition"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* 3. Millerz Official Footer */}
      <Footer 
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* --- MODALS & DRAWERS --- */}

      {/* Instant Project Quotation Generator Modal */}
      <QuoteGeneratorModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultEmail={preferences.email}
      />

      {/* Article Detail Modal */}
      <ArticleDetailModal
  article={selectedArticle}
  onClose={() => setSelectedArticle(null)}
  isSaved={
    selectedArticle
      ? preferences.savedArticleIds.includes(selectedArticle.id)
      : false
  }
  onToggleSave={handleToggleBookmark}
  onAnalyzeAI={(article) => {
    console.log(article);
  }}
  isAnalyzing={false}
/>

      {/* Preferences Modal */}
     <PreferencesModal
    preferences={preferences}
    onClose={() => setIsPreferencesOpen(false)}
    onSavePreferences={(updated) =>
      setPreferences(prev => ({
        ...prev,
        ...updated,
      }))
    }
  />

      {/* Subscriptions Drawer */}
      <SubscriptionDrawer
        isOpen={isSubscriptionsOpen}
        onClose={() => setIsSubscriptionsOpen(false)}
        email={preferences.email}
        frequency="daily"
        onSaveSub={(e, freq) => {
          setPreferences(prev => ({ ...prev, email: e }));
        }}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        onSelectNotification={(notif) => {
          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
          if (notif.linkArticleId) {
            const found = articles.find(a => a.id === notif.linkArticleId);
            if (found) setSelectedArticle(found);
          }
          setIsNotificationsOpen(false);
        }}
      />

    </div>
  );
}
