import type { Metadata } from "next";
import Link from "next/link";
import { getContentList } from "@/lib/data/queries";
import { MediaEmbed } from "@/components/content/MediaEmbed";
import { ContentCard } from "@/components/content/ContentCard";
import { Play, Clock, ArrowRight } from "lucide-react";
import { formatDuration, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Watch — Visual Deep Dives & Explainers",
  description:
    "Explanatory videos and visual breakdowns. Systems thinking meets cinematic storytelling to explain how the modern world works.",
};

export const revalidate = 60;

export default async function WatchPage() {
  const allContent = await getContentList({ status: "published" });
  // Get videos and explainers
  const videoContent = allContent.filter(
    (c) => c.content_type === "video" || c.content_type === "explainer"
  );

  const featuredVideo = videoContent.find((v) => v.featured && v.media_url) || videoContent[0];
  const remainingVideos = videoContent.filter((v) => v.id !== featuredVideo?.id);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-gold">
            <Play className="w-3.5 h-3.5 text-kernel-gold fill-current" />
            <span>Visual Storytelling</span>
          </div>
          <h1 className="heading-hero">
            Watch & Learn
          </h1>
          <p className="subheading-editorial text-base sm:text-lg">
            Systems explanations, animated breakdowns, and visual deep dives. Johnny Harris meets Vox meets clear editorial rigor.
          </p>
        </div>

        {/* Featured Video Section */}
        {featuredVideo && (
          <div className="bg-kernel-ivory/60 rounded-3xl p-6 sm:p-10 border border-kernel-border space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-kernel-gold">
              Featured Visual Deep Dive
            </span>

            {/* Media Embed: Embedded ONLY if a valid YouTube or Spotify URL is provided */}
            {featuredVideo.media_url ? (
              <MediaEmbed
                mediaUrl={featuredVideo.media_url}
                title={featuredVideo.title}
              />
            ) : null}

            <div className="pt-2 space-y-3 max-w-3xl">
              <div className="flex items-center gap-4 text-xs text-kernel-muted">
                {featuredVideo.categories && featuredVideo.categories[0] && (
                  <span className="font-semibold text-kernel-gold uppercase">
                    {featuredVideo.categories[0].name}
                  </span>
                )}
                {featuredVideo.duration_seconds && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(featuredVideo.duration_seconds)}
                  </span>
                )}
                <span>{formatDate(featuredVideo.publication_date)}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-kernel-charcoal">
                {featuredVideo.title}
              </h2>

              <p className="text-sm sm:text-base text-kernel-muted leading-relaxed">
                {featuredVideo.description}
              </p>

              <div className="pt-2">
                <Link
                  href={`/content/${featuredVideo.slug}`}
                  className="btn-gold inline-flex items-center gap-2 text-xs font-semibold"
                >
                  <span>Read full breakdown and notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* More Visual Breakdowns Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-kernel-border">
            <h2 className="text-xl sm:text-2xl font-bold text-kernel-charcoal">
              All Explanatory Videos
            </h2>
            <span className="text-xs text-kernel-muted">
              {remainingVideos.length} videos available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingVideos.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
