"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Logo } from "../ui/Logo";
import { SiteSettings } from "@/lib/types";

interface ContactNewsletterProps {
  settings?: SiteSettings;
}

export function ContactNewsletter({ settings }: ContactNewsletterProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const contactEmail = settings?.contactEmail || "hello@kernelspace.media";
  const socials = settings?.socialLinks || {
    youtube: "https://youtube.com/@kernelspace",
    spotify: "https://open.spotify.com/show/kernelspace",
    instagram: "https://instagram.com/kernelspace",
    twitter: "https://x.com/kernelspace",
    linkedin: "https://linkedin.com/company/kernelspace",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Subscription request failed.");
      } else {
        setStatus("success");
        setMessage(data.message || "Thank you for joining our community!");
        setEmail("");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-kernel-ivory/80 border-b border-kernel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Find us & get in touch */}
          <div className="lg:col-span-6 space-y-6">
            <Logo variant="light" showTagline={false} />

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-kernel-charcoal tracking-tight">
                Find us & get in touch
              </h2>
              <p className="text-sm sm:text-base text-kernel-muted leading-relaxed">
                Whether you want to suggest a fascinating topic, share a contrarian perspective, or collaborate on visual explainers, we read every note.
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-kernel-muted block mb-1">
                Direct Inquiries
              </span>
              <a
                href={`mailto:${contactEmail}`}
                className="text-lg font-bold text-kernel-charcoal hover:text-kernel-gold transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5 text-kernel-gold" />
                <span>{contactEmail}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-kernel-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-kernel-muted block mb-3">
                Distribution Channels
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-kernel-charcoal">
                {socials.youtube && (
                  <a
                    href={socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-kernel-border bg-white hover:border-kernel-gold transition-colors"
                  >
                    YouTube
                  </a>
                )}
                {socials.spotify && (
                  <a
                    href={socials.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-kernel-border bg-white hover:border-kernel-gold transition-colors"
                  >
                    Spotify Podcasts
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-kernel-border bg-white hover:border-kernel-gold transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-kernel-border bg-white hover:border-kernel-gold transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Join the Kernel Space community (Newsletter) */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-2xl border border-kernel-border shadow-card">
            <span className="text-xs font-semibold uppercase tracking-wider text-kernel-gold block mb-2">
              Monthly Dispatch
            </span>
            <h3 className="text-2xl font-bold text-kernel-charcoal">
              Join the Kernel Space community
            </h3>
            <p className="mt-2 text-sm text-kernel-muted leading-relaxed">
              1-2 high-signal dispatches per month. Syntheses of our conversations, curated visual breakdowns, and rabbit holes worth exploring. No spam, ever.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-kernel-border focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold text-sm text-kernel-charcoal placeholder-kernel-muted/70 bg-kernel-ivory/20"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3 text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe to Dispatches</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Validation & Feedback States */}
            {status === "success" && (
              <div
                role="status"
                className="mt-4 p-3.5 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-fade-in"
              >
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="mt-4 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 animate-fade-in"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            <p className="mt-4 text-[11px] text-kernel-muted leading-normal">
              By subscribing, you agree to receive our editorial dispatch. You can unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
