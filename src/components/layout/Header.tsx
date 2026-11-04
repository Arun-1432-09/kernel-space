"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "../ui/Logo";
import { CommandSearch } from "./CommandSearch";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Watch", href: "/watch" },
  { label: "Listen", href: "/listen" },
  { label: "Read", href: "/read" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Listen for scroll to toggle subtle frosted backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for / or Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-[0_8px_30px_rgba(36,35,33,0.04)] py-3"
            : "bg-white/40 backdrop-blur-md border-b border-white/30 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <Logo variant="light" showTagline={false} />

            {/* Desktop Navigation Links Centre */}
            <nav className="hidden lg:flex items-center space-x-1 p-1.5 rounded-full bg-white/60 backdrop-blur-lg border border-white/80 shadow-subtle" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-wider font-semibold transition-all px-4 py-2 rounded-full ${
                      isActive
                        ? "bg-white text-kernel-charcoal shadow-sm border border-kernel-border/50"
                        : "text-kernel-grey hover:text-kernel-charcoal hover:bg-white/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Active Kernel Dot Marker */}
                    {isActive && (
                      <span
                        className="inline-block ml-1.5 w-1.5 h-1.5 rounded-full bg-kernel-gold align-middle"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions Right */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Icon button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="px-3.5 py-2 rounded-full glass-pill text-kernel-charcoal hover:bg-white transition-all flex items-center gap-2 text-xs font-medium"
                aria-label="Search content"
                title="Search (/ or ⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-kernel-charcoal" />
                <span className="text-[11px] text-kernel-grey font-mono">
                  Search
                </span>
                <span className="text-[10px] bg-kernel-ivory px-1.5 py-0.5 rounded text-kernel-gold font-mono font-bold border border-kernel-border">
                  ⌘K
                </span>
              </button>

              <Link
                href="/explore"
                className="btn-gold text-xs px-5 py-2.5 shadow-sm"
              >
                Explore Content
              </Link>
            </div>

            {/* Mobile Actions Right */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-kernel-charcoal hover:bg-black/5"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-kernel-charcoal hover:bg-black/5"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Screen Overlay Navigation */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 top-16 z-50 bg-kernel-ivory/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:hidden border-t border-white/80 animate-fade-in"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col space-y-4 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent mb-2">
                Navigation
              </span>
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-2xl flex items-center justify-between py-2 border-b border-kernel-border/60 ${
                      isActive ? "text-kernel-gold-deep font-semibold" : "text-kernel-charcoal"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-kernel-gold" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-kernel-grey" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-4 pt-6 border-t border-kernel-border">
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full text-center py-3.5 text-sm"
              >
                Explore Content
              </Link>
              <div className="text-center text-xs text-kernel-grey">
                Think Deeper. Explore Further.
              </div>
            </div>
          </div>
        )}
      </motion.header>

      {/* Full-Screen Command Search Dialog */}
      <CommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
