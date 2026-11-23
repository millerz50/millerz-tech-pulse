'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { QuoteGeneratorModal } from './QuoteGeneratorModal';
import { INITIAL_NEWS } from '@/src/data/initialNews';
import type { NewsArticle, NewsCategory } from '@/types';

interface HomeClientProps {
  children?: React.ReactNode;
}

const CAPABILITIES = [
  {
    number: '01',
    title: 'Full-Stack Web Systems',
    span: 'md:col-span-2',
    summary:
      'Next.js App Router applications, SaaS platforms, multi-sided marketplaces, and business portals engineered for low latency, clean routing, and maintainable TypeScript codebases.',
    deliverables: 'Next.js 16 · React 19 · Server Actions · REST APIs',
  },
  {
    number: '02',
    title: 'Technical SEO & Structured Data',
    span: 'md:col-span-1',
    summary:
      'Canonical URLs, OpenGraph cards, dynamic XML sitemaps, and Schema.org JSON-LD graphs built directly into the application layer so search engines index every route accurately.',
    deliverables: 'Schema.org JSON-LD · OpenGraph · Sitemaps',
  },
  {
    number: '03',
    title: 'Prisma ORM & SQLite Persistence',
    span: 'md:col-span-1',
    summary:
      'Type-safe relational schemas, zero-latency local SQLite databases, migrations, and clean API serialization layers for quotes, inquiries, and content registries.',
    deliverables: 'Prisma ORM · SQLite · PostgreSQL',
  },
  {
    number: '04',
    title: 'Mobile Platforms & AI Workflows',
    span: 'md:col-span-2',
    summary:
      'Cross-platform iOS and Android applications paired with server-side Gemini AI tooling for automated technical scoping, intelligent search, and structured operational workflows.',
    deliverables: 'React Native · Flutter · Gemini API · Cloud Run',
  },
];

const BRIEF_FILTERS: { key: NewsCategory; label: string }[] = [
  { key: 'all', label: 'All Briefs' },
  { key: 'web-dev', label: 'Web Systems' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'ai-cloud', label: 'AI & Cloud' },
  { key: 'software', label: 'Architecture' },
];

