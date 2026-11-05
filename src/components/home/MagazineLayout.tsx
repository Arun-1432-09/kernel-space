"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Headphones, Play, BookOpen, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ContentItem } from "@/lib/types";
import { formatDuration, formatDate } from "@/lib/utils";

interface MagazineLayoutProps {
  items: ContentItem[];
}

export function MagazineLayout({ items }: MagazineLayoutProps) {
  const podcast = items.find((i) => i.content_type === "podcast") || items[0];
  const video = items.find((i) => i.content_type === "video") || items[1];
  const articles = items.filter((i) => i.content_type === "article" || i.content_type === "explainer").slice(0, 2);

  if (!podcast || !video) return null;

  return (
    <section className="py-20 sm:py-28 bg-white/60 relative overflow-hidden border-b border-kernel-border/70">
      {/* Ambient Glass Glows */}
      <div className="glass-ambient-gold w-[420px] h-[420px] -top-16 -right-16 opacity-30" aria-hidden="true" />
      <div className="glass-ambient-ivory w-[400px] h-[400px] -bottom-16 -left-16 opacity-60" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10"
      >
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
            Curated Formats
          </span>
          <h2 className="heading-section">
            Stories across sound, sight & text.
          </h2>
          <p className="subheading-editorial text-sm sm:text-base">
            The topic dictates how we tell the story. Some need conversation, some need visuals, some need deep essays.
          </p>
        </div>

        {/* Magazine Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tall Podcast Card (4 cols) with Frosted Glass Panel */}
          <Link
            href={`/content/${podcast.slug}`}
            className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-kernel-gold transition-all duration-300 hover:-translate-y-1 block"
          >
            <div className="space-y-4">
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/5] rounded-xl overflow-hidden bg-white/70">
                <Image
                  src={podcast.thumbnail_url}
                  alt={podcast.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass-pill text-[10px] font-bold uppercase text-kernel-charcoal shadow-sm flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-kernel-gold" />
                  <span>Audio Dialogue</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent block mb-1">
                  {podcast.categories?.[0]?.name || "Podcast"}
                </span>
                <h3 className="font-serif text-2xl font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors leading-snug">
                  {podcast.title}
                </h3>
                <p className="mt-2 text-xs text-kernel-grey line-clamp-3 leading-relaxed">
                  {podcast.description}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-kernel-border/70 flex items-center justify-between text-xs font-semibold text-kernel-charcoal">
              <span className="flex items-center gap-1 text-kernel-grey font-normal">
                <Clock className="w-3.5 h-3.5 text-kernel-gold" />
                {formatDuration(podcast.duration_seconds)}
              </span>
              <span className="text-gold-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Listen now →
              </span>
            </div>
          </Link>

          {/* Right Area (8 cols): Wide Video Card + 2 Horizontal Articles */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-8">
            {/* Wide Video Card */}
            <Link
              href={`/content/${video.slug}`}
              className="glass-card overflow-hidden group hover:border-kernel-gold transition-all duration-300 flex flex-col sm:flex-row rounded-2xl hover:-translate-y-1 block"
            >
              <div className="relative w-full sm:w-1/2 aspect-[16/10] sm:aspect-auto overflow-hidden bg-kernel-ivory">
                <Image
                  src={video.thumbnail_url}
                  alt={video.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass-pill text-[10px] font-bold uppercase text-kernel-charcoal shadow-sm flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-current text-kernel-gold" />
                  <span>Visual Explainer</span>
                </span>
              </div>

              <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent block">
                    {video.categories?.[0]?.name || "Video Breakdown"}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-kernel-grey line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-kernel-border/60 flex items-center justify-between text-xs font-semibold text-kernel-charcoal">
                  <span className="text-kernel-grey font-normal">{formatDate(video.publication_date)}</span>
                  <span className="text-gold-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Watch breakdown →
                  </span>
                </div>
              </div>
            </Link>

            {/* Two Distinct Articles Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.map((art) => (
                <Link
                  key={art.id}
                  href={`/content/${art.slug}`}
                  className="glass-card p-6 flex flex-col justify-between group hover:border-kernel-gold transition-all duration-300 rounded-2xl hover:-translate-y-1 block"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gold-accent">
                      <span>{art.categories?.[0]?.name || "Essay"}</span>
                      <span className="text-kernel-grey font-normal">{art.reading_time_minutes || 6} min read</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors leading-snug">
                      {art.title}
                    </h4>

                    <p className="text-xs text-kernel-grey line-clamp-2 leading-relaxed">
                      {art.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-kernel-border/60 flex items-center justify-between text-xs font-semibold text-gold-accent">
                    <span>Read essay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
