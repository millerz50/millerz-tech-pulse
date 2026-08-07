'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MillerzProject } from '@/src/types/project';

interface ProjectCardProps {
  project: MillerzProject;
  onSelect?: (articleId?: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
}) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#212E25] bg-[#131A15] transition-all duration-300 hover:-translate-y-1 hover:border-[#C85223] hover:shadow-xl hover:shadow-black/20">

      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-[#0B0E0C]">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] to-transparent" />

        {project.type && (
          <span className="absolute left-3 top-3 rounded-lg border border-[#345D3F] bg-black/70 px-2 py-1 font-mono text-[10px] font-bold uppercase text-[#C29845] backdrop-blur">
            {project.type}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-white transition group-hover:text-[#E06332]">
          {project.title}
        </h3>

        {project.tagline && (
          <p className="mt-1 text-[11px] font-mono text-[#C29845]">
            {project.tagline}
          </p>
        )}

        {project.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-400">
            {project.description}
          </p>
        )}

        {project.metrics && (
          <div className="mt-3 rounded-lg border border-[#2D5237] bg-[#1D2B20] p-2 text-[10px] font-mono text-[#C29845]">
            ⚡ {project.metrics}
          </div>
        )}

        {project.techStack?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded border border-[#212E25] bg-[#1C261F] px-2 py-0.5 text-[9px] text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {project.featuredArticleId && onSelect && (
          <button
            onClick={() => onSelect(project.featuredArticleId)}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#212E25] bg-[#1C261F] py-2 text-[10px] font-mono text-gray-300 transition hover:border-[#C85223] hover:text-[#E06332]"
          >
            Related Intelligence
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </article>
  );
};