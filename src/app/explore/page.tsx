import { Suspense } from "react";
import type { Metadata } from "next";
import { getCategories, getContentList } from "@/lib/data/queries";
import { ExploreView } from "@/components/content/ExploreView";
import { Compass, Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Explore our complete library of podcasts, explanatory videos, essays, and systems breakdowns across technology, business, psychology, and design.",
};

export const revalidate = 60;

export default async function ExplorePage() {
  const [categories, content] = await Promise.all([
    getCategories(),
    getContentList({ status: "published" }),
  ]);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-gold">
            <Compass className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Knowledge Directory</span>
          </div>
          <h1 className="heading-hero">
            Explore Content
          </h1>
          <p className="subheading-editorial text-base sm:text-lg">
            Search questions, filter by discipline, and discover explanations designed to help you think deeper.
          </p>
        </div>

        {/* Interactive Explore View wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-kernel-muted">
              <Loader2 className="w-6 h-6 animate-spin text-kernel-gold" />
              <p className="text-sm">Loading knowledge library...</p>
            </div>
          }
        >
          <ExploreView initialContent={content} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
