import type { Metadata } from "next";
import Link from "next/link";
import { getContentList } from "@/lib/data/queries";
import { MediaEmbed } from "@/components/content/MediaEmbed";
import { ContentCard } from "@/components/content/ContentCard";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { Headphones, Clock, ArrowRight } from "lucide-react";
import { formatDuration, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Listen — Podcast Conversations",
  description:
    "Long-form podcast conversations with no scripts and no pretense. Like overhearing a fascinating conversation at a coffee shop.",
};

export const revalidate = 60;

export default async function ListenPage() {
  const allContent = await getContentList({ status: "published" });
  const podcasts = allContent.filter((c) => c.content_type === "podcast");

  const featuredEpisode = podcasts.find((p) => p.featured && p.media_url) || podcasts[0];
  const remainingEpisodes = podcasts.filter((p) => p.id !== featuredEpisode?.id);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-gold">
            <Headphones className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Audio Dialogues</span>
          </div>
          <h1 className="heading-hero">
            Listen & Reflect
          </h1>
          <p className="subheading-editorial text-base sm:text-lg">
            Free-flowing conversations between curious thinkers. No performative interviews, no scripted corporate talking points.
          </p>
        </div>

        {/* Featured Episode Section */}
        {featuredEpisode && (
          <ScrollFadeUp>
            <div className="bg-kernel-ivory/60 rounded-3xl p-6 sm:p-10 border border-kernel-border space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-kernel-gold">
                Featured Audio Dialogue
              </span>

              {/* Spotify Audio Embed (Embeds ONLY when valid Spotify URL supplied) */}
              {featuredEpisode.media_url ? (
                <MediaEmbed
                  mediaUrl={featuredEpisode.media_url}
                  title={featuredEpisode.title}
                />
              ) : null}

              <div className="pt-2 space-y-3 max-w-3xl">
                <div className="flex items-center gap-4 text-xs text-kernel-muted">
                  {featuredEpisode.categories && featuredEpisode.categories[0] && (
                    <span className="font-semibold text-kernel-gold uppercase">
                      {featuredEpisode.categories[0].name}
                    </span>
                  )}
                  {featuredEpisode.duration_seconds && (
                    <span className="flex items-center gap-1 font-medium text-kernel-charcoal">
                      <Clock className="w-3 h-3 text-kernel-gold" />
                      {formatDuration(featuredEpisode.duration_seconds)}
                    </span>
                  )}
                  <span>{formatDate(featuredEpisode.publication_date)}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-kernel-charcoal">
                  {featuredEpisode.title}
                </h2>

                <p className="text-sm sm:text-base text-kernel-muted leading-relaxed">
                  {featuredEpisode.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/content/${featuredEpisode.slug}`}
                    className="btn-gold inline-flex items-center gap-2 text-xs font-semibold"
                  >
                    <span>Episode transcript and resources</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollFadeUp>
        )}

        {/* More Episodes Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-kernel-border">
            <h2 className="text-xl sm:text-2xl font-bold text-kernel-charcoal">
              All Audio Episodes
            </h2>
            <span className="text-xs text-kernel-muted">
              {remainingEpisodes.length} episodes available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingEpisodes.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
