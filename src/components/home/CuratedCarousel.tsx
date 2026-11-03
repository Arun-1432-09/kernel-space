"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { ContentItem } from "@/lib/types";
import { ContentCard } from "../content/ContentCard";

interface CuratedCarouselProps {
  items: ContentItem[];
}

export function CuratedCarousel({ items }: CuratedCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayItems = items.slice(0, 3);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-kernel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-gold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-kernel-gold" />
              <span>Editor's Picks</span>
            </div>
            <h2 className="heading-section">
              Curated for curious minds
            </h2>
            <p className="mt-2 text-sm sm:text-base text-kernel-muted">
              Hand-selected stories with varied perspectives and thoughtful breakdowns.
            </p>
          </div>

          {/* Desktop & Mobile Navigation controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-lg border border-kernel-border text-kernel-charcoal hover:bg-kernel-ivory transition-colors"
              aria-label="Previous story"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-lg border border-kernel-border text-kernel-charcoal hover:bg-kernel-ivory transition-colors"
              aria-label="Next story"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Cards Layout: Responsive Grid on Desktop, Smooth Carousel on Mobile */}
        <div
          ref={carouselRef}
          className="flex lg:grid lg:grid-cols-1 gap-6 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory hide-scrollbar"
        >
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[85vw] sm:min-w-[420px] lg:min-w-0 flex-shrink-0 snap-start"
            >
              <ContentCard content={item} variant="horizontal" />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <span className="text-xs text-kernel-muted">Swipe horizontally to explore all picks</span>
        </div>
      </div>
    </section>
  );
}
