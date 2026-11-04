# Kernel Space

> **Tagline:** Think Deeper. Explore Further.  
> **Brand Statement:** We explore ideas, break down complex topics, and have real conversations that help people understand the world a little better.

Kernel Space is a production-ready, multi-format digital media and knowledge-discovery platform built end-to-end for independent creators, inquisitive minds, students, and systems thinkers. It features podcasts, animated explainers, visual deep dives, and analytical essays across eight interconnected disciplines.

---

## 1. Architectural Overview & Tech Stack

- **Framework:** Next.js 14 (App Router, React Server Components, TypeScript)
- **Styling:** Tailwind CSS with custom editorial design tokens + Lucide Icons + Framer Motion
- **Database & Auth:** Supabase (PostgreSQL 15+, Row Level Security, Storage, Auth)
- **Validation:** Zod schemas for forms, mutations, and API route payloads
- **Deployment:** Vercel-ready with zero-config SSR, ISR, and CDN caching

---

## 2. Design System & Editorial Tokens

Inspired by the wellness-retreat layout rhythm (spacious rounded page shell inside an ivory container `#EFECE3`), the aesthetic is restrained, elegant, and information-dense:

| Token | Hex | Role | Contrast Ratio / WCAG |
|---|---|---|---|
| **White** | `#FFFFFF` | Main card and background | 21:1 on Charcoal |
| **Ivory** | `#F7F4EC` | Alternating sections & inner shell | Editorial warmth |
| **Champagne Gold** | `#C6A15B` | Accent highlights & button fills | Used with Charcoal text (~6:1) |
| **Deep Gold** | `#A9843E` | Hover emphasis | Interactive states |
| **Gold Text Accent** | `#7A5F26` | Small gold text on light backgrounds | WCAG AA compliant (4.8:1) |
| **Charcoal** | `#242321` | Headings, text, dark featured panels | Primary editorial ink |
| **Warm Grey** | `#77736A` | Secondary descriptions, timestamps | Subtle metadata |
| **Beige Border** | `#E8E1D2` | Dividers, card strokes, bento borders | Subtle separation |

---

## 3. The Eight Disciplines (01–08)

1. **01 Business & Startups:** How companies operate, business models, unit economics, startup post-mortems, and why ventures succeed or fail.
2. **02 Technology & AI:** Neural architectures, compute scaling bottlenecks, automation systems, and practical tools reshaping work.
3. **03 Psychology & Mental Health:** Evolutionary dopamine loops, cognitive heuristics, and navigating modern life. *(Includes mandatory non-medical disclaimer)*
4. **04 Student Life & Gen-Z Culture:** Credentialism, early-career decisions, peer dynamics, and digital identities.
5. **05 Design & Creativity:** Negative space, invisible ergonomics, design thinking, and associative incubation.
6. **06 Travel & Experiences:** Cultural immersion, urban geography, and the psychology of places.
7. **07 Aviation & Automotive:** Aerodynamic lift, turbofan high-bypass ratios, EV drivetrain thermodynamics, and transportation systems.
8. **08 Finance & Economics:** Fractional reserve banking, credit creation, fiat trust, and the psychology of spending. *(Includes mandatory non-financial-advice disclaimer)*

---

## 4. Public Site Pages

- **`/` (Homepage):** Complete 14-section sequential flow:
  1. *Split Hero:* "A space for curious minds." with headline, support text, format chips, and 8-category marquee.
  2. *Value Blocks (01-04):* Genuine Conversations, Visual Explorations, Ideas Without Borders, Curious Minds.
  3. *Dark Featured Panel (`#242321`):* 16:9 featured card and queued items.
  4. *Latest Explorations:* Horizontal scroll-snap card rail.
  5. *Start Here (Editorial Pick):* 3 foundational gateway entries.
  6. *Our Story:* Arch-framed visual and philosophy narrative.
  7. *Category Bento Grid:* 2 large feature cards + 6 standard cards with live counts and index numerals.
  8. *Magazine Layout:* Asymmetrical grid (1 tall podcast, 1 wide video, 2 articles).
  9. *Raw & Real Panel:* Conversation ethos with podcast CTA.
  10. *How We Think Strip:* 5-stage production breakdown.
  11. *Pitch a Topic CTA:* Direct pathway to `/get-involved`.
  12. *Newsletter Dispatch:* Email capture with honeypot & under-18 consent.
  13. *Floating Navigation:* Active kernel dot indicator and Cmd+K search modal.
  14. *Editorial Footer:* 01-08 directory, legal links, and giant faded watermark.
