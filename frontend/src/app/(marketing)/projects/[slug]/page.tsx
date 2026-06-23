"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { GlowCard } from '@/components/ui/spotlight-card';
import { 
  ArrowLeft, ExternalLink, Calendar, Briefcase, Sparkles, Check, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Activity, Camera, 
  Video, Cpu, MousePointer, Hand, Fingerprint, Star, GitFork, BookOpen, Clock
} from 'lucide-react';
import Link from 'next/link';

interface GithubIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github = ({ size = 18, ...props }: GithubIconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    width={size} 
    height={size} 
    className="inline-block" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-3" />
  </svg>
);

// Icon mapping for Step-by-Step timeline
const iconMap: Record<string, React.ComponentType<any>> = {
  Camera: Camera,
  Video: Video,
  Hand: Hand,
  Activity: Activity,
  Fingerprint: Fingerprint,
  Cpu: Cpu,
  MousePointer: MousePointer
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);

  // Find project matching the slug
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 px-6">
        <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
          <BookOpen size={28} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-center">Case Study Not Located</h1>
        <p className="text-muted text-sm max-w-sm text-center">
          We could not find a case study with slug "{slug}". Please check the URL or return to the portfolio.
        </p>
        <button
          onClick={() => router.push('/portfolio')}
          className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </button>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  } as const;

  return (
    <div className="w-full py-10 md:py-16 space-y-16 md:space-y-24 relative overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full glow-primary opacity-[0.08] dark:opacity-[0.12] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-[500px] h-[500px] rounded-full glow-accent opacity-[0.05] dark:opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Navigation back */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <Link
            href="/portfolio"
            className="group flex items-center space-x-2 text-xs font-bold text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PORTFOLIO</span>
          </Link>
        </motion.div>

        {/* 1. HERO SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase border border-primary/20 tracking-wider">
                {project.category}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-extrabold uppercase border border-green-500/20 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span>{project.status}</span>
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] font-sans"
            >
              {project.title}
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {project.description}
            </motion.p>

            {/* Tech Badges */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Core Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 rounded-xl bg-card border border-card-border/80 text-xs font-bold text-foreground/90 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-foreground text-background font-bold text-xs flex items-center space-x-2 hover:scale-[1.03] transition-all shadow-md cursor-pointer"
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.link && project.link !== project.github && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full btn-liquid text-white font-bold text-xs flex items-center space-x-2 hover:scale-[1.03] transition-all shadow-md cursor-pointer"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Hero Banner Image */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-accent opacity-15 blur-xl -z-10" />
            <div className="rounded-3xl border border-card-border overflow-hidden bg-card/40 backdrop-blur-md shadow-2xl p-2">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[380px] rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* 2. ABOUT PROJECT SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-10"
        >
          {/* Explanations */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xs font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5">
              <Sparkles size={14} className="animate-pulse" />
              <span>Project Overview & Vision</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Translating Computer Vision Into Natural Interactions
            </h3>
            
            <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed">
              <p>
                The <strong>AI Virtual Mouse</strong> is an innovative computer vision solution developed in Python. It is designed to act as a human-computer interface (HCI) that replaces the traditional physical mouse hardware with touchless, real-time hand gestures.
              </p>
              <p>
                Using a standard computer webcam, the application captures a live video stream. The system continually feeds these frames into <strong>MediaPipe</strong>, which uses machine learning to isolate the hand and extract the precise 3D spatial coordinates of 21 landmark nodes on the hand. 
              </p>
              <p>
                These coordinates are processed with <strong>OpenCV</strong> to normalize spatial scaling and screen mapping ratios. When specific finger coordinate patterns (gestures) are identified—such as bringing the index and middle fingers together—the system interprets the action and triggers native OS mouse actions programmatically using <strong>PyAutoGUI</strong>. This provides users with natural, responsive, and tactile control over cursor tracking, click types, dragging, and scrolling.
              </p>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="lg:col-span-4 rounded-3xl bg-card border border-card-border p-6 sm:p-8 space-y-6 shadow-sm">
            <h4 className="font-extrabold text-foreground text-sm uppercase tracking-wider border-b border-card-border/60 pb-3">
              Case Study Metrics
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-2"><Briefcase size={14} /> Client</span>
                <span className="font-bold text-foreground">{project.client}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-2"><Clock size={14} /> Duration</span>
                <span className="font-bold text-foreground">{project.duration}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-2"><Calendar size={14} /> Year</span>
                <span className="font-bold text-foreground">2026</span>
              </div>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-card-border/50">
              <h5 className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">Performance Indicators</h5>
              {Object.entries(project.stats).map(([key, val]) => (
                <div key={key} className="p-3 rounded-2xl bg-background border border-card-border/60 flex items-center justify-between shadow-inner">
                  <span className="text-[10px] text-muted font-bold">{key}</span>
                  <span className="text-xs font-extrabold text-primary">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 3. KEY FEATURES */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-10 pt-10"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">Core Capacities</h2>
            <h3 className="text-3xl font-extrabold text-foreground">Robust Gesture Controls</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {project.features.map((feat, idx) => (
              <GlowCard 
                key={idx}
                glowColor="cyan"
                customSize={true}
                className="p-5 flex flex-col justify-between min-h-[120px] rounded-2xl border border-card-border/60 bg-card hover:-translate-y-1 transition-all"
              >
                <div className="space-y-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  <h4 className="font-bold text-foreground text-xs sm:text-sm leading-tight">{feat}</h4>
                </div>
                <span className="text-[9px] font-bold text-muted uppercase tracking-wider block pt-2 mt-2 border-t border-card-border/40">Feature {idx + 1}</span>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* 4. HOW IT WORKS TIMELINE */}
        {project.howItWorks && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12 pt-10"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">Operations Flow</h2>
              <h3 className="text-3xl font-extrabold text-foreground">Step-By-Step Mechanics</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
            </div>

            <div className="relative max-w-4xl mx-auto pl-8 sm:pl-0">
              {/* Vertical timeline center line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-card-border/60 -translate-x-1/2 hidden sm:block" />
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-card-border/60 block sm:hidden" />

              <div className="space-y-12 relative">
                {project.howItWorks.map((step, idx) => {
                  const IconComp = iconMap[step.icon] || Sparkles;
                  const isLeft = idx % 2 === 0;

                  return (
                    <motion.div 
                      key={step.step}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className={`flex flex-col sm:flex-row items-stretch sm:justify-between relative ${
                        isLeft ? '' : 'sm:flex-row-reverse'
                      }`}
                    >
                      {/* Left/Right Container */}
                      <div className="w-full sm:w-[45%] flex flex-col justify-center">
                        <div className="p-6 rounded-2xl bg-card border border-card-border/80 shadow-sm space-y-3 hover:shadow-md transition-shadow relative">
                          <span className="text-xs font-extrabold text-primary">0{step.step}.</span>
                          <h4 className="font-extrabold text-foreground text-sm sm:text-base">{step.title}</h4>
                          <p className="text-muted text-xs leading-relaxed">{step.description}</p>
                        </div>
                      </div>

                      {/* Center Point Icon */}
                      <div className="absolute left-4 sm:left-1/2 top-6 sm:top-1/2 w-8 h-8 rounded-full bg-primary text-white border-4 border-background flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg shadow-primary/20">
                        <IconComp size={12} />
                      </div>

                      {/* Spacer for structure */}
                      <div className="hidden sm:block w-[45%]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* 5. ARCHITECTURE SECTION (WORKFLOW DIAGRAM) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12 pt-10"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">Pipeline Integration</h2>
            <h3 className="text-3xl font-extrabold text-foreground">System Architecture Workflow</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-card/30 border border-card-border backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-color bg-[size:20px_20px] rounded-3xl -z-10" />
            
            {/* Horizontally scrollable container with customized drag hint */}
            <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <div className="flex flex-row items-center justify-between gap-4 min-w-[900px] relative px-4 py-2">
                {[
                  { name: 'Webcam', desc: 'Video Input Capture' },
                  { name: 'OpenCV', desc: 'Frame Pre-processing' },
                  { name: 'MediaPipe', desc: 'Landmark Extraction' },
                  { name: 'Gesture Recog.', desc: 'State Matrix Calculations' },
                  { name: 'PyAutoGUI', desc: 'Native OS API Mapping' },
                  { name: 'Mouse Control', desc: 'System Events Output' }
                ].map((node, nIdx) => (
                  <React.Fragment key={node.name}>
                    {/* Node Card */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: nIdx * 0.1 }}
                      className="p-5 rounded-2xl bg-card border border-card-border text-center min-w-[140px] shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                      <h5 className="font-extrabold text-foreground text-xs">{node.name}</h5>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-snug">{node.desc}</p>
                    </motion.div>

                    {/* Connecting Arrow */}
                    {nIdx < 5 && (
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-1 text-primary">
                          <motion.div 
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                          >
                            <ChevronRight size={18} className="text-primary opacity-60" />
                          </motion.div>
                          <div className="w-6 h-0.5 bg-card-border/60 relative overflow-hidden">
                            <motion.div 
                              className="absolute inset-0 bg-primary/80"
                              animate={{ left: ['-100%', '100%'] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6. TECHNOLOGIES USED SECTION */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-10 pt-10"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">Stack Composition</h2>
            <h3 className="text-3xl font-extrabold text-foreground">Technologies Implemented</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { name: 'Python', role: 'Programming Language' },
              { name: 'OpenCV', role: 'Computer Vision API' },
              { name: 'MediaPipe', role: 'Machine Learning ML' },
              { name: 'PyAutoGUI', role: 'System OS Events' },
              { name: 'NumPy', role: 'Array Calculations' },
              { name: 'Computer Vision', role: 'Concept / Mechanics' },
              { name: 'AI', role: 'Spatial Analytics' }
            ].map((tech, tIdx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: tIdx * 0.05 }}
                className="p-5 rounded-2xl bg-card border border-card-border text-center flex flex-col justify-center items-center space-y-2 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {tech.name.substring(0, 2)}
                </div>
                <h5 className="font-extrabold text-foreground text-xs leading-none">{tech.name}</h5>
                <p className="text-[9px] text-muted-foreground leading-normal">{tech.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. CHALLENGES & SOLUTIONS SECTION */}
        {project.challenges && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-10 pt-10"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">Engineering Resolution</h2>
              <h3 className="text-3xl font-extrabold text-foreground">Key Technical Challenges Solved</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.challenges.map((chal, cIdx) => (
                <div 
                  key={cIdx}
                  className="p-6 rounded-3xl bg-card border border-card-border space-y-3 relative overflow-hidden group hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-primary">
                      <ShieldCheck size={18} />
                      <h4 className="font-extrabold text-foreground text-xs sm:text-sm uppercase tracking-wide">Challenge {cIdx + 1}</h4>
                    </div>
                    <h5 className="font-extrabold text-foreground text-sm sm:text-base leading-tight group-hover:text-primary transition-colors">{chal.title}</h5>
                    <p className="text-muted text-xs leading-relaxed">{chal.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold text-xs mt-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 8. FUTURE IMPROVEMENTS */}
        {project.futureImprovements && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-10 pt-10"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">Expansion Roadmap</h2>
              <h3 className="text-3xl font-extrabold text-foreground">Future Product Enhancements</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {project.futureImprovements.map((imp, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-card border border-card-border/80 flex items-start space-x-3 hover:-translate-y-0.5 transition-transform">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-foreground/90 font-medium text-xs leading-normal">{imp}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 9. GALLERY SECTION */}
        {project.gallery && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-10 pt-10"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">Visual Showcase</h2>
              <h3 className="text-3xl font-extrabold text-foreground">Interface Gallery & Demos</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {project.gallery.map((gal, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveLightbox(gal.url)}
                  className="rounded-3xl border border-card-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer relative group"
                >
                  <div className="h-60 sm:h-72 relative bg-muted overflow-hidden">
                    <img
                      src={gal.url}
                      alt={gal.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold px-4 py-2 rounded-full bg-primary/80 backdrop-blur-sm">
                        Enlarge Image
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-card-border/60 bg-card">
                    <p className="text-muted text-xs leading-snug text-center">{gal.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 10. GITHUB OVERVIEW CARD */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-10"
        >
          <div className="max-w-4xl mx-auto">
            <GlowCard 
              glowColor="purple"
              customSize={true}
              className="rounded-3xl border border-card-border/80 bg-card p-6 sm:p-10 shadow-xl overflow-hidden relative"
            >
              {/* Mock GitHub Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-card-border/60 pb-6 mb-6">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center">
                    <Github size={24} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-lg sm:text-xl flex items-center gap-1.5 leading-none">
                      <span>chandan-kumar345 / AI-virtual-mouse</span>
                    </h4>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">Public Repository</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1.5 rounded-full bg-background border border-card-border/80 text-[10px] font-bold text-muted flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span>GitHub Starred</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-background border border-card-border/80 text-[10px] font-bold text-muted flex items-center gap-1">
                    <GitFork size={12} />
                    <span>Open Source</span>
                  </span>
                </div>
              </div>

              {/* Repo Body Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-4">
                  <h5 className="font-extrabold text-foreground text-sm uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen size={14} />
                    <span>Repository Overview</span>
                  </h5>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed">
                    This repository hosts the complete source code, coordinate mapping models, gesture definition scripts, and environment presets for the virtual mouse system. Included in the documentation are calibration guides, coordinate scaling matrices, and threshold configurations.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Shell'].map((l) => (
                      <span key={l} className="px-2.5 py-0.5 rounded-md bg-background text-[9px] font-semibold border border-card-border text-foreground/80">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-3">
                  <a
                    href="https://github.com/chandan-kumar345/AI-virtual-mouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl btn-liquid text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-md shadow-primary/10 transition-all cursor-pointer"
                  >
                    <Github size={14} />
                    <span>Checkout Repository</span>
                  </a>
                  <a
                    href="https://github.com/chandan-kumar345/AI-virtual-mouse/archive/refs/heads/main.zip"
                    className="w-full py-3 rounded-xl btn-liquid-secondary text-foreground/90 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <span>Download Source ZIP</span>
                  </a>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightbox(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] z-10 flex flex-col items-center"
            >
              <button 
                onClick={() => setActiveLightbox(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary font-bold text-xs bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              >
                Close Visualizer ✕
              </button>
              
              <img 
                src={activeLightbox} 
                alt="Enlarged visual element" 
                className="w-auto h-auto max-w-full max-h-[75vh] rounded-2xl border border-white/10 shadow-2xl object-contain"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
