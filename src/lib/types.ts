export type ContentType = 'video' | 'podcast' | 'article' | 'explainer';
export type ContentStatus = 'draft' | 'published';
export type SubscriberStatus = 'active' | 'unsubscribed';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon?: string | null;
  image_url?: string | null;
  sort_order?: number;
  created_at?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  body?: string | null;
  content_type: ContentType;
  thumbnail_url: string;
  media_url?: string | null;
  duration_seconds?: number | null;
  publication_date: string;
  featured: boolean;
  status: ContentStatus;
  is_demo: boolean;
  created_at?: string;
  updated_at?: string;
  categories?: Category[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  biography?: string | null;
  image_url?: string | null;
  social_links?: Record<string, string>;
  sort_order?: number;
  created_at?: string;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  heroLabel: string;
  heroHeadline: string;
  heroSupportText: string;
  contactEmail: string;
  socialLinks: {
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
