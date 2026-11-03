import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getContentBySlug, getRelatedContent } from "@/lib/data/queries";
import { MediaEmbed } from "@/components/content/MediaEmbed";
import { ContentCard } from "@/components/content/ContentCard";
import { formatDuration, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Sparkles,
  Play,
  Headphones,
  FileText,
  Share2,
} from "lucide-react";

interface ContentDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ContentDetailPageProps): Promise<Metadata> {
  const item = await getContentBySlug(params.slug);
  if (!item) {
    return { title: "Content Not Found" };
  }

  return {
    title: `${item.title} — Kernel Space`,
    description: item.description,
    openGraph: {
      title: `${item.title} — Kernel Space`,
      description: item.description,
      images: [{ url: item.thumbnail_url }],
    },
  };
}

export const revalidate = 60;

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const item = await getContentBySlug(params.slug);

  if (!item) {
    notFound();
  }

  const categoryIds = item.categories?.map((c) => c.id) || [];
  const related = await getRelatedContent(item.slug, categoryIds, 3);

  const renderTypeIcon = () => {
    switch (item.content_type) {
      case "video":
        return <Play className="w-4 h-4 fill-current" />;
      case "podcast":
        return <Headphones className="w-4 h-4" />;
      case "explainer":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <article className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Navigation */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-muted hover:text-kernel-gold transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kernel-gold rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Library</span>
          </Link>
        </div>

        {/* Content Header & Metadata */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kernel-ivory border border-kernel-border text-xs font-bold uppercase tracking-wider text-kernel-charcoal">
              {renderTypeIcon()}
              <span>{item.content_type}</span>
            </span>

            {item.categories?.map((cat) => (
              <Link
                key={cat.id}
                href={`/explore?category=${cat.slug}`}
                className="px-3 py-1 rounded-full bg-kernel-gold/10 text-kernel-gold-hover hover:bg-kernel-gold/20 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {cat.name}
              </Link>
            ))}

            {item.is_demo && (
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-widest">
                Demo Sample
              </span>
            )}
          </div>

          <h1 className="heading-hero">
            {item.title}
          </h1>

          <p className="text-lg sm:text-xl text-kernel-muted leading-relaxed font-normal">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-kernel-border text-xs text-kernel-muted">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-kernel-gold" />
                <span>{formatDate(item.publication_date)}</span>
              </span>
              {item.duration_seconds && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-kernel-gold" />
                  <span>{formatDuration(item.duration_seconds)}</span>
                </span>
              )}
            </div>

            <div className="text-xs text-kernel-gold font-medium">
              Kernel Space Original
            </div>
          </div>
        </header>

        {/* Media Embed (YouTube / Spotify if valid URL provided) */}
        {item.media_url ? (
          <div className="my-8">
            <MediaEmbed mediaUrl={item.media_url} title={item.title} />
          </div>
        ) : (
          /* Cover Image if no video/audio embed */
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-card border border-kernel-border bg-kernel-ivory">
            <Image
              src={item.thumbnail_url}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}

        {/* Body Text / Essay / Notes */}
        {item.body && (
          <div className="pt-6 prose prose-stone max-w-none prose-headings:font-bold prose-headings:text-kernel-charcoal prose-p:text-kernel-charcoal prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-p:font-normal">
            {item.body.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Demo Content Disclaimer Notice */}
        {item.is_demo && (
          <div className="p-4 rounded-xl bg-kernel-ivory border border-kernel-border text-xs text-kernel-muted flex items-center justify-between gap-4">
            <span>
              <strong>Note:</strong> This entry is marked as sample demo content. You can edit, update, or remove it from the admin CMS dashboard.
            </span>
            <Link
              href="/admin/content"
              className="text-kernel-gold hover:underline font-semibold flex-shrink-0"
            >
              Open in Admin
            </Link>
          </div>
        )}

        {/* Related Content Section */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-kernel-border space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-kernel-charcoal">
                Continue Exploring
              </h2>
              <Link
                href="/explore"
                className="text-xs font-semibold text-kernel-gold hover:underline"
              >
                View all content →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((relItem) => (
                <ContentCard key={relItem.id} content={relItem} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
