"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-kernel-border/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Arch-cropped Editorial Image with scroll reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-[380px] aspect-[4/5]">
              {/* Outer decorative subtle framing */}
              <div className="absolute -inset-3 rounded-t-[140px] rounded-b-2xl border border-kernel-border/80 pointer-events-none -rotate-1" />
              
              <div className="relative w-full h-full rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-card border border-kernel-border bg-kernel-ivory">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Conversational inquiry and shared exploration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-5 text-xs font-serif italic text-white/95">
                  &ldquo;Real thinking is collaborative, never hierarchical.&rdquo;
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Narrative with scroll reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kernel-ivory border border-kernel-border text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
              <Sparkles className="w-3.5 h-3.5 text-kernel-gold" />
              <span>Behind the Ideas</span>
            </div>

            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl font-normal text-kernel-charcoal leading-[1.12]">
              Not here to tell you what to think. Here to explore what makes you think.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-kernel-grey leading-relaxed font-sans">
              <p>
                We started Kernel Space because we grew tired of high-decibel internet debates, rehearsed talking points, and superficial content designed solely for algorithmic engagement. Real learning doesn&apos;t happen when experts lecture from pedestals—it happens when curious generalists ask honest questions and follow threads wherever they lead.
              </p>
              <p>
                Everything we produce is research-backed, format-flexible, and grounded in intellectual humility. We do not do interviews where guests get interrogated; we host authentic conversations between participants exploring ideas they genuinely care about.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="btn-gold text-sm px-7 py-3.5 inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                <span>Discover Kernel Space</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
