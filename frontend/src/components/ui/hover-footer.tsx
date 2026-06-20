"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Split text into individual characters for staggered animation
  const chars = text.split("");

  // Evenly distribute X coordinates across a 400 viewBox width
  const getCharX = (index: number) => {
    const startX = 55;
    const endX = 675;
    const spacing = (endX - startX) / (chars.length - 1);
    return startX + index * spacing;
  };

  // Scroll triggers: Parent container staggers children entry
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Staggers character scale-in
      }
    }
  };

  // Entry pop-out animation for each character group
  const charVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 130,
        damping: 10
      }
    }
  };

  return (
    <motion.svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 700 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        if (svgRef.current) {
          const svgRect = svgRef.current.getBoundingClientRect();
          const cxPercentage = (((e.clientX - svgRect.left) / svgRect.width) * 100).toFixed(2);
          const cyPercentage = (((e.clientY - svgRect.top) / svgRect.height) * 100).toFixed(2);
          const newCx = `${cxPercentage}%`;
          const newCy = `${cyPercentage}%`;

          if (newCx !== maskPosition.cx || newCy !== maskPosition.cy) {
            setMaskPosition({ cx: newCx, cy: newCy });
          }
        }
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("select-none uppercase cursor-pointer relative overflow-visible", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Render staggered character groups containing outline and color mask layers */}
      {chars.map((char, i) => {
        const x = getCharX(i);
        return (
          <motion.g
            key={i}
            variants={charVariants}
            className="origin-center"
            style={{ transformOrigin: `${x}px 50px` }}
          >
            {/* Layer 1: Static background outline (on hover) */}
            <text
              x={x}
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.8"
              className="fill-transparent stroke-slate-300 font-[helvetica] text-8xl font-black dark:stroke-slate-800 transition-opacity duration-300"
              style={{ opacity: hovered ? 0.7 : 0 }}
            >
              {char}
            </text>

            {/* Layer 2: Primary stroke outline (animates on scroll enter) */}
            <motion.text
              x={x}
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.8"
              className="fill-transparent stroke-primary font-[helvetica] text-8xl font-black opacity-80"
              initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
              animate={{
                strokeDashoffset: 0,
                strokeDasharray: 1000,
              }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
              }}
            >
              {char}
            </motion.text>

            {/* Layer 3: Colorful gradient (revealed on mouse hover via mask) */}
            <text
              x={x}
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="url(#textGradient)"
              strokeWidth="0.8"
              mask="url(#textMask)"
              className="fill-transparent font-[helvetica] text-8xl font-black"
            >
              {char}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, rgba(15, 15, 17, 0) 40%, var(--primary-glow) 100%)",
      }}
    />
  );
};
