import React from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Console | Kernel Space",
  description: "Kernel Space Content Management System",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isConfigured = isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-kernel-ivory/40 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader isConfigured={isConfigured} />
        <main className="p-6 sm:p-10 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
