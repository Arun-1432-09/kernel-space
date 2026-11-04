import { Category, ContentItem, ContentType, SiteSettings, TeamMember, Pitch, Channel, PitchStatus } from "../types";
import { SEED_CATEGORIES, SEED_CONTENT, DEFAULT_SITE_SETTINGS, DEFAULT_TEAM_MEMBERS, SEED_CHANNELS, SEED_PITCHES } from "./mock-data";
import { createServerSupabaseClient } from "../supabase/server";
import { isSupabaseConfigured } from "../supabase/config";

export interface ContentFilterOptions {
  type?: ContentType | "all";
  categorySlug?: string;
  search?: string;
  status?: "all" | "published" | "draft";
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && data && data.length > 0) {
          return data as Category[];
        }
      }
    } catch (e) {
      console.warn("Supabase query failed, falling back to seed categories:", e);
    }
  }
  return SEED_CATEGORIES;
}

export async function getContentList(options: ContentFilterOptions = {}): Promise<ContentItem[]> {
  const {
    type,
    categorySlug,
    search,
    status = "published",
    featured,
    limit,
    offset = 0,
  } = options;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        let query = supabase
          .from("content")
          .select(`
            *,
            content_categories (
              category:categories (*)
            )
          `)
          .order("publication_date", { ascending: false });

        if (status !== "all") {
          query = query.eq("status", status);
        }
        if (type && type !== "all") {
          query = query.eq("content_type", type);
        }
        if (featured !== undefined) {
          query = query.eq("featured", featured);
        }
        if (search && search.trim() !== "") {
          query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data, error } = await query;
        if (!error && data) {
          let items: ContentItem[] = data.map((item: any) => ({
            ...item,
            categories: item.content_categories?.map((cc: any) => cc.category).filter(Boolean) || [],
          }));

          if (categorySlug && categorySlug !== "all") {
            items = items.filter((item) =>
              item.categories?.some((c) => c.slug === categorySlug)
            );
          }

          if (limit) {
            items = items.slice(offset, offset + limit);
          }
          return items;
        }
      }
    } catch (e) {
      console.warn("Supabase query failed, falling back to seed content:", e);
    }
  }

  // Fallback to rich seed data
  let items = [...SEED_CONTENT];

  if (status !== "all") {
    items = items.filter((item) => item.status === status);
  }
  if (type && type !== "all") {
    items = items.filter((item) => item.content_type === type);
  }
  if (featured !== undefined) {
    items = items.filter((item) => item.featured === featured);
  }
  if (categorySlug && categorySlug !== "all") {
    items = items.filter((item) =>
      item.categories?.some((cat) => cat.slug === categorySlug)
    );
  }
  if (search && search.trim() !== "") {
    const term = search.toLowerCase().trim();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }

  items.sort(
    (a, b) =>
      new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()
  );

  if (limit) {
    items = items.slice(offset, offset + limit);
  }

  return items;
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("content")
          .select(`
            *,
            content_categories (
              category:categories (*)
            )
          `)
          .eq("slug", slug)
          .single();

        if (!error && data) {
          return {
            ...data,
            categories: data.content_categories?.map((cc: any) => cc.category).filter(Boolean) || [],
          };
        }
      }
    } catch (e) {
      console.warn("Supabase query failed, falling back to seed content:", e);
    }
  }

  const found = SEED_CONTENT.find((item) => item.slug === slug);
  return found || null;
}

export async function getRelatedContent(currentSlug: string, categoryIds: string[] = [], limit: number = 3): Promise<ContentItem[]> {
  const all = await getContentList({ status: "published" });
  const otherItems = all.filter((item) => item.slug !== currentSlug);

  // Match items sharing categories first
  const related = otherItems.filter((item) =>
    item.categories?.some((cat) => categoryIds.includes(cat.id))
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // Fill up with any other published items
  const remaining = otherItems.filter((item) => !related.includes(item));
  return [...related, ...remaining].slice(0, limit);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "general")
          .single();
        if (!error && data && data.value) {
          return { ...DEFAULT_SITE_SETTINGS, ...data.value };
        }
      }
    } catch (e) {
      console.warn("Supabase query failed, using default site settings:", e);
    }
  }
  return DEFAULT_SITE_SETTINGS;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && data) {
          return data as TeamMember[];
        }
      }
    } catch (e) {
      console.warn("Supabase query failed:", e);
    }
  }
  return DEFAULT_TEAM_MEMBERS;
}

export async function getPitches(statusFilter?: PitchStatus | "all"): Promise<Pitch[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        let q = supabase.from("pitches").select("*").order("created_at", { ascending: false });
        if (statusFilter && statusFilter !== "all") {
          q = q.eq("status", statusFilter);
        }
        const { data, error } = await q;
        if (!error && data) {
          return data as Pitch[];
        }
      }
    } catch (e) {
      console.warn("Supabase pitches query failed:", e);
    }
  }

  let list = [...SEED_PITCHES];
  if (statusFilter && statusFilter !== "all") {
    list = list.filter((p) => p.status === statusFilter);
  }
  return list;
}

export async function getChannels(): Promise<Channel[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("channels")
          .select("*")
          .order("display_order", { ascending: true });
        if (!error && data && data.length > 0) {
          return data as Channel[];
        }
      }
    } catch (e) {
      console.warn("Supabase channels query failed:", e);
    }
  }
  return SEED_CHANNELS;
}

export async function getAdminStats() {
  const allContent = await getContentList({ status: "all" });
  const categories = await getCategories();
  const pitches = await getPitches();

  const total = allContent.length;
  const published = allContent.filter((i) => i.status === "published").length;
  const draft = allContent.filter((i) => i.status === "draft").length;
  const comingSoon = allContent.filter((i) => i.status === "coming_soon").length;
  const pendingPitches = pitches.filter((p) => p.status === "new" || p.status === "reviewing").length;

  const byType = {
    video: allContent.filter((i) => i.content_type === "video").length,
    podcast: allContent.filter((i) => i.content_type === "podcast").length,
    article: allContent.filter((i) => i.content_type === "article").length,
    explainer: allContent.filter((i) => i.content_type === "explainer").length,
    deep_dive: allContent.filter((i) => i.content_type === "deep_dive").length,
  };
  const recentlyAdded = allContent.slice(0, 5);

  return {
    total,
    published,
    draft,
    comingSoon,
    pendingPitches,
    categoryCount: categories.length,
    byType,
    recentlyAdded,
  };
}
