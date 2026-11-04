import { Category, ContentItem, SiteSettings, TeamMember, Channel, Pitch } from "../types";

export const SEED_CATEGORIES: Category[] = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    name: "Business & Startups",
    slug: "business-and-startups",
    description: "How companies operate, business models, startup stories, case studies, entrepreneurship, and why businesses succeed or fail.",
    icon: "Briefcase",
    icon_key: "01",
    sort_order: 1,
  },
  {
    id: "c1000000-0000-0000-0000-000000000002",
    name: "Technology & AI",
    slug: "technology-and-ai",
    description: "AI, emerging technologies, automation, AI tools, software, how technology works, and building useful digital products.",
    icon: "Cpu",
    icon_key: "02",
    sort_order: 2,
  },
  {
    id: "c1000000-0000-0000-0000-000000000003",
    name: "Psychology & Mental Health",
    slug: "psychology-and-mental-health",
    description: "Human behaviour, cognitive psychology, behavioural science, everyday psychological concepts, and navigating modern life.",
    icon: "Brain",
    icon_key: "03",
    sort_order: 3,
  },
  {
    id: "c1000000-0000-0000-0000-000000000004",
    name: "Student Life & Gen-Z Culture",
    slug: "student-life-and-gen-z-culture",
    description: "Student experiences, education, career decisions, youth culture, digital lifestyles, identity, and the realities of growing up.",
    icon: "GraduationCap",
    icon_key: "04",
    sort_order: 4,
  },
  {
    id: "c1000000-0000-0000-0000-000000000005",
    name: "Design & Creativity",
    slug: "design-and-creativity",
    description: "Visual communication, design thinking, creative processes, branding, UI/UX, and aesthetic decisions.",
    icon: "Palette",
    icon_key: "05",
    sort_order: 5,
  },
  {
    id: "c1000000-0000-0000-0000-000000000006",
    name: "Travel & Experiences",
    slug: "travel-and-experiences",
    description: "Cultural observations, the psychology of places, architecture and geography, and how environments shape people. Not a tourist guide.",
    icon: "Compass",
    icon_key: "06",
    sort_order: 6,
  },
  {
    id: "c1000000-0000-0000-0000-000000000007",
    name: "Aviation & Automotive",
    slug: "aviation-and-automotive",
    description: "How aircraft work, aviation history, automotive engineering, how cars evolved, and transportation technologies.",
    icon: "Plane",
    icon_key: "07",
    sort_order: 7,
  },
  {
    id: "c1000000-0000-0000-0000-000000000008",
    name: "Finance & Economics",
    slug: "finance-and-economics",
    description: "Money and banking, financial systems, economics, markets, inflation, and global economic developments.",
    icon: "TrendingUp",
    icon_key: "08",
    sort_order: 8,
  },
];

