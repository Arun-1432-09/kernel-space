"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [ageConsent, setAgeConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot bot check
    if (honeypot) {
      return;
    }

    if (!ageConsent) {
      setStatus("error");
      setMessage("Please confirm that you are 18 or older, or have a parent or guardian's permission.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot, ageConsent }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Subscription could not be completed.");
      } else {
        setStatus("success");
        setMessage(data.message || "Get new ideas in your inbox. No noise.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Something broke on our side. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white/50 relative overflow-hidden border-b border-kernel-border/70">
      {/* Soft ambient glass glows */}
      <div className="glass-ambient-gold w-[400px] h-[400px] -top-20 -left-10 opacity-30" aria-hidden="true" />
      <div className="glass-ambient-ivory w-[400px] h-[400px] -bottom-20 -right-10 opacity-50" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-editorial-lg sm:rounded-editorial-xl p-5 sm:p-10 lg:p-14 text-center space-y-6 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-full glass-pill flex items-center justify-center mx-auto text-kernel-gold border border-white/80 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="heading-section text-3xl sm:text-4xl font-normal">
              Curiosity doesn't end here.
            </h2>
            <p className="subheading-editorial text-sm sm:text-base">
              Discover new ideas, interesting conversations and thoughtful explorations. Stay connected with Kernel Space.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 pt-2">
            {/* Honeypot hidden input */}
            <input
              type="text"
              name="company_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="newsletter-email-input" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                disabled={loading}
                className="flex-grow px-4 py-3 rounded-full border border-white/80 focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold text-xs sm:text-sm bg-white/80 backdrop-blur-md text-kernel-charcoal placeholder-kernel-grey/60 shadow-xs"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-gold text-xs px-6 py-3 whitespace-nowrap inline-flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Under-18 Parental Consent Checkbox (Section 12 DPDP compliance) */}
            <label className="flex items-start gap-2.5 text-left cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={ageConsent}
                onChange={(e) => setAgeConsent(e.target.checked)}
                className="mt-0.5 rounded text-kernel-gold focus:ring-kernel-gold w-3.5 h-3.5 flex-shrink-0"
              />
              <span className="text-[11px] text-kernel-grey leading-tight">
                I'm 18 or older, or I have a parent or guardian's permission.
              </span>
            </label>

            {/* Status Feedback */}
            {status === "success" && (
              <div
                role="status"
                className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs flex items-center justify-center gap-2 animate-fade-in"
              >
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2 text-left animate-fade-in"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            <p className="text-[11px] text-kernel-grey pt-1">
              We'll email you new ideas. Unsubscribe anytime with one click.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
