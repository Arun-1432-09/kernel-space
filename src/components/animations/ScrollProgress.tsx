"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-kernel-gold/60 via-kernel-gold to-[#F7F4EC] origin-left shadow-[0_0_8px_rgba(198,161,91,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
}
