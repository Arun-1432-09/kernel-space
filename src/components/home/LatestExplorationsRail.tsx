"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Play, Headphones, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { ContentItem } from "@/lib/types";
import { formatDuration, formatDate } from "@/lib/utils";

interface LatestExplorationsRailProps {
  items: ContentItem[];
}

export function LatestExplorationsRail({ items }: LatestExplorationsRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-3.5 h-3.5 fill-current" />;
      case "podcast":
        return <Headphones className="w-3.5 h-3.5" />;
      case "deep_dive":
      case "explainer":
        return <Sparkles className="w-3.5 h-3.5" />;
      default:
        return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-kernel-border/70">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
      >
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
              Recent Dispatches
            </span>
            <h2 className="heading-section">
              Fresh Perspectives. New Discoveries.
            </h2>
            <p className="subheading-editorial text-sm sm:text-base">
              Explore our latest inquiries across systems, culture, and technology.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full glass-pill hover:bg-white transition-all text-kernel-charcoal shadow-xs hover:border-kernel-gold"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full glass-pill hover:bg-white transition-all text-kernel-charcoal shadow-xs hover:border-kernel-gold"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Card Rail with Scroll-snap */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/content/${item.slug}`}
              className="group min-w-[300px] sm:min-w-[340px] max-w-[340px] flex-shrink-0 snap-start bg-kernel-ivory rounded-editorial border border-kernel-border overflow-hidden hover:border-kernel-gold/70 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-white">
                  <Image
                    src={item.thumbnail_url}
                    alt={item.title}
                    fill
                    sizes="340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-semibold text-kernel-charcoal uppercase tracking-wider flex items-center gap-1 shadow-subtle">
                      {renderTypeIcon(item.content_type)}
                      <span className="capitalize">{item.content_type}</span>
                    </span>
                    {item.is_demo && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold uppercase">
                        Demo
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-kernel-grey">
                    {item.categories && item.categories[0] && (
                      <span className="font-semibold text-gold-accent uppercase tracking-wider text-[11px]">
                        {item.categories[0].name}
                      </span>
                    )}
                    {item.duration_seconds && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-kernel-gold" />
                        {formatDuration(item.duration_seconds)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-kernel-grey line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-auto border-t border-kernel-border/50 flex items-center justify-between text-xs font-semibold text-kernel-charcoal">
                <span className="text-[11px] text-kernel-grey font-normal">
                  {formatDate(item.publication_date)}
                </span>
                <span className="text-gold-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View Content →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
