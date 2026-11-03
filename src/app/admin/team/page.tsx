"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Plus, Edit2, Trash2, Check, AlertCircle, Mail } from "lucide-react";
import { TeamMember } from "@/lib/types";
import { DEFAULT_TEAM_MEMBERS } from "@/lib/data/mock-data";
import { upsertTeamMember, deleteTeamMember } from "@/lib/data/mutations";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [biography, setBiography] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openCreateModal = () => {
    setEditingMember(null);
    setName("");
    setRole("");
    setBiography("");
    setImageUrl("");
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setBiography(member.biography || "");
    setImageUrl(member.image_url || "");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: editingMember ? editingMember.id : undefined,
      name,
      role,
      biography,
      image_url: imageUrl || null,
      social_links: editingMember?.social_links || {},
      sort_order: 0,
    };

    const res = await upsertTeamMember(payload);
    setLoading(false);

    if (res.success) {
      if (editingMember) {
        setTeam((prev) =>
          prev.map((m) =>
            m.id === editingMember.id
              ? { ...m, ...payload, id: editingMember.id }
              : m
          )
        );
      } else {
        const newMember: TeamMember = {
          ...payload,
          id: (res.data?.id as string) || `team-${Date.now()}`,
        };
        setTeam((prev) => [...prev, newMember]);
      }
      setFeedback({ type: "success", text: `Contributor "${name}" saved!` });
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: "error", text: res.error || "Failed to save team member" });
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Are you sure you want to remove "${member.name}"?`)) return;

    const res = await deleteTeamMember(member.id);
    if (res.success) {
      setTeam((prev) => prev.filter((m) => m.id !== member.id));
      setFeedback({ type: "success", text: `Removed "${member.name}"` });
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: "error", text: res.error || "Failed to delete team member" });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-kernel-charcoal tracking-tight">
            Team & Contributors
          </h1>
          <p className="text-xs text-kernel-muted mt-1">
            Manage public team profiles displayed on the About page. Empty by default.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-gold text-xs px-4 py-2 inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contributor</span>
        </button>
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

      {team.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.id} className="editorial-card p-5 bg-white space-y-4 flex flex-col justify-between">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-kernel-ivory border border-kernel-border flex-shrink-0">
                  {m.image_url ? (
                    <Image src={m.image_url} alt={m.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-kernel-gold text-lg">
                      {m.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-kernel-charcoal truncate">{m.name}</h3>
                  <span className="text-xs text-kernel-gold font-medium block">{m.role}</span>
                  {m.biography && (
                    <p className="mt-2 text-xs text-kernel-muted line-clamp-2 leading-relaxed">
                      {m.biography}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-kernel-border/60 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(m)}
                  className="p-1.5 text-kernel-muted hover:text-kernel-gold rounded"
                  title="Edit member"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(m)}
                  className="p-1.5 text-kernel-muted hover:text-red-600 rounded"
                  title="Delete member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-white border border-kernel-border space-y-3">
          <Users className="w-8 h-8 text-kernel-gold mx-auto" />
          <h3 className="text-sm font-bold text-kernel-charcoal">
            No Team Members Currently Listed
          </h3>
          <p className="text-xs text-kernel-muted max-w-sm mx-auto">
            Per the brand specifications, the team section is empty by default until you add researchers, hosts, or contributors.
          </p>
          <button
            onClick={openCreateModal}
            className="btn-gold text-xs px-4 py-2 mt-2"
          >
            Add First Contributor
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-kernel-border shadow-floating animate-scale-up">
            <h3 className="text-base font-bold text-kernel-charcoal">
              {editingMember ? "Edit Contributor" : "New Contributor"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Maya Chen"
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Role / Discipline *
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  placeholder="e.g. Lead Researcher, Technology & Systems"
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Avatar / Photo URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-kernel-charcoal mb-1">
                  Short Biography
                </label>
                <textarea
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  rows={3}
                  placeholder="Background in systems engineering and cognitive science..."
                  className="w-full px-3 py-2 rounded-lg border border-kernel-border focus:border-kernel-gold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-ghost text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold text-xs px-4 py-2"
                >
                  {loading ? "Saving..." : "Save Contributor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
