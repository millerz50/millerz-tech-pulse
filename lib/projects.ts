import { prisma } from './prisma';
import type { MillerzProject } from '@/types/project';

export const SEED_PROJECTS: Omit<MillerzProject, 'id'>[] = [
  {
    slug: 'treasurepal',
    title: 'TreasurePal',
    tagline: 'Zimbabwe Real Estate & Property Marketplace',
    description:
      'Property discovery platform connecting home seekers, university students, and commercial tenants with verified landlords and real estate agents across Zimbabwe.',
    type: 'Real Estate Marketplace',
    categoryGroup: 'marketplace',
    href: 'https://www.treasurepal.co.zw',
    imageUrl: '/images/proj_treasurepal_1795418087430.jpg',
    metrics: 'Residential · Student Housing · Commercial Listings',
    techStack: ['Next.js', 'TypeScript', 'Prisma ORM', 'SQLite', 'Technical SEO'],
    seoTitle: 'TreasurePal | Explore Properties',
    seoDescription:
      'Your trusted real estate partner — browse affordable housing, student accommodation, and commercial property listings across Zimbabwe.',
    seoKeywords: 'Zimbabwe real estate, Harare rentals, student accommodation, TreasurePal, property listings',
    status: 'Live',
    featured: true,
    sortOrder: 1,
    featuredArticleId: 'news-1',
  },
  {
    slug: 'careermatched',
    title: 'CareerMatched',
    tagline: 'Jobs, Careers & OpenStreetMap Business Directory',
    description:
      'Multi-sided SaaS platform combining verified job openings, university industrial attachments, remote roles, an OpenStreetMap local business directory, a merchant marketplace, and a CV studio.',
    type: 'Jobs & Business SaaS',
    categoryGroup: 'saas',
    href: 'https://www.careermatched.co.zw',
    imageUrl: '/images/proj_careermatched_1795418087124.jpg',
    metrics: 'Verified Jobs · OpenStreetMap Directory · CV Studio',
    techStack: ['Next.js', 'TypeScript', 'OpenStreetMap', 'Prisma ORM', 'Tailwind CSS'],
    seoTitle: 'CareerMatched | Jobs, Careers & Businesses in Zimbabwe',
    seoDescription:
      'Find verified jobs, attachments, remote careers, OpenStreetMap businesses, and products in Zimbabwe. Ranked by community votes on CareerMatched.',
    seoKeywords: 'Zimbabwe jobs, internships, attachments, OpenStreetMap directory, CV builder, CareerMatched',
    status: 'Live',
    featured: true,
    sortOrder: 2,
    featuredArticleId: 'news-6',
  },
  {
    slug: 'truevona',
    title: 'TrueVona',
    tagline: 'Social Discovery, Communities & Messaging Platform',
    description:
      'Safe social connection, community groups, real-time messaging, and video-dating platform engineered for verified users and local communities across Zimbabwe.',
    type: 'Social & Video Platform',
    categoryGroup: 'social',
    href: 'https://www.truevona.co.zw',
    imageUrl: '/images/proj_truevona_1795418087952.jpg',
    metrics: 'Verified Profiles · Real-Time Chat · Community Groups',
    techStack: ['Next.js', 'TypeScript', 'Real-Time Messaging', 'WebRTC', 'Cloud Infrastructure'],
    seoTitle: 'TrueVona — Social, Dating & Entertainment Platform',
    seoDescription:
      'TrueVona is a social platform for dating, communities, messaging, and entertainment in Zimbabwe. Meet people, join groups, chat, and connect safely.',
    seoKeywords: 'TrueVona, Zimbabwe social platform, communities, messaging, verified dating',
    status: 'Live',
    featured: true,
    sortOrder: 3,
    featuredArticleId: 'news-2',
  },
  {
    slug: 'millerz-technologies',
    title: 'Millerz Technologies',
    tagline: 'Web, Mobile, Cloud & AI Engineering Consultancy',
    description:
      'Flagship engineering studio building bespoke Next.js 16 web platforms, iOS and Android mobile apps, cloud infrastructure, and Gemini-powered quotation systems.',
    type: 'Engineering Studio',
    categoryGroup: 'studio',
    href: 'https://www.millerz.co.zw',
    imageUrl: '/images/proj_millerz_platform_1795418086731.jpg',
    metrics: 'Next.js 16 · Mobile Apps · Gemini AI Quotation Engine',
    techStack: ['Next.js 16', 'React 19', 'React Native', 'Gemini AI', 'Cloud Run'],
    seoTitle: 'Millerz Technologies | Web, Mobile & Cloud Engineering',
    seoDescription:
      'Bespoke Next.js 16 Web Apps, iOS & Android Mobile Platforms, Cloud Infrastructure, and AI Quotation Solutions.',
    seoKeywords: 'Millerz Technologies, custom software Zimbabwe, Next.js agency, mobile apps, AI quotation',
    status: 'Live',
    featured: true,
    sortOrder: 4,
    featuredArticleId: 'news-4',
  },
  {
    slug: 'johannes-zemba-portfolio',
    title: 'Johannes Zemba Portfolio',
    tagline: 'Full-Stack Web Developer & Technical SEO Engineer',
    description:
      'Personal engineering portfolio and technical architecture showcase for Johannes Zemba, Founder of Millerz Technologies, featuring Schema.org JSON-LD, Prisma, and SQLite systems.',
    type: 'Developer Portfolio',
    categoryGroup: 'studio',
    href: 'https://www.johanneszemba.co.zw',
    imageUrl: '/images/proj_johannes_portfolio_1795418087179.jpg',
    metrics: 'Harare, ZW · Schema.org JSON-LD · Core Web Vitals',
    techStack: ['Next.js', 'TypeScript', 'Prisma ORM', 'SQLite', 'Schema.org JSON-LD'],
    seoTitle: 'Johannes Zemba | Full-Stack Web Developer & SEO Engineer',
    seoDescription:
      'Explore TreasurePal, CareerMatched, TrueVona, and Millerz Technologies—engineered by Johannes Zemba with Next.js, Prisma, and technical SEO.',
    seoKeywords: 'Johannes Zemba, Full-Stack Web Developer Zimbabwe, Technical SEO Engineer, Prisma SQLite',
    status: 'Live',
    featured: true,
    sortOrder: 5,
    featuredArticleId: 'news-3',
  },
];

