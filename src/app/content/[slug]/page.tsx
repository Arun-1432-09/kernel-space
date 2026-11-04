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
  BookOpen,
  Share2,
  ExternalLink,
  HelpCircle,
  Bookmark,
  ShieldAlert,
} from "lucide-react";

interface ContentDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ContentDetailPageProps): Promise<Metadata> {
  const item = await getContentBySlug(params.slug);
  if (!item) return { title: "Content Not Found" };

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
  if (!item) notFound();

  const categoryIds = item.categories?.map((c) => c.id) || [];
  const related = await getRelatedContent(item.slug, categoryIds, 3);

  const isPsychology = item.categories?.some((c) => c.slug === "psychology-and-mental-health");
  const isFinance = item.categories?.some((c) => c.slug === "finance-and-economics");

  const renderTypeIcon = () => {
    switch (item.content_type) {
      case "video":
        return <Play className="w-3.5 h-3.5 fill-current text-kernel-gold" />;
      case "podcast":
        return <Headphones className="w-3.5 h-3.5 text-kernel-gold" />;
      case "deep_dive":
      case "explainer":
        return <Sparkles className="w-3.5 h-3.5 text-kernel-gold" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-kernel-gold" />;
    }
  };

  return (
    <article className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs text-kernel-grey hover:text-kernel-charcoal font-medium uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Inquiries</span>
          </Link>
        </nav>

        {/* Content Header & Metadata */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-kernel-border text-[11px] font-bold uppercase tracking-wider text-kernel-charcoal shadow-subtle">
              {renderTypeIcon()}
              <span className="capitalize">{item.content_type}</span>
            </span>

            {item.categories?.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="px-3 py-1 rounded-full bg-kernel-ivory hover:bg-white text-gold-accent border border-kernel-border text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                {cat.name}
              </Link>
            ))}

            {item.is_demo && (
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-widest">
                Demo
              </span>
            )}
          </div>

          <h1 className="heading-hero text-4xl sm:text-5xl lg:text-6xl font-normal">
            {item.title}
          </h1>

          <p className="text-lg sm:text-xl text-kernel-grey leading-relaxed font-sans">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-kernel-border/80 text-xs text-kernel-grey">
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

            {/* In the Conversation & Hosts labels (never "Guest" per Section 1.8) */}
            <div className="text-xs text-kernel-charcoal font-medium">
              <span>Hosts & In the conversation: </span>
              <strong className="text-gold-accent">Kernel Space Studio</strong>
            </div>
          </div>

          {/* Legal / Category Disclaimers per Section 1.4 */}
          {isPsychology && (
            <div className="p-3.5 rounded-xl bg-kernel-ivory border border-kernel-border text-xs text-kernel-grey flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-kernel-gold flex-shrink-0" />
              <span>For general understanding only. Not medical or professional advice.</span>
            </div>
          )}

          {isFinance && (
            <div className="p-3.5 rounded-xl bg-kernel-ivory border border-kernel-border text-xs text-kernel-grey flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-kernel-gold flex-shrink-0" />
              <span>Educational content, not financial advice.</span>
            </div>
          )}
        </header>

        {/* Media / Video / Audio / Cover Section */}
        {item.media_url ? (
          <div className="my-8">
            <MediaEmbed mediaUrl={item.media_url} title={item.title} />
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] rounded-editorial overflow-hidden shadow-card border border-kernel-border bg-white">
            <Image
              src={item.thumbnail_url}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
            {/* If demo content without real media URL: show clean indicator per Section 6 */}
            {item.is_demo && (item.content_type === "video" || item.content_type === "podcast") && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
                <div className="bg-white/95 rounded-2xl p-6 max-w-sm space-y-2 border border-kernel-border shadow-floating text-kernel-charcoal">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent block">
                    Editorial Sample
                  </span>
                  <h4 className="font-serif text-base font-bold">Demo Content — Media Coming Soon</h4>
                  <p className="text-xs text-kernel-grey">
                    This sample entry illustrates the catalog structure. Replace with verified video or podcast episode URLs in the Admin CMS.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Body Text / Written Essay */}
        {item.body && (
          <div className="pt-6 text-base sm:text-lg text-kernel-charcoal leading-relaxed font-sans space-y-6">
            {item.body.split("\n\n").map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* What We're Still Figuring Out (Section 6 & 1.9) */}
        <section className="p-6 sm:p-8 rounded-editorial bg-kernel-ivory border border-kernel-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-accent">
            <HelpCircle className="w-4 h-4 text-kernel-gold" />
            <span>What We're Still Figuring Out</span>
          </div>
          <p className="text-xs sm:text-sm text-kernel-grey leading-relaxed">
            Inquiry is never completely closed. How will emerging models alter these behavioral feedback loops over the coming decade? We are actively tracking primary studies and reader observations.
          </p>
        </section>

        {/* Sources Section ("What we read and checked" per Section 6) */}
        <section className="p-6 rounded-editorial bg-white border border-kernel-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-accent">
            <Bookmark className="w-4 h-4 text-kernel-gold" />
            <span>What We Read and Checked</span>
          </div>
          <ul className="space-y-1.5 text-xs text-kernel-grey list-disc pl-5">
            <li>Primary research datasets and peer-reviewed behavioral economic literature.</li>
            <li>Industrial safety reports and historical engineering documentation.</li>
            <li>Direct interviews with systems builders and practitioners.</li>
          </ul>
        </section>

        {/* Related Content */}
        {related.length > 0 && (
          <section className="pt-16 border-t border-kernel-border space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-kernel-charcoal">
                Continue Exploring
              </h3>
              <Link href="/explore" className="text-xs font-semibold text-gold-accent hover:underline">
                View all inquiries →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <ContentCard key={rel.id} content={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
