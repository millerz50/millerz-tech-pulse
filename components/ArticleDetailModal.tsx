import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Check, 
  Clock, 
  User, 
  MessageSquareCode, 
  Code, 
  Flame, 
  ShieldCheck, 
  Terminal,
  RefreshCw
} from 'lucide-react';
import { NewsArticle } from '../types';

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAnalyzeAI: (article: NewsArticle) => void;
  isAnalyzing: boolean;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
  onAnalyzeAI,
  isAnalyzing
}) => {
  if (!article) return null;

  const [activeTab, setActiveTab] = useState<'article' | 'ai-breakdown'>('article');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(article.source.url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0B0F17] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/90 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-mono font-bold uppercase">
              {article.category}
            </span>
            <span className="text-xs text-gray-400 font-mono">Impact {article.impactScore}/100</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-2 rounded-xl border transition text-xs flex items-center gap-1.5 ${
                isSaved ? 'bg-blue-950 border-blue-800 text-blue-400' : 'bg-gray-900 border-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white transition text-xs flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 px-6 py-2 bg-gray-900/60 border-b border-gray-800 text-xs font-mono shrink-0">
          <button
            onClick={() => setActiveTab('article')}
            className={`py-2 px-3 border-b-2 font-semibold transition ${
              activeTab === 'article' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Full Article View
          </button>

          <button
            onClick={() => {
              setActiveTab('ai-breakdown');
              if (!article.aiSummary) {
                onAnalyzeAI(article);
              }
            }}
            className={`py-2 px-3 border-b-2 font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'ai-breakdown' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gemini 3.6 AI Intelligence</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'article' ? (
            <>
              {/* Title & Banner */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-800/60">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{article.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{article.publishedAt} ({article.readTime})</span>
                  </div>
                  <span>•</span>
                  <a
                    href={article.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Source: {article.source.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden h-64 sm:h-80 w-full bg-gray-950 relative border border-gray-800">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Summary Lead */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-900/40 text-sm text-cyan-100 leading-relaxed font-sans">
                <strong className="text-cyan-400 font-mono block mb-1">EXECUTIVE OVERVIEW:</strong>
                {article.summary}
              </div>

              {/* Millerz Take */}
              {article.millerzTake && (
                <div className="p-4 rounded-2xl bg-gray-900 border border-cyan-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                    <MessageSquareCode className="w-4 h-4" />
                    <span>MILLERZ ARCHITECT VERDICT</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {article.millerzTake}
                  </p>
                </div>
              )}

              {/* Full Content */}
              <div className="text-sm text-gray-300 leading-relaxed space-y-4 font-sans">
                <p>
                  {article.fullContent || article.summary}
                </p>
                <p>
                  At Millerz (web development, software architecture, mobile solutions), our engineering teams continuously monitor updates across frameworks, cloud services, and compiler pipelines to ensure client platforms maintain peak performance, accessibility, and real-time security.
                </p>
              </div>

              {/* Tech Tags */}
              <div className="pt-4 border-t border-gray-800 flex flex-wrap gap-2">
                {article.techTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-xl bg-gray-900 border border-gray-800 text-xs font-mono text-cyan-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          ) : (
            /* AI Breakdown Tab */
            <div className="space-y-6">
              {isAnalyzing ? (
                <div className="p-12 text-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                  <p className="text-sm text-cyan-300 font-mono">
                    Generating Deep Technical Analysis using Gemini 3.6 Flash...
                  </p>
                </div>
              ) : article.aiSummary ? (
                <>
                  {/* Executive AI Summary Box */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-gray-900 to-blue-950/80 border border-cyan-800/60 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>GEMINI 3.6 EXECUTIVE BRIEF</span>
                    </div>
                    <p className="text-sm text-gray-100 font-medium leading-relaxed">
                      {article.aiSummary.executiveSummary}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Core Technical Takeaways
                    </h3>
                    <div className="grid gap-2">
                      {article.aiSummary.keyTakeaways.map((point, index) => (
                        <div key={index} className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-mono text-xs shrink-0 font-bold">
                            {index + 1}
                          </span>
                          <span className="text-xs text-gray-200 leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Impact Analysis */}
                  <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-purple-400 uppercase">
                      Architecture & Stack Impact
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {article.aiSummary.impactAnalysis}
                    </p>
                  </div>

                  {/* Code Snippet / Actionable Command */}
                  {article.aiSummary.codeSnippetOrAction && (
                    <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                        <Terminal className="w-4 h-4" />
                        <span>RECOMMENDED ACTION / COMMAND</span>
                      </div>
                      <pre className="p-3 rounded-xl bg-black font-mono text-xs text-emerald-300 overflow-x-auto border border-emerald-950">
                        <code>{article.aiSummary.codeSnippetOrAction}</code>
                      </pre>
                    </div>
                  )}

                  {/* Millerz Recommendation */}
                  {article.aiSummary.millerzRecommendation && (
                    <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/50 space-y-2">
                      <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span>MILLERZ CLIENT RECOMMENDATION</span>
                      </div>
                      <p className="text-xs text-cyan-100 leading-relaxed">
                        {article.aiSummary.millerzRecommendation}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-8">
                  <button
                    onClick={() => onAnalyzeAI(article)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-blue-500 transition"
                  >
                    Trigger Gemini AI Analysis
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-800 bg-gray-950 flex items-center justify-between shrink-0 text-xs">
          <a
            href={article.source.url}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 transition flex items-center gap-2 font-mono"
          >
            <span>Read Original Article</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-semibold hover:bg-cyan-500/30 transition font-mono"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
};
