import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Clock, Play, Headphones, BookOpen } from "lucide-react";
import { ContentItem } from "@/lib/types";
import { formatDuration, formatDate } from "@/lib/utils";

interface FeaturedShowcaseProps {
  featuredItems: ContentItem[];
}

export function FeaturedShowcase({ featuredItems }: FeaturedShowcaseProps) {
  const primaryItem = featuredItems[0];
  const queuedItems = featuredItems.slice(1, 4);

  if (!primaryItem) return null;

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
    <section className="py-20 sm:py-28 bg-kernel-charcoal text-white relative overflow-hidden">
      {/* Subtle Star-point / Ambient Space Texture at low opacity */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-kernel-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-kernel-gold">
            <Sparkles className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Featured Perspectives</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Ideas Worth Exploring.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
            Conversations, stories and deep-dives that make you see things differently.
          </p>
        </div>

        {/* Cinematic Grid: 1 Large Left (7 cols) + Queued Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Primary Cinematic Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-[#2A2926] flex flex-col justify-between group hover:border-kernel-gold/60 transition-all duration-300 shadow-floating">
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
              <Image
                src={primaryItem.thumbnail_url}
                alt={primaryItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2926] via-transparent to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-kernel-gold uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
                  {renderTypeIcon(primaryItem.content_type)}
                  <span className="capitalize">{primaryItem.content_type}</span>
                </span>
                {primaryItem.is_demo && (
                  <span className="px-2 py-0.5 rounded bg-amber-900/80 text-amber-200 text-[10px] font-bold uppercase tracking-wider border border-amber-700/50">
                    Demo
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  {primaryItem.categories && primaryItem.categories[0] && (
                    <span className="font-semibold text-kernel-gold uppercase tracking-wider">
                      {primaryItem.categories[0].name}
                    </span>
                  )}
                  {primaryItem.duration_seconds && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-kernel-gold" />
                      {formatDuration(primaryItem.duration_seconds)}
                    </span>
                  )}
                  <span>{formatDate(primaryItem.publication_date)}</span>
                </div>

                <Link href={`/content/${primaryItem.slug}`}>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-kernel-gold transition-colors leading-snug">
                    {primaryItem.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans line-clamp-3">
                  {primaryItem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/content/${primaryItem.slug}`}
                  className="btn-gold text-xs px-6 py-2.5 inline-flex items-center gap-2"
                >
                  <span>Explore Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-zinc-400 font-mono">
                  Read & reflect
                </span>
              </div>
            </div>
          </div>

          {/* Queued Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-kernel-gold block">
              Up Next in Queue
            </span>

            {queuedItems.map((item) => (
              <Link
                key={item.id}
                href={`/content/${item.slug}`}
                className="group p-4 rounded-xl border border-white/10 bg-[#282725] hover:bg-[#2F2D2A] hover:border-kernel-gold/50 transition-all duration-200 flex items-center gap-4"
              >
                <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
                  <Image
                    src={item.thumbnail_url}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-medium text-kernel-gold uppercase">
                    {item.content_type}
                  </span>
                </div>

                <div className="min-w-0 flex-grow">
                  <span className="text-[10px] font-bold text-kernel-gold uppercase tracking-wider block mb-1">
                    {item.categories?.[0]?.name || "Inquiry"}
                  </span>
                  <h4 className="font-serif text-base font-normal text-white group-hover:text-kernel-gold transition-colors truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1">
                    {item.duration_seconds && (
                      <span>{formatDuration(item.duration_seconds)}</span>
                    )}
                    <span>•</span>
                    <span>{formatDate(item.publication_date)}</span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-kernel-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
