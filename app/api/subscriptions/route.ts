import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const rows = await prisma.subscription.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 20,
    });

    const subscriptions = rows.map((row) => ({
      id: row.id,
      email: row.email,
      createdAt: row.createdAt.toISOString(),
      topics: JSON.parse(row.topics),
      frequency: row.frequency,
      status: row.status,
      pushEnabled: row.pushEnabled,
    }));

    return NextResponse.json({ status: 'success', subscriptions });
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    return NextResponse.json(
      { status: 'error', subscriptions: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { status: 'error', message: 'Valid email is required' },
        { status: 400 }
      );
    }

    const topics = Array.isArray(body.topics) ? body.topics : ['web-dev', 'ai-cloud'];
    const frequency =
      body.frequency === 'daily' || body.frequency === 'weekly'
        ? body.frequency
        : 'instant';
    const pushEnabled = Boolean(body.pushEnabled ?? true);

    const record = await prisma.subscription.upsert({
      where: { email },
      update: {
        topics: JSON.stringify(topics),
        frequency,
        pushEnabled,
        status: 'active',
      },
      create: {
        email,
        topics: JSON.stringify(topics),
        frequency,
        pushEnabled,
        status: 'active',
      },
    });

    return NextResponse.json({
      status: 'success',
      subscription: {
        id: record.id,
        email: record.email,
        createdAt: record.createdAt.toISOString(),
        topics,
        frequency: record.frequency,
        status: record.status,
        pushEnabled: record.pushEnabled,
      },
    });
  } catch (error) {
    console.error('Failed to save subscription:', error);
    return NextResponse.json(
      { status: 'error', message: 'Unable to save subscription' },
      { status: 500 }
    );
  }
}
