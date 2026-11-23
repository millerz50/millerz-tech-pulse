import { NextRequest, NextResponse } from 'next/server';
import { createProject, getAllProjects } from '@/lib/projects';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to load projects from SQLite:', error);
    return NextResponse.json(
      { error: 'Unable to load projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const tagline = typeof body.tagline === 'string' ? body.tagline.trim() : '';
    const description =
      typeof body.description === 'string' ? body.description.trim() : '';
    const type = typeof body.type === 'string' ? body.type.trim() : 'Web Platform';
    const href = typeof body.href === 'string' ? body.href.trim() : '';
    const categoryGroup =
      body.categoryGroup === 'marketplace' ||
      body.categoryGroup === 'saas' ||
      body.categoryGroup === 'social' ||
      body.categoryGroup === 'studio'
        ? body.categoryGroup
        : 'studio';

    if (!title || !description || !href) {
      return NextResponse.json(
        { error: 'Title, live URL, and description are required.' },
        { status: 400 }
      );
    }

    try {
      const parsedUrl = new URL(href);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json(
        { error: 'Please provide a valid http:// or https:// URL.' },
        { status: 400 }
      );
    }

    const techStack = Array.isArray(body.techStack)
      ? body.techStack.map((item: unknown) => String(item).trim()).filter(Boolean)
      : typeof body.techStack === 'string'
        ? body.techStack
            .split(',')
            .map((item: string) => item.trim())
            .filter(Boolean)
        : ['Next.js', 'TypeScript', 'Prisma ORM', 'SQLite'];

    const created = await createProject({
      title,
      tagline: tagline || `${type} built with modern web standards`,
      description,
      type,
      categoryGroup,
      href,
      imageUrl:
        typeof body.imageUrl === 'string' ? body.imageUrl.trim() : undefined,
      metrics:
        typeof body.metrics === 'string' ? body.metrics.trim() : undefined,
      techStack,
      seoTitle:
        typeof body.seoTitle === 'string' ? body.seoTitle.trim() : undefined,
      seoDescription:
        typeof body.seoDescription === 'string'
          ? body.seoDescription.trim()
          : undefined,
      seoKeywords:
        typeof body.seoKeywords === 'string'
          ? body.seoKeywords.trim()
          : undefined,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Failed to create project in SQLite:', error);
    return NextResponse.json(
      { error: 'Unable to save project' },
      { status: 500 }
    );
  }
}
