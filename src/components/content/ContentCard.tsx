import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Headphones, FileText, Sparkles, Clock, ArrowRight } from "lucide-react";
import { ContentItem, ContentType } from "@/lib/types";
import { formatDuration, formatDate } from "@/lib/utils";

interface ContentCardProps {
  content: ContentItem;
  variant?: "default" | "horizontal" | "dark";
  className?: string;
}

export function ContentCard({
  content,
  variant = "default",
  className = "",
}: ContentCardProps) {
  const isDark = variant === "dark";
  const isHorizontal = variant === "horizontal";

  const renderTypeIcon = () => {
    switch (content.content_type) {
      case "video":
        return <Play className="w-3.5 h-3.5 fill-current" />;
      case "podcast":
        return <Headphones className="w-3.5 h-3.5" />;
      case "explainer":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "deep_dive":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "article":
      default:
        return <FileText className="w-3.5 h-3.5" />;
    }
  };

  const typeLabels: Record<ContentType, string> = {
    video: "Video",
    podcast: "Podcast",
    explainer: "Explainer",
    article: "Article",
    deep_dive: "Deep-Dive",
  };

  // Horizontal Card Variant (Curated for Curious Minds)
  if (isHorizontal) {
    return (
      <article
        className={`group editorial-card p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-stretch ${className}`}
      >
        {/* Thumbnail */}
        <div className="relative w-full sm:w-56 h-48 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden bg-kernel-ivory">
          <Image
            src={content.thumbnail_url}
            alt={content.title}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {content.is_demo && (
            <span className="absolute top-2 left-2 bg-kernel-charcoal/80 backdrop-blur-sm text-[10px] font-semibold text-kernel-gold px-2 py-0.5 rounded uppercase tracking-wider">
              Demo
            </span>
          )}
          <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-kernel-charcoal text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
            {renderTypeIcon()}
            <span>{typeLabels[content.content_type]}</span>
          </span>
        </div>

        {/* Content Info */}
        <div className="flex flex-col justify-between flex-grow py-1">
          <div>
            <div className="flex items-center gap-3 text-xs text-kernel-muted mb-2">
              {content.categories && content.categories[0] && (
                <span className="font-semibold text-kernel-gold uppercase tracking-wider">
                  {content.categories[0].name}
                </span>
              )}
              {content.duration_seconds && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(content.duration_seconds)}
                </span>
              )}
            </div>

            <Link href={`/content/${content.slug}`}>
              <h3 className="text-xl font-bold text-kernel-charcoal group-hover:text-kernel-gold transition-colors line-clamp-2">
                {content.title}
              </h3>
            </Link>

            <p className="mt-2 text-sm text-kernel-muted line-clamp-2 leading-relaxed">
              {content.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-kernel-border/60 flex items-center justify-between">
            <span className="text-xs text-kernel-muted">
              {formatDate(content.publication_date)}
            </span>
            <Link
              href={`/content/${content.slug}`}
              className="text-xs font-semibold text-kernel-gold group-hover:text-kernel-gold-hover inline-flex items-center gap-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Dark Card Variant (Dark Featured Panel #242321)
  if (isDark) {
    return (
      <article
        className={`group bg-[#2A2926] border border-white/10 rounded-xl overflow-hidden hover:border-kernel-gold/60 transition-all duration-300 flex flex-col justify-between ${className}`}
      >
        <div>
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/20">
            <Image
              src={content.thumbnail_url}
              alt={content.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {content.is_demo && (
              <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-[10px] font-semibold text-kernel-gold px-2 py-0.5 rounded uppercase tracking-wider">
                Demo
              </span>
            )}
            <span className="absolute bottom-2.5 left-2.5 bg-[#242321]/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1.5 border border-white/10">
              {renderTypeIcon()}
              <span>{typeLabels[content.content_type]}</span>
            </span>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between text-xs text-kernel-border/80 mb-2.5">
              {content.categories && content.categories[0] && (
                <span className="text-kernel-gold font-medium uppercase tracking-wider text-[11px]">
                  {content.categories[0].name}
                </span>
              )}
              {content.duration_seconds && (
                <span className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3 h-3" />
                  {formatDuration(content.duration_seconds)}
                </span>
              )}
            </div>

            <Link href={`/content/${content.slug}`}>
              <h3 className="text-lg font-bold text-white group-hover:text-kernel-gold transition-colors line-clamp-2">
                {content.title}
              </h3>
            </Link>

            <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>

        <div className="p-5 pt-0 mt-auto flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            {formatDate(content.publication_date)}
          </span>
          <Link
            href={`/content/${content.slug}`}
            className="text-xs font-semibold text-kernel-gold hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <span>Dive in</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    );
  }

  // Default Editorial Card Variant (Explore Grid, Watch, Listen, etc.)
  return (
    <article
      className={`group editorial-card overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-kernel-ivory">
          <Image
            src={content.thumbnail_url}
            alt={content.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {content.is_demo && (
            <span className="absolute top-2.5 left-2.5 bg-kernel-charcoal/80 backdrop-blur-sm text-[10px] font-semibold text-kernel-gold px-2 py-0.5 rounded uppercase tracking-wider">
              Demo
            </span>
          )}
          <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-kernel-charcoal text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1.5 shadow-sm">
            {renderTypeIcon()}
            <span>{typeLabels[content.content_type]}</span>
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-kernel-muted mb-2">
            {content.categories && content.categories[0] && (
              <span className="font-semibold text-kernel-gold uppercase tracking-wider text-[11px]">
                {content.categories[0].name}
              </span>
            )}
            {content.duration_seconds && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(content.duration_seconds)}
              </span>
            )}
          </div>

          <Link href={`/content/${content.slug}`}>
            <h3 className="text-lg font-bold text-kernel-charcoal group-hover:text-kernel-gold transition-colors line-clamp-2">
              {content.title}
            </h3>
          </Link>

          <p className="mt-2 text-sm text-kernel-muted line-clamp-2 leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto border-t border-kernel-border/40 flex items-center justify-between">
        <span className="text-xs text-kernel-muted">
          {formatDate(content.publication_date)}
        </span>
        <Link
          href={`/content/${content.slug}`}
          className="text-xs font-semibold text-kernel-gold group-hover:text-kernel-gold-hover inline-flex items-center gap-1"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
