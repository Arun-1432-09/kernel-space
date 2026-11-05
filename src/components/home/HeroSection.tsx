"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Headphones, Play, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES_TICKER = [
  "01 Business & Startups",
  "02 Technology & AI",
  "03 Psychology & Mental Health",
  "04 Student Life & Gen-Z Culture",
  "05 Design & Creativity",
  "06 Travel & Experiences",
  "07 Aviation & Automotive",
  "08 Finance & Economics",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 sm:pb-20 border-b border-kernel-border/70">
      {/* Ambient Glassmorphic Light Reflections */}
      <div className="glass-ambient-gold w-[420px] h-[420px] -top-24 -left-20 opacity-80" aria-hidden="true" />
      <div className="glass-ambient-ivory w-[500px] h-[500px] top-1/3 -right-24 opacity-90" aria-hidden="true" />
      <div className="glass-ambient-gold w-[320px] h-[320px] bottom-10 left-1/3 opacity-50" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (55%) with staggered opening animations */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 pr-0 lg:pr-6">
            {/* Eyebrow with soft fade-in */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[11px] font-bold uppercase tracking-[0.18em] text-gold-accent"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-kernel-gold shadow-[0_0_8px_rgba(198,161,91,0.8)]" />
              <span>Independent Media • Curious Minds</span>
            </motion.div>

            {/* Headline with emphasized italic and animated SVG gold underline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="heading-hero"
            >
              The world is full of{" "}
              <span className="italic relative inline-block text-kernel-charcoal font-serif">
                questions.
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-3 text-kernel-gold pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M3 8.5C45 3.5 120 2.5 197 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                  />
                </svg>
              </span>{" "}
              Let&apos;s explore them.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="subheading-editorial text-base sm:text-lg max-w-2xl font-sans"
            >
              From technology and business to psychology, culture and everything in between — we explore ideas, break down complex topics and have conversations worth thinking about.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link
                href="/explore"
                className="btn-gold text-sm px-7 py-3.5 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Content</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/about"
                className="btn-gold-outline text-sm px-6 py-3.5 glass-pill transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Discover Our Story
              </Link>
            </motion.div>

            {/* Format Chips: Listen, Watch, Read */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4 border-t border-kernel-border/70 flex items-center gap-3"
            >
              <span className="text-xs font-semibold text-kernel-grey uppercase tracking-wider mr-1">
                Explore Formats:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/listen"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-medium text-kernel-charcoal hover:scale-105 transition-transform"
                >
                  <Headphones className="w-3.5 h-3.5 text-kernel-gold" />
                  <span>Listen</span>
                </Link>
                <Link
                  href="/watch"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-medium text-kernel-charcoal hover:scale-105 transition-transform"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-kernel-gold" />
                  <span>Watch</span>
                </Link>
                <Link
                  href="/read"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-medium text-kernel-charcoal hover:scale-105 transition-transform"
                >
                  <BookOpen className="w-3.5 h-3.5 text-kernel-gold" />
                  <span>Read</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column (45%): Arch Image Composition with dynamic reveal & gentle floating breath */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5]">
              {/* Thin Open Ring Orbiting slowly in background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 pointer-events-none flex items-center justify-center"
                aria-hidden="true"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full text-kernel-gold/40">
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="8 6"
                  />
                  {/* Kernel dot travelling on the ring */}
                  <circle cx="200" cy="20" r="5" fill="#C6A15B" />
                </svg>
              </motion.div>

              {/* Main Arch-Window Image with Glass Border and Floating Breathing Motion */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-floating border border-white/80 bg-white/50 backdrop-blur-md"
              >
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
                  alt="Deep mountain perspective evoking curiosity and exploration"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kernel-charcoal/60 via-transparent to-transparent" />
              </motion.div>

              {/* Overlapping Glass Card (Bottom Left) sliding in */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -left-6 w-44 h-32 rounded-2xl overflow-hidden shadow-floating border-2 border-white/90 bg-white/70 backdrop-blur-md hidden sm:block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80"
                  alt="Thoughtful conversation participants"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <span className="absolute bottom-2 left-2.5 text-[10px] font-bold text-white uppercase tracking-wider drop-shadow-sm">
                  Conversations
                </span>
              </motion.div>

              {/* Floating Frosted Dark Glass Badge (Top Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full overflow-hidden shadow-floating border-2 border-white/40 glass-dark flex items-center justify-center text-center p-2 hidden sm:flex"
              >
                <div className="space-y-0.5">
                  <span className="block font-serif text-xs font-bold text-kernel-gold">
                    Raw & Real
                  </span>
                  <span className="block text-[8px] uppercase tracking-widest text-zinc-300">
                    No Scripts
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Seamless Frosted Glass Marquee Ticker of 8 Categories */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-14 sm:mt-20 pt-4 pb-4 border-y border-white/60 bg-white/60 backdrop-blur-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] overflow-hidden select-none"
      >
        <div className="animate-marquee flex items-center space-x-8">
          {[...CATEGORIES_TICKER, ...CATEGORIES_TICKER].map((cat, idx) => (
            <div key={idx} className="flex items-center space-x-6 flex-shrink-0">
              <span className="font-serif text-sm font-semibold tracking-wider text-kernel-charcoal uppercase">
                {cat}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-kernel-gold flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
