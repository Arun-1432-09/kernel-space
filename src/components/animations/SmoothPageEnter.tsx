"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SmoothPageEnterProps {
  children: React.ReactNode;
  className?: string;
}

export function SmoothPageEnter({
  children,
  className = "",
}: SmoothPageEnterProps) {
  const [completed, setCompleted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={() => setCompleted(true)}
      style={completed ? { transform: "none" } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
