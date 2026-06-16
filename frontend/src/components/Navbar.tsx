"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Code2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Careers', path: '/careers' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  if (!mounted) return null;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
      ? 'glass py-3 shadow-lg shadow-black/5'
      : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <BrandLogo />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-foreground/[0.03] dark:bg-white/[0.02] border border-card-border/40 p-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
            const isHovered = hoveredPath === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 z-10`}
              >
                <span className={`transition-colors duration-200 ${isActive
                  ? 'text-white font-extrabold'
                  : isHovered
                    ? 'text-primary font-extrabold drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]'
                    : 'text-muted-foreground'
                  }`}>
                  {link.name}
                </span>

                {/* Active capsule background */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10 shadow-md shadow-primary/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover capsule background (sliding highlight) */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="hoverNavTab"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 dark:bg-primary/20 dark:border-primary/30 rounded-full -z-10 shadow-sm shadow-primary/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Utility Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-xl border border-card-border hover:bg-card/80 text-foreground transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Consultation CTA */}
          <Link
            href="/contact?type=consultation"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-extrabold shadow-xl shadow-cyan-500/30 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg border border-card-border text-foreground cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg border border-card-border text-foreground cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-[100%] left-0 w-full glass shadow-2xl border-t border-card-border py-6 px-8 flex flex-col space-y-5"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold transition-colors py-1 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-card-border flex flex-col space-y-4">
              <Link
                href="/contact?type=consultation"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 rounded-xl btn-liquid-nav text-white font-bold shadow-md shadow-pink-500/25 block"
              >
                Let's Talk ✨
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
