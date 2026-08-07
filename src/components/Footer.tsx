import React from 'react';
import {
  Calculator,
  ArrowUpRight,
  Mail,
  Code,
  Smartphone,
  Cpu,
  Globe,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { MillerzLogo } from './MillerzLogo';

interface FooterProps {
  onOpenQuoteModal: () => void;
  onSelectCategory?: (category: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuoteModal,
  onSelectCategory,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[#212E25] bg-[#0B0E0C] text-gray-300">

      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#25432D]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[#C85223]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

        {/* =====================================================
            PROJECT CTA
        ====================================================== */}
        <section className="relative overflow-hidden rounded-2xl border border-[#2D5237] bg-gradient-to-br from-[#16281C] via-[#171B17] to-[#241711] p-5 shadow-xl sm:rounded-3xl sm:p-7">

          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#C85223]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-3xl">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#345D3F] bg-[#25432D] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#C29845]">
                  MILLERZ TECHNOLOGIES
                </span>

                <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-[#E06332]">
                  Digital Engineering & Technology
                </span>
              </div>

              <h2 className="font-mono text-lg font-black leading-tight text-white sm:text-xl">
                Build, Modernize & Scale Your Digital Product
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-gray-400 sm:text-sm">
                Millerz Technologies designs and develops modern websites,
                web applications, mobile applications, business systems,
                cloud platforms and custom software solutions.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C85223] to-[#E06332] px-5 py-3 font-mono text-xs font-bold text-white shadow-lg shadow-[#C85223]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C85223]/30 active:scale-[0.98] sm:w-auto sm:px-6"
            >
              <Calculator className="h-4 w-4" />

              <span>Get a Project Quote</span>

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

          </div>
        </section>

        {/* =====================================================
            MAIN FOOTER GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* =================================================
              BRAND
          ================================================== */}
          <div className="sm:col-span-2 lg:col-span-1">

            <div className="mb-5">
              <MillerzLogo
                size="md"
                className="max-w-[165px]"
              />
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-gray-400 sm:text-sm">
              Millerz Technologies is a digital technology company focused
              on building practical, scalable and modern digital solutions
              for businesses, organizations and entrepreneurs.
            </p>

            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#C29845]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>Digital Technology Partner</span>
            </div>

          </div>

          {/* =================================================
              SERVICES
          ================================================== */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white">
              <Code className="h-4 w-4 text-[#E06332]" />
              Services
            </h3>

            <ul className="space-y-3 text-xs text-gray-400">

              <li>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group flex items-center gap-2 text-left transition hover:text-white"
                >
                  <Globe className="h-3.5 w-3.5 text-gray-600 transition group-hover:text-[#E06332]" />
                  <span>Website Development</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group flex items-center gap-2 text-left transition hover:text-white"
                >
                  <Layers className="h-3.5 w-3.5 text-gray-600 transition group-hover:text-[#E06332]" />
                  <span>Web Applications</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group flex items-center gap-2 text-left transition hover:text-white"
                >
                  <Smartphone className="h-3.5 w-3.5 text-gray-600 transition group-hover:text-[#E06332]" />
                  <span>Mobile Applications</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group flex items-center gap-2 text-left transition hover:text-white"
                >
                  <Cpu className="h-3.5 w-3.5 text-gray-600 transition group-hover:text-[#E06332]" />
                  <span>AI & Automation</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="group flex items-center gap-2 text-left transition hover:text-white"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-gray-600 transition group-hover:text-[#E06332]" />
                  <span>Business Systems</span>
                </button>
              </li>

            </ul>
          </div>

          {/* =================================================
              TECHNOLOGY / PLATFORM
          ================================================== */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white">
              <Cpu className="h-4 w-4 text-[#C29845]" />
              Technology
            </h3>

            <ul className="space-y-3 text-xs text-gray-400">

              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.('web-dev')}
                  className="transition hover:text-white"
                >
                  Web Development
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.('mobile')}
                  className="transition hover:text-white"
                >
                  Mobile Technology
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.('software')}
                  className="transition hover:text-white"
                >
                  Software Engineering
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.('ai-cloud')}
                  className="transition hover:text-white"
                >
                  AI & Cloud
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.('millerz-insights')}
                  className="transition hover:text-white"
                >
                  Millerz Insights
                </button>
              </li>

            </ul>
          </div>

          {/* =================================================
              CONTACT
          ================================================== */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white">
              <Mail className="h-4 w-4 text-[#E06332]" />
              Contact
            </h3>

            <div className="space-y-4 text-xs text-gray-400">

              <div>
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Email
                </span>

                <a
                  href="mailto:contact@millerz.tech"
                  className="break-all text-gray-300 transition hover:text-[#C29845]"
                >
                  contact@millerz.tech
                </a>
              </div>

              <div>
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Website
                </span>

                <a
                  href="https://millerz.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 transition hover:text-[#C29845]"
                >
                  millerz.dev
                </a>
              </div>

              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2D5237] bg-[#16281C] px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#C29845] transition hover:border-[#345D3F] hover:bg-[#25432D] hover:text-white"
              >
                <Calculator className="h-3.5 w-3.5" />
                Request a Quote
              </button>

            </div>
          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <div className="border-t border-[#212E25] pt-6">

          <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

            <p className="font-mono text-[10px] leading-relaxed text-gray-500 sm:text-[11px]">
              © {currentYear}{' '}
              <span className="font-bold text-gray-300">
                MILLERZ TECHNOLOGIES
              </span>
              . All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10px] text-gray-500 sm:justify-end">

              <span className="text-[#C29845]">
                Digital Technology
              </span>

              <span className="hidden sm:inline">•</span>

              <span>
                Web
              </span>

              <span>•</span>

              <span>
                Mobile
              </span>

              <span>•</span>

              <span>
                Software
              </span>

              <span>•</span>

              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="font-bold text-[#E06332] transition hover:text-[#E06332]/80 hover:underline"
              >
                Get a Quote
              </button>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};
