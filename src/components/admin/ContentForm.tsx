"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  AlertCircle,
  Upload,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";
import { Category, ContentItem, ContentType, ContentStatus } from "@/lib/types";
import { contentSchema } from "@/lib/validations/content";
import { upsertContent } from "@/lib/data/mutations";
import { slugify } from "@/lib/utils";

interface ContentFormProps {
  initialData?: ContentItem | null;
  categories: Category[];
}

export function ContentForm({ initialData, categories }: ContentFormProps) {
  const router = useRouter();

  const isEdit = Boolean(initialData?.id);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!initialData?.slug);
  const [description, setDescription] = useState(initialData?.description || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [contentType, setContentType] = useState<ContentType>(
    initialData?.content_type || "article"
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnail_url ||
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  );
  const [mediaUrl, setMediaUrl] = useState(initialData?.media_url || "");
  const [durationMinutes, setDurationMinutes] = useState(
    initialData?.duration_seconds ? Math.round(initialData.duration_seconds / 60) : ""
  );
  const [publicationDate, setPublicationDate] = useState(
    initialData?.publication_date
      ? new Date(initialData.publication_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [status, setStatus] = useState<ContentStatus>(initialData?.status || "draft");
  const [isDemo, setIsDemo] = useState(initialData?.is_demo || false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    initialData?.categories?.map((c) => c.id) || (categories[0] ? [categories[0].id] : [])
  );

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Auto update slug when title changes if autoSlug enabled
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  const toggleCategory = (catId: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const durationSeconds = durationMinutes ? Number(durationMinutes) * 60 : null;

    const payload = {
      id: initialData?.id,
      title,
      slug: slugify(slug),
      description,
      body,
      content_type: contentType,
      thumbnail_url: thumbnailUrl,
      media_url: mediaUrl && mediaUrl.trim() !== "" ? mediaUrl.trim() : null,
      duration_seconds: durationSeconds,
      publication_date: publicationDate,
      featured,
      status,
      is_demo: isDemo,
      category_ids: selectedCategoryIds,
    };

    const parseResult = contentSchema.safeParse(payload);
    if (!parseResult.success) {
      const issue = parseResult.error.issues[0]?.message || "Validation failed";
      setStatusMessage({ type: "error", text: issue });
      return;
    }

    setLoading(true);

    const res = await upsertContent(parseResult.data);
    setLoading(false);

    if (!res.success) {
      setStatusMessage({
        type: "error",
        text: res.error || "Failed to save content",
      });
    } else {
      setStatusMessage({
        type: "success",
        text: `Content "${title}" saved successfully!`,
      });
      setTimeout(() => {
        router.push("/admin/content");
        router.refresh();
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Header & Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-1.5 text-xs text-kernel-muted hover:text-kernel-charcoal font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Content List</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-gold text-xs px-5 py-2 inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEdit ? "Update Entry" : "Create Entry"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 animate-fade-in shadow-card ${
            statusMessage.type === "success"
              ? "bg-green-50 border-green-200 text-green-900"
              : "bg-amber-50 border-amber-200 text-amber-950"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-kernel-border space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. The Architecture of Decision Making"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-kernel-border text-sm font-medium focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-kernel-charcoal">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(!autoSlug);
                    if (!autoSlug) setSlug(slugify(title));
                  }}
                  className="text-[10px] text-kernel-gold hover:underline font-semibold"
                >
                  {autoSlug ? "Locked to Title" : "Generate from Title"}
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs text-kernel-muted font-mono">
                  /content/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(slugify(e.target.value));
                  }}
                  required
                  className="w-full pl-20 pr-3.5 py-2 rounded-lg border border-kernel-border text-xs font-mono text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                Description / Standfirst *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
                placeholder="A concise summary of the core inquiry and takeaway..."
                className="w-full px-3.5 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                Body Essay / Episode Notes
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={10}
                placeholder="Full article content, breakdown paragraphs, or conversation show notes..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold font-sans leading-relaxed"
              />
            </div>
          </div>

          {/* Media & Embed Link Section */}
          <div className="bg-white p-6 rounded-2xl border border-kernel-border space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5 text-kernel-gold" />
              <span>Media Embed (YouTube or Spotify)</span>
            </h3>

            <div>
              <label className="block text-xs text-kernel-muted mb-1">
                Media URL (valid YouTube watch/share or Spotify episode/track link)
              </label>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://open.spotify.com/episode/..."
                className="w-full px-3.5 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold font-mono"
              />
              <p className="mt-1 text-[11px] text-kernel-muted">
                Leave empty for pure articles. Only validated YouTube or Spotify URLs will be embedded on the public site.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Metadata */}
        <div className="space-y-6">
          {/* Publishing Controls */}
          <div className="bg-white p-5 rounded-2xl border border-kernel-border space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal">
              Publishing Controls
            </h3>

            <div>
              <label className="block text-xs font-semibold text-kernel-charcoal mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-kernel-charcoal mb-1">
                Content Format
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold capitalize"
              >
                <option value="video">Video</option>
                <option value="podcast">Podcast</option>
                <option value="explainer">Explainer</option>
                <option value="article">Article</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-kernel-charcoal mb-1">
                Publication Date
              </label>
              <input
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-kernel-charcoal mb-1">
                Duration (in minutes)
              </label>
              <input
                type="number"
                min="0"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g. 27"
                className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold"
              />
            </div>

            <div className="pt-2 border-t border-kernel-border space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-kernel-gold focus:ring-kernel-gold w-4 h-4"
                />
                <span className="text-xs font-medium text-kernel-charcoal">
                  Feature in Dark Hero Panel
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDemo}
                  onChange={(e) => setIsDemo(e.target.checked)}
                  className="rounded text-kernel-gold focus:ring-kernel-gold w-4 h-4"
                />
                <span className="text-xs font-medium text-kernel-charcoal">
                  Mark as Demo Sample
                </span>
              </label>
            </div>
          </div>

          {/* Thumbnail Preview */}
          <div className="bg-white p-5 rounded-2xl border border-kernel-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal">
              Cover Thumbnail
            </h3>

            <div>
              <label className="block text-[11px] text-kernel-muted mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                required
                placeholder="https://..."
                className="w-full px-3 py-1.5 rounded-lg border border-kernel-border text-xs font-mono text-kernel-charcoal focus:border-kernel-gold"
              />
            </div>

            {thumbnailUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-kernel-border bg-kernel-ivory">
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Category Assignment */}
          <div className="bg-white p-5 rounded-2xl border border-kernel-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal">
              Categories (Multi-select)
            </h3>
            <p className="text-[11px] text-kernel-muted">
              Select one or more disciplines:
            </p>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {categories.map((cat) => {
                const isChecked = selectedCategoryIds.includes(cat.id);
                return (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? "bg-kernel-ivory border-kernel-gold text-kernel-charcoal font-semibold"
                        : "border-kernel-border hover:bg-kernel-ivory/50 text-kernel-muted"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(cat.id)}
                      className="rounded text-kernel-gold focus:ring-kernel-gold w-3.5 h-3.5"
                    />
                    <span>{cat.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
