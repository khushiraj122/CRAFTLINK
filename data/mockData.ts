import { 
  FreelancerProfile, 
  ClientProfile, 
  User, 
  HiringRequest, 
  Conversation, 
  Message, 
  AppNotification, 
  AdminReport, 
  VerificationRequest, 
  CategoryInfo 
} from '../types';

export const INITIAL_CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-1',
    name: 'Video & Film Editing',
    slug: 'video_editing',
    iconName: 'Film',
    tagline: 'High-retention YouTube editors, documentary cuts, commercial reels & short-form specialists.',
    freelancersCount: 148,
    avgHourlyRate: 65,
    popularSkills: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design', 'Color Grading', 'CapCut Pro', 'Storyboarding'],
    gradient: 'from-amber-600 to-orange-700'
  },
  {
    id: 'cat-2',
    name: 'Motion Graphics & VFX',
    slug: 'motion_graphics',
    iconName: 'Sparkles',
    tagline: 'Kinetic typography, 3D broadcast packages, explainer animations & title sequences.',
    freelancersCount: 94,
    avgHourlyRate: 85,
    popularSkills: ['After Effects', 'Cinema 4D', 'Blender', 'Rive', 'Lottie', 'Octane Render'],
    gradient: 'from-orange-600 to-rose-700'
  },
  {
    id: 'cat-3',
    name: 'Full-Stack Web Development',
    slug: 'web_development',
    iconName: 'Code2',
    tagline: 'Modern, high-speed web apps with React, Next.js, Node, TypeScript, and clean cloud architecture.',
    freelancersCount: 230,
    avgHourlyRate: 110,
    popularSkills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GraphQL'],
    gradient: 'from-stone-800 to-stone-950'
  },
  {
    id: 'cat-4',
    name: 'UI/UX & Creative Engineering',
    slug: 'ui_ux_design',
    iconName: 'Palette',
    tagline: 'Pixel-perfect digital products, design systems, micro-interactions & tactile interfaces.',
    freelancersCount: 112,
    avgHourlyRate: 90,
    popularSkills: ['Figma', 'Design Systems', 'Framer Motion', 'Tailwind', 'Prototyping', 'User Research'],
    gradient: 'from-amber-700 to-neutral-900'
  },
  {
    id: 'cat-5',
    name: 'Mobile App Engineering',
    slug: 'mobile_development',
    iconName: 'Smartphone',
    tagline: 'Native iOS (Swift) and cross-platform (React Native, Flutter) mobile applications.',
    freelancersCount: 88,
    avgHourlyRate: 95,
    popularSkills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Store Deploy'],
    gradient: 'from-neutral-800 to-amber-900'
  },
  {
    id: 'cat-6',
    name: 'AI & Data Engineering',
    slug: 'ai_engineering',
    iconName: 'Cpu',
    tagline: 'LLM agents, vector search, custom AI model pipelines & automated intelligent workflows.',
    freelancersCount: 65,
    avgHourlyRate: 135,
    popularSkills: ['Python', 'LangChain', 'OpenAI / Gemini', 'Pinecone', 'FastAPI', 'PyTorch'],
    gradient: 'from-stone-900 to-orange-950'
  }
];

export const CATEGORIES = INITIAL_CATEGORIES.map(c => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  description: c.tagline,
  freelancerCount: c.freelancersCount,
  averageRate: `$${c.avgHourlyRate}/hr`
}));

