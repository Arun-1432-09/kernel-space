"use client";

import React, { useState } from "react";
import { Mail, Download, Search, CheckCircle, Database, AlertCircle } from "lucide-react";
import { NewsletterSubscriber } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const DEMO_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: "sub-1",
    email: "curious.reader@example.com",
    status: "active",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "sub-2",
    email: "systems.thinker@university.edu",
    status: "active",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "sub-3",
    email: "founder.builder@startup.io",
    status: "active",
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
];

export default function AdminNewsletterPage() {
  const isConfigured = isSupabaseConfigured();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(DEMO_SUBSCRIBERS);
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;

    const headers = ["ID", "Email", "Status", "Subscribed At"];
    const rows = subscribers.map((s) => [
      s.id,
      s.email,
      s.status,
      new Date(s.created_at).toISOString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `kernel-space-subscribers-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-kernel-charcoal tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-xs text-kernel-muted mt-1">
            Community members receiving the monthly curated editorial dispatch.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={subscribers.length === 0}
          className="btn-gold-outline text-xs px-4 py-2 inline-flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-kernel-gold" />
          <span>Export CSV</span>
        </button>
      </div>

      {!isConfigured && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Database className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Preview Mode:</strong> Displaying demo subscribers. Connect your Supabase credentials in <code>.env.local</code> to record and view real subscribers.
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-kernel-border">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-kernel-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscribers by email..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-kernel-border text-xs text-kernel-charcoal focus:border-kernel-gold bg-kernel-ivory/20"
          />
        </div>

        <span className="text-xs text-kernel-muted">
          Total Subscribers: <strong className="text-kernel-charcoal">{subscribers.length}</strong>
        </span>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl border border-kernel-border overflow-hidden shadow-subtle">
        <table className="w-full text-left text-xs">
          <thead className="bg-kernel-ivory/60 border-b border-kernel-border text-kernel-charcoal uppercase tracking-wider font-bold">
            <tr>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Subscribed Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kernel-border/60">
            {filtered.length > 0 ? (
              filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-kernel-ivory/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-kernel-charcoal">
                    {sub.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-semibold uppercase tracking-wider">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>{sub.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-kernel-muted">
                    {formatDate(sub.created_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-12 text-center text-kernel-muted">
                  No subscribers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
