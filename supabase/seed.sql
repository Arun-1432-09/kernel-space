-- ============================================================================
-- KERNEL SPACE SEED SCRIPT
-- Categories, Demo Content (16+ items), Site Settings, Default Team
-- ============================================================================

-- 1. Insert Categories
INSERT INTO categories (id, name, slug, description, icon, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'Business & Startups', 'business-and-startups', 'Dissecting how companies are built, economic realities, and case studies of what makes ventures thrive or collapse.', 'Briefcase', 1),
('c1000000-0000-0000-0000-000000000002', 'Technology & AI', 'technology-and-ai', 'Demystifying automation, artificial intelligence systems, computational foundations, and tools reshaping work.', 'Cpu', 2),
('c1000000-0000-0000-0000-000000000003', 'Psychology & Mental Health', 'psychology-and-mental-health', 'How human minds operate, cognitive biases, mental resilience, and understanding our behaviors under modern pressures.', 'Brain', 3),
('c1000000-0000-0000-0000-000000000004', 'Student Life & Gen-Z Culture', 'student-life-and-gen-z-culture', 'Navigating education, career identity, peer realities, and cultural shifts from an authentic generational lens.', 'GraduationCap', 4),
('c1000000-0000-0000-0000-000000000005', 'Design & Creativity', 'design-and-creativity', 'How intentional design occurs, aesthetic decisions, creative problem-solving, and visual narrative architecture.', 'Palette', 5),
('c1000000-0000-0000-0000-000000000006', 'Travel & Experiences', 'travel-and-experiences', 'The psychology of place, cultural immersion, geography beyond tourist itineraries, and how environments transform us.', 'Compass', 6),
('c1000000-0000-0000-0000-000000000007', 'Aviation & Automotive', 'aviation-and-automotive', 'Aerodynamics, mechanics of flight, automotive evolution, and the industrial engineering powering global transport.', 'Plane', 7),
('c1000000-0000-0000-0000-000000000008', 'Finance & Economics', 'finance-and-economics', 'Money mechanics, market dynamics, macro-economic engines, and personal financial principles made crystal clear.', 'TrendingUp', 8)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

