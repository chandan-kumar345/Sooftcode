"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, User } from 'lucide-react';

const milestones = [
  { year: '2018', title: 'Sooftcode Foundation', desc: 'Established by two cloud infrastructure engineers focused on robust microservices.' },
  { year: '2020', title: 'Fintech Portal Success', desc: 'Developed sub-millisecond stock sync frameworks, scaling team to 20+ engineers.' },
  { year: '2022', title: 'DevSecOps & Compliance Rollout', desc: 'Introduced automated vulnerability scanners and strict CI/CD pipelines as client standards.' },
  { year: '2024', title: 'AI Integration Division', desc: 'Launched AI models, LLM routing logic, and vector database structures for client portals.' },
  { year: '2026', title: 'Global Software Consulting Leader', desc: 'Servicing 50+ enterprise partners worldwide with 99.99% infrastructure uptime.' }
];

const values = [
  { icon: ShieldCheck, title: 'Absolute Security', desc: 'Every pipeline runs automated static audits, securing databases at the core.' },
  { icon: Target, title: 'Results Oriented', desc: 'We do not sell abstract code. We deliver real-world KPIs: latency cuts, cost trims, and load speeds.' },
  { icon: Eye, title: 'Total Transparency', desc: 'Access to dev sprints, direct Jira tracking, and sandboxed sandbox previews.' },
  { icon: Heart, title: 'Craftsmanship Integrity', desc: 'Preserving strict TypeScript types, optimized queries, and complete styling variables.' }
];

const team = [
  { name: 'Elena Rostova', role: 'CEO & Head of Architecture', bio: 'Former Principal Architect at AWS. Passionate about multi-region Kubernetes clusters.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Marcus Vance', role: 'VP of Cybersecurity', bio: 'CISSP Certified SecOps specialist. Oversees API hardening and penetration testing.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Rajesh Nair', role: 'VP of DevOps Operations', bio: 'Terraform and orchestration expert. Guarantees 99.99% uptime cluster designs.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sarah Jenkins', role: 'Lead Product Designer', bio: 'Visionary interface designer creating glassmorphism interfaces and design tokens.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' }
];

export default function AboutPage() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            About Sooftcode
          </h1>
          <p className="text-muted text-base sm:text-lg">
            Engineering premium software products, cloud infrastructures, and intelligence systems since 2018.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Founding Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Mission & Background</h2>
            <p className="text-muted text-sm leading-relaxed">
              Sooftcode was founded in 2018 by engineers who noticed a widening gap in the market. While enterprises needed complex cloud migrations, custom backend architectures, and AI integrations, many consulting firms delivered low-performance boilerplate templates.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              We built Sooftcode with a strict engineering core. Every developer on our team holds certifications in AWS cloud setups, React compilations, or Kubernetes administration. We treat software as an exact science, prioritizing latency, security, and developer ergonomics.
            </p>
            <div className="p-5 rounded-2xl bg-card border border-card-border/80 flex items-start space-x-3.5">
              <span className="text-primary font-bold text-lg">“</span>
              <p className="text-sm font-medium text-foreground italic">
                We believe that enterprise software should not be sluggish or insecure. Our goal is to craft premium systems that help our clients lead their industries.
              </p>
            </div>
          </div>
          
          <div className="relative h-[350px] rounded-3xl overflow-hidden bg-card border border-card-border shadow-md">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Sooftcode Team Collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Core Guarantees</h2>
            <p className="text-muted text-xs">The pillars that define our daily operational decisions.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-card-border shadow-sm flex flex-col items-center text-center space-y-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <v.icon size={20} />
                </div>
                <h3 className="font-bold text-foreground text-sm">{v.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chronological Timeline */}
        <div className="space-y-16 py-12 relative overflow-hidden">
          {/* Timeline center line */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-card-border hidden lg:block" />
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Sooftcode Milestone Timeline</h2>
            <p className="text-muted text-xs">Tracking our trajectory from inception to scaling leader.</p>
          </div>

          <div className="space-y-12 relative">
            {milestones.map((m, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center justify-between ${
                idx % 2 === 0 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Empty side for spacing in layout */}
                <div className="w-full lg:w-[45%] hidden lg:block" />
                
                {/* Year Badge Node */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center font-bold text-xs shadow-md z-10 my-4 lg:my-0">
                  {m.year}
                </div>

                {/* Timeline Card */}
                <div className="w-full lg:w-[45%] p-6 rounded-2xl bg-card border border-card-border shadow-sm space-y-2">
                  <h3 className="font-bold text-foreground text-sm">{m.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Leadership Team</h2>
            <p className="text-muted text-xs">Certified experts directing our software delivery process.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="group rounded-3xl bg-card border border-card-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-56 relative overflow-hidden bg-muted">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-[10px] text-white/95 font-semibold leading-relaxed">Certified Professional</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-2">
                  <div>
                    <h4 className="font-bold text-foreground text-base">{t.name}</h4>
                    <span className="text-xs text-primary font-semibold">{t.role}</span>
                  </div>
                  <p className="text-muted text-xs leading-relaxed">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
