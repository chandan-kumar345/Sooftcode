"use client";

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseGlow() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Smooth physical spring configurations
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by 100px (half of 200px size) to center on cursor
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <motion.div
        className="w-[200px] h-[200px] rounded-full glow-primary opacity-20 dark:opacity-25 blur-[70px] fixed pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
        }}
      />
    </div>
  );
}
