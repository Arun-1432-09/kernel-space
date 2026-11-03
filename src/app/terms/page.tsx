import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Kernel Space Terms of Service and Intellectual Property Policy.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-muted hover:text-kernel-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-gold">
            <FileCheck className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="heading-hero">
            Terms of Service
          </h1>
          <p className="text-sm text-kernel-muted">
            Last updated: November 2024 • [CLEARLY MARKED PLACEHOLDER DOCUMENT]
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <strong>Notice to Platform Owner:</strong> This document contains marked standard placeholder text. Please consult qualified legal counsel to update this with your entity's specific commercial terms.
        </div>

        <div className="prose prose-stone max-w-none text-sm text-kernel-charcoal space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Kernel Space, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">2. Intellectual Property</h2>
            <p>
              All original visual assets, podcasts, scripts, explainer graphics, trademarks, and code published by Kernel Space are the property of Kernel Space Media unless otherwise attributed to open-source or creative commons licenses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">3. Educational & Informational Purpose Only</h2>
            <p>
              The content provided across all disciplines—including business case studies, technology analysis, and financial literacy—is strictly for general educational and curiosity purposes. It does not constitute legal, medical, financial, or investment advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">4. Contact & Inquiries</h2>
            <p>
              Questions regarding these Terms should be directed to <code>hello@kernelspace.media</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
