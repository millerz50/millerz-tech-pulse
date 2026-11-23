'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Globe, SearchCheck } from 'lucide-react';
import type { MillerzProject } from '@/types/project';

interface ProjectCardProps {
  project: MillerzProject;
  onInspectSeo: (project: MillerzProject) => void;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function ProjectCard({ project, onInspectSeo }: ProjectCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const hostname = getHostname(project.href);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#111613] transition-colors duration-200 hover:border-white/[0.18]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161d18]">
        {project.imageUrl && !imgFailed ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} — ${project.tagline}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#16231a] via-[#111613] to-[#1a1410] p-6 text-center">
            <Globe className="mb-2 h-6 w-6 text-[#c9a04e]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[#f2f4f2]">{project.title}</span>
            <span className="mt-1 font-mono text-xs text-[#9ca69d]">{hostname}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111613]/85 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9ca69d]">
          <span className="font-medium text-[#c9a04e]">{project.type}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{hostname}</span>
          <span aria-hidden="true">·</span>
          <span>{project.status}</span>
        </div>

        <h3 className="mt-2.5 text-lg font-bold tracking-tight text-[#f2f4f2]">
          {project.title}
        </h3>

        <p className="mt-1 text-sm font-medium text-[#c4cbc5]">{project.tagline}</p>

        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[#9ca69d]">
          {project.description}
        </p>

        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#7e8780]">
            Indexed SEO Metadata
          </p>
          <p className="mt-1 line-clamp-1 text-xs font-medium text-[#e4e8e4]">
            {project.seoTitle}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8f9890]">
            {project.seoDescription}
          </p>
        </div>

        {project.techStack.length > 0 && (
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-[#889189]">
            {project.techStack.join(' · ')}
          </p>
        )}

        <div className="mt-auto flex items-center gap-3 pt-5">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#d4622a] px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#e06e35] whitespace-nowrap"
          >
            <span>Visit Live Site</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => onInspectSeo(project)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.12] bg-transparent px-3.5 py-2.5 text-xs font-medium text-[#d5dcd6] transition-colors duration-150 hover:border-white/[0.24] hover:text-white whitespace-nowrap"
          >
            <SearchCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Inspect SEO</span>
          </button>
        </div>
      </div>
    </article>
  );
}
