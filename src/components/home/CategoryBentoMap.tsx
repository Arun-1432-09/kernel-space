"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Compass } from "lucide-react";
import { Category } from "@/lib/types";
import { motion } from "framer-motion";

interface CategoryBentoMapProps {
  categories: (Category & { count?: number })[];
}

// Category image map with editorial imagery
const CATEGORY_IMAGES: Record<string, string> = {
  "business-and-startups": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  "technology-and-ai": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "psychology-and-mental-health": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  "student-life-and-gen-z-culture": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  "design-and-creativity": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
  "travel-and-experiences": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
  "aviation-and-automotive": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  "finance-and-economics": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
};

export function CategoryBentoMap({ categories }: CategoryBentoMapProps) {
  return (
    <section className="py-20 sm:py-28 bg-kernel-ivory/60 relative overflow-hidden border-b border-kernel-border/70">
      {/* Ambient glass light refraction */}
      <div className="glass-ambient-gold w-[400px] h-[400px] top-10 -right-20 opacity-35" aria-hidden="true" />
      <div className="glass-ambient-ivory w-[450px] h-[450px] -bottom-10 -left-20 opacity-60" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[10px] font-bold uppercase tracking-widest text-gold-accent">
              <Compass className="w-3.5 h-3.5 text-kernel-gold" />
              <span>Disciplines Directory</span>
            </div>
            <h2 className="heading-section">
              Explore our universe.
            </h2>
            <p className="subheading-editorial text-sm sm:text-base">
              Categories are doors, not walls. Topics intersect, blend, and illuminate each other.
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-semibold text-gold-accent hover:text-kernel-gold-deep transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all content library</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid: 2 Large featured tiles + 6 standard tiles with staggered entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat, idx) => {
            const isLarge = idx === 0 || idx === 1;
            const img = CATEGORY_IMAGES[cat.slug] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
            const num = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
                  },
                }}
                className={isLarge ? "sm:col-span-2" : ""}
              >
                <Link
                  href={`/explore?category=${cat.slug}`}
                  className="group glass-card h-full overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 hover:border-kernel-gold hover:shadow-floating block"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-2xl font-bold text-kernel-gold group-hover:text-kernel-gold-deep transition-colors">
                        {num}
                      </span>
                      <span className="text-[11px] font-semibold text-kernel-grey px-2.5 py-0.5 rounded-full glass-pill">
                        {cat.count && cat.count > 0 ? `${cat.count} published` : "Exploring soon"}
                      </span>
                    </div>

                    {isLarge && (
                      <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-5 bg-kernel-ivory">
                        <Image
                          src={img}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    )}

                    <h3 className="font-serif text-xl font-bold text-kernel-charcoal group-hover:text-kernel-gold-deep transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-kernel-grey group-hover:text-kernel-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>

                    <p className="mt-2 text-xs text-kernel-grey leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-kernel-border/60 flex items-center justify-between text-[11px] font-semibold text-gold-accent">
                    <span>Enter discipline</span>
                    <span>0{idx + 1}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
