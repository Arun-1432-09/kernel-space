import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kernel Space Privacy Policy and Data Handling Terms.",
};

export default function PrivacyPage() {
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
            <Shield className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Legal Disclaimer</span>
          </div>
          <h1 className="heading-hero">
            Privacy Policy
          </h1>
          <p className="text-sm text-kernel-muted">
            Last updated: November 2024 • [CLEARLY MARKED PLACEHOLDER DOCUMENT]
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <strong>Notice to Platform Owner:</strong> This document contains marked standard placeholder text. Please consult qualified legal counsel to update this with your entity's jurisdiction-specific privacy notice before commercial deployment.
        </div>

        <div className="prose prose-stone max-w-none text-sm text-kernel-charcoal space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">1. Overview</h2>
            <p>
              Kernel Space ("we," "our," or "us") respects your privacy. This policy outlines how information is gathered, utilized, and safeguarded when visiting our public platform or subscribing to our editorial dispatches.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">2. Information We Collect</h2>
            <p>
              Kernel Space is built with an open-access philosophy: all public podcasts, explainers, and articles can be consumed without creating an account.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-kernel-muted">
              <li><strong>Newsletter Subscriptions:</strong> If you voluntarily subscribe to our monthly dispatch, we collect and store your email address.</li>
              <li><strong>Anonymous Telemetry:</strong> Standard non-identifying server logs (browser type, request timestamp, referring URL).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">3. How We Use Data</h2>
            <p>
              We solely use your email to deliver our curated dispatches. We never sell, rent, or trade your personal information with third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kernel-charcoal mb-2">4. Your Rights & Unsubscribing</h2>
            <p>
              You have the right to request deletion of your subscriber data at any moment. Every dispatch contains an immediate unsubscribe link, or you may contact us at <code>hello@kernelspace.media</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
