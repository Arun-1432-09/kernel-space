import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getContentList, getCategories } from "@/lib/data/queries";
import { ContentCard } from "@/components/content/ContentCard";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Read — Essays, Breakdowns & Visual Deep Dives",
  description:
    "Long-form essays, systems breakdowns, and visual deep-dives exploring technology, business, psychology, and design.",
};

export const revalidate = 60;

export default async function ReadHubPage() {
  const [allContent, categories] = await Promise.all([
    getContentList({ status: "published" }),
    getCategories(),
  ]);

  const articles = allContent.filter(
    (c) => c.content_type === "article" || c.content_type === "explainer"
  );

  const featured = articles.find((a) => a.featured) || articles[0];
  const remaining = articles.filter((a) => a.id !== featured?.id);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
            <BookOpen className="w-3.5 h-3.5 text-kernel-gold" />
            <span>The Written Edition</span>
          </div>
          <h1 className="heading-hero">
            Read & Reflect
          </h1>
          <p className="subheading-editorial text-base sm:text-lg">
            Thorough research, multidisciplinary connections, and clear explanations without oversimplification.
          </p>
        </div>

        {/* Featured Essay Card */}
        {featured && (
          <ScrollFadeUp>
            <div className="editorial-card overflow-hidden bg-kernel-ivory border border-kernel-border group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px]">
                <Image
                  src={featured.thumbnail_url}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[10px] font-bold uppercase text-kernel-charcoal shadow-sm">
                  Featured Long-Form
                </span>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-kernel-grey">
                    <span className="font-semibold text-gold-accent uppercase">
                      {featured.categories?.[0]?.name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-kernel-gold" />
                      {featured.duration_seconds ? `${Math.round(featured.duration_seconds / 60)} min read` : "6 min read"}
                    </span>
                  </div>

                  <Link href={`/content/${featured.slug}`}>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors leading-snug">
                      {featured.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-kernel-grey leading-relaxed line-clamp-3">
                    {featured.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-kernel-border/70 flex items-center justify-between">
                  <span className="text-xs text-kernel-grey font-medium">
                    {formatDate(featured.publication_date)}
                  </span>
                  <Link
                    href={`/content/${featured.slug}`}
                    className="btn-gold text-xs px-5 py-2.5 inline-flex items-center gap-1.5"
                  >
                    <span>Read complete essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeUp>
      )}

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <Link
            href="/read"
            className="px-4 py-1.5 rounded-full bg-kernel-charcoal text-white text-xs font-semibold whitespace-nowrap"
          >
            All Essays
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.slug}&type=article`}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-kernel-ivory border border-kernel-border text-xs font-medium text-kernel-charcoal whitespace-nowrap transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-kernel-charcoal">
            All Written Inquiries ({remaining.length + 1})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {remaining.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
