export type ContentType = 'video' | 'podcast' | 'article' | 'deep_dive' | 'explainer';
export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'archived' | 'coming_soon';
export type SubscriberStatus = 'pending' | 'active' | 'unsubscribed';
export type PitchStatus = 'new' | 'reviewing' | 'accepted' | 'declined';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url?: string | null;
  icon?: string | null;
  icon_key?: string | null;
  display_order?: number;
  sort_order?: number;
  count?: number;
  created_at?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  body?: string | null;
  content_type: ContentType;
  thumbnail_url: string;
  thumbnail_alt?: string | null;
  image_credit?: string | null;
  media_url?: string | null;
  media_provider?: string | null;
  audio_url?: string | null;
  duration_seconds?: number | null;
  reading_time_minutes?: number | null;
  author_name?: string | null;
  transcript?: string | null;
  chapters?: any;
  status: ContentStatus;
  featured: boolean;
  is_demo: boolean;
  publication_date: string;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image_url?: string | null;
  sources?: { label: string; url?: string }[];
  open_questions?: string | null;
  distribution_links?: {
    youtube?: string;
    spotify?: string;
    apple_podcasts?: string;
    instagram?: string;
    linkedin?: string;
  };
  channel_id?: string | null;
  created_at?: string;
  updated_at?: string;
  categories?: Category[];
}

export interface Channel {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url?: string | null;
  is_active: boolean;
  display_order: number;
}

export interface Pitch {
  id: string;
  name?: string | null;
  email?: string | null;
  topic: string;
  core_question: string;
  why_it_matters: string;
  links?: string | null;
  status: PitchStatus;
  consent_confirmed: boolean;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  biography?: string | null;
  image_url?: string | null;
  social_links?: Record<string, string>;
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  heroLabel: string;
  heroHeadline: string;
  heroSupportText: string;
  contactEmail?: string;
  founder_note?: string;
  start_here?: string[];
  socialLinks?: {
    youtube?: string;
    spotify?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: SubscriberStatus;
  created_at: string;
}
