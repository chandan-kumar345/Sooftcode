"use client";

import React from "react";
import { motion } from "framer-motion";
import GridGlowBackground from "@/components/ui/grid-glow-background";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeInOut" as const,
    },
  }),
};

const DemoOne = () => {
  return (
    <GridGlowBackground>
      <div className="text-center">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80"
        >
          Introducing a New Era of Design
        </motion.div>

        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          The Grid Glow Hero
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60"
        >
          A fully animated, unique hero section component built with React,
          Framer Motion, and HTML Canvas for a futuristic feel.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <button className="rounded-full bg-white px-6 py-3 text-lg font-semibold text-black shadow-lg shadow-white/20 transition-transform hover:scale-105">
            Get Started
          </button>
          <button className="flex items-center gap-x-2 rounded-full px-6 py-3 text-lg font-semibold leading-6 text-white transition-colors hover:bg-white/10">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </GridGlowBackground>
  );
};

export default DemoOne;
