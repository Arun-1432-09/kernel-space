import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Cpu,
  Brain,
  GraduationCap,
  Palette,
  Compass,
  Plane,
  TrendingUp,
  Folder,
  ArrowUpRight,
} from "lucide-react";
import { Category } from "@/lib/types";

interface CategoryGridProps {
  categories: Category[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase,
  Cpu,
  Brain,
  GraduationCap,
  Palette,
  Compass,
  Plane,
  TrendingUp,
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-kernel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-kernel-gold block mb-2">
            The Eight Domains
          </span>
          <h2 className="heading-section">
            Explore your curiosity
          </h2>
          <p className="mt-3 text-sm sm:text-base text-kernel-muted leading-relaxed">
            Topics blend, intersect, and evolve. Choose a territory to start examining the systems beneath.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = (cat.icon && ICON_MAP[cat.icon]) || Folder;
            return (
              <Link
                key={cat.id}
                href={`/explore?category=${cat.slug}`}
                className="group p-6 rounded-xl border border-kernel-border bg-white hover:bg-kernel-ivory/40 hover:border-kernel-gold/60 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-kernel-ivory flex items-center justify-center border border-kernel-border/60 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-kernel-gold" />
                  </div>
                  <h3 className="text-base font-bold text-kernel-charcoal group-hover:text-kernel-gold transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-kernel-gold" />
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-kernel-muted leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-kernel-border/40 text-[11px] font-semibold text-kernel-gold uppercase tracking-wider">
                  Browse category →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
