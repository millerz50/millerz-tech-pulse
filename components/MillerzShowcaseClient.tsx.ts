'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { MillerzProject } from '@/src/types/project';
import { ProjectCard } from './ProjectCard';

interface Props {
  projects: MillerzProject[];
  onSelectProjectNews?: (articleId?: string) => void;
}

export const MillerzShowcaseClient: React.FC<Props> = ({
  projects,
  onSelectProjectNews,
}) => {
  if (!projects.length) return null;

  return (
    <section className="relative">

      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#25432D]/15 blur-3xl" />

      {/* Header */}
      <div className="relative mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-[#345D3F] bg-[#25432D] px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#C29845]">
              Millerz Studio
            </span>

            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              Production Ready
            </span>
          </div>

          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
            Crafted by{' '}
            <span className="bg-gradient-to-r from-[#E06332] to-[#C29845] bg-clip-text text-transparent">
              Millerz Engineering
            </span>
          </h2>

          <p className="mt-1 max-w-2xl text-xs text-gray-400">
            Web, mobile, cloud and AI systems engineered by Millerz Technologies.
          </p>
        </div>

        <div className="shrink-0 rounded-xl border border-[#212E25] bg-[#131A15] px-3 py-2 text-[10px] font-mono text-gray-400">
          <span className="font-bold text-[#C29845]">
            {projects.length}+
          </span>{' '}
          Projects
        </div>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={onSelectProjectNews}
          />
        ))}
      </div>
    </section>
  );
};