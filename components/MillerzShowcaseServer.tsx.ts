import React from 'react';
import { MillerzProject } from '@/src/types/project';
import { MillerzShowcaseClient } from './MillerzShowcaseClient';

interface Props {
  onSelectProjectNews?: (articleId?: string) => void;
}

async function getProjects(): Promise<MillerzProject[]> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/projects`,
      {
        next: {
          revalidate: 60,
          tags: ['millerz-projects'],
        },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data)
      ? data
      : data.projects || data.data || [];
  } catch (error) {
    console.error('Failed to load Millerz projects:', error);
    return [];
  }
}

export default async function MillerzShowcaseServer({
  onSelectProjectNews,
}: Props) {
  const projects = await getProjects();

  return (
    <MillerzShowcaseClient
      projects={projects}
      onSelectProjectNews={onSelectProjectNews}
    />
  );
}