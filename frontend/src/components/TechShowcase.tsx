"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Database, Terminal, Server } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const getGlowColorForTechCategory = (category: string) => {
  if (category === 'frontend') return 'cyan';
  if (category === 'backend') return 'green';
  if (category === 'database') return 'yellow';
  return 'violet';
};


interface TechItem {
  name: string;
  description: string;
  benefits: string[];
  role: string;
  svg: React.ReactNode;
}

const techCategories: { [key: string]: { icon: any, label: string, items: TechItem[] } } = {
  frontend: {
    icon: Globe,
    label: 'Frontend',
    items: [
      {
        name: 'React',
        role: 'Component Engine',
        description: 'React serves as our core UI framework, facilitating component modularity, lightning-fast virtual DOM updates, and seamless rendering pipelines.',
        benefits: ['High Component Reusability', 'Virtual DOM Speed Sync', 'Vibrant Ecosystem & Extensions'],
        svg: (
          <svg className="w-16 h-16 text-cyan-400 animate-spin-slow" viewBox="-11.5 -10.23 23 20.46" fill="none">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        )
      },
      {
        name: 'Next.js',
        role: 'Production React Framework',
        description: 'Next.js is our choice for enterprise-level web sites, bringing automatic server-side rendering (SSR), incremental static regenerations, and native SEO protections.',
        benefits: ['100/100 Lighthouse Optimization', 'Edge Middleware Routing', 'Image & Layout Load Optimizers'],
        svg: (
          <svg className="w-16 h-16 text-foreground" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="6"/>
            <path d="M140.5 145.5L78.5 67.5H66V124.5H76V82.5L132.5 145.5H140.5Z" fill="currentColor"/>
            <rect x="114" y="67.5" width="10" height="57" fill="currentColor"/>
          </svg>
        )
      }
    ]
  },
  backend: {
    icon: Server,
    label: 'Backend',
    items: [
      {
        name: 'Node.js',
        role: 'Asynchronous Runtime',
        description: 'Node.js provides a robust, non-blocking asynchronous event loop runtime environment, powering highly scalable web backends and microservices.',
        benefits: ['High-throughput execution', 'Unified Frontend/Backend language', 'Massive package directory via npm'],
        svg: (
          <svg className="w-16 h-16 text-green-500" viewBox="0 0 256 295" fill="none">
            <path d="M128 0L242.3 66V198L128 264L13.7 198V66L128 0Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="10"/>
            <path d="M128 40V224M128 40L190 76V148L128 184" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      },
      {
        name: 'Express.js',
        role: 'Server Framework',
        description: 'Express is a minimal and flexible Node.js web application framework, supplying a robust set of features for web and mobile APIs.',
        benefits: ['Stateless JWT Integrations', 'Middleware-Driven Pipelines', 'Fast REST API Endpoint Mapping'],
        svg: (
          <svg className="w-16 h-16 text-foreground" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="10" width="80" height="80" rx="20" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="6"/>
            <text x="50%" y="55%" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="bold">EX</text>
          </svg>
        )
      }
    ]
  },
  database: {
    icon: Database,
    label: 'Database',
    items: [
      {
        name: 'MongoDB',
        role: 'NoSQL Data Engine',
        description: 'MongoDB stores JSON-like documents, facilitating seamless schema modifications, fast read/write times, and horizontal clustering capacity.',
        benefits: ['Dynamic Schema flexibility', 'Mongoose ODM data validation', 'High Speed Aggregation pipelines'],
        svg: (
          <svg className="w-16 h-16 text-green-600" viewBox="0 0 100 100" fill="none">
            <path d="M50 5C50 5 30 30 30 55C30 75 42 90 50 95C58 90 70 75 70 55C70 30 50 5C50 5Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="6"/>
            <path d="M50 5V95" stroke="currentColor" strokeWidth="4"/>
          </svg>
        )
      }
    ]
  },
  devops: {
    icon: Terminal,
    label: 'DevOps & Cloud',
    items: [
      {
        name: 'AWS',
        role: 'Cloud Infrastructure',
        description: 'Amazon Web Services is our hosting framework, offering secure computing instances, scalable S3 buckets, and multi-region database fallback protocols.',
        benefits: ['Global CDNs & DNS Speed', 'Automated Database Backups', '99.99% Infrastructure SLA'],
        svg: (
          <svg className="w-16 h-16 text-orange-500" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="10" width="80" height="80" rx="20" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="6"/>
            <path d="M25 55C35 62 65 62 75 55" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            <path d="M70 52L76 56L72 62" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      },
      {
        name: 'Docker',
        role: 'Container Registry',
        description: 'Docker isolates components in lightweight virtual containers, ensuring matching operations across developer environments, staging builds, and production runs.',
        benefits: ['Immutable Environment packages', 'Sub-second start-up processes', 'Easy configuration replication'],
        svg: (
          <svg className="w-16 h-16 text-blue-500" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="40" width="80" height="40" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="6"/>
            <rect x="25" y="20" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="4"/>
            <rect x="44" y="20" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="4"/>
            <rect x="63" y="20" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="4"/>
          </svg>
        )
      },
      {
        name: 'Kubernetes',
        role: 'Container Orchestrator',
        description: 'Kubernetes orchestrates our Docker node deployments, managing scaling thresholds, network routes, and self-healing cluster recovery loops.',
        benefits: ['Zero-Downtime Rollouts', 'Automatic Service Discovery', 'Self-Healing pod configurations'],
        svg: (
          <svg className="w-16 h-16 text-indigo-500" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5"/>
            <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" stroke="currentColor" strokeWidth="5" fill="none"/>
            <circle cx="50" cy="50" r="10" fill="currentColor"/>
          </svg>
        )
      }
    ]
  }
};

export default function TechShowcase() {
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <section className="py-20 bg-card border-y border-card-border transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">Enterprise Stack</h2>
          <p className="text-3xl sm:text-4xl font-bold font-sans text-foreground">
            Our Standard Development Ecosystem
          </p>
          <p className="text-muted text-sm mt-3">
            We rely on battle-tested, highly performant technologies to deploy scalable solutions.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {Object.entries(techCategories).map(([key, category]) => {
            const Icon = category.icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'bg-background hover:bg-background/80 text-muted border border-card-border hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-background border border-card-border shadow-sm min-h-[350px] flex items-center justify-center relative overflow-hidden">
          {/* Inner Accent Blur */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full glow-primary opacity-50 z-0 pointer-events-none" />
          
          <div className="relative z-10 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {techCategories[activeTab].items.map((tech, i) => (
                  <GlowCard
                    key={i}
                    glowColor={getGlowColorForTechCategory(activeTab)}
                    customSize={true}
                    className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-6 sm:space-y-0 sm:space-x-8 p-6 border border-card-border/40"
                  >
                    <div className="flex-shrink-0 bg-background p-4 rounded-2xl border border-card-border flex items-center justify-center w-24 h-24 z-10">
                      {tech.svg}
                    </div>
                    
                    <div className="space-y-3 z-10">
                      <div>
                        <h4 className="text-xl font-extrabold text-foreground">{tech.name}</h4>
                        <span className="text-xs text-primary font-medium tracking-wide">{tech.role}</span>
                      </div>
                      <p className="text-muted text-sm leading-relaxed">{tech.description}</p>
                      
                      <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                        {tech.benefits.map((b, bi) => (
                          <span key={bi} className="px-2.5 py-0.5 rounded-lg bg-background text-foreground/80 border border-card-border/60 text-[10px] font-semibold">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
