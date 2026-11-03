import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTeamMembers, getSiteSettings } from "@/lib/data/queries";
import { Compass, Sparkles, MessageSquareHeart, ShieldCheck, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Philosophy",
  description:
    "Why Kernel Space exists: curiosity before expertise, raw conversations, and visual breakdowns exploring the world beneath the surface.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [teamMembers, settings] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
  ]);

  return (
    <div className="py-12 sm:py-20 space-y-20 sm:space-y-28">
      {/* 1. Header & Origin Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-kernel-gold">
            <Compass className="w-3.5 h-3.5 text-kernel-gold" />
            <span>Our Origin & Purpose</span>
          </div>
          <h1 className="heading-hero">
            A space for minds that refuse to stay on the surface.
          </h1>
          <p className="subheading-editorial text-lg sm:text-xl pt-2">
            This isn't another generic content network. Kernel Space was founded on a simple conviction: learning should be as captivating as it is rigorous, and the most transformative ideas live at the intersections between disciplines.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-base text-kernel-charcoal leading-relaxed font-normal">
            <p>
              We live in an era overwhelmed by high-velocity hot takes and algorithmic rage-bait. Complex geopolitical, economic, and technological transformations are frequently compressed into thirty-second clips designed for dopamine spikes rather than comprehension.
            </p>
            <p>
              Kernel Space exists as an intentional counterweight. We build multi-format content—whether through free-flowing podcast dialogues, cinematic animated explainers, or visual deep-dives—that lives where <strong>genuine curiosity meets rigorous preparation</strong>.
            </p>
            <p className="text-kernel-muted border-l-2 border-kernel-gold pl-4 italic">
              "We're not experts pretending to have all the answers. We are curious generalists and learners who happen to have microphones, cameras, and code, figuring things out alongside our audience."
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card border border-kernel-border bg-kernel-ivory">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Collaborative thoughtful discussion"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-kernel-gold block">
                  Studio Philosophy
                </span>
                <span className="text-xs font-serif italic text-zinc-200">
                  Collaborative inquiry over rigid institutional authority.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Pillars of Philosophy */}
      <section className="bg-kernel-ivory/60 py-20 border-y border-kernel-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-kernel-gold">
              Guiding Principles
            </span>
            <h2 className="heading-section">
              The Kernel Space Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-kernel-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-kernel-ivory flex items-center justify-center border border-kernel-border/80">
                <Sparkles className="w-6 h-6 text-kernel-gold" />
              </div>
              <h3 className="text-xl font-bold text-kernel-charcoal">
                1. Curiosity First
              </h3>
              <p className="text-sm text-kernel-muted leading-relaxed">
                Everything begins with honest, open questions: <em>"How does this actually function?"</em> or <em>"Why is this occurring?"</em> We never fake expertise or posture for views. We do the primary research, interrogate our assumptions, and learn in public.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-kernel-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-kernel-ivory flex items-center justify-center border border-kernel-border/80">
                <MessageSquareHeart className="w-6 h-6 text-kernel-gold" />
              </div>
              <h3 className="text-xl font-bold text-kernel-charcoal">
                2. Conversations, Not Interviews
              </h3>
              <p className="text-sm text-kernel-muted leading-relaxed">
                We reject transactional interrogation. When someone joins us on audio or video, they are fellow investigators exploring a subject they care about deeply. Think of it like overhearing an electric conversation at a quiet coffee table.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-kernel-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-kernel-ivory flex items-center justify-center border border-kernel-border/80">
                <ShieldCheck className="w-6 h-6 text-kernel-gold" />
              </div>
              <h3 className="text-xl font-bold text-kernel-charcoal">
                3. Raw & Real
              </h3>
              <p className="text-sm text-kernel-muted leading-relaxed">
                We celebrate the organic messiness of human thought. The thoughtful pauses while searching for precision. The honest admission of <em>"I don't know yet."</em> True intellectual exploration requires vulnerability, not performative polish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Future Vision & Cadence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-kernel-gold">
              Production Ethos
            </span>
            <h2 className="heading-section">
              Quality over quantity. Always.
            </h2>
            <p className="text-base text-kernel-muted leading-relaxed">
              We operate on a deliberate production cadence of 1–2 pieces of deeply researched content per month. One incredible 45-minute conversation or visual explainer provides more enduring insight than fifty superficial summaries.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-kernel-border bg-kernel-ivory/30">
                <h4 className="text-sm font-bold text-kernel-charcoal">Business Case Studies Channel</h4>
                <p className="text-xs text-kernel-muted mt-1">Deep architectural post-mortems of startups and economic systems.</p>
              </div>
              <div className="p-4 rounded-xl border border-kernel-border bg-kernel-ivory/30">
                <h4 className="text-sm font-bold text-kernel-charcoal">Tech & Building Channel</h4>
                <p className="text-xs text-kernel-muted mt-1">AI mechanics, automation tools, and making computation transparent.</p>
              </div>
              <div className="p-4 rounded-xl border border-kernel-border bg-kernel-ivory/30">
                <h4 className="text-sm font-bold text-kernel-charcoal">Psychology & Mental Health Channel</h4>
                <p className="text-xs text-kernel-muted mt-1">Cognitive heuristics, behavioral science, and self-navigation.</p>
              </div>
            </div>
          </div>

          <div className="bg-kernel-charcoal text-white p-8 sm:p-12 rounded-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-kernel-gold">
              Audience & Invitation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Built for people who ask "why" and "how".
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Whether you are a university student finding your footing, a builder assembling your first product, or an engineer curious about cognitive psychology—you belong here.
            </p>
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <Link href="/explore" className="btn-gold text-xs font-semibold py-3 px-5 text-center">
                Explore Content
              </Link>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="btn-gold-outline text-white border-white/30 hover:bg-white/10 text-xs font-semibold py-3 px-5 text-center"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Section (Editable, empty by default per Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-kernel-border pt-16">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-kernel-gold">
            Contributors
          </span>
          <h2 className="heading-section mt-1">
            The Team & Collaborators
          </h2>
          <p className="text-sm text-kernel-muted mt-2">
            A distributed network of learners, researchers, and creators.
          </p>
        </div>

        {teamMembers && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="editorial-card p-6 text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full mx-auto overflow-hidden bg-kernel-ivory border-2 border-kernel-gold">
                  {member.image_url ? (
                    <Image
                      src={member.image_url}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-kernel-gold font-bold text-2xl">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-kernel-charcoal">{member.name}</h3>
                  <p className="text-xs text-kernel-gold font-medium mt-0.5">{member.role}</p>
                </div>
                {member.biography && (
                  <p className="text-xs text-kernel-muted line-clamp-3 leading-relaxed">
                    {member.biography}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty by default state with tasteful invitation */
          <div className="bg-kernel-ivory/50 rounded-2xl p-8 sm:p-12 border border-kernel-border text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-white border border-kernel-border flex items-center justify-center mx-auto text-kernel-gold">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-kernel-charcoal">
              Our Contributor Circle is Expanding
            </h3>
            <p className="text-sm text-kernel-muted leading-relaxed">
              We collaborate with researchers, students, and practitioners across all eight disciplines. Team members can be managed and spotlighted through the admin CMS.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${settings.contactEmail}?subject=Collaboration%20Inquiry`}
                className="btn-gold-outline text-xs px-4 py-2 inline-flex items-center gap-1.5"
              >
                <span>Pitch a topic or contribute</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
