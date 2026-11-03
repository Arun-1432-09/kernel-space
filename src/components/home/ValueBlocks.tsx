import React from "react";
import { MessageSquareHeart, Eye, Globe2, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: MessageSquareHeart,
    title: "Genuine Conversations",
    description: "No scripted questions or rehearsed soundbites. Friends and creators exploring ideas that genuinely matter.",
  },
  {
    icon: Eye,
    title: "Visual Explorations",
    description: "Rich animated explainers and systems breakdowns making intricate technology and economics clear without oversimplifying.",
  },
  {
    icon: Globe2,
    title: "Ideas Without Borders",
    description: "Connecting dots across business, AI, psychology, aviation, and culture rather than staying locked in rigid silos.",
  },
  {
    icon: Sparkles,
    title: "Curious Minds",
    description: "A growing community of students, builders, and thinkers who refuse to take surface-level narratives for granted.",
  },
];

export function ValueBlocks() {
  return (
    <section className="py-16 sm:py-20 bg-kernel-ivory/60 border-b border-kernel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-xl border border-kernel-border transition-all duration-200 hover:border-kernel-gold hover:shadow-subtle flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-kernel-ivory flex items-center justify-center border border-kernel-border/80 mb-5">
                  <Icon className="w-6 h-6 text-kernel-gold" />
                </div>
                <h3 className="text-lg font-bold text-kernel-charcoal mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-kernel-muted leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
