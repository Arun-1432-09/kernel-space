"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { ContentItem, ContentType, ContentStatus } from "@/lib/types";
import { deleteContent, upsertContent } from "@/lib/data/mutations";
import { formatDate } from "@/lib/utils";

interface ContentTableProps {
  initialContent: ContentItem[];
}

export function ContentTable({ initialContent }: ContentTableProps) {
  const router = useRouter();
  const [contentList, setContentList] = useState<ContentItem[]>(initialContent);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ContentType | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Feedback notifications
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Deletion modal state
  const [deleteModalItem, setDeleteModalItem] = useState<ContentItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter content
  const filtered = contentList.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (typeFilter !== "all" && item.content_type !== typeFilter) return false;
    if (search.trim()) {
      const term = search.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(term);
      const matchSlug = item.slug.toLowerCase().includes(term);
      if (!matchTitle && !matchSlug) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const showNotification = (type: "success" | "error", text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Toggle Featured status
  const handleToggleFeatured = async (item: ContentItem) => {
    const updated = !item.featured;
    const res = await upsertContent({
      ...item,
      featured: updated,
      category_ids: item.categories?.map((c) => c.id) || [],
    });

    if (res.success) {
      setContentList((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, featured: updated } : i))
      );
      showNotification("success", `Updated featured status for "${item.title}"`);
    } else {
      showNotification("error", res.error || "Failed to update featured flag.");
    }
  };

  // Toggle Publish / Unpublish
  const handleTogglePublish = async (item: ContentItem) => {
    const newStatus: ContentStatus = item.status === "published" ? "draft" : "published";
    const res = await upsertContent({
      ...item,
      status: newStatus,
      category_ids: item.categories?.map((c) => c.id) || [],
    });

    if (res.success) {
      setContentList((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: newStatus } : i))
      );
      showNotification("success", `Content is now ${newStatus}`);
    } else {
      showNotification("error", res.error || "Failed to update publication status.");
    }
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteModalItem) return;
    setIsDeleting(true);

    const res = await deleteContent(deleteModalItem.id);
    setIsDeleting(false);

    if (res.success) {
      setContentList((prev) => prev.filter((i) => i.id !== deleteModalItem.id));
      showNotification("success", `Deleted "${deleteModalItem.title}"`);
      setDeleteModalItem(null);
    } else {
      showNotification("error", res.error || "Failed to delete item.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 animate-fade-in shadow-card ${
            feedback.type === "success"
              ? "bg-green-50 border-green-200 text-green-900"
              : "bg-amber-50 border-amber-200 text-amber-950"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Toolbar: Search, Filters, New Content Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-kernel-border">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-kernel-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Filter by title or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold bg-kernel-ivory/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-kernel-gold" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="py-1.5 px-3 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="py-1.5 px-3 rounded-lg border border-kernel-border text-xs text-kernel-charcoal bg-white focus:border-kernel-gold capitalize"
            >
              <option value="all">All Formats</option>
              <option value="article">Article</option>
              <option value="explainer">Explainer</option>
              <option value="video">Video</option>
              <option value="podcast">Podcast</option>
              <option value="deep_dive">Visual Deep-Dive</option>
            </select>
          </div>

          <Link
            href="/admin/content/new"
            className="btn-gold text-xs px-4 py-2 inline-flex items-center gap-1.5 ml-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-2xl border border-kernel-border overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-kernel-ivory/60 border-b border-kernel-border text-kernel-charcoal uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Categories</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kernel-border/60">
              {paginated.length > 0 ? (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-kernel-ivory/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-kernel-charcoal max-w-xs">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/content/${item.id}/edit`}
                          className="font-semibold text-kernel-charcoal hover:text-kernel-gold transition-colors truncate block"
                          title={item.title}
                        >
                          {item.title}
                        </Link>
                        {item.is_demo && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold uppercase tracking-wider flex-shrink-0">
                            Demo
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-kernel-muted block truncate font-mono">
                        /{item.slug}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 capitalize text-kernel-charcoal font-medium">
                      {item.content_type}
                    </td>

                    <td className="py-3.5 px-4 max-w-[180px]">
                      <div className="flex flex-wrap gap-1">
                        {item.categories && item.categories.length > 0 ? (
                          item.categories.map((c) => (
                            <span
                              key={c.id}
                              className="px-2 py-0.5 rounded bg-kernel-ivory border border-kernel-border text-[10px] text-kernel-charcoal truncate"
                            >
                              {c.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-kernel-muted text-[10px]">Unassigned</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-kernel-muted whitespace-nowrap">
                      {formatDate(item.publication_date)}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleFeatured(item)}
                        title="Toggle Featured"
                        className={`p-1 rounded transition-colors ${
                          item.featured
                            ? "text-kernel-gold hover:text-kernel-gold-hover"
                            : "text-zinc-300 hover:text-zinc-500"
                        }`}
                      >
                        <Star className={`w-4 h-4 ${item.featured ? "fill-current" : ""}`} />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                          item.status === "published"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {item.status === "published" ? (
                          <CheckCircle className="w-3 h-3 text-green-700" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-700" />
                        )}
                        <span className="capitalize">{item.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/content/${item.slug}`}
                          target="_blank"
                          title="Preview live"
                          className="p-1.5 text-kernel-muted hover:text-kernel-charcoal rounded hover:bg-kernel-ivory"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/content/${item.id}/edit`}
                          title="Edit"
                          className="p-1.5 text-kernel-muted hover:text-kernel-gold rounded hover:bg-kernel-ivory"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalItem(item)}
                          title="Delete"
                          className="p-1.5 text-kernel-muted hover:text-red-600 rounded hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-kernel-muted">
                    No content entries match your active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="py-3 px-4 border-t border-kernel-border bg-kernel-ivory/30 flex items-center justify-between text-xs text-kernel-muted">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} entries
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-kernel-border disabled:opacity-40 hover:bg-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold text-kernel-charcoal">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded border border-kernel-border disabled:opacity-40 hover:bg-white"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Deletion */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 border border-kernel-border shadow-floating animate-scale-up">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-kernel-charcoal">
                  Confirm Content Removal
                </h3>
                <p className="text-xs text-kernel-muted leading-relaxed">
                  Are you sure you want to permanently delete{" "}
                  <strong>"{deleteModalItem.title}"</strong>? This will remove all associated category links.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalItem(null)}
                disabled={isDeleting}
                className="btn-ghost text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-xs transition-colors"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
