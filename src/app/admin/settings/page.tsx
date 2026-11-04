"use client";

import React, { useState } from "react";
import { Settings, Save, Loader2, Check, AlertCircle } from "lucide-react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/data/mock-data";
import { updateSiteSettings } from "@/lib/data/mutations";
import { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const res = await updateSiteSettings(settings);
    setLoading(false);

    if (res.success) {
      setFeedback({ type: "success", text: "Site settings updated successfully!" });
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: "error", text: res.error || "Failed to save settings" });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-kernel-charcoal tracking-tight">
          Site Configuration & Brand Settings
        </h1>
        <p className="text-xs text-kernel-muted mt-1">
          Update the platform title, tagline, split hero copy, founder's note, and official distribution channels.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 animate-fade-in shadow-card ${
            feedback.type === "success"
              ? "bg-green-50 border-green-200 text-green-900"
              : "bg-amber-50 border-amber-200 text-amber-950"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>{feedback.text}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Split Hero Copy */}
        <div className="bg-white p-6 rounded-2xl border border-kernel-border space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-kernel-charcoal">
            Split Hero Section Copy
          </h2>

          <div>
            <label className="block font-semibold text-kernel-charcoal mb-1">
              Pill Badge Label
            </label>
            <input
              type="text"
              value={settings.heroLabel}
              onChange={(e) => setSettings({ ...settings, heroLabel: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-kernel-charcoal mb-1">
              Headline
            </label>
            <input
              type="text"
              value={settings.heroHeadline}
              onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-kernel-border font-bold text-sm focus:border-kernel-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-kernel-charcoal mb-1">
              Support Text
            </label>
            <textarea
              value={settings.heroSupportText}
              onChange={(e) => setSettings({ ...settings, heroSupportText: e.target.value })}
              rows={3}
              required
              className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold leading-relaxed"
            />
          </div>
        </div>

        {/* Founder's Note (Section 1.7) */}
        <div className="bg-white p-6 rounded-2xl border border-kernel-border space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-kernel-charcoal">
            Founder's Note (Truthful Narrative)
          </h2>
          <p className="text-[11px] text-kernel-muted">
            Displayed on the About page. Must reflect the authentic founder profile per Section 1.7. Never invent credentials or fake career milestones.
          </p>

          <div>
            <label className="block font-semibold text-kernel-charcoal mb-1">
              Founder Statement
            </label>
            <textarea
              value={settings.founder_note || ""}
              onChange={(e) => setSettings({ ...settings, founder_note: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold leading-relaxed"
            />
          </div>
        </div>

        {/* Contact & Legal */}
        <div className="bg-white p-6 rounded-2xl border border-kernel-border space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-kernel-charcoal">
            Contact & General Communications
          </h2>

          <div>
            <label className="block font-semibold text-kernel-charcoal mb-1">
              Public Contact Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold font-mono"
            />
          </div>
        </div>

        {/* Social / Distribution Links */}
        <div className="bg-white p-6 rounded-2xl border border-kernel-border space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-kernel-charcoal">
            Distribution Channels & Social Links
          </h2>
          <p className="text-[11px] text-kernel-muted">
            Leave blank if not yet live. Empty links are automatically hidden on public pages per truthfulness rules.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-kernel-charcoal mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={settings.socialLinks?.youtube || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                  })
                }
                placeholder="https://youtube.com/@kernelspace"
                className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-kernel-charcoal mb-1">
                Spotify Show URL
              </label>
              <input
                type="url"
                value={settings.socialLinks?.spotify || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, spotify: e.target.value },
                  })
                }
                placeholder="https://open.spotify.com/show/..."
                className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-kernel-charcoal mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.socialLinks?.instagram || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/kernelspace"
                className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-kernel-charcoal mb-1">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={settings.socialLinks?.linkedin || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/company/kernelspace"
                className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-gold text-xs px-6 py-2.5 inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
