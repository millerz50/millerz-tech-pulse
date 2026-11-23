import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientName,
      companyName,
      email,
      projectType = 'Web Platform',
      selectedFeatures = [],
      targetTimeline = '1-2 months',
      budgetRange = '$10,000 - $25,000',
      projectNotes = '',
    } = body;

    if (!clientName || !email) {
      return NextResponse.json(
        { status: 'error', message: 'Client name and email are required' },
        { status: 400 }
      );
    }

    const quoteCode = `QT-${new Date().getFullYear()}-MLZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const featuresList: string[] = Array.isArray(selectedFeatures)
      ? selectedFeatures.map(String)
      : [];

    let parsedAI: {
      estimatedMinPrice?: number;
      estimatedMaxPrice?: number;
      architectureProposal?: string;
      recommendedTechStack?: string[];
      itemizedScope?: {
        moduleName: string;
        description: string;
        estimatedHours: number;
        cost: number;
      }[];
      deliveryMilestones?: {
        phase: string;
        weeks: number;
        deliverables: string;
      }[];
    } = {};

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are the Principal Solutions Architect at Millerz Technologies (Web Development, Mobile Apps, Cloud Engineering, Technical SEO, and Custom Software).
Generate an official itemized Project Quotation and Technical Proposal for:
- Client: ${clientName} (${companyName || 'Independent Organization'})
- Email: ${email}
- Project Type: ${projectType}
- Selected Features: ${featuresList.join(', ')}
- Target Timeline: ${targetTimeline}
- Budget Parameter: ${budgetRange}
- Client Requirement Notes: ${projectNotes || 'Standard production deployment requirements.'}

Return JSON with itemized scope modules, calculated hours, realistic pricing breakdown in USD, recommended tech stack (Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma ORM, SQLite/PostgreSQL, Schema.org SEO), phased delivery milestones, and an architecture proposal overview.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                estimatedMinPrice: { type: Type.INTEGER },
                estimatedMaxPrice: { type: Type.INTEGER },
                architectureProposal: { type: Type.STRING },
                recommendedTechStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                itemizedScope: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      moduleName: { type: Type.STRING },
                      description: { type: Type.STRING },
                      estimatedHours: { type: Type.INTEGER },
                      cost: { type: Type.INTEGER },
                    },
                    required: ['moduleName', 'description', 'estimatedHours', 'cost'],
                  },
                },
                deliveryMilestones: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phase: { type: Type.STRING },
                      weeks: { type: Type.INTEGER },
                      deliverables: { type: Type.STRING },
                    },
                    required: ['phase', 'weeks', 'deliverables'],
                  },
                },
              },
              required: [
                'estimatedMinPrice',
                'estimatedMaxPrice',
                'architectureProposal',
                'recommendedTechStack',
                'itemizedScope',
                'deliveryMilestones',
              ],
            },
          },
        });

        if (response.text) {
          parsedAI = JSON.parse(response.text);
        }
      } catch (aiError) {
        console.warn('Gemini fallback triggered for quotation:', aiError);
      }
    }

    const baseCost = 4500 + featuresList.length * 1100;
    const minPrice = parsedAI.estimatedMinPrice || baseCost;
    const maxPrice = parsedAI.estimatedMaxPrice || Math.round(baseCost * 1.45);
    const itemizedScope = parsedAI.itemizedScope || [
      {
        moduleName: 'UI/UX Architecture & Next.js 16 Design System',
        description: `Responsive Next.js 16 App Router interface tailored for ${projectType}`,
        estimatedHours: 36,
        cost: Math.round(minPrice * 0.35),
      },
      {
        moduleName: 'Full-Stack API Routes, Prisma ORM & SQLite Schema',
        description: `Server-side endpoints, relational modeling, and validation (${featuresList.slice(0, 3).join(', ') || 'Core Modules'})`,
        estimatedHours: 44,
        cost: Math.round(minPrice * 0.45),
      },
      {
        moduleName: 'Technical SEO, Schema.org JSON-LD & Production Launch',
        description: 'OpenGraph cards, XML sitemaps, Core Web Vitals optimization, and deployment',
        estimatedHours: 20,
        cost: Math.round(minPrice * 0.2),
      },
    ];
    const architectureProposal =
      parsedAI.architectureProposal ||
      `Production Next.js 16 App Router architecture backed by Prisma ORM and SQLite/PostgreSQL, paired with technical SEO (OpenGraph, canonical URLs, JSON-LD) and containerized cloud deployment for ${companyName || clientName}.`;
    const recommendedTechStack = parsedAI.recommendedTechStack || [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Prisma ORM',
      'SQLite',
      'Tailwind CSS',
    ];
    const deliveryMilestones = parsedAI.deliveryMilestones || [
      {
        phase: 'Phase 1: Discovery & Database Schema',
        weeks: 1,
        deliverables: 'Technical specs, Prisma schema, and wireframes.',
      },
      {
        phase: 'Phase 2: Core Engineering & SEO Architecture',
        weeks: 3,
        deliverables: 'Full-stack features, API handlers, and Schema.org metadata.',
      },
      {
        phase: 'Phase 3: QA, Performance Audit & Launch',
        weeks: 1,
        deliverables: 'Lighthouse verification, production rollout, and handoff.',
      },
    ];

    const saved = await prisma.quotation.create({
      data: {
        quotationId: quoteCode,
        clientName: String(clientName),
        companyName: companyName ? String(companyName) : null,
        email: String(email),
        projectType: String(projectType),
        features: JSON.stringify(featuresList),
        targetTimeline: String(targetTimeline),
        minPrice,
        maxPrice,
        currency: 'USD',
        itemizedScope: JSON.stringify(itemizedScope),
        architectureProposal,
        recommendedTechStack: JSON.stringify(recommendedTechStack),
        deliveryMilestones: JSON.stringify(deliveryMilestones),
        validityDays: 30,
        status: 'submitted',
      },
    });

    const quotation = {
      quotationId: saved.quotationId,
      clientName: saved.clientName,
      companyName: saved.companyName || '',
      email: saved.email,
      projectType: saved.projectType,
      features: featuresList,
      targetTimeline: saved.targetTimeline,
      estimatedPriceRange: {
        min: saved.minPrice,
        max: saved.maxPrice,
        currency: saved.currency,
      },
      itemizedScope,
      architectureProposal: saved.architectureProposal,
      recommendedTechStack,
      deliveryMilestones,
      generatedAt: saved.createdAt.toISOString(),
      validityDays: saved.validityDays,
      status: saved.status,
    };

    return NextResponse.json({
      status: 'success',
      quotation,
    });
  } catch (error: unknown) {
    console.error('Quotation Error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to generate quotation';
    return NextResponse.json(
      { status: 'error', message },
      { status: 500 }
    );
  }
}
