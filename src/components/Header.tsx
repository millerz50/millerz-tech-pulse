import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Sparkles, 
  Settings, 
  Bookmark, 
  Radio, 
  Volume2, 
  VolumeX, 
  Mail,
  Calculator
} from 'lucide-react';
import { UserPreferences, ViewMode } from '../types';
import { MillerzLogo } from './MillerzLogo';

interface HeaderProps {
  preferences: UserPreferences;
  unreadNotificationsCount: number;
  isGeneratingPulse: boolean;
  onGeneratePulse: () => void;
  onOpenNotifications: () => void;
  onOpenPreferences: () => void;
  onOpenSubscriptions: () => void;
  onOpenSaved: () => void;
  onOpenQuoteModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  onToggleSound: () => void;
  onTriggerTestPush: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  preferences,
  unreadNotificationsCount,
  isGeneratingPulse,
  onGeneratePulse,
  onOpenNotifications,
  onOpenPreferences,
  onOpenSubscriptions,
  onOpenSaved,
  onOpenQuoteModal,
  searchQuery,
  setSearchQuery,
  onToggleSound,
  onTriggerTestPush
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0E0C]/90 backdrop-blur-md border-b border-[#212E25] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand Logo with Millerz Isometric Emblem */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
              <MillerzLogo size="md" />
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider font-mono uppercase bg-[#162B1D] text-[#C29845] border border-[#2D5237] rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>NEXT.JS 16 APP ROUTER</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenQuoteModal}
                className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#C85223] to-[#E06332] text-white font-mono text-[10px] font-bold flex items-center gap-1"
              >
                <Calculator className="w-3 h-3" />
                <span>Quote</span>
              </button>
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-lg bg-[#131A15] text-gray-300 hover:text-white transition"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C85223] text-white font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
              <button
                onClick={onOpenPreferences}
                className="p-2 rounded-lg bg-[#131A15] text-gray-300 hover:text-white transition"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:max-w-xs lg:max-w-md relative">
            <div className={`relative flex items-center rounded-xl bg-[#131A15] border transition-all duration-200 ${
              isSearchFocused ? 'border-[#C85223] shadow-lg shadow-[#C85223]/10' : 'border-[#212E25] hover:border-[#2D5237]'
            }`}>
              <Search className="w-4 h-4 ml-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search web dev, mobile, software news..."
                className="w-full py-2 pl-3 pr-8 bg-transparent text-xs text-gray-100 placeholder-gray-500 focus:outline-none font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="mr-3 text-xs text-gray-500 hover:text-gray-300 font-mono"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Get Project Quote Button (Millerz Copper & Gold) */}
            <button
              onClick={onOpenQuoteModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono font-bold text-xs bg-gradient-to-r from-[#C85223] via-[#D85B28] to-[#E06332] hover:opacity-95 text-white shadow-md shadow-[#C85223]/25 transition hover:scale-[1.02] active:scale-95 border border-[#E06332]/40"
              title="Get an Instant AI Project Cost Quotation & Scope Breakdown"
            >
              <Calculator className="w-3.5 h-3.5 text-white" />
              <span>Get Project Quote</span>
            </button>

            {/* Generate Live AI Pulse Button */}
            <button
              onClick={onGeneratePulse}
              disabled={isGeneratingPulse}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs transition border ${
                isGeneratingPulse
                  ? 'bg-[#1D2B20] text-[#C29845] border-[#2B4732] cursor-wait'
                  : 'bg-[#1D2B20] hover:bg-[#25432D] text-[#C29845] hover:text-white border-[#2D5237]'
              }`}
              title="Trigger Gemini 3.6 Flash live news scanner"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingPulse ? 'animate-spin text-[#C29845]' : 'text-[#C29845]'}`} />
              <span>{isGeneratingPulse ? 'Scanning...' : 'Live Radar'}</span>
            </button>

            {/* Test Push Event Simulation */}
            <button
              onClick={onTriggerTestPush}
              className="p-2 rounded-xl bg-[#131A15] border border-[#212E25] text-gray-300 hover:text-[#C29845] hover:border-[#2D5237] transition"
              title="Simulate Real-Time Push Notification Payload"
            >
              <Radio className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-xl border transition ${
                preferences.enableSoundNotifications
                  ? 'bg-[#1D2B20] border-[#2D5237] text-[#C29845]'
                  : 'bg-[#131A15] border-[#212E25] text-gray-500 hover:text-gray-300'
              }`}
              title={preferences.enableSoundNotifications ? 'Sound Alerts Enabled' : 'Sound Alerts Muted'}
            >
              {preferences.enableSoundNotifications ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Saved Bookmarks Button */}
            <button
              onClick={onOpenSaved}
              className="relative p-2 rounded-xl bg-[#131A15] border border-[#212E25] text-gray-300 hover:text-white hover:border-[#2D5237] transition"
              title="Saved Reading List"
            >
              <Bookmark className="w-4 h-4" />
              {preferences.savedArticleIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85223] text-white font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {preferences.savedArticleIds.length}
                </span>
              )}
            </button>

            {/* Subscriptions Drawer Button */}
            <button
              onClick={onOpenSubscriptions}
              className="p-2 rounded-xl bg-[#131A15] border border-[#212E25] text-gray-300 hover:text-[#C29845] hover:border-[#2D5237] transition"
              title="Subscriptions & Email Alerts"
            >
              <Mail className="w-4 h-4 text-[#C29845]" />
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-[#131A15] border border-[#212E25] text-gray-300 hover:text-white hover:border-[#2D5237] transition"
              title="Live Notification Inbox"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85223] text-white font-extrabold text-[10px] rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Preferences Gear */}
            <button
              onClick={onOpenPreferences}
              className="p-2 rounded-xl bg-[#131A15] border border-[#212E25] text-gray-300 hover:text-white hover:border-[#2D5237] transition"
              title="Aggregator & Push Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

