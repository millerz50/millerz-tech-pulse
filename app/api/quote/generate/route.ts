import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

let serverQuotations: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      clientName, 
      companyName, 
      email, 
      projectType, 
      selectedFeatures = [], 
      targetTimeline, 
      budgetRange, 
      projectNotes 
    } = body;

    if (!clientName || !email) {
      return NextResponse.json(
        { status: 'error', message: 'Client name and email are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    const quoteCode = `QT-${new Date().getFullYear()}-MLZ-${Math.floor(1000 + Math.random() * 9000)}`;

    const prompt = `You are the Principal Solutions Architect at Millerz Technologies (a top-tier Web Development, Mobile Apps, Cloud Engineering, and Custom Software consultancy).
Generate an official itemized Project Quotation and Technical Proposal for:
- Client: ${clientName} (${companyName || 'Independent Organization'})
- Email: ${email}
- Project Type: ${projectType}
- Selected Features: ${selectedFeatures.join(', ')}
- Target Timeline: ${targetTimeline}
- Budget Parameter: ${budgetRange || 'Standard Market Estimation'}
- Client Requirement Notes: ${projectNotes || 'Standard production deployment requirements.'}

Return JSON with itemized scope modules, calculated hours, realistic pricing breakdown in USD, recommended tech stack (Next.js 16, React 19, TypeScript, Tailwind, Cloud Run, Gemini AI, PostgreSQL/Firestore), phased delivery milestones, and an architecture proposal overview.`;

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
                  cost: { type: Type.INTEGER }
                },
                required: ['moduleName', 'description', 'estimatedHours', 'cost']
              }
            },
            deliveryMilestones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  weeks: { type: Type.INTEGER },
                  deliverables: { type: Type.STRING }
                },
                required: ['phase', 'weeks', 'deliverables']
              }
            }
          },
          required: [
            'estimatedMinPrice', 
            'estimatedMaxPrice', 
            'architectureProposal', 
            'recommendedTechStack', 
            'itemizedScope', 
            'deliveryMilestones'
          ]
        }
      }
    });

    const parsedAI = JSON.parse(response.text || '{}');

    const quotation = {
      quotationId: quoteCode,
      clientName,
      companyName: companyName || '',
      email,
      projectType,
      features: selectedFeatures,
      targetTimeline: targetTimeline || '1-2 months',
      estimatedPriceRange: {
        min: parsedAI.estimatedMinPrice || 7500,
        max: parsedAI.estimatedMaxPrice || 16500,
        currency: 'USD'
      },
      itemizedScope: parsedAI.itemizedScope || [
        { 
          moduleName: 'UI/UX Architecture & Next.js 16 Design System', 
          description: 'Responsive Next.js 16 App Router layouts & Millerz design components', 
          estimatedHours: 35, 
          cost: 3500 
        },
        { 
          moduleName: 'Full-Stack Core Logic & API Proxying', 
          description: 'Server-side API Route Handlers, auth & state management', 
          estimatedHours: 45, 
          cost: 4500 
        },
        { 
          moduleName: 'Quality Assurance & Cloud Run Deployment', 
          description: 'Automated testing and Cloud Run production containerization', 
          estimatedHours: 20, 
          cost: 2000 
        }
      ],
      architectureProposal: parsedAI.architectureProposal || 'A high-availability Next.js 16 full-stack web application hosted on Cloud Run with containerized App Router handlers and server-side secret management.',
      recommendedTechStack: parsedAI.recommendedTechStack || ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Cloud Run'],
      deliveryMilestones: parsedAI.deliveryMilestones || [
        { phase: 'Phase 1: Discovery & Architecture Blueprint', weeks: 1, deliverables: 'Wireframes, API schemas, and technical specs.' },
        { phase: 'Phase 2: Next.js 16 App Router Core & Motion UI', weeks: 3, deliverables: 'Functional web application with live API integrations.' },
        { phase: 'Phase 3: QA, Security Audit & Cloud Launch', weeks: 1, deliverables: 'Production Cloud Run deployment, domain setup & handoff.' }
      ],
      generatedAt: new Date().toISOString(),
      validityDays: 30,
      status: 'submitted'
    };

    serverQuotations.unshift(quotation);

    return NextResponse.json({
      status: 'success',
      quotation
    });
  } catch (error: any) {
    console.error('Next.js 16 Quotation Error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to generate quotation' },
      { status: 500 }
    );
  }
}
