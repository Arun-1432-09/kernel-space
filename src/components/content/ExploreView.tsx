"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, RotateCcw, Filter, Sparkles, Folder } from "lucide-react";
import { Category, ContentItem, ContentType } from "@/lib/types";
import { ContentCard } from "./ContentCard";

interface ExploreViewProps {
  initialContent: ContentItem[];
  categories: Category[];
}

const TYPE_OPTIONS: { label: string; value: ContentType | "all" }[] = [
  { label: "All Formats", value: "all" },
  { label: "Videos", value: "video" },
  { label: "Podcasts", value: "podcast" },
  { label: "Explainers", value: "explainer" },
  { label: "Articles", value: "article" },
];

export function ExploreView({ initialContent, categories }: ExploreViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "all";
  const currentType = (searchParams.get("type") as ContentType | "all") || "all";
  const currentSearch = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`/explore?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters("q", searchQuery);
  };

  const handleReset = () => {
    setSearchQuery("");
    startTransition(() => {
      router.push("/explore", { scroll: false });
    });
  };

  // Filter content based on current active query params
  const filteredItems = initialContent.filter((item) => {
    // Type match
    if (currentType !== "all" && item.content_type !== currentType) {
      return false;
    }
    // Category match
    if (currentCategory !== "all") {
      const hasCat = item.categories?.some((c) => c.slug === currentCategory);
      if (!hasCat) return false;
    }
    // Search match
    if (currentSearch.trim() !== "") {
      const q = currentSearch.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  const isFiltered = currentCategory !== "all" || currentType !== "all" || currentSearch !== "";

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="bg-kernel-ivory/60 p-5 sm:p-6 rounded-2xl border border-kernel-border space-y-5">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <label htmlFor="explore-search" className="sr-only">
            Search topics, questions, or keywords
          </label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-kernel-muted" />
            <input
              id="explore-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, questions, mental models or keywords..."
              className="w-full pl-12 pr-28 py-3 rounded-xl border border-kernel-border bg-white text-sm text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold placeholder-kernel-muted/70 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-gold py-1.5 px-4 text-xs"
            >
              Search
            </button>
          </div>
        </form>

        {/* Formats Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <span className="text-xs font-semibold uppercase text-kernel-muted mr-1 flex items-center gap-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-kernel-gold" />
            Format:
          </span>
          {TYPE_OPTIONS.map((opt) => {
            const isSelected = currentType === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => updateFilters("type", opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${
                  isSelected
                    ? "bg-kernel-charcoal text-white shadow-sm"
                    : "bg-white text-kernel-muted hover:text-kernel-charcoal border border-kernel-border"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-kernel-border/60">
          <span className="text-xs font-semibold uppercase text-kernel-muted mr-1 flex items-center gap-1 flex-shrink-0">
            <Folder className="w-3.5 h-3.5 text-kernel-gold" />
            Category:
          </span>
          <button
            onClick={() => updateFilters("category", "all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              currentCategory === "all"
                ? "bg-kernel-gold text-white font-semibold"
                : "bg-white text-kernel-muted hover:text-kernel-charcoal border border-kernel-border"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => updateFilters("category", cat.slug)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-kernel-gold text-white font-semibold shadow-sm"
                    : "bg-white text-kernel-muted hover:text-kernel-charcoal border border-kernel-border"
                }`}
              >
                {cat.name}
              </button>
            );
          })}

          {/* Reset button when any filter is active */}
          {isFiltered && (
            <button
              onClick={handleReset}
              className="ml-auto inline-flex items-center gap-1 px-3 py-1 text-xs text-kernel-gold hover:text-kernel-gold-hover hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-kernel-muted">
        <span>
          Showing <strong>{filteredItems.length}</strong> piece{filteredItems.length === 1 ? "" : "s"} of content
          {currentCategory !== "all" && (
            <> in <strong className="text-kernel-charcoal">{categories.find((c) => c.slug === currentCategory)?.name || currentCategory}</strong></>
          )}
        </span>
        {isFiltered && (
          <span className="text-kernel-gold font-medium">Filtered results</span>
        )}
      </div>

      {/* Grid of Results */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 rounded-2xl bg-kernel-ivory/40 border border-kernel-border space-y-4">
          <div className="w-12 h-12 rounded-full bg-white border border-kernel-border flex items-center justify-center mx-auto text-kernel-muted">
            <Search className="w-5 h-5 text-kernel-gold" />
          </div>
          <h3 className="text-lg font-bold text-kernel-charcoal">
            No stories match your criteria
          </h3>
          <p className="text-sm text-kernel-muted max-w-md mx-auto">
            Try adjusting your search terms, changing the format filter, or exploring all categories.
          </p>
          <button
            onClick={handleReset}
            className="btn-gold text-xs px-4 py-2 mt-2"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