export const SEED_CONTENT: ContentItem[] = [
  // 01. Business & Startups - Article 1
  {
    id: "e2000000-0000-0000-0000-000000000001",
    title: "Why Some Startups Fail Even With Great Ideas",
    slug: "why-some-startups-fail-even-with-great-ideas",
    description: "A post-mortem exploring why brilliant concepts stall when mismatched against distribution velocity, unit economics, and premature scale.",
    body: `When examining business mortality, running out of money is almost always identified as the cause of death. Yet cash depletion is a symptom, rarely the underlying disease. Most ventures fail not because their central hypothesis lacked merit, but because the founders scaled infrastructure before validating retention.

Consider a startup with ₹20,00,000 in early seed capital. The team frequently directs early capital toward brand aesthetics, custom microservices, and hiring before proving that users will repeatedly return. In early-stage development, speed of feedback matters vastly more than perfection of execution.

A second critical vulnerability is distribution asymmetry. Building a superior product is useless if your customer acquisition cost outpaces the lifetime value of the customer. When founders fall in love with their solution rather than the recurring friction experienced by their users, blind spots multiply. The companies that endure are those that treat every launch as an experiment, listen to user churn with humility, and preserve capital runway until product-market resonance is undeniable.`,
    content_type: "article",
    thumbnail_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 480,
    reading_time_minutes: 5,
    publication_date: "2026-10-28",
    featured: true,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[0]],
  },

  // 02. Business & Startups - Explainer 2
  {
    id: "e2000000-0000-0000-0000-000000000002",
    title: "How Business Models Actually Work",
    slug: "how-business-models-actually-work",
    description: "Dissecting value creation, margin structures, and recurring cash flows behind modern platforms and traditional operations.",
    body: `A business model is not merely a pricing page; it is a dynamic loop describing how an organisation creates, delivers, and captures economic value. Whether assessing an enterprise software firm or a neighbourhood cafe, the mechanics boil down to three levers: customer acquisition efficiency, gross margin retention, and capital velocity.

Take a subscription software service charging ₹1,500 per month. If acquiring that subscriber costs ₹6,000, the company operates at a temporary deficit for four full months before earning its first rupee of gross profit. If annual churn exceeds fifteen percent, the flywheel begins to stutter.

Understanding these economic gears demystifies why certain loss-making companies command high valuations while seemingly profitable small businesses struggle with payroll. We examine multi-sided platforms, marketplace take-rates, and the fundamental difference between vanity revenue and cash conversion cycles.`,
    content_type: "explainer",
    thumbnail_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 720,
    reading_time_minutes: 6,
    publication_date: "2026-10-24",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[0], SEED_CATEGORIES[7]],
  },

  // 03. Technology & AI - Video 1 (Demo: No fake media URL)
  {
    id: "e2000000-0000-0000-0000-000000000003",
    title: "How AI Tools Are Changing the Way We Work",
    slug: "how-ai-tools-are-changing-the-way-we-work",
    description: "Examining cognitive amplification, workflow restructuring, and how generative models alter knowledge work without replacing critical judgment.",
    body: `Generative intelligence models are fundamentally reshaping knowledge workflows from administrative drafting to software development. Rather than replacing human agency, these systems act as cognitive levers—compressing hours of exploratory synthesis into minutes. In this visual breakdown, we trace how engineering teams and editorial studios structure human-in-the-loop workflows.`,
    content_type: "video",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 1320,
    reading_time_minutes: 8,
    publication_date: "2026-10-20",
    featured: true,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[1]],
  },

  // 04. Technology & AI - Deep Dive 2
  {
    id: "e2000000-0000-0000-0000-000000000004",
    title: "Understanding the Systems Behind Modern AI",
    slug: "understanding-the-systems-behind-modern-ai",
    description: "An architectural exploration of neural weights, transformer attention mechanisms, and compute bottlenecks explaining how models reason.",
    body: `Behind the conversational fluidity of modern machine intelligence lies an architectural breakthrough: the self-attention mechanism. By allowing mathematical tokens to weigh their relationship against every other token in a sequence simultaneously, transformers solved the memory degradation that crippled older recurrent models.

When an AI system processes a query, it computes high-dimensional vector embeddings across billions of parameters. Each weight represents a tiny probability adjustment learned during pre-training on petabytes of text. There is no conscious spark; there is an astonishingly refined statistical map of human linguistic concepts.

Yet compute scaling laws face physical ceilings: electricity substation limits, cooling requirements, and data saturation. Understanding these physical constraints helps us separate durable architectural progress from speculative venture hype.`,
    content_type: "deep_dive",
    thumbnail_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 960,
    reading_time_minutes: 7,
    publication_date: "2026-10-16",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[1]],
  },

  // 05. Psychology & Mental Health - Podcast 1 (Demo: No fake media URL)
  {
    id: "e2000000-0000-0000-0000-000000000005",
    title: "Why Our Brains Love Patterns",
    slug: "why-our-brains-love-patterns",
    description: "How evolutionary pattern recognition protects us from danger while creating confirmation biases and optical illusions.",
    body: `Human consciousness is essentially a biological prediction engine. In this long-form conversation, we unpack how our ancestors survived by rapidly recognizing predator silhouettes, and why that same mechanism leads modern thinkers to see deliberate meaning in random noise. We discuss apophenia, cognitive shortcuts, and mental resilience.`,
    content_type: "podcast",
    thumbnail_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 2460,
    reading_time_minutes: 12,
    publication_date: "2026-10-12",
    featured: true,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[2]],
  },

  // 06. Psychology & Mental Health - Article 2
  {
    id: "e2000000-0000-0000-0000-000000000006",
    title: "Understanding Habits and Human Behaviour",
    slug: "understanding-habits-and-human-behaviour",
    description: "The neurological loop of cue, craving, response, and reward that silently dictates more than forty percent of our daily actions.",
    body: `More than forty percent of our daily actions are not conscious choices; they are neurological automaticities encoded in the basal ganglia. When the brain encounters a recurring context, it collapses sequential decisions into a single behavioural routine to conserve biological glucose.

Every habit loop consists of three phases: a sensory trigger, the routine behaviour, and the neurochemical reward. When someone repeatedly checks their phone during uncomfortable pauses, the trigger is mild social anxiety, the routine is digital scrolling, and the reward is a transient dopamine deflection.

Attempting to eradicate a habit through brute willpower alone rarely succeeds. Behavioural scientists demonstrate that permanent change requires habit reversal: keeping the original cue and reward intact while deliberately replacing the intermediary routine.`,
    content_type: "article",
    thumbnail_url: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 540,
    reading_time_minutes: 5,
    publication_date: "2026-10-08",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[2]],
  },

  // 07. Student Life & Gen-Z Culture - Video 2
  {
    id: "e2000000-0000-0000-0000-000000000007",
    title: "The Changing Reality of Student Life",
    slug: "the-changing-reality-of-student-life",
    description: "Navigating university degrees, shifting employment credentials, digital social pressures, and the evolving identity of young people.",
    body: `The traditional college compact promised that four years of classroom compliance would guarantee professional stability. Today, students in urban centres balance high tuition fees with asynchronous portfolio projects, freelance consulting, and rapid technological shifts. In this breakdown, we examine the practical tradeoffs students make between institutional diplomas and self-directed cohort learning.`,
    content_type: "video",
    thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 1440,
    reading_time_minutes: 7,
    publication_date: "2026-10-04",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[3]],
  },

  // 08. Student Life & Gen-Z Culture - Podcast 2
  {
    id: "e2000000-0000-0000-0000-000000000008",
    title: "How Young People Navigate Career Choices",
    slug: "how-young-people-navigate-career-choices",
    description: "Moving past parental expectations and career paralysis: how early-career builders evaluate risk, runway, and personal mission.",
    body: `How do twenty-somethings decide between stable corporate hierarchies, speculative venture startups, and independent creative building? In this authentic conversation, our hosts and contributors share real perspectives on financial insecurity, portfolio careers, and learning to make big decisions under profound economic uncertainty.`,
    content_type: "podcast",
    thumbnail_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 2880,
    reading_time_minutes: 10,
    publication_date: "2026-09-30",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[3], SEED_CATEGORIES[0]],
  },

  // 09. Design & Creativity - Article 3
  {
    id: "e2000000-0000-0000-0000-000000000009",
    title: "Why Some Designs Feel Effortless",
    slug: "why-some-designs-feel-effortless",
    description: "The invisible discipline behind exceptional typography, spatial hierarchy, intuitive affordances, and cognitive ease.",
    body: `When an object or interface functions seamlessly, the design disappears. Users credit their own competence rather than the designer's restraint. This paradox—that great design erases evidence of its own effort—is what separates genuine craftsmanship from decorative excess.

Consider the layout of a classic Swiss editorial magazine. The harmony is not accidental; it relies on proportional grids, consistent leading ratios, and intentional white space that directs ocular saccades with effortless rhythm. The restraint to omit superfluous ornamentation requires far greater confidence than adding decorative clutter.

We examine the cognitive principles of visual affordances: why certain buttons beg to be pressed, how micro-interactions establish trust, and why elegance is invariably a byproduct of rigorous reduction.`,
    content_type: "article",
    thumbnail_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 600,
    reading_time_minutes: 5,
    publication_date: "2026-09-26",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[4]],
  },

  // 10. Design & Creativity - Explainer 3
  {
    id: "e2000000-0000-0000-0000-000000000010",
    title: "The Thinking Behind Great Visual Experiences",
    slug: "the-thinking-behind-great-visual-experiences",
    description: "How creative teams structure visual communication, design systems, and aesthetic narratives that resonate deeply.",
    body: `Design thinking is often reduced to post-it notes and performative workshops. But at its core, genuine design methodology is a rigorous epistemological tool: framing the right question before jumping to solutions, and testing hypotheses in real physical environments. We deconstruct how architectural scale, color science, and tactile feedback shape human perception.`,
    content_type: "explainer",
    thumbnail_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 840,
    reading_time_minutes: 6,
    publication_date: "2026-09-22",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[4]],
  },

  // 11. Travel & Experiences - Explainer 4
  {
    id: "e2000000-0000-0000-0000-000000000011",
    title: "How Places Influence the Way We Think",
    slug: "how-places-influence-the-way-we-think",
    description: "The environmental psychology of geography: how ceiling heights, urban density, and open horizons alter neural pathways.",
    body: `We rarely recognize the degree to which our cognition is scaffolded by physical geography. The cathedral effect demonstrates that high ceilings prime abstract thinking and creative leaps, while intimate, low-ceilinged rooms promote meticulous analytical focus. In this essay, we examine how stepping into unfamiliar landscapes forces the brain to abandon predictive assumptions.`,
    content_type: "explainer",
    thumbnail_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 780,
    reading_time_minutes: 5,
    publication_date: "2026-09-18",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[5], SEED_CATEGORIES[2]],
  },

  // 12. Travel & Experiences - Deep Dive 3
  {
    id: "e2000000-0000-0000-0000-000000000012",
    title: "Understanding Cities Beyond Tourism",
    slug: "understanding-cities-beyond-tourism",
    description: "An architectural and sociological look into informal markets, transit corridors, and the lived infrastructure of global metropolises.",
    body: `A city is not its postcard monuments; it is an organic metabolism of freight logistics, morning commuter pulses, and informal trade networks. From the high-density railway networks of Mumbai to the pedestrian alleys of Tokyo, cities solve the fundamental challenge of human coordination. We look beneath tourist surfaces to understand how cities actually breathe.`,
    content_type: "deep_dive",
    thumbnail_url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 900,
    reading_time_minutes: 6,
    publication_date: "2026-09-14",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[5]],
  },

  // 13. Aviation & Automotive - Video 3
  {
    id: "e2000000-0000-0000-0000-000000000013",
    title: "How Modern Aircraft Stay in the Air",
    slug: "how-modern-aircraft-stay-in-the-air",
    description: "Fluid dynamics, turbofan thrust, fly-by-wire avionics, and the industrial safety engineering behind commercial flight.",
    body: `A commercial airliner weighing three hundred tonnes operates in conditions hostile to intuitive human survival: sub-zero stratospheric air, thin atmospheric density, and near-transonic velocity. In this visual breakdown, we explore Bernoulli principles, circulation theory, and the triple-redundant flight control computers that make modern commercial aviation mathematically the safest form of mass transit.`,
    content_type: "video",
    thumbnail_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 1680,
    reading_time_minutes: 9,
    publication_date: "2026-09-10",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[6]],
  },

  // 14. Aviation & Automotive - Deep Dive 4
  {
    id: "e2000000-0000-0000-0000-000000000014",
    title: "The Engineering Behind Electric Vehicles",
    slug: "the-engineering-behind-electric-vehicles",
    description: "Battery pack chemistry, regenerative braking, inverter thermal management, and the architectural reimagining of the automobile.",
    body: `Transitioning from internal combustion engines to electric powertrains is not simply swapping gasoline for battery cells; it is a total reconfiguration of mechanical packaging and vehicle physics.

In an electric drivetrain, torque is instantaneous. A compact permanent magnet synchronous motor the size of a watermelon delivers higher power density than a bulky multi-cylinder combustion block. More importantly, the placement of the dense battery pack along the floor pan drastically lowers the center of gravity, revolutionizing handling stability.

However, thermal management presents fierce engineering hurdles. Lithium-ion cells degrade rapidly when operated outside narrow temperature windows. We examine how liquid cooling loops, solid-state battery electrolytes, and high-voltage DC fast-charging networks solve the range and longevity equations.`,
    content_type: "deep_dive",
    thumbnail_url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 1020,
    reading_time_minutes: 7,
    publication_date: "2026-09-06",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[6], SEED_CATEGORIES[1]],
  },

  // 15. Finance & Economics - Article 4
  {
    id: "e2000000-0000-0000-0000-000000000015",
    title: "How Money Moves Through an Economy",
    slug: "how-money-moves-through-an-economy",
    description: "Fractional reserve banking, central bank liquidity operations, credit cycles, and the monetary transmission mechanism.",
    body: `Most people imagine money as physical currency printed by governments and locked in secure vaults. In truth, over ninety percent of broad money supply is created by commercial banks through the act of lending.

When a borrower takes out a loan of ₹50,00,000 to construct a workspace, the bank does not transfer funds out of another customer's savings deposit. Instead, it enters a double-entry ledger credit: an asset (the loan obligation) balanced against a new deposit liability. Money enters circulation through credit creation.

Understanding money velocity—how rapidly a single rupee circulates through hands from baker to builder to software engineer—explains why liquidity shocks stall real economic output. We trace how interest rate adjustments by central banks influence capital allocation across the real economy.`,
    content_type: "article",
    thumbnail_url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 660,
    reading_time_minutes: 5,
    publication_date: "2026-09-02",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[7]],
  },

  // 16. Finance & Economics - Explainer 5
  {
    id: "e2000000-0000-0000-0000-000000000016",
    title: "Why Inflation Changes Everyday Life",
    slug: "why-inflation-changes-everyday-life",
    description: "Purchasing power erosion, supply chain friction, wage-price dynamics, and why inflation acts as an invisible tax on cash savings.",
    body: `Inflation is rarely an equal across-the-board increase in prices. It acts as an uneven redistributive engine that penalizes cash savers while rewarding leveraged asset owners. In this explainer, we walk through demand-pull versus cost-push inflation, examine how household grocery baskets reflect real inflation far faster than government headline metrics, and discuss long-term capital preservation strategies.`,
    content_type: "explainer",
    thumbnail_url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: 780,
    reading_time_minutes: 6,
    publication_date: "2026-08-28",
    featured: false,
    status: "published",
    is_demo: true,
    categories: [SEED_CATEGORIES[7]],
  },

  // Coming Soon Item 1 (Proves coming_soon state per Section 10)
  {
    id: "e2000000-0000-0000-0000-000000000017",
    title: "The Architecture of Clean Energy Grids",
    slug: "the-architecture-of-clean-energy-grids",
    description: "Investigating base-load power, grid-scale battery storage, and transmission line physics.",
    body: null,
    content_type: "explainer",
    thumbnail_url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: null,
    publication_date: "2026-11-20",
    featured: false,
    status: "coming_soon",
    is_demo: true,
    categories: [SEED_CATEGORIES[1], SEED_CATEGORIES[6]],
  },

  // Coming Soon Item 2 (Proves coming_soon state per Section 10)
  {
    id: "e2000000-0000-0000-0000-000000000018",
    title: "The Cognitive Science of Attention Spans",
    slug: "the-cognitive-science-of-attention-spans",
    description: "Are algorithmic short-form feeds permanently rewiring human patience and deep work rituals?",
    body: null,
    content_type: "podcast",
    thumbnail_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    media_url: null,
    duration_seconds: null,
    publication_date: "2026-11-28",
    featured: false,
    status: "coming_soon",
    is_demo: true,
    categories: [SEED_CATEGORIES[2], SEED_CATEGORIES[3]],
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  title: "Kernel Space",
  tagline: "Think Deeper. Explore Further.",
  heroLabel: "Independent Media • Curious Minds",
  heroHeadline: "The world is full of questions. Let's explore them.",
  heroSupportText: "From technology and business to psychology, culture and everything in between — we explore ideas, break down complex topics and have conversations worth thinking about.",
  contactEmail: "hello@kernelspace.media",
  founder_note: "Initiated by a curious generalist with a background in business (BBA), currently building AI tools, with sustained interests spanning design, technology, psychology, aviation and more. Collaborative exploration, not individual authority.",
  start_here: [
    "e2000000-0000-0000-0000-000000000001",
    "e2000000-0000-0000-0000-000000000002",
    "e2000000-0000-0000-0000-000000000006",
  ],
  socialLinks: {
    youtube: "https://youtube.com/@kernelspace",
    spotify: "https://open.spotify.com/show/kernelspace",
    instagram: "https://instagram.com/kernelspace",
    twitter: "https://x.com/kernelspace",
    linkedin: "https://linkedin.com/company/kernelspace",
  },
};

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [];

