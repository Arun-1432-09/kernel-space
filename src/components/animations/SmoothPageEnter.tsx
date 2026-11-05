"use client";

import React from "react";
import { motion } from "framer-motion";

interface SmoothPageEnterProps {
  children: React.ReactNode;
  className?: string;
}

export function SmoothPageEnter({
  children,
  className = "",
}: SmoothPageEnterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
