# Kernel Space

> **Tagline:** Think Deeper. Explore Further.

Kernel Space is a production-ready digital media and knowledge-discovery platform built end-to-end for independent creators, inquisitive minds, students, and systems thinkers.

---

## 1. Tech Stack

- **Framework:** Next.js (App Router, TypeScript, React Server Components)
- **Styling:** Tailwind CSS (custom white-and-gold editorial design tokens) + Lucide Icons
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Auth, Storage)
- **Validation:** Zod schemas for client and server-side verification
- **Deployment:** Vercel-ready with zero server-side state dependencies

---

## 2. Design System Tokens

- **White (`#FFFFFF`):** Main editorial page background
- **Ivory (`#F7F4EC`):** Alternating narrative sections & cards
- **Champagne Gold (`#C6A15B`):** Buttons, interactive icons, active accents
- **Deep Gold (`#A9843E`):** Hover states, emphasized editorial labels
- **Charcoal (`#242321`):** Typography headings, dark deep-dive panels
- **Warm Grey (`#77736A`):** Secondary editorial copy & metadata
- **Beige Border (`#E8E1D2`):** Dividers, subtle card borders

---

## 3. Local Development Setup

### Prerequisites
- Node.js 18+ (tested on Node v24.13.0)
- npm or pnpm

### Quick Start
```bash
# Clone or navigate into the project directory
cd kernel-space

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note on Preview Mode:** If Supabase credentials are not supplied in `.env.local`, Kernel Space automatically runs in **Demo Preview Mode** using built-in seeded editorial records and displays an informative setup notice banner.

---

## 4. Supabase Setup & Migrations

### 1. Create a Supabase Project
1. Log in to [supabase.com](https://supabase.com) and create a new project.
2. Note your Project URL and anon public API key in **Project Settings > API**.

### 2. Apply Database Schema & Migrations
1. In the Supabase dashboard, navigate to the **SQL Editor**.
2. Run the script located at:
   ```
   supabase/migrations/20241103_001_initial_schema.sql
   ```
   This creates:
   - Tables: `categories`, `content`, `content_categories`, `team_members`, `site_settings`, `newsletter_subscribers`, `admin_users`
   - Custom enum types: `content_type`, `content_status`, `subscriber_status`
   - Full-text search GIN index on `title` and `description`
   - Row Level Security (RLS) policies allowing public read of published content and strict authenticated admin management
   - Public storage bucket `thumbnails` with admin-only upload policies.

### 3. Seed Demo Content & Categories
In the **SQL Editor**, execute:
```
supabase/seed.sql
```
This populates:
- 8 foundational categories (Business & Startups, Technology & AI, Psychology & Mental Health, Student Life & Gen-Z Culture, Design & Creativity, Travel & Experiences, Aviation & Automotive, Finance & Economics).
- 16 initial demo records spanning videos, podcasts, explainers, and essays.
- Default site settings and editorial copy.

### 4. Create Your First Admin User
1. In the Supabase Dashboard, go to **Authentication > Users** and click **Add User > Create User** (e.g. `admin@kernelspace.media` with a secure password).
2. Copy the resulting **User UID** (UUID).
3. In the **SQL Editor**, grant admin permissions to this UID:
   ```sql
   INSERT INTO admin_users (user_id, email, role)
   VALUES ('<PASTE-USER-UID-HERE>', 'admin@kernelspace.media', 'admin');
   ```
4. You can now log in at `/admin/login`.

---

## 5. Deployment on Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. In the **Environment Variables** section, configure:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key
4. Click **Deploy**. Vercel will build the Next.js App Router application with static generation and ISR.

---

## 6. Architecture & Features

### Public Platform
- **Split Hero:** Editorial positioning, dual CTA, and cinematic imagery.
- **Value Blocks:** Genuine Conversations, Visual Explorations, Ideas Without Borders, Curious Minds.
- **Dark Featured Panel (`#242321`):** Dynamic hand-selected investigations.
- **Curated Carousel:** Horizontal touch-friendly cards for mobile and desktop.
- **Featured Collection:** Multidisciplinary collage & deeper contextual narrative.
- **Category Matrix:** 8 foundational domains with Lucide icons and routing.
- **Contact & Real Newsletter:** Rate-limited Zod validation with honest status messages.
- **Content Pages:**
  - `/explore`: Real-time search, multi-category filters, format tabs, and reset logic.
  - `/watch`: Featured video with YouTube player (only embeds valid URLs).
  - `/listen`: Featured audio dialogue with Spotify player (only embeds valid URLs).
  - `/about`: Manifesto, 3 pillars of philosophy, production cadence, and team section.
  - `/content/[slug]`: Rich article reading experience, embedded media, related items.
  - `/privacy` & `/terms`: Clearly marked legal templates.

### Admin CMS (`/admin`)
- **Protected Layout:** Server-side verified Supabase auth or safe demo inspection.
- **Overview:** Real-time publishing counts, format breakdown, and database connection status.
- **Content Table:** Full CRUD, search, status toggle, featured toggle, delete confirmation modal, slug uniqueness validation.
- **Category Manager:** CRUD for knowledge domains.
- **Team Manager:** Dynamic contributor bios.
- **Site Settings:** Global contact email, social links, and hero copy.
- **Newsletter:** Subscriber list and one-click CSV export.
