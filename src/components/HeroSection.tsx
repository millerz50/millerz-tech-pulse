import React from 'react';
import { ArrowUpRight, Sparkles, Layers, Cpu, Code2, Globe } from 'lucide-react';
import { NewsCategory } from '../types';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
  onExploreCategory: (cat: NewsCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuoteModal,
  onExploreCategory
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#131A15] via-[#0B0E0C] to-[#162B1D] border border-[#212E25] p-6 sm:p-10 shadow-2xl">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-[#25432D]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-[#C85223]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Headlines & CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C261F] border border-[#2D5237] text-xs font-mono text-[#C29845]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold uppercase tracking-wide">NEXT.JS 16 APP ROUTER ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Next.js 16 Web Apps, Mobile Systems &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E06332] via-[#C29845] to-[#345D3F]">
              AI Engineering
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
            Millerz Technologies builds bespoke web, iOS, Android, and enterprise cloud solutions. Powered by Next.js 16 App Router, Turbopack, and Gemini AI.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C85223] to-[#E06332] text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Instant AI Project Quote</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onExploreCategory('web-dev')}
              className="px-5 py-3 rounded-xl bg-[#1C261F] hover:bg-[#25432D] text-gray-200 border border-[#212E25] font-mono text-xs font-semibold transition flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-[#C29845]" />
              <span>Explore Tech Radar</span>
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Highlights */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-[#131A15]/80 border border-[#212E25] hover:border-[#345D3F] transition space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#25432D] text-[#C29845] flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Next.js 16</p>
            <p className="text-[11px] text-gray-400">Turbopack, Server Actions, & Route Handlers</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131A15]/80 border border-[#212E25] hover:border-[#345D3F] transition space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#C85223]/20 text-[#E06332] flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Mobile & iOS</p>
            <p className="text-[11px] text-gray-400">Quantum UI System & Cross-Platform Native</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131A15]/80 border border-[#212E25] hover:border-[#345D3F] transition space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#A88238]/20 text-[#C29845] flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Gemini 3.6 AI</p>
            <p className="text-[11px] text-gray-400">Itemized quotation engine & news synthesis</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131A15]/80 border border-[#212E25] hover:border-[#345D3F] transition space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#25432D] text-[#C29845] flex items-center justify-center font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Cloud Run</p>
            <p className="text-[11px] text-gray-400">Auto-scaling container deployment & proxying</p>
          </div>
        </div>
      </div>
    </section>
  );
};
