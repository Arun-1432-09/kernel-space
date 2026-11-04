import React from "react";
import { Compass, Lightbulb, Globe, Users } from "lucide-react";

const HIGHLIGHTS = [
  {
    num: "01",
    title: "Stay Curious",
    description: "Every great idea starts with a question. We embrace the beginner's mind before claiming expertise.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Think Deeper",
    description: "We go beyond surface-level explanations and 30-second soundbites to understand foundational systems.",
    icon: Lightbulb,
  },
  {
    num: "03",
    title: "Explore Everything",
    description: "From business models and AI to culture, design, and flight—curiosity refuses to stay in rigid silos.",
    icon: Globe,
  },
  {
    num: "04",
    title: "Learn Together",
    description: "Real conversations. Different perspectives. Shared discovery without pretense or institutional gatekeeping.",
    icon: Users,
  },
];

export function PhilosophyHighlights() {
  return (
    <section className="py-16 sm:py-24 bg-kernel-ivory/60 relative overflow-hidden border-b border-kernel-border/70">
      {/* Soft ambient glass glows */}
      <div className="glass-ambient-gold w-80 h-80 -top-10 right-10 opacity-40" aria-hidden="true" />
      <div className="glass-ambient-ivory w-96 h-96 -bottom-10 left-10 opacity-60" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="glass-card p-7 rounded-editorial flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-kernel-gold">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center border border-white/80 group-hover:scale-105 transition-transform shadow-xs">
                      <Icon className="w-4 h-4 text-kernel-charcoal" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-kernel-charcoal mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-kernel-grey leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-kernel-border/50 text-[10px] font-bold uppercase tracking-widest text-gold-accent">
                  Principle {item.num}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
