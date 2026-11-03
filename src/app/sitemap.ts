import { MetadataRoute } from "next";
import { SEED_CONTENT } from "@/lib/data/mock-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kernelspace.media";

  // Static routes
  const routes = [
    "",
    "/explore",
    "/watch",
    "/listen",
    "/about",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic content routes
  const contentRoutes = SEED_CONTENT.map((item) => ({
    url: `${baseUrl}/content/${item.slug}`,
    lastModified: item.updated_at || new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...contentRoutes];
}
