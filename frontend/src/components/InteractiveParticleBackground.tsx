"use client";

import React, { useState, useEffect } from 'react';
import Galaxy from '@/components/ui/Galaxy';

/**
 * InteractiveParticleBackground
 * Re-purposed to act as a full-screen, responsive WebGL backdrop rendering
 * the React Bits Galaxy component.
 */
export default function InteractiveParticleBackground() {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 w-full h-full overflow-hidden select-none bg-background transition-colors duration-300"
    >
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={0.4}
        glowIntensity={0.25}
        saturation={0.3}
        hueShift={240}
        transparent={true}
        starSpeed={0.08}
        speed={0.15}
        rotationSpeed={0.005}
        twinkleIntensity={0.1}
      />
    </div>
  );
}
