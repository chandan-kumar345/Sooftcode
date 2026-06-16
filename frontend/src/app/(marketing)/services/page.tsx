"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Globe, Smartphone, Layers, ShieldCheck, Cloud, Brain, 
  Check, ChevronDown, HelpCircle, Sparkles 
} from 'lucide-react';

const serviceDetails = [
  {
    icon: FileCode,
    title: 'Custom Software Development',
    description: 'Engineering resilient, scalable, and secure applications custom-fitted to your internal business processes.',
    deliverables: ['Custom API creation & gateway integrations', 'Modular backend engines (Node/Express/Nest)', 'NoSQL and SQL schema designs', 'Legacy codebase refactoring & modernization'],
    stack: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'PostgreSQL'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Deploying high-speed, interactive, and fully responsive user interfaces optimized for modern web standards.',
    deliverables: ['Next.js App Router frontends', 'Tailwind CSS responsive design', 'State-of-the-art micro-animations via Framer Motion', 'SEO tags & accessibility alignments (WCAG)'],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Crafting premium iOS and Android applications utilizing cross-platform native wrapper architectures.',
    deliverables: ['Cross-platform layout rendering', 'Offline-first SQLite local syncing capabilities', 'Biometric login and phone feature hooks', 'App Store and Google Play deployment management'],
    stack: ['React Native', 'Flutter', 'TypeScript', 'Expo', 'SQLite'],
  },
  {
    icon: Layers,
    title: 'SaaS Development',
    description: 'Architecting multi-tenant, cloud-hosted platforms configured for software subscription setups.',
    deliverables: ['Multi-tenant isolated databases configurations', 'Stripe customer portals and recurring invoice routines', 'Granular role-based user dashboards', 'Analytics modules detailing client consumption rates'],
    stack: ['Next.js', 'Node.js', 'Stripe API', 'MongoDB', 'Redis'],
  },
  {
    icon: ShieldCheck,
    title: 'QA Automation Testing',
    description: 'Establishing continuous quality check frameworks that scan frontends, APIs, and databases.',
    deliverables: ['Automated browser validation runs (Playwright)', 'Continuous integration workflow checks (GitHub Actions)', 'Stateless API load testing runs', 'Strict unit coverage reporting (Jest)'],
    stack: ['Playwright', 'Cypress', 'Jest', 'GitHub Actions', 'Docker'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions & DevSecOps',
    description: 'Designing highly redundant, auto-scaling, and secure microservices cloud layouts.',
    deliverables: ['Terraform Infrastructure as Code (IaC) architectures', 'Docker container packages', 'Kubernetes pod orchestration configs', 'AWS multi-region fallback configurations'],
    stack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus'],
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Integrating artificial intelligence routines into business applications using Large Language Models.',
    deliverables: ['LLM agent configurations and prompt routing', 'LangChain orchestration integrations', 'Vector databases embeddings creation (Pinecone)', 'Retrieval-Augmented Generation (RAG) modules'],
    stack: ['Python', 'LangChain', 'OpenAI API', 'Pinecone', 'FastAPI'],
  },
];

const faqs = [
  {
    question: "What is your consulting onboarding timeframe?",
    answer: "For standard custom projects, we typically arrange initial scoping and NDA setups within 3 business days. We follow this up with detailed system design schemas and cost estimates within 5-7 business days."
  },
  {
    question: "How do you guarantee code security during development?",
    answer: "Every repository is configured with static application security testing (SAST) in CI/CD pipelines. This scans third-party packages for dependencies vulnerabilities, enforces lint checks, and audits variables configurations automatically."
  },
  {
    question: "Do you offer post-launch maintenance SLA guarantees?",
    answer: "Yes. Sooftcode provides premium Service Level Agreements (SLA) ranging from general updates assistance to 24/7 server monitoring node recoveries, assuring 99.99% system uptime."
  },
  {
    question: "Can we integrate Sooftcode developers into our existing team?",
    answer: "We support both independent end-to-end project deliveries and team augmentation models where our senior architects join your internal Slack/Git pipelines directly."
  }
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Our Services & Engineering Capability
          </h1>
          <p className="text-muted text-base sm:text-lg">
            High-performance, secure, and production-ready architectures custom-fit for modern scale.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Services Detail List */}
        <div className="space-y-16">
          {serviceDetails.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className={`p-8 sm:p-12 rounded-3xl bg-card border border-card-border shadow-sm flex flex-col lg:flex-row gap-12 items-start justify-between relative overflow-hidden`}
              >
                {/* Visual Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full glow-accent opacity-20 pointer-events-none" />

                <div className="space-y-6 lg:max-w-xl">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-foreground">{service.title}</h2>
                    <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                  </div>

                  {/* Badges Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.stack.map((tech, ti) => (
                      <span key={ti} className="px-3 py-1 rounded-xl bg-background border border-card-border text-xs text-foreground/80 font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables Checklist Column */}
                <div className="w-full lg:max-w-md space-y-4 p-6 rounded-2xl bg-background border border-card-border/60">
                  <span className="text-[10px] font-bold text-primary flex items-center space-x-1.5 uppercase">
                    <Sparkles size={12} className="animate-pulse" />
                    <span>Deliverables Checklist</span>
                  </span>
                  <ul className="space-y-3 pt-2">
                    {service.deliverables.map((item, di) => (
                      <li key={di} className="flex items-start space-x-3 text-xs leading-relaxed text-foreground/90">
                        <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs Accordion Segment */}
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <HelpCircle className="mx-auto text-primary w-10 h-10 animate-float" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted text-xs">Clear answers detailing contract cycles and operations.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="rounded-2xl bg-card border border-card-border shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 flex justify-between items-center text-left font-bold text-foreground text-sm sm:text-base cursor-pointer hover:bg-card-border/10 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-muted"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-6 pt-0 text-muted text-xs sm:text-sm leading-relaxed border-t border-card-border/40 bg-background/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
