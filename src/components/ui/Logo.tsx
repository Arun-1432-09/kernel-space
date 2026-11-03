import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark" | "compact";
  showTagline?: boolean;
  className?: string;
  linkHref?: string;
}

export function Logo({
  variant = "light",
  showTagline = true,
  className = "",
  linkHref = "/",
}: LogoProps) {
  const isDark = variant === "dark";
  const isCompact = variant === "compact";

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Kernel Symbol: Core connected to outer nodes */}
      <svg
        viewBox="0 0 40 40"
        className={isCompact ? "w-8 h-8" : "w-9 h-9 flex-shrink-0"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Orbital connector paths */}
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="7"
          stroke="#C6A15B"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="20"
          x2="32.5"
          y2="12.5"
          stroke="#C6A15B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <line
          x1="20"
          y1="20"
          x2="31"
          y2="29"
          stroke="#C6A15B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <line
          x1="20"
          y1="20"
          x2="9"
          y2="29"
          stroke="#C6A15B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <line
          x1="20"
          y1="20"
          x2="7.5"
          y2="12.5"
          stroke="#C6A15B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />

        {/* Orbit ring */}
        <circle
          cx="20"
          cy="20"
          r="14.5"
          stroke={isDark ? "rgba(255,255,255,0.25)" : "#E8E1D2"}
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Central Core (Kernel) */}
        <circle cx="20" cy="20" r="5.5" fill="#C6A15B" />
        <circle cx="20" cy="20" r="2.2" fill={isDark ? "#242321" : "#FFFFFF"} />

        {/* Satellite Perspective Nodes */}
        <circle cx="20" cy="7" r="3" fill={isDark ? "#F7F4EC" : "#A9843E"} />
        <circle cx="32.5" cy="12.5" r="2.5" fill="#C6A15B" />
        <circle cx="31" cy="29" r="3.2" fill={isDark ? "#C6A15B" : "#242321"} />
        <circle cx="9" cy="29" r="2.6" fill="#C6A15B" />
        <circle cx="7.5" cy="12.5" r="3" fill={isDark ? "#F7F4EC" : "#A9843E"} />
      </svg>

      {!isCompact && (
        <div className="flex flex-col">
          <div className="flex items-baseline tracking-wider">
            <span
              className={`font-bold text-lg leading-tight tracking-[0.14em] ${
                isDark ? "text-white" : "text-kernel-charcoal"
              }`}
            >
              KERNEL
            </span>
            <span
              className={`ml-1.5 font-light text-lg leading-tight tracking-[0.16em] ${
                isDark ? "text-kernel-gold" : "text-kernel-muted"
              }`}
            >
              SPACE
            </span>
          </div>
          {showTagline && (
            <span
              className={`text-[9px] font-medium tracking-[0.2em] uppercase leading-tight mt-0.5 ${
                isDark ? "text-kernel-border" : "text-kernel-gold-hover"
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
