-- ============================================================================
-- KERNEL SPACE DATABASE MIGRATION 002: CHANNELS, PITCHES & CONTENT EXTENSIONS
-- ============================================================================

-- Extend content_type enum if needed
DO $$
BEGIN
    ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'deep_dive';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Extend content_status enum if needed
DO $$
BEGIN
    ALTER TYPE content_status ADD VALUE IF NOT EXISTS 'scheduled';
    ALTER TYPE content_status ADD VALUE IF NOT EXISTS 'archived';
    ALTER TYPE content_status ADD VALUE IF NOT EXISTS 'coming_soon';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create pitch_status enum if not exists
DO $$
BEGIN
    CREATE TYPE pitch_status AS ENUM ('new', 'reviewing', 'accepted', 'declined');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create channels table
CREATE TABLE IF NOT EXISTS channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    logo_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create pitches table
CREATE TABLE IF NOT EXISTS pitches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120),
    email VARCHAR(255),
    topic TEXT NOT NULL,
    core_question TEXT NOT NULL,
    why_it_matters TEXT NOT NULL,
    links TEXT,
    status pitch_status NOT NULL DEFAULT 'new',
    consent_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Extend categories table
ALTER TABLE categories ADD COLUMN IF NOT EXISTS icon_key VARCHAR(10);

-- Extend team_members table
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

-- Extend content table
ALTER TABLE content ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS thumbnail_alt TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS image_credit TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS media_provider VARCHAR(50);
ALTER TABLE content ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS reading_time_minutes INT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS author_name VARCHAR(120);
ALTER TABLE content ADD COLUMN IF NOT EXISTS transcript TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS chapters JSONB DEFAULT '[]'::jsonb;
ALTER TABLE content ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE content ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
ALTER TABLE content ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS sources JSONB DEFAULT '[]'::jsonb;
ALTER TABLE content ADD COLUMN IF NOT EXISTS open_questions TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS distribution_links JSONB DEFAULT '{}'::jsonb;
ALTER TABLE content ADD COLUMN IF NOT EXISTS channel_id UUID REFERENCES channels(id) ON DELETE SET NULL;

-- Enable RLS for new tables
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE pitches ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Public can view active channels" ON channels;
    CREATE POLICY "Public can view active channels" ON channels FOR SELECT USING (is_active = TRUE OR is_admin());

    DROP POLICY IF EXISTS "Admin can manage channels" ON channels;
    CREATE POLICY "Admin can manage channels" ON channels FOR ALL USING (is_admin());

    DROP POLICY IF EXISTS "Public can submit pitches" ON pitches;
    CREATE POLICY "Public can submit pitches" ON pitches FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin can manage pitches" ON pitches;
    CREATE POLICY "Admin can manage pitches" ON pitches FOR ALL USING (is_admin());
EXCEPTION
    WHEN undefined_function THEN null;
END $$;
