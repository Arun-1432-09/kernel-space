import { SplitHero } from "@/components/home/SplitHero";
import { ValueBlocks } from "@/components/home/ValueBlocks";
import { DarkFeaturedPanel } from "@/components/home/DarkFeaturedPanel";
import { CuratedCarousel } from "@/components/home/CuratedCarousel";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ContactNewsletter } from "@/components/home/ContactNewsletter";
import { getCategories, getContentList, getSiteSettings } from "@/lib/data/queries";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [categories, allPublished, settings] = await Promise.all([
    getCategories(),
    getContentList({ status: "published" }),
    getSiteSettings(),
  ]);

  const featuredItems = allPublished.filter((item) => item.featured);
  // Pick curated items (distinct from featured if possible, or top items)
  const curatedItems = allPublished.filter((item) => !item.featured).slice(0, 3).length === 3
    ? allPublished.filter((item) => !item.featured).slice(0, 3)
    : allPublished.slice(0, 3);

  return (
    <>
      {/* 1. Split Hero */}
      <SplitHero
        label={settings.heroLabel}
        headline={settings.heroHeadline}
        supportText={settings.heroSupportText}
      />

      {/* 2. Four Value Blocks */}
      <ValueBlocks />

      {/* 3. Dark Featured Panel (#242321) */}
      <DarkFeaturedPanel featuredItems={featuredItems} />

      {/* 4. Curated for Curious Minds (Horizontal / Carousel) */}
      <CuratedCarousel items={curatedItems} />

      {/* 5. Featured Collection ("Explore beyond the surface") */}
      <FeaturedCollection />

      {/* 6. Explore Your Curiosity (8 Categories) */}
      <CategoryGrid categories={categories} />

      {/* 7. Contact and Newsletter */}
      <ContactNewsletter settings={settings} />
    </>
  );
}