export const INITIAL_FREELANCERS: FreelancerProfile[] = [
  {
    id: 'fl-1',
    userId: 'usr-fl-1',
    name: 'Julian Ross',
    username: 'juliancut',
    email: 'julian.ross@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80',
    profession: 'Senior YouTube & Commercial Video Editor',
    primaryCategory: 'video_editing',
    bio: 'Pacing master with 8+ years crafting 50M+ view documentaries, high-retention creator content, and cinematic brand launch commercials.',
    aboutStory: 'I specialize in editorial storytelling that captures attention in the first 3 seconds and holds it with nuanced audio design, invisible cuts, and dynamic pacing. Over the past 6 years, I have served as the lead editor for channels like TechHacks (3.2M subs) and directed commercial edits for Nike Running and Nomad Goods.',
    location: 'Berlin, Germany',
    timezone: 'UTC+1 (CET)',
    hourlyRate: 85,
    startingPrice: 350,
    experienceYears: 8,
    rating: 4.96,
    reviewsCount: 47,
    completedProjectsCount: 89,
    onTimeDeliveryRate: 100,
    responseTime: '< 15 mins',
    availability: 'available',
    isVerifiedPro: true,
    isTopRated: true,
    featured: true,
    videoIntroUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    earningsTotal: 48600,
    inEscrow: 1850,
    skills: [
      { name: 'Premiere Pro', level: 'Master', category: 'Video & Motion' },
      { name: 'DaVinci Resolve Color', level: 'Expert', category: 'Video & Motion' },
      { name: 'Sound Design & Mastering', level: 'Expert', category: 'Video & Motion' },
      { name: 'Story Pacing & Retention', level: 'Master', category: 'Video & Motion' },
      { name: 'After Effects Transitions', level: 'Intermediate', category: 'Video & Motion' },
      { name: 'CapCut Short-form', level: 'Expert', category: 'Video & Motion' },
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'The AI Revolution Docuseries (Episode 1)',
        category: 'Documentary',
        mediaType: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
        description: 'Complete 22-minute documentary edit with archival footage research, multi-track atmospheric foley, and dramatic 3-act pacing structure.',
        tags: ['Documentary', 'Retention', 'Sound Design', 'DaVinci'],
        clientName: 'FutureVision Media',
        metrics: '4.2M Organic Views (68% AVD)'
      },
      {
        id: 'port-2',
        title: 'Nomad Goods: Base One Max Launch Film',
        category: 'Commercial',
        mediaType: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
        description: 'Cinematic 60-second commercial showcasing aluminum and glass craftsmanship with custom sound design and bass drops.',
        tags: ['Commercial', 'Hardware', 'Color Grade'],
        clientName: 'Nomad Goods',
        metrics: '+34% Conversions on Landing'
      },
      {
        id: 'port-3',
        title: 'Viral Shorts & Reels Retention Suite (12-pack)',
        category: 'Short Form',
        mediaType: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        description: 'High-octane vertical edits with animated captions, sound effects on every beat, and seamless 0-second loop points.',
        tags: ['Shorts', 'TikTok', 'Motion Captions'],
        clientName: 'CreatorLab Studio',
        metrics: '18M+ Aggregate Views'
      }
    ],
    workExperience: [
      {
        id: 'exp-1',
        role: 'Lead Video Storyteller',
        company: 'Vanguard Media Group',
        location: 'Remote',
        startDate: '2021',
        endDate: 'Present',
        isCurrent: true,
        description: 'Overseeing post-production for 4 flagship YouTube channels and directing color workflows across global shoots.'
      },
      {
        id: 'exp-2',
        role: 'Senior Post-Production Editor',
        company: 'Kinetix Agency',
        location: 'London / Remote',
        startDate: '2018',
        endDate: '2021',
        isCurrent: false,
        description: 'Edited international commercials for consumer electronics and lifestyle brands.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Arts in Film & Digital Media',
        field: 'Post-Production & Cinematography',
        institution: 'Film University Babelsberg',
        startYear: '2014',
        endYear: '2018'
      }
    ],
    pricingPackages: {
      basic: {
        name: 'Basic',
        title: 'Single Short-Form Viral Reel',
        price: 150,
        deliveryTimeDays: 2,
        revisions: 2,
        description: 'One 30-60s vertical video (Reel/TikTok/Short) with dynamic captions, sound design, color grade, and hook optimization.',
        features: ['Up to 60 seconds', 'Custom animated typography', 'Foley & SFX mastering', 'Full HD 1080x1920', 'Color correction']
      },
      standard: {
        name: 'Standard',
        title: 'Full YouTube Long-Form Edit (8-15 min)',
        price: 450,
        deliveryTimeDays: 4,
        revisions: 3,
        description: 'Complete high-retention YouTube episode with multi-cam syncing, graphics, chapters, sound design, and custom thumbnail concept.',
        features: ['8-15 minutes finished video', 'Multi-camera audio sync', 'Custom motion titles & b-roll integration', 'Loudness mastering (-14 LUFS)', 'Export in 4K UHD', '3 Revision Rounds']
      },
      premium: {
        name: 'Premium',
        title: 'Documentary or Commercial Launch Package',
        price: 1200,
        deliveryTimeDays: 7,
        revisions: 'Unlimited',
        description: 'Elite cinematic production with custom color science, original pacing structure, custom motion overlays, and social cuts bundle.',
        features: ['Up to 30 minutes runtime', 'Full cinematic color grading in DaVinci', 'Bespoke sound design & license curation', '3 Social teaser cutdowns included', 'Dedicated project Slack channel', 'Unlimited revisions for 14 days']
      }
    },
    socialLinks: {
      youtube: 'https://youtube.com/@juliancut',
      twitter: 'https://twitter.com/julian_editor',
      linkedin: 'https://linkedin.com/in/julian-ross-film',
      behance: 'https://behance.net/julianross'
    }
  },
  {
    id: 'fl-2',
    userId: 'usr-fl-2',
    name: 'Sasha Kowalski',
    username: 'sashak_dev',
    email: 'sasha@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    profession: 'Principal React / Next.js & Full-Stack Architect',
    primaryCategory: 'web_development',
    bio: 'Crafting performant web platforms with obsessive attention to UI fidelity, type safety, 100/100 Lighthouse scores, and robust backends.',
    aboutStory: 'I bridge the gap between world-class visual design and uncompromising software engineering. Over 9 years I have built SaaS dashboards, payment gateways, and real-time collaborative workspaces. Former staff frontend engineer at FinTech Unicorn, now dedicated to building high-craft applications for ambitious founders.',
    location: 'Zurich, Switzerland',
    timezone: 'UTC+1 (CET)',
    hourlyRate: 130,
    startingPrice: 600,
    experienceYears: 9,
    rating: 5.0,
    reviewsCount: 53,
    completedProjectsCount: 72,
    onTimeDeliveryRate: 99,
    responseTime: '< 30 mins',
    availability: 'available',
    isVerifiedPro: true,
    isTopRated: true,
    featured: true,
    earningsTotal: 84200,
    inEscrow: 3400,
    skills: [
      { name: 'Next.js 15 (App Router)', level: 'Master', category: 'Development' },
      { name: 'TypeScript & Strict Typing', level: 'Master', category: 'Development' },
      { name: 'Tailwind CSS & Radix UI', level: 'Master', category: 'Development' },
      { name: 'Node.js & Express / Nest', level: 'Expert', category: 'Development' },
      { name: 'PostgreSQL & Drizzle / Prisma', level: 'Expert', category: 'Development' },
      { name: 'WebSockets & Realtime State', level: 'Expert', category: 'Development' },
    ],
    portfolio: [
      {
        id: 'port-4',
        title: 'Lumina Cloud — Real-Time Video Collaboration Platform',
        category: 'SaaS Platform',
        mediaType: 'code',
        mediaUrl: 'https://github.com/sashak/lumina-cloud',
        liveUrl: 'https://lumina-demo.craftlink.work',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        description: 'End-to-end full-stack web app featuring canvas annotations, instant WebSocket messaging, role-based access control, and Stripe billing.',
        tags: ['Next.js', 'PostgreSQL', 'WebSockets', 'Tailwind'],
        clientName: 'Lumina Inc',
        metrics: '100/100 Core Web Vitals, 24k MAU'
      },
      {
        id: 'port-5',
        title: 'Artemis Design Engine & Interactive Component System',
        category: 'Design Systems',
        mediaType: 'code',
        mediaUrl: 'https://github.com/sashak/artemis-ui',
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        description: 'A modular, headless accessible component library built with TypeScript, Framer Motion, and Tailwind CSS tokens with zero layout shifts.',
        tags: ['React', 'TypeScript', 'Motion', 'Radix'],
        clientName: 'Artemis Creative',
        metrics: '99.9% Automated Test Coverage'
      },
      {
        id: 'port-6',
        title: 'Vespera AI — Intelligent Codebase Search Engine',
        category: 'AI Application',
        mediaType: 'code',
        mediaUrl: 'https://github.com/sashak/vespera-ai',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        description: 'Vector embeddings pipeline integrating Gemini 2.5 Flash and PostgreSQL pgvector for sub-100ms semantic search over 10M loc.',
        tags: ['AI SDK', 'PostgreSQL', 'Next.js', 'FastAPI'],
        clientName: 'DevStack Labs',
        metrics: 'Sub-90ms Query Latency'
      }
    ],
    workExperience: [
      {
        id: 'exp-3',
        role: 'Staff Frontend Engineer',
        company: 'Apex Financial Technologies',
        location: 'Zurich / Remote',
        startDate: '2020',
        endDate: '2023',
        isCurrent: false,
        description: 'Led architecture for real-time portfolio tracking dashboard managing $4B+ in institutional assets.'
      },
      {
        id: 'exp-4',
        role: 'Senior Full Stack Developer',
        company: 'Studio Monochrome',
        location: 'Berlin',
        startDate: '2016',
        endDate: '2020',
        isCurrent: false,
        description: 'Crafted bespoke digital products and headless eCommerce engines for luxury European brands.'
      }
    ],
    education: [
      {
        id: 'edu-2',
        degree: 'Master of Science in Computer Science',
        field: 'Software Architecture & Distributed Systems',
        institution: 'ETH Zurich',
        startYear: '2014',
        endYear: '2016'
      }
    ],
    pricingPackages: {
      basic: {
        name: 'Basic',
        title: 'Code Audit & Performance Optimization',
        price: 600,
        deliveryTimeDays: 3,
        revisions: 2,
        description: 'Comprehensive codebase review, security vulnerability audit, Lighthouse performance fixes, and bundle size reduction report.',
        features: ['Full TypeScript audit', 'Performance & bundle profiling', 'Actionable PR with immediate speedups', 'Lighthouse 95+ score guarantee', '1h Architectural video consultation']
      },
      standard: {
        name: 'Standard',
        title: 'Production MVP Feature or Full Landing App',
        price: 1800,
        deliveryTimeDays: 7,
        revisions: 3,
        description: 'Custom responsive web application module or interactive marketing experience built with Next.js, Tailwind, and full API integration.',
        features: ['Next.js 15 + TypeScript architecture', 'Custom motion micro-interactions', 'REST / GraphQL integration', 'Responsive across mobile & 4K', 'CI/CD deployment pipeline', '14 days post-launch support']
      },
      premium: {
        name: 'Premium',
        title: 'Complete Full-Stack Application Architecture',
        price: 4500,
        deliveryTimeDays: 14,
        revisions: 'Unlimited',
        description: 'End-to-end web system including relational database schema, authentication, Stripe billing, admin dashboard, and rock-solid test suite.',
        features: ['Complete Frontend + Backend + Database', 'Authentication & Role-based Permissions', 'Stripe recurring subscription logic', 'Analytics & observability instrumentation', 'Comprehensive documentation & test suite', '30 days priority warranty']
      }
    },
    socialLinks: {
      github: 'https://github.com/sashak',
      twitter: 'https://twitter.com/sashak_dev',
      linkedin: 'https://linkedin.com/in/sashak-dev',
      website: 'https://sashak.dev'
    }
  },
  {
    id: 'fl-3',
    userId: 'usr-fl-3',
    name: 'Marcus Sterling',
    username: 'marcus_vfx',
    email: 'marcus.sterling@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    profession: '3D Motion Designer & Cinema 4D / Blender Artist',
    primaryCategory: 'motion_graphics',
    bio: 'Sculpting unforgettable 3D brand visuals, tactile product simulations, and kinetic typography for modern software companies.',
    aboutStory: 'With a background in architecture and procedural animation, I craft 3D motion design that elevates brands beyond cookie-cutter aesthetics. Clients include Stripe, Apple Music, and Linear.',
    location: 'Toronto, Canada',
    timezone: 'UTC-5 (EST)',
    hourlyRate: 115,
    startingPrice: 500,
    experienceYears: 7,
    rating: 4.98,
    reviewsCount: 38,
    completedProjectsCount: 61,
    onTimeDeliveryRate: 100,
    responseTime: '< 45 mins',
    availability: 'available',
    isVerifiedPro: true,
    isTopRated: true,
    featured: false,
    earningsTotal: 52100,
    skills: [
      { name: 'Cinema 4D + Redshift', level: 'Master', category: '3D & VFX' },
      { name: 'Blender & Geometry Nodes', level: 'Expert', category: '3D & VFX' },
      { name: 'After Effects Compositing', level: 'Master', category: 'Video & Motion' },
      { name: 'Rive Interactive Animation', level: 'Expert', category: 'Design' },
      { name: 'Product Visualization', level: 'Master', category: '3D & VFX' }
    ],
    portfolio: [
      {
        id: 'port-7',
        title: 'Chronos Smartwatch 3D Hero Experience',
        category: '3D Product',
        mediaType: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
        description: 'Exploded-view mechanical simulation showing internal sapphire gears, titanium bezel reflections, and liquid-smooth lighting.',
        tags: ['Cinema 4D', 'Redshift', 'Product Render'],
        clientName: 'Chronos Labs',
        metrics: 'Featured on Behance Curated'
      },
      {
        id: 'port-8',
        title: 'Apex OS — Brand Motion System & Identity Reel',
        category: 'Kinetic Motion',
        mediaType: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
        description: 'Dynamic kinetic logo reveal, UI transitions, and promotional trailer for next-gen developer workstation.',
        tags: ['After Effects', 'Kinetic', 'Brand Identity'],
        clientName: 'Apex Computer Co.'
      }
    ],
    workExperience: [
      {
        id: 'exp-5',
        role: 'Senior Motion Director',
        company: 'Buck Studio',
        location: 'New York / Remote',
        startDate: '2019',
        endDate: '2023',
        isCurrent: false,
        description: 'Directed 3D product reels for global tech launches and luxury packaging campaigns.'
      }
    ],
    education: [
      {
        id: 'edu-3',
        degree: 'Bachelor of Design in Animation',
        field: '3D Animation & Motion Design',
        institution: 'OCAD University',
        startYear: '2013',
        endYear: '2017'
      }
    ],
    pricingPackages: {
      basic: {
        name: 'Basic',
        title: '3D Animated Icon or Logo Reveal',
        price: 500,
        deliveryTimeDays: 3,
        revisions: 2,
        description: 'Looping 3D brand logo or hero icon rendered in transparent alpha or high-res MP4/WebM.',
        features: ['Up to 5 seconds animation', 'Transparent alpha channel', '4K render resolution', 'Sound effect layer included']
      },
      standard: {
        name: 'Standard',
        title: '3D Product Feature Animation (15-30s)',
        price: 1400,
        deliveryTimeDays: 6,
        revisions: 3,
        description: 'Photorealistic 3D product simulation with lighting setup, material shaders, camera animation, and text callouts.',
        features: ['15-30s Full 3D motion', 'Custom shader & lighting design', 'Sound design & music sync', 'Source C4D / Blender files provided']
      },
      premium: {
        name: 'Premium',
        title: 'Complete Commercial 3D Launch Reel',
        price: 3200,
        deliveryTimeDays: 12,
        revisions: 4,
        description: 'Full broadcast-ready 3D brand experience with multiple scene transitions, cinematic score, and vertical cutdowns.',
        features: ['45-60s cinematic 3D film', 'Full storyboarding & styleframes', 'Custom procedural simulation', '3 Social aspect ratio crops (16:9, 9:16, 1:1)', 'Full commercial license']
      }
    },
    socialLinks: {
      behance: 'https://behance.net/marcus_vfx',
      twitter: 'https://twitter.com/marcus_vfx',
      website: 'https://marcussterling.design'
    }
  },
  {
    id: 'fl-4',
    userId: 'usr-fl-4',
    name: 'Elena Rostova',
    username: 'elena_mobile',
    email: 'elena.rostova@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80',
    profession: 'Lead iOS & React Native Mobile Engineer',
    primaryCategory: 'mobile_development',
    bio: 'Crafting buttery 120Hz native iOS and cross-platform apps with gesture-driven physics, offline sync, and frictionless in-app purchases.',
    aboutStory: 'I build apps people fall in love with. Specializing in Swift / SwiftUI and React Native with deep native module bridges. 4 of the apps I architected have been featured on the Apple App Store as "App of the Day".',
    location: 'Stockholm, Sweden',
    timezone: 'UTC+1 (CET)',
    hourlyRate: 105,
    startingPrice: 750,
    experienceYears: 7,
    rating: 4.94,
    reviewsCount: 31,
    completedProjectsCount: 44,
    onTimeDeliveryRate: 98,
    responseTime: '< 20 mins',
    availability: 'partially_available',
    isVerifiedPro: true,
    isTopRated: false,
    featured: false,
    skills: [
      { name: 'SwiftUI & UIKit', level: 'Master', category: 'Development' },
      { name: 'React Native & Expo', level: 'Master', category: 'Development' },
      { name: 'Gesture Physics & Animations', level: 'Expert', category: 'Development' },
      { name: 'StoreKit 2 & RevenueCat', level: 'Expert', category: 'Development' },
      { name: 'Local SQLite & CoreData Sync', level: 'Expert', category: 'Development' }
    ],
    portfolio: [
      {
        id: 'port-9',
        title: 'Aura Meditation & Soundscape iOS App',
        category: 'iOS Native',
        mediaType: 'code',
        mediaUrl: 'https://github.com/elenar/aura-ios',
        thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
        description: 'Fluid SwiftUI audio player with dynamic island widgets, spatial audio controls, and background audio streaming.',
        tags: ['SwiftUI', 'AVFoundation', 'Dynamic Island'],
        clientName: 'Aura Mind Inc',
        metrics: '4.9 Star Rating (12k App Store Reviews)'
      }
    ],
    workExperience: [
      {
        id: 'exp-6',
        role: 'Staff Mobile Architect',
        company: 'Nordic App House',
        location: 'Stockholm',
        startDate: '2019',
        endDate: '2023',
        isCurrent: false,
        description: 'Led mobile engineering guild for 6 international venture-backed consumer apps.'
      }
    ],
    education: [
      {
        id: 'edu-4',
        degree: 'B.Sc. in Software Engineering',
        field: 'Mobile Systems',
        institution: 'KTH Royal Institute of Technology',
        startYear: '2013',
        endYear: '2017'
      }
    ],
    pricingPackages: {
      basic: {
        name: 'Basic',
        title: 'App Store Submission & Bug Fixes',
        price: 750,
        deliveryTimeDays: 3,
        revisions: 2,
        description: 'Fix crash logs, resolve rejection feedback from Apple/Google review, and configure certificates.',
        features: ['Crashlytics debugging', 'App Store Connect setup', 'TestFlight build release']
      },
      standard: {
        name: 'Standard',
        title: 'Custom Screen Flow or RevenueCat Integration',
        price: 1900,
        deliveryTimeDays: 7,
        revisions: 3,
        description: 'Complete onboarding flow or paywall with Apple StoreKit 2 & Google Play billing.',
        features: ['SwiftUI or React Native component', 'RevenueCat integration', 'Haptic feedback & animations']
      },
      premium: {
        name: 'Premium',
        title: 'Full Native MVP Mobile Application',
        price: 4900,
        deliveryTimeDays: 20,
        revisions: 'Unlimited',
        description: 'Complete cross-platform iOS & Android application ready for App Store launch.',
        features: ['Full application frontend & backend', 'Offline-first database sync', 'Push notifications & analytics', 'App store approval guarantee']
      }
    },
    socialLinks: {
      github: 'https://github.com/elenar',
      twitter: 'https://twitter.com/elena_mobile',
      linkedin: 'https://linkedin.com/in/elena-rostova'
    }
  },
  {
    id: 'fl-5',
    userId: 'usr-fl-5',
    name: 'Kai Chen',
    username: 'kaichen_vids',
    email: 'kai.chen@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&auto=format&fit=crop&q=80',
    profession: 'Documentary & Cinema Colorist / Senior Post Editor',
    primaryCategory: 'video_editing',
    bio: 'Bringing Hollywood-level color science and rhythmic narrative pacing to independent documentaries and commercial fashion films.',
    aboutStory: 'Trained at the Australian Film, Television and Radio School (AFTRS), I work with Arri Raw, RED, Blackmagic, and Sony Venice footage to craft mood and emotional depth.',
    location: 'Melbourne, Australia',
    timezone: 'UTC+10 (AEST)',
    hourlyRate: 95,
    startingPrice: 400,
    experienceYears: 10,
    rating: 4.97,
    reviewsCount: 42,
    completedProjectsCount: 80,
    onTimeDeliveryRate: 100,
    responseTime: '< 1 hour',
    availability: 'available',
    isVerifiedPro: true,
    isTopRated: true,
    featured: true,
    skills: [
      { name: 'DaVinci Resolve Studio', level: 'Master', category: 'Video & Motion' },
      { name: 'ACES & Color Science', level: 'Master', category: 'Video & Motion' },
      { name: 'Film Grain & Emulation', level: 'Master', category: 'Video & Motion' },
      { name: 'Premiere Pro', level: 'Expert', category: 'Video & Motion' },
      { name: 'Soundtrack Restoration', level: 'Expert', category: 'Video & Motion' }
    ],
    portfolio: [
      {
        id: 'port-10',
        title: 'Wilderness Echoes: Tasmania Film (4K HDR)',
        category: 'Cinema Color',
        mediaType: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
        description: 'Complete HDR grading in ACES workflow with Kodak 2383 film print emulation and custom split-toning.',
        tags: ['DaVinci', 'ACES', 'HDR', 'Documentary'],
        metrics: 'Best Cinematography Award (Sydney Indie Fest)'
      }
    ],
    workExperience: [
      {
        id: 'exp-7',
        role: 'Head Colorist',
        company: 'Chromafilm Post',
        location: 'Melbourne',
        startDate: '2016',
        endDate: 'Present',
        isCurrent: true,
        description: 'Graded over 30 feature documentaries, Netflix indie specials, and luxury automotive ads.'
      }
    ],
    education: [
      {
        id: 'edu-5',
        degree: 'Graduate Diploma in Color Grading',
        field: 'Digital Cinematography',
        institution: 'AFTRS Sydney',
        startYear: '2013',
        endYear: '2015'
      }
    ],
    pricingPackages: {
      basic: {
        name: 'Basic',
        title: 'Short Film / Commercial Color Grade (Up to 3 mins)',
        price: 400,
        deliveryTimeDays: 2,
        revisions: 2,
        description: 'Shot matching, primary balance, skin tone isolation, and custom cinematic show LUT export.',
        features: ['Up to 3 minutes timeline', 'Color balance & match', 'Look development', 'XML round-trip workflow']
      },
      standard: {
        name: 'Standard',
        title: 'Full Music Video or Documentary Segment (Up to 10 mins)',
        price: 900,
        deliveryTimeDays: 4,
        revisions: 3,
        description: 'Comprehensive DaVinci grade with grain emulation, noise reduction, and power window tracking.',
        features: ['Up to 10 minutes runtime', 'Film print emulation (Kodak/Fuji)', 'HDR & SDR delivery deliverables', '3 Revision passes']
      },
      premium: {
        name: 'Premium',
        title: 'Feature / Long-form Documentary Color Suite (Up to 45 mins)',
        price: 2600,
        deliveryTimeDays: 10,
        revisions: 'Unlimited',
        description: 'Full theatrical grade, remote live streaming session, DCI-P3 & Rec709 masters.',
        features: ['Full timeline grading', 'Live stream review session', 'DCP master export', 'Lifetime look archive']
      }
    },
    socialLinks: {
      behance: 'https://behance.net/kaichen_color',
      instagram: 'https://instagram.com/kaichen_color',
      linkedin: 'https://linkedin.com/in/kai-chen-post'
    }
  },
  {
    id: 'fl-6',
    userId: 'usr-fl-6',
    name: 'Amara Vance',
    username: 'amaravance_ui',
    email: 'amara.vance@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    profession: 'Product Designer & Creative Front-End Specialist',
    primaryCategory: 'ui_ux_design',
    bio: 'Designing interfaces with deliberate tactile luxury, mathematical grid harmony, and expressive micro-interactions.',
    aboutStory: 'I design from first principles. I believe digital products should feel like finely tuned instruments — responsive, intuitive, and visually distinct from the bland modern template ocean.',
    location: 'Austin, TX, USA',
    timezone: 'UTC-6 (CST)',
    hourlyRate: 110,
    startingPrice: 550,
    experienceYears: 8,
    rating: 4.99,
    reviewsCount: 39,
    completedProjectsCount: 56,
    onTimeDeliveryRate: 100,
    responseTime: '< 25 mins',
    availability: 'available',
    isVerifiedPro: true,
    isTopRated: true,
    featured: false,
    skills: [
      { name: 'Figma Design Systems', level: 'Master', category: 'Design' },
      { name: 'UI / UX Prototyping', level: 'Master', category: 'Design' },
      { name: 'Tailwind CSS / React Code', level: 'Expert', category: 'Development' },
      { name: 'Micro-interactions & Rive', level: 'Expert', category: 'Design' },
      { name: 'Typography & Layout Math', level: 'Master', category: 'Design' }
    ],
    portfolio: [
      {
        id: 'port-11',
        title: 'Velox Trading Terminal & Design System',
        category: 'Fintech UI',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        description: 'Complete high-density dark mode design system with 200+ accessible components and token architecture.',
        tags: ['Figma', 'Design System', 'Tokens', 'Fintech'],
        clientName: 'Velox Capital',
        metrics: 'Cut engineering UI dev time by 45%'
      }
    ],
    workExperience: [
      {
        id: 'exp-8',
        role: 'Principal Product Designer',
        company: 'Forge Studio',
        location: 'Austin / Remote',
        startDate: '2019',
        endDate: '2023',
        isCurrent: false,
        description: 'Spearheaded UX strategy for high-growth Series A through C developer tools.'
      }
    ],
    education: [
      {
        id: 'edu-6',
        degree: 'B.F.A. in Graphic & Interactive Design',
        field: 'Interface Design',
        institution: 'Rhode Island School of Design (RISD)',
        startYear: '2012',
        endYear: '2016'
      }
    ],
    pricingPackages: {
      basic: {
        name: 'Basic',
        title: 'UI/UX Friction Audit & Redesign (1 Key Flow)',
        price: 550,
        deliveryTimeDays: 3,
        revisions: 2,
        description: 'Heuristic evaluation of your existing app flow with Figma redesign, component tokens, and interactive prototype.',
        features: ['Figma prototype with components', 'UX friction & drop-off report', 'Responsive desktop & mobile views']
      },
      standard: {
        name: 'Standard',
        title: 'Complete 5-Screen Core Product Experience',
        price: 1600,
        deliveryTimeDays: 7,
        revisions: 3,
        description: 'High-fidelity Figma mockups, full responsive variants, auto-layout tokens, and developer handoff spec.',
        features: ['5 Core UI screens + empty/error states', 'Interactive clickable prototype', 'Figma design tokens & components', 'Live video handoff to dev team']
      },
      premium: {
        name: 'Premium',
        title: 'Full Product Design System & Complete Web App UI',
        price: 3800,
        deliveryTimeDays: 14,
        revisions: 'Unlimited',
        description: 'Comprehensive UI/UX design suite (15+ screens), complete design system library, and React/Tailwind code starter.',
        features: ['Full 15+ screen architecture', 'Scalable component library & tokens', 'Custom icon & illustration set', 'Ready-to-use React/Tailwind export']
      }
    },
    socialLinks: {
      behance: 'https://behance.net/amaravance',
      dribbble: 'https://dribbble.com/amaravance',
      twitter: 'https://twitter.com/amaravance_ui'
    }
  }
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'cli-1',
    userId: 'usr-cli-1',
    name: 'David Vance',
    username: 'david_vance',
    email: 'david@ateliercreative.co',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    companyName: 'Atelier Creative Studio',
    industry: 'Digital Media & Production',
    location: 'New York, USA',
    bio: 'Founder at Atelier Creative. We produce documentary series and digital brand films for high-growth ventures.',
    totalHires: 14,
    totalSpent: 38400,
    savedFreelancerIds: ['fl-1', 'fl-2', 'fl-5']
  },
  {
    id: 'cli-2',
    userId: 'usr-cli-2',
    name: 'Claire Moreau',
    username: 'claire_tech',
    email: 'claire@hyperstack.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    companyName: 'HyperStack AI',
    industry: 'Developer Infrastructure',
    location: 'San Francisco, USA',
    bio: 'VP of Product at HyperStack. Constantly hiring premier frontend developers and motion designers.',
    totalHires: 8,
    totalSpent: 26800,
    savedFreelancerIds: ['fl-2', 'fl-3', 'fl-6']
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-cli-1',
    name: 'David Vance',
    email: 'david@ateliercreative.co',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    role: 'client',
    clientProfileId: 'cli-1',
    createdAt: '2024-01-15'
  },
  {
    id: 'usr-fl-1',
    name: 'Julian Ross',
    email: 'julian.ross@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'freelancer',
    freelancerProfileId: 'fl-1',
    createdAt: '2023-11-10'
  },
  {
    id: 'usr-admin',
    name: 'Eleanor Bennett (Admin)',
    email: 'admin@craftlink.work',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'admin',
    createdAt: '2023-01-01'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    freelancerId: 'fl-1',
    clientId: 'cli-1',
    clientName: 'David Vance',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    clientCompany: 'Atelier Creative',
    rating: 5,
    date: '2 weeks ago',
    projectTitle: 'Docuseries Episode 1 Narrative Pacing & Color',
    comment: 'Julian is hands-down the most talented video editor I have worked with in 10 years of running our media company. His sense of comedic timing, micro-sound design, and story arc transformed our raw footage into an absolute masterpiece. Finished 2 days ahead of schedule!',
    freelancerReply: 'Thank you David! It was an absolute pleasure working with your team’s stellar raw cinematography. Looking forward to Episode 2!'
  },
  {
    id: 'rev-2',
    freelancerId: 'fl-1',
    clientId: 'cli-2',
    clientName: 'Claire Moreau',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    clientCompany: 'HyperStack AI',
    rating: 5,
    date: '1 month ago',
    projectTitle: 'Product Launch 60s Hype Reel',
    comment: 'Julian delivered a killer cut that had our entire leadership team cheering on Slack. The retention graph on our YouTube launch speaks for itself — 74% average watch time on a 3-minute video!'
  },
  {
    id: 'rev-3',
    freelancerId: 'fl-2',
    clientId: 'cli-2',
    clientName: 'Claire Moreau',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    clientCompany: 'HyperStack AI',
    rating: 5,
    date: '3 weeks ago',
    projectTitle: 'Next.js 15 Platform Redesign & Performance Overhaul',
    comment: 'Sasha is an extraordinary engineer. She took our messy Next.js codebase, overhauled the data layer with strict TypeScript, optimized bundle sizes down by 62%, and built a breathtaking animated dashboard. Pure craftsmanship.',
    freelancerReply: 'Thanks Claire! HyperStack has an incredible vision and I enjoyed pushing the limits of the App Router for you.'
  }
];

