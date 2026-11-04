import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";
import { getContentList } from "@/lib/data/queries";
import { ContentCard } from "@/components/content/ContentCard";

interface ChannelPageProps {
  params: { slug: string };
}

// Active channels whitelist: currently only the main channel is active per Section 1.11
const ACTIVE_CHANNELS: Record<string, { name: string; description: string }> = {
  main: {
    name: "Kernel Space Main Channel",
    description: "The primary multi-format home for genuine conversations, visual explainers, and systems breakdowns.",
  },
};

export async function generateMetadata({ params }: ChannelPageProps): Promise<Metadata> {
  const channel = ACTIVE_CHANNELS[params.slug];
  if (!channel) return { title: "Channel Not Found" };

  return {
    title: `${channel.name} — Kernel Space`,
    description: channel.description,
  };
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const channel = ACTIVE_CHANNELS[params.slug];
  // Inactive channels per Section 1.11 must not appear as live!
  if (!channel) {
    notFound();
  }

  const allContent = await getContentList({ status: "published" });

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-kernel-grey hover:text-kernel-charcoal font-medium uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-editorial-lg p-8 sm:p-14 border border-kernel-border shadow-subtle space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kernel-ivory border border-kernel-border text-[10px] font-bold uppercase tracking-widest text-gold-accent">
            <Radio className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Active Channel</span>
          </div>

          <h1 className="heading-hero text-3xl sm:text-5xl font-normal">
            {channel.name}
          </h1>

          <p className="subheading-editorial text-base sm:text-lg max-w-2xl leading-relaxed">
            {channel.description}
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-kernel-charcoal">
            Channel Broadcasts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allContent.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
