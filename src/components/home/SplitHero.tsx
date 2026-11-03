import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass } from "lucide-react";

interface SplitHeroProps {
  label?: string;
  headline?: string;
  supportText?: string;
}

export function SplitHero({
  label = "A space for curious minds.",
  headline = "Think Deeper. Explore Further.",
  supportText = "A space for curious minds to question ideas, explore perspectives and understand the world beyond the surface.",
}: SplitHeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-kernel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 pr-0 lg:pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kernel-ivory border border-kernel-border text-xs font-semibold text-kernel-gold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-kernel-gold" />
              <span>{label}</span>
            </div>

            <h1 className="heading-hero">
              {headline}
            </h1>

            <p className="subheading-editorial max-w-2xl">
              {supportText}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/explore"
                className="btn-gold text-base px-6 py-3"
              >
                <span>Explore Content</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/about"
                className="btn-gold-outline text-base px-6 py-3"
              >
                Discover Our Story
              </Link>
            </div>

            {/* Editorial highlights counter */}
            <div className="pt-6 border-t border-kernel-border/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-kernel-charcoal">8</span>
                <span className="text-xs text-kernel-muted uppercase tracking-wider">Disciplines</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-kernel-charcoal">100%</span>
                <span className="text-xs text-kernel-muted uppercase tracking-wider">Independent</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-kernel-gold">Free</span>
                <span className="text-xs text-kernel-muted uppercase tracking-wider">Open Access</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Editorial Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative subtle framing */}
              <div className="absolute -inset-3 rounded-2xl border border-kernel-border/60 -rotate-1 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-floating aspect-[4/5] bg-kernel-ivory border border-kernel-border">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
                  alt="A majestic deep mountain landscape evoking human curiosity and discovery"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                {/* Subtle vignette & editorial badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-kernel-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-kernel-gold">
                    Editorial Philosophy
                  </span>
                  <p className="text-sm font-serif italic text-white/95 leading-snug">
                    "Curiosity before expertise. Look beneath the surface of everyday systems."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
