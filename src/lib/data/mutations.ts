"use server";

import { isSupabaseConfigured } from "../supabase/config";
import { createServerSupabaseClient } from "../supabase/server";
import { ContentInput } from "../validations/content";
import { CategoryInput, TeamMemberInput, SiteSettingsInput } from "../validations/category";

export type MutationResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

const UNCONFIGURED_ERROR =
  "Supabase is not configured. Live write actions require NEXT_PUBLIC_SUPABASE_URL and authentication keys to be configured in .env.local.";

export async function upsertContent(input: ContentInput): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: UNCONFIGURED_ERROR };
  }

  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    const { category_ids, ...contentData } = input;
    
    // Check slug uniqueness
    const { data: existingSlug } = await supabase
      .from("content")
      .select("id")
      .eq("slug", input.slug)
      .neq("id", input.id || "00000000-0000-0000-0000-000000000000")
      .maybeSingle();

    if (existingSlug) {
      return { success: false, error: `The slug "${input.slug}" is already in use by another article.` };
    }

    let savedContentId = input.id;

    if (input.id) {
      const { data, error } = await supabase
        .from("content")
        .update(contentData)
        .eq("id", input.id)
        .select()
        .single();

      if (error) throw error;
      savedContentId = data.id;
    } else {
      const { data, error } = await supabase
        .from("content")
        .insert(contentData)
        .select()
        .single();

      if (error) throw error;
      savedContentId = data.id;
    }

    // Sync categories
    if (savedContentId && category_ids && category_ids.length > 0) {
      await supabase.from("content_categories").delete().eq("content_id", savedContentId);
      const rows = category_ids.map((catId) => ({
        content_id: savedContentId,
        category_id: catId,
      }));
      await supabase.from("content_categories").insert(rows);
    }

    return { success: true, data: { id: savedContentId } };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save content" };
  }
}

export async function deleteContent(id: string): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: UNCONFIGURED_ERROR };
  }
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    const { error } = await supabase.from("content").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete content" };
  }
}

export async function upsertCategory(input: CategoryInput): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: UNCONFIGURED_ERROR };
  }
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    if (input.id) {
      const { data, error } = await supabase
        .from("categories")
        .update(input)
        .eq("id", input.id)
        .select()
        .single();
      if (error) throw error;
      return { success: true, data };
    } else {
      const { data, error } = await supabase
        .from("categories")
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return { success: true, data };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save category" };
  }
}

export async function deleteCategory(id: string): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: UNCONFIGURED_ERROR };
  }
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    // Check if category is currently linked to any content
    const { count, error: countErr } = await supabase
      .from("content_categories")
      .select("*", { count: "exact", head: true })
      .eq("category_id", id);

    if (!countErr && count && count > 0) {
      return {
        success: false,
        error: `Cannot delete: This category is currently assigned to ${count} content item(s). Reassign or remove them first.`,
      };
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete category" };
  }
}

export async function upsertTeamMember(input: TeamMemberInput): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: UNCONFIGURED_ERROR };
  }
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    if (input.id) {
      const { data, error } = await supabase
        .from("team_members")
        .update(input)
        .eq("id", input.id)
        .select()
        .single();
      if (error) throw error;
      return { success: true, data };
    } else {
      const { data, error } = await supabase
        .from("team_members")
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return { success: true, data };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save team member" };
  }
}

export async function deleteTeamMember(id: string): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: UNCONFIGURED_ERROR };
  }
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete team member" };
  }
}

export async function updateSiteSettings(settings: SiteSettingsInput): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: UNCONFIGURED_ERROR };
  }
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "general", value: settings });
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update settings" };
  }
}

export async function subscribeNewsletter(email: string): Promise<MutationResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error:
        "The newsletter service is not yet configured with a live database. Please connect Supabase in .env.local to enable subscriber storage.",
    };
  }
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return { success: false, error: UNCONFIGURED_ERROR };

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim() });

    if (error) {
      if (error.code === "23505") {
        // Unique violation
        return { success: true, data: { alreadySubscribed: true } };
      }
      throw error;
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Subscription failed. Please try again." };
  }
}
