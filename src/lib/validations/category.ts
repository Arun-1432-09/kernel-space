import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must only contain lowercase letters, numbers, and single hyphens"),
  description: z.string().max(500).optional().nullable(),
  icon: z.string().max(50).default("Folder"),
  sort_order: z.coerce.number().default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name is required").max(120),
  role: z.string().min(2, "Role is required").max(120),
  biography: z.string().max(1000).optional().nullable(),
  image_url: z.string().url("Must be a valid URL").optional().nullable(),
  social_links: z.record(z.string()).default({}),
  sort_order: z.coerce.number().default(0),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

export const siteSettingsSchema = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1),
  heroLabel: z.string().min(1),
  heroHeadline: z.string().min(1),
  heroSupportText: z.string().min(1),
  contactEmail: z.string().email("Must be a valid email").optional(),
  founder_note: z.string().optional().nullable(),
  start_here: z.array(z.string()).optional(),
  socialLinks: z
    .object({
      youtube: z.string().url().optional().or(z.literal("")),
      spotify: z.string().url().optional().or(z.literal("")),
      instagram: z.string().url().optional().or(z.literal("")),
      twitter: z.string().url().optional().or(z.literal("")),
      linkedin: z.string().url().optional().or(z.literal("")),
    })
    .optional(),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
