
import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Sparkles, 
  Check, 
  Send, 
  FileText, 
  Download, 
  Clock, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  Cpu, 
  Printer,
  Copy,
  Building2,
  Mail,
  User,
  Globe,
  ShoppingCart,
  Database,
  Smartphone,
  Server,
  Code2,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { ProjectQuotation, ProjectType } from '../types';
import { MillerzLogo } from './MillerzLogo';

interface QuoteGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

interface FeatureOption {
  id: string;
  label: string;
  category: 'Core' | 'Frontend' | 'Mobile' | 'AI & ML' | 'Backend & DB' | 'E-Commerce' | 'Data & Analytics' | 'DevOps & Security';
  desc: string;
}

const PROJECT_TYPES: { id: ProjectType; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { id: 'Web Platform', label: 'Web Platform (Next.js 16)', icon: Globe, desc: 'High-speed modern web applications with App Router' },
  { id: 'Mobile App', label: 'Mobile App (iOS/Android)', icon: Smartphone, desc: 'Cross-platform native experiences with React Native' },
  { id: 'Business Website', label: 'Business Website', icon: Building2, desc: 'Corporate websites with CMS, SEO, & brand identity' },
  { id: 'E-commerce', label: 'E-commerce Store', icon: ShoppingCart, desc: 'Scalable online shops with payment gateways & inventory' },
  { id: 'SaaS Platform', label: 'SaaS Platform', icon: Zap, desc: 'Multi-tenant subscription software with billing & admin' },
  { id: 'ERP / CRM System', label: 'ERP / CRM System', icon: Database, desc: 'Internal workflow, client data & resource management' },
  { id: 'AI & Cloud System', label: 'AI & Cloud System', icon: Cpu, desc: 'Gemini AI integration, vector search & LLM pipelines' },
  { id: 'API & Backend Engine', label: 'API & Backend Engine', icon: Server, desc: 'Microservices, REST/GraphQL APIs, & database backends' },
  { id: 'Enterprise Full-Stack', label: 'Enterprise Full-Stack', icon: Code2, desc: 'Mission-critical enterprise solutions with high availability' },
  { id: 'Design System & UI', label: 'Design System & UI', icon: Layers, desc: 'Reusable component libraries & visual design systems' }
];

const AVAILABLE_FEATURES: FeatureOption[] = [
  // Core
  { id: 'auth', label: 'Authentication & RBAC', category: 'Core', desc: 'User login, multi-factor auth, & role-based access' },
  { id: 'user-profile', label: 'User Profiles & Settings', category: 'Core', desc: 'Account management, avatar upload & preferences' },
  { id: 'notifications', label: 'In-App & Email Alerts', category: 'Core', desc: 'Automated notification dispatch & user activity feed' },
  
  // Frontend
  { id: 'next16', label: 'Next.js 16 App Router UI', category: 'Frontend', desc: 'Server Components, zero-flicker state & streaming' },
  { id: 'motion-ui', label: 'Motion & Interactive Design', category: 'Frontend', desc: 'Fluid animations, dark theme & responsive layouts' },
  { id: 'cms-integration', label: 'Headless CMS Integration', category: 'Frontend', desc: 'Sanity, Contentful, or Strapi dynamic content editing' },
  
  // Mobile
  { id: 'cross-platform', label: 'React Native Mobile App', category: 'Mobile', desc: 'iOS & Android app binaries with shared codebase' },
  { id: 'push-notifications', label: 'Mobile Push Notifications', category: 'Mobile', desc: 'FCM / APNS device push notifications setup' },
  { id: 'offline-sync', label: 'Offline Data Sync', category: 'Mobile', desc: 'Local storage caching with background server sync' },
  
  // AI & ML
  { id: 'gemini-ai', label: 'Gemini 3.6 Flash Integration', category: 'AI & ML', desc: 'AI content generation, automated analysis & chat' },
  { id: 'rag-vector', label: 'Vector Search & Knowledge Base', category: 'AI & ML', desc: 'Document indexing with RAG & embeddings search' },
  { id: 'ai-agents', label: 'Autonomous AI Workflows', category: 'AI & ML', desc: 'Multi-step AI task automation & smart assistants' },

  // Backend & DB
  { id: 'postgres-db', label: 'PostgreSQL / Firestore DB', category: 'Backend & DB', desc: 'Relational or document database schema & migrations' },
  { id: 'rest-graphql', label: 'REST & GraphQL API Routes', category: 'Backend & DB', desc: 'Secure backend API endpoints with validation' },
  { id: 'realtime-ws', label: 'Real-Time WebSockets', category: 'Backend & DB', desc: 'Live data streaming, collaboration & instant sync' },

  // E-Commerce
  { id: 'stripe-payments', label: 'Stripe Payment Gateway', category: 'E-Commerce', desc: 'Credit card checkout, invoices & subscriptions' },
  { id: 'cart-checkout', label: 'Smart Cart & Checkout', category: 'E-Commerce', desc: 'Shopping cart, promo codes, & tax calculations' },
  { id: 'inventory-mgmt', label: 'Inventory & Order Tracking', category: 'E-Commerce', desc: 'Stock level tracking & order status fulfillment' },

  // Data & Analytics
  { id: 'analytics-dash', label: 'Executive Analytics Dashboard', category: 'Data & Analytics', desc: 'KPI metric charts, revenue trends & usage logs' },
  { id: 'pdf-reporting', label: 'Automated PDF & CSV Exports', category: 'Data & Analytics', desc: 'One-click report generation & data exports' },

  // DevOps & Security
  { id: 'cloud-run', label: 'Cloud Run & Docker CI/CD', category: 'DevOps & Security', desc: 'Automated container deployment & auto-scaling' },
  { id: 'security-audit', label: 'OWASP Security & SSL', category: 'DevOps & Security', desc: 'Encryption at rest/in transit & rate limiting' }
];

