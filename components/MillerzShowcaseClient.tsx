'use client';

import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Plus, X, Check } from 'lucide-react';
import type { MillerzProject } from '@/types/project';
import ProjectCard from './ProjectCard';

interface Props {
  initialProjects: MillerzProject[];
}

type FilterKey = 'all' | 'marketplace' | 'saas' | 'social' | 'studio';

const FILTER_TABS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Platforms' },
  { key: 'marketplace', label: 'Real Estate' },
  { key: 'saas', label: 'Jobs & SaaS' },
  { key: 'social', label: 'Social' },
  { key: 'studio', label: 'Studio & Portfolio' },
];

export default function MillerzShowcaseClient({ initialProjects }: Props) {
  const [projects, setProjects] = useState<MillerzProject[]>(initialProjects);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [inspectedProject, setInspectedProject] = useState<MillerzProject | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Add Project Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [href, setHref] = useState('');
  const [type, setType] = useState('Web Platform');
  const [categoryGroup, setCategoryGroup] =
    useState<MillerzProject['categoryGroup']>('studio');
  const [description, setDescription] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState(
    'Next.js, TypeScript, Prisma ORM, SQLite'
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSavedNotice, setFormSavedNotice] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categoryGroup === activeFilter);
  }, [projects, activeFilter]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          tagline,
          href,
          type,
          categoryGroup,
          description,
          seoTitle,
          seoDescription,
          techStack: techStackInput,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not save project.');
      }

      setProjects((prev) => [...prev, data]);
      setTitle('');
      setTagline('');
      setHref('');
      setDescription('');
      setSeoTitle('');
      setSeoDescription('');
      setFormSavedNotice(true);
      setTimeout(() => {
        setFormSavedNotice(false);
        setIsAddOpen(false);
      }, 900);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to save project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-white/[0.08] py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#c9a04e]">
              02. Shipped Platforms
            </p>
            <h2
              id="projects-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-[#f2f4f2] sm:text-4xl text-balance"
            >
              Production Platforms &amp; Verified Search Architecture
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#9ca69d]">
              Every platform below is stored in SQLite via Prisma ORM with its verified
              title tag, meta description, and canonical domain.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tabular-nums text-[#9ca69d]">
              {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'platform' : 'platforms'}
            </span>
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/[0.14] bg-[#111613] px-3.5 py-2 text-xs font-semibold text-[#f2f4f2] transition-colors hover:border-white/[0.28]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Filter platforms by category"
          className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/[0.08] bg-[#111613] p-1"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(tab.key)}
                className={`whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${
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

        {filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#111613] p-12 text-center">
            <p className="text-sm text-[#9ca69d]">
              No platforms match this filter yet.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onInspectSeo={setInspectedProject}
              />
            ))}
          </div>
        )}
      </div>

      {/* SEO Inspection Modal */}
      {inspectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setInspectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-xl border border-white/[0.12] bg-[#111613] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#c9a04e]">
                  Technical SEO Audit
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#f2f4f2]">
                  {inspectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close SEO inspector"
                onClick={() => setInspectedProject(null)}
                className="rounded-lg border border-white/[0.1] p-1.5 text-[#9ca69d] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium text-[#889189]">Canonical URL</p>
                <a
                  href={inspectedProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-[#d4622a] hover:underline"
                >
                  <span>{inspectedProject.href}</span>
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>

              <div>
                <p className="text-xs font-medium text-[#889189]">
                  Title Tag ({inspectedProject.seoTitle.length} characters)
                </p>
                <p className="mt-1 font-medium text-[#f2f4f2]">
                  {inspectedProject.seoTitle}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#889189]">
                  Meta Description ({inspectedProject.seoDescription.length} characters)
                </p>
                <p className="mt-1 leading-relaxed text-[#c4cbc5]">
                  {inspectedProject.seoDescription}
                </p>
              </div>

              {inspectedProject.seoKeywords && (
                <div>
                  <p className="text-xs font-medium text-[#889189]">Target Keywords</p>
                  <p className="mt-1 font-mono text-xs text-[#9ca69d]">
                    {inspectedProject.seoKeywords}
                  </p>
                </div>
              )}

              <div className="border-t border-white/[0.08] pt-4">
                <p className="text-xs font-medium text-[#889189]">
                  Search Snippet Preview
                </p>
                <div className="mt-2 rounded-lg bg-[#0a0d0b] p-4">
                  <p className="font-mono text-[11px] text-[#9ca69d]">
                    {inspectedProject.href}
                  </p>
                  <p className="mt-1 text-base font-medium text-[#8ab4f8]">
                    {inspectedProject.seoTitle}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#b8c0b9]">
                    {inspectedProject.seoDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal (Persisted via SQLite + Prisma) */}
      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setIsAddOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-white/[0.12] bg-[#111613] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#c9a04e]">
                  SQLite &amp; Prisma Registry
                </p>
                <h3 className="mt-1 text-lg font-bold text-[#f2f4f2]">
                  Add Platform to Portfolio
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setIsAddOpen(false)}
                className="rounded-lg border border-white/[0.1] p-1.5 text-[#9ca69d] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="mt-5 space-y-4">
              {formError && (
                <p className="rounded-lg border border-red-500/30 bg-red-950/30 px-3 py-2 text-xs text-red-200">
                  {formError}
                </p>
              )}

              {formSavedNotice && (
                <p className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-200">
                  <Check className="h-4 w-4" />
                  <span>Saved to SQLite database via Prisma ORM.</span>
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#c4cbc5]">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. TreasurePal"
                    className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#c4cbc5]">
                    Live URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                    placeholder="https://www.example.co.zw"
                    className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#c4cbc5]">
                    Platform Type
                  </label>
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Web Platform"
                    className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white focus:border-[#d4622a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#c4cbc5]">
                    Category
                  </label>
                  <select
                    value={categoryGroup}
                    onChange={(e) =>
                      setCategoryGroup(
                        e.target.value as MillerzProject['categoryGroup']
                      )
                    }
                    className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white focus:border-[#d4622a] focus:outline-none"
                  >
                    <option value="marketplace">Real Estate &amp; Marketplace</option>
                    <option value="saas">Jobs &amp; SaaS</option>
                    <option value="social">Social</option>
                    <option value="studio">Studio &amp; Portfolio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c4cbc5]">
                  Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Concise one-line positioning"
                  className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c4cbc5]">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the core platform architecture and users..."
                  className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#c4cbc5]">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Optional custom <title>"
                    className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#c4cbc5]">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white focus:border-[#d4622a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c4cbc5]">
                  SEO Meta Description
                </label>
                <input
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="120-160 character search snippet summary"
                  className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-[#0a0d0b] px-3 py-2 text-sm text-white placeholder-[#687069] focus:border-[#d4622a] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-lg border border-white/[0.12] px-4 py-2 text-xs font-medium text-[#c4cbc5] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-[#d4622a] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#e06e35] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save to SQLite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
