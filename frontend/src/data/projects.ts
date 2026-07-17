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
  aboutTitle?: string;
  aboutDescription?: string[];
  architectureWorkflow?: { name: string; desc: string }[];
  techStackDetailed?: { name: string; role: string }[];
  githubRepo?: string;
  githubDescription?: string;
  logo?: string;
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
    ],
    aboutTitle: 'Translating Computer Vision Into Natural Interactions',
    aboutDescription: [
      'The AI Virtual Mouse is an innovative computer vision solution developed in Python. It is designed to act as a human-computer interface (HCI) that replaces the traditional physical mouse hardware with touchless, real-time hand gestures.',
      'Using a standard computer webcam, the application captures a live video stream. The system continually feeds these frames into MediaPipe, which uses machine learning to isolate the hand and extract the precise 3D spatial coordinates of 21 landmark nodes on the hand.',
      'These coordinates are processed with OpenCV to normalize spatial scaling and screen mapping ratios. When specific finger coordinate patterns (gestures) are identified—such as bringing the index and middle fingers together—the system interprets the action and triggers native OS mouse actions programmatically using PyAutoGUI. This provides users with natural, responsive, and tactile control over cursor tracking, click types, dragging, and scrolling.'
    ],
    architectureWorkflow: [
      { name: 'Webcam', desc: 'Video Input Capture' },
      { name: 'OpenCV', desc: 'Frame Pre-processing' },
      { name: 'MediaPipe', desc: 'Landmark Extraction' },
      { name: 'Gesture Recog.', desc: 'State Matrix Calculations' },
      { name: 'PyAutoGUI', desc: 'Native OS API Mapping' },
      { name: 'Mouse Control', desc: 'System Events Output' }
    ],
    techStackDetailed: [
      { name: 'Python', role: 'Programming Language' },
      { name: 'OpenCV', role: 'Computer Vision API' },
      { name: 'MediaPipe', role: 'Machine Learning ML' },
      { name: 'PyAutoGUI', role: 'System OS Events' },
      { name: 'NumPy', role: 'Array Calculations' },
      { name: 'Computer Vision', role: 'Concept / Mechanics' },
      { name: 'AI', role: 'Spatial Analytics' }
    ],
    githubRepo: 'chandan-kumar345/AI-virtual-mouse',
    githubDescription: 'This repository hosts the complete source code, coordinate mapping models, gesture definition scripts, and environment presets for the virtual mouse system. Included in the documentation are calibration guides, coordinate scaling matrices, and threshold configurations.'
  },
  {
    id: 'aniverse-anime-portal',
    _id: 'aniverse-anime-portal',
    slug: 'aniverse-anime-portal',
    logo: '/projects/aniverse-logo.png',
    title: 'AniVerse - Anime Streaming Portal',
    client: 'AniVerse Community (Open Source)',
    category: 'Web Development',
    displayCategory: 'Web Development | Next.js | TypeScript | GraphQL',
    duration: '3 Months',
    status: 'Completed',
    description: 'A state-of-the-art anime tracker and streaming platform featuring high-fidelity media players, comprehensive anime discovery schemas, and a social tracking dashboard.',
    tags: ['Next.js', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Framer Motion', 'Hls.js'],
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/chandan-kumar345/AniVerse',
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
      'Lighthouse Score': '98/100'
    },
    howItWorks: [
      { step: 1, title: 'User Discovery', description: 'Users browse trending anime dynamically with advanced filters.', icon: 'Search' },
      { step: 2, title: 'API Aggregation', description: 'Next.js fetches rich metadata from AniList GraphQL servers.', icon: 'Database' },
      { step: 3, title: 'Custom Player Sync', description: 'HLS players adapt bitrate based on user network speed.', icon: 'Video' },
      { step: 4, title: 'Social Interactions', description: 'Users write reviews and rank titles within their profile dashboard.', icon: 'MessageSquare' }
    ],
    challenges: [
      { title: 'GraphQL Performance Tuning', description: 'Optimized queries by fetching only critical node fields, decreasing payload sizes by 40%.' },
      { title: 'Adaptive Bitrate Control', description: 'Configured Hls.js buffer thresholds to resolve video stuttering on slow mobile connections.' },
      { title: 'Rich Animation Syncing', description: 'Leveraged Framer Motion layout animations without causing frame drops or high CPU load.' }
    ],
    futureImprovements: [
      'Offline download support for mobile app wrappers',
      'AI-powered personalized anime recommendation engine',
      'Real-time watch party sync rooms with voice chat integration'
    ],
    gallery: [
      { type: 'image', url: '/projects/aniverse-logo.png', caption: 'AniVerse dynamic metal logo design.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', caption: 'AniVerse portal exploration UI design.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80', caption: 'Custom video player interface with subtitles track selection.' }
    ],
    aboutTitle: 'Revolutionizing Anime Exploration and Media Streaming',
    aboutDescription: [
      'AniVerse is a high-performance anime web application built using modern web standards. It acts as an immersive center for anime enthusiasts to search, track, and watch their favorite titles seamlessly in a beautifully designed next-generation interface.',
      'By integrating with the AniList GraphQL API, AniVerse aggregates rich metadata including detailed characters profile, voice actor information, user reviews, and seasonal schedules. The application leverages Next.js server-side rendering for search engine optimization and instant page transitions.',
      'The core media system features a customizable video player built on HLS (HTTP Live Streaming) streaming protocols, offering adaptive bitrate playback. User accounts, custom list syncing, and rating history are tracked via standard session tokens, providing a unified social experience.'
    ],
    architectureWorkflow: [
      { name: 'Browser Client', desc: 'Next.js & Framer Motion UI' },
      { name: 'Next.js Server', desc: 'SSR & Page Caching' },
      { name: 'GraphQL Gateway', desc: 'AniList API Aggregator' },
      { name: 'Media CDN', desc: 'HLS Stream Provider' },
      { name: 'Storage DB', desc: 'Session & Watchlist Sync' },
      { name: 'User Screen', desc: 'Dynamic Media Player' }
    ],
    techStackDetailed: [
      { name: 'Next.js', role: 'Frontend React Framework' },
      { name: 'TypeScript', role: 'Static Code Architecture' },
      { name: 'GraphQL', role: 'Dynamic Data Queries' },
      { name: 'Tailwind CSS', role: 'Utility styling classes' },
      { name: 'Hls.js', role: 'Adaptive Bitrate Player' },
      { name: 'Framer Motion', role: 'Micro-animations & transitions' },
      { name: 'Node.js', role: 'Middleware & Services' }
    ],
    githubRepo: 'chandan-kumar345/AniVerse',
    githubDescription: 'This repository hosts the AniVerse frontend codebase built with Next.js and TypeScript, using AniList API for metadata and Hls.js for stream rendering.'
  },
  {
    id: 'roamify-travel-booking',
    _id: 'roamify-travel-booking',
    slug: 'roamify-travel-booking',
    title: 'Roamify - Travel Booking Platform',
    client: 'Roamify International LLC',
    category: 'Web Development',
    displayCategory: 'Web Development | Next.js | Tailwind CSS | Prisma',
    duration: '4 Months',
    status: 'Completed',
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
      'User Return Rate': '42%'
    },
    howItWorks: [
      { step: 1, title: 'Search Query', description: 'Users specify dates and search destinations visually on a map.', icon: 'Search' },
      { step: 2, title: 'Aggregation Search', description: 'Aggregator fetches real-time prices for flights and hotels.', icon: 'Globe' },
      { step: 3, title: 'Custom Itinerary', description: 'Drag-and-drop builder helps create a step-by-step holiday calendar.', icon: 'Activity' },
      { step: 4, title: 'Transaction Checkout', description: 'Stripe processes multi-currency checkout and generates tickets.', icon: 'Lock' }
    ],
    challenges: [
      { title: 'Mapbox Render Lag', description: 'Implemented spatial coordinate cluster algorithms to render 10,000+ listings without lag.' },
      { title: 'Real-time Collaborative Sync', description: 'Used lightweight WebSockets channels to instantly sync itinerary updates across devices.' },
      { title: 'Aggregator Data Sync', description: 'Built redis cache layers to store fast-changing price requests, avoiding duplicate API calls.' }
    ],
    futureImprovements: [
      'AI-driven custom trip generator based on user preferences',
      'Weather forecasting overlay in the itinerary view',
      'Offline booking tickets access via progressive web app'
    ],
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', caption: 'Roamify destination explorer landing interface.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', caption: 'Itinerary visual planner displaying hotels and booked flights.' }
    ],
    aboutTitle: 'Redefining Travel Planning with Immersive Experiences',
    aboutDescription: [
      'Roamify is a premium travel web application built to inspire and simplify the holiday planning process. The platform brings hotel listings, flight data, and local itineraries together in one unified, visual design.',
      'By integrating Mapbox GL, users can view nearby spots, local restaurants, and custom tour packages dynamically as they drag their map viewport. A collaborative planner allows multiple users to co-create travel schedules in real-time, matching slots with their travel partners.',
      'Security and transaction reliability are key. The platform runs on PostgreSQL with transactional scaling through Prisma, processing Stripe bookings with automated webhooks that generate PDF tickets and email itineraries immediately.'
    ],
    architectureWorkflow: [
      { name: 'Web Browser', desc: 'React & Tailwind Client' },
      { name: 'Next.js Server', desc: 'API Routes & SSR Engine' },
      { name: 'Redis Cache', desc: 'Price Feed Caching' },
      { name: 'Aggregator API', desc: 'External Flights & Hotels' },
      { name: 'Prisma ORM', desc: 'PostgreSQL database client' },
      { name: 'Stripe API', desc: 'Secure Checkout Processor' }
    ],
    techStackDetailed: [
      { name: 'Next.js', role: 'Application Shell & Server rendering' },
      { name: 'Prisma', role: 'Type-safe database connector' },
      { name: 'PostgreSQL', role: 'Scalable database storage' },
      { name: 'Mapbox GL', role: 'Geospatial maps and pins' },
      { name: 'Stripe', role: 'Payment processing infrastructure' },
      { name: 'Tailwind CSS', role: 'Premium layout styles' },
      { name: 'Redis', role: 'Query results cache layer' }
    ]
  },
  {
    id: 'apex-pos-system',
    _id: 'apex-pos-system',
    slug: 'apex-pos-system',
    title: 'Apex POS - Cloud Point of Sale',
    client: 'Apex Retail Solutions',
    category: 'SaaS Development',
    displayCategory: 'SaaS Development | React | Node.js | Electron',
    duration: '5 Months',
    status: 'Completed',
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
      'Offline Buffer': '30 Days'
    },
    howItWorks: [
      { step: 1, title: 'Scanning & Cart', description: 'Cashier scans items, updating inventory state instantly.', icon: 'Activity' },
      { step: 2, title: 'Payment Gateways', description: 'Calculates price and processes payment using integrated credit terminals.', icon: 'Wifi' },
      { step: 3, title: 'Offline Storage', description: 'If connection is lost, stores invoice details locally on disk.', icon: 'Database' },
      { step: 4, title: 'Central Sync', description: 'Automatically syncs invoices to the cloud DB once reconnected.', icon: 'Server' }
    ],
    challenges: [
      { title: 'Offline Database Sync', description: 'Resolved data merge conflicts by implementing a vector-clock versioning strategy during cloud sync.' },
      { title: 'Hardware Communication', description: 'Configured Electron serial port listeners to stabilize barcode scanner connections.' },
      { title: 'Cart UI Latency', description: 'Memoized cart calculations in React to eliminate render lag during large bulk orders.' }
    ],
    futureImprovements: [
      'AI-based dynamic pricing suggestions for seasonal sales',
      'Mobile POS application wrapper for inventory audits',
      'Direct integration with international shipping couriers'
    ],
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', caption: 'Apex POS desktop interface for cashiers.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', caption: 'Sales analytics and inventory monitoring dashboard panel.' }
    ],
    aboutTitle: 'Securing Retail Transactions Anywhere, Anytime',
    aboutDescription: [
      'Apex POS is a premium, lightning-fast point of sale application designed for modern retail environments. The application operates both in a native desktop shell (Electron) and standard web browsers, ensuring cashiers can process transactions smoothly.',
      'The core engineering highlight is the offline-first synchronization architecture. If internet connectivity drops, the system continues database writes to a secure local SQLite database. Once online, a background sync service reconciles records with the central MongoDB cluster using transactional operations.',
      'The user interface is optimized for rapid cashier interactions, supporting full hotkey navigation, barcode inputs, dynamic taxes, and instantaneous receipt generation. Managers receive analytical insights regarding daily profit margins and stock alerts.'
    ],
    architectureWorkflow: [
      { name: 'POS Terminal', desc: 'Electron App Interface' },
      { name: 'Local DB', desc: 'Offline SQLite Engine' },
      { name: 'Sync Engine', desc: 'Reconciliation Service' },
      { name: 'Backend API', desc: 'Express.js Controller' },
      { name: 'Cloud Database', desc: 'MongoDB Central Cluster' },
      { name: 'Analytics Engine', desc: 'Dashboard Reporting' }
    ],
    techStackDetailed: [
      { name: 'React', role: 'Dynamic User Interface' },
      { name: 'Electron', role: 'Desktop application wrapper' },
      { name: 'SQLite', role: 'Local storage database' },
      { name: 'Express.js', role: 'Central API Server' },
      { name: 'MongoDB', role: 'Scale-out transaction storage' },
      { name: 'Chart.js', role: 'Business analytics charts' },
      { name: 'Tailwind CSS', role: 'Responsive layout styling' }
    ]
  },
  {
    id: 'voxai-voice-assistant',
    _id: 'voxai-voice-assistant',
    slug: 'voxai-voice-assistant',
    title: 'VoxAI - Conversational Voice Assistant',
    client: 'VoxAI Labs (SaaS Tool)',
    category: 'AI Solutions',
    displayCategory: 'AI Solutions | Python | WebSocket | Whisper | GPT-4',
    duration: '3 Months',
    status: 'Completed',
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
      'Noise Cancel': '-35dB'
    },
    howItWorks: [
      { step: 1, title: 'Capture & VAD', description: 'System captures audio, stripping silence and background noise.', icon: 'Mic' },
      { step: 2, title: 'Whisper STT', description: 'Transcribes speech to text in real-time.', icon: 'Cpu' },
      { step: 3, title: 'LLM Reasoning', description: 'GPT-4 parses instructions and creates replies.', icon: 'Activity' },
      { step: 4, title: 'Synthesized Speech', description: 'TTS generates audio bytes, streaming them back.', icon: 'Video' }
    ],
    challenges: [
      { title: 'Audio Lag Reduction', description: 'Transitioned from file-based processing to WebSocket audio streams, cutting latency by 65%.' },
      { title: 'VAD Calibration', description: 'Designed thresholds to ignore keyboard clicks and background noise, focusing on speech.' },
      { title: 'State Consistency', description: 'Created a redis chat session memory to hold GPT-4 context without increasing latency.' }
    ],
    futureImprovements: [
      'Local offline voice synthesis using tiny LLM weights',
      'Custom voice model cloning based on user uploads',
      'Visual face avatar tracking matching synthesized speech'
    ],
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80', caption: 'VoxAI visual assistant waves dashboard.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', caption: 'Real-time speech waveform and transcription visualization interface.' }
    ],
    aboutTitle: 'Translating Human Speech Into Instant Software Actions',
    aboutDescription: [
      'VoxAI is an advanced voice assistant built to enable touchless, natural conversational control over computers and connected smart APIs. It operates over a WebSocket channel to achieve real-time, low-latency audio interaction.',
      'The pipeline begins with the client streaming raw audio bytes to a FastAPI backend. A custom WebRTC VAD (Voice Activity Detection) filter processes the audio, removing silence. It then sends voice packets to the OpenAI Whisper API for speech transcription.',
      'The transcribed query is processed by GPT-4 with a conversation-state history. The model outputs a text response, which is fed directly into a local TTS engine, converting text to natural audio streams returned to the client browser.'
    ],
    architectureWorkflow: [
      { name: 'Voice Client', desc: 'Web Audio API Recorder' },
      { name: 'WebSocket Server', desc: 'FastAPI Stream Orchestrator' },
      { name: 'VAD Filter', desc: 'WebRTC Voice Detector' },
      { name: 'Whisper API', desc: 'Speech-to-Text translation' },
      { name: 'GPT-4 Engine', desc: 'Instruction & Reply compiler' },
      { name: 'TTS Synthesis', desc: 'Coqui Audio Synthesizer' }
    ],
    techStackDetailed: [
      { name: 'FastAPI', role: 'WebSocket backend runner' },
      { name: 'Whisper', role: 'Speech-to-Text engine' },
      { name: 'GPT-4', role: 'Language modeling & reasoning' },
      { name: 'Coqui TTS', role: 'Text-to-Speech audio compiler' },
      { name: 'WebSockets', role: 'Bidirectional streaming conduit' },
      { name: 'Redis', role: 'Chat memory database client' },
      { name: 'WebRTC VAD', role: 'Voice Activity Detection filter' }
    ]
  },
  {
    id: 'soulsync-dating-platform',
    _id: 'soulsync-dating-platform',
    slug: 'soulsync-dating-platform',
    title: 'SoulSync - Dating App & Platform',
    client: 'SoulSync Dating Networks',
    category: 'Mobile App Development',
    displayCategory: 'Mobile App Development | Flutter | Node.js | Socket.io',
    duration: '6 Months',
    status: 'Completed',
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
      'Safety Verify Rate': '94.6%'
    },
    howItWorks: [
      { step: 1, title: 'Account Creation', description: 'User uploads profile details, video, and interests.', icon: 'Camera' },
      { step: 2, title: 'Geo Matching', description: 'System indexes user position and filters nearby profiles.', icon: 'Globe' },
      { step: 3, title: 'WebSocket Chat', description: 'Once a match is made, a secure chat channel opens.', icon: 'MessageSquare' },
      { step: 4, title: 'Safety Check', description: 'Users check verification badges for trusted matches.', icon: 'Lock' }
    ],
    challenges: [
      { title: 'Geospatial Scaling', description: 'Optimized MongoDB index bounds, lowering query times from 2s to 40ms.' },
      { title: 'WebSocket Scaling', description: 'Implemented Redis pub/sub adapters to spread Socket.io traffic across servers.' },
      { title: 'Smooth Swipe Render', description: 'Tuned Flutter gesture physics to achieve a 120 FPS card swiping interface.' }
    ],
    futureImprovements: [
      'AI conversational openers to break the ice',
      'Direct integration with local event platforms for dates',
      'Interactive virtual date environments via browser games'
    ],
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80', caption: 'SoulSync discovery matching interface mockup.' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1516110156329-2a3e9866657f?auto=format&fit=crop&w=800&q=80', caption: 'Real-time WebSocket chat and multimedia message interface.' }
    ],
    aboutTitle: 'Bridging Distances to Foster Meaningful Human Connections',
    aboutDescription: [
      'SoulSync is a dating app and website platform built to match people securely. Available as a Flutter mobile application and responsive web app, the service integrates matching algorithms with chat and video profiles.',
      'To connect nearby users, the backend utilizes GeoJSON indexes in MongoDB to calculate distances between user coordinates. A dynamic swipe interface provides smooth micro-interactions that trigger WebSocket match alerts.',
      'Safety is built-in. Users verify accounts using an automated AI facial recognition API that compares their profile photos with a live selfie check. All chats run over Socket.io, backed by automated keyword screens to prevent spam.'
    ],
    architectureWorkflow: [
      { name: 'Mobile / Web Client', desc: 'Flutter & React interface' },
      { name: 'API Server', desc: 'Node.js & Express framework' },
      { name: 'Real-time Gateway', desc: 'Socket.io Websocket server' },
      { name: 'Database Engine', desc: 'MongoDB Cluster with Geospatial indexes' },
      { name: 'Cache Adapter', desc: 'Redis Pub/Sub scaling' },
      { name: 'Transcoder Engine', desc: 'Video Profile transcoder' }
    ],
    techStackDetailed: [
      { name: 'Flutter', role: 'Cross-platform mobile client' },
      { name: 'React', role: 'Responsive web layout' },
      { name: 'Node.js', role: 'Microservices API core' },
      { name: 'MongoDB', role: 'Flexible data model & Geo indexes' },
      { name: 'Socket.io', role: 'WebSocket communications client' },
      { name: 'Redis', role: 'Message broker scale-out layer' },
      { name: 'FFmpeg', role: 'Video file encoding profiles' }
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
