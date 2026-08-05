import React, { useState } from 'react';
import { X, Settings, SlidersHorizontal, Volume2, VolumeX, Bell, Check, RefreshCw, Mail, Shield, Save } from 'lucide-react';
import { UserPreferences, NewsCategory, ViewMode } from '../types';
import { CATEGORIES_CONFIG } from './CategoryNav';

interface PreferencesModalProps {
  preferences: UserPreferences;
  onClose: () => void;
  onSavePreferences: (newPrefs: Partial<UserPreferences>) => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  preferences,
  onClose,
  onSavePreferences
}) => {
  const [selectedCats, setSelectedCats] = useState<NewsCategory[]>(preferences.selectedCategories || ['all']);
  const [viewMode, setViewMode] = useState<ViewMode>(preferences.viewMode || 'grid');
  const [autoRefresh, setAutoRefresh] = useState<number>(preferences.autoRefreshSeconds || 60);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(preferences.enableSoundNotifications);
  const [pushEnabled, setPushEnabled] = useState<boolean>(preferences.pushEnabled);
  const [minImpact, setMinImpact] = useState<number>(preferences.minImpactScoreFilter || 0);
  const [email, setEmail] = useState<string>(preferences.email || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleCategory = (cat: NewsCategory) => {
    if (cat === 'all') {
      setSelectedCats(['all']);
      return;
    }
    const withoutAll = selectedCats.filter(c => c !== 'all');
    if (withoutAll.includes(cat)) {
      const next = withoutAll.filter(c => c !== cat);
      setSelectedCats(next.length === 0 ? ['all'] : next);
    } else {
      setSelectedCats([...withoutAll, cat]);
    }
  };

  const handleSave = () => {
    onSavePreferences({
      selectedCategories: selectedCats,
      viewMode,
      autoRefreshSeconds: autoRefresh,
      enableSoundNotifications: soundEnabled,
      pushEnabled,
      minImpactScoreFilter: minImpact,
      email
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0B0F17] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>AGGREGATOR & PUSH PREFERENCES</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
          
          {/* Email & Push Registration */}
          <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-3">
            <label className="font-mono text-cyan-300 font-bold block uppercase tracking-wider text-[11px]">
              Developer Email & Push Notification Endpoint
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@millerz.dev"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Real-time Push & Sound Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-gray-200 font-bold block">Real-time Push Alerts</span>
                <span className="text-gray-400 text-[11px]">Browser & in-app alerts for breaking news</span>
              </div>
              <button
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                  pushEnabled ? 'bg-cyan-500' : 'bg-gray-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  pushEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-gray-200 font-bold block">Sound FX Chime</span>
                <span className="text-gray-400 text-[11px]">Play audio sound on breaking pulse</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition ${
                  soundEnabled ? 'bg-cyan-950 border-cyan-800 text-cyan-400' : 'bg-gray-950 border-gray-800 text-gray-500'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Auto Refresh Seconds */}
          <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-gray-200 font-bold uppercase tracking-wider text-[11px]">
                Feed Refresh Interval
              </span>
              <span className="font-mono text-cyan-400 font-bold">
                {autoRefresh === 0 ? 'Manual Only' : `${autoRefresh} Seconds`}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[30, 60, 120, 0].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setAutoRefresh(sec)}
                  className={`py-2 rounded-xl font-mono text-xs border transition ${
                    autoRefresh === sec ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {sec === 0 ? 'Off' : `${sec}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred News Categories */}
          <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-3">
            <span className="font-mono text-gray-200 font-bold block uppercase tracking-wider text-[11px]">
              Subscribed Topic Channels
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES_CONFIG.map((cat) => {
                const isSelected = selectedCats.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition ${
                      isSelected ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {isSelected && '✓ '} {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimum Impact Score Filter */}
          <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="text-gray-200 font-bold">Minimum Impact Filter Score</span>
              <span className="text-cyan-400 font-bold">{minImpact}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minImpact}
              onChange={(e) => setMinImpact(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 bg-gray-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-xs font-mono"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Saved!' : 'Save Preferences'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
