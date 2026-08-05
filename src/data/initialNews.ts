import { NewsArticle, MillerzProject } from '../types';

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'React 19.1 & Server Actions v2: Benchmark Analysis on Edge Runtimes',
    summary: 'Detailed performance benchmark of React 19.1 Server Actions running on Vercel, Cloudflare Workers, and Millerz Edge Containers.',
    fullContent: `The React team has released React 19.1 alongside Server Actions v2. Key improvements include 40% lower hydration overhead, automatic streaming mutation retries, and native support for WebAssembly streaming bindings. At Millerz, our benchmarks show full-stack apps loading 220ms faster on cold starts when leveraging zero-bundle server components paired with edge caching.`,
    category: 'web-dev',
    source: {
      name: 'Millerz Engineering Blog',
      url: 'https://millerz.dev/blog/react-19-server-actions-v2',
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=60&h=60&fit=crop'
    },
    publishedAt: '12 minutes ago',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    author: 'Alex Vance, Chief Tech Lead @ Millerz',
    isBreaking: true,
    isTrending: true,
    millerzTake: 'We have updated all Millerz web client boilerplates to React 19.1. We recommend migrating legacy hydration boundaries immediately.',
    techTags: ['React 19', 'Server Actions', 'Web Vitals', 'Edge Computing', 'TypeScript'],
    impactScore: 96,
    sentiment: 'bullish',
    aiSummary: {
      executiveSummary: 'React 19.1 introduces Server Actions v2 with 40% less hydration overhead and WASM edge runtime compatibility.',
      keyTakeaways: [
        'Hydration time reduced by up to 40% on mobile processors.',
        'Automatic retry mechanisms for streaming server action responses.',
        'Full WebAssembly integration directly within server actions.'
      ],
      impactAnalysis: 'Critical update for enterprise Web apps. Upgrading reduces First Input Delay (FID) and Interaction to Next Paint (INP) across low-power mobile browsers.',
      codeSnippetOrAction: 'npm update react react-dom --save-exact',
      millerzRecommendation: 'Adopt React 19.1 Server Actions for form submissions and dynamic API proxies in your Millerz projects.'
    },
    viewsCount: 3420,
    likesCount: 284
  },
  {
    id: 'news-2',
    title: 'Flutter 3.28 vs React Native 0.78: The 2026 Mobile Architecture Battle',
    summary: 'A comprehensive cross-platform mobile comparison evaluating Impeller graphics rendering, native Swift/Kotlin interop, and app binary sizes.',
    fullContent: `Choosing between Flutter and React Native in 2026 comes down to graphics performance vs native module interop. Flutter 3.28 with Impeller 2 achieves steady 120fps on ProMotion displays, while React Native 0.78 brings dynamic Hermes multi-threading. Millerz mobile engineers test both in real-world production environments.`,
    category: 'mobile',
    source: {
      name: 'Mobile Arch Digest',
      url: 'https://mobilearch.io/2026-flutter-reactnative',
      logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop'
    },
    publishedAt: '45 minutes ago',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    author: 'Elena Rostova, Lead Mobile Architect',
    isBreaking: false,
    isTrending: true,
    millerzTake: 'For fintech & banking apps requiring strict native security SDKs, React Native leads. For rich 3D UI & hardware acceleration, Flutter 3.28 wins.',
    techTags: ['Flutter', 'React Native', 'iOS 19', 'Android 16', 'Mobile UX'],
    impactScore: 92,
    sentiment: 'emerging',
    aiSummary: {
      executiveSummary: 'Comparison of 2026 mobile frameworks shows Impeller 2 delivering 120fps UI rendering while React Native 0.78 boosts multi-threaded Hermes performance.',
      keyTakeaways: [
        'Flutter Impeller rendering engine eliminates shader compilation jank entirely.',
        'React Native New Architecture provides seamless synchronous C++ bindings.',
        'App bundle size gap narrowed to under 1.8MB difference.'
      ],
      impactAnalysis: 'Mobile engineering teams must align framework selection with native API depth vs custom graphics requirements.',
      millerzRecommendation: 'Consult the Millerz Mobile Strategy Checklist before finalizing framework choice for client apps.'
    },
    viewsCount: 2190,
    likesCount: 195
  },
  {
    id: 'news-3',
    title: 'Millerz Unveils "Quantum-UI": High-Density Dark Mode System for Software Platforms',
    summary: 'Millerz Design Studio drops Quantum-UI, an open-source design language built specifically for high-frequency trading, IDEs, and developer tools.',
    fullContent: `Millerz is proud to announce Quantum-UI — our internal dark mode design system engineered for maximum legibility, zero eye fatigue, and sub-12% background contrast math. Designed around OLED deep blacks (#0B0F17) and subtle cyan glow tokens (#00E5FF), Quantum-UI provides 4.8:1 WCAG AAA compliance across all state badges and code blocks.`,
    category: 'millerz-insights',
    source: {
      name: 'Millerz Newsroom',
      url: 'https://millerz.dev/news/quantum-ui-announcement',
      logo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=60&h=60&fit=crop'
    },
    publishedAt: '1 hour ago',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    author: 'Marcus Miller, Founder & CEO @ Millerz',
    isBreaking: true,
    isTrending: true,
    millerzTake: 'Quantum-UI is now live across all Millerz client dashboards and news aggregators!',
    techTags: ['Design System', 'Dark Mode', 'UI/UX', 'Millerz Core', 'Tailwind CSS'],
    impactScore: 98,
    sentiment: 'crucial',
    aiSummary: {
      executiveSummary: 'Millerz releases Quantum-UI design framework optimized for developer dashboards and complex software interfaces with WCAG AAA dark contrast.',
      keyTakeaways: [
        'OLED deep black palette with sub-12% contrast steps to prevent eye strain.',
        'Built-in support for fluid grid layouts, micro-interactions, and live status pills.',
        'Fully integrated with Tailwind CSS v4 and CSS container queries.'
      ],
      impactAnalysis: 'Sets a new benchmark for dark-mode developer tools, combining aesthetic luxury with mathematically precise visual hierarchy.',
      millerzRecommendation: 'Use Quantum-UI variables in all dark mode UI builds for Millerz clients.'
    },
    viewsCount: 4890,
    likesCount: 512
  },
  {
    id: 'news-4',
    title: 'Gemini 3.6 Flash Releases: 1 Million Token Context with Real-time Multimodal Grounding',
    summary: 'Google Cloud debuts Gemini 3.6 Flash with 3x faster inference speeds and native code synthesis for enterprise software pipelines.',
    fullContent: `The latest Gemini 3.6 Flash update provides developer teams with instantaneous JSON schema validation, agentic function calling, and live search grounding. At Millerz, we integrated Gemini 3.6 Flash directly into our server-side news intelligence pipeline, enabling automatic summary generation in under 400 milliseconds.`,
    category: 'ai-cloud',
    source: {
      name: 'AI Weekly Review',
      url: 'https://aiweekly.io/gemini-3-6-flash-launch',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&h=60&fit=crop'
    },
    publishedAt: '2 hours ago',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&q=80',
    author: 'Dr. Sarah Chen, Head of AI Research',
    isBreaking: false,
    isTrending: true,
    millerzTake: 'We leverage Gemini 3.6 Flash server-side across all Millerz AI integrations for reliable structured outputs.',
    techTags: ['Gemini 3.6', 'Generative AI', 'Cloud Infrastructure', 'LLM', 'Developer Tools'],
    impactScore: 95,
    sentiment: 'bullish',
    aiSummary: {
      executiveSummary: 'Gemini 3.6 Flash offers ultra-fast inference, 1M context window, and native function execution for backend AI applications.',
      keyTakeaways: [
        '3x faster token generation compared to previous flash models.',
        'Enhanced structured JSON mode with exact TypeScript schema validation.',
        'Direct search grounding with low latency.'
      ],
      impactAnalysis: 'Game changer for full-stack web applications needing real-time AI summarization and autonomous background tasks.',
      millerzRecommendation: 'Standardize on @google/genai SDK with gemini-3.6-flash for server-side AI features.'
    },
    viewsCount: 3100,
    likesCount: 340
  },
  {
    id: 'news-5',
    title: 'WebGPU 2.0 Specification Standardized: Next-Gen 3D Graphics in the Browser',
    summary: 'W3C completes WebGPU 2.0 standard, unlocking ray-tracing capabilities and direct compute shaders inside web applications.',
    fullContent: `WebGPU 2.0 is officially supported across Chrome, Safari, and Firefox. Developers can now run real-time hardware-accelerated ray tracing, physical fluid simulations, and local LLM tensor math directly inside standard WebGL/WebGPU canvas viewports without native plugins.`,
    category: 'web-dev',
    source: {
      name: 'Web Standards Today',
      url: 'https://webstandards.org/webgpu-2-0',
      logo: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=60&h=60&fit=crop'
    },
    publishedAt: '3 hours ago',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    author: 'David Wright, Graphics Specialist',
    isBreaking: false,
    isTrending: false,
    millerzTake: 'Unlocks massive opportunities for interactive product configurators and browser-based 3D software built by Millerz.',
    techTags: ['WebGPU', 'Shaders', 'Canvas 3D', 'Browser Tech', 'Performance'],
    impactScore: 88,
    sentiment: 'bullish',
    aiSummary: {
      executiveSummary: 'WebGPU 2.0 brings ray tracing and compute shaders to all major browsers natively.',
      keyTakeaways: [
        'Hardware ray tracing supported via WGSL compute shaders.',
        'Zero-copy memory sharing with WebAssembly.',
        'Cross-browser parity across Windows, macOS, Linux, and iOS.'
      ],
      impactAnalysis: 'Enables desktop-grade 3D software rendering in browser tabs.',
      millerzRecommendation: 'Explore WebGPU for interactive 3D client showcases.'
    },
    viewsCount: 1850,
    likesCount: 142
  },
  {
    id: 'news-6',
    title: 'Micro-Frontend Architectures in 2026: Module Federation v2 vs Isolated Edge Pods',
    summary: 'How enterprise software teams are breaking monolithic web applications into resilient, independently deployed edge micro-frontends.',
    fullContent: `Monolith vs Micro-Frontend continues to evolve. Module Federation v2 with dynamic remote loading allows separate engineering teams to ship features independently while maintaining shared state through light event buses. Millerz architects analyze risk mitigation strategies for large-scale enterprise portals.`,
    category: 'software',
    source: {
      name: 'Software Engineering Quarterly',
      url: 'https://seq.tech/micro-frontends-2026',
      logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=60&h=60&fit=crop'
    },
    publishedAt: '5 hours ago',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    author: 'Viktor Krum, Principal Software Architect',
    isBreaking: false,
    isTrending: false,
    millerzTake: 'Avoid premature micro-frontend splitting unless team size exceeds 15+ dedicated engineers. Domain-driven modular monoliths remain optimal for most applications.',
    techTags: ['Micro-Frontends', 'Software Architecture', 'Module Federation', 'DevOps', 'CI/CD'],
    impactScore: 84,
    sentiment: 'neutral',
    aiSummary: {
      executiveSummary: 'Analysis of Module Federation v2 vs Edge Pods for enterprise software modularization.',
      keyTakeaways: [
        'Module Federation v2 reduces dynamic asset loading latency by 60%.',
        'Edge Pod isolation prevents cascading script failures.',
        'Requires automated E2E contract testing in deployment pipelines.'
      ],
      impactAnalysis: 'Crucial for multi-team enterprise software projects to prevent dependency lock-in.',
      millerzRecommendation: 'Use Millerz Domain Monolith guidelines before committing to micro-frontends.'
    },
    viewsCount: 1420,
    likesCount: 98
  }
];

