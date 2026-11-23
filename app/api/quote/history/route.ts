import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const rows = await prisma.quotation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const quotations = rows.map((row) => ({
      quotationId: row.quotationId,
      clientName: row.clientName,
      companyName: row.companyName ?? '',
      email: row.email,
      projectType: row.projectType,
      features: JSON.parse(row.features),
      targetTimeline: row.targetTimeline,
      estimatedPriceRange: {
        min: row.minPrice,
        max: row.maxPrice,
        currency: row.currency,
      },
      itemizedScope: JSON.parse(row.itemizedScope),
      architectureProposal: row.architectureProposal,
      recommendedTechStack: JSON.parse(row.recommendedTechStack),
      deliveryMilestones: JSON.parse(row.deliveryMilestones),
      generatedAt: row.createdAt.toISOString(),
      validityDays: row.validityDays,
      status: row.status,
    }));

    return NextResponse.json({
      status: 'success',
      quotations,
    });
  } catch (error) {
    console.error('Failed to read quotation history:', error);
    return NextResponse.json(
      { status: 'error', quotations: [] },
      { status: 500 }
    );
  }
}
