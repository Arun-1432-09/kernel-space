"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  Plus,
  Mail,
  User,
  ShieldCheck,
  Trash2,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Pitch, PitchStatus } from "@/lib/types";
import { SEED_PITCHES } from "@/lib/data/mock-data";
import { updatePitchStatus, deletePitch } from "@/lib/data/mutations";
import { formatDate } from "@/lib/utils";

export default function AdminPitchesPage() {
  const [pitches, setPitches] = useState<Pitch[]>(SEED_PITCHES);
  const [filter, setFilter] = useState<PitchStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredPitches = pitches.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const handleStatusChange = async (id: string, newStatus: PitchStatus) => {
    setUpdatingId(id);
    setFeedback(null);
    try {
      const res = await updatePitchStatus(id, newStatus);
      // Even in preview / demo mode, update local state
      setPitches((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (!res.success && res.error?.includes("Supabase is not configured")) {
        setFeedback({
          type: "success",
          text: `Status updated to "${newStatus}" in preview mode. Connect Supabase for database persistence.`,
        });
      } else if (res.success) {
        setFeedback({
          type: "success",
          text: `Pitch updated to "${newStatus}".`,
        });
      }
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to update status." });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this pitch?")) return;
    setUpdatingId(id);
    try {
      await deletePitch(id);
      setPitches((prev) => prev.filter((item) => item.id !== id));
      setFeedback({ type: "success", text: "Pitch removed." });
    } catch (err: any) {
      setFeedback({ type: "error", text: "Failed to remove pitch." });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-kernel-charcoal tracking-tight">
              Topic Pitches Inbox
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-kernel-gold/15 text-kernel-gold">
              {pitches.length} total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-kernel-muted mt-1">
            Questions and investigative topics pitched by the community through the Get Involved form.
          </p>
        </div>

        <Link
          href="/get-involved"
          target="_blank"
          className="btn-outline text-xs px-4 py-2 inline-flex items-center gap-2 w-fit"
        >
          <span>View Public Pitch Form</span>
          <ExternalLink className="w-3.5 h-3.5 text-kernel-gold" />
        </Link>
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-kernel-border/60 pb-3 overflow-x-auto">
        {(["all", "new", "reviewing", "accepted", "declined"] as const).map((tab) => {
          const count =
            tab === "all" ? pitches.length : pitches.filter((p) => p.status === tab).length;
          const isActive = filter === tab;

          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? "bg-kernel-charcoal text-white"
                  : "bg-white text-kernel-muted hover:text-kernel-charcoal border border-kernel-border/60"
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-kernel-ivory text-kernel-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pitches List */}
      {filteredPitches.length === 0 ? (
        <div className="editorial-card p-12 text-center bg-white space-y-3">
          <Sparkles className="w-8 h-8 text-kernel-gold mx-auto stroke-[1.5]" />
          <h3 className="text-sm font-semibold text-kernel-charcoal">
            No pitches in this category
          </h3>
          <p className="text-xs text-kernel-muted max-w-sm mx-auto">
            When readers pitch investigative ideas or questions via /get-involved, they will appear here for editorial review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPitches.map((pitch) => {
            const statusConfig = {
              new: { label: "New Pitch", bg: "bg-amber-100 text-amber-900 border-amber-200" },
              reviewing: { label: "Under Review", bg: "bg-blue-100 text-blue-900 border-blue-200" },
              accepted: { label: "Accepted", bg: "bg-green-100 text-green-900 border-green-200" },
              declined: { label: "Declined", bg: "bg-zinc-100 text-zinc-700 border-zinc-200" },
            }[pitch.status];

            const convertUrl = `/admin/content/new?title=${encodeURIComponent(
              pitch.topic
            )}&description=${encodeURIComponent(
              pitch.why_it_matters
            )}&open_questions=${encodeURIComponent(pitch.core_question)}`;

            return (
              <div
                key={pitch.id}
                className="editorial-card p-6 bg-white space-y-5 border border-kernel-border hover:border-kernel-gold/50 transition-colors"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${statusConfig.bg}`}
                      >
                        {statusConfig.label}
                      </span>
                      {pitch.consent_confirmed && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-green-800 bg-green-50 border border-green-200 px-2 py-0.5 rounded font-medium">
                          <ShieldCheck className="w-3 h-3 text-green-700" />
                          <span>Age / Consent Verified</span>
                        </span>
                      )}
                      <span className="text-xs text-kernel-muted">
                        Submitted {formatDate(pitch.created_at)}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-kernel-charcoal font-serif tracking-tight mt-1">
                      {pitch.topic}
                    </h2>
                  </div>

                  {/* Quick conversion button */}
                  <Link
                    href={convertUrl}
                    className="btn-gold text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 whitespace-nowrap self-start shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Draft Article</span>
                  </Link>
                </div>

                {/* Question & Rationale */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-kernel-ivory/60 p-4 rounded-xl border border-kernel-border/60 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-kernel-gold block">
                      Core Question
                    </span>
                    <p className="text-kernel-charcoal font-medium leading-relaxed">
                      "{pitch.core_question}"
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-kernel-muted block">
                      Why This Matters
                    </span>
                    <p className="text-kernel-muted leading-relaxed">
                      {pitch.why_it_matters}
                    </p>
                  </div>
                </div>

                {/* Submitter & Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs border-t border-kernel-border/40">
                  <div className="flex items-center gap-4 text-kernel-muted">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-kernel-gold" />
                      <span className="font-medium text-kernel-charcoal">
                        {pitch.name || "Anonymous Submitter"}
                      </span>
                    </div>

                    {pitch.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-kernel-gold" />
                        <a
                          href={`mailto:${pitch.email}`}
                          className="hover:underline hover:text-kernel-gold"
                        >
                          {pitch.email}
                        </a>
                      </div>
                    )}

                    {pitch.links && (
                      <a
                        href={pitch.links}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-kernel-gold hover:underline font-medium"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Reference Link</span>
                      </a>
                    )}
                  </div>

                  {/* Status Actions */}
                  <div className="flex items-center gap-2">
                    {pitch.status !== "reviewing" && (
                      <button
                        onClick={() => handleStatusChange(pitch.id, "reviewing")}
                        disabled={updatingId === pitch.id}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 transition-colors"
                      >
                        Review
                      </button>
                    )}

                    {pitch.status !== "accepted" && (
                      <button
                        onClick={() => handleStatusChange(pitch.id, "accepted")}
                        disabled={updatingId === pitch.id}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-green-50 text-green-800 hover:bg-green-100 border border-green-200 transition-colors"
                      >
                        Accept
                      </button>
                    )}

                    {pitch.status !== "declined" && (
                      <button
                        onClick={() => handleStatusChange(pitch.id, "declined")}
                        disabled={updatingId === pitch.id}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200 transition-colors"
                      >
                        Decline
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(pitch.id)}
                      disabled={updatingId === pitch.id}
                      className="p-1 text-kernel-muted hover:text-red-600 transition-colors ml-1"
                      title="Delete pitch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
