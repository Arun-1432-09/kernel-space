import React from "react";
import Link from "next/link";
import { MessageSquare, CornerDownRight, HelpCircle, ArrowRight } from "lucide-react";
import { ContentItem } from "@/lib/types";

interface RawAndRealProps {
  latestPodcast?: ContentItem | null;
}

export function RawAndRealPanel({ latestPodcast }: RawAndRealProps) {
  return (
    <section className="py-20 sm:py-24 bg-kernel-ivory/60 relative overflow-hidden border-b border-kernel-border/70">
      {/* Soft ambient glass glows */}
      <div className="glass-ambient-gold w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 relative z-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-accent">
          Editorial Ethos
        </span>

        {/* Signature Line */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-kernel-charcoal leading-tight max-w-3xl mx-auto">
          "No scripts. No pretense. Just curiosity meeting preparation."
        </h2>

        {/* Three Cues with Frosted Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl glass-card flex flex-col items-center text-center space-y-2.5 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-kernel-gold border border-white/80 shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-kernel-charcoal">
              Pauses while we find the word.
            </p>
            <span className="text-[11px] text-kernel-grey">
              Real thought takes time to articulate.
            </span>
          </div>

          <div className="p-6 rounded-2xl glass-card flex flex-col items-center text-center space-y-2.5 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-kernel-gold border border-white/80 shadow-xs">
              <CornerDownRight className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-kernel-charcoal">
              Tangents that go somewhere.
            </p>
            <span className="text-[11px] text-kernel-grey">
              The best discoveries live off the script.
            </span>
          </div>

          <div className="p-6 rounded-2xl glass-card flex flex-col items-center text-center space-y-2.5 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-kernel-gold border border-white/80 shadow-xs">
              <HelpCircle className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-kernel-charcoal">
              We don't know yet.
            </p>
            <span className="text-[11px] text-kernel-grey">
              Admitting uncertainty is honest inquiry.
            </span>
          </div>
        </div>

        {/* Button to latest podcast conversation (hidden if none exists) */}
        {latestPodcast && (
          <div className="pt-2">
            <Link
              href={`/content/${latestPodcast.slug}`}
              className="btn-gold text-xs px-6 py-3 inline-flex items-center gap-2"
            >
              <span>Listen to Latest Dialogue: {latestPodcast.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
