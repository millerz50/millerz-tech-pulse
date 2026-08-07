import React from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  Code2,
  Globe
} from 'lucide-react';

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
    <section className="relative overflow-hidden rounded-3xl border border-[#212E25] bg-gradient-to-br from-[#131A15] via-[#0B0E0C] to-[#162B1D] p-6 sm:p-10 shadow-2xl">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-[#345D3F]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 h-80 w-80 rounded-full bg-[#C85223]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-12 items-center">

        {/* LEFT */}
        <div className="space-y-6 lg:col-span-7">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#345D3F] bg-[#1C261F] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C29845]">

            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

            Software Development • AI • Cloud • Mobile Apps

          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

            Professional{" "}

            <span className="bg-gradient-to-r from-[#E06332] via-[#C29845] to-[#3F7A50] bg-clip-text text-transparent">
              Software Development
            </span>

            <br />

            Full-Stack Web, Mobile &
            AI Solutions

          </h1>

          <p className="max-w-2xl text-base leading-8 text-gray-300">

            Millerz Technologies builds modern software solutions for startups,
            businesses, government organizations and enterprises.

            We specialize in custom software development, full-stack web
            applications, Android and iOS mobile apps, AI-powered business
            systems, cloud infrastructure, APIs, automation, enterprise
            platforms, SaaS products, eCommerce solutions and digital
            transformation.

          </p>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={onOpenQuoteModal}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C85223] to-[#E06332] px-6 py-3 font-bold uppercase tracking-wider text-white shadow-lg transition hover:brightness-110"
            >

              <Sparkles className="h-4 w-4" />

              Get Free Project Quote

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />

            </button>

            <button
              onClick={() => onExploreCategory("software")}
              className="flex items-center gap-2 rounded-xl border border-[#345D3F] bg-[#1C261F] px-6 py-3 font-semibold text-gray-200 transition hover:bg-[#25432D]"
            >

              <Globe className="h-4 w-4 text-[#C29845]" />

              Explore Services

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="grid grid-cols-2 gap-4 lg:col-span-5">

          <div className="space-y-3 rounded-2xl border border-[#212E25] bg-[#131A15]/80 p-5 hover:border-[#3F7A50] transition">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25432D]">

              <Code2 className="h-5 w-5 text-[#C29845]" />

            </div>

            <h3 className="font-bold text-white">

              Full-Stack Development

            </h3>

            <p className="text-sm text-gray-400">

              React, Next.js, Node.js, Express,
              TypeScript, APIs, Databases and Enterprise Systems.

            </p>

          </div>

          <div className="space-y-3 rounded-2xl border border-[#212E25] bg-[#131A15]/80 p-5 hover:border-[#3F7A50] transition">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C85223]/20">

              <Layers className="h-5 w-5 text-[#E06332]" />

            </div>

            <h3 className="font-bold text-white">

              Mobile Apps

            </h3>

            <p className="text-sm text-gray-400">

              Android, iOS, Flutter, React Native,
              PWAs and Cross-Platform Applications.

            </p>

          </div>

          <div className="space-y-3 rounded-2xl border border-[#212E25] bg-[#131A15]/80 p-5 hover:border-[#3F7A50] transition">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A88238]/20">

              <Cpu className="h-5 w-5 text-[#C29845]" />

            </div>

            <h3 className="font-bold text-white">

              Artificial Intelligence

            </h3>

            <p className="text-sm text-gray-400">

              AI Chatbots, Automation,
              Machine Learning,
              AI Assistants and Intelligent Business Tools.

            </p>

          </div>

          <div className="space-y-3 rounded-2xl border border-[#212E25] bg-[#131A15]/80 p-5 hover:border-[#3F7A50] transition">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25432D]">

              <Globe className="h-5 w-5 text-[#C29845]" />

            </div>

            <h3 className="font-bold text-white">

              Cloud & DevOps

            </h3>

            <p className="text-sm text-gray-400">

              AWS, Google Cloud,
              Azure, Docker,
              Kubernetes,
              CI/CD and Secure Hosting.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
};
