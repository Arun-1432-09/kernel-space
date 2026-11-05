"use client";

import React, { useState } from "react";
import { AlertCircle, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface SupabaseNoticeBannerProps {
  isConfigured: boolean;
}

export function SupabaseNoticeBanner({ isConfigured }: SupabaseNoticeBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (isConfigured || dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Setup Notice"
      className="bg-[#F7F4EC] border-b border-kernel-border/80 px-3 sm:px-4 py-2 text-[11px] sm:text-xs text-kernel-charcoal"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kernel-gold flex-shrink-0" />
          <span className="truncate sm:overflow-visible">
            <strong>Demo Mode:</strong>{" "}
            <span className="hidden sm:inline">
              Supabase environment variables are not yet configured. Displaying seeded editorial content in read-only mode.
            </span>
            <span className="sm:hidden text-kernel-grey">
              Seeded editorial preview
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link
            href="/admin"
            className="text-kernel-gold hover:text-kernel-gold-deep font-semibold inline-flex items-center gap-1 underline underline-offset-2 whitespace-nowrap text-[10px] sm:text-xs"
          >
            <span>Guide</span>
            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-kernel-grey hover:text-kernel-charcoal p-1 rounded-full hover:bg-black/5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
