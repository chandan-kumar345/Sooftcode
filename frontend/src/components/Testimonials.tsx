"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Sooftcode delivered our high-frequency stock trading application in record time. Their architectural guidance around WebSockets and Mongoose data caching reduced feed latency to under 10ms. A stellar performance.",
    name: "Arthur Pendelton",
    role: "VP of Engineering",
    company: "Aura Capital Group",
    rating: 5
  },
  {
    quote: "Architecting our multi-region Kubernetes migration was executed seamlessly. Sooftcode automated our DevSecOps scans and optimized cloud workloads, trimming 50% off our hosting costs without single millisecond of downtime.",
    name: "Genevieve Mercer",
    role: "Chief Technology Officer",
    company: "Nova Logistics Global",
    rating: 5
  },
  {
    quote: "The LLM customer ticket triaging engine Sooftcode developed has revolutionized our customer service. Standard resolution time plummeted by 30% while CSAT ratings bumped by 18%. Highly professional consulting agency.",
    name: "Samuel Vance",
    role: "Director of Product",
    company: "Zenith Retail",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto play
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 } as const,
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 } as const,
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section className="py-20 bg-card border-y border-card-border transition-colors duration-300 relative overflow-hidden">

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">Client Reviews</h2>
          <p className="text-3xl font-bold font-sans text-foreground">
            What Our Partners Say About Us
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonial slider viewport */}
        <div className="relative min-h-[320px] sm:min-h-[250px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full text-center space-y-6 px-4"
            >
              {/* Quote Mark */}
              <Quote className="mx-auto text-primary/20 w-12 h-12" />

              {/* Quote Content */}
              <blockquote className="text-lg sm:text-xl font-medium text-foreground leading-relaxed italic max-w-3xl mx-auto">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Stars rating */}
              <div className="flex items-center justify-center space-x-1">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Author Info */}
              <div>
                <cite className="not-italic font-bold text-foreground text-base sm:text-lg">
                  {testimonials[activeIndex].name}
                </cite>
                <div className="text-xs sm:text-sm text-primary font-semibold mt-1">
                  {testimonials[activeIndex].role} &bull; <span className="text-muted">{testimonials[activeIndex].company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons and pagination indicators */}
        <div className="flex items-center justify-between mt-12 max-w-[280px] mx-auto">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border border-card-border bg-background hover:bg-card text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex space-x-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex ? 'bg-primary w-6' : 'bg-card-border hover:bg-muted/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full border border-card-border bg-background hover:bg-card text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
