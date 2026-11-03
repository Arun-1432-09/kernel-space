import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";

export function FeaturedCollection() {
  return (
    <section className="py-20 sm:py-28 bg-kernel-ivory/50 border-b border-kernel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Collage Images on Left */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
              <div className="space-y-4 sm:space-y-6">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card border border-kernel-border">
                  <Image
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                    alt="Thinker examining complex patterns"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-medium text-white">
                    Cognitive Frameworks
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-card border border-kernel-border">
                  <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                    alt="Digital networks and connectivity"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 text-xs font-medium text-white">
                    Societal Infrastructure
                  </span>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/11] shadow-card border border-kernel-border">
                  <Image
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80"
                    alt="Aviation engineering marvel"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 text-xs font-medium text-white">
                    High-Reliability Systems
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card border border-kernel-border">
                  <Image
                    src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80"
                    alt="Deliberate creative workspace"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 text-xs font-medium text-white">
                    Creative Architecture
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy and CTA on Right */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-gold">
              <Layers className="w-3.5 h-3.5 text-kernel-gold" />
              <span>Multi-disciplinary Series</span>
            </div>

            <h2 className="heading-section leading-tight">
              Explore beyond the surface
            </h2>

            <p className="subheading-editorial text-base sm:text-lg">
              Curiosity doesn't fit into neat corporate boxes. Our series weave together the psychology of decision-making, the mechanics of modern aviation, the realities of starting up, and the philosophical challenges of artificial intelligence.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-kernel-gold mt-2 flex-shrink-0" />
                <p className="text-sm text-kernel-charcoal">
                  <strong>Interdisciplinary Inquiries:</strong> See how an aviation safety checklist transforms healthcare and startup operations.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-kernel-gold mt-2 flex-shrink-0" />
                <p className="text-sm text-kernel-charcoal">
                  <strong>Visual Rigor:</strong> Concepts mapped in charts, diagrams, and motion graphics without dilution.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/explore"
                className="btn-gold px-6 py-3 text-sm inline-flex items-center gap-2"
              >
                <span>Explore Our Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