function serializeProject(row: {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  type: string;
  categoryGroup: string;
  href: string;
  imageUrl: string;
  metrics: string | null;
  techStack: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string | null;
  status: string;
  featured: boolean;
  sortOrder: number;
}): MillerzProject {
  let parsedStack: string[] = [];
  try {
    const raw = JSON.parse(row.techStack);
    if (Array.isArray(raw)) parsedStack = raw;
  } catch {
    parsedStack = row.techStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    type: row.type,
    categoryGroup: (row.categoryGroup as MillerzProject['categoryGroup']) || 'studio',
    href: row.href,
    imageUrl: row.imageUrl,
    metrics: row.metrics ?? undefined,
    techStack: parsedStack,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    seoKeywords: row.seoKeywords ?? undefined,
    status: row.status,
    featured: row.featured,
    sortOrder: row.sortOrder,
  };
}

export async function ensureProjectsSeeded(): Promise<void> {
  const existingCount = await prisma.project.count();
  if (existingCount > 0) return;

  for (const project of SEED_PROJECTS) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        type: project.type,
        categoryGroup: project.categoryGroup,
        href: project.href,
        imageUrl: project.imageUrl,
        metrics: project.metrics ?? null,
        techStack: JSON.stringify(project.techStack),
        seoTitle: project.seoTitle,
        seoDescription: project.seoDescription,
        seoKeywords: project.seoKeywords ?? null,
        status: project.status,
        featured: project.featured,
        sortOrder: project.sortOrder,
      },
    });
  }
}

export async function getAllProjects(): Promise<MillerzProject[]> {
  await ensureProjectsSeeded();
  const rows = await prisma.project.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
  return rows.map(serializeProject);
}

export interface CreateProjectInput {
  title: string;
  tagline: string;
  description: string;
  type: string;
  categoryGroup?: 'marketplace' | 'saas' | 'studio' | 'social';
  href: string;
  imageUrl?: string;
  metrics?: string;
  techStack: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export async function createProject(input: CreateProjectInput): Promise<MillerzProject> {
  await ensureProjectsSeeded();
  const baseSlug = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const slug = `${baseSlug || 'project'}-${Date.now().toString(36)}`;

  const maxOrder = await prisma.project.aggregate({
    _max: { sortOrder: true },
  });

  const created = await prisma.project.create({
    data: {
      slug,
      title: input.title.trim(),
      tagline: input.tagline.trim(),
      description: input.description.trim(),
      type: input.type.trim(),
      categoryGroup: input.categoryGroup ?? 'studio',
      href: input.href.trim(),
      imageUrl: input.imageUrl?.trim() || '/images/proj_millerz_platform_1795418086731.jpg',
      metrics: input.metrics?.trim() || null,
      techStack: JSON.stringify(input.techStack),
      seoTitle: input.seoTitle?.trim() || `${input.title.trim()} | Millerz Technologies`,
      seoDescription: input.seoDescription?.trim() || input.description.trim().slice(0, 160),
      seoKeywords: input.seoKeywords?.trim() || input.techStack.join(', '),
      status: 'Live',
      featured: true,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });

  return serializeProject(created);
}
