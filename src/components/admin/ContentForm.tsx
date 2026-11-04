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
  Link as LinkIcon,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
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
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
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
  const [thumbnailAlt, setThumbnailAlt] = useState(initialData?.thumbnail_alt || "");
  const [imageCredit, setImageCredit] = useState(initialData?.image_credit || "");
  const [mediaUrl, setMediaUrl] = useState(initialData?.media_url || "");
  const [durationMinutes, setDurationMinutes] = useState(
    initialData?.duration_seconds ? Math.round(initialData.duration_seconds / 60) : ""
  );
  const [readingTimeMinutes, setReadingTimeMinutes] = useState(
    initialData?.reading_time_minutes || ""
  );
  const [publicationDate, setPublicationDate] = useState(
    initialData?.publication_date
      ? new Date(initialData.publication_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [status, setStatus] = useState<ContentStatus>(initialData?.status || "draft");
  const [isDemo, setIsDemo] = useState(initialData?.is_demo ?? true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    initialData?.categories?.map((c) => c.id) || (categories[0] ? [categories[0].id] : [])
  );
  const [openQuestions, setOpenQuestions] = useState(
    initialData?.open_questions || ""
  );
  const [sources, setSources] = useState<{ label: string; url?: string }[]>(
    initialData?.sources || [{ label: "", url: "" }]
  );
  const [psychologyDisclaimerConfirmed, setPsychologyDisclaimerConfirmed] = useState(true);
  const [financeDisclaimerConfirmed, setFinanceDisclaimerConfirmed] = useState(true);

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

  const handleAddSource = () => {
    setSources([...sources, { label: "", url: "" }]);
  };

  const handleRemoveSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSourceChange = (index: number, field: "label" | "url", value: string) => {
    const next = [...sources];
    next[index] = { ...next[index], [field]: value };
    setSources(next);
  };

  // Pre-publish checklist evaluations
  const selectedCategories = categories.filter((c) => selectedCategoryIds.includes(c.id));
  const hasPsychology = selectedCategories.some((c) => c.slug.includes("psychology"));
  const hasFinance = selectedCategories.some((c) => c.slug.includes("finance"));

  const checklist = [
    {
      id: "title_slug",
      label: "Title and valid slug present",
      passed: Boolean(title.trim().length >= 3 && slug.trim().length >= 3),
    },
    {
      id: "category",
      label: "At least one category selected",
      passed: selectedCategoryIds.length > 0,
    },
    {
      id: "thumbnail",
      label: "Thumbnail with Alt text & Image credit",
      passed: Boolean(thumbnailUrl.trim().length > 0 && thumbnailAlt.trim().length > 0 && imageCredit.trim().length > 0),
    },
    {
      id: "body_media",
      label: "Body essay or media provided",
      passed: Boolean(body.trim().length > 20 || (mediaUrl && mediaUrl.trim().length > 0)),
    },
    {
      id: "time",
      label: "Reading or duration time set",
      passed: Boolean(readingTimeMinutes || durationMinutes),
    },
    {
      id: "sources",
      label: "At least 1 research source cited",
      passed: sources.some((s) => s.label.trim().length > 0),
    },
    {
      id: "open_questions",
      label: "'What we're still figuring out' documented",
      passed: Boolean(openQuestions.trim().length > 10),
    },
    ...(hasPsychology
      ? [
          {
            id: "psychology_disclaimer",
            label: "Psychology non-medical disclaimer confirmed",
            passed: psychologyDisclaimerConfirmed,
          },
        ]
      : []),
    ...(hasFinance
      ? [
          {
            id: "finance_disclaimer",
            label: "Finance educational-only disclaimer confirmed",
            passed: financeDisclaimerConfirmed,
          },
        ]
      : []),
  ];

  const allChecksPassed = checklist.every((c) => c.passed);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (status === "published" && !allChecksPassed) {
      setStatusMessage({
        type: "error",
        text: "Please resolve all pre-publish checklist requirements before publishing.",
      });
      return;
    }

    const durationSeconds = durationMinutes ? Number(durationMinutes) * 60 : null;
    const readingTime = readingTimeMinutes ? Number(readingTimeMinutes) : null;
    const cleanSources = sources.filter((s) => s.label.trim().length > 0);

    const payload = {
      id: initialData?.id,
      title,
      subtitle: subtitle || null,
      slug: slugify(slug),
      description,
      body,
      content_type: contentType,
      thumbnail_url: thumbnailUrl,
      thumbnail_alt: thumbnailAlt || null,
      image_credit: imageCredit || null,
      media_url: mediaUrl && mediaUrl.trim() !== "" ? mediaUrl.trim() : null,
      duration_seconds: durationSeconds,
      reading_time_minutes: readingTime,
      publication_date: publicationDate,
      featured,
      status,
      is_demo: isDemo,
      open_questions: openQuestions || null,
      sources: cleanSources,
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
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
            className="btn-gold text-xs px-5 py-2 inline-flex items-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEdit ? "Update Entry" : "Save Content"}</span>
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
                placeholder="e.g. Why Some Startups Fail Even With Great Ideas"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-kernel-border text-sm font-medium focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                Subtitle / Angle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. An economic post-mortem into premature scaling and unit economics"
                className="w-full px-3.5 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold"
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
                Body Essay / Full Article Text
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                placeholder="Full article content, breakdown paragraphs, or conversation show notes..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold font-sans leading-relaxed"
              />
            </div>
          </div>

          {/* Research Transparency & Sources */}
          <div className="bg-white p-6 rounded-2xl border border-kernel-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-kernel-gold" />
                <span>What We Read & Checked (Research Citations)</span>
              </h3>
              <button
                type="button"
                onClick={handleAddSource}
                className="text-[11px] text-kernel-gold font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" />
                <span>Add Source</span>
              </button>
            </div>

            <div className="space-y-2">
              {sources.map((src, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={src.label}
                    onChange={(e) => handleSourceChange(idx, "label", e.target.value)}
                    placeholder="Citation title or study (e.g. Harvard Business Review: Business Models)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold"
                  />
                  <input
                    type="url"
                    value={src.url || ""}
                    onChange={(e) => handleSourceChange(idx, "url", e.target.value)}
                    placeholder="Link URL (optional)"
                    className="w-48 px-3 py-1.5 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold font-mono"
                  />
                  {sources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSource(idx)}
                      className="p-1.5 text-kernel-muted hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                What We're Still Figuring Out (Unresolved Questions)
              </label>
              <textarea
                value={openQuestions}
                onChange={(e) => setOpenQuestions(e.target.value)}
                rows={2}
                placeholder="Open questions, caveats, or uncertainties the editorial team is still investigating..."
                className="w-full px-3.5 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold"
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
                Leave empty for demo items or pure essays. Demo items display a graceful 'Media coming soon' notice per Section 3.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Pre-publish Checklist & Metadata */}
        <div className="space-y-6">
          {/* Pre-publish Checklist */}
          <div className="bg-white p-5 rounded-2xl border border-kernel-border space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-kernel-gold" />
                <span>Pre-Publish Checklist</span>
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  allChecksPassed
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {checklist.filter((c) => c.passed).length}/{checklist.length} Passed
              </span>
            </div>

            <div className="space-y-2 pt-1 border-t border-kernel-border/60">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-start gap-2 text-xs">
                  {item.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span
                    className={item.passed ? "text-zinc-700 font-medium" : "text-amber-800 font-semibold"}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {hasPsychology && (
              <label className="flex items-center gap-2 pt-2 border-t border-kernel-border cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={psychologyDisclaimerConfirmed}
                  onChange={(e) => setPsychologyDisclaimerConfirmed(e.target.checked)}
                  className="rounded text-kernel-gold focus:ring-kernel-gold w-3.5 h-3.5"
                />
                <span className="text-[11px] text-zinc-700">
                  Confirmed: Psychology disclaimer attached
                </span>
              </label>
            )}

            {hasFinance && (
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={financeDisclaimerConfirmed}
                  onChange={(e) => setFinanceDisclaimerConfirmed(e.target.checked)}
                  className="rounded text-kernel-gold focus:ring-kernel-gold w-3.5 h-3.5"
                />
                <span className="text-[11px] text-zinc-700">
                  Confirmed: Finance disclaimer attached
                </span>
              </label>
            )}
          </div>

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
                className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold font-medium"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public)</option>
                <option value="coming_soon">Coming Soon (Teaser)</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-kernel-charcoal mb-1">
                Content Format
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold capitalize font-medium"
              >
                <option value="article">Article</option>
                <option value="explainer">Explainer</option>
                <option value="video">Video</option>
                <option value="podcast">Podcast</option>
                <option value="deep_dive">Visual Deep-Dive</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-kernel-charcoal mb-1">
                  Reading Time (min)
                </label>
                <input
                  type="number"
                  min="0"
                  value={readingTimeMinutes}
                  onChange={(e) => setReadingTimeMinutes(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g. 5"
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-kernel-charcoal mb-1">
                  Duration (min)
                </label>
                <input
                  type="number"
                  min="0"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g. 24"
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold"
                />
              </div>
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
                  Mark as Demo Sample (Truthful Labeling)
                </span>
              </label>
            </div>
          </div>

          {/* Thumbnail & Media Details */}
          <div className="bg-white p-5 rounded-2xl border border-kernel-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal">
              Cover Thumbnail & Credit
            </h3>

            <div>
              <label className="block text-[11px] text-kernel-muted mb-1">
                Image URL *
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

            <div>
              <label className="block text-[11px] text-kernel-muted mb-1">
                Alt Text (Accessibility) *
              </label>
              <input
                type="text"
                value={thumbnailAlt}
                onChange={(e) => setThumbnailAlt(e.target.value)}
                placeholder="Describe image for screen readers"
                className="w-full px-3 py-1.5 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] text-kernel-muted mb-1">
                Image Credit / Source *
              </label>
              <input
                type="text"
                value={imageCredit}
                onChange={(e) => setImageCredit(e.target.value)}
                placeholder="e.g. Unsplash / Startup Archive"
                className="w-full px-3 py-1.5 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold"
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
              Categories (01–08)
            </h3>
            <p className="text-[11px] text-kernel-muted">
              Select one primary and optional secondary disciplines:
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
