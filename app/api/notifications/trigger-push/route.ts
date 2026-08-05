import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, category, articleId } = body;

    const payload = {
      id: `push-${Date.now()}`,
      title: title || '⚡ Millerz Engineering Radar Alert',
      message: message || 'Next.js 16 App Router full-stack server architecture deployed successfully.',
      category: category || 'web-dev',
      articleId: articleId || null,
      timestamp: new Date().toISOString(),
      read: false
    };

    return NextResponse.json({
      status: 'success',
      notification: payload
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