export const QuoteGeneratorModal: React.FC<QuoteGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultEmail = ''
}) => {
  if (!isOpen) return null;

  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState(defaultEmail || '');
  const [projectType, setProjectType] = useState<ProjectType>('Web Platform');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Authentication & RBAC',
    'Next.js 16 App Router UI',
    'PostgreSQL / Firestore DB',
    'Cloud Run & Docker CI/CD'
  ]);
  const [targetTimeline, setTargetTimeline] = useState('1-2 months');
  const [budgetRange, setBudgetRange] = useState('$10,000 - $25,000');
  const [projectNotes, setProjectNotes] = useState('');

  // Result State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<ProjectQuotation | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = ['All', 'Core', 'Frontend', 'Mobile', 'AI & ML', 'Backend & DB', 'E-Commerce', 'Data & Analytics', 'DevOps & Security'];

  const filteredFeatures = selectedCategory === 'All' 
    ? AVAILABLE_FEATURES 
    : AVAILABLE_FEATURES.filter(f => f.category === selectedCategory);

  const toggleFeature = (label: string) => {
    if (selectedFeatures.includes(label)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== label));
    } else {
      setSelectedFeatures([...selectedFeatures, label]);
    }
  };

  const handleGenerateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !email.trim()) return;

    setIsGenerating(true);
    setGeneratedQuote(null);

    try {
      const res = await fetch('/api/quote/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          companyName,
          email,
          projectType,
          selectedFeatures,
          targetTimeline,
          budgetRange,
          projectNotes
        })
      });

      const data = await res.json();
      if (data.status === 'success' && data.quotation) {
        setGeneratedQuote(data.quotation);
      } else {
        // Fallback local calculation
        const localQuote = calculateLocalQuotation();
        setGeneratedQuote(localQuote);
      }
    } catch (e) {
      console.error("Failed to generate quotation via API, using local estimator:", e);
      const localQuote = calculateLocalQuotation();
      setGeneratedQuote(localQuote);
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateLocalQuotation = (): ProjectQuotation => {
    const quoteCode = `QT-${new Date().getFullYear()}-MLZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const baseRate = 100; // $100/hr
    
    // Estimate hours based on selected features
    const featureCount = selectedFeatures.length;
    const baseHours = projectType === 'Enterprise Full-Stack' ? 120 : projectType === 'SaaS Platform' ? 90 : 60;
    const totalHours = baseHours + (featureCount * 12);

    const minPrice = Math.round(totalHours * baseRate * 0.9 / 500) * 500;
    const maxPrice = Math.round(totalHours * baseRate * 1.3 / 500) * 500;

    const itemized = [
      {
        moduleName: `${projectType} Architecture & Design System`,
        description: `Production-ready Next.js 16 App Router scaffolding, Millerz design token system, and layout responsiveness.`,
        estimatedHours: Math.round(totalHours * 0.3),
        cost: Math.round(totalHours * 0.3 * baseRate)
      },
      {
        moduleName: `Selected Functional Modules (${selectedFeatures.slice(0, 3).join(', ')})`,
        description: `Implementation of requested business logic, security rules, and data integrations.`,
        estimatedHours: Math.round(totalHours * 0.5),
        cost: Math.round(totalHours * 0.5 * baseRate)
      },
      {
        moduleName: `QA, Security Audit & Cloud Containerization`,
        description: `Comprehensive testing, security policy hardening, and Cloud Run deployment pipeline setup.`,
        estimatedHours: Math.round(totalHours * 0.2),
        cost: Math.round(totalHours * 0.2 * baseRate)
      }
    ];

    return {
      quotationId: quoteCode,
      clientName: clientName || 'Client',
      companyName: companyName || '',
      email,
      projectType,
      features: selectedFeatures,
      targetTimeline,
      estimatedPriceRange: {
        min: minPrice,
        max: maxPrice,
        currency: 'USD'
      },
      itemizedScope: itemized,
      architectureProposal: `A state-of-the-art ${projectType} engineered by Millerz Technologies using Next.js 16, React 19, TypeScript, and Tailwind CSS. Built for zero-cold-start performance, sub-10ms API route proxying, and containerized Cloud Run hosting.`,
      recommendedTechStack: ['Next.js 16 App Router', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Gemini 3.6 AI Engine', 'Cloud Run Container'],
      deliveryMilestones: [
        { phase: 'Phase 1: Architecture Specs & UI Wireframes', weeks: 1, deliverables: 'Technical roadmap, database schema, and high-fidelity prototype.' },
        { phase: 'Phase 2: Full-Stack Engineering & Feature Integration', weeks: 3, deliverables: 'Fully functional application with API handlers & state management.' },
        { phase: 'Phase 3: QA Audit & Cloud Run Production Launch', weeks: 1, deliverables: 'Live domain deployment, security hardening, and source handover.' }
      ],
      generatedAt: new Date().toISOString(),
      validityDays: 30,
      status: 'submitted'
    };
  };

  const handleCopyProposal = () => {
    if (!generatedQuote) return;
    const text = `======================================================\n` +
      `MILLERZ TECHNOLOGIES - OFFICIAL TECHNICAL QUOTATION\n` +
      `======================================================\n` +
      `Quotation Ref: ${generatedQuote.quotationId}\n` +
      `Client: ${generatedQuote.clientName} (${generatedQuote.companyName || 'Individual'})\n` +
      `Contact Email: ${generatedQuote.email}\n` +
      `Project Classification: ${generatedQuote.projectType}\n` +
      `Estimated Price Range: $${generatedQuote.estimatedPriceRange.min.toLocaleString()} - $${generatedQuote.estimatedPriceRange.max.toLocaleString()} USD\n` +
      `Target Delivery: ${generatedQuote.targetTimeline}\n` +
      `Quote Validity: ${generatedQuote.validityDays} Days\n\n` +
      `------------------------------------------------------\n` +
      `TECHNICAL ARCHITECTURE PROPOSAL:\n` +
      `------------------------------------------------------\n` +
      `${generatedQuote.architectureProposal}\n\n` +
      `Recommended Tech Stack: ${generatedQuote.recommendedTechStack.join(', ')}\n\n` +
      `------------------------------------------------------\n` +
      `ITEMIZED SCOPE BREAKDOWN:\n` +
      `------------------------------------------------------\n` +
      generatedQuote.itemizedScope.map(i => `- ${i.moduleName} (~${i.estimatedHours} hrs): $${i.cost.toLocaleString()}\n  ${i.description}`).join('\n\n') + `\n\n` +
      `------------------------------------------------------\n` +
      `DELIVERY MILESTONES:\n` +
      `------------------------------------------------------\n` +
      generatedQuote.deliveryMilestones.map(m => `- ${m.phase} (${m.weeks} wk): ${m.deliverables}`).join('\n') + `\n\n` +
      `Generated by Millerz Technologies Engineering (contact@millerz.tech)`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handlePrintProposal = () => {
    window.print();
  };

  const handleDownloadText = () => {
    if (!generatedQuote) return;
    const text = `MILLERZ TECHNOLOGIES PROJECT QUOTATION\nRef: ${generatedQuote.quotationId}\nClient: ${generatedQuote.clientName}\nPrice Range: $${generatedQuote.estimatedPriceRange.min.toLocaleString()} - $${generatedQuote.estimatedPriceRange.max.toLocaleString()} USD\nTimeline: ${generatedQuote.targetTimeline}\n\nArchitecture:\n${generatedQuote.architectureProposal}`;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Millerz-Quote-${generatedQuote.quotationId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-next-enter">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0B0E0C] border border-[#212E25] rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header with Millerz Logo */}
        <div className="px-6 py-4 border-b border-[#212E25] bg-[#131A15] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <MillerzLogo size="sm" />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-emerald-900/60 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-[#25432D] text-[#C29845] font-bold">
                INSTANT QUOTATION ENGINE
              </span>
              <span className="text-gray-400 font-mono text-[10px]">
                Powered by Millerz AI Architecture
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#1C261F] border border-[#2B3B30] text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6 print:p-0 print:overflow-visible">
          
          {!generatedQuote && !isGenerating && (
            /* STEP 1: FORM INPUTS */
            <form onSubmit={handleGenerateQuote} className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#16251A] via-[#1A1813] to-[#1F1713] border border-[#2D5237] space-y-2">
                <div className="flex items-center gap-2 text-[#C29845] font-mono font-bold text-sm">
                  <Calculator className="w-4 h-4 text-[#E06332]" />
                  <span>Get an Instant Technical Proposal & Cost Estimate</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed font-sans">
                  Select your application classification and desired capabilities. Millerz Technologies AI Architect will instantly analyze your requirements, compute itemized engineering hours, and formulate a phased project proposal.
                </p>
              </div>

              {/* Client Information */}
              <div className="space-y-2">
                <label className="font-mono text-gray-300 font-bold uppercase tracking-wider text-[11px] block">
                  1. Client & Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-gray-400 text-[10px] flex items-center gap-1">
                      <User className="w-3 h-3 text-[#E06332]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alex Miller"
                      className="w-full bg-[#131A15] border border-[#212E25] rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E06332]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-gray-400 text-[10px] flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-[#C29845]" />
                      <span>Company / Organization</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Millerz Tech Partner"
                      className="w-full bg-[#131A15] border border-[#212E25] rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C29845]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-gray-400 text-[10px] flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#345D3F]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@millerz.tech"
                      className="w-full bg-[#131A15] border border-[#212E25] rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#345D3F]"
                    />
                  </div>
                </div>
              </div>

              {/* Project Classification Grid */}
              <div className="space-y-2">
                <label className="font-mono text-gray-300 font-bold uppercase tracking-wider text-[11px] block">
                  2. Select Software Architecture / Project Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PROJECT_TYPES.map((pt) => {
                    const IconComp = pt.icon;
                    const isSelected = projectType === pt.id;
                    return (
                      <button
                        type="button"
                        key={pt.id}
                        onClick={() => setProjectType(pt.id)}
                        className={`p-3 rounded-xl font-mono text-left transition flex flex-col justify-between border ${
                          isSelected 
                            ? 'bg-[#25432D] border-[#C85223] text-white font-bold shadow-lg shadow-[#C85223]/20' 
                            : 'bg-[#131A15] border-[#212E25] text-gray-400 hover:text-gray-200 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <IconComp className={`w-4 h-4 ${isSelected ? 'text-[#C85223]' : 'text-gray-500'}`} />
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#C29845]" />}
                        </div>
                        <div className="mt-2">
                          <span className="text-xs block font-bold leading-tight">{pt.label}</span>
                          <span className="text-[9px] text-gray-500 font-sans block mt-0.5 line-clamp-1">{pt.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feature Checklist Category Tabs */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="font-mono text-gray-300 font-bold uppercase tracking-wider text-[11px]">
                    3. Select Features & Capabilities ({selectedFeatures.length} selected)
                  </label>
                  
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[10px] whitespace-nowrap transition ${
                          selectedCategory === cat 
                            ? 'bg-[#25432D] text-[#C29845] font-bold border border-[#345D3F]' 
                            : 'bg-[#131A15] text-gray-400 hover:text-gray-200 border border-transparent'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1 bg-[#0D120E] rounded-2xl border border-[#1C261F]">
                  {filteredFeatures.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat.label);
                    return (
                      <button
                        type="button"
                        key={feat.id}
                        onClick={() => toggleFeature(feat.label)}
                        className={`p-2.5 rounded-xl font-mono text-xs border text-left transition flex items-start justify-between gap-2 ${
                          isSelected 
                            ? 'bg-[#1D2B20] border-[#345D3F] text-[#C29845] font-semibold' 
                            : 'bg-[#131A15] border-[#212E25] text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        <div>
                          <span className="block font-bold text-white text-[11px]">{feat.label}</span>
                          <span className="block text-[9px] text-gray-400 font-sans mt-0.5">{feat.desc}</span>
                        </div>
                        {isSelected ? (
                          <Check className="w-4 h-4 text-[#E06332] shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-gray-700 shrink-0 mt-0.5"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-mono text-gray-300 font-bold uppercase tracking-wider text-[11px] block">
                    4. Target Delivery Timeline
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['2-4 weeks', '1-2 months', '3-6 months'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTargetTimeline(t)}
                        className={`py-2 rounded-xl font-mono text-xs border transition ${
                          targetTimeline === t 
                            ? 'bg-[#C85223]/20 border-[#C85223] text-[#E06332] font-bold' 
                            : 'bg-[#131A15] border-[#212E25] text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-gray-300 font-bold uppercase tracking-wider text-[11px] block">
                    5. Budget Parameter Bracket
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-[#131A15] border border-[#212E25] rounded-xl py-2 px-3 text-xs text-white font-mono focus:outline-none focus:border-[#C29845]"
                  >
                    <option value="$5,000 - $10,000">$5,000 - $10,000 USD (Starter MVP)</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000 USD (Standard Production)</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000 USD (Enterprise Scale)</option>
                    <option value="$50,000+">$50,000+ USD (Custom Architecture)</option>
                  </select>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="space-y-1">
                <label className="font-mono text-gray-300 font-bold uppercase tracking-wider text-[11px] block">
                  6. Additional Notes / Special Architectural Requests
                </label>
                <textarea
                  rows={2}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="e.g. Needs high availability PostgreSQL backend, smooth motion transitions, and Stripe automated billing integration..."
                  className="w-full bg-[#131A15] border border-[#212E25] rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C85223]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25432D] via-[#C85223] to-[#A88238] hover:opacity-95 text-white font-mono font-bold text-xs shadow-xl shadow-[#C85223]/20 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Generate Official Millerz AI Proposal & Costing</span>
              </button>

            </form>
          )}

          {/* STEP 2: GENERATING ANIMATION */}
          {isGenerating && (
            <div className="py-24 text-center space-y-4 animate-next-enter">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#25432D] via-[#C85223] to-[#A88238] animate-spin opacity-80 blur-sm"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-[#0B0E0C] border border-[#212E25] flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-[#E06332] animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="font-mono font-bold text-white text-base">
                  Synthesizing Millerz AI Technical Proposal...
                </h4>
                <p className="text-gray-400 text-xs mt-1">
                  Computing scope hours, technical architecture diagram, and milestone schedules.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: RESULT PRESENTATION */}
          {generatedQuote && !isGenerating && (
            <div className="space-y-6 animate-next-enter print:text-black print:bg-white">
              
              {/* Proposal Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1C2C20] via-[#2A1811] to-[#241D10] border border-[#C85223]/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#212E25] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29845]">
                      OFFICIAL QUOTATION CODE
                    </span>
                    <h3 className="font-mono font-black text-xl text-white">
                      {generatedQuote.quotationId}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      ESTIMATED INVESTMENT RANGE
                    </span>
                    <div className="font-mono font-extrabold text-lg text-[#E06332]">
                      ${generatedQuote.estimatedPriceRange.min.toLocaleString()} – ${generatedQuote.estimatedPriceRange.max.toLocaleString()} USD
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-gray-500 block">CLIENT</span>
                    <span className="text-gray-200 font-bold">{generatedQuote.clientName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">PROJECT TYPE</span>
                    <span className="text-gray-200 font-bold">{generatedQuote.projectType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">TARGET TIMELINE</span>
                    <span className="text-gray-200 font-bold">{generatedQuote.targetTimeline}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">PROPOSAL VALIDITY</span>
                    <span className="text-emerald-400 font-bold">{generatedQuote.validityDays} Days</span>
                  </div>
                </div>
              </div>

              {/* Architecture Blueprint */}
              <div className="p-4 rounded-2xl bg-[#131A15] border border-[#212E25] space-y-2">
                <div className="flex items-center gap-2 font-mono font-bold text-white uppercase tracking-wider text-[11px]">
                  <Layers className="w-4 h-4 text-[#345D3F]" />
                  <span>Technical Architecture Blueprint</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed font-sans">
                  {generatedQuote.architectureProposal}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {generatedQuote.recommendedTechStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-lg bg-[#1C2A20] border border-[#2B4732] text-[#C29845] font-mono text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Itemized Scope Breakdown */}
              <div className="space-y-3">
                <h4 className="font-mono font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E06332]" />
                  <span>Itemized Module & Cost Breakdown</span>
                </h4>
                <div className="space-y-2">
                  {generatedQuote.itemizedScope.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#131A15] border border-[#212E25] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-mono font-bold text-white text-xs">{item.moduleName}</span>
                        <p className="text-[#9CA3AF] text-[11px] font-sans mt-0.5">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                        <span className="text-gray-400">{item.estimatedHours} hrs</span>
                        <span className="text-[#E06332] font-bold">${item.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phased Delivery Milestones */}
              <div className="space-y-3">
                <h4 className="font-mono font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C29845]" />
                  <span>Phased Delivery Milestones</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {generatedQuote.deliveryMilestones.map((ms, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#131A15] border border-[#212E25] space-y-1">
                      <span className="font-mono font-bold text-[#C29845] text-[11px] block">{ms.phase}</span>
                      <span className="text-gray-400 text-[10px] font-mono block">Estimated duration: {ms.weeks} week(s)</span>
                      <p className="text-gray-300 text-[11px] font-sans">{ms.deliverables}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer inside modal */}
              <div className="pt-4 border-t border-[#212E25] flex flex-wrap items-center justify-between gap-3 print:hidden">
                <button
                  type="button"
                  onClick={() => setGeneratedQuote(null)}
                  className="px-4 py-2 rounded-xl bg-[#1C261F] border border-[#2B3B30] text-gray-300 font-mono text-xs hover:text-white"
                >
                  Edit Requirement Parameters
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrintProposal}
                    className="px-3 py-2 rounded-xl bg-[#1C261F] border border-[#2B3B30] text-gray-300 hover:text-white font-mono text-xs flex items-center gap-1.5"
                    title="Print Proposal"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadText}
                    className="px-3 py-2 rounded-xl bg-[#1C261F] border border-[#2B3B30] text-gray-300 hover:text-white font-mono text-xs flex items-center gap-1.5"
                    title="Download Text Document"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyProposal}
                    className="px-4 py-2 rounded-xl bg-[#25432D] hover:bg-[#345D3F] text-white font-mono text-xs font-bold transition flex items-center gap-1.5"
                  >
                    {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSuccess ? 'Copied!' : 'Copy Proposal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedSuccess(true);
                      setTimeout(() => setSubmittedSuccess(false), 3000);
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C85223] to-[#E06332] hover:opacity-90 text-white font-mono text-xs font-bold shadow-lg shadow-[#C85223]/20 transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittedSuccess ? 'Submitted to Sales!' : 'Submit to Millerz Technologies'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
