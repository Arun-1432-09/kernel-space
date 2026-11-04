-- ============================================================================
-- KERNEL SPACE COMPREHENSIVE SEED SCRIPT (MASTER FINAL SPECIFICATION)
-- 8 Categories (01-08), Channels, 16 Demo Content Items + 2 Coming Soon Items,
-- Site Settings, and Join Relationships.
-- ============================================================================

-- 1. Insert Categories (01-08)
INSERT INTO categories (id, name, slug, description, icon, icon_key, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'Business & Startups', 'business-and-startups', 'How companies operate, business models, startup stories, case studies, entrepreneurship, and why businesses succeed or fail.', 'Briefcase', '01', 1),
('c1000000-0000-0000-0000-000000000002', 'Technology & AI', 'technology-and-ai', 'AI, emerging technologies, automation, AI tools, software, how technology works, and building useful digital products.', 'Cpu', '02', 2),
('c1000000-0000-0000-0000-000000000003', 'Psychology & Mental Health', 'psychology-and-mental-health', 'Human behaviour, cognitive psychology, behavioural science, everyday psychological concepts, and navigating modern life.', 'Brain', '03', 3),
('c1000000-0000-0000-0000-000000000004', 'Student Life & Gen-Z Culture', 'student-life-and-gen-z-culture', 'Student experiences, education, career decisions, youth culture, digital lifestyles, identity, and the realities of growing up.', 'GraduationCap', '04', 4),
('c1000000-0000-0000-0000-000000000005', 'Design & Creativity', 'design-and-creativity', 'Visual communication, design thinking, creative processes, branding, UI/UX, and aesthetic decisions.', 'Palette', '05', 5),
('c1000000-0000-0000-0000-000000000006', 'Travel & Experiences', 'travel-and-experiences', 'Cultural observations, the psychology of places, architecture and geography, and how environments shape people. Not a tourist guide.', 'Compass', '06', 6),
('c1000000-0000-0000-0000-000000000007', 'Aviation & Automotive', 'aviation-and-automotive', 'How aircraft work, aviation history, automotive engineering, how cars evolved, and transportation technologies.', 'Plane', '07', 7),
('c1000000-0000-0000-0000-000000000008', 'Finance & Economics', 'finance-and-economics', 'Money and banking, financial systems, economics, markets, inflation, and global economic developments.', 'TrendingUp', '08', 8)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  icon_key = EXCLUDED.icon_key,
  sort_order = EXCLUDED.sort_order;

-- 2. Insert Channels
INSERT INTO channels (id, name, slug, description, is_active, display_order) VALUES
('b1000000-0000-0000-0000-000000000001', 'Kernel Space Main', 'main', 'The flagship multi-format discovery channel featuring comprehensive breakdowns across all eight disciplines.', TRUE, 1),
('b1000000-0000-0000-0000-000000000002', 'Business Case Studies', 'business-case-studies', 'In-depth unit economics and operational deep dives into corporate mechanics.', FALSE, 2),
('b1000000-0000-0000-0000-000000000003', 'Psychology & Behaviour', 'psychology-behaviour', 'Exploring the architectural underpinnings of human decision making.', FALSE, 3),
('b1000000-0000-0000-0000-000000000004', 'Travel & Culture', 'travel-culture', 'Field notes on spatial psychology and human geographic communities.', FALSE, 4),
('b1000000-0000-0000-0000-000000000005', 'Technology Explored', 'technology-explored', 'Engineering schematics and computational systems simplified without distortion.', FALSE, 5)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order;

