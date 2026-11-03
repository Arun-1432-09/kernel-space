"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, ShieldCheck, Database } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const isConfigured = isSupabaseConfigured();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!isConfigured) {
      // In local preview mode when Supabase credentials are not yet configured in .env.local
      // Allow preview operator login
      setTimeout(() => {
        router.push("/admin");
      }, 500);
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client failed to initialize");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Verify admin role authorization in database
      const { data: adminRecord, error: adminErr } = await supabase
        .from("admin_users")
        .select("role")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (adminErr || !adminRecord) {
        await supabase.auth.signOut();
        throw new Error("Access denied: This account does not possess administrator privileges.");
      }

      router.push("/admin");
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid authentication credentials.");
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-kernel-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo variant="light" showTagline={false} />
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-kernel-charcoal">
          Admin CMS Authentication
        </h2>
        <p className="mt-2 text-xs text-kernel-muted">
          Secured editorial management console for Kernel Space Media
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-kernel-border shadow-card space-y-6">
          {/* Supabase Notice if not configured */}
          {!isConfigured && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <Database className="w-4 h-4 text-amber-600" />
                <span>Supabase Not Yet Configured</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code> to enable live database authentication.
              </p>
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full mt-2 py-1.5 px-3 rounded bg-amber-200/80 hover:bg-amber-300 font-semibold text-amber-950 text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enter CMS in Demo Preview Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-kernel-charcoal mb-1"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-kernel-muted" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kernelspace.media"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-kernel-border text-sm text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold bg-kernel-ivory/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-kernel-charcoal mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-kernel-muted" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-kernel-border text-sm text-kernel-charcoal focus:border-kernel-gold focus:ring-1 focus:ring-kernel-gold bg-kernel-ivory/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-2.5 text-sm font-semibold flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate Operator</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-kernel-border">
            <Link
              href="/"
              className="text-xs text-kernel-muted hover:text-kernel-gold transition-colors inline-flex items-center gap-1"
            >
              <span>← Return to Public Site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
