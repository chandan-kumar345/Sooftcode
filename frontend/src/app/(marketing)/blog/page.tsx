"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, User, Calendar, FolderOpen, ArrowRight } from 'lucide-react';
import { API_URL } from '@/context/AuthContext';

// Local blogs fallback
const fallbackBlogs = [
  {
    _id: '1',
    title: 'The Shift to Headless Architecture in Enterprise Projects',
    slug: 'shift-to-headless-architecture-enterprise',
    excerpt: 'Why modern scaling companies are moving away from traditional CMS setups like WordPress to Next.js headless environments for superior speed, security, and developer experience.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Headless CMS', 'Web Performance'],
    author: 'Elena Rostova (Lead Architect)',
    readTime: '6 min read',
    publishedAt: '2026-06-12T10:00:00Z',
  },
  {
    _id: '2',
    title: 'Securing Node.js Express APIs: A Practical Production Guide',
    slug: 'securing-nodejs-express-apis-production-guide',
    excerpt: 'A checklist of critical configurations to harden your backend servers, mitigate rate-limit leaks, prevent SQL/NoSQL injection, and safely encrypt JWT payloads.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Custom Software',
    tags: ['Express', 'Node.js', 'API Security', 'JWT'],
    author: 'Marcus Vance (SecOps Specialist)',
    readTime: '8 min read',
    publishedAt: '2026-06-10T12:00:00Z',
  },
  {
    _id: '3',
    title: 'Scaling Kubernetes Clusters for High Traffic Events',
    slug: 'scaling-kubernetes-clusters-high-traffic-events',
    excerpt: 'How we configured auto-scaling node groups, established request thresholds, and tuned Prometheus trackers to handle a 10x traffic spike for Aura Capital.',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud Solutions',
    tags: ['Kubernetes', 'AWS', 'DevOps', 'Docker', 'Cloud'],
    author: 'Rajesh Nair (VP DevOps)',
    readTime: '10 min read',
    publishedAt: '2026-06-08T09:30:00Z',
  },
];

const categories = ['All', 'Web Development', 'Custom Software', 'Cloud Solutions'];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs`);
        if (response.data?.success && response.data?.data?.length > 0) {
          setBlogs(response.data.data);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch (error) {
        console.warn('[Blog] API error. Using fallback static blogs:', error);
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCat = selectedCat === 'All' || blog.category.toLowerCase() === selectedCat.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Sooftcode Insights & Blog
          </h1>
          <p className="text-muted text-base sm:text-lg">
            Technical papers, cloud architecture optimization checklists, and development strategies written by our engineers.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-card-border/60">
          <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-card border border-card-border text-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full lg:max-w-xs flex items-center">
            <Search className="absolute left-3.5 text-muted w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs py-2.5 pl-10 pr-4 rounded-xl bg-card border border-input-border focus:outline-none focus:border-primary text-foreground"
            />
          </div>
        </div>

        {/* Blog listings grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl border border-card-border bg-card h-[380px] animate-pulse" />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <FolderOpen className="mx-auto text-muted w-10 h-10" />
            <h3 className="text-lg font-bold text-foreground">No Articles Located</h3>
            <p className="text-muted text-xs max-w-xs mx-auto">Try refining your selection filters or search query terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group rounded-3xl bg-card border border-card-border overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Banner image */}
                  <div className="h-48 relative overflow-hidden bg-muted">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-[9px] font-bold text-primary border border-card-border">
                      {blog.category}
                    </div>
                  </div>

                  {/* Body info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[10px] text-muted font-medium">
                      <span className="flex items-center space-x-1">
                        <User size={10} />
                        <span>{blog.author.split(' ')[0]}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-muted text-xs leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer and link */}
                <div className="p-6 pt-0 mt-4">
                  <div className="flex items-center justify-between pt-4 border-t border-card-border/50">
                    <span className="text-[10px] font-bold text-muted">
                      {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center text-xs font-bold text-primary space-x-1 hover:text-secondary transition-colors"
                    >
                      <span>Read article</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
