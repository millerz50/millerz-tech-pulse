import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.inquiry.count();
    return NextResponse.json({ status: 'success', count });
  } catch (error) {
    console.error('Failed to read inquiries count:', error);
    return NextResponse.json({ status: 'error', count: 0 }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const projectScope =
      typeof body.projectScope === 'string' ? body.projectScope.trim() : 'Full-Stack Web Platform';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !email.includes('@') || !message) {
      return NextResponse.json(
        { status: 'error', message: 'Name, valid email, and project details are required.' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        company: company || null,
        projectScope,
        message,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        inquiry: {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          projectScope: inquiry.projectScope,
          createdAt: inquiry.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to store inquiry:', error);
    return NextResponse.json(
      { status: 'error', message: 'Unable to submit inquiry.' },
      { status: 500 }
    );
  }
}
