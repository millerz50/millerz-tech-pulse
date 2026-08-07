import React, { useState } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  Clock, 
  Eye, 
  ExternalLink, 
  TrendingUp, 
  Zap, 
  Share2, 
  Check, 
  ChevronDown,
  ChevronUp,
  MessageSquareCode
} from 'lucide-react';
import { NewsArticle, ViewMode } from '../types';

interface ArticleCardProps {
  article: NewsArticle;
  viewMode: ViewMode;
  isSaved: boolean;
  isRead: boolean;
  onToggleSave: (id: string) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onAnalyzeAI: (article: NewsArticle) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  viewMode,
  isSaved,
  isRead,
  onToggleSave,
  onSelectArticle,
  onAnalyzeAI
}) => {
  const [showQuickAI, setShowQuickAI] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(article.source.url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sentimentColor = 
    article.sentiment === 'bullish' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
    article.sentiment === 'crucial' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
    article.sentiment === 'emerging' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
    'bg-gray-800 text-gray-400 border-gray-700';

  // --- 1. COMPACT VIEW MODE ---
  if (viewMode === 'compact') {
    return (
      <div 
        onClick={() => onSelectArticle(article)}
        className={`group p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isRead ? 'bg-gray-950/60 border-gray-900 opacity-75' : 'bg-gray-900/80 border-gray-800 hover:border-cyan-500/40 hover:bg-gray-900'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 bg-cyan-950 border border-cyan-800/80 rounded shrink-0">
            {article.impactScore}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-gray-100 group-hover:text-cyan-300 transition truncate">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1 font-sans">
              <span className="text-gray-300 font-medium">{article.source.name}</span>
              <span>•</span>
              <span>{article.publishedAt}</span>
              <span>•</span>
              <span className="capitalize text-cyan-400/80">{article.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 justify-end">
          <button
            onClick={(e) => { e.stopPropagation(); onAnalyzeAI(article); }}
            className="px-2.5 py-1 text-[11px] font-medium bg-cyan-950/80 border border-cyan-800 text-cyan-300 rounded-lg hover:bg-cyan-900 transition flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>AI Brief</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave(article.id); }}
            className={`p-1.5 rounded-lg border transition ${
              isSaved ? 'bg-blue-950 border-blue-800 text-blue-400' : 'bg-gray-800/80 border-gray-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // --- 2. LIST VIEW MODE ---
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelectArticle(article)}
        className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-5 ${
          isRead ? 'bg-gray-950/50 border-gray-900 opacity-80' : 'bg-gray-900/90 border-gray-800/90 hover:border-cyan-500/50 hover:bg-gray-900 shadow-lg'
        }`}
      >
        <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 relative bg-gray-950">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
            {article.category.toUpperCase()}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-300">{article.source.name}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">{article.publishedAt}</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md border ${sentimentColor}`}>
                {article.sentiment} ({article.impactScore})
              </span>
            </div>

            <h3 className="text-base font-bold text-gray-100 group-hover:text-cyan-300 transition line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
              {article.summary}
            </p>

            {article.millerzTake && (
              <div className="mt-3 p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-900/40 text-xs text-cyan-200/90 flex items-start gap-2">
                <MessageSquareCode className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1"><strong className="text-cyan-300">Millerz Take:</strong> {article.millerzTake}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800/60 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              {article.techTags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-mono text-[10px]">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => onAnalyzeAI(article)}
                className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Breakdown</span>
              </button>
              <button
                onClick={() => onToggleSave(article.id)}
                className={`p-1.5 rounded-lg border transition ${
                  isSaved ? 'bg-blue-950 border-blue-800 text-blue-400' : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. MAGAZINE / FEATURED VIEW MODE ---
  if (viewMode === 'magazine') {
    return (
      <div 
        onClick={() => onSelectArticle(article)}
        className="group relative rounded-3xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 bg-gray-900 transition-all duration-300 cursor-pointer shadow-xl min-h-[360px] flex flex-col justify-end p-6"
      >
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/80 to-transparent"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/30 uppercase tracking-wider font-semibold">
              {article.category}
            </span>
            <span className={`px-2.5 py-1 rounded-full font-mono text-xs uppercase font-bold border ${sentimentColor}`}>
              Impact Score {article.impactScore}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition leading-tight mb-2">
            {article.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed max-w-2xl">
            {article.summary}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-800/80">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="font-semibold text-white">{article.source.name}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => onAnalyzeAI(article)}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-semibold hover:bg-cyan-500/30 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deep AI Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 4. GRID VIEW MODE (DEFAULT) ---
  return (
    <div 
      onClick={() => onSelectArticle(article)}
      className={`group rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
        isRead ? 'bg-gray-950/70 border-gray-900 opacity-80' : 'bg-gray-900/90 border-gray-800/90 hover:border-cyan-500/50 hover:bg-gray-900 shadow-lg hover:shadow-cyan-500/5'
      }`}
    >
      <div>
        {/* Article Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-950">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/30"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/30 uppercase font-semibold">
              {article.category}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-2 rounded-xl backdrop-blur-md border transition ${
                isSaved ? 'bg-blue-600 text-white border-blue-400' : 'bg-black/60 border-gray-700/80 text-gray-300 hover:text-white hover:bg-black/80'
              }`}
              title={isSaved ? "Remove from bookmarks" : "Save for offline reading"}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-gray-300">
            <span className="font-semibold text-cyan-200 truncate">{article.source.name}</span>
            <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border uppercase ${sentimentColor}`}>
              SCORE {article.impactScore}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <h3 className="text-base font-bold text-gray-100 group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>

          {/* Millerz Engineering Take Box */}
          {article.millerzTake && (
            <div className="mt-3.5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/50 text-xs text-cyan-200/90">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold mb-1">
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span>MILLERZ VERDICT</span>
              </div>
              <p className="line-clamp-2 text-[11px] text-gray-300 leading-normal">
                {article.millerzTake}
              </p>
            </div>
          )}

          {/* Quick AI Accordion Toggle */}
          {article.aiSummary && (
            <div className="mt-3">
              <button
                onClick={(e) => { e.stopPropagation(); setShowQuickAI(!showQuickAI); }}
                className="w-full flex items-center justify-between text-[11px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/20 px-2.5 py-1.5 rounded-lg border border-cyan-900/30 transition"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Executive Bullet Points</span>
                </span>
                {showQuickAI ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showQuickAI && (
                <div className="mt-2 p-3 bg-gray-950/90 rounded-xl border border-gray-800 text-xs text-gray-300 space-y-1.5 animate-fadeIn">
                  <p className="text-[11px] font-medium text-cyan-200 mb-1">{article.aiSummary.executiveSummary}</p>
                  <ul className="list-disc list-inside text-[11px] text-gray-400 space-y-1">
                    {article.aiSummary.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="line-clamp-1">{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Meta & Actions */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-gray-500 border-t border-gray-800/40 pt-3 mt-2">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span>{article.readTime}</span>
        </div>

        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            title="Share Article Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
          
          <button
            onClick={() => onAnalyzeAI(article)}
            className="px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Analyze</span>
          </button>
        </div>
      </div>
    </div>
  );
};
