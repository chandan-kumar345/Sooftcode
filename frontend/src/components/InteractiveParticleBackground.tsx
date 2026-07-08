"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import DotGrid from '@/components/ui/DotGrid';

/**
 * InteractiveParticleBackground
 * Re-purposed to act as a full-screen, responsive backdrop rendering
 * the interactive DotGrid component with theme-aware styling.
 */
export default function InteractiveParticleBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Choose brighter, high-contrast, theme-appropriate colors
  const isDark = resolvedTheme === 'dark';
  const baseColor = isDark ? '#494861ff' : '#94a3b8';   // Indigo-900 in dark (brighter base), Slate-400 in light
  const activeColor = isDark ? '#5227FF' : '#5227FF'; // Vibrant lavender/purple in dark, Indigo-500 in light

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 w-full h-full overflow-hidden select-none bg-background transition-colors duration-300"
    >
      <DotGrid
        dotSize={4}
        gap={20}
        baseColor={baseColor}
        activeColor={activeColor}
        proximity={110}
        shockRadius={210}
        shockStrength={5}
        resistance={700}
        returnDuration={1.2}
      />
    </div>
  );
}
