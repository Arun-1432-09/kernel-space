"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
  Settings,
  Mail,
  ExternalLink,
  Shield,
  Sparkles,
  Radio,
} from "lucide-react";
import { Logo } from "../ui/Logo";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Topic Pitches", href: "/admin/pitches", icon: Sparkles },
  { label: "Channels", href: "/admin/channels", icon: Radio },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-kernel-border flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-kernel-border">
          <Logo variant="light" showTagline={false} linkHref="/" />
          <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-kernel-ivory border border-kernel-border text-[10px] font-bold text-kernel-gold uppercase tracking-widest w-fit">
            <Shield className="w-3 h-3 text-kernel-gold" />
            <span>Admin Console</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {ADMIN_NAV.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-kernel-ivory text-kernel-charcoal font-semibold border-l-4 border-kernel-gold shadow-sm"
                    : "text-kernel-muted hover:text-kernel-charcoal hover:bg-kernel-ivory/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-kernel-gold" : "text-kernel-muted"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Back to site */}
      <div className="p-4 border-t border-kernel-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-kernel-muted hover:text-kernel-charcoal hover:bg-kernel-ivory transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-kernel-gold" />
        </Link>
      </div>
    </aside>
  );
}
