"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles, Headphones, Play, FileText, CornerDownLeft } from "lucide-react";
import { SEED_CONTENT, SEED_CATEGORIES } from "@/lib/data/mock-data";

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandSearch({ isOpen, onClose }: CommandSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Global keyboard shortcut: / or Ctrl/Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingContent = trimmed
    ? SEED_CONTENT.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.description.toLowerCase().includes(trimmed)
      ).slice(0, 5)
    : SEED_CONTENT.slice(0, 4);

  const matchingCategories = trimmed
    ? SEED_CATEGORIES.filter(
        (cat) =>
          cat.name.toLowerCase().includes(trimmed) ||
          (cat.description && cat.description.toLowerCase().includes(trimmed))
      )
    : SEED_CATEGORIES.slice(0, 4);

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-3.5 h-3.5 fill-current text-kernel-gold" />;
      case "podcast":
        return <Headphones className="w-3.5 h-3.5 text-kernel-gold" />;
      case "deep_dive":
      case "explainer":
        return <Sparkles className="w-3.5 h-3.5 text-kernel-gold" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-kernel-gold" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-kernel-charcoal/45 backdrop-blur-xl flex flex-col items-center justify-start pt-16 sm:pt-28 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Kernel Space"
    >
      <div
        className="w-full max-w-2xl bg-white/85 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-300 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/60 bg-white/40 px-5 py-4">
          <Search className="w-5 h-5 text-kernel-grey flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, mental models, topics or disciplines..."
            className="w-full pl-4 pr-10 text-base text-kernel-charcoal placeholder-kernel-grey/60 focus:outline-none bg-transparent"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-kernel-grey hover:text-kernel-charcoal"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded border border-kernel-border/80 text-[10px] text-kernel-grey uppercase font-mono bg-white/60">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Categories matches */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-accent px-3 block mb-2">
              Disciplines & Categories
            </span>
            <div className="grid grid-cols-2 gap-2">
              {matchingCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(`/explore?category=${cat.slug}`)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/80 hover:shadow-xs border border-transparent hover:border-white/80 transition-all text-left"
                >
                  <span className="text-xs font-semibold text-kernel-charcoal truncate">
                    {cat.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-kernel-grey flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Content matches */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-accent px-3 block mb-2">
              {trimmed ? "Matching Explorations" : "Recommended Inquiries"}
            </span>
            <div className="space-y-1.5">
              {matchingContent.length > 0 ? (
                matchingContent.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(`/content/${item.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/90 hover:shadow-xs border border-transparent hover:border-white/80 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg glass-pill flex items-center justify-center flex-shrink-0 border border-white/80">
                        {renderTypeIcon(item.content_type)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-kernel-grey truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <CornerDownLeft className="w-4 h-4 text-kernel-grey opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3" />
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-kernel-grey">
                  Nothing here yet. Try a different question?
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-kernel-ivory/70 backdrop-blur-md border-t border-white/60 flex items-center justify-between text-[11px] text-kernel-grey">
          <span>Search across 8 disciplines, podcasts & visual explainers</span>
          <Link
            href="/explore"
            onClick={onClose}
            className="text-gold-accent hover:underline font-semibold"
          >
            Open full directory →
          </Link>
        </div>
      </div>
    </div>
  );
}
