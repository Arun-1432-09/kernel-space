"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-kernel-gold">
            System Notice
          </span>
          <h1 className="text-3xl font-bold text-kernel-charcoal">
            Something went wrong
          </h1>
          <p className="text-sm text-kernel-muted leading-relaxed">
            We encountered an unexpected condition while loading this perspective. You can retry the action or return to the main library.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-gold text-xs px-5 py-2.5 inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link href="/" className="btn-gold-outline text-xs px-5 py-2.5">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
