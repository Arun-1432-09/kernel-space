"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ageConsent, setAgeConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    if (!ageConsent) {
      setStatus("error");
      setFeedback("Please confirm that you are 18 or older, or have a parent or guardian's permission.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, consent_confirmed: ageConsent, honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "Message could not be sent.");
      } else {
        setStatus("success");
        setFeedback("Thank you. Your message has reached our editorial team.");
        setName("");
        setEmail("");
        setMessage("");
        setAgeConsent(false);
      }
    } catch {
      setStatus("error");
      setFeedback("Something broke on our side. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-kernel-border text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
            <Mail className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Direct Inquiries</span>
          </div>
          <h1 className="heading-hero">
            Get in touch.
          </h1>
          <p className="subheading-editorial text-base sm:text-lg">
            Whether you have feedback on an inquiry, want to propose an editorial collaboration, or have a press question, we read every note.
          </p>
        </div>

        <div className="bg-white rounded-editorial-lg p-8 sm:p-12 border border-kernel-border shadow-card space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <input
              type="text"
              name="company_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="block font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Maya Chen"
                className="w-full px-4 py-2.5 rounded-lg border border-kernel-border bg-kernel-ivory/30 focus:border-kernel-gold"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                Your Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="maya@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-kernel-border bg-kernel-ivory/30 focus:border-kernel-gold"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-kernel-charcoal mb-1">
                Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="What would you like to discuss with the Kernel Space team?"
                className="w-full px-4 py-2.5 rounded-lg border border-kernel-border bg-kernel-ivory/30 focus:border-kernel-gold leading-relaxed"
              />
            </div>

            {/* Age Consent Checkbox */}
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

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 text-xs font-semibold inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {status === "success" && (
            <div
              role="status"
              className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs flex items-center gap-2.5"
            >
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
