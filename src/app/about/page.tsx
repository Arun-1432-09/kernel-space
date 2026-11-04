import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTeamMembers } from "@/lib/data/queries";
import { Compass, Sparkles, MessageSquare, ShieldCheck, ArrowRight, Lightbulb, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Kernel Space — Our Story, Philosophy & Method",
  description:
    "Why Kernel Space exists: curiosity before expertise, genuine conversations, and multidisciplinary exploration.",
};

export const revalidate = 60;

const FIVE_DIFFERENCES = [
  {
    num: "01",
    title: "Genuine Curiosity",
    description: "We want to understand these topics, not fake interest for views or algorithms.",
  },
  {
    num: "02",
    title: "Multi-Disciplinary Thinking",
    description: "Ideas connected across fields, not kept locked away in institutional silos.",
  },
  {
    num: "03",
    title: "Format Flexibility",
    description: "Conversations, visuals, deep essays or all three—whatever best serves the idea.",
  },
  {
    num: "04",
    title: "Raw Authenticity",
    description: "Conversations that feel real because they are real. Pauses, tangents, and admitting uncertainty.",
  },
  {
    num: "05",
    title: "A Gen-Z Perspective on Timeless Topics",
    description: "Young voices exploring questions that matter to every generation.",
  },
];

const FIVE_STEPS = [
  {
    step: "01",
    title: "Ideation",
    text: "Anyone can pitch topics. We discuss together: what is the core question behind this?",
  },
  {
    step: "02",
    title: "Research",
    text: "Dig deep for primary sources, interesting statistics, contrarian viewpoints, and real-world examples.",
  },
  {
    step: "03",
    title: "Format Decision",
    text: "Does this work better as a free-flowing dialogue or a visual breakdown? Sometimes both.",
  },
  {
    step: "04",
    title: "Production",
    text: "Record, edit, polish—but always preserve the humanity and authentic messiness of thought.",
  },
  {
    step: "05",
    title: "Distribution",
    text: "YouTube, Spotify, Apple Podcasts, Instagram, and LinkedIn—meeting curious minds where they are.",
  },
];

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="py-12 sm:py-20 space-y-20 sm:space-y-28">
      {/* 1. Header & Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-kernel-border text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
            <Compass className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Story & Philosophy</span>
          </div>
          <h1 className="heading-hero">
            We explore ideas, break down complex topics and have real conversations that matter.
          </h1>
          <p className="subheading-editorial text-lg sm:text-xl pt-2 font-sans">
            No scripts. No pretense. Just genuine curiosity meeting thorough preparation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-kernel-charcoal leading-relaxed">
            <p>
              Kernel Space is an independent media and knowledge platform built for people who ask "why" and "how". We live where curiosity meets depth—whether through free-flowing podcast conversations, animated breakdowns, or visual deep-dives into topics that genuinely fascinate us.
            </p>
            <p>
              Everything we create starts with a simple question: <em>"How does this work?"</em> or <em>"Why is this happening?"</em> We are not experts pretending to have all the answers. We are learners who happen to have microphones, cameras, and code, figuring things out alongside our audience.
            </p>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-t-[120px] rounded-b-2xl overflow-hidden shadow-card border border-kernel-border bg-white">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Collaborative thoughtful inquiry"
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 text-xs font-serif italic text-white text-center">
                Curiosity before expertise.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Truthful Founder Note (Section 1.8) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-editorial-lg p-8 sm:p-12 border border-kernel-border shadow-subtle space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent block">
            Who Is Behind This (The Truthful Version)
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-kernel-charcoal">
            A curious generalist, building in public.
          </h2>
          <p className="text-sm text-kernel-grey leading-relaxed">
            Kernel Space was initiated by someone with a background in business (BBA), currently building AI tools, and with sustained interests spanning design, technology, psychology, and aviation. The perspective is simple: connect dots across disciplines rather than staying inside silos.
          </p>
          <p className="text-sm text-kernel-grey leading-relaxed">
            This is not a one-person show. The team is collaborative—everyone brings their own curiosity and expertise. When someone on the team is passionate about sustainable systems, game theory, or neuroscience, that becomes content too. This is about collective exploration, not individual authority.
          </p>
        </div>
      </section>

      {/* 3. What Makes Us Different (5 Claims per Section 1.12) */}
      <section className="bg-kernel-ivory py-20 border-y border-kernel-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
              Our Commitments
            </span>
            <h2 className="heading-section">
              What makes us different.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {FIVE_DIFFERENCES.map((diff) => (
              <div
                key={diff.num}
                className="bg-white p-6 rounded-2xl border border-kernel-border shadow-subtle flex flex-col justify-between space-y-4"
              >
                <span className="font-serif text-2xl font-bold text-kernel-gold">
                  {diff.num}
                </span>
                <div className="space-y-1.5 flex-grow">
                  <h3 className="font-serif text-base font-bold text-kernel-charcoal">
                    {diff.title}
                  </h3>
                  <p className="text-xs text-kernel-grey leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How We Create (5 Steps per Section 4.9 & 5) */}
      <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
            Methodology
          </span>
          <h2 className="heading-section">
            The Creative Process
          </h2>
          <p className="subheading-editorial text-sm sm:text-base">
            How an initial question transforms into a published piece of media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {FIVE_STEPS.map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-editorial bg-white border border-kernel-border space-y-3"
            >
              <span className="font-serif text-xl font-bold text-kernel-gold block">
                {s.step}
              </span>
              <h3 className="font-serif text-lg font-bold text-kernel-charcoal">
                {s.title}
              </h3>
              <p className="text-xs text-kernel-grey leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Where This Could Go (Future Channels per Section 1.11) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-editorial-lg bg-white border border-kernel-border shadow-subtle space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent block">
              Future Vision
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-kernel-charcoal">
              Where this could go.
            </h2>
            <p className="text-sm text-kernel-grey leading-relaxed">
              Right now, we are starting with one channel—building consistency and finding our voice. In the future, this could expand into focused editorial channels, each with its own identity but sharing the same DNA:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-kernel-ivory/60 border border-kernel-border/70 space-y-1">
              <strong className="text-kernel-charcoal block">Business Case Studies Channel</strong>
              <p className="text-kernel-grey">Deep architectural post-mortems of companies, strategy, and economics.</p>
            </div>
            <div className="p-4 rounded-xl bg-kernel-ivory/60 border border-kernel-border/70 space-y-1">
              <strong className="text-kernel-charcoal block">Psychology & Mental Health Channel</strong>
              <p className="text-kernel-grey">Understanding the mind, practical behavioral insights, and cognitive science.</p>
            </div>
            <div className="p-4 rounded-xl bg-kernel-ivory/60 border border-kernel-border/70 space-y-1">
              <strong className="text-kernel-charcoal block">Travel & Culture Channel</strong>
              <p className="text-kernel-grey">Not tourist guides, but how environments and geography shape human thinking.</p>
            </div>
            <div className="p-4 rounded-xl bg-kernel-ivory/60 border border-kernel-border/70 space-y-1">
              <strong className="text-kernel-charcoal block">Tech & Building Channel</strong>
              <p className="text-kernel-grey">AI, automation, systems programming, and making computational tools accessible.</p>
            </div>
          </div>
          <p className="text-[11px] text-kernel-grey italic">
            *These future channels are planned explorations; only the main Kernel Space channel is currently live.
          </p>
        </div>
      </section>

      {/* 6. The Team Section (Truthful, empty by default per Section 1.8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-kernel-border pt-16">
        <div className="max-w-2xl mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-accent">
            People
          </span>
          <h2 className="heading-section text-2xl sm:text-3xl font-normal mt-1">
            Hosts & Contributors
          </h2>
          <p className="text-xs sm:text-sm text-kernel-grey mt-1">
            We feature 1–2 consistent Hosts plus rotating participants in the conversation.
          </p>
        </div>

        {teamMembers && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="editorial-card p-6 text-center space-y-3">
                <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-kernel-ivory border-2 border-kernel-gold flex items-center justify-center font-bold text-kernel-gold text-xl">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-kernel-charcoal">{member.name}</h3>
                  <span className="text-xs text-gold-accent font-medium">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Truthful empty state per Section 1.8 */
          <div className="p-10 rounded-2xl bg-white border border-kernel-border text-center max-w-lg mx-auto space-y-3">
            <Users className="w-8 h-8 text-kernel-gold mx-auto" />
            <h3 className="font-serif text-lg font-bold text-kernel-charcoal">
              Meet the team: details coming soon.
            </h3>
            <p className="text-xs text-kernel-grey leading-relaxed">
              We are assembling a decentralized circle of learners, student researchers, and builders across all eight disciplines.
            </p>
            <div className="pt-2">
              <Link href="/get-involved" className="btn-gold text-xs px-5 py-2.5 inline-flex items-center gap-1.5">
                <span>Pitch a topic or collaborate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
