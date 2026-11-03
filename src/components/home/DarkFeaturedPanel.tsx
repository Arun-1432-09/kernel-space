import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { ContentItem } from "@/lib/types";
import { ContentCard } from "../content/ContentCard";

interface DarkFeaturedPanelProps {
  featuredItems: ContentItem[];
}

export function DarkFeaturedPanel({ featuredItems }: DarkFeaturedPanelProps) {
  const displayItems = featuredItems.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-kernel-charcoal text-white relative overflow-hidden">
      {/* Subtle background ambient graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-kernel-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-kernel-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-kernel-gold">
              <Compass className="w-3.5 h-3.5 text-kernel-gold" />
              <span>Selected Deep Dives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Discover what sparks your curiosity
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Curated investigations and long-form dialogues that peel back the layers of complex systems.
            </p>
          </div>

          <Link
            href="/explore"
            className="btn-gold inline-flex items-center gap-2 self-start md:self-auto flex-shrink-0"
          >
            <span>Explore All Content</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item) => (
            <ContentCard key={item.id} content={item} variant="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
