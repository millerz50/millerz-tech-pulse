'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface MillerzProject {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  type: string;
  imageUrl?: string;
  metrics?: string;
  techStack?: string[];
  featuredArticleId?: string;
  projectUrl?: string;
  status?: string;
  featured?: boolean;
}

interface MillerzShowcaseProps {
  onSelectProjectNews?: (articleId?: string) => void;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';

export const MillerzShowcase: React.FC<MillerzShowcaseProps> = ({
  onSelectProjectNews,
}) => {
  const [projects, setProjects] = useState<MillerzProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load projects (${response.status})`
        );
      }

      const data = await response.json();

      /*
       * Supports either:
       *
       * { projects: [...] }
       *
       * or
       *
       * [...]
       */
      const incomingProjects = Array.isArray(data)
        ? data
        : Array.isArray(data.projects)
          ? data.projects
          : [];

      setProjects(incomingProjects);
    } catch (err) {
      console.error('Millerz projects error:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load Millerz projects.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="relative overflow-hidden">

      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#25432D]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#C85223]/10 blur-3xl" />

      {/* =====================================================
          SECTION HEADER
      ====================================================== */}

      <div className="relative z-10 mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

        <div className="max-w-3xl">

          <div className="mb-2 flex flex-wrap items-center gap-2">

            <span className="rounded-full border border-[#345D3F] bg-[#25432D] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#C29845] sm:text-xs">
              MILLERZ PROJECTS
            </span>

            <span className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-emerald-400 sm:text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Production Projects
            </span>

          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Built by{' '}
            <span className="bg-gradient-to-r from-[#E06332] via-[#C29845] to-[#345D3F] bg-clip-text text-transparent">
              Millerz Technologies
            </span>
          </h2>

          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-gray-400 sm:text-sm">
            Explore selected digital products, platforms and software
            solutions developed by Millerz Technologies.
          </p>

        </div>

        <div className="shrink-0">

          <div className="inline-flex items-center rounded-xl border border-[#212E25] bg-[#131A15] px-4 py-2 font-mono text-xs text-gray-300">

            <span className="mr-1 font-bold text-[#C29845]">
              {loading ? '—' : projects.length}
            </span>

            <span>
              {projects.length === 1 ? 'Project' : 'Projects'}
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading && (
        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-[#212E25] bg-[#131A15]"
            >

              <div className="h-44 animate-pulse bg-[#1A211C]" />

              <div className="space-y-3 p-5">

                <div className="h-5 w-3/4 animate-pulse rounded bg-[#1A211C]" />

                <div className="h-3 w-1/2 animate-pulse rounded bg-[#1A211C]" />

                <div className="h-10 w-full animate-pulse rounded bg-[#1A211C]" />

                <div className="h-8 w-full animate-pulse rounded bg-[#1A211C]" />

              </div>

            </div>
          ))}

        </div>
      )}

      {/* =====================================================
          ERROR
      ====================================================== */}

      {!loading && error && (
        <div className="relative z-10 rounded-2xl border border-red-900/40 bg-red-950/20 p-8 text-center">

          <p className="font-mono text-xs text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchProjects}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-2 font-mono text-xs font-bold text-red-300 transition hover:bg-red-900/30"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>

        </div>
      )}

      {/* =====================================================
          EMPTY
      ====================================================== */}

      {!loading && !error && projects.length === 0 && (
        <div className="relative z-10 rounded-2xl border border-[#212E25] bg-[#131A15] p-10 text-center">

          <p className="font-mono text-sm text-gray-400">
            No projects are currently available.
          </p>

          <p className="mt-2 text-xs text-gray-600">
            Projects published by Millerz Technologies will appear here.
          </p>

        </div>
      )}

      {/* =====================================================
          PROJECT GRID
      ====================================================== */}

      {!loading && !error && projects.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (

            <article
              key={project.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#212E25] bg-[#131A15] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#C85223]/70 hover:shadow-[#C85223]/5"
            >

              {/* =================================================
                  PROJECT IMAGE
              ================================================== */}

              <div className="relative h-44 w-full overflow-hidden bg-[#0B0E0C]">

                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16281C] to-[#101411]">

                    <div className="text-center">

                      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#345D3F] bg-[#25432D]">
                        <span className="font-mono text-lg font-black text-[#C29845]">
                          M
                        </span>
                      </div>

                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                        Millerz Technologies
                      </span>

                    </div>

                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-transparent to-transparent" />

                {/* Project Type */}

                {project.type && (
                  <span className="absolute left-3 top-3 rounded-lg border border-[#345D3F] bg-black/75 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wide text-[#C29845] backdrop-blur-md sm:text-[10px]">
                    {project.type}
                  </span>
                )}

                {/* Status */}

                {project.status && (
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-black/75 px-2 py-1 font-mono text-[9px] uppercase text-emerald-400 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {project.status}
                  </span>
                )}

              </div>

              {/* =================================================
                  PROJECT CONTENT
              ================================================== */}

              <div className="flex flex-1 flex-col p-5">

                <div>

                  <h3 className="text-base font-bold text-white transition-colors group-hover:text-[#E06332]">
                    {project.title}
                  </h3>

                  {project.tagline && (
                    <p className="mt-1 font-mono text-[10px] font-semibold text-[#C29845] sm:text-xs">
                      {project.tagline}
                    </p>
                  )}

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-400">
                    {project.description}
                  </p>

                </div>

                {/* =================================================
                    METRICS
                ================================================== */}

                {project.metrics && (
                  <div className="mt-4 rounded-xl border border-[#2D5237] bg-[#1D2B20] p-2.5 font-mono text-[10px] text-[#C29845] sm:text-[11px]">
                    <span className="mr-1">⚡</span>
                    {project.metrics}
                  </div>
                )}

                {/* =================================================
                    TECHNOLOGY TAGS
                ================================================== */}

                {project.techStack &&
                  project.techStack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">

                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[#212E25] bg-[#1C261F] px-2 py-1 font-mono text-[9px] text-gray-400 sm:text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}

                    </div>
                  )}

                {/* =================================================
                    ACTIONS
                ================================================== */}

                <div className="mt-auto pt-5">

                  {project.featuredArticleId &&
                    onSelectProjectNews && (
                      <button
                        type="button"
                        onClick={() =>
                          onSelectProjectNews(
                            project.featuredArticleId
                          )
                        }
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#212E25] bg-[#1C261F] py-2.5 font-mono text-[10px] font-semibold text-gray-300 transition hover:border-[#C85223] hover:bg-[#241711] hover:text-[#E06332]"
                      >
                        <span>Read Project Intelligence</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}

                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#2D5237] bg-[#16281C] py-2.5 font-mono text-[10px] font-semibold text-[#C29845] transition hover:border-[#345D3F] hover:bg-[#25432D] hover:text-white ${
                        project.featuredArticleId &&
                        onSelectProjectNews
                          ? 'mt-2'
                          : ''
                      }`}
                    >
                      <span>View Project</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                </div>

              </div>

            </article>

          ))}

        </div>
      )}

    </section>
  );
};
