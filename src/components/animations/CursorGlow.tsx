"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth springs for the ambient radial glow (soft, luxurious follow)
  const glowSpringConfig = { stiffness: 120, damping: 24, mass: 0.6 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  // Quicker springs for the focused cursor aura ring
  const ringSpringConfig = { stiffness: 450, damping: 32, mass: 0.2 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Only enable on devices that have a fine pointer (mouse / trackpad)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [role='button'], .glass-card, .editorial-card, [data-cursor-hover]"
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-500 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Large Ambient Champagne Gold Glow Follower */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.25 : 1,
          opacity: isHovered ? 0.85 : 0.6,
        }}
        transition={{ duration: 0.3 }}
        className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(198, 161, 91, 0.22) 0%, rgba(198, 161, 91, 0.08) 35%, rgba(247, 244, 236, 0.03) 60%, transparent 75%)",
            filter: "blur(24px)",
          }}
        />
      </motion.div>

      {/* 2. Focused Luminous Cursor Aura Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          borderColor: isHovered ? "rgba(198, 161, 91, 0.85)" : "rgba(198, 161, 91, 0.45)",
          backgroundColor: isHovered
            ? "rgba(198, 161, 91, 0.12)"
            : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="absolute rounded-full border border-kernel-gold/50 backdrop-blur-[1px] pointer-events-none shadow-[0_0_12px_rgba(198,161,91,0.35)]"
      />

      {/* 3. Sharp Pinpoint Center Seed */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="absolute w-1.5 h-1.5 rounded-full bg-kernel-gold shadow-[0_0_6px_rgba(198,161,91,0.9)] pointer-events-none"
      />
    </div>
  );
}
