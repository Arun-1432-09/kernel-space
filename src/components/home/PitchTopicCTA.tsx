"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export function PitchTopicCTA() {
  return (
    <section className="py-16 sm:py-20 bg-kernel-ivory/60 relative overflow-hidden border-b border-kernel-border/70">
      <div className="glass-ambient-gold w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10"
      >
        <div className="w-12 h-12 rounded-full glass-pill flex items-center justify-center mx-auto text-kernel-gold border border-white/80 shadow-xs">
          <Lightbulb className="w-5 h-5" />
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="heading-section text-2xl sm:text-3xl font-normal">
            Got a question we should chase?
          </h2>
          <p className="subheading-editorial text-sm sm:text-base">
            Good ideas matter more than titles. Pitch a topic, tell us the core question behind it, and we&apos;ll explore it together.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/get-involved"
            className="btn-gold text-xs px-7 py-3.5 inline-flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-transform"
          >
            <span>Pitch a Topic to the Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
