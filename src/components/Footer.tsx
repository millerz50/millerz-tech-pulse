import React from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowUpRight, 
  Terminal, 
  Globe, 
  ShieldCheck, 
  Mail, 
  Code, 
  Smartphone, 
  Cpu, 
  Layers 
} from 'lucide-react';
import { MillerzLogo } from './MillerzLogo';

interface FooterProps {
  onOpenQuoteModal: () => void;
  onSelectCategory?: (category: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuoteModal,
  onSelectCategory
}) => {
  return (
    <footer className="mt-20 border-t border-[#212E25] bg-[#0B0E0C] text-gray-300 font-sans relative overflow-hidden">
      
      {/* Background Subtle Logo Accent Glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#25432D]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#C85223]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 space-y-10">
        
        {/* Top Callout Banner - Instant Quotation Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#16281C] via-[#1E1914] to-[#2B1B15] border border-[#2D5237] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#25432D] text-[#C29845] font-mono text-[10px] font-bold uppercase tracking-wider">
                OFFICIAL MILLERZ TECHNOLOGIES
              </span>
              <span className="text-[#E06332] font-mono text-xs font-bold">
                • Need a Custom Web, Mobile or AI Solution?
              </span>
            </div>
            <h3 className="font-mono font-black text-lg text-white">
              Generate an Instant Technical Proposal & Project Cost Quotation
            </h3>
            <p className="text-gray-300 text-xs max-w-2xl font-sans">
              Get an immediate itemized breakdown, architectural blueprint, and estimated delivery timeline for your web app, mobile app, or AI cloud project.
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C85223] to-[#E06332] hover:from-[#E06332] hover:to-[#C85223] text-white font-mono font-bold text-xs shadow-lg shadow-[#C85223]/30 transition hover:scale-[1.02] flex items-center gap-2 shrink-0"
          >
            <Calculator className="w-4 h-4 text-white" />
            <span>Start Quotation Generator</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Core Footer Link Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <MillerzLogo size="lg" />
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Millerz Technologies is a premier Web Development, Mobile Apps, Cloud Engineering, and Custom AI Systems consultancy delivering robust, Next.js 16 applications.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-[#C29845]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 2: Core Engineering Services */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#E06332]" />
              <span>Engineering Services</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-400">
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-white transition flex items-center gap-1">
                  <span>Web Platforms (Next.js 16 & React)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-white transition flex items-center gap-1">
                  <span>iOS & Android Mobile Applications</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-white transition flex items-center gap-1">
                  <span>AI & LLM Agent Workflows</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-white transition flex items-center gap-1">
                  <span>Cloud Run Architecture & Microservices</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-white transition flex items-center gap-1">
                  <span>Quantum UI & Design Systems</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Pulse Channels */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#C29845]" />
              <span>Tech Pulse Channels</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-400">
              <li>
                <button onClick={() => onSelectCategory?.('web-dev')} className="hover:text-white transition">
                  Web Dev & Edge Computing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('mobile')} className="hover:text-white transition">
                  Mobile Apps & Ecosystems
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('software')} className="hover:text-white transition">
                  Software Architecture & DevOps
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('ai-cloud')} className="hover:text-white transition">
                  AI Models & Cloud Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('millerz-insights')} className="hover:text-white transition">
                  Millerz Engineering Radar
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Quotation */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#345D3F]" />
              <span>Contact & Quotes</span>
            </h4>
            <div className="space-y-2 text-xs font-sans text-gray-400">
              <p>
                <strong className="text-gray-200">Email:</strong> contact@millerz.tech
              </p>
              <p>
                <strong className="text-gray-200">Website:</strong>{' '}
                <a href="https://millerz.dev" target="_blank" rel="noreferrer" className="text-[#C29845] hover:underline">
                  millerz.dev
                </a>
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-2.5 rounded-xl bg-[#1D2B20] border border-[#2D5237] text-[#C29845] hover:text-white font-mono font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Request Custom Quote</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-[#212E25] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-gray-300">MILLERZ TECHNOLOGIES</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C29845] font-bold">Next.js 16 App Router (Turbopack)</span>
            <span>•</span>
            <span>Gemini 3.6 Flash AI</span>
            <span>•</span>
            <button onClick={onOpenQuoteModal} className="text-[#E06332] hover:underline font-bold">
              Quotation Generator
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
