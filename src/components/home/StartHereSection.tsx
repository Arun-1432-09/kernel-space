import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { ContentItem } from "@/lib/types";

interface StartHereProps {
  items: ContentItem[];
}

export function StartHereSection({ items }: StartHereProps) {
  const displayItems = items.slice(0, 3);

  // One-line "why this one" reasons based on editorial intent
  const reasons: Record<number, string> = {
    0: "The foundational essay exploring how breakthroughs happen at the crossroads of separate disciplines.",
    1: "An unvarnished breakdown of why early ventures stall and how cognitive traps blind founders.",
    2: "A psychological lens on evolutionary heuristics, decision fatigue, and everyday choices.",
  };

  return (
    <section className="py-20 sm:py-24 bg-kernel-ivory/60 relative overflow-hidden border-b border-kernel-border/70">
      <div className="glass-ambient-gold w-[380px] h-[380px] -top-12 left-10 opacity-30" aria-hidden="true" />
      <div className="glass-ambient-ivory w-[400px] h-[400px] -bottom-10 right-10 opacity-50" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[10px] font-bold uppercase tracking-widest text-gold-accent">
            <Compass className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Orientation</span>
          </div>
          <h2 className="heading-section">
            New here? Start with these.
          </h2>
          <p className="subheading-editorial text-sm sm:text-base">
            Three foundational inquiries chosen to give you a natural entry point into how we question and dissect ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item, idx) => (
            <Link
              key={item.id}
              href={`/content/${item.slug}`}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-kernel-gold transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-kernel-ivory">
                  <Image
                    src={item.thumbnail_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full glass-pill text-[10px] font-bold uppercase tracking-wider text-kernel-charcoal shadow-sm">
                    Entry {idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent block">
                    {item.categories?.[0]?.name || "Core Inquiry"}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="p-3 rounded-lg bg-kernel-ivory/80 border border-kernel-border/60 text-xs text-kernel-grey italic leading-relaxed">
                    "{reasons[idx] || "A core inquiry into foundational questions."}"
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-kernel-border/60 flex items-center justify-between text-xs font-semibold text-kernel-charcoal">
                <span className="text-gold-accent">Start reading</span>
                <ArrowRight className="w-4 h-4 text-kernel-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
