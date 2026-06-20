"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileCode, Globe, Smartphone, Layers, ShieldCheck, Cloud, Brain, ArrowRight } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const glowColorMapForServices = (colorStr: string) => {
  if (colorStr.includes('blue') && !colorStr.includes('cyan')) return 'blue';
  if (colorStr.includes('purple')) return 'pink';
  if (colorStr.includes('green')) return 'green';
  if (colorStr.includes('orange')) return 'orange';
  if (colorStr.includes('yellow')) return 'yellow';
  if (colorStr.includes('cyan')) return 'cyan';
  if (colorStr.includes('violet')) return 'violet';
  return 'blue' as const;
};


const services = [
  {
    title: 'Custom Software Development',
    description: 'We construct tailored backend architectures, API integrations, and robust database systems that sync with your operational workflows.',
    icon: FileCode,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Web Development',
    description: 'Beautiful, high-speed, SEO-optimized frontends built using React and Next.js, yielding optimal speed performance scores.',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform iOS and Android apps crafted using React Native or Flutter, ensuring fluid 60FPS UI animations.',
    icon: Smartphone,
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'SaaS Development',
    description: 'End-to-end multi-tenant platform architecting, featuring customizable subscription setups, Stripe invoice automation, and detailed data isolation.',
    icon: Layers,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'QA Automation Testing',
    description: 'Automated Playwright, Cypress, and Selenium testing suites built to check APIs and frontends, eliminating deployment downtime.',
    icon: ShieldCheck,
    color: 'from-yellow-500 to-amber-600',
  },
  {
    title: 'Cloud Solutions',
    description: 'Auto-scaling AWS, Azure, or GCP infrastructure configurations with Docker containers and Kubernetes orchestrators.',
    icon: Cloud,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'AI Solutions',
    description: 'Custom Large Language Model (LLM) agents, LangChain pipeline automations, semantic data storage, and intelligent search implementations.',
    icon: Brain,
    color: 'from-violet-500 to-fuchsia-600',
  },
];

export default function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 18,
      } as const,
    },
  };

  return (
    <section className="py-20 bg-background transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">What We Excel In</h2>
          <p className="text-3xl sm:text-4xl font-bold font-sans text-foreground">
            Enterprise-Grade Services Built for Modern Scale
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="h-full flex"
            >
              <GlowCard
                glowColor={glowColorMapForServices(service.color)}
                customSize={true}
                className="group p-8 rounded-3xl flex flex-col justify-between w-full h-full border border-card-border/60"
              >
                <div className="space-y-6">
                  {/* Icon box */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <service.icon size={22} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-card-border/60">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary space-x-1 transition-colors"
                  >
                    <span>Explore Service details</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
