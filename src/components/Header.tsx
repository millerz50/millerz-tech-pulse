'use client';

import React, { useState } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  Settings,
  Bookmark,
  Volume2,
  VolumeX,
  Mail,
  Calculator,
  Menu,
  X,
  ChevronRight,
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
  viewMode,
  setViewMode,
  onToggleSound,
  onTriggerTestPush,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#26352A]/80 bg-[#0B0E0C]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Header Row */}
        <div className="min-h-[72px] flex items-center justify-between gap-4">

          {/* LOGO */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className="group flex items-center"
              aria-label="Millerz Technologies home"
            >
              <MillerzLogo
                size="md"
                showText
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:block flex-1 max-w-md mx-4 lg:mx-8">
            <div
              className={`
                relative flex items-center
                rounded-2xl
                bg-[#111712]
                border
                transition-all duration-300
                ${
                  isSearchFocused
                    ? 'border-[#C85223] shadow-lg shadow-[#C85223]/10'
                    : 'border-[#243228] hover:border-[#34503B]'
                }
              `}
            >
              <Search className="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search Millerz..."
                className="w-full h-10 bg-transparent pl-10 pr-10 text-sm text-white placeholder:text-gray-500 outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-gray-500 hover:text-white transition"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">

            {/* Quote */}
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="
                group
                flex items-center gap-2
                px-4 py-2.5
                rounded-xl
                bg-gradient-to-r from-[#C85223] to-[#E06332]
                text-white
                text-xs font-bold
                shadow-lg shadow-[#C85223]/15
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-xl hover:shadow-[#C85223]/20
                active:scale-95
              "
            >
              <Calculator className="w-4 h-4 transition-transform group-hover:rotate-6" />
              <span>Get a Quote</span>
            </button>

            {/* Services / AI */}
            <button
              type="button"
              onClick={onGeneratePulse}
              disabled={isGeneratingPulse}
              className="
                flex items-center gap-2
                px-3.5 py-2.5
                rounded-xl
                bg-[#172219]
                border border-[#2D4734]
                text-[#C29845]
                text-xs font-semibold
                transition-all duration-300
                hover:bg-[#203024]
                hover:border-[#42644B]
                hover:text-white
                disabled:opacity-60
                disabled:cursor-wait
              "
              title="Explore Millerz technology solutions"
            >
              <Sparkles
                className={`w-4 h-4 ${
                  isGeneratingPulse ? 'animate-spin' : ''
                }`}
              />
              <span>
                {isGeneratingPulse ? 'Loading...' : 'Solutions'}
              </span>
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={onOpenSaved}
              className="
                relative p-2.5
                rounded-xl
                bg-[#111712]
                border border-[#243228]
                text-gray-400
                hover:text-white
                hover:border-[#34503B]
                transition-all duration-300
                hover:-translate-y-0.5
              "
              title="Saved"
            >
              <Bookmark className="w-4 h-4" />

              {preferences.savedArticleIds.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#C85223] text-white text-[9px] font-bold flex items-center justify-center">
                  {preferences.savedArticleIds.length}
                </span>
              )}
            </button>

            {/* Email */}
            <button
              type="button"
              onClick={onOpenSubscriptions}
              className="
                p-2.5
                rounded-xl
                bg-[#111712]
                border border-[#243228]
                text-[#C29845]
                hover:text-white
                hover:border-[#34503B]
                transition-all duration-300
              "
              title="Email & subscriptions"
            >
              <Mail className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="
                relative p-2.5
                rounded-xl
                bg-[#111712]
                border border-[#243228]
                text-gray-400
                hover:text-white
                hover:border-[#34503B]
                transition-all duration-300
              "
              title="Notifications"
            >
              <Bell className="w-4 h-4" />

              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#C85223] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Sound */}
            <button
              type="button"
              onClick={onToggleSound}
              className={`
                p-2.5
                rounded-xl
                border
                transition-all duration-300
                ${
                  preferences.enableSoundNotifications
                    ? 'bg-[#172219] border-[#2D4734] text-[#C29845]'
                    : 'bg-[#111712] border-[#243228] text-gray-500 hover:text-white'
                }
              `}
              title={
                preferences.enableSoundNotifications
                  ? 'Mute sounds'
                  : 'Enable sounds'
              }
            >
              {preferences.enableSoundNotifications ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={onOpenPreferences}
              className="
                p-2.5
                rounded-xl
                bg-[#111712]
                border border-[#243228]
                text-gray-400
                hover:text-white
                hover:border-[#34503B]
                transition-all duration-300
              "
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* TABLET / MOBILE ACTIONS */}
          <div className="flex lg:hidden items-center gap-2">

            {/* Mobile quote */}
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="
                hidden sm:flex
                items-center gap-1.5
                px-3 py-2
                rounded-xl
                bg-gradient-to-r from-[#C85223] to-[#E06332]
                text-white
                text-[11px]
                font-bold
                transition-all
                active:scale-95
              "
            >
              <Calculator className="w-3.5 h-3.5" />
              Quote
            </button>

            {/* Notification */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="
                relative
                p-2.5
                rounded-xl
                bg-[#111712]
                border border-[#243228]
                text-gray-300
                hover:text-white
                transition
              "
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />

              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#C85223] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="
                p-2.5
                rounded-xl
                bg-[#111712]
                border border-[#243228]
                text-gray-300
                hover:text-white
                transition
              "
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden pb-3">
          <div
            className={`
              relative flex items-center
              rounded-xl
              bg-[#111712]
              border
              transition-all duration-300
              ${
                isSearchFocused
                  ? 'border-[#C85223]'
                  : 'border-[#243228]'
              }
            `}
          >
            <Search className="absolute left-3 w-4 h-4 text-gray-500" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search Millerz..."
              className="
                w-full
                h-10
                bg-transparent
                pl-9 pr-9
                text-sm
                text-white
                placeholder:text-gray-500
                outline-none
              "
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            lg:hidden
            overflow-hidden
            transition-all duration-300 ease-out
            ${
              mobileMenuOpen
                ? 'max-h-[600px] opacity-100 pb-4'
                : 'max-h-0 opacity-0'
            }
          `}
        >
          <div className="rounded-2xl border border-[#243228] bg-[#111712] p-3 space-y-1">

            {/* Quote */}
            <button
              type="button"
              onClick={() => {
                onOpenQuoteModal();
                closeMobileMenu();
              }}
              className="
                w-full flex items-center justify-between
                px-4 py-3
                rounded-xl
                bg-gradient-to-r from-[#C85223] to-[#E06332]
                text-white
                text-sm font-semibold
              "
            >
              <span className="flex items-center gap-3">
                <Calculator className="w-4 h-4" />
                Get a Project Quote
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Solutions */}
            <button
              type="button"
              onClick={() => {
                onGeneratePulse();
                closeMobileMenu();
              }}
              className="
                w-full flex items-center justify-between
                px-4 py-3
                rounded-xl
                text-gray-300
                hover:bg-[#172219]
                hover:text-white
                transition
              "
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#C29845]" />
                Our Solutions
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={() => {
                onOpenSaved();
                closeMobileMenu();
              }}
              className="
                w-full flex items-center justify-between
                px-4 py-3
                rounded-xl
                text-gray-300
                hover:bg-[#172219]
                hover:text-white
                transition
              "
            >
              <span className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-[#C29845]" />
                Saved
              </span>

              <span className="text-xs text-gray-500">
                {preferences.savedArticleIds.length}
              </span>
            </button>

            {/* Email */}
            <button
              type="button"
              onClick={() => {
                onOpenSubscriptions();
                closeMobileMenu();
              }}
              className="
                w-full flex items-center justify-between
                px-4 py-3
                rounded-xl
                text-gray-300
                hover:bg-[#172219]
                hover:text-white
                transition
              "
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C29845]" />
                Email & Subscriptions
              </span>

              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => {
                onOpenNotifications();
                closeMobileMenu();
              }}
              className="
                w-full flex items-center justify-between
                px-4 py-3
                rounded-xl
                text-gray-300
                hover:bg-[#172219]
                hover:text-white
                transition
              "
            >
              <span className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-[#C29845]" />
                Notifications
              </span>

              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#C85223] text-white text-[10px] font-bold">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Sound */}
            <button
              type="button"
              onClick={onToggleSound}
              className="
                w-full flex items-center justify-between
                px-4 py-3
                rounded-xl
                text-gray-300
                hover:bg-[#172219]
                hover:text-white
                transition
              "
            >
              <span className="flex items-center gap-3">
                {preferences.enableSoundNotifications ? (
                  <Volume2 className="w-4 h-4 text-[#C29845]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-gray-500" />
                )}

                Sound Notifications
              </span>

              <span className="text-xs text-gray-500">
                {preferences.enableSoundNotifications ? 'On' : 'Off'}
              </span>
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => {
                onOpenPreferences();
                closeMobileMenu();
              }}
              className="
                w-full flex items-center justify-between
                px-4 py-3
                rounded-xl
                text-gray-300
                hover:bg-[#172219]
                hover:text-white
                transition
              "
            >
              <span className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-[#C29845]" />
                Preferences
              </span>

              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Small status */}
            <div className="mt-2 px-4 py-3 border-t border-[#243228]">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Millerz Technologies
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
