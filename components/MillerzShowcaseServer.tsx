import React from 'react';
import MillerzShowcaseClient from './MillerzShowcaseClient';
import type { MillerzProject } from '@/types/project';

async function getProjects(): Promise<MillerzProject[]> {
  // Server component: fetch your real backend/database here.
  //
  // For the local Next.js API route, the browser/client component can
  // fetch /api/projects directly. This server component intentionally
  // stays small and passes the initial data to the CSR layer.
  //
  // If your projects are stored in a DB, replace this with your DB query.

  return [];
}

export default async function MillerzShowcaseServer() {
  const projects = await getProjects();

  return <MillerzShowcaseClient initialProjects={projects} />;
}
