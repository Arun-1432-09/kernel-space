import React from "react";
import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";

export function PitchTopicCTA() {
  return (
    <section className="py-16 sm:py-20 bg-kernel-ivory border-b border-kernel-border/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-white border border-kernel-border flex items-center justify-center mx-auto text-kernel-gold shadow-subtle">
          <Lightbulb className="w-5 h-5" />
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="heading-section text-2xl sm:text-3xl font-normal">
            Got a question we should chase?
          </h2>
          <p className="subheading-editorial text-sm sm:text-base">
            Good ideas matter more than titles. Pitch a topic, tell us the core question behind it, and we'll explore it together.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/get-involved"
            className="btn-gold text-xs px-7 py-3.5 inline-flex items-center gap-2"
          >
            <span>Pitch a Topic to the Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
