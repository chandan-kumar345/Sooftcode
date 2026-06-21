"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShaderAnimation } from '@/components/ui/shader-animation';

export default function IntroSplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    
    // Temporarily lock scroll
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 3000); // 3 seconds duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex items-center justify-center select-none"
          style={{ zIndex: 9999 }}
        >
          {/* WebGL Shader background */}
          <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
            <ShaderAnimation />
          </div>

          {/* Logo / Text overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="flex items-center text-white"
            >
              <h1 className="text-4xl sm:text-6xl font-black tracking-[0.25em] font-sans drop-shadow-[0_0_25px_rgba(139,92,246,0.65)]">
                SOOFTCODE
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.4em] font-semibold text-primary font-mono animate-pulse"
            >
              Compiling Systems...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
