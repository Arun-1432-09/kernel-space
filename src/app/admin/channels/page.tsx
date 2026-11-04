"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Radio,
  CheckCircle,
  XCircle,
  ExternalLink,
  Shield,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
} from "lucide-react";
import { Channel } from "@/lib/types";
import { SEED_CHANNELS } from "@/lib/data/mock-data";
import { upsertChannel } from "@/lib/data/mutations";

export default function AdminChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>(SEED_CHANNELS);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const toggleActiveStatus = async (channel: Channel) => {
    setUpdatingId(channel.id);
    setFeedback(null);
    const newStatus = !channel.is_active;

    try {
      const res = await upsertChannel({ id: channel.id, is_active: newStatus });
      setChannels((prev) =>
        prev.map((c) => (c.id === channel.id ? { ...c, is_active: newStatus } : c))
      );
      if (!res.success && res.error?.includes("Supabase is not configured")) {
        setFeedback({
          type: "success",
          text: `Channel "${channel.name}" set to ${
            newStatus ? "ACTIVE" : "INACTIVE"
          } in preview mode.`,
        });
      } else if (res.success) {
        setFeedback({
          type: "success",
          text: `Channel "${channel.name}" updated successfully.`,
        });
      }
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to update channel." });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-kernel-charcoal tracking-tight">
              Distribution Channels
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-kernel-gold/15 text-kernel-gold">
              {channels.filter((c) => c.is_active).length} active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-kernel-muted mt-1">
            Manage public broadcasts. Per Section 1.11, inactive channels remain private with no live links on public pages.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{feedback.text}</span>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-bold underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Channels List */}
      <div className="space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`editorial-card p-6 bg-white border transition-all ${
              channel.is_active
                ? "border-kernel-border shadow-sm"
                : "border-kernel-border/40 opacity-75 bg-zinc-50/50"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      channel.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-zinc-200 text-zinc-700"
                    }`}
                  >
                    {channel.is_active ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Live Broadcast</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 text-zinc-500" />
                        <span>Future Channel (Inactive)</span>
                      </>
                    )}
                  </span>

                  <span className="text-xs font-mono text-kernel-muted">
                    /channel/{channel.slug}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-kernel-charcoal font-serif">
                  {channel.name}
                </h3>

                <p className="text-xs text-kernel-muted leading-relaxed">
                  {channel.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 self-start">
                {channel.is_active ? (
                  <Link
                    href={`/channel/${channel.slug}`}
                    target="_blank"
                    className="btn-outline text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5"
                  >
                    <span>View Channel</span>
                    <ExternalLink className="w-3 h-3 text-kernel-gold" />
                  </Link>
                ) : (
                  <span className="text-[11px] text-zinc-500 italic px-2 py-1">
                    404 on public site
                  </span>
                )}

                <button
                  onClick={() => toggleActiveStatus(channel)}
                  disabled={updatingId === channel.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    channel.is_active
                      ? "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                      : "bg-kernel-gold text-kernel-charcoal hover:bg-kernel-gold-deep"
                  }`}
                >
                  {channel.is_active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
