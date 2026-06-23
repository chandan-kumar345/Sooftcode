export interface ProjectData {
  id: string;
  _id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  displayCategory: string;
  duration: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  link?: string;
  status: 'Completed' | 'In Progress';
  features: string[];
  stats: Record<string, string>;
  howItWorks?: {
    step: number;
    title: string;
    description: string;
    icon: string;
  }[];
  challenges?: {
    title: string;
    description: string;
  }[];
  futureImprovements?: string[];
  gallery?: {
    type: 'image' | 'gif';
    url: string;
    caption: string;
  }[];
}

export const projects: ProjectData[] = [
  {
    id: 'ai-virtual-mouse',
    _id: 'ai-virtual-mouse',
    slug: 'ai-virtual-mouse',
    title: 'AI Virtual Mouse',
    client: 'Open Source Project',
    category: 'AI Solutions',
    displayCategory: 'Artificial Intelligence | Computer Vision | Python',
    duration: '2 Months',
    status: 'Completed',
    description: 'An AI-powered virtual mouse that allows users to control the computer cursor using real-time hand gestures captured through a webcam.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'],
    image: '/projects/ai-virtual-mouse.png',
    github: 'https://github.com/chandan-kumar345/AI-virtual-mouse',
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
      'Touch-free computer control'
    ],
    stats: {
      'Tracking Latency': '< 15ms',
      'Accuracy Rate': '98%',
      'Frame Rate': '30 FPS',
      'Lighting Adapt': 'Excellent'
    },
    howItWorks: [
      { step: 1, title: 'Webcam Capture', description: 'Webcam captures live video frames in real-time.', icon: 'Camera' },
      { step: 2, title: 'Frame Processing', description: 'OpenCV processes and flips the frames for natural mirroring.', icon: 'Video' },
      { step: 3, title: 'Hand Landmarks Detection', description: 'MediaPipe detects 21 hand landmarks dynamically.', icon: 'Hand' },
      { step: 4, title: 'Finger Positions Analysis', description: 'Tracks precise coordinates of index, middle, and thumb tips.', icon: 'Activity' },
      { step: 5, title: 'Gesture Identification', description: 'Recognizes gestures based on distances between landmarks.', icon: 'Fingerprint' },
      { step: 6, title: 'OS Event Mapping', description: 'PyAutoGUI translates recognized gestures into mouse event triggers.', icon: 'Cpu' },
      { step: 7, title: 'System Mouse Execution', description: 'System moves the cursor, clicks, drags, or scrolls accordingly.', icon: 'MousePointer' }
    ],
    challenges: [
      { title: 'Real-Time Hand Detection', description: 'Optimized MediaPipe detection and tracking confidence thresholds to prevent false positives and maintain lock under rapid movement.' },
      { title: 'Gesture Accuracy', description: 'Calibrated hand landmark distance ratios dynamically based on the distance between the hand and the camera, resolving scale variance.' },
      { title: 'Cursor Smoothing', description: 'Developed a custom exponential moving average filter to damp raw coordinate noises and eliminate cursor jitters.' },
      { title: 'False Click Prevention', description: 'Designed a double-confirmation click-lock window to ignore transient finger movements and prevent accidental clicks.' },
      { title: 'Performance Optimization', description: 'Leveraged vectorized calculations via NumPy for frame coordinate mapping, saving valuable CPU cycles.' },
      { title: 'Lighting Condition Handling', description: 'Implemented dynamic color thresholding to preserve hand detection stability in shadows and bright ambient lighting.' },
      { title: 'Frame Processing Efficiency', description: 'Decreased processing overhead by downscaling video input dimensions for MediaPipe without losing tracking fidelity.' }
    ],
    futureImprovements: [
      'Eye tracking support for cursor aiming coordination',
      'Voice commands integration to trigger special software actions',
      'Custom user-defined gesture mapping dashboard',
      'Multi-monitor coordinates scaling and cursor wraps',
      'AI-based adaptive gesture calibration for individual hand shapes',
      'Virtual keyboard integration for full text input support',
      'Cross-platform optimizations for native Linux and macOS builds'
    ],
    gallery: [
      { type: 'image', url: '/projects/ai-virtual-mouse.png', caption: 'Futuristic AI Virtual Mouse interface rendering.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', caption: 'Dynamic computer vision gesture tracking display mockup.' }
    ]
  },
  {
    id: 'aura-capital-trading-portal',
    _id: 'aura-capital-trading-portal',
    slug: 'aura-capital-trading-portal',
    title: 'Aura Capital Trading Portal',
    client: 'Aura Capital Group',
    category: 'Mobile App Development',
    displayCategory: 'Mobile App Development',
    duration: '6 Months',
    status: 'Completed',
    description: 'A premium, high-frequency stock trading and portfolio optimization application featuring sub-millisecond sync, interactive visualization graphs, and custom biometric security.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'WebSockets'],
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
    id: 'enterprise-devsecops-pipeline',
    _id: 'enterprise-devsecops-pipeline',
    slug: 'enterprise-devsecops-pipeline',
    title: 'Enterprise DevSecOps Pipeline',
    client: 'Nova Logistics Global',
    category: 'Cloud Solutions',
    displayCategory: 'Cloud Solutions',
    duration: '8 Months',
    status: 'Completed',
    description: 'Architected a multi-region, highly available, and auto-scaling Kubernetes cluster infrastructure incorporating automated CI/CD security scanning and Canary deployments.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
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
    id: 'zenith-ai-customer-intelligence',
    _id: 'zenith-ai-customer-intelligence',
    slug: 'zenith-ai-customer-intelligence',
    title: 'Zenith AI Customer Intelligence',
    client: 'Zenith Retail',
    category: 'AI Solutions',
    displayCategory: 'AI Solutions',
    duration: '4 Months',
    status: 'Completed',
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
    id: 'velo-crm-saas-platform',
    _id: 'velo-crm-saas-platform',
    slug: 'velo-crm-saas-platform',
    title: 'Velo CRM SaaS Platform',
    client: 'Velo Technologies',
    category: 'SaaS Development',
    displayCategory: 'SaaS Development',
    duration: '5 Months',
    status: 'Completed',
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
  }
];
