import React from 'react';
import MillerzShowcaseClient from './MillerzShowcaseClient';
import { getAllProjects } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export default async function MillerzShowcaseServer() {
  const projects = await getAllProjects();

  return <MillerzShowcaseClient initialProjects={projects} />;
}
