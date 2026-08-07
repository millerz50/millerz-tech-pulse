import React from 'react';
import { Flame, ArrowUpRight, Zap, Radio } from 'lucide-react';
import { NewsArticle } from '../types';

interface BreakingTickerProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  articles,
  onSelectArticle
}) => {
  const breakingItems = articles.filter(a => a.isBreaking || a.impactScore >= 92);

  if (breakingItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-950/60 via-gray-900 to-blue-950/60 border-y border-cyan-900/40 py-2 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs">
        
        {/* Ticker Badge */}
        <div className="flex items-center gap-1.5 shrink-0 bg-red-500/15 border border-red-500/30 text-red-400 font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <Flame className="w-3 h-3 text-red-400" />
          <span>BREAKING PULSE</span>
        </div>

        {/* Scrolling Ticker Items */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 py-0.5">
          {breakingItems.map((item) => (
            <button
              key={`ticker-${item.id}`}
              onClick={() => onSelectArticle(item)}
              className="flex items-center gap-2 shrink-0 group text-left hover:text-cyan-300 transition text-gray-200 text-xs"
            >
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-400 rounded font-semibold">
                SCORE {item.impactScore}
              </span>
              <span className="font-medium group-hover:underline truncate max-w-xs sm:max-w-md">
                {item.title}
              </span>
              <ArrowUpRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-gray-700 mx-1">•</span>
            </button>
          ))}
        </div>

        {/* Millerz Live Status */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 text-gray-400 font-mono text-[11px] pl-3 border-l border-gray-800">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>REAL-TIME PUSH: <span className="text-emerald-400 font-semibold">CONNECTED</span></span>
        </div>

      </div>
    </div>
  );
};
