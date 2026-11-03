"use client";

import React, { useState, useEffect } from "react";
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Check,
  AlertCircle,
  Folder,
  Layers,
} from "lucide-react";
import { Category } from "@/lib/types";
import { SEED_CATEGORIES } from "@/lib/data/mock-data";
import { upsertCategory, deleteCategory } from "@/lib/data/mutations";
import { slugify } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Folder");
  const [sortOrder, setSortOrder] = useState(0);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setIcon("Folder");
    setSortOrder(categories.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setIcon(cat.icon || "Folder");
    setSortOrder(cat.sort_order || 0);
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: editingCategory ? editingCategory.id : undefined,
      name,
      slug: slugify(slug),
      description,
      icon,
      sort_order: sortOrder,
    };

    const res = await upsertCategory(payload);
    setLoading(false);

    if (res.success) {
      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? { ...c, ...payload, id: editingCategory.id }
              : c
          )
        );
      } else {
        const newCat: Category = {
          ...payload,
          id: (res.data?.id as string) || `cat-${Date.now()}`,
        };
        setCategories((prev) => [...prev, newCat]);
      }
      setFeedback({ type: "success", text: `Category "${name}" saved!` });
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: "error", text: res.error || "Failed to save category" });
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) return;

    const res = await deleteCategory(cat.id);
    if (res.success) {
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      setFeedback({ type: "success", text: `Deleted category "${cat.name}"` });
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: "error", text: res.error || "Failed to delete category" });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-kernel-charcoal tracking-tight">
            Knowledge Categories
          </h1>
          <p className="text-xs text-kernel-muted mt-1">
            Manage the 8 foundational disciplines and extensible categories.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-gold text-xs px-4 py-2 inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

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
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-kernel-border overflow-hidden shadow-subtle">
        <table className="w-full text-left text-xs">
          <thead className="bg-kernel-ivory/60 border-b border-kernel-border text-kernel-charcoal uppercase tracking-wider font-bold">
            <tr>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Icon Token</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kernel-border/60">
            {categories.map((cat, idx) => (
              <tr key={cat.id} className="hover:bg-kernel-ivory/30 transition-colors">
                <td className="py-3.5 px-4 font-mono font-semibold text-kernel-muted">
                  #{cat.sort_order ?? idx + 1}
                </td>
                <td className="py-3.5 px-4 font-bold text-kernel-charcoal">
                  {cat.name}
                </td>
                <td className="py-3.5 px-4 font-mono text-kernel-muted">
                  {cat.slug}
                </td>
                <td className="py-3.5 px-4 text-kernel-gold font-medium">
                  {cat.icon || "Folder"}
                </td>
                <td className="py-3.5 px-4 text-kernel-muted max-w-xs truncate">
                  {cat.description}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-kernel-muted hover:text-kernel-gold rounded hover:bg-kernel-ivory"
                      title="Edit Category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      className="p-1.5 text-kernel-muted hover:text-red-600 rounded hover:bg-red-50"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-kernel-border shadow-floating animate-scale-up">
            <h3 className="text-base font-bold text-kernel-charcoal">
              {editingCategory ? "Edit Category" : "New Category"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  placeholder="e.g. Cognitive Systems"
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border font-mono text-kernel-charcoal focus:border-kernel-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Lucide Icon Name
                </label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="e.g. Cpu, Brain, Plane, Palette..."
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-ghost text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold text-xs px-4 py-2"
                >
                  {loading ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