// Seed Channels per Section 1.11 & 7
export const SEED_CHANNELS: Channel[] = [
  {
    id: "ch-1",
    name: "Kernel Space Main Channel",
    slug: "main",
    description: "The central multi-format broadcast of genuine conversations, visual explainers, and systems breakdowns.",
    is_active: true,
    display_order: 1,
  },
  {
    id: "ch-2",
    name: "Business Case Studies Channel",
    slug: "business-case-studies",
    description: "Deep post-mortems of startups, business models, and economic systems.",
    is_active: false,
    display_order: 2,
  },
  {
    id: "ch-3",
    name: "Psychology & Mental Health Channel",
    slug: "psychology-and-mental-health",
    description: "Practical behavioral insights, cognitive heuristics, and self-navigation.",
    is_active: false,
    display_order: 3,
  },
  {
    id: "ch-4",
    name: "Travel & Culture Channel",
    slug: "travel-and-culture",
    description: "How environments, geography, and urban architecture shape human culture.",
    is_active: false,
    display_order: 4,
  },
  {
    id: "ch-5",
    name: "Tech & Building Channel",
    slug: "tech-and-building",
    description: "AI, computational systems, automation tools, and making software accessible.",
    is_active: false,
    display_order: 5,
  },
];

export const SEED_PITCHES: Pitch[] = [
  {
    id: "p1000000-0000-0000-0000-000000000001",
    name: "Arjun Verma",
    email: "arjun.verma@example.com",
    topic: "The Thermodynamics of Data Centers in Tropical Climates",
    core_question: "Why does running AI inference clusters in South Asia require fundamentally different cooling architectures than North America?",
    why_it_matters: "Everyone discusses compute chip bottlenecks, but the real ceiling in expanding markets is electrical substation capacity and ambient wet-bulb temperatures.",
    links: "https://ieee.org/papers/cooling-efficiency-tropics",
    status: "new",
    consent_confirmed: true,
    created_at: "2026-11-02T10:15:00Z",
  },
  {
    id: "p1000000-0000-0000-0000-000000000002",
    name: "Meera Nair",
    email: "meera.n@example.com",
    topic: "Why Do People Keep Buying Physical Vinyl Records in 2026?",
    core_question: "What psychological need does physical friction fulfill in an era of zero-cost infinite streaming?",
    why_it_matters: "Streaming solved access but eliminated ownership and tactile rituals. Vinyl sales continue to grow among 18-24 year olds.",
    links: null,
    status: "reviewing",
    consent_confirmed: true,
    created_at: "2026-10-29T14:40:00Z",
  },
];

