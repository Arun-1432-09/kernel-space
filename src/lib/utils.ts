import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "";
  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  if (mins < 60) {
    return `${mins} min${mins === 1 ? "" : "s"}`;
  }
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours} hr ${remMins > 0 ? `${remMins} min` : ""}`;
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}

/**
 * Validates and extracts YouTube Video ID
 * Supports: https://www.youtube.com/watch?v=ID, https://youtu.be/ID, https://www.youtube.com/embed/ID
 */
export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i
  );
  return match ? match[1] : null;
}

/**
 * Validates and extracts Spotify track/episode/show ID and type
 * Supports: https://open.spotify.com/episode/ID, https://open.spotify.com/track/ID, https://open.spotify.com/show/ID
 */
export function getSpotifyEmbedInfo(url: string | null | undefined): { type: string; id: string } | null {
  if (!url) return null;
  const match = url.match(
    /open\.spotify\.com\/(episode|track|show|playlist)\/([a-zA-Z0-9]+)/i
  );
  if (match) {
    return { type: match[1], id: match[2] };
  }
  return null;
}

/**
 * Slugify string helper
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
