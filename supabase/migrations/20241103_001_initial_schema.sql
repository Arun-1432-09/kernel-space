-- ============================================================================
-- KERNEL SPACE DATABASE MIGRATION 001: INITIAL SCHEMA & RLS POLICIES
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Create Custom Types / Enums
CREATE TYPE content_type AS ENUM ('video', 'podcast', 'article', 'explainer');
CREATE TYPE content_status AS ENUM ('draft', 'published');
CREATE TYPE subscriber_status AS ENUM ('active', 'unsubscribed');

-- 2. Create updated_at trigger helper
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Table: categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'Folder',
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Table: content
CREATE TABLE IF NOT EXISTS content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    body TEXT,
    content_type content_type NOT NULL DEFAULT 'article',
    thumbnail_url TEXT NOT NULL,
    media_url TEXT,
    duration_seconds INT CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
    publication_date DATE NOT NULL DEFAULT CURRENT_DATE,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    status content_status NOT NULL DEFAULT 'draft',
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_content_updated_at
    BEFORE UPDATE ON content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Join Table: content_categories (Many-to-Many)
CREATE TABLE IF NOT EXISTS content_categories (
    content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (content_id, category_id)
);

-- 6. Table: team_members
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    role VARCHAR(120) NOT NULL,
    biography TEXT,
    image_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Table: site_settings
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(80) PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Table: newsletter_subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    status subscriber_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 9. Table: admin_users (Authorized Admin Identifiers)
CREATE TABLE IF NOT EXISTS admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES & PERFORMANCE OPTIMIZATION
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_content_slug ON content(slug);
CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(content_type);
CREATE INDEX IF NOT EXISTS idx_content_pub_date ON content(publication_date DESC);
CREATE INDEX IF NOT EXISTS idx_content_featured ON content(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_content_categories_cat ON content_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_content_categories_content ON content_categories(content_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Full-text search index on content title & description
CREATE INDEX IF NOT EXISTS idx_content_search 
    ON content USING gin(to_tsvector('english', title || ' ' || description));

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an authorized admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.user_id = auth.uid()
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for categories
CREATE POLICY "Public can view categories" 
    ON categories FOR SELECT USING (true);

CREATE POLICY "Admin can insert categories" 
    ON categories FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admin can update categories" 
    ON categories FOR UPDATE USING (is_admin());

CREATE POLICY "Admin can delete categories" 
    ON categories FOR DELETE USING (is_admin());

-- Policies for content
CREATE POLICY "Public can view published content" 
    ON content FOR SELECT 
    USING (status = 'published' OR is_admin());

CREATE POLICY "Admin can insert content" 
    ON content FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admin can update content" 
    ON content FOR UPDATE USING (is_admin());

CREATE POLICY "Admin can delete content" 
    ON content FOR DELETE USING (is_admin());

-- Policies for content_categories join table
CREATE POLICY "Public can view content_categories" 
    ON content_categories FOR SELECT USING (true);

CREATE POLICY "Admin can manage content_categories" 
    ON content_categories FOR ALL USING (is_admin());

-- Policies for team_members
CREATE POLICY "Public can view team members" 
    ON team_members FOR SELECT USING (true);

CREATE POLICY "Admin can manage team members" 
    ON team_members FOR ALL USING (is_admin());

-- Policies for site_settings
CREATE POLICY "Public can read site settings" 
    ON site_settings FOR SELECT USING (true);

CREATE POLICY "Admin can update site settings" 
    ON site_settings FOR ALL USING (is_admin());

-- Policies for newsletter_subscribers
CREATE POLICY "Public can subscribe to newsletter" 
    ON newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view and manage subscribers" 
    ON newsletter_subscribers FOR SELECT USING (is_admin());

CREATE POLICY "Admin can delete subscribers" 
    ON newsletter_subscribers FOR DELETE USING (is_admin());

-- Policies for admin_users
CREATE POLICY "Admin can read admin_users" 
    ON admin_users FOR SELECT USING (is_admin() OR auth.uid() = user_id);

-- Storage bucket configuration for thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view thumbnails"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'thumbnails');

CREATE POLICY "Admin can upload thumbnails"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'thumbnails' AND (auth.role() = 'authenticated'));

CREATE POLICY "Admin can update thumbnails"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'thumbnails' AND (auth.role() = 'authenticated'));

CREATE POLICY "Admin can delete thumbnails"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'thumbnails' AND (auth.role() = 'authenticated'));
