"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "../ui/Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Watch", href: "/watch" },
  { label: "Listen", href: "/listen" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-kernel-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo variant="light" showTagline={true} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 py-1 border-b-2 ${
                  isActive
                    ? "text-kernel-charcoal border-kernel-gold font-semibold"
                    : "text-kernel-muted border-transparent hover:text-kernel-charcoal hover:border-kernel-border"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Admin Link */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs font-medium text-kernel-muted hover:text-kernel-charcoal transition-colors px-2 py-1"
          >
            Admin CMS
          </Link>
          <Link
            href="/explore"
            className="btn-gold"
          >
            Explore Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-kernel-charcoal hover:bg-kernel-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kernel-gold"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-50 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-kernel-border px-6 pt-4 pb-8 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-kernel-ivory text-kernel-charcoal font-semibold border-l-4 border-kernel-gold"
                        : "text-kernel-muted hover:text-kernel-charcoal hover:bg-kernel-ivory/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-kernel-muted" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-kernel-border flex flex-col gap-3">
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full text-center py-3"
              >
                Explore Now
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs font-medium text-kernel-muted hover:text-kernel-charcoal py-2"
              >
                Go to Admin CMS
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
