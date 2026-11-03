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
      className="bg-kernel-ivory border-b border-kernel-border px-4 py-2 text-xs text-kernel-charcoal"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-kernel-gold flex-shrink-0" />
          <span>
            <strong>Demo Preview Mode:</strong> Supabase environment variables are not yet configured. Displaying seeded editorial content in read-only mode.
          </span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/admin"
            className="text-kernel-gold hover:text-kernel-gold-hover font-semibold inline-flex items-center gap-1 underline underline-offset-2"
          >
            Admin setup guide <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-kernel-muted hover:text-kernel-charcoal p-0.5 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
