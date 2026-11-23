'use client';

import React from 'react';

interface SiteHeaderProps {
  onOpenQuoteModal: () => void;
}

export function SiteHeader({ onOpenQuoteModal }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0a0d0b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        <a
          href="#"
          className="shrink-0 whitespace-nowrap font-[var(--font-display)] text-base font-bold tracking-tight text-[#f2f4f2] transition-opacity hover:opacity-85"
        >
          Millerz Technologies
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-sm font-medium text-[#a3aba4] md:flex"
        >
          <a
            href="#capabilities"
            className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-[#f2f4f2] hover:underline"
          >
            Capabilities
          </a>
          <a
            href="#projects"
            className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-[#f2f4f2] hover:underline"
          >
            Projects
          </a>
          <a
            href="#briefs"
            className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-[#f2f4f2] hover:underline"
          >
            Tech Briefs
          </a>
          <a
            href="#contact"
            className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-[#f2f4f2] hover:underline"
          >
            Contact
          </a>
        </nav>

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="shrink-0 whitespace-nowrap rounded-lg bg-[#d4622a] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#e06e35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4622a]"
          >
            Request Quote
          </button>
        </div>
      </div>
    </header>
  );
}