export default function HomeClient({ children }: HomeClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [briefFilter, setBriefFilter] = useState<NewsCategory>('all');
  const [selectedBrief, setSelectedBrief] = useState<NewsArticle | null>(null);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  // Consultation Inquiry Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadScope, setLeadScope] = useState('Full-Stack Web Platform');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const visibleBriefs =
    briefFilter === 'all'
      ? INITIAL_NEWS.slice(0, 4)
      : INITIAL_NEWS.filter((item) => item.category === briefFilter);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError(null);
    setLeadSuccess(false);
    setLeadSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          company: leadCompany,
          projectScope: leadScope,
          message: leadMessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit inquiry.');
      }

      setLeadSuccess(true);
      setLeadName('');
      setLeadEmail('');
      setLeadCompany('');
      setLeadMessage('');
    } catch (err) {
      setLeadError(
        err instanceof Error ? err.message : 'Unable to submit inquiry.'
      );
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d0b] text-[#f2f4f2]">
      <SiteHeader onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main>
        {/* HERO SECTION */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-12 lg:pb-20 lg:pt-16">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-widest text-[#c9a04e]">
                Harare, Zimbabwe · Web, Mobile &amp; Technical SEO
              </p>

              <h1
                className="mt-4 font-bold tracking-tight text-[#f2f4f2] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', lineHeight: 1.08 }}
              >
                Software Engineered for Search, Speed, and Scale.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#a8b0a9] sm:text-[17px]">
                Millerz Technologies and Johannes Zemba build production web
                platforms, Prisma and SQLite data backends, mobile apps, and
                search-first architectures—powering TreasurePal, CareerMatched,
                and TrueVona.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(true)}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#d4622a] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#e06e35]"
                >
                  <span>Request Project Quote</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[#d5dcd6] underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  <span>Explore Live Platforms</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-72 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#111613] sm:h-96 lg:h-full lg:min-h-[380px]">
                {!heroImgFailed ? (
                  <img
                    src="/images/hero_millerz_studio_1795418087512.jpg"
                    alt="Millerz Technologies software engineering studio in Harare"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16231a] via-[#111613] to-[#1a1410] p-8 text-center">
                    <div>
                      <p className="font-semibold text-[#f2f4f2]">
                        Millerz Technologies Studio
                      </p>
                      <p className="mt-1 text-xs text-[#9ca69d]">
                        Full-Stack Web &amp; Technical SEO Engineering
                      </p>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0d0b]/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* 4-Column Proof Strip */}
          <div className="mt-12 grid grid-cols-2 divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#111613] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <p className="font-mono text-2xl font-semibold tabular-nums text-[#f2f4f2]">
                5
              </p>
              <p className="mt-1 text-xs text-[#9ca69d]">Live Production Domains</p>
            </div>
            <div className="p-5">
              <p className="font-mono text-2xl font-semibold tabular-nums text-[#f2f4f2]">
                SQLite
              </p>
              <p className="mt-1 text-xs text-[#9ca69d]">Prisma ORM Persistence</p>
            </div>
            <div className="p-5">
              <p className="font-mono text-2xl font-semibold tabular-nums text-[#f2f4f2]">
                JSON-LD
              </p>
              <p className="mt-1 text-xs text-[#9ca69d]">Schema.org &amp; OpenGraph</p>
            </div>
            <div className="p-5">
              <p className="font-mono text-2xl font-semibold tabular-nums text-[#f2f4f2]">
                Next.js 16
              </p>
              <p className="mt-1 text-xs text-[#9ca69d]">App Router Architecture</p>
            </div>
          </div>
        </section>

        {/* 01. CAPABILITIES BENTO GRID */}
        <section
          id="capabilities"
          aria-labelledby="capabilities-heading"
          className="border-t border-white/[0.08] py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-widest text-[#c9a04e]">
                01. Core Capabilities
              </p>
              <h2
                id="capabilities-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-[#f2f4f2] sm:text-4xl text-balance"
              >
                Engineering Discipline Across Stack and Search
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#9ca69d]">
                Built for startups, marketplaces, and organizations that need fast
                server rendering, clean relational data, and organic search visibility.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.number}
                  className={`${cap.span} flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#111613] p-6 sm:p-7`}
                >
                  <div>
                    <p className="font-mono text-xs font-medium text-[#c9a04e]">
                      {cap.number}.
                    </p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-[#f2f4f2]">
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#9ca69d]">
                      {cap.summary}
                    </p>
                  </div>
                  <p className="mt-6 border-t border-white/[0.08] pt-4 font-mono text-xs text-[#7e8780]">
                    {cap.deliverables}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02. SHIPPED PLATFORMS (SERVER COMPONENT VIA CHILDREN) */}
        {children}

        {/* 03. ENGINEERING BRIEFS */}
        <section
          id="briefs"
          aria-labelledby="briefs-heading"
          className="border-t border-white/[0.08] py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-widest text-[#c9a04e]">
                  03. Engineering Briefs
                </p>
                <h2
                  id="briefs-heading"
                  className="mt-2 text-3xl font-bold tracking-tight text-[#f2f4f2] sm:text-4xl text-balance"
                >
                  Architecture Notes &amp; Platform Insights
                </h2>
              </div>

              <div className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/[0.08] bg-[#111613] p-1">
                {BRIEF_FILTERS.map((tab) => {
                  const active = briefFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setBriefFilter(tab.key)}
                      className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? 'bg-[#1e2620] text-white'
                          : 'text-[#9ca69d] hover:text-[#f2f4f2]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#111613]">
              {visibleBriefs.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col justify-between gap-4 p-6 transition-colors hover:bg-[#151c17] sm:flex-row sm:items-center"
                >
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#9ca69d]">
                      <span className="font-medium text-[#c9a04e]">
                        {article.source.name}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-[#f2f4f2]">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#9ca69d]">
                      {article.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedBrief(article)}
                    className="inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-lg border border-white/[0.12] px-4 py-2 text-xs font-medium text-[#d5dcd6] transition-colors hover:border-white/[0.24] hover:text-white sm:self-center"
                  >
                    <span>Read Brief</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 04. CONSULTATION & QUOTE SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="border-t border-white/[0.08] py-20"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-widest text-[#c9a04e]">
                04. Start a Project
              </p>
              <h2
                id="contact-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-[#f2f4f2] sm:text-4xl text-balance"
              >
                Scope Your Next Web or Mobile Platform
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#9ca69d]">
                Send your requirements directly to our SQLite inquiry queue, or
                launch the interactive AI quotation estimator to generate an
                itemized engineering breakdown and delivery timeline.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(true)}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#d4622a]/50 bg-[#d4622a]/15 px-5 py-3 text-sm font-semibold text-[#f2f4f2] transition-colors hover:bg-[#d4622a] hover:text-white"
                >
                  <span>Open AI Scope &amp; Cost Estimator</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-10 border-t border-white/[0.08] pt-6 text-xs leading-relaxed text-[#889189]">
                <p>Based in Harare, Zimbabwe · Serving clients globally</p>
                <p className="mt-1 font-mono text-[#a8b0a9]">
                  millerz.co.zw · johanneszemba.co.zw
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleInquirySubmit}
                className="rounded-xl border border-white/[0.08] bg-[#111613] p-6 sm:p-8"
              >
                <h3 className="text-lg font-bold text-[#f2f4f2]">
                  Project Consultation Request
                </h3>
                <p className="mt-1 text-xs text-[#9ca69d]">
                  Stored persistently in SQLite via Prisma ORM.
                </p>

                {leadError && (
                  <p className="mt-4 rounded-lg border border-red-500/30 bg-red-950/30 px-3.5 py-2.5 text-xs text-red-200">
                    {leadError}
                  </p>
                )}

                {leadSuccess && (
                  <p className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-2.5 text-xs text-emerald-200">
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      Inquiry recorded. Millerz Technologies will follow up shortly.
                    </span>
                  </p>
                )}

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-xs font-medium text-[#c4cbc5]"
                    >
                      Full Name *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3.5 py-2.5 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs font-medium text-[#c4cbc5]"
                    >
                      Work Email *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="you@company.co.zw"
                      className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3.5 py-2.5 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-company"
                      className="block text-xs font-medium text-[#c4cbc5]"
                    >
                      Company / Organization
                    </label>
                    <input
                      id="lead-company"
                      type="text"
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      placeholder="Optional"
                      className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3.5 py-2.5 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead-scope"
                      className="block text-xs font-medium text-[#c4cbc5]"
                    >
                      Primary Scope
                    </label>
                    <select
                      id="lead-scope"
                      value={leadScope}
                      onChange={(e) => setLeadScope(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3.5 py-2.5 text-sm text-white focus:border-[#d4622a] focus:outline-none"
                    >
                      <option value="Full-Stack Web Platform">
                        Full-Stack Web Platform
                      </option>
                      <option value="Technical SEO & Schema Architecture">
                        Technical SEO &amp; Schema Architecture
                      </option>
                      <option value="Mobile Application (iOS & Android)">
                        Mobile Application (iOS &amp; Android)
                      </option>
                      <option value="Prisma & SQLite / Database Migration">
                        Prisma &amp; SQLite / Database Migration
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="lead-message"
                    className="block text-xs font-medium text-[#c4cbc5]"
                  >
                    Project Goals &amp; Timeline *
                  </label>
                  <textarea
                    id="lead-message"
                    rows={4}
                    required
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    placeholder="Share your target launch window, required integrations, and SEO goals..."
                    className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3.5 py-2.5 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="whitespace-nowrap rounded-lg bg-[#d4622a] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e06e35] disabled:opacity-50"
                  >
                    {leadSubmitting ? 'Submitting...' : 'Submit Consultation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="border-t border-white/[0.08] py-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <p className="font-[var(--font-display)] text-sm font-bold text-[#f2f4f2]">
              Millerz Technologies
            </p>
            <p className="mt-1 text-xs text-[#889189]">
              © {new Date().getFullYear()} Millerz Technologies · Engineered by
              Johannes Zemba in Harare, Zimbabwe.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#9ca69d]">
            <a
              href="https://www.treasurepal.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              TreasurePal
            </a>
            <a
              href="https://www.careermatched.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              CareerMatched
            </a>
            <a
              href="https://www.truevona.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              TrueVona
            </a>
            <a
              href="https://www.millerz.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Millerz
            </a>
            <a
              href="https://www.johanneszemba.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Johannes Zemba
            </a>
          </div>
        </div>
      </footer>

      {/* Engineering Brief Reader Modal */}
      {selectedBrief && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedBrief(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/[0.12] bg-[#111613] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <p className="text-xs text-[#c9a04e]">
                  {selectedBrief.source.name} · {selectedBrief.publishedAt} ·{' '}
                  {selectedBrief.readTime}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-[#f2f4f2]">
                  {selectedBrief.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close brief"
                onClick={() => setSelectedBrief(null)}
                className="rounded-lg border border-white/[0.1] p-1.5 text-[#9ca69d] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#c4cbc5]">
              <p className="font-medium text-[#f2f4f2]">{selectedBrief.summary}</p>
              <p>{selectedBrief.fullContent}</p>
              {selectedBrief.millerzTake && (
                <div className="border-t border-white/[0.08] pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#c9a04e]">
                    Engineering Note
                  </p>
                  <p className="mt-1.5 text-[#e4e8e4]">
                    {selectedBrief.millerzTake}
                  </p>
                </div>
              )}
              <p className="border-t border-white/[0.08] pt-4 font-mono text-xs text-[#889189]">
                {selectedBrief.techTags.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Quotation Modal */}
      {isQuoteOpen && (
        <QuoteGeneratorModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
        />
      )}
    </div>
  );
}
