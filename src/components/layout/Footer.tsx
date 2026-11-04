import React from "react";
import Link from "next/link";
import { Logo } from "../ui/Logo";
import { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings?: SiteSettings;
}

const CATEGORIES_LIST = [
  { name: "Business & Startups", slug: "business-and-startups", num: "01" },
  { name: "Technology & AI", slug: "technology-and-ai", num: "02" },
  { name: "Psychology & Mental Health", slug: "psychology-and-mental-health", num: "03" },
  { name: "Student Life & Gen-Z Culture", slug: "student-life-and-gen-z-culture", num: "04" },
  { name: "Design & Creativity", slug: "design-and-creativity", num: "05" },
  { name: "Travel & Experiences", slug: "travel-and-experiences", num: "06" },
  { name: "Aviation & Automotive", slug: "aviation-and-automotive", num: "07" },
  { name: "Finance & Economics", slug: "finance-and-economics", num: "08" },
];

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const contactEmail = settings?.contactEmail;
  const socials = settings?.socialLinks || {};

  return (
    <footer className="bg-white border-t border-kernel-border/80 pt-16 sm:pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-kernel-border/60">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" showTagline={true} />
            <p className="text-sm text-kernel-grey max-w-sm leading-relaxed pt-2">
              We explore ideas, break down complex topics and have real conversations that help people understand the world a little better.
            </p>
            {contactEmail && (
              <div className="pt-2 text-xs text-kernel-grey">
                <span>Inquiries: </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-kernel-charcoal font-medium hover:text-kernel-gold-deep underline underline-offset-4"
                >
                  {contactEmail}
                </a>
              </div>
            )}
          </div>

          {/* Categories Grid (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gold-accent mb-4">
              Disciplines
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-kernel-grey">
              {CATEGORIES_LIST.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/explore?category=${cat.slug}`}
                  className="hover:text-kernel-charcoal transition-colors truncate flex items-center gap-1.5"
                >
                  <span className="font-serif text-[10px] text-kernel-gold">{cat.num}</span>
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links & Platforms (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gold-accent mb-4">
              Navigation & Platforms
            </h4>
            <ul className="space-y-2 text-xs text-kernel-grey">
              <li>
                <Link href="/explore" className="hover:text-kernel-charcoal transition-colors">
                  All Content
                </Link>
              </li>
              <li>
                <Link href="/watch" className="hover:text-kernel-charcoal transition-colors">
                  Watch (Visual Deep Dives)
                </Link>
              </li>
              <li>
                <Link href="/listen" className="hover:text-kernel-charcoal transition-colors">
                  Listen (Podcast Conversations)
                </Link>
              </li>
              <li>
                <Link href="/read" className="hover:text-kernel-charcoal transition-colors">
                  Read (Essays & Explanations)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-kernel-charcoal transition-colors">
                  Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-kernel-gold-deep transition-colors font-semibold text-gold-accent">
                  Pitch a Topic →
                </Link>
              </li>
              {/* Only show social links if configured */}
              {socials.youtube && (
                <li>
                  <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-kernel-charcoal transition-colors">
                    YouTube
                  </a>
                </li>
              )}
              {socials.spotify && (
                <li>
                  <a href={socials.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-kernel-charcoal transition-colors">
                    Spotify
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-kernel-grey gap-4">
          <p>© {currentYear} Kernel Space Media. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <Link href="/privacy" className="hover:text-kernel-charcoal transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-kernel-charcoal transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-gold-accent transition-colors font-semibold">
              Admin CMS
            </Link>
          </div>
        </div>
      </div>

      {/* Large Faded Watermark Wordmark across Bottom per Section 4.11 */}
      <div
        className="w-full text-center select-none pointer-events-none mt-8 -mb-10 opacity-[0.04] overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-serif text-[130px] sm:text-[180px] lg:text-[240px] tracking-[0.2em] font-bold text-kernel-charcoal leading-none inline-block">
          KERNEL SPACE
        </span>
      </div>
    </footer>
  );
}