export const INITIAL_HIRING_REQUESTS: HiringRequest[] = [
  {
    id: 'req-101',
    clientId: 'cli-1',
    clientName: 'David Vance',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    clientCompany: 'Atelier Creative Studio',
    clientEmail: 'david@ateliercreative.co',
    freelancerId: 'fl-1',
    freelancerName: 'Julian Ross',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    freelancerProfession: 'Senior YouTube & Commercial Video Editor',
    projectTitle: 'The Future of Architecture Mini-Documentary (18 min)',
    category: 'Video & Film Editing',
    description: 'We need a high-retention, cinematic edit for our upcoming 18-minute architectural documentary. Footage includes Sony FX6 4K 10-bit S-Log3, drone aerials, and 2-person sit-down interviews. Must have custom sound design and atmospheric pacing.',
    budgetType: 'fixed',
    budgetAmount: 1200,
    deadline: '2026-08-25',
    status: 'in_progress',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-02',
    selectedPackage: 'Premium',
    attachments: [
      { name: 'Brief_and_Storyline.pdf', url: '#', size: '2.4 MB', type: 'application/pdf' },
      { name: 'Interview_Transcript.docx', url: '#', size: '140 KB', type: 'document' }
    ],
    milestones: [
      { id: 'm1', title: 'Rough Cut Assembly & Narrative Sync', amount: 400, completed: true, dueDate: '2026-08-10' },
      { id: 'm2', title: 'Fine Cut, B-Roll, Sound Design & Color', amount: 500, completed: false, dueDate: '2026-08-18' },
      { id: 'm3', title: 'Final 4K Master & Social Cutdowns', amount: 300, completed: false, dueDate: '2026-08-25' }
    ]
  },
  {
    id: 'req-102',
    clientId: 'cli-1',
    clientName: 'David Vance',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    clientCompany: 'Atelier Creative Studio',
    clientEmail: 'david@ateliercreative.co',
    freelancerId: 'fl-2',
    freelancerName: 'Sasha Kowalski',
    freelancerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    freelancerProfession: 'Principal React / Next.js & Full-Stack Architect',
    projectTitle: 'Interactive Client Screening Room Portal',
    category: 'Full-Stack Web Development',
    description: 'We want to build a private password-protected web portal for our clients to view timecoded video drafts, leave frame-accurate comments, and approve deliverables.',
    budgetType: 'fixed',
    budgetAmount: 1800,
    deadline: '2026-09-01',
    status: 'pending',
    createdAt: '2026-08-04',
    updatedAt: '2026-08-04',
    selectedPackage: 'Standard',
    attachments: [
      { name: 'Wireframes_Figma_Export.png', url: '#', size: '4.1 MB' }
    ],
    milestones: [
      { id: 'm4', title: 'Video player & Frame-accurate Timestamp Commenting', amount: 900, completed: false },
      { id: 'm5', title: 'Authentication, Access Codes & Stripe Invoicing', amount: 900, completed: false }
    ]
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['usr-cli-1', 'usr-fl-1'],
    clientId: 'cli-1',
    clientName: 'David Vance',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    clientCompany: 'Atelier Creative Studio',
    freelancerId: 'fl-1',
    freelancerName: 'Julian Ross',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    freelancerProfession: 'Senior YouTube & Commercial Video Editor',
    lastMessage: 'I have uploaded the first rough assembly cut to Frame.io! Take a look when you have a moment.',
    lastMessageTime: '10:42 AM',
    unreadCountClient: 0,
    unreadCountFreelancer: 0
  },
  {
    id: 'conv-2',
    participantIds: ['usr-cli-1', 'usr-fl-2'],
    clientId: 'cli-1',
    clientName: 'David Vance',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    clientCompany: 'Atelier Creative Studio',
    freelancerId: 'fl-2',
    freelancerName: 'Sasha Kowalski',
    freelancerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    freelancerProfession: 'Principal React / Next.js Architect',
    lastMessage: 'Hey David, I reviewed your wireframe for the screening room portal. The video canvas integration looks great.',
    lastMessageTime: 'Yesterday',
    unreadCountClient: 1,
    unreadCountFreelancer: 0
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'usr-cli-1',
    senderName: 'David Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    senderRole: 'client',
    recipientId: 'usr-fl-1',
    content: 'Hi Julian! Loved your previous documentary work on FutureVision. We have a new 18-minute piece on sustainable architecture in Tokyo and want your storytelling pacing.',
    createdAt: '2026-08-01T09:15:00Z'
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'usr-fl-1',
    senderName: 'Julian Ross',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    senderRole: 'freelancer',
    recipientId: 'usr-cli-1',
    content: 'Hey David, that sounds right in my wheelhouse! Tokyo architecture has incredible ambient sound possibilities. I can start immediately and structure it around 3 clear narrative beats.',
    createdAt: '2026-08-01T09:30:00Z',
    quoteProposal: {
      projectTitle: 'Tokyo Architecture Documentary (18 min)',
      amount: 1200,
      deliveryDays: 7,
      status: 'accepted'
    }
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'usr-cli-1',
    senderName: 'David Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    senderRole: 'client',
    recipientId: 'usr-fl-1',
    content: 'Proposal accepted and escrow funded! Looking forward to the rough cut.',
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: 'usr-fl-1',
    senderName: 'Julian Ross',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    senderRole: 'freelancer',
    recipientId: 'usr-cli-1',
    content: 'I have uploaded the first rough assembly cut to Frame.io! Take a look when you have a moment.',
    createdAt: '2026-08-05T10:42:00Z',
    attachments: [
      { name: 'Assembly_Cut_v1_Rough.mp4', url: '#', size: '820 MB' }
    ]
  },
  {
    id: 'msg-5',
    conversationId: 'conv-2',
    senderId: 'usr-cli-1',
    senderName: 'David Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    senderRole: 'client',
    recipientId: 'usr-fl-2',
    content: 'Hi Sasha! We are building an interactive screening room web portal for our video studio clients. Are you available for a Next.js full-stack build?',
    createdAt: '2026-08-04T14:10:00Z'
  },
  {
    id: 'msg-6',
    conversationId: 'conv-2',
    senderId: 'usr-fl-2',
    senderName: 'Sasha Kowalski',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    senderRole: 'freelancer',
    recipientId: 'usr-cli-1',
    content: 'Hey David, I reviewed your wireframe for the screening room portal. The video canvas integration looks great. I sent over a formal hiring proposal with 2 milestones.',
    createdAt: '2026-08-04T16:20:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr-cli-1',
    type: 'contract_update',
    title: 'Milestone 1 Completed',
    description: 'Julian Ross marked "Rough Cut Assembly & Narrative Sync" as ready for review.',
    timestamp: '2 hours ago',
    read: false,
    linkType: 'hiring',
    targetId: 'req-101'
  },
  {
    id: 'notif-2',
    userId: 'usr-cli-1',
    type: 'message',
    title: 'New Message from Sasha Kowalski',
    description: 'Hey David, I reviewed your wireframe for the screening room portal...',
    timestamp: 'Yesterday',
    read: true,
    linkType: 'messages',
    targetId: 'conv-2'
  },
  {
    id: 'notif-3',
    userId: 'usr-fl-1',
    type: 'hiring_request',
    title: 'New Project Proposal Received',
    description: 'David Vance submitted a proposal for "Tokyo Architecture Mini-Doc".',
    timestamp: '4 days ago',
    read: true,
    linkType: 'hiring',
    targetId: 'req-101'
  }
];

