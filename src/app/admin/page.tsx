import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Clock,
  FolderTree,
  Plus,
  Play,
  Headphones,
  Sparkles,
  ArrowRight,
  Database,
  ExternalLink,
} from "lucide-react";
import { getAdminStats } from "@/lib/data/queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Dynamic admin stats

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();
  const isConfigured = isSupabaseConfigured();

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-kernel-charcoal tracking-tight">
            Editorial Overview
          </h1>
          <p className="text-xs sm:text-sm text-kernel-muted mt-1">
            Publishing metrics, content catalog distribution, and database status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/content/new"
            className="btn-gold text-xs px-4 py-2 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Content</span>
          </Link>
        </div>
      </div>

      {/* Database Connection Notice Card */}
      {!isConfigured && (
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-4">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-amber-950">
                Supabase Environment Setup Required For Live Database Persistence
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed">
                Currently running with seeded editorial records in read-only preview mode. To connect your live Supabase project:
              </p>
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/80 text-xs font-mono space-y-2 text-zinc-800">
            <div>1. Copy <code>.env.example</code> to <code>.env.local</code></div>
            <div>2. Fill in <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></div>
            <div>3. Execute the SQL script in <code>supabase/migrations/20241103_001_initial_schema.sql</code> and <code>supabase/seed.sql</code></div>
            <div>4. Insert an admin record in <code>admin_users</code> for your Supabase Auth user ID.</div>
          </div>
        </div>
      )}

      {/* Key Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="editorial-card p-5 bg-white">
          <div className="flex items-center justify-between text-kernel-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Content</span>
            <FileText className="w-4 h-4 text-kernel-gold" />
          </div>
          <div className="text-3xl font-bold text-kernel-charcoal">{stats.total}</div>
          <span className="text-[11px] text-kernel-muted mt-1 block">Articles, videos & audio</span>
        </div>

        <div className="editorial-card p-5 bg-white">
          <div className="flex items-center justify-between text-kernel-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Published</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-kernel-charcoal">{stats.published}</div>
          <span className="text-[11px] text-green-700 mt-1 block">Live on public platform</span>
        </div>

        <div className="editorial-card p-5 bg-white">
          <div className="flex items-center justify-between text-kernel-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Drafts</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-kernel-charcoal">{stats.draft}</div>
          <span className="text-[11px] text-amber-700 mt-1 block">In review / draft state</span>
        </div>

        <div className="editorial-card p-5 bg-white">
          <div className="flex items-center justify-between text-kernel-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Categories</span>
            <FolderTree className="w-4 h-4 text-kernel-gold" />
          </div>
          <div className="text-3xl font-bold text-kernel-charcoal">{stats.categoryCount}</div>
          <span className="text-[11px] text-kernel-muted mt-1 block">Knowledge domains</span>
        </div>
      </div>

      {/* Breakdown by Content Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="editorial-card p-6 bg-white space-y-4">
          <h3 className="text-sm font-bold text-kernel-charcoal uppercase tracking-wider">
            Format Breakdown
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-kernel-charcoal font-medium">
                <Play className="w-3.5 h-3.5 text-kernel-gold fill-current" />
                Videos
              </span>
              <span className="font-bold text-kernel-charcoal">{stats.byType.video}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-kernel-charcoal font-medium">
                <Headphones className="w-3.5 h-3.5 text-kernel-gold" />
                Podcasts
              </span>
              <span className="font-bold text-kernel-charcoal">{stats.byType.podcast}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-kernel-charcoal font-medium">
                <Sparkles className="w-3.5 h-3.5 text-kernel-gold" />
                Explainers
              </span>
              <span className="font-bold text-kernel-charcoal">{stats.byType.explainer}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-kernel-charcoal font-medium">
                <FileText className="w-3.5 h-3.5 text-kernel-gold" />
                Articles
              </span>
              <span className="font-bold text-kernel-charcoal">{stats.byType.article}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/content"
              className="text-xs text-kernel-gold hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Manage all content</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Recently Added Items */}
        <div className="editorial-card p-6 bg-white lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-kernel-charcoal uppercase tracking-wider">
              Recently Added Content
            </h3>
            <Link
              href="/admin/content"
              className="text-xs text-kernel-gold hover:underline font-semibold"
            >
              View table →
            </Link>
          </div>

          <div className="divide-y divide-kernel-border/60">
            {stats.recentlyAdded.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={`/admin/content/${item.id}/edit`}
                    className="text-sm font-semibold text-kernel-charcoal hover:text-kernel-gold transition-colors truncate block"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-2 text-[11px] text-kernel-muted mt-0.5">
                    <span className="capitalize">{item.content_type}</span>
                    <span>•</span>
                    <span>{formatDate(item.publication_date)}</span>
                    {item.is_demo && (
                      <span className="text-amber-800 font-medium">Demo</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wider ${
                      item.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.status}
                  </span>
                  <Link
                    href={`/content/${item.slug}`}
                    target="_blank"
                    className="p-1 text-kernel-muted hover:text-kernel-charcoal"
                    title="View public page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