-- 2. Insert 16 Demo Content Records
INSERT INTO content (
  id, title, slug, description, body, content_type, thumbnail_url, media_url, duration_seconds, publication_date, featured, status, is_demo
) VALUES
(
  'e2000000-0000-0000-0000-000000000001',
  'The Future of Artificial Intelligence',
  'the-future-of-artificial-intelligence',
  'Beyond corporate hype and apocalyptic panic: an analytical look at neural networks, reasoning engines, and what machine intelligence actually enables for human thought.',
  'When we strip away marketing hyperbole, modern artificial intelligence is fundamentally a revolution in pattern synthesis and high-dimensional parameter compression. In this breakdown, we examine whether neural reasoning architectures are converging toward genuine general cognition or serving as potent amplification lenses for human creativity. We explore compute scaling laws, data bottlenecks, and the philosophical question of whether understanding requires embodiment.',
  'video',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://www.youtube.com/watch?v=aircAruvnKk',
  1620,
  CURRENT_DATE - INTERVAL '2 days',
  true,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000002',
  'Why Businesses Fail',
  'why-businesses-fail',
  'A rigorous post-mortem examining the hidden reasons behind startup mortality, premature scaling, false product-market fit, and narrative traps.',
  'Most post-mortems blame "running out of cash" without asking why the cash evaporated. Cash depletion is a symptom, rarely the disease. The root pathology is almost always mismatched distribution velocity, misreading early adopter vanity metrics, or scaling infrastructure before product retention stabilizes. Through five case studies, we dismantle the comfort blankets founders tell themselves.',
  'explainer',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  null,
  1140,
  CURRENT_DATE - INTERVAL '5 days',
  true,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000003',
  'Understanding Human Behaviour',
  'understanding-human-behaviour',
  'Exploring the evolutionary mechanisms, cognitive heuristics, and subconscious social dynamics that dictate our daily choices.',
  'Why do intelligent people repeatedly make self-defeating financial and emotional decisions? Behavioral economists and neurobiologists have spent decades demonstrating that human cognition did not evolve to maximize mathematical utility; it evolved to optimize social inclusion and energy conservation. In this deep dive, we walk through status signaling, loss aversion, and dopamine anticipation loops.',
  'podcast',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  'https://open.spotify.com/episode/7vQfQ29z5oG90w817Z6s6n',
  2580,
  CURRENT_DATE - INTERVAL '8 days',
  true,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000004',
  'How Great Ideas Are Built',
  'how-great-ideas-are-built',
  'Great concepts rarely arrive as lightning bolts in isolation. They are combinatorial systems assembled from disparate observations across disciplines.',
  'The myth of the solitary genius receiving an epiphany in the shower has done immense damage to creative confidence. Historical examination reveals that breakthroughs invariably happen at intersections: Gutenberg marrying the coin punch with the wine press; Steve Jobs combining calligraphy with personal computing. In this essay, we outline a sustainable framework for cross-pollinating knowledge.',
  'article',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  null,
  720,
  CURRENT_DATE - INTERVAL '12 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000005',
  'The Economics of Everyday Life',
  'the-economics-of-everyday-life',
  'From the price of coffee to apartment rents: breaking down the invisible supply curves and incentive structures governing modern living.',
  'Economics is not merely stock tickers and central bank interest rate meetings; it is the study of incentives and unintended consequences. Why does a cup of coffee cost five dollars in urban centers? What explains the persistent shortage of housing? We trace the supply chain, regulatory friction, and consumer willingness-to-pay to illuminate the hidden architecture of urban pricing.',
  'video',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
  'https://www.youtube.com/watch?v=3m4t6F3bC6g',
  1380,
  CURRENT_DATE - INTERVAL '15 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000006',
  'Inside the World of Aviation',
  'inside-the-world-of-aviation',
  'How commercial aviation engineered the safest mass transportation system on earth through radical transparency and crew resource management.',
  'A modern commercial airliner operates in conditions that defy intuitive human survival: sub-zero temperatures, thin atmospheres, and speeds approaching supersonic velocity. Yet commercial flying is mathematically the safest endeavor in transport history. We explore how black box data sharing, no-blame incident investigations, and hierarchical redesign of flight deck communication created this triumph of systems engineering.',
  'explainer',
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
  null,
  1800,
  CURRENT_DATE - INTERVAL '18 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000007',
  'The Psychology of Decision Making',
  'the-psychology-of-decision-making',
  'Unpacking analysis paralysis, heuristics, and mental models that help us make sound judgments under deep uncertainty.',
  'In complex environments, seeking complete certainty before deciding is itself a fatal decision. We examine how probabilistic forecasting, expected value calculation, and deliberate constraints allow thinkers to cut through noise and take calculated risks without being crippled by regret.',
  'podcast',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
  'https://open.spotify.com/episode/3gJqO3G8yG1v9D5qK0pX8z',
  2820,
  CURRENT_DATE - INTERVAL '22 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000008',
  'Creativity in the Digital Age',
  'creativity-in-the-digital-age',
  'How algorithmic curation, infinite feeds, and instant generation tools challenge our relationship with originality and deep artistic focus.',
  'When content creation tools become friction-free, production explodes while contemplation shrinks. How do contemporary designers, writers, and visual artists preserve distinct viewpoints when every recommendation feed rewards homogenized trends? We interview craftspeople building slow, deliberate creative rituals.',
  'article',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
  null,
  840,
  CURRENT_DATE - INTERVAL '25 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000009',
  'Building Your First Startup',
  'building-your-first-startup',
  'A non-glamorized manual for first-time builders: validation before code, talking to users without leading questions, and surviving the trough of sorrow.',
  'Too many young founders spend six months crafting pixel-perfect landing pages and complicated databases for ideas nobody wants. We outline the minimalist playbook: validating pain through customer interviews that avoid false positives, selling before building, and maintaining personal runway during the initial phase.',
  'video',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'https://www.youtube.com/watch?v=0pL1i3V9U7g',
  1920,
  CURRENT_DATE - INTERVAL '28 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000010',
  'The Future of Education',
  'the-future-of-education',
  'Can traditional universities survive credential unbundling, AI tutors, and self-directed cohort learning models?',
  'The 4-year degree bundle is being challenged on two fronts: cost inflation and obsolescence speed. We explore where institutional higher learning remains irreplaceable (socialization, credentialing networks, research equipment) and where personalized digital pedagogy is proving vastly superior.',
  'podcast',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'https://open.spotify.com/episode/4kLqW6P8yF2v8D4qK1pX9y',
  2400,
  CURRENT_DATE - INTERVAL '31 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000011',
  'Exploring the Science of Travel',
  'exploring-the-science-of-travel',
  'How leaving familiar geographies shifts neuroplasticity, shatters confirmation biases, and expands subjective time perception.',
  'Notice how the first three days in a new city feel like three weeks? That sensation is biological: novel sensory inputs force the brain to abandon predictive processing and encode dense experiential memories. We break down the cognitive science of place and why slow travel permanently alters mental frameworks.',
  'explainer',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  null,
  1260,
  CURRENT_DATE - INTERVAL '34 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000012',
  'How Technology Shapes Culture',
  'how-technology-shapes-culture',
  'We shape our tools, and thereafter our tools shape us. A multi-century perspective on how mediums transform human social rituals.',
  'From the printing press sparking the Reformation to short-form vertical video re-architecting adolescent attention spans, technologies are never passive conduits. They dictate the rhythm, etiquette, and emotional timbre of human association. We examine the sociological feedback loops currently playing out.',
  'article',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  null,
  900,
  CURRENT_DATE - INTERVAL '38 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000013',
  'The Fundamentals of Financial Literacy',
  'the-fundamentals-of-financial-literacy',
  'Compound interest, real versus nominal return, index investing, and risk asymmetry explained without jargon or get-rich-quick scams.',
  'Financial freedom is not about timing penny stocks or buying speculative tokens. It is an understanding of compound growth, tax-advantaged compounding, and catastrophic downside prevention. We present a clear, step-by-step roadmap for twenty-somethings building long-term financial security.',
  'video',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
  'https://www.youtube.com/watch?v=WEdA3W9M5rU',
  1500,
  CURRENT_DATE - INTERVAL '42 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000014',
  'Design Thinking Explained',
  'design-thinking-explained',
  'Moving beyond sticky notes on whiteboards: the genuine methodology of problem reframing, empathy testing, and rapid prototype loops.',
  'Design thinking has been cheapened into a corporate buzzword filled with colored post-it notes and performative empathy workshops. But at its core, genuine design methodology is a rigorous epistemological tool: identifying the right question before jumping to solutions, and testing hypotheses in real physical environments.',
  'explainer',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
  null,
  1080,
  CURRENT_DATE - INTERVAL '45 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000015',
  'The Evolution of Electric Vehicles',
  'the-evolution-of-electric-vehicles',
  'Battery chemistry, charging infrastructure bottlenecks, rare earth supply chains, and the engineering behind the automotive transformation.',
  'The transition to electric mobility is not just swapping internal combustion engines for electric motors; it is a fundamental reconfiguration of the global electrical grid, battery supply chains, and software architecture. We examine solid-state battery progress, vehicle-to-grid integration, and lifecycle carbon metrics.',
  'video',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
  'https://www.youtube.com/watch?v=F3zWw4PzXpY',
  1740,
  CURRENT_DATE - INTERVAL '48 days',
  false,
  'published',
  true
),
(
  'e2000000-0000-0000-0000-000000000016',
  'What Makes a Great Conversation?',
  'what-makes-a-great-conversation',
  'Why genuine dialogue is dying in the attention economy, and how active listening, intellectual humility, and courage revive it.',
  'Most people in conversation are simply waiting for their turn to speak or rehearsing their next rebuttal. A great conversation is rare because it requires vulnerability: entering an exchange willing to have your mind altered. We reflect on the philosophy of dialogue that underpins the entire Kernel Space vision.',
  'podcast',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
  'https://open.spotify.com/episode/5mNpX2R9yQ3v7D8qK2pX1z',
  3180,
  CURRENT_DATE - INTERVAL '52 days',
  false,
  'published',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  content_type = EXCLUDED.content_type,
  thumbnail_url = EXCLUDED.thumbnail_url,
  media_url = EXCLUDED.media_url,
  duration_seconds = EXCLUDED.duration_seconds,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  is_demo = EXCLUDED.is_demo;

-- 3. Link Content to Categories (Many-to-Many)
INSERT INTO content_categories (content_id, category_id) VALUES
-- AI -> Tech & AI, Design & Creativity
('e2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002'),
('e2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000005'),
-- Why Businesses Fail -> Business & Startups, Finance & Economics
('e2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001'),
('e2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000008'),
-- Human Behaviour -> Psychology & Mental Health
('e2000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003'),
-- How Great Ideas Are Built -> Design & Creativity, Business & Startups
('e2000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000005'),
('e2000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001'),
-- Economics of Everyday Life -> Finance & Economics
('e2000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000008'),
-- Inside Aviation -> Aviation & Automotive, Technology & AI
('e2000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000007'),
('e2000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002'),
-- Psychology of Decision Making -> Psychology & Mental Health, Business & Startups
('e2000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003'),
('e2000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000001'),
-- Creativity in Digital Age -> Design & Creativity, Student Life & Gen-Z Culture
('e2000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000005'),
('e2000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000004'),
-- Building First Startup -> Business & Startups, Student Life & Gen-Z Culture
('e2000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000001'),
('e2000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000004'),
-- Future of Education -> Student Life & Gen-Z Culture, Technology & AI
('e2000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000004'),
('e2000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000002'),
-- Science of Travel -> Travel & Experiences, Psychology & Mental Health
('e2000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000006'),
('e2000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000003'),
-- How Tech Shapes Culture -> Technology & AI, Student Life & Gen-Z Culture
('e2000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000002'),
('e2000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000004'),
-- Financial Literacy -> Finance & Economics, Student Life & Gen-Z Culture
('e2000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000008'),
('e2000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000004'),
-- Design Thinking -> Design & Creativity, Business & Startups
('e2000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000005'),
('e2000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000001'),
-- EV Evolution -> Aviation & Automotive, Technology & AI
('e2000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000007'),
('e2000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000002'),
-- Great Conversation -> Psychology & Mental Health, Student Life & Gen-Z Culture
('e2000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000003'),
('e2000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000004')
ON CONFLICT DO NOTHING;

-- 4. Insert Default Site Settings
INSERT INTO site_settings (key, value) VALUES
('general', '{
  "title": "Kernel Space",
  "tagline": "Think Deeper. Explore Further.",
  "heroLabel": "A space for curious minds.",
  "heroHeadline": "Think Deeper. Explore Further.",
  "heroSupportText": "A space for curious minds to question ideas, explore perspectives and understand the world beyond the surface.",
  "contactEmail": "hello@kernelspace.media",
  "socialLinks": {
    "youtube": "https://youtube.com/@kernelspace",
    "spotify": "https://open.spotify.com/show/kernelspace",
    "instagram": "https://instagram.com/kernelspace",
    "twitter": "https://x.com/kernelspace",
    "linkedin": "https://linkedin.com/company/kernelspace"
  }
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
