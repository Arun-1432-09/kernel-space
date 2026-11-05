"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  { num: "01", name: "Ideation", label: "Questions pitched from curiosity" },
  { num: "02", name: "Research", label: "Primary sources & contrarian views" },
  { num: "03", name: "Format", label: "Topic dictates audio, video, or essay" },
  { num: "04", name: "Production", label: "Polished editing, kept human" },
  { num: "05", name: "Distribution", label: "YouTube, Spotify, & Open Access" },
];

export function HowWeThinkStrip() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-kernel-border/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
              Rigorous Process
            </span>
            <h2 className="heading-section text-2xl sm:text-3xl font-normal">
              How we think.
            </h2>
          </div>
          <Link
            href="/about#process"
            className="text-xs font-semibold text-gold-accent hover:underline inline-flex items-center gap-1"
          >
            <span>Learn about our editorial method</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* 5-Step Compact Row with Staggered Scroll Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-5 gap-4"
        >
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
                },
              }}
              className="p-5 rounded-2xl glass-card relative space-y-2 group hover:border-kernel-gold hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-kernel-gold">
                  {step.num}
                </span>
                {idx < 4 && (
                  <span className="hidden sm:inline text-xs text-kernel-grey font-mono">
                    →
                  </span>
                )}
              </div>
              <h3 className="font-serif text-base font-bold text-kernel-charcoal">
                {step.name}
              </h3>
              <p className="text-[11px] text-kernel-grey leading-relaxed">
                {step.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
