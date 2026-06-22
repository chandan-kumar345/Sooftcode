"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Calendar, CloudLightning } from 'lucide-react';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1500, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, value, duration]);

  return (
    <span ref={elementRef} className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-foreground tabular-nums">
      {count}{suffix}
    </span>
  );
}

const statsItems = [
  {
    icon: Award,
    value: 150,
    suffix: "+",
    label: "Successful Deliveries",
    description: "Enterprise products, mobile applications, and custom software systems."
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "DevSecOps & Software Engineers",
    description: "Highly certified architects, designers, developers, and QA leads."
  },
  {
    icon: Calendar,
    value: 8,
    suffix: "+",
    label: "Years in Operation",
    description: "Helping startups scale up and enterprises automate workflows."
  },
  {
    icon: CloudLightning,
    value: 99,
    suffix: ".99%",
    label: "Average Infrastructure SLA",
    description: "High-availability multi-region Kubernetes deployments."
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full glow-accent opacity-30 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {statsItems.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-8 rounded-3xl bg-card/90 dark:bg-card/40 border border-card-border/60 backdrop-blur-sm shadow-sm"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <stat.icon size={22} />
              </div>

              {/* Number Counter */}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />

              {/* Label */}
              <h3 className="font-bold text-base text-foreground mt-4 mb-2">
                {stat.label}
              </h3>
              
              {/* Subtext */}
              <p className="text-muted text-xs leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
