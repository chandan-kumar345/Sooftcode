"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderOpen, ExternalLink, Calendar, Briefcase, Award, X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { API_URL } from '@/context/AuthContext';
import { projects as fallbackProjects } from '@/data/projects';
import { GlowCard } from '@/components/ui/spotlight-card';

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

const getGlowColorForProject = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('mobile')) return 'blue';
  if (cat.includes('cloud')) return 'purple';
  if (cat.includes('ai') || cat.includes('intelligence')) return 'orange';
  if (cat.includes('saas')) return 'pink';
  return 'cyan';
};

const categories = [
  'All',
  'Custom Software',
  'Web Development',
  'Mobile App Development',
  'SaaS Development',
  'Cloud Solutions',
  'AI Solutions'
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

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
            } else {
              merged.push({
                ...apiProj,
                id: apiProj._id,
                _id: apiProj._id,
                slug: apiProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
              });
            }
          });
          setProjects(merged);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.warn('[Portfolio] API Error, loaded fallback projects', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      project.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Custom Software' && project.category === 'Custom Software') ||
      (selectedCategory === 'Mobile App Development' && project.category === 'Mobile App Development');
      
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Case Studies Portfolio
          </h1>
          <p className="text-muted text-base sm:text-lg">
            A track record of high-performance architectures, secure backends, and scale-up engineering.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-card-border/60">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-card border border-card-border text-muted hover:text-foreground hover:bg-card-border/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full lg:max-w-xs flex items-center">
            <Search className="absolute left-3.5 text-muted w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack, client, key..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs py-2.5 pl-10 pr-4 rounded-xl bg-card border border-input-border focus:outline-none focus:border-primary text-foreground"
            />
          </div>
        </div>

        {/* Grid Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl border border-card-border bg-card h-[380px] animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <FolderOpen className="mx-auto text-muted w-12 h-12" />
            <h3 className="text-lg font-bold text-foreground">No Case Studies Located</h3>
            <p className="text-muted text-xs max-w-xs mx-auto">Please refine your category tabs selection or search parameters keywords.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj._id}
                  layoutId={`proj-card-${proj._id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedProject(proj)}
                  className="cursor-pointer h-full flex"
                >
                  <GlowCard
                    glowColor={getGlowColorForProject(proj.category)}
                    customSize={true}
                    className="group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col justify-between w-full h-full border border-card-border/60"
                  >
                    <div className="flex-grow flex flex-col justify-between h-full">
                      <div>
                        {/* Cover Image */}
                        <div className="h-48 relative overflow-hidden bg-muted">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-[9px] font-bold text-primary border border-card-border">
                            {proj.category}
                          </div>
                        </div>

                        <div className="p-6 space-y-2">
                          <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Client: {proj.client}</span>
                          <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                            {proj.title}
                          </h3>
                          <p className="text-muted text-xs leading-relaxed line-clamp-3">
                            {proj.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0 mt-4 space-y-4">
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-card-border/50">
                          {proj.tags.slice(0, 4).map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 rounded-lg bg-background text-foreground/80 border border-card-border/50 text-[9px] font-semibold">
                              {tag}
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
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Case Study Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              layoutId={`proj-card-${selectedProject._id}`}
              className="relative w-full max-w-4xl rounded-3xl bg-card border border-card-border shadow-2xl overflow-y-auto max-h-[90vh] z-10 flex flex-col"
            >
              {/* Image banner */}
              <div className="h-64 relative bg-muted flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X size={18} />
                </button>
                
                <div className="absolute bottom-6 left-8 space-y-1.5 text-white">
                  <span className="px-2.5 py-0.5 rounded-md bg-primary text-[10px] font-bold tracking-wide uppercase">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Contents grid */}
              <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main description and features checklist */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Project Scope & Challenge</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Features list */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="space-y-4 p-6 rounded-2xl bg-background border border-card-border/60">
                      <span className="text-[10px] font-bold text-primary flex items-center space-x-1.5 uppercase">
                        <Sparkles size={12} />
                        <span>Core Features Implemented</span>
                      </span>
                      <ul className="space-y-3">
                        {selectedProject.features.map((feat: string, fi: number) => (
                          <li key={fi} className="flex items-start space-x-2.5 text-xs text-foreground/90 leading-relaxed">
                            <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Sidebar Project Metrics and Links */}
                <div className="space-y-8 lg:border-l lg:border-card-border/60 lg:pl-10">
                  {/* Meta stats */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2.5 text-xs text-muted">
                      <Briefcase size={14} />
                      <span>Client: <span className="font-semibold text-foreground">{selectedProject.client}</span></span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-xs text-muted">
                      <Calendar size={14} />
                      <span>Duration: <span className="font-semibold text-foreground">{selectedProject.duration}</span></span>
                    </div>
                  </div>

                  {/* KPI Metrics */}
                  {selectedProject.stats && Object.keys(selectedProject.stats).length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-card-border/50">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Project Metrics (KPIs)</h4>
                      <div className="space-y-3.5">
                        {Object.entries(selectedProject.stats).map(([k, v]: [string, any]) => (
                          <div key={k} className="p-3.5 rounded-xl bg-background border border-card-border/60 flex items-center justify-between">
                            <span className="text-[10px] text-muted font-medium">{k}</span>
                            <span className="text-sm font-extrabold text-primary">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* External links */}
                  {selectedProject.link && (
                    <div className="pt-4 border-t border-card-border/50">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl btn-liquid text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-primary/20 transition-all"
                      >
                        <span>Visit Live Platform</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
