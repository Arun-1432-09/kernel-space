"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Database, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminHeaderProps {
  isConfigured: boolean;
}

export function AdminHeader({ isConfigured }: AdminHeaderProps) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setUserEmail(data.user.email);
        }
      });
    }
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  };

  return (
    <header className="h-16 bg-white border-b border-kernel-border px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Database Status indicator */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
            isConfigured
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>
            {isConfigured ? "Supabase Live Connected" : "Local Preview Mode"}
          </span>
          {isConfigured ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-kernel-muted hidden sm:inline-block">
          Logged in as: <strong className="text-kernel-charcoal">{userEmail || "Admin Operator"}</strong>
        </span>

        <button
          onClick={handleSignOut}
          className="btn-gold-outline text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
          title="Sign out of Admin"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
