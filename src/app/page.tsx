import { HeroSection } from "@/components/home/HeroSection";
import { PhilosophyHighlights } from "@/components/home/PhilosophyHighlights";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { LatestExplorationsRail } from "@/components/home/LatestExplorationsRail";
import { StartHereSection } from "@/components/home/StartHereSection";
import { StorySection } from "@/components/home/StorySection";
import { CategoryBentoMap } from "@/components/home/CategoryBentoMap";
import { MagazineLayout } from "@/components/home/MagazineLayout";
import { RawAndRealPanel } from "@/components/home/RawAndRealPanel";
import { HowWeThinkStrip } from "@/components/home/HowWeThinkStrip";
import { PitchTopicCTA } from "@/components/home/PitchTopicCTA";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getCategories, getContentList } from "@/lib/data/queries";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [categories, allPublished] = await Promise.all([
    getCategories(),
    getContentList({ status: "published" }),
  ]);

  // Compute live published counts for each category
  const categoriesWithCounts = categories.map((cat) => {
    const count = allPublished.filter((item) =>
      item.categories?.some((c) => c.slug === cat.slug)
    ).length;
    return { ...cat, count };
  });

  const featuredItems = allPublished.filter((item) => item.featured);
  const latestPodcasts = allPublished.filter((item) => item.content_type === "podcast");
  const latestPodcast = latestPodcasts[0] || null;

  return (
    <>
      {/* 4.2 Hero Section with Arch Composition and Category Ticker */}
      <HeroSection />

      {/* 4.3 Philosophy: Four Highlights (01-04) */}
      <PhilosophyHighlights />

      {/* 4.4 Featured Content (Dark Charcoal Space Section) */}
      <FeaturedShowcase featuredItems={featuredItems} />

      {/* 4.5 Latest Explorations (Scroll-snap Card Rail) */}
      <LatestExplorationsRail items={allPublished} />

      {/* 4.12 Start Here ("New here? Start with these.") */}
      <StartHereSection items={allPublished} />

      {/* 4.6 The Kernel Space Story */}
      <StorySection />

      {/* 4.7 Explore Our Universe (Bento-style Category Map with Live Counts) */}
      <CategoryBentoMap categories={categoriesWithCounts} />

      {/* 4.8 Featured Conversations and Visual Stories (Magazine Layout) */}
      <MagazineLayout items={allPublished} />

      {/* 4.13 Raw & Real Panel */}
      <RawAndRealPanel latestPodcast={latestPodcast} />

      {/* 4.9 How We Think (5-Step Row) */}
      <HowWeThinkStrip />

      {/* 4.14 Pitch a Topic CTA */}
      <PitchTopicCTA />

      {/* 4.10 Newsletter with Under-18 Consent & Honeypot */}
      <NewsletterSection />
    </>
  );
}
