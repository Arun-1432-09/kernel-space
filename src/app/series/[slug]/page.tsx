import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Layers, Clock } from "lucide-react";
import { getContentList } from "@/lib/data/queries";
import { ContentCard } from "@/components/content/ContentCard";

interface SeriesPageProps {
  params: { slug: string };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Curated Series — Kernel Space",
    description: "Multi-part investigative collections exploring interrelated systems.",
  };
}

export default async function SeriesPage() {
  const allContent = await getContentList({ status: "published" });
  const seriesItems = allContent.slice(0, 4);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs text-kernel-grey hover:text-kernel-charcoal font-medium uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>

        {/* Series Hero Banner */}
        <div className="bg-white rounded-editorial-lg p-8 sm:p-14 border border-kernel-border shadow-subtle space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kernel-ivory border border-kernel-border text-[10px] font-bold uppercase tracking-widest text-gold-accent">
            <Layers className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Curated Collection</span>
          </div>

          <h1 className="heading-hero text-3xl sm:text-5xl font-normal">
            Foundations of Complex Systems
          </h1>

          <p className="subheading-editorial text-base sm:text-lg max-w-2xl leading-relaxed">
            A step-by-step sequence investigating cognitive biases, industrial engineering, and algorithmic models.
          </p>
        </div>

        {/* Series Sequence Grid */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-kernel-charcoal">
            Series Inquiries (4 Parts)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seriesItems.map((item, idx) => (
              <div key={item.id} className="relative flex flex-col">
                <span className="text-xs font-serif font-bold text-kernel-gold mb-2">
                  Part {idx + 1}
                </span>
                <ContentCard content={item} className="flex-grow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
