import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCategories, getContentList } from "@/lib/data/queries";
import { ContentCard } from "@/components/content/ContentCard";
import { ArrowLeft, ArrowRight, Compass, ShieldAlert } from "lucide-react";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `${cat.name} — Kernel Space`,
    description: cat.description || `Explorations in ${cat.name}`,
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [categories, allContent] = await Promise.all([
    getCategories(),
    getContentList({ status: "published" }),
  ]);

  const catIndex = categories.findIndex((c) => c.slug === params.slug);
  if (catIndex === -1) notFound();

  const category = categories[catIndex];
  const num = String(catIndex + 1).padStart(2, "0");

  const matchingContent = allContent.filter((item) =>
    item.categories?.some((c) => c.slug === category.slug)
  );

  const otherCategories = categories.filter((c) => c.id !== category.id).slice(0, 3);

  // Specific legal disclaimers per Section 1.4
  const isPsychology = category.slug === "psychology-and-mental-health";
  const isFinance = category.slug === "finance-and-economics";

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs text-kernel-grey hover:text-kernel-charcoal font-medium uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Disciplines</span>
        </Link>

        {/* Category Hero */}
        <div className="bg-white rounded-editorial-lg p-8 sm:p-14 border border-kernel-border shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-kernel-gold">
                {num}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-kernel-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-gold-accent">
                Foundational Discipline
              </span>
            </div>

            <h1 className="heading-hero text-4xl sm:text-5xl lg:text-6xl font-normal">
              {category.name}
            </h1>

            <p className="subheading-editorial text-base sm:text-lg max-w-2xl leading-relaxed">
              {category.description}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-kernel-grey">
              <span>Published inquiries: <strong className="text-kernel-charcoal">{matchingContent.length}</strong></span>
            </div>

            {/* Category-Specific Disclaimers per Section 1.4 */}
            {isPsychology && (
              <div className="mt-4 p-3 rounded-lg bg-kernel-ivory border border-kernel-border text-[11px] text-kernel-grey flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-kernel-gold flex-shrink-0" />
                <span>For general understanding only. Not medical or professional advice.</span>
              </div>
            )}

            {isFinance && (
              <div className="mt-4 p-3 rounded-lg bg-kernel-ivory border border-kernel-border text-[11px] text-kernel-grey flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-kernel-gold flex-shrink-0" />
                <span>Educational content, not financial advice.</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-kernel-border">
            <h2 className="font-serif text-2xl font-bold text-kernel-charcoal">
              Explorations in {category.name}
            </h2>
            <span className="text-xs text-kernel-grey">
              {matchingContent.length} {matchingContent.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {matchingContent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingContent.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center rounded-2xl bg-white border border-kernel-border space-y-3">
              <Compass className="w-8 h-8 text-kernel-gold mx-auto" />
              <h3 className="font-serif text-lg font-bold text-kernel-charcoal">
                Exploring soon
              </h3>
              <p className="text-xs text-kernel-grey max-w-sm mx-auto">
                We are currently researching inquiries for this discipline. Check back with our upcoming dispatches.
              </p>
            </div>
          )}
        </div>

        {/* Related Categories */}
        <div className="pt-12 border-t border-kernel-border space-y-6">
          <h3 className="font-serif text-xl font-bold text-kernel-charcoal">
            Adjacent Territories to Explore
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherCategories.map((otherCat) => (
              <Link
                key={otherCat.id}
                href={`/category/${otherCat.slug}`}
                className="editorial-card p-6 flex items-center justify-between group hover:border-kernel-gold transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent block mb-1">
                    Discipline
                  </span>
                  <h4 className="font-serif text-base font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors">
                    {otherCat.name}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-kernel-grey group-hover:text-kernel-gold group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
