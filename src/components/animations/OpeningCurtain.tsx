"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OpeningCurtain() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-advance after 2.4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    // Listen for Escape key to quickly dismiss
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Custom event to replay opening animation
    const handleReplay = () => {
      setIsVisible(true);
    };
    window.addEventListener("replay-kernel-intro", handleReplay);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("replay-kernel-intro", handleReplay);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="kernel-opening-curtain"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1E1D1B] text-[#F7F4EC] select-none overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* Ambient luminous glow orbs */}
          <div className="absolute w-[500px] h-[500px] -top-32 -left-20 rounded-full bg-kernel-gold/15 blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute w-[600px] h-[600px] -bottom-40 -right-20 rounded-full bg-[#A9843E]/15 blur-[140px] pointer-events-none" />

          {/* Top Bar with Skip Button */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
            <button
              onClick={() => setIsVisible(false)}
              className="text-xs uppercase tracking-[0.2em] text-[#C6A15B]/80 hover:text-[#C6A15B] transition-colors py-1.5 px-3 rounded-full border border-[#C6A15B]/30 hover:border-[#C6A15B]/60 glass-pill"
            >
              Skip <span className="text-[10px] opacity-60 ml-1 font-mono">ESC</span>
            </button>
          </div>

          {/* Center Brand Constellation */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
            {/* Animated Logo Symbol: Central Core radiating to 8 perspective nodes */}
            <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
              {/* Rotating outer ring */}
              <motion.div
                initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 360, opacity: 1, scale: 1 }}
                transition={{
                  rotate: { duration: 20, ease: "linear", repeat: Infinity },
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                }}
                className="absolute inset-0 rounded-full border border-dashed border-[#C6A15B]/25"
              />

              {/* Central Core Symbol SVG with line connections */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#C6A15B] drop-shadow-[0_0_15px_rgba(198,161,91,0.4)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 8 Radial Connecting Beams */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = 50 + Math.cos(rad) * 36;
                  const y2 = 50 + Math.sin(rad) * 36;
                  return (
                    <motion.line
                      key={angle}
                      x1="50"
                      y1="50"
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + idx * 0.04,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}

                {/* 8 Outer Nodes */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 50 + Math.cos(rad) * 36;
                  const cy = 50 + Math.sin(rad) * 36;
                  return (
                    <motion.circle
                      key={`node-${angle}`}
                      cx={cx}
                      cy={cy}
                      r="2.5"
                      fill="#C6A15B"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.9 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + idx * 0.04,
                        type: "spring",
                        stiffness: 260,
                        damping: 15,
                      }}
                    />
                  );
                })}

                {/* Central Kernel Core */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="11"
                  fill="#242321"
                  stroke="#C6A15B"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                />

                {/* Inner Glowing Center Seed */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="4.5"
                  fill="#C6A15B"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
              </svg>
            </div>

            {/* Platform Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.22em] uppercase font-bold text-[#F7F4EC]">
                Kernel<span className="text-[#C6A15B] font-light ml-2">Space</span>
              </h1>

              {/* Tagline Reveal */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
                className="text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-[#C6A15B] font-medium"
              >
                Think Deeper. Explore Further.
              </motion.p>
            </motion.div>

            {/* Golden Horizontal Loading Horizon */}
            <div className="w-48 sm:w-56 h-[1.5px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#C6A15B] to-[#F7F4EC]"
              />
            </div>

            {/* Subtle philosophy teaser */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-[11px] tracking-[0.15em] text-[#A6A095] mt-4 font-mono"
            >
              Curiosity before expertise • 8 universes
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
