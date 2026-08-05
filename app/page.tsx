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

import {
  playPushNotificationSound,
  playClickSound
} from '@/src/utils/audio';


export default function Home() {

  const [articles, setArticles] =
    useState<NewsArticle[]>(INITIAL_NEWS);


  const [activeCategory, setActiveCategory] =
    useState<NewsCategory>('all');


  const [searchQuery, setSearchQuery] =
    useState('');


  const [viewMode, setViewMode] =
    useState<ViewMode>('grid');


  const [selectedArticle, setSelectedArticle] =
    useState<NewsArticle | null>(null);



  const [preferences, setPreferences] =
    useState<UserPreferences>({
      selectedCategories:[
        'web-dev',
        'mobile',
        'software',
        'ai-cloud',
        'millerz-insights'
      ],

      viewMode:'grid',

      theme:'dark-obsidian',

      autoRefreshSeconds:60,

      enableSoundNotifications:true,

      notificationTopics:[
        'web-dev',
        'mobile',
        'software',
        'ai-cloud'
      ],

      minImpactScoreFilter:10,

      newsletterSubscribed:true,

      email:'engineering@millerz.tech',

      pushEnabled:true,

      savedArticleIds:[
        'news-1',
        'news-3'
      ],

      readArticleIds:[]
    });



  const [notifications,setNotifications] =
    useState<NotificationItem[]>([
      {
        id:'notif-1',

        title:'⚡ Next.js 16 App Router Live',

        message:
        'Millerz Engineering initialized Next.js 16 App Router with Turbopack and Gemini AI.',

        timestamp:
        new Date(Date.now()-1000*60*15).toISOString(),

        read:false,

        category:'web-dev',

        linkArticleId:'news-1',

        priority:'high'
      },

      {
        id:'notif-2',

        title:'📱 iOS & Android Quantum UI System',

        message:
        'New responsive mobile components updated in Millerz Design System.',

        timestamp:
        new Date(Date.now()-1000*60*120).toISOString(),

        read:true,

        category:'mobile',

        linkArticleId:'news-2',

        priority:'normal'
      }
    ]);



  const [activeToast,setActiveToast] =
    useState<NotificationItem | null>(null);



  const [isPreferencesOpen,setIsPreferencesOpen] =
    useState(false);


  const [isSubscriptionsOpen,setIsSubscriptionsOpen] =
    useState(false);


  const [isNotificationsOpen,setIsNotificationsOpen] =
    useState(false);


  const [isQuoteModalOpen,setIsQuoteModalOpen] =
    useState(false);



  const [isGeneratingPulse,setIsGeneratingPulse] =
    useState(false);


  const [isOnlySaved,setIsOnlySaved] =
    useState(false);



  const unreadNotifCount =
    notifications.filter(n=>!n.read).length;



  const filteredArticles =
    articles.filter(article=>{


      if(
        isOnlySaved &&
        !preferences.savedArticleIds.includes(article.id)
      ){
        return false;
      }


      if(
        activeCategory !== 'all' &&
        article.category !== activeCategory
      ){
        return false;
      }



      if(searchQuery.trim()){

        const q =
        searchQuery.toLowerCase();


        const match =
          article.title.toLowerCase().includes(q) ||
          article.summary.toLowerCase().includes(q) ||
          (article.techTags || [])
          .some(tag =>
            tag.toLowerCase().includes(q)
          );


        if(!match)
          return false;
      }


      return true;

    });



  const handleToggleBookmark =
  (articleId:string)=>{

    if(preferences.enableSoundNotifications)
      playClickSound();


    setPreferences(prev=>{

      const exists =
      prev.savedArticleIds.includes(articleId);


      return {
        ...prev,

        savedArticleIds:
        exists

        ? prev.savedArticleIds.filter(
            id=>id!==articleId
          )

        :

        [
          ...prev.savedArticleIds,
          articleId
        ]

      };

    });

  };



  const handleLikeArticle =
  (articleId:string)=>{

    setArticles(prev=>
      prev.map(article=>

        article.id===articleId

        ?

        {
          ...article,
          likesCount:
          (article.likesCount || 0)+1
        }

        :

        article

      )
    );

  };



  const handleTriggerTestPush =
  async()=>{

    try{

      const res =
      await fetch(
        '/api/notifications/trigger-push',
        {
          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body:JSON.stringify({

            title:
            '🚀 Millerz Next.js 16 App Router Online',

            message:
            'Instant AI Quotation Generator and Route Handlers are active.',

            category:'web-dev'

          })

        }
      );


      const data =
      await res.json();


      if(
        data.status==='success' &&
        data.notification
      ){

        const notif={
          ...data.notification,
          priority:'high'
        };


        setNotifications(prev=>[
          notif,
          ...prev
        ]);


        setActiveToast(notif);


        playPushNotificationSound();

      }


    }catch(error){

      console.error(error);

    }

  };



  const handleGeneratePulse =
  ()=>{

    setIsGeneratingPulse(true);


    setTimeout(()=>{

      const article:NewsArticle={

        id:`pulse-${Date.now()}`,

        title:
        'Next.js 16 App Router & Turbopack Performance Blueprint',

        summary:
        'Millerz Engineering publishes benchmarks on Next.js 16 performance.',

        fullContent:
        'Next.js 16 represents a major leap in full-stack architecture.',

        category:'web-dev',

        source:{
          name:'Millerz Tech Radar',
          url:'https://millerz.dev'
        },

        publishedAt:'Just Now',

        readTime:'3 min read',

        imageUrl:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c',

        author:
        'Chief Architect @ Millerz',

        techTags:[
          'Next.js 16',
          'React 19',
          'Turbopack'
        ],

        impactScore:98,

        sentiment:'bullish',

        likesCount:18

      };


      setArticles(prev=>[
        article,
        ...prev
      ]);


      setIsGeneratingPulse(false);


    },1500);

  };return (
  <div className="min-h-screen bg-[#0B0E0C] text-[#F3F5F3] font-sans selection:bg-[#C85223] selection:text-white flex flex-col justify-between">


    {/* Push Toast */}
    {activeToast && (
      <PushToast
        notification={activeToast}
        onDismiss={() => setActiveToast(null)}
        onClickToast={(articleId) => {

          const found =
            articles.find(
              article => article.id === articleId
            );

          if(found){
            setSelectedArticle(found);
          }

          setActiveToast(null);

        }}
      />
    )}



    {/* Header */}
    <Header

      preferences={preferences}

      unreadNotificationsCount={
        unreadNotifCount
      }

      onOpenNotifications={() =>
        setIsNotificationsOpen(true)
      }

      onOpenPreferences={() =>
        setIsPreferencesOpen(true)
      }

      onOpenSubscriptions={() =>
        setIsSubscriptionsOpen(true)
      }

      onOpenSaved={() =>
        setIsOnlySaved(prev=>!prev)
      }

      onOpenQuoteModal={() =>
        setIsQuoteModalOpen(true)
      }

      searchQuery={searchQuery}

      setSearchQuery={setSearchQuery}

      viewMode={viewMode}

      setViewMode={setViewMode}

      onGeneratePulse={
        handleGeneratePulse
      }

      isGeneratingPulse={
        isGeneratingPulse
      }

      onToggleSound={() =>
        setPreferences(prev=>({
          ...prev,
          enableSoundNotifications:
          !prev.enableSoundNotifications
        }))
      }

      onTriggerTestPush={
        handleTriggerTestPush
      }

    />



    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1 w-full">


      <HeroSection

        onOpenQuoteModal={() =>
          setIsQuoteModalOpen(true)
        }

        onExploreCategory={(category)=>
          setActiveCategory(category)
        }

      />



      <MillerzShowcase

        onSelectProjectNews={(id)=>{

          const article =
          articles.find(
            a=>a.id===id
          );

          if(article)
            setSelectedArticle(article);

        }}

      />



      <div className="space-y-4 pt-4 border-t border-[#212E25]">

        <CategoryPills

          activeCategory={
            activeCategory
          }

          onSelectCategory={
            setActiveCategory
          }

        />

      </div>




      <div
        className={
          viewMode==='grid'

          ?

          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

          :

          "space-y-4"
        }
      >


        {filteredArticles.map(article=>(


          <ArticleCard

            key={article.id}

            article={article}

            viewMode={viewMode}

            isSaved={
              preferences.savedArticleIds.includes(
                article.id
              )
            }


            isRead={
              preferences.readArticleIds.includes(
                article.id
              )
            }


            onToggleSave={
              handleToggleBookmark
            }


            onSelectArticle={
              setSelectedArticle
            }


            onAnalyzeAI={(article)=>{

              console.log(
                "AI analysis",
                article
              );

            }}

          />


        ))}


      </div>




      {filteredArticles.length===0 && (

        <div className="py-20 text-center bg-[#131A15] rounded-3xl border border-[#212E25]">

          <p className="text-gray-400 font-mono">
            No engineering articles found.
          </p>

        </div>

      )}



    </main>




    <Footer

      onOpenQuoteModal={() =>
        setIsQuoteModalOpen(true)
      }

      onSelectCategory={
        setActiveCategory
      }

    />





    {/* Quote Generator */}

    <QuoteGeneratorModal

      isOpen={
        isQuoteModalOpen
      }

      onClose={() =>
        setIsQuoteModalOpen(false)
      }

      defaultEmail={
        preferences.email
      }

    />





    {/* Article Modal */}

    <ArticleDetailModal

      article={
        selectedArticle
      }

      onClose={() =>
        setSelectedArticle(null)
      }


      isSaved={
        selectedArticle
        ?

        preferences.savedArticleIds.includes(
          selectedArticle.id
        )

        :

        false
      }


      onToggleSave={
        handleToggleBookmark
      }


      onAnalyzeAI={(article)=>{

        console.log(
          "AI",
          article
        );

      }}


      isAnalyzing={false}

    />






    {/* Preferences */}

    <PreferencesModal

      preferences={
        preferences
      }


      onClose={() =>
        setIsPreferencesOpen(false)
      }


      onSavePreferences={(updated)=>

        setPreferences(prev=>({
          ...prev,
          ...updated
        }))

      }

    />






    {/* Subscription Drawer - FIXED */}

    <SubscriptionDrawer

      isOpen={
        isSubscriptionsOpen
      }


      onClose={() =>
        setIsSubscriptionsOpen(false)
      }


      userEmail={
        preferences.email
      }


      onUpdateSubscription={async(
        email,
        topics,
        frequency,
        pushEnabled
      )=>{


        setPreferences(prev=>({

          ...prev,

          email,

          notificationTopics:
          topics,

          pushEnabled,

          newsletterSubscribed:true

        }));



        await fetch(
          "/api/subscriptions",
          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },


            body:JSON.stringify({

              email,

              topics,

              frequency,

              pushEnabled

            })

          }
        );


      }}

    />






    {/* Notifications Drawer - FIXED */}

    <NotificationDrawer

      isOpen={
        isNotificationsOpen
      }


      onClose={() =>
        setIsNotificationsOpen(false)
      }


      notifications={
        notifications
      }


      onMarkAllRead={()=>{

        setNotifications(prev=>

          prev.map(notification=>({

            ...notification,

            read:true

          }))

        );

      }}



      onSelectNotification={(notification)=>{


        setNotifications(prev=>

          prev.map(item=>

            item.id===notification.id

            ?

            {
              ...item,
              read:true
            }

            :

            item

          )

        );



        if(notification.linkArticleId){

          const article =
          articles.find(
            a=>a.id===notification.linkArticleId
          );


          if(article)
            setSelectedArticle(article);

        }



        setIsNotificationsOpen(false);


      }}

    />



  </div>
);
}
