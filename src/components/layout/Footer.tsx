import React from "react";
import Link from "next/link";
import { Logo } from "../ui/Logo";
import { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const contactEmail = settings?.contactEmail || "hello@kernelspace.media";
  const socials = settings?.socialLinks || {
    youtube: "https://youtube.com/@kernelspace",
    spotify: "https://open.spotify.com/show/kernelspace",
    instagram: "https://instagram.com/kernelspace",
    twitter: "https://x.com/kernelspace",
    linkedin: "https://linkedin.com/company/kernelspace",
  };

  return (
    <footer className="bg-kernel-ivory border-t border-kernel-border mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-kernel-border">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <Logo variant="light" showTagline={true} />
            <p className="text-sm text-kernel-muted max-w-md leading-relaxed mt-3">
              An independent media platform for curiosity, learning, and meaningful conversation.
              Exploring ideas across technology, business, psychology, and design without oversimplifying.
            </p>
            <div className="pt-2 text-xs text-kernel-muted">
              <span>Direct inquiries: </span>
              <a
                href={`mailto:${contactEmail}`}
                className="text-kernel-charcoal font-medium hover:text-kernel-gold underline underline-offset-4"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-kernel-muted">
              <li>
                <Link href="/" className="hover:text-kernel-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-kernel-gold transition-colors">
                  All Content
                </Link>
              </li>
              <li>
                <Link href="/watch" className="hover:text-kernel-gold transition-colors">
                  Watch (Visual Explainers)
                </Link>
              </li>
              <li>
                <Link href="/listen" className="hover:text-kernel-gold transition-colors">
                  Listen (Podcast Conversations)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-kernel-gold transition-colors">
                  About & Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect & Platform */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-kernel-charcoal mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm text-kernel-muted">
              {socials.youtube && (
                <li>
                  <a
                    href={socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kernel-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    YouTube
                  </a>
                </li>
              )}
              {socials.spotify && (
                <li>
                  <a
                    href={socials.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kernel-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    Spotify Podcasts
                  </a>
                </li>
              )}
              {socials.instagram && (
                <li>
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kernel-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {socials.linkedin && (
                <li>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kernel-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              <li>
                <Link href="/admin" className="text-kernel-gold font-medium hover:underline">
                  Admin CMS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-kernel-muted gap-4">
          <p>© {currentYear} Kernel Space Media. All rights reserved. Built for curious minds.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-kernel-charcoal transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-kernel-charcoal transition-colors">
              Terms of Service
            </Link>
            <span className="text-kernel-border">|</span>
            <span className="text-kernel-gold font-serif italic text-sm">
              Think Deeper. Explore Further.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