export const MILLERZ_PROJECTS: MillerzProject[] = [
  {
    id: 'proj-1',
    title: 'AuraPay Mobile Fintech',
    tagline: 'Next-Gen Cross-Border Payments App',
    description: 'High-speed mobile payments platform with biometrics, instant FX conversions, and dynamic dark mode interface built by Millerz.',
    techStack: ['React Native', 'TypeScript', 'Node.js', 'Biometrics', 'Millerz Quantum-UI'],
    type: 'Mobile App',
    metrics: '2.4M active users | 99.99% uptime | <80ms transaction speed',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    featuredArticleId: 'news-2'
  },
  {
    id: 'proj-2',
    title: 'Nexus Cloud Analytics Portal',
    tagline: 'Enterprise AI Telemetry Dashboard',
    description: 'Real-time server & software telemetry portal handling 100,000 requests per second with AI anomaly detection.',
    techStack: ['React 19', 'Tailwind CSS v4', 'Gemini AI', 'WebSockets', 'Express'],
    type: 'Web Platform',
    metrics: '100k events/sec | Sub-10ms render latency | 100% WCAG AAA dark contrast',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    featuredArticleId: 'news-1'
  },
  {
    id: 'proj-3',
    title: 'Veloce 3D Car Configurator',
    tagline: 'Hyper-Realistic WebGPU Automotive Experience',
    description: 'Web-based 3D vehicle customization platform running ray-traced reflections in real-time browser viewports.',
    techStack: ['WebGPU 2.0', 'Three.js', 'WASM', 'React', 'Millerz Core'],
    type: 'Design System',
    metrics: '120 FPS rendering | Zero plugin install | 4K HDR export',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    featuredArticleId: 'news-5'
  }
];
