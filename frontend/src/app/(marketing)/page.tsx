"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import TechShowcase from '@/components/TechShowcase';
import StatsSection from '@/components/StatsSection';

interface GithubIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github = ({ size = 16, ...props }: GithubIconProps) => (
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
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import { API_URL } from '@/context/AuthContext';
import { GlowCard } from '@/components/ui/spotlight-card';
import { projects as fallbackProjects } from '@/data/projects';

const getGlowColorForProject = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('mobile')) return 'blue';
  if (cat.includes('cloud')) return 'purple';
  if (cat.includes('ai') || cat.includes('intelligence')) return 'orange';
  return 'cyan';
};

export default function HomePage() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects.slice(0, 3));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        if (response.data?.success && response.data?.data?.length > 0) {
          const merged = [...fallbackProjects];
          response.data.data.forEach((apiProj: any) => {
            const index = merged.findIndex(localProj => localProj.title.toLowerCase() === apiProj.title.toLowerCase());
            if (index !== -1) {
              merged[index] = {
                ...merged[index],
                ...apiProj,
                slug: merged[index].slug,
                id: apiProj._id,
                _id: apiProj._id,
                github: merged[index].github,
                displayCategory: merged[index].displayCategory || merged[index].category,
              };
            }
          });
          setProjects(merged.slice(0, 3));
        } else {
          setProjects(fallbackProjects.slice(0, 3));
        }
      } catch (error) {
        console.warn('[Home Page] API offline or error. Using fallback static projects:', error);
        setProjects(fallbackProjects.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full relative">
      
      {/* 1. Hero landing section */}
      <Hero />

      {/* 2. Core services showcase */}
      <ServicesGrid />

      {/* 3. Tech Stack section */}
      <TechShowcase />

      {/* 4. Why Choose Us Timeline */}
      <section className="py-20 bg-background transition-colors duration-300 relative overflow-hidden">
        {/* Glow blur background */}
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full glow-primary opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">Our Core Philosophy</h2>
            <p className="text-3xl sm:text-4xl font-bold font-sans text-foreground">
              Why Global Enterprises Choose Sooftcode
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual process flowchart mockup */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-primary flex items-center space-x-1.5 uppercase">
                <Sparkles size={14} className="animate-pulse" />
                <span>Our Engineering Methodology</span>
              </span>
              <h3 className="text-3xl font-extrabold text-foreground">
                How We Take Projects From Conception to Scale
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                We design and engineer client products using a secure, structured flow. This approach prevents configuration discrepancies, guarantees zero regression bugs, and aligns with enterprise requirements.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { title: "1. Consultation & Design", desc: "Detailed technical mapping, wireframes, and database schema diagrams." },
                  { title: "2. Secure Architecting", desc: "Setting up sandboxed Docker modules and CI/CD automated test integrations." },
                  { title: "3. Incremental Delivery", desc: "Developing code in focused sprints, pushing updates to staging servers." },
                  { title: "4. Deployment & Maintenance", desc: "Provisioning AWS clusters with Kubernetes orchestrators." }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3.5 p-4 rounded-2xl bg-card border border-card-border/60">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{step.title}</h4>
                      <p className="text-muted text-xs mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side illustration panel */}
            <div className="p-8 sm:p-10 rounded-3xl bg-card border border-card-border/80 relative flex flex-col justify-between min-h-[400px] shadow-sm">
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <h4 className="text-2xl font-bold text-foreground">Operational Guarantees</h4>
                <p className="text-muted text-sm leading-relaxed">
                  We verify every system before rollout. At Sooftcode, we stand by the quality of our systems with operational assurances:
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    "All code compiles with strict TypeScript rules.",
                    "Comprehensive accessibility audits (WCAG 2.1 compliance).",
                    "Load tested for up to 500,000 active WebSocket requests.",
                    "Direct Git version control access to all deliverables."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2.5 text-sm">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-foreground/90 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-card-border/60 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-primary tracking-wider">Need Custom Details?</p>
                  <p className="text-xs text-muted">Read our technical whitepapers</p>
                </div>
                <Link
                  href="/about"
                  className="px-4 py-2 rounded-xl bg-background hover:bg-card border border-card-border text-xs font-semibold text-foreground flex items-center space-x-1 hover:text-primary transition-all"
                >
                  <span>About our practices</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Statistics section */}
      <StatsSection />

      {/* 6. Portfolio Preview Carousel */}
      <section className="py-20 bg-card border-y border-card-border transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-16 gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">Recent Works</h2>
              <p className="text-3xl font-bold font-sans text-foreground">
                Software Solutions in Action
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mt-4 rounded-full mx-auto sm:mx-0" />
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary space-x-1.5 transition-colors cursor-pointer group"
            >
              <span>View Full Case Studies Database</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Simple skeleton rows
              [...Array(3)].map((_, i) => (
                <div key={i} className="rounded-3xl border border-card-border bg-background/50 h-[380px] animate-pulse" />
              ))
            ) : (
              projects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  className="h-full flex cursor-pointer"
                >
                  <GlowCard
                    glowColor={getGlowColorForProject(proj.category)}
                    customSize={true}
                    className="group rounded-3xl overflow-hidden flex flex-col justify-between w-full h-full border border-card-border/60"
                  >
                    <div className="flex-grow flex flex-col justify-between h-full">
                      <div>
                        {/* Visual Card Image */}
                        <div className="h-48 relative overflow-hidden bg-muted">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/95 backdrop-blur-sm text-[10px] font-bold text-primary border border-card-border">
                            {proj.category}
                          </div>
                        </div>

                        <div className="p-6 space-y-3">
                          <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Client: {proj.client}</span>
                          <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {proj.title}
                          </h4>
                          <p className="text-muted text-xs leading-relaxed line-clamp-3">
                            {proj.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0 mt-4 space-y-4">
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-card-border/50">
                          {proj.tags.slice(0, 3).map((t: string, ti: number) => (
                            <span key={ti} className="px-2 py-0.5 rounded-lg bg-card text-foreground/80 border border-card-border/40 text-[9px] font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-2">
                          {proj.github ? (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-xl bg-background border border-card-border hover:border-primary text-muted hover:text-primary transition-all flex items-center justify-center cursor-pointer"
                              title="GitHub Code"
                            >
                              <Github size={16} />
                            </a>
                          ) : (
                            <div className="w-9 h-9" />
                          )}

                          <Link
                            href={`/projects/${proj.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2 rounded-xl btn-liquid-secondary text-foreground text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer"
                          >
                            <span>View Details</span>
                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* 7. Client Testimonials */}
      <Testimonials />

      {/* 8. Contact Form & Info Block */}
      <section className="py-20 bg-background transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Context Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-semibold tracking-wider text-primary uppercase">Connect with us</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                  Ready to Accelerate Your Enterprise Pipeline?
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  Connect with a Technical Solutions Consultant to scope application features, estimate cloud infrastructure scaling workloads, or arrange automated pipeline audits.
                </p>
              </div>

              {/* Office Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-card border border-card-border/80">
                  <h4 className="font-bold text-foreground text-sm">Corporate Office HQ</h4>
                  <p className="text-muted text-xs mt-2 leading-relaxed">
                    Suite 800, Tech Towers,
                    <br />
                    100 Broadway,
                    <br />
                    New York, NY 10005
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-card-border/80">
                  <h4 className="font-bold text-foreground text-sm">Direct Channels</h4>
                  <p className="text-muted text-xs mt-2 leading-relaxed">
                    General: contact@sooftcode.com
                    <br />
                    Careers: talent@sooftcode.com
                    <br />
                    Consultations: book@sooftcode.com
                  </p>
                </div>
              </div>

              {/* Core Promise Cards */}
              <div className="p-6 rounded-2xl border border-dashed border-card-border/80 flex items-start space-x-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Layers size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Immediate Collaboration Agreement</h4>
                  <p className="text-muted text-xs mt-1 leading-relaxed">
                    We establish NDA arrangements prior to deep-dive architecture audits, protecting your corporate intellectual property assets from the start.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Form Component */}
            <div>
              <ContactForm />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
