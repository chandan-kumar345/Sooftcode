import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Blog from './models/Blog.js';
import Project from './models/Project.js';
import Job from './models/Job.js';

dotenv.config();

const users = [
  {
    username: 'admin',
    email: 'admin@sooftcode.com',
    password: 'AdminPass123!',
    role: 'admin',
  },
];

const projects = [
  {
    title: 'Aura Capital Trading Portal',
    client: 'Aura Capital Group',
    category: 'Mobile App Development',
    duration: '6 Months',
    description: 'A premium, high-frequency stock trading and portfolio optimization application featuring sub-millisecond sync, interactive visualization graphs, and custom biometric security.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'WebSockets', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    link: 'https://auracapital.example.com',
    features: [
      'Real-time price feeds via socket connections',
      'Biometric authentication (FaceID / TouchID)',
      'AI-driven custom portfolio optimization suggestions',
      'High-performance SVG and canvas-based financial charts',
    ],
    stats: {
      'Latency Sync': '< 10ms',
      'Active Users': '500K+',
      'App Store Rating': '4.9/5',
    },
  },
  {
    title: 'Enterprise DevSecOps Pipeline',
    client: 'Nova Logistics Global',
    category: 'Cloud Solutions',
    duration: '8 Months',
    description: 'Architected a multi-region, highly available, and auto-scaling Kubernetes cluster infrastructure incorporating automated CI/CD security scanning and Canary deployments.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus'],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    link: 'https://novalogistics.example.com',
    features: [
      'Automated static security analysis (SAST) in CI/CD pipeline',
      'Multi-region cluster fallback redundancy',
      'Canary deployment strategy with automated rollbacks',
      'Saved 50% on client cloud-hosting bills via server rightsizing',
    ],
    stats: {
      'Deployment Time': '-75%',
      'System Uptime': '99.99%',
      'Annual Savings': '$240k',
    },
  },
  {
    title: 'Zenith AI Customer Intelligence',
    client: 'Zenith Retail',
    category: 'AI Solutions',
    duration: '4 Months',
    description: 'Designed an intelligent analytics engine that parses client interactions across web-chat, voice transcripts, and emails using Large Language Models to deliver automated sentiment tracking and support ticket triage.',
    tags: ['Python', 'FastAPI', 'Next.js', 'OpenAI', 'MongoDB', 'LangChain'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    link: 'https://zenithanalytics.example.com',
    features: [
      'Real-time conversational sentiment classification',
      'Intelligent routing based on critical keywords and panic states',
      'Auto-generated support response suggestions',
      'GDPR-compliant personal data hashing pipeline',
    ],
    stats: {
      'Support Efficiency': '+35%',
      'Classification Accuracy': '94.2%',
      'CSAT Score Boost': '+15%',
    },
  },
  {
    title: 'Velo CRM SaaS Platform',
    client: 'Velo Technologies',
    category: 'SaaS Development',
    duration: '5 Months',
    description: 'A modern, comprehensive multi-tenant SaaS Customer Relationship Manager built with Next.js, featuring customizable widget dashboards, Stripe payment systems, and role-based permissions.',
    tags: ['Next.js', 'Express', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    link: 'https://velocrm.example.com',
    features: [
      'Multi-tenant database isolation using Mongoose schemas',
      'Stripe subscription portals with automatic invoice generators',
      'Draggable dashboard widgets for user personalization',
      'Full REST API credentials panel for external developer integration',
    ],
    stats: {
      'Onboarding Time': '< 3 min',
      'Monthly SaaS Revenue': '$85k',
      'Load Time': '0.9 seconds',
    },
  },
  {
    title: 'AI Virtual Mouse',
    client: 'Open Source',
    category: 'AI Solutions',
    duration: '2 Months',
    description: 'An AI-powered virtual mouse that allows users to control the computer cursor using real-time hand gestures captured through a webcam.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'],
    image: '/projects/ai-virtual-mouse.png',
    link: 'https://github.com/chandan-kumar345/AI-virtual-mouse',
    features: [
      'Real-time hand tracking',
      'Cursor movement',
      'Left click',
      'Right click',
      'Double click',
      'Drag and drop',
      'Scroll up & down',
      'Gesture recognition',
      'Smooth cursor movement',
      'High accuracy',
      'Low latency',
      'Webcam-based interaction',
      'Touch-free computer control',
    ],
    stats: {
      'Tracking Latency': '< 15ms',
      'Accuracy Rate': '98%',
      'Frame Rate': '30 FPS',
    },
  },
  {
    title: 'AniVerse - Anime Streaming Portal',
    client: 'AniVerse Community (Open Source)',
    category: 'Web Development',
    duration: '3 Months',
    description: 'A state-of-the-art anime tracker and streaming platform featuring high-fidelity media players, comprehensive anime discovery schemas, and a social tracking dashboard.',
    tags: ['Next.js', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Framer Motion', 'Hls.js'],
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/chandan-kumar345/AniVerse',
    features: [
      'Dynamic Anime Search & Multi-criteria Filtering',
      'High-Performance HLS Video Streaming Player Integration',
      'Personalized watchlist tracker with interactive user dashboards',
      'Real-time episodes schedule and releasing notifications',
      'Social reviews, user ratings, and anime discussion forums',
      'Immersive dark mode with glassmorphism layout animations'
    ],
    stats: {
      'Streaming Latency': '< 120ms',
      'Active Monthly Users': '25K+',
      'Page Load Speed': '0.85s',
    },
  },
  {
    title: 'Roamify - Travel Booking Platform',
    client: 'Roamify International LLC',
    category: 'Web Development',
    duration: '4 Months',
    description: 'An elegant travel booking portal offering interactive destination search, dynamic itinerary planners, flight-hotel aggregators, and immersive virtual tours.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Mapbox', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    link: 'https://roamify-booking.example.com',
    features: [
      'Interactive map search integration using Mapbox GL',
      'Multi-city hotel and flight booking aggregator',
      'Real-time collaborative trip itinerary builders',
      'Secure multi-currency checkout via Stripe integration',
      'Personalized recommendations based on budget and category',
      'Dynamic user reviews and photo gallery uploads'
    ],
    stats: {
      'Booking Success': '99.7%',
      'Search API Speed': '150ms',
      'Monthly Bookings': '8.5K+',
    },
  },
  {
    title: 'Apex POS - Cloud Point of Sale',
    client: 'Apex Retail Solutions',
    category: 'SaaS Development',
    duration: '5 Months',
    description: 'An enterprise-grade point of sale system with offline capabilities, real-time inventory synchronization, dynamic tax calculations, and barcode scanner integration.',
    tags: ['React', 'Node.js', 'Electron', 'SQLite', 'Tailwind CSS', 'Express'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    link: 'https://apex-pos.example.com',
    features: [
      'Robust offline billing mode with local SQLite sync',
      'Real-time stock and multi-store inventory tracking',
      'Receipt printer, barcode scanner, and cash drawer hardware integrations',
      'Dynamic discount vouchers and local taxation rules',
      'Comprehensive sales analytics dashboards and report export',
      'Role-based login authorization for cashiers and managers'
    ],
    stats: {
      'Transaction Latency': '< 50ms',
      'Hardware Sync': '99.99%',
      'Daily Sales Count': '12K+',
    },
  },
  {
    title: 'VoxAI - Conversational Voice Assistant',
    client: 'VoxAI Labs (SaaS Tool)',
    category: 'AI Solutions',
    duration: '3 Months',
    description: 'A real-time voice assistant that processes speech input, reasons using advanced Large Language Models, and responds with lifelike voice synthesis under low latency.',
    tags: ['Python', 'WebSockets', 'Whisper API', 'GPT-4', 'FastAPI', 'Coqui TTS'],
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80',
    features: [
      'Ultra-low latency speech-to-text translation using Whisper',
      'Context-aware conversational reasoning backed by GPT-4',
      'Natural voice response generation using advanced Coqui TTS models',
      'WebSocket connections for streaming audio packets back and forth',
      'Intelligent smart-home triggers and calendar scheduling actions',
      'Background noise cancellation and echo isolation filters'
    ],
    stats: {
      'Audio Latency': '< 800ms',
      'STT Accuracy': '97.5%',
      'Daily Voice Queries': '30K+',
    },
  },
  {
    title: 'SoulSync - Dating App & Platform',
    client: 'SoulSync Dating Networks',
    category: 'Mobile App Development',
    duration: '6 Months',
    description: 'A cross-platform dating application featuring spatial location matching, interactive chat rooms, video profiles, and personality compatibility algorithms.',
    tags: ['Flutter', 'React', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps'],
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    features: [
      'Geospatial coordinate matching using MongoDB GeoJSON',
      'Real-time chat messaging with dynamic status alerts',
      'Video profile uploads with adaptive media transcoding',
      'Intelligent compatibility matching based on interests',
      'Face verification using AI facial recognition APIs',
      'In-app subscription upgrades and profile boosts'
    ],
    stats: {
      'Matches Created': '1.2M+',
      'Chat Sync Latency': '< 30ms',
      'App Downloads': '350K+',
    },
  },
];

const blogs = [
  {
    title: 'The Shift to Headless Architecture in Enterprise Projects',
    slug: 'shift-to-headless-architecture-enterprise',
    excerpt: 'Why modern scaling companies are moving away from traditional CMS setups like WordPress to Next.js headless environments for superior speed, security, and developer experience.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Headless CMS', 'Web Performance'],
    author: 'Elena Rostova (Lead Architect)',
    readTime: '6 min read',
    content: `## Why Monoliths are Falling Behind

For years, monolithic CMS platforms like WordPress, Drupal, and Joomla powered the web. They provided a unified interface where templates, backend logic, and databases lived in one box. However, as the digital ecosystem scaled, these platforms created three major problems:

1. **Slow Page Loads**: The server has to process database queries and compile templates on every single request.
2. **Security Vulnerabilities**: Plugins, custom scripts, and monolith cores are constant targets for malicious attacks.
3. **Restricted Frontend Control**: Frontends are tightly coupled with the backend, limiting developers from utilizing modern tools like Tailwind CSS or advanced React architectures.

### Enter Headless Architecture

In a headless architecture, the frontend (the "head") is decoupled from the backend content storage (the "body"). They communicate entirely via fast, secure APIs.

Here are the key reasons why Sooftcode leverages headless React/Next.js for enterprise solutions:

* **Insane Performance**: Next.js uses Static Site Generation (SSG) and Incremental Static Regeneration (ISR) to compile HTML at build time, serving static pages instantly via CDNs.
* **Hardened Security**: Since there is no database connected directly to the user-facing web server, the attack surface is effectively reduced to zero.
* **Omnichannel Content**: Write your copy once in a CMS or database and consume it on web browsers, mobile apps, smart watches, and IoT terminals alike.

### Transitioning Effortlessly

Moving to headless doesn't mean starting from scratch or training your writers on coding. Modern headless CMS options (like Contentful, Sanity, or Strapi) provide beautiful editing dashboards, while Next.js handles the lightning-fast delivery. At Sooftcode, we build high-speed custom static layouts that hook into whichever content source you prefer, ensuring your organization achieves a 100/100 Lighthouse score.
`,
  },
  {
    title: 'Securing Node.js Express APIs: A Practical Production Guide',
    slug: 'securing-nodejs-express-apis-production-guide',
    excerpt: 'A checklist of critical configurations to harden your backend servers, mitigate rate-limit leaks, prevent SQL/NoSQL injection, and safely encrypt JWT payloads.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Custom Software',
    tags: ['Express', 'Node.js', 'API Security', 'JWT'],
    author: 'Marcus Vance (SecOps Specialist)',
    readTime: '8 min read',
    content: `## Securing Node.js APIs

Node.js combined with Express is a stellar framework for creating high-performance microservices. However, standard Express installations are highly verbose and insecure out of the box. Below is the production-grade checklist that Sooftcode implements for all server architectures.

### 1. Hardening Headers with Helmet

Helmet is a middleware that sets HTTP headers to guard against common vulnerabilities like cross-site scripting (XSS), clickjacking, and mime-type sniffing.

\`\`\`javascript
import helmet from 'helmet';
app.use(helmet());
\`\`\`

This automatically hides the \`X-Powered-By: Express\` response header, preventing attackers from identifying your tech stack.

### 2. Guarding Against DDoS with Rate Limiting

Without rate limiting, malicious users can trigger heavy database operations indefinitely, causing server memory exhaustion.

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests'
});

app.use('/api/', limiter);
\`\`\`

### 3. JWT Best Practices

JSON Web Tokens (JWT) are crucial for stateless authorization, but they must be handled correctly:
* **Never store sensitive data** (like passwords, roles, or phone numbers) in the JWT payload. It is base64 encoded and readable by anyone.
* **Keep expiration times short** (e.g., 15 minutes for access tokens) and implement secure refresh tokens.
* **Store tokens securely** on the client side using HTTP-only secure cookies rather than LocalStorage to prevent XSS theft.
`,
  },
  {
    title: 'Scaling Kubernetes Clusters for High Traffic Events',
    slug: 'scaling-kubernetes-clusters-high-traffic-events',
    excerpt: 'How we configured auto-scaling node groups, established request thresholds, and tuned Prometheus trackers to handle a 10x traffic spike for Aura Capital.',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud Solutions',
    tags: ['Kubernetes', 'AWS', 'DevOps', 'Docker', 'Cloud'],
    author: 'Rajesh Nair (VP DevOps)',
    readTime: '10 min read',
    content: `## Navigating Major Scaling Challenges

When preparing for heavy user spikes (such as product launches, stock trading windows, or black Friday events), waiting for servers to boot up manually is a recipe for system crashes. Kubernetes excels at orchestrating resources, but only when configured with proper auto-scaling formulas.

### 1. Horizontal Pod Autoscaler (HPA)

HPA automatically adjusts the number of replica pods running in your cluster based on CPU utilization or memory metrics.

For Aura Capital, we set CPU limits to trigger scaling at 70% threshold:
* Min Replicas: 3 Pods
* Max Replicas: 50 Pods

### 2. Node Group Cluster Autoscaling

Scaling pods is useless if your physical servers run out of CPU capacity. The Cluster Autoscaler works closely with AWS EC2 Auto Scaling Groups to provision fresh physical EC2 nodes automatically when pods enter a "Pending" schedule state.

### 3. Tuning Resource Budgets

Pods must specify explicit \`requests\` (minimum resources required) and \`limits\` (maximum resources allowed). Underestimating requests can cause node overloading, while overestimating them leads to wasted hosting budget.

At Sooftcode, we run load tests using tools like k6 to pinpoint exactly how much memory and CPU core fractions our applications require under pressure. This ensures we configure highly resilient cluster ecosystems that cost less and perform flawlessly.
`,
  },
];

const jobs = [
  {
    title: 'Senior Full-Stack Engineer (Next.js & Node)',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    salaryRange: '$130k - $165k',
    description: 'We are seeking a senior-level Full-Stack Developer to lead the development of our enterprise client web applications, dashboard modules, and API integrations.',
    requirements: [
      '5+ years experience building production React & Node applications',
      'Expertise in Next.js (App Router, ISR/SSG, middleware routing)',
      'Thorough knowledge of MongoDB, Mongoose schemas, and database query profiling',
      'Strong communication skills and experience working in agile environments',
    ],
    benefits: [
      'Fully remote work policy with $2,000 office setup allowance',
      'Unlimited Paid Time Off (PTO) with a mandatory 3-week minimum',
      'Comprehensive premium family medical, dental, and vision coverages',
      'Annual training & certifications budget',
    ],
  },
  {
    title: 'Lead Cloud Infrastructure Architect',
    department: 'Engineering',
    location: 'Hybrid (New York)',
    type: 'Full-time',
    salaryRange: '$160k - $200k',
    description: 'We are looking for a cloud architect to lead our devops operations, designing high-availability multi-region cluster architectures and automating security checking protocols.',
    requirements: [
      'AWS Certified Solutions Architect (Professional level)',
      '3+ years managing production Kubernetes environments',
      'In-depth knowledge of Terraform Infrastructure as Code (IaC) architectures',
      'Experience setting up Prometheus, Grafana, and ELK monitoring stacks',
    ],
    benefits: [
      'Top-tier salary with yearly bonus structures and equity allocation',
      'Chelsea-based modern office space with fully stocked kitchen',
      'Matched 401(k) retirement options up to 5%',
      'Premium gym and wellness memberships fully covered',
    ],
  },
  {
    title: 'Senior UI/UX Visual Designer',
    department: 'Design',
    location: 'Remote (USA or Europe)',
    type: 'Full-time',
    salaryRange: '$100k - $130k',
    description: 'Join our design system team to design stunning, premium client interface layouts, micro-interactions, components, and detailed brand guides.',
    requirements: [
      '4+ years UI/UX visual design experience with an active, stunning design portfolio',
      'Advanced Figma proficiency (autolayout, interactive component states, variable tokens)',
      'Experience designing custom graphics, SVG configurations, and vector animations',
      'Understanding of HTML/CSS/Tailwind styles is a solid benefit',
    ],
    benefits: [
      'Top-tier Apple hardware (MacBook Pro + Studio display configuration)',
      'Flexible working hours with core team alignment hours',
      '$150 monthly health & wellness allowance',
      'Two annual fully paid company retreats to resort locations',
    ],
  },
];

const seedData = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sooftcode';
    console.log('[Seeder] Connecting to MongoDB...');
    await mongoose.connect(dbUri);
    console.log('[Seeder] Connection successful. Cleaning collections...');

    // Clear existing data
    await User.deleteMany();
    await Blog.deleteMany();
    await Project.deleteMany();
    await Job.deleteMany();

    // Insert Users (hashing done pre-save)
    for (const u of users) {
      await User.create(u);
    }
    console.log('[Seeder] Admin User seeded successfully!');

    // Insert Projects
    await Project.insertMany(projects);
    console.log('[Seeder] Portfolio Projects seeded successfully!');

    // Insert Blogs
    await Blog.insertMany(blogs);
    console.log('[Seeder] Blog Articles seeded successfully!');

    // Insert Jobs
    await Job.insertMany(jobs);
    console.log('[Seeder] Career Job Listings seeded successfully!');

    console.log('[Seeder] Database Seeding Completed Successfully! 🚀');
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder] Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
