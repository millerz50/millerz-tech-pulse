import React from 'react';
import { Terminal, Shield, Sparkles, Smartphone, Globe, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MILLERZ_PROJECTS } from '../data/initialNews';
import { MillerzProject } from '../types';

interface MillerzShowcaseProps {
  onSelectProjectNews?: (articleId?: string) => void;
}

export const MillerzShowcase: React.FC<MillerzShowcaseProps> = ({ onSelectProjectNews }) => {
  return (
    <section className="my-12 bg-gradient-to-b from-[#0B0E0C] via-[#131A15] to-[#0B0E0C] border border-[#212E25] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#25432D]/20 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C85223]/15 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#25432D] border border-[#345D3F] text-[#C29845] font-mono text-xs uppercase font-bold tracking-wider">
              MILLERZ STUDIO SPOTLIGHT
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PRODUCTION READY</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Crafted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E06332] via-[#C29845] to-[#345D3F]">Millerz Engineering</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Millerz delivers bespoke Web Development, Enterprise Software Architecture, Mobile Apps, and AI Systems with ultra-clean Next.js 16 layouts & motion.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-[#131A15] border border-[#212E25] text-xs text-gray-300 font-mono">
            <span className="text-[#C29845] font-bold">3+</span> Flagship Platforms
          </div>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {MILLERZ_PROJECTS.map((project: MillerzProject) => (
          <div
            key={project.id}
            className="group rounded-2xl border border-[#212E25] bg-[#131A15] hover:border-[#C85223] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Image Banner */}
              <div className="h-44 w-full relative overflow-hidden bg-[#0B0E0C]">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-transparent to-transparent"></div>
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-[#C29845] border border-[#345D3F] uppercase">
                  {project.type}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-white group-hover:text-[#E06332] transition">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#C29845] mt-0.5 mb-2 font-semibold">
                  {project.tagline}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="p-2.5 rounded-xl bg-[#1D2B20] border border-[#2D5237] text-[11px] font-mono text-[#C29845]">
                  ⚡ {project.metrics}
                </div>
              </div>
            </div>

            {/* Tech Stack & Action Footer */}
            <div className="p-5 pt-0">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-[#1C261F] border border-[#212E25] text-gray-300 text-[10px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {project.featuredArticleId && onSelectProjectNews && (
                <button
                  onClick={() => onSelectProjectNews(project.featuredArticleId)}
                  className="w-full py-2 rounded-xl bg-[#1C261F] border border-[#212E25] hover:border-[#C85223] text-gray-300 hover:text-[#E06332] text-xs font-mono font-medium transition flex items-center justify-center gap-1.5"
                >
                  <span>Read Related Tech Intelligence</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
