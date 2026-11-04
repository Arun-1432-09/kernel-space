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
    <section className="py-16 sm:py-24 bg-kernel-ivory border-b border-kernel-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-white p-7 rounded-editorial border border-kernel-border shadow-subtle hover:border-kernel-gold transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-kernel-gold">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-kernel-ivory flex items-center justify-center border border-kernel-border group-hover:scale-105 transition-transform">
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
