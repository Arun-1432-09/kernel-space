"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const CATEGORIES_QUICK = [
  { name: "Business", slug: "business-and-startups" },
  { name: "Tech & AI", slug: "technology-and-ai" },
  { name: "Psychology", slug: "psychology-and-mental-health" },
  { name: "Student Life", slug: "student-life-and-gen-z-culture" },
  { name: "Design", slug: "design-and-creativity" },
  { name: "Travel", slug: "travel-and-experiences" },
  { name: "Aviation", slug: "aviation-and-automotive" },
  { name: "Finance", slug: "finance-and-economics" },
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

  // Close mobile menu on route change & handle Escape
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

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-white/60 shadow-[0_8px_30px_rgba(36,35,33,0.04)] py-3"
            : "bg-white/60 backdrop-blur-md border-b border-white/40 py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <Logo variant="light" showTagline={false} />

            {/* Desktop / Tablet Navigation Links Centre */}
            <nav
              className="hidden md:flex items-center space-x-0.5 lg:space-x-1 p-1 lg:p-1.5 rounded-full bg-white/70 backdrop-blur-lg border border-white/80 shadow-subtle flex-shrink-0"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[11px] lg:text-xs uppercase tracking-wider font-semibold transition-all px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full whitespace-nowrap ${
                      isActive
                        ? "bg-white text-kernel-charcoal shadow-sm border border-kernel-border/50"
                        : "text-kernel-grey hover:text-kernel-charcoal hover:bg-white/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Active Kernel Dot Marker */}
                    {isActive && (
                      <span
                        className="inline-block ml-1 lg:ml-1.5 w-1.5 h-1.5 rounded-full bg-kernel-gold align-middle"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop / Tablet Actions Right */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
              {/* Search button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="px-2.5 lg:px-3.5 py-2 rounded-full glass-pill text-kernel-charcoal hover:bg-white transition-all flex items-center gap-1.5 lg:gap-2 text-xs font-medium"
                aria-label="Search dispatches"
              >
                <Search className="w-3.5 h-3.5 text-kernel-gold" />
                <span className="text-kernel-grey hidden lg:inline">Search</span>
                <kbd className="hidden xl:inline text-[10px] bg-black/5 px-1.5 py-0.5 rounded text-kernel-grey font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Gold CTA button */}
              <Link
                href="/explore"
                className="btn-gold text-xs px-3.5 lg:px-5 py-2 lg:py-2.5 shadow-sm hover:shadow whitespace-nowrap"
              >
                <span>Explore</span>
                <span className="hidden lg:inline ml-1">Content</span>
              </Link>
            </div>

            {/* Mobile Actions Right (< 768px) */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-kernel-charcoal hover:bg-black/5 active:bg-black/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-kernel-charcoal" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full text-kernel-charcoal hover:bg-black/5 active:bg-black/10 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-kernel-charcoal" />
                ) : (
                  <Menu className="w-6 h-6 text-kernel-charcoal" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Bulletproof Full-Screen Mobile Navigation Overlay (Rendered outside motion.header) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#F7F4EC] text-kernel-charcoal flex flex-col justify-between md:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar matching main header */}
            <div className="px-4 py-3.5 border-b border-kernel-border/70 flex items-center justify-between bg-white/70 backdrop-blur-md sticky top-0 z-10">
              <Logo variant="light" showTagline={false} />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="p-2 rounded-full text-kernel-charcoal hover:bg-black/5 active:bg-black/10"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-kernel-charcoal hover:bg-black/5 active:bg-black/10"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Menu Links Body */}
            <div className="px-5 py-6 space-y-7 flex-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-accent block mb-3">
                  Navigation
                </span>
                <nav className="flex flex-col space-y-1">
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
                        className={`font-serif text-2xl flex items-center justify-between py-3 px-2 rounded-xl transition-colors border-b border-kernel-border/50 ${
                          isActive
                            ? "text-kernel-gold font-bold bg-kernel-gold/5"
                            : "text-kernel-charcoal hover:bg-black/5"
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-kernel-gold mr-1" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-kernel-grey/60" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Jump into 8 Disciplines */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-accent">
                    8 Disciplines
                  </span>
                  <Link
                    href="/explore"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] font-semibold text-kernel-gold underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES_QUICK.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/explore?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white border border-kernel-border/80 text-kernel-charcoal font-medium shadow-2xs hover:border-kernel-gold active:bg-kernel-gold/10"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-kernel-border/70 bg-white/50 space-y-3">
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full text-center py-3.5 text-sm font-semibold shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Explore Content</span>
                <Compass className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-between text-xs text-kernel-grey pt-1 px-1">
                <Link
                  href="/get-involved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-kernel-charcoal underline"
                >
                  Pitch a Topic
                </Link>
                <span>•</span>
                <Link
                  href="/about#process"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-kernel-charcoal underline"
                >
                  How We Think
                </Link>
                <span>•</span>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-kernel-charcoal underline"
                >
                  Admin
                </Link>
              </div>
              <div className="text-center text-[11px] text-kernel-grey/80 pt-1">
                Think Deeper. Explore Further.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Command Search Dialog */}
      <CommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
