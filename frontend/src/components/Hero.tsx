"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Cpu, CloudLightning } from 'lucide-react';
import Typewriter from '@/components/Typewriter';
import { GridGlowBackground } from '@/components/ui/grid-glow-background';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      } as const,
    },
  };

  return (
    <GridGlowBackground
      className="min-h-[90vh] py-16 md:py-24"
      backgroundColor="transparent"
      gridColor="rgba(255, 255, 255, 0.02)"
      glowColors={["rgba(74, 0, 224, 0.25)", "rgba(142, 45, 226, 0.25)", "rgba(74, 0, 224, 0.15)"]}
      glowCount={10}
      gridSize={60}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto"
        >
          {/* Top Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide backdrop-blur-md"
          >
            <Cpu size={12} className="animate-spin-slow" />
            <span>Latest AI Technologies for Business Growth</span>
          </motion.div>

          {/* Main Headline with Typewriter */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight text-foreground leading-[1.15] sm:leading-[1.1]"
          >
            Transforming Ideas Into{" "}
            <br className="hidden sm:inline" />
            <Typewriter
              words={['Next-Gen AI Solutions', 'Smart Business Automations', 'Advanced AI Engines', 'Intelligent Cloud Systems', 'Custom Software Platform']}
            />
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted max-w-3xl leading-relaxed"
          >
            We harness the latest AI technologies and cutting-edge software engineering to build intelligent, scalable solutions that drive measurable business growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto px-12 py-5 rounded-full btn-liquid text-white font-bold text-lg shadow-xl shadow-primary/30 transition-all flex items-center justify-center space-x-2.5 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Get Started</span>
              <ArrowUpRight size={20} />
            </Link>

            <Link
              href="/contact?type=consultation"
              className="w-full sm:w-auto px-10 py-5 btn-liquid-secondary font-bold text-lg shadow-md transition-all flex items-center justify-center space-x-2.5 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Book Consultation</span>
            </Link>
          </motion.div>

          {/* Core Values / Features bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 md:pt-16 w-full max-w-3xl border-t border-card-border/40 mt-12"
          >
            {[
              { icon: ShieldCheck, label: "Enterprise Security", desc: "Military-grade standard protocols" },
              { icon: CloudLightning, label: "Cloud Scalability", desc: "Docker & Kubernetes ready" },
              { icon: Cpu, label: "AI Integrated Systems", desc: "Large Language Model automations" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon size={20} />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{feature.label}</h3>
                <p className="text-xs text-muted">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </GridGlowBackground>
  );
}
