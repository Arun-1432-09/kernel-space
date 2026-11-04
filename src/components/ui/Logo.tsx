import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark" | "monogram";
  showTagline?: boolean;
  className?: string;
  linkHref?: string;
}

export function Logo({
  variant = "light",
  showTagline = false,
  className = "",
  linkHref = "/",
}: LogoProps) {
  const isDark = variant === "dark";
  const isMonogram = variant === "monogram";

  // Signature Mark: Open Ring with Kernel Dot inside
  const Mark = (
    <svg
      viewBox="0 0 36 36"
      className={isMonogram ? "w-6 h-6" : "w-7 h-7 flex-shrink-0"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* The Open Ring: aperture with a delicate gap at top-right */}
      <circle
        cx="18"
        cy="18"
        r="14"
        stroke={isDark ? "#C6A15B" : "#A9843E"}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="72 16"
        strokeDashoffset="-8"
      />
      {/* Faint secondary guide ring */}
      <circle
        cx="18"
        cy="18"
        r="10"
        stroke={isDark ? "rgba(198,161,91,0.25)" : "rgba(169,132,62,0.2)"}
        strokeWidth="0.8"
        strokeDasharray="2 3"
      />
      {/* The Kernel Dot: Solid gold core */}
      <circle
        cx="18"
        cy="18"
        r="4.5"
        fill="#C6A15B"
      />
    </svg>
  );

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {Mark}

      {!isMonogram && (
        <div className="flex flex-col">
          <div className="flex items-baseline tracking-[0.16em]">
            <span
              className={`font-serif text-lg tracking-[0.18em] uppercase ${
                isDark ? "text-white font-medium" : "text-kernel-charcoal font-semibold"
              }`}
            >
              KERNEL
            </span>
            <span
              className={`ml-1.5 font-serif text-lg tracking-[0.18em] uppercase ${
                isDark ? "text-kernel-gold font-normal" : "text-kernel-grey font-normal"
              }`}
            >
              SPACE
            </span>
          </div>
          {showTagline && (
            <span
              className={`text-[9px] font-sans font-medium tracking-[0.22em] uppercase mt-0.5 ${
                isDark ? "text-kernel-border" : "text-gold-accent"
              }`}
            >
              Think Deeper. Explore Further.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (linkHref) {
    return (
      <Link
        href={linkHref}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kernel-gold rounded"
        aria-label="Kernel Space Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
