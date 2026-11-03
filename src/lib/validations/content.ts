import { z } from "zod";
import { getSpotifyEmbedInfo, getYouTubeVideoId } from "../utils";

export const mediaUrlValidator = z
  .string()
  .nullable()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === "") return true;
      const isYoutube = getYouTubeVideoId(val) !== null;
      const isSpotify = getSpotifyEmbedInfo(val) !== null;
      return isYoutube || isSpotify;
    },
    {
      message: "Media URL must be a valid YouTube (watch/share) or Spotify (track/episode/show) URL",
    }
  );

export const contentSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must not exceed 255 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(280, "Slug must not exceed 280 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must only contain lowercase alphanumeric characters and hyphens"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  body: z.string().optional().nullable(),
  content_type: z.enum(["video", "podcast", "article", "explainer"]),
  thumbnail_url: z
    .string()
    .min(1, "Thumbnail URL or upload is required")
    .url("Thumbnail must be a valid URL"),
  media_url: mediaUrlValidator,
  duration_seconds: z.coerce.number().min(0, "Duration must be positive").optional().nullable(),
  publication_date: z.string().min(1, "Publication date is required"),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
  is_demo: z.boolean().default(false),
  category_ids: z.array(z.string()).min(1, "Please select at least one category"),
});

export type ContentInput = z.infer<typeof contentSchema>;
