import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { MillerzProject } from '@/types/project';

interface Props {
  project: MillerzProject;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#212E25] bg-[#131A15] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#C85223]">
      <div className="relative h-40 overflow-hidden bg-[#0B0E0C] sm:h-44">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#16281C] to-[#1E1914]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-lg border border-[#345D3F] bg-black/70 px-2 py-1 font-mono text-[10px] font-bold uppercase text-[#C29845] backdrop-blur">
          {project.type}
        </span>
      </div>

      <div className="p-4">
        <h3 className="truncate text-base font-bold text-white transition group-hover:text-[#E06332]">
          {project.title}
        </h3>

        <p className="mt-1 line-clamp-1 font-mono text-[11px] font-semibold text-[#C29845]">
          {project.tagline}
        </p>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-400">
          {project.description}
        </p>

        {project.metrics && (
          <div className="mt-3 rounded-xl border border-[#2D5237] bg-[#1D2B20] p-2.5 font-mono text-[10px] text-[#C29845]">
            ⚡ {project.metrics}
          </div>
        )}

        {project.techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded bg-[#1C261F] px-2 py-0.5 font-mono text-[10px] text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#212E25] bg-[#1C261F] py-2 text-xs font-medium text-gray-300 transition hover:border-[#C85223] hover:text-[#E06332]"
          >
            View Project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