export const INITIAL_ADMIN_REPORTS: AdminReport[] = [
  {
    id: 'rep-1',
    reporterId: 'usr-cli-2',
    reporterName: 'Claire Moreau',
    reportedUserId: 'usr-fake-9',
    reportedUserName: 'ApexBot3000',
    reportedUserRole: 'freelancer',
    reason: 'Spam/Fake Account',
    details: 'User has no portfolio links, copy-pasted bio from another platform, and demanded off-platform crypto payment in direct chat.',
    status: 'open',
    createdAt: '2026-08-04T18:00:00Z'
  },
  {
    id: 'rep-2',
    reporterId: 'usr-cli-1',
    reporterName: 'David Vance',
    reportedUserId: 'usr-fake-12',
    reportedUserName: 'CryptoEditPro',
    reportedUserRole: 'freelancer',
    reason: 'Spam/Fake Account',
    details: 'Spamming direct inquiries with automated promotional text links.',
    status: 'investigating',
    createdAt: '2026-08-03T11:20:00Z'
  }
];

export const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'ver-1',
    freelancerId: 'fl-4',
    freelancerName: 'Elena Rostova',
    freelancerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    profession: 'Lead iOS & React Native Mobile Engineer',
    idDocumentType: 'Passport (Verified Sweden ID)',
    portfolioProofUrl: 'https://github.com/elenar',
    experienceSummary: '7 years verified as lead mobile architect with 4 Apple App Store features and active GitHub commits.',
    status: 'pending',
    submittedAt: '2026-08-03'
  },
  {
    id: 'ver-2',
    freelancerId: 'fl-3',
    freelancerName: 'Marcus Sterling',
    freelancerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    profession: '3D Motion Designer & Cinema 4D Artist',
    idDocumentType: 'Driver License (Ontario, Canada)',
    portfolioProofUrl: 'https://behance.net/marcus_vfx',
    experienceSummary: 'Verified 3D render artist with commercial credits for Stripe and Linear.',
    status: 'approved',
    submittedAt: '2026-07-28',
    reviewerNotes: 'Verified via Behance Pro badge and identity check.'
  }
];