- **`/explore`:** Full search and multi-facet filtering (type, category, date).
- **`/watch`:** Curated visual explainers and documentary video library.
- **`/listen`:** In-depth conversation podcast catalog with episode notes.
- **`/read`:** Long-form written essays and post-mortems with reading times.
- **`/about`:** Mission, 5 principles, authentic founder note, and future channels roadmap.
- **`/contact`:** Editorial inquiry form with honeypot and age consent check.
- **`/get-involved`:** Community pitch form with core questions and rationale.
- **`/category/[slug]`:** Discipline hubs with index badges and required disclaimers.
- **`/series/[slug]`:** Multi-part curated collection hubs.
- **`/channel/[slug]`:** Channel broadcasts (`/channel/main` active; inactive channels return 404).
- **`/content/[slug]`:** Full article reader with sources citation list, "What we're still figuring out" transparency box, and graceful media coming soon states.
- **`/rss.xml` & `/sitemap.xml` & `/robots.txt`:** Fully dynamic SEO endpoints.

---

## 5. Admin CMS (`/admin`)

- **`/admin` (Overview):** Metrics for total content, published, drafts, coming soon teasers, pending topic pitches, and 5-format breakdown.
- **`/admin/content` (Library):** Paginated table with search, format filters, status toggles, and deletion modal.
- **`/admin/content/new` & `[id]/edit`:**
  - Auto-slug generator
  - Dynamic research citation sources manager
  - Unresolved questions ("What we're still figuring out")
  - **Live Pre-Publish Checklist:** Validates title, slug, primary category, alt text, image credit, body/media, reading duration, disclaimers, and sources before publishing.
- **`/admin/pitches` (Topic Pitches Inbox):**
  - Review community submissions from `/get-involved`
  - 1-click status actions: Reviewing, Accepted, Declined
  - **Convert to Draft Article:** Instantly pre-fills the content editor from an accepted community pitch!
- **`/admin/channels`:** View all distribution channels and toggle active/inactive broadcast states.
- **`/admin/categories`:** Manage 01–08 disciplines with safeguards preventing accidental deletion of core categories.
- **`/admin/settings`:** Edit split hero copy, brand tagline, founder's note, contact email, and active social channels.
- **`/admin/newsletter`:** View subscriber roster with CSV export.

---

## 6. Quick Start & Local Execution

### Prerequisites
- Node.js 18+
- npm or pnpm

```bash
# Navigate to the repository
cd kernel-space

# Install dependencies
npm install

# Run production build
npm run build

# Start the application server
npm run start
```
The application will be live at `http://localhost:3000`.

---

## 7. Connecting Supabase for Live Database Persistence

When running without Supabase credentials, Kernel Space defaults to **Demo Preview Mode** using built-in seed records. To connect live Supabase PostgreSQL:

1. Create a free project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Copy your project URL and Anon Key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
4. In the Supabase Dashboard, open the **SQL Editor** and run:
   - `supabase/migrations/20241103_001_initial_schema.sql`
   - `supabase/seed.sql`
5. Create an authorized admin user by signing up in Supabase Auth and inserting their UUID into `admin_users`:
   ```sql
   INSERT INTO admin_users (user_id, email, role)
   VALUES ('YOUR-AUTH-USER-UUID', 'admin@kernelspace.media', 'admin');
   ```

---

## 8. Deployment to Vercel

Kernel Space is configured for immediate, zero-downtime deployment on Vercel:

```bash
# Using Vercel CLI
vercel

# Or push to GitHub and import the repository into the Vercel Dashboard
```
Ensure you add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in your Vercel Project Settings under **Environment Variables**.