-- 3. Insert 16 Demo Content Records + 2 Coming Soon Records
INSERT INTO content (
  id, title, slug, subtitle, description, body, content_type, thumbnail_url, thumbnail_alt, image_credit, media_url, duration_seconds, reading_time_minutes, publication_date, featured, status, is_demo, open_questions, sources
) VALUES
(
  'e2000000-0000-0000-0000-000000000001',
  'Why Some Startups Fail Even With Great Ideas',
  'why-some-startups-fail-even-with-great-ideas',
  'An economic post-mortem into premature scaling and unit economics',
  'A post-mortem exploring why brilliant concepts stall when mismatched against distribution velocity, unit economics, and premature scale.',
  'When examining business mortality, running out of money is almost always identified as the cause of death. Yet cash depletion is a symptom, rarely the underlying disease. Most ventures fail not because their central hypothesis lacked merit, but because the founders scaled infrastructure before validating retention.

Consider a startup with ₹20,00,000 in early seed capital. The team frequently directs early capital toward brand aesthetics, custom microservices, and hiring before proving that users will repeatedly return. In early-stage development, speed of feedback matters vastly more than perfection of execution.

A second critical vulnerability is distribution asymmetry. Building a superior product is useless if your customer acquisition cost outpaces the lifetime value of the customer. When founders fall in love with their solution rather than the recurring friction experienced by their users, blind spots multiply. The companies that endure are those that treat every launch as an experiment, listen to user churn with humility, and preserve capital runway until product-market resonance is undeniable.',
  'article',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'Team analyzing post-mortem charts on a clean wooden table',
  'Unsplash / Startup Archive',
  NULL,
  480,
  5,
  '2026-10-28',
  TRUE,
  'published',
  TRUE,
  'At what exact capital multiple does premature hiring become irreversible across enterprise vs consumer software models?',
  '[{"label": "CB Insights Startup Failure Post-Mortem Database (2024)"}, {"label": "Kauffman Foundation Longitudinal Entrepreneurship Study"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000002',
  'How Business Models Actually Work',
  'how-business-models-actually-work',
  'Dissecting gross margins, customer acquisition cycles, and capital velocity',
  'Dissecting value creation, margin structures, and recurring cash flows behind modern platforms and traditional operations.',
  'A business model is not merely a pricing page; it is a dynamic loop describing how an organisation creates, delivers, and captures economic value. Whether assessing an enterprise software firm or a neighbourhood cafe, the mechanics boil down to three levers: customer acquisition efficiency, gross margin retention, and capital velocity.

Take a subscription software service charging ₹1,500 per month. If acquiring that subscriber costs ₹6,000, the company operates at a temporary deficit for four full months before earning its first rupee of gross profit. If annual churn exceeds fifteen percent, the flywheel begins to stutter.

Understanding these economic gears demystifies why certain loss-making companies command high valuations while seemingly profitable small businesses struggle with payroll. We examine multi-sided platforms, marketplace take-rates, and the fundamental difference between vanity revenue and cash conversion cycles.',
  'explainer',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'Notebook with handwritten unit economics and flywheel diagrams',
  'Unsplash / Business Analytics',
  NULL,
  720,
  6,
  '2026-10-24',
  FALSE,
  'published',
  TRUE,
  'Will AI agents reduce SaaS customer acquisition costs or accelerate commoditization to zero marginal profits?',
  '[{"label": "Harvard Business Review: What Is a Business Model? (Magretta, 2002)"}, {"label": "Damodaran Online Corporate Valuation Metrics (NYU Stern)"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000003',
  'How AI Tools Are Changing the Way We Work',
  'how-ai-tools-are-changing-the-way-we-work',
  'Human-in-the-loop synthesis and cognitive leverage across creative sectors',
  'Examining cognitive amplification, workflow restructuring, and how generative models alter knowledge work without replacing critical judgment.',
  'Generative intelligence models are fundamentally reshaping knowledge workflows from administrative drafting to software development. Rather than replacing human agency, these systems act as cognitive levers—compressing hours of exploratory synthesis into minutes. In this visual breakdown, we trace how engineering teams and editorial studios structure human-in-the-loop workflows.',
  'video',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'Abstract neural network representation rendered in geometric monochrome with gold light accents',
  'Unsplash / Deep Learning Studio',
  NULL,
  1320,
  8,
  '2026-10-20',
  TRUE,
  'published',
  TRUE,
  'How do junior practitioners develop foundational tacit taste when early synthesis is entirely automated?',
  '[{"label": "Stanford Human-Centered AI Institute Annual Index 2024"}, {"label": "MIT Sloan Empirical Labor Productivity Study on LLMs"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000004',
  'Understanding the Systems Behind Modern AI',
  'understanding-the-systems-behind-modern-ai',
  'Transformers, self-attention, and computational bottlenecks',
  'An architectural exploration of neural weights, transformer attention mechanisms, and compute bottlenecks explaining how models reason.',
  'Behind the conversational fluidity of modern machine intelligence lies an architectural breakthrough: the self-attention mechanism. By allowing mathematical tokens to weigh their relationship against every other token in a sequence simultaneously, transformers solved the memory degradation that crippled older recurrent models.

When an AI system processes a query, it computes high-dimensional vector embeddings across billions of parameters. Each weight represents a tiny probability adjustment learned during pre-training on petabytes of text. There is no conscious spark; there is an astonishingly refined statistical map of human linguistic concepts.

Yet compute scaling laws face physical ceilings: electricity substation limits, cooling requirements, and data saturation. Understanding these physical constraints helps us separate durable architectural progress from speculative venture hype.',
  'deep_dive',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'Macro photograph of silicon microchips and optical trace buses',
  'Unsplash / Hardware Labs',
  NULL,
  960,
  7,
  '2026-10-16',
  FALSE,
  'published',
  TRUE,
  'Can test-time compute scaling bypass pre-training data exhaustion permanently?',
  '[{"label": "Vaswani et al., Attention Is All You Need (2017)"}, {"label": "Epoch AI Data Saturation Forecasts (2024)"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000005',
  'Why Our Brains Crave Distraction',
  'why-our-brains-crave-distraction',
  'Evolutionary foraging loops in an algorithmic attention economy',
  'An exploration into evolutionary dopamine pathways, uncertainty rewards, and why quiet focus feels biologically unnatural.',
  'If you find it difficult to sit in an empty room without reaching for a handheld screen, your brain is functioning exactly as millions of years of natural selection intended. Evolutionary anthropologists observe that dopamine is not the molecule of satisfaction; it is the neurotransmitter of anticipation.

In hunter-gatherer environments, our ancestors survived by continuously scanning horizons for novel caloric or predator signals. A variable reward schedule—the uncertainty of whether looking beneath the next stone would reveal food—conditioned primate neural circuits to prioritize novel stimuli above stable tranquility.

Modern digital interfaces simply exploit this primitive foraging loop with infinite scroll feeds and push notifications. When we recognize that distraction is an ancient survival adaptation misfiring in an era of information abundance, the shame dissolves. We can then architect environments with structural friction rather than relying on brittle willpower.',
  'podcast',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  'Monochrome silhouette of a thinker gazing out an expansive arched window',
  'Unsplash / Cognitive Archive',
  NULL,
  2400,
  12,
  '2026-10-12',
  TRUE,
  'published',
  TRUE,
  'Can intentional digital boredom reliably re-sensitize dopamine baseline receptors within 14 days?',
  '[{"label": "Sapolsy, Robert: Behave - The Biology of Humans at Our Best and Worst"}, {"label": "Kahneman, Daniel: Thinking, Fast and Slow"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000006',
  'The Psychology of Everyday Decisions',
  'the-psychology-of-everyday-decisions',
  'Heuristics, loss aversion, and choice fatigue in daily routines',
  'Unpacking heuristics, cognitive energy conservation, and subconscious status signaling that dictate routine human choices.',
  'The average adult makes an estimated 35,000 decisions every day, from what shirt to pull from the wardrobe to whether to respond to an urgent email. If your conscious prefrontal cortex weighed the Bayesian probability of every single outcome, metabolic exhaustion would set in before lunch.

To protect glucose reserves, the brain delegates 95% of choices to automatic mental heuristics. One of the most powerful is the default effect: humans overwhelmingly choose whichever path requires zero physical friction.

Another dominant force is status signaling. We often purchase items not for their utilitarian utility, but to broadcast membership in a cultural cohort. By learning to identify when our fast heuristic brain is substituting an easy question for a complex reality, we reclaim deliberate control over our life trajectory.',
  'article',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
  'Minimalist interior with calm morning sunlight illuminating an organized desk',
  'Unsplash / Architecture Space',
  NULL,
  450,
  4,
  '2026-10-08',
  FALSE,
  'published',
  TRUE,
  'How do micro-environments systematically tilt heuristic choices without conscious awareness?',
  '[{"label": "Thaler & Sunstein: Nudge - Improving Decisions About Health, Wealth, and Happiness"}, {"label": "Gigerenzer, Gerd: Gut Feelings - The Intelligence of the Unconscious"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000007',
  'The Honest Realities of Student Life Today',
  'the-honest-realities-of-student-life-today',
  'Credential inflation, financial anxiety, and personal identity',
  'An unflinching look at credentialism, debt pressures, and navigating early adulthood amid rapid macroeconomic shifts.',
  'For generations, the societal contract presented to young people was linear: study diligently, graduate from an accredited university, and step into a stable career path with predictable upward mobility. In 2026, that traditional conveyor belt is visibly fraying under credential inflation and automated entry-level hiring filters.

Students currently navigate unprecedented cognitive dissonance. They are encouraged to take on significant financial obligations while observing industry entry requirements shift quarterly.

Yet amid these anxieties emerges a profound resilience. Students are establishing independent media channels, cultivating niche technical competencies, and redefining success beyond institutional stamps of approval. In this piece, we break down how to build an asymmetric portfolio of skills that remains durable regardless of shifting corporate paradigms.',
  'article',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'University students discussing notes around an outdoor table on campus',
  'Unsplash / Education Collective',
  NULL,
  540,
  5,
  '2026-10-04',
  FALSE,
  'published',
  TRUE,
  'How will university accreditations adapt when proof-of-work repositories eclipse traditional GPA metrics?',
  '[{"label": "OECD Education at a Glance Report 2024"}, {"label": "Pew Research Center: Young Adults in an Unequal Economy"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000008',
  'How Culture Travels Across the Internet',
  'how-culture-travels-across-the-internet',
  'Memetics, algorithmic curation, and decentralized subcultures',
  'Tracking meme velocity, vernacular evolution, and how digital subcultures establish global aesthetic norms overnight.',
  'In the pre-digital era, cultural ideas diffused through geography: from metropolitan creative capitals to regional hubs over months or years. Today, internet culture propagates like a fluid shockwave across decentralized networks, creating shared global vernaculars in hours.

A musical micro-genre or visual edit originating in a regional dorm room can accumulate fifty million impressions across four continents by sunset.

However, rapid viral transmission creates extreme aesthetic volatility. Trends that once defined an entire generation now cycle through discovery, mass adoption, commercial exhaustion, and parody in ninety days. We examine the anthropological mechanics of digital tribalism and why durable cultural artifacts require deliberate offline incubation.',
  'explainer',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
  'Concert venue bathed in warm golden stage lights with crowd hands raised',
  'Unsplash / Live Culture',
  NULL,
  660,
  6,
  '2026-09-30',
  FALSE,
  'published',
  TRUE,
  'Does algorithmic feed optimization homogenize human regional dialects into monoculture?',
  '[{"label": "Dawkins, Richard: The Selfish Gene (Coined term Meme)"}, {"label": "Zuboff, Shoshana: The Age of Surveillance Capitalism"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000009',
  'What Makes Great Design Feel Effortless',
  'what-makes-great-design-feel-effortless',
  'Negative space, invisible typography, and ergonomic affordances',
  'Analyzing spatial harmony, typography hierarchies, and invisible ergonomics that separate masterful objects from cluttered noise.',
  'When you interact with a genuinely extraordinary product—whether a physical fountain pen or a digital publishing layout—you rarely think about the designers. You simply experience clarity. Great design is invisible because it eliminates cognitive resistance between the human intention and the desired outcome.

Achieving this effortless quality requires relentless subtraction. Dieter Rams famously codified this as "less, but better." Every typographic size, margin ratio, and color accent must justify its existence against the silence of white space.

When an interface or physical tool feels cluttered, it is almost always because the creators lacked the courage to decide what matters most. We deconstruct three timeless objects to reveal the mathematical proportions and ergonomic considerations beneath their deceptively simple surfaces.',
  'article',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'Architectural workstation with drafting tools, clean geometry, and ivory paper',
  'Unsplash / Design Studio',
  NULL,
  510,
  5,
  '2026-09-26',
  TRUE,
  'published',
  TRUE,
  'How do typographic line-height scales directly influence cognitive reading fatigue across digital screens?',
  '[{"label": "Rams, Dieter: Ten Principles for Good Design"}, {"label": "Bringhurst, Robert: The Elements of Typographic Style"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000010',
  'Inside the Creative Process',
  'inside-the-creative-process',
  'Associative incubation, creative fatigue, and structural discipline',
  'How writers, architects, and filmmakers transition from chaotic ideation to structured execution without losing originality.',
  'Popular mythology portrays creative breakthroughs as sudden lightning bolts striking eccentric geniuses in moments of divine inspiration. In reality, sustained creativity is an editorial discipline of associative incubation.

The creative loop operates in four distinct phases: preparation (deep input immersion), incubation (subconscious pattern processing during rest), illumination (the associative synthesis), and verification (rigorous technical revision).

The most productive creators do not wait for motivation. They construct reliable environmental containers that make starting frictionless. They also embrace the messy first draft, understanding that refining an imperfect artifact is infinitely easier than animating a blank canvas.',
  'podcast',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  'Fountain pen resting on an open journal with handwritten thoughts',
  'Unsplash / Writers Room',
  NULL,
  2700,
  14,
  '2026-09-22',
  FALSE,
  'published',
  TRUE,
  'What is the optimal ratio between passive input consumption and active output generation for creative workers?',
  '[{"label": "Wallas, Graham: The Art of Thought (1926)"}, {"label": "Pressfield, Steven: The War of Art"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000011',
  'How Cities Shape Who We Become',
  'how-cities-shape-who-we-become',
  'Urban density, public commons, and spatial psychology',
  'The psychological impact of urban density, transit design, and architectural proportions on human character and ambition.',
  'A city is not just a collection of buildings, concrete roads, and zoning bylaws; it is an invisible behavioral engine that quietly shapes how its inhabitants think, walk, and dream. Urban planners have long known that street grid geometry directly modulates community cohesion.

Consider the contrast between an automobile-dependent suburban sprawl and a dense, pedestrian-first historic quarter. In walking cities, spontaneous social collisions occur naturally every day.

The architectural altitude of a metropolis also influences personal ambition. Living among towering stone facades can inspire monumental aspirations, while simultaneously imposing psychological isolation if public commons are neglected. We explore five historic cities through the lens of environmental psychology.',
  'article',
  'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
  'Golden hour perspective over a dense historic urban landscape with arched bridges',
  'Unsplash / Urban Geography',
  NULL,
  580,
  5,
  '2026-09-18',
  FALSE,
  'published',
  TRUE,
  'Does daily access to pedestrian-only public squares measurably decrease cortisol and loneliness?',
  '[{"label": "Jacobs, Jane: The Death and Life of Great American Cities"}, {"label": "Gehl, Jan: Cities for People"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000012',
  'The Art of Slow Travel',
  'the-art-of-slow-travel',
  'Observational immersion over tourist checklist exhaustion',
  'Trading frantic tourist checklists for deep observational immersion, local rhythms, and spatial comprehension.',
  'Modern tourism is frequently structured like an industrial extraction process: travelers fly twelve hours, rush between monuments with digital cameras raised, and return home physically exhausted with little memory beyond photo reels.

Slow travel is a philosophical rejection of checklist consumption. It posits that spending two weeks living in a single neighborhood, shopping at the daily market, and learning local transit rhythms creates a deeper cognitive imprint than visiting six countries in fourteen days.

When you slow down your travel velocity, you stop viewing a region as an amusement park curated for your entertainment and begin observing its genuine social ecology. You observe how residents greet their baker, how afternoon heat reorganizes daily labour, and how historical memory lingers in small details.',
  'video',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  'Wanderer with a leather satchel looking out across mist-shrouded green valley',
  'Unsplash / Field Notes',
  NULL,
  1080,
  7,
  '2026-09-14',
  FALSE,
  'published',
  TRUE,
  'How does staying in one place for 30 days alter linguistic retention compared to weekly transit?',
  '[{"label": "De Botton, Alain: The Art of Travel"}, {"label": "Leed, Eric: The Mind of the Traveler"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000013',
  'The Engineering Behind Modern Aviation',
  'the-engineering-behind-modern-aviation',
  'Aerodynamic lift, turbofan high-bypass ratios, and fly-by-wire redundancy',
  'How fluid dynamics, high-bypass turbofan engines, and redundant fly-by-wire avionics keep hundreds of tons safely airborne.',
  'To stand beneath a modern wide-body passenger aircraft weighing nearly 250 tons and watch it glide effortlessly into the clouds is to witness one of the pinnacle achievements of applied physics. The fundamental magic relies on Bernoulli principle and Newton third law acting across carefully cambered airfoils.

As the aircraft accelerates down the tarmac, air moves faster over the curved upper surface of the wing, generating a low-pressure zone that pulls the wing upward.

Equally remarkable are high-bypass turbofan engines. By ducting the vast majority of intake air around the combustion core rather than through it, modern jet engines produce astronomical thrust while drastically slashing fuel burn and decibel output. We examine flight control computers and triple-redundant hydraulic systems that make commercial air travel the safest transport mode in human history.',
  'video',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  'Commercial passenger airliner wing cutting through golden evening clouds',
  'Unsplash / Aero Engineering',
  NULL,
  1440,
  9,
  '2026-09-10',
  FALSE,
  'published',
  TRUE,
  'Will composite hydrogen fuel cell airframes achieve certification before battery weight densities triple?',
  '[{"label": "Anderson, John D.: Introduction to Flight (McGraw Hill)"}, {"label": "FAA Commercial Aviation Safety Team Longitudinal Safety Data"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000014',
  'Why Electric Cars Won the Future',
  'why-electric-cars-won-the-future',
  'Battery pack energy densities, modular skateboard architectures, and drivetrain simplicity',
  'The physical irreversibility of EV drivetrains: 90% energy efficiency versus the thermal limits of internal combustion.',
  'Debates over electric vehicles often get bogged down in partisan talking points, but from a purely mechanical engineering standpoint, the transition is thermodynamically inevitable. An internal combustion engine converts barely 20% to 30% of the energy stored in gasoline into forward motion; the remaining 70% is lost as wasted heat and friction.

In contrast, an electric powertrain routinely achieves greater than 90% well-to-wheel efficiency.

An electric drivetrain also eliminates over 2,000 moving mechanical parts: no complex transmissions, no spark plugs, no catalytic converters, and no timing belts. With skateboard battery chassis providing a low center of gravity and instant motor torque from zero RPM, EVs represent an architectural leap comparable to the transition from steam locomotives to diesel-electric rail.',
  'explainer',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
  'Sleek modern electric vehicle charging at a clean architectural pavilion',
  'Unsplash / EV Future',
  NULL,
  840,
  7,
  '2026-09-06',
  FALSE,
  'published',
  TRUE,
  'At what grid scale do sodium-ion chemistries outcompete lithium-iron-phosphate for stationary fleet charging?',
  '[{"label": "BloombergNEF Electric Vehicle Outlook 2024"}, {"label": "DoE National Renewable Energy Laboratory Drivetrain Efficiency Tables"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000015',
  'How Money Actually Works',
  'how-money-actually-works',
  'Fractional reserve banking, central bank balance sheets, and fiat trust',
  'Fractional reserve lending, credit expansion, and why money is a shared social consensus rather than gold in a vault.',
  'Most people imagine money as tangible physical currency stored in a secure central vault. In modern reality, more than 95% of the money supply exists purely as digital accounting ledger entries maintained by commercial banks.

When a bank approves a home loan of ₹50,00,000, it does not move stacks of cash from another depositor vault; it literally keystrokes the credit balance into existence against the borrower promissory note.

Money is fundamentally an institutional ledger of social trust. It functions only because the entire populace shares consensus that the currency can be redeemed tomorrow for goods and services. When we grasp how central banks expand balance sheets and manage interest rate levers, the mysteries of currency devaluation and bond market yields become clear.',
  'explainer',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
  'Monochrome coins and architectural vault lines capturing financial mechanics',
  'Unsplash / Monetary Systems',
  NULL,
  900,
  7,
  '2026-09-02',
  TRUE,
  'published',
  TRUE,
  'How will central bank digital currencies (CBDCs) interact with private commercial banking credit creation velocity?',
  '[{"label": "Bank of England: Money Creation in the Modern Economy (Quarterly Bulletin)"}, {"label": "Ferguson, Niall: The Ascent of Money"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000016',
  'The Psychology of Spending',
  'the-psychology-of-spending',
  'Frictional decoupling, lifestyle inflation, and emotional money narratives',
  'Why frictionless digital payments encourage debt and how emotional scripts dictate our relationship with wealth.',
  'Behavioral economists have proven that paying for a purchase with physical paper notes activates pain centers in the brain insular cortex. Handing over five crisp ₹500 notes produces tangible sensory feedback of loss.

Digital tap-to-pay cards, smartphone wallets, and "buy now, pay later" platforms are engineered precisely to decouple the pleasure of acquiring an item from the pain of payment.

Furthermore, our spending patterns are rarely governed by rational spreadsheets; they are dictated by subconscious emotional scripts inherited from childhood. When we unmask these psychological triggers—lifestyle inflation, comparison traps, and retail therapy—we can design automated friction that protects our long-term wealth.',
  'podcast',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  'Coffee cup beside an open ledger with gold pen and calculated figures',
  'Unsplash / Financial Calm',
  NULL,
  2160,
  11,
  '2026-08-28',
  FALSE,
  'published',
  TRUE,
  'Does introducing a mandatory 24-hour delay on digital purchases above ₹2,000 permanently curb impulsive cart abandonment?',
  '[{"label": "Prelec & Loewenstein: The Red and the Black - Mental Accounting of Savings and Debt"}, {"label": "Housel, Morgan: The Psychology of Money"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000017',
  'The Architecture of Supersonic Passenger Flight',
  'the-architecture-of-supersonic-passenger-flight',
  'Compressibility, sonic boom mitigation, and composite titanium heat tolerance',
  'Why passenger supersonic flight paused after Concorde, and the aerodynamic innovations resurrecting Mach 1.7 travel without sonic booms.',
  'Since the retirement of the Concorde in 2003, passenger aviation has prioritized fuel efficiency and high-capacity bypass over sheer velocity. However, a new generation of aerospace engineers is reimagining supersonic flight using computational fluid dynamics to disperse supersonic shockwaves.',
  'explainer',
  'https://images.unsplash.com/photo-1517976487515-568b209d84bf?auto=format&fit=crop&w=1200&q=80',
  'Futuristic sleek aerodynamic aircraft wing silhouette slicing through golden upper troposphere',
  'Unsplash / Aerospace Research',
  NULL,
  1200,
  8,
  '2026-11-20',
  FALSE,
  'coming_soon',
  TRUE,
  'Will laminar flow active boundary layer controls allow supersonic over-land flight permits before 2028?',
  '[{"label": "NASA QueSST Low-Boom Flight Demonstration Project"}, {"label": "AIAA Journal of Aircraft Supersonic Drag Studies"}]'::jsonb
),
(
  'e2000000-0000-0000-0000-000000000018',
  'The Geometry of Modern Memory',
  'the-geometry-of-modern-memory',
  'How externalizing storage to search and databases changes natural neural recall',
  'Exploring the Google effect, transactive memory systems, and how offloading knowledge to external silicon drives rewires our neural recall.',
  'When Socrates expressed skepticism regarding the invention of writing, he warned that relying on external symbols would weaken human biological memory. Today, as we externalize our memory to search engines and language models, cognitive scientists are observing profound shifts in cognitive indexing.',
  'podcast',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
  'Antique archival library with tall wood shelves, warm reading lamps, and leather-bound folios',
  'Unsplash / Knowledge Archive',
  NULL,
  2400,
  12,
  '2026-11-25',
  FALSE,
  'coming_soon',
  TRUE,
  'Does cognitive offloading free up working memory for higher-order associative synthesis, or degrade long-term conceptual depth?',
  '[{"label": "Sparrow et al., Google Effects on Memory (Science 2011)"}, {"label": "Carr, Nicholas: The Shallows - What the Internet Is Doing to Our Brains"}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  content_type = EXCLUDED.content_type,
  thumbnail_url = EXCLUDED.thumbnail_url,
  thumbnail_alt = EXCLUDED.thumbnail_alt,
  image_credit = EXCLUDED.image_credit,
  media_url = EXCLUDED.media_url,
  duration_seconds = EXCLUDED.duration_seconds,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  publication_date = EXCLUDED.publication_date,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  is_demo = EXCLUDED.is_demo,
  open_questions = EXCLUDED.open_questions,
  sources = EXCLUDED.sources;

-- 4. Insert Content-Category Relationships
INSERT INTO content_categories (content_id, category_id) VALUES
-- Item 01 -> Business
('e2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001'),
-- Item 02 -> Business + Finance
('e2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001'),
('e2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000008'),
-- Item 03 -> Tech
('e2000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002'),
-- Item 04 -> Tech
('e2000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002'),
-- Item 05 -> Psychology
('e2000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000003'),
-- Item 06 -> Psychology + Business
('e2000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000003'),
('e2000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001'),
-- Item 07 -> Student Life
('e2000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000004'),
-- Item 08 -> Student Life + Tech
('e2000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000004'),
('e2000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000002'),
-- Item 09 -> Design
('e2000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000005'),
-- Item 10 -> Design
('e2000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000005'),
-- Item 11 -> Travel + Design
('e2000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000006'),
('e2000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000005'),
-- Item 12 -> Travel
('e2000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000006'),
-- Item 13 -> Aviation
('e2000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000007'),
-- Item 14 -> Aviation & Automotive
('e2000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000007'),
('e2000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000002'),
-- Item 15 -> Finance
('e2000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000008'),
-- Item 16 -> Finance + Psychology
('e2000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000008'),
('e2000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000003'),
-- Item 17 -> Aviation (Coming Soon)
('e2000000-0000-0000-0000-000000000017', 'c1000000-0000-0000-0000-000000000007'),
-- Item 18 -> Psychology (Coming Soon)
('e2000000-0000-0000-0000-000000000018', 'c1000000-0000-0000-0000-000000000003')
ON CONFLICT (content_id, category_id) DO NOTHING;

-- 5. Insert Site Settings
INSERT INTO site_settings (key, value) VALUES
(
  'general',
  '{
    "title": "Kernel Space",
    "tagline": "Think Deeper. Explore Further.",
    "heroLabel": "A space for curious minds.",
    "heroHeadline": "Think Deeper. Explore Further.",
    "heroSupportText": "A multi-format media and knowledge platform dissecting technology, human behaviour, business mechanics, and global ideas with intellectual honesty.",
    "contactEmail": "hello@kernelspace.media",
    "founder_note": "We started Kernel Space because we were exhausted by 30-second hot takes and superficial clickbait. We wanted a quiet, rigorous room to investigate the mechanisms behind our world.",
    "start_here": [
      "why-some-startups-fail-even-with-great-ideas",
      "how-ai-tools-are-changing-the-way-we-work",
      "why-our-brains-crave-distraction"
    ],
    "socialLinks": {
      "youtube": "",
      "spotify": "",
      "instagram": "",
      "twitter": "",
      "linkedin": ""
    }
  }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
