'use client';

import React, { useEffect, useState } from 'react';
import type { MillerzProject } from '@/types/project';
import ProjectCard from './ProjectCard';

interface Props {
  initialProjects: MillerzProject[];
}

export default function MillerzShowcaseClient({
  initialProjects,
}: Props) {
  const [projects, setProjects] = useState<MillerzProject[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        const response = await fetch('/api/projects', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();

        if (mounted) {
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Projects loading error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute -right-32 -top-20 h-72 w-72 rounded-full bg-[#25432D]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-32 h-72 w-72 rounded-full bg-[#C85223]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-[#345D3F] bg-[#25432D] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#C29845]">
              Millerz Studio
            </span>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Crafted by{' '}
              <span className="bg-gradient-to-r from-[#E06332] via-[#C29845] to-[#345D3F] bg-clip-text text-transparent">
                Millerz Engineering
              </span>
            </h2>

            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-gray-400 sm:text-sm">
              Web, mobile, cloud and AI systems built by Millerz Technologies.
            </p>
          </div>

          <div className="rounded-xl border border-[#212E25] bg-[#131A15] px-3 py-2 font-mono text-xs text-gray-300">
            <span className="font-bold text-[#C29845]">
              {projects.length}
            </span>{' '}
            Projects
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-[#212E25] bg-[#131A15]"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2D5237] bg-[#131A15] p-8 text-center">
            <p className="font-mono text-xs text-gray-500">
              No Millerz projects available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
