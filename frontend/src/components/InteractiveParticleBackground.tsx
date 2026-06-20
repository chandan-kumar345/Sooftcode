"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface MouseState {
  x: number | null;
  y: number | null;
  active: boolean;
  px: number; // Parallax X offset
  py: number; // Parallax Y offset
}

/**
 * InteractiveParticleBackground
 * An elegant, performant, and responsive HTML5 Canvas-based background animation.
 * Features 50-100 floating colorful particles, a responsive mouse-following trail of small dots,
 * magnetic hover attraction, particle size-based parallax depth, and adaptive theme support.
 */
export default function InteractiveParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let trailParticles: TrailParticle[] = [];
    
    // Mouse state manager
    const mouse: MouseState = {
      x: null,
      y: null,
      active: false,
      px: 0,
      py: 0
    };

    // Tracks target parallax offset to ease into parallax smoothly
    let targetPx = 0;
    let targetPy = 0;

    // Theme-based colors selection helper
    const getThemeColors = (currentTheme: string | undefined) => {
      return currentTheme === 'light' ? [
        '#2563EB', // Vibrant Blue
        '#7C3AED', // Deep Purple
        '#0891B2', // Cyan
        '#DB2777', // Magenta/Pink
        '#16A34A', // Green
        '#CA8A04', // Amber/Yellow
      ] : [
        '#60A5FA', // Light Blue
        '#A78BFA', // Violet
        '#22D3EE', // Cyan
        '#F472B6', // Pink
        '#4ADE80', // Green
        '#FBBF24', // Yellow
      ];
    };

    // 1. Standard background floating Particle class
    class Particle {
      canvas: HTMLCanvasElement;
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      hoverColor: string;
      alpha: number;
      parallaxFactor: number;

      constructor(canvas: HTMLCanvasElement, currentTheme: string | undefined) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;

        // Faster random float vectors for wider dispersion
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;

        // Size between 4px and 12px (larger dots)
        this.size = Math.random() * 8 + 4;

        const colors = getThemeColors(currentTheme);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.hoverColor = currentTheme === 'light' ? '#4F46E5' : '#FFFFFF';
        this.alpha = Math.random() * 0.35 + 0.3; // Standard alpha between 0.3 and 0.65
        this.parallaxFactor = this.size * 0.05;
      }

      update(mouseState: MouseState) {
        // Floating baseline update
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Screen edge wrapping
        if (this.baseX < 0) this.baseX = this.canvas.width;
        if (this.baseX > this.canvas.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = this.canvas.height;
        if (this.baseY > this.canvas.height) this.baseY = 0;

        let targetX = this.baseX;
        let targetY = this.baseY;

        let isHovered = false;

        // Cursor magnetic pull
        if (mouseState.active && mouseState.x !== null && mouseState.y !== null) {
          const dx = mouseState.x - this.baseX;
          const dy = mouseState.y - this.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const magneticRadius = 160;

          if (distance < magneticRadius) {
            isHovered = true;
            const force = (magneticRadius - distance) / magneticRadius;
            targetX -= (dx / distance) * force * 75; // Push away from mouse (fala ker / spread out)
            targetY -= (dy / distance) * force * 75;
          }
        }

        // Screen parallax shift offset
        targetX += mouseState.px * this.parallaxFactor;
        targetY += mouseState.py * this.parallaxFactor;

        // Spring Easing interpolation
        const easing = 0.08;
        this.x += (targetX - this.x) * easing;
        this.y += (targetY - this.y) * easing;

        return isHovered;
      }

      draw(context: CanvasRenderingContext2D, isHovered: boolean) {
        context.save();
        const drawOpacity = isHovered ? 1.0 : this.alpha;

        // Soft glow backing
        context.beginPath();
        context.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        context.fillStyle = isHovered ? this.hoverColor : this.color;
        context.globalAlpha = drawOpacity * 0.12;
        context.fill();

        // Solid core dot
        context.beginPath();
        context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        context.fillStyle = isHovered ? this.hoverColor : this.color;
        context.globalAlpha = drawOpacity;
        context.fill();

        context.restore();
      }
    }

    // 2. Cursor-following Trail Particle class (for trailing dots effect)
    class TrailParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;

      constructor(x: number, y: number, currentTheme: string | undefined) {
        this.x = x;
        this.y = y;
        
        // Fast drift away vector (fala ker / spread out)
        this.vx = (Math.random() - 0.5) * 3.5;
        this.vy = (Math.random() - 0.5) * 3.5;
        
        // Trail size between 3px and 9px (larger dots)
        this.size = Math.random() * 6 + 3; // 2px to 6px

        const colors = getThemeColors(currentTheme);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1.0;
        
        // Decay speeds to disappear after ~0.8-1.5 seconds
        this.decay = Math.random() * 0.015 + 0.015;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.size -= 0.04;
      }

      draw(context: CanvasRenderingContext2D) {
        if (this.alpha <= 0 || this.size <= 0) return;
        context.save();

        // Glow backing
        context.beginPath();
        context.arc(this.x, this.y, this.size * 2.2, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.globalAlpha = this.alpha * 0.15;
        context.fill();

        // Core dot
        context.beginPath();
        context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.globalAlpha = this.alpha;
        context.fill();

        context.restore();
      }
    }

    // Handles resizing bounds and counts
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particleCount = 80;
      if (window.innerWidth < 640) {
        particleCount = 35;
      } else if (window.innerWidth < 1024) {
        particleCount = 55;
      }

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, theme));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse & spawn trailing dots
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn trailing dots that follow mouse movement
      trailParticles.push(new TrailParticle(e.clientX, e.clientY, theme));
      // Extra dot for richer trail on faster movements
      if (Math.random() < 0.5) {
        trailParticles.push(new TrailParticle(e.clientX + (Math.random() - 0.5) * 8, e.clientY + (Math.random() - 0.5) * 8, theme));
      }

      // Parallax center tracking
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetPx = (e.clientX - centerX) * -1;
      targetPy = (e.clientY - centerY) * -1;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
      targetPx = 0;
      targetPy = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop cycle
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly ease global parallax offsets
      mouse.px += (targetPx - mouse.px) * 0.05;
      mouse.py += (targetPy - mouse.py) * 0.05;

      // 1. Draw glowing cursor trail backdrop
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const trailRadius = 150;
        const trailGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, trailRadius
        );
        const colorStop = theme === 'light' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(139, 92, 246, 0.08)';
        trailGlow.addColorStop(0, colorStop);
        trailGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = trailGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, trailRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and Draw Cursor Trail Particles (little dots following mouse movement)
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const tp = trailParticles[i];
        tp.update();
        if (tp.alpha <= 0 || tp.size <= 0) {
          trailParticles.splice(i, 1);
        } else {
          tp.draw(ctx);
        }
      }

      // Cache length for fast background particle iterations
      const len = particles.length;
      const hoverStates = new Array(len);

      // 3. Update background particles
      for (let i = 0; i < len; i++) {
        hoverStates[i] = particles[i].update(mouse);
      }

      // 4. Draw inter-particle connection lines (linked to proximity)
      const maxDistance = window.innerWidth < 640 ? 90 : 120;
      ctx.save();
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const linkAlpha = (1 - distance / maxDistance) * (theme === 'light' ? 0.08 : 0.15);
            ctx.strokeStyle = theme === 'light' 
              ? `rgba(37, 99, 235, ${linkAlpha})` 
              : `rgba(139, 92, 246, ${linkAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 5. Draw individual background particles
      for (let i = 0; i < len; i++) {
        particles[i].draw(ctx, hoverStates[i]);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up event listeners & frames
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted, theme]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-none fixed inset-0 -z-20 w-full h-full overflow-hidden select-none bg-background transition-colors duration-300"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
    </div>
  );
}
