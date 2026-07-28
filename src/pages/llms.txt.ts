export const prerender = true;

interface Frontmatter {
  title?: string;
  description?: string;
  summary?: string;
  hook?: string;
  problem?: string;
  slug?: string;
  date?: string;
  tags?: string[];
}

interface MDXModule {
  frontmatter: Frontmatter;
}

// ── Editorial summaries ──────────────────────────────────────────────────────
// Add a slug key here whenever you add new content. Falls back to
// frontmatter.description if no entry exists for a slug.
const SUMMARIES: Record<string, string> = {

  // Case studies
  'golden-account-model':
    `Built the golden account model for Zuper's roofing vertical — a pre-configured, cloneable account with roofing-specific workflows, job types, automations, and terminology. Key decision: build a CPQ workaround using existing platform capabilities rather than waiting for a native feature, then use real usage data to shape the product requirement. Outcome: onboarding time reduced by more than 50%. The golden account became a product discovery vehicle that directly shaped Zuper's native CPQ feature.`,

  'booking-stopgap':
    `Designed and prototyped a multi-tenant configurable booking widget system for roofing contractors. Four booking modes, 10DLC compliance support, territory matching, per-contractor admin configuration. Key decision: build a working prototype in hours rather than writing a PRD in the abstract — compressed a feature prioritization decision from weeks to days. Outcome: feature scoped and on roadmap with requirements shaped by the prototype.`,

  'ai-shopping-buddy':
    `Product spec and architecture for an AI discovery layer embeddable in any e-commerce platform. Origin: personal friction — while buying a phone, Dilith found himself manually copy-pasting specs from Flipkart into Claude to get reasoning. He was the integration layer two systems should have handled automatically. That friction became a weekend rabbit hole and a full V1 product spec. Scope: Indian market, early-stage startup constraints, mid-intent buyers (know use case and budget, not the product). Key decisions: floating side panel that reads current page context on open (no cold start), rule-based pre-filter routing high-precision intents (order status) to APIs without hitting the LLM, hybrid spec passing for electronics (summary tokens by default, full specs escalated by intent), two-layer freshness architecture (vector DB for semantic match, live API call for price and stock — never prices from the vector DB). Architecture: intent classification via lightweight model → retrieval → generation with strict data provenance (LLM never generates prices or inventory). North star metric: buddy-assisted conversion rate vs baseline. Honest scope: order management excluded from V1; discovery and recommendations are the only problems where LLM reasoning earns its place.`,

  // Essays
  'rapido-teardown':
    `Published January 2026. Analyzes Rapido's growth in India's two-wheeler mobility market through the lens of habit loop formation, supply-side subscription economics, and ecosystem lock-in. Central argument: Rapido won by building a habit first, then expanding within that habit — a strategy B2B SaaS products underuse.`,

  'spotify-wrapped':
    `Published December 2025. Analyzes why Spotify Wrapped dominates year-end cultural conversation while most imitators fail. Central argument: Wrapped succeeds because it adds an interpretation layer on top of data — turning metrics into identity narratives users want to share. Most B2B year-in-review features stop at data presentation and miss the emotional architecture.`,

  // Projects
  'iris':
    `Built 2026. Cross-device private file and message transfer app. Problem: moving files between four personal devices (Android, iPad, two laptops) without using WhatsApp or email as workarounds. Stack: React 18, TypeScript, Supabase, Tailwind CSS. Key decisions: device registration instead of user accounts; 8-character pairing codes instead of phone numbers; 7-day session expiry to keep the tool lightweight. Rebuilt from an earlier version (D-Chat) after the original Neumorphic design system failed in dark mode on mobile.`,

  'pulseboard':
    `Built 2025. Personal work-tracking and reflection tool for product managers. Problem: scattered cross-functional work doesn't accumulate into a visible narrative without deliberate logging. Stack: Lovable, Supabase, Claude, GPT-4. Key finding: AI-generated summaries are good at volume but bad at weight — they can't distinguish a week with one important decision from a week with twenty routine tasks. This gap would be the focus of a v2.`,

  'superpilot':
    `Built 2026. AI institutional memory layer for B2B CRM — pre-call briefs, post-call intelligence, deal monitoring, and handoff briefs. Prototype built in React + TanStack on dummy data. Problem: B2B sales reps lose 2+ hours daily to context reconstruction across six deal handoffs (SDR → AE → SE → Legal → Implementation → CSM). The data to fix this exists — email threads, call transcripts, meeting recordings, CRM activity logs — but no system synthesizes it at the right moment. Key architecture decisions: (1) Threshold gates — cheap rule-based signals computed on all deals first; LLM called only when threshold tripped. 36 LLM calls instead of 180 per monitoring cycle at 30 reps × 6 deals. (2) Incremental delta summarization — new interaction + stored summary → updated summary, token cost stays flat regardless of history length. (3) Parallel fetches with graceful degradation — all 5 data sources hit simultaneously, 3-second timeout, brief renders without slow source rather than blocking. (4) Source attribution on every insight — every concern and commitment links to the transcript, email, or meeting it came from; prevents hallucination from becoming a trust-breaking error. (5) Rules first, LLM when justified — "proposal opened 4x" is a webhook event (not AI), task suggestions are pattern matching (not AI); LLM enters for multi-signal interpretation only.`,

  'voice-agent':
    `Built 2026. Live voice agent running on the portfolio homepage — anyone can talk to it in real time. Stack: VAPI (orchestration), Deepgram (STT, ~100ms latency), ElevenLabs (TTS), GPT-4o Mini. Problem: a contact form says you're interested in AI product work; a running AI system shows how you think about it. Key decisions: RAG split between a lean system prompt (~280 tokens for identity and behavior) and a separate knowledge base retrieved on demand — reduces cold-start latency significantly vs loading everything upfront. Static hardcoded first message fires instantly instead of waiting 3–5 seconds for an LLM-generated opener. Audience detection routes conversations by role — recruiter gets a sharp summary, founder gets architecture decisions. Pronunciation dictionary via VAPI API maps "Dilith" → "Dil-ith" before text reaches the voice model. STT keyterm priming adds "Dilith," "Zuper," "VAPI" so Deepgram transcription is calibrated for the conversation's vocabulary. Model choice: GPT-4o Mini over GPT-4o — latency difference is audible in voice, and the reasoning ceiling on retrieval plus coherent speech doesn't require the larger model.`,

  'delphi':
    `Built 2026. Pre-filing tax intelligence layer for foreign-owned Delaware C-Corp founders. Live at delphi-tax.vercel.app. Stack: pure HTML, CSS, Vanilla JS + Claude Sonnet via Vercel serverless proxy. Zero npm packages, zero build step. Problem: foreign founders with 25%+ ownership in a Delaware C-Corp face a $25,000 annual IRS penalty for missing Form 5472 — and most don't know the form exists. Most tax tools assume you already know which forms apply; Delphi starts from zero. Core architecture decision: "Rules decide. LLM explains." A deterministic JavaScript rule engine computes required filings, deadlines, tax estimates, penalty exposure, and a confidence score from 10 founder inputs. Claude Sonnet narrates the output — it never touches filing decisions, tax rates, deadlines, or penalties. Every output has a collapsible audit trail showing which rules fired. Key product decisions: (1) Progressive reveal form — fields unlock one at a time to reduce overwhelm for compliance-anxious founders. (2) Dev mode with scenario switcher — three deadline states (upcoming/imminent/overdue) switchable without re-filling the form, required for portfolio demos. (3) Zero npm — no dependency drift, works offline, entire codebase readable in one sitting. Four-screen flow: landing → intake (10 fields) → diagnosis (filings, deadlines, penalties, AI narration, confidence score) → handoff (filing readiness, "Proceed to filing with Inkle →"). Rule engine implements RULES.md — every form code, deadline, and penalty traceable to IRS and state guidance. Honest caveat: rule accuracy relies on Dilith's research; would require CPA review before real users file based on it.`,
};

// ── Static page registry (non-MDX pages) ────────────────────────────────────
// Add entries here for Astro pages that can't be auto-detected from MDX.
const STATIC_PAGES: Array<{ path: string; label: string }> = [
  { path: '/', label: 'Home. Positioning, case study previews, essay previews, project previews, and contact.' },
  { path: '/about', label: 'Background, career arc, cognitive influences.' },
  { path: '/now', label: 'What Dilith is currently building, reading, and thinking about.' },
  { path: '/contact', label: 'Contact information. Not currently seeking roles.' },
];

// ── Non-MDX content entries (Astro pages that are content, not just index/nav) ──
const STATIC_WORK: Array<{ slug: string; title: string; date: string; tags: string[] }> = [
  { slug: 'ai-shopping-buddy', title: 'The AI Shopping Buddy', date: '2025', tags: ['AI', 'E-commerce', 'Product Spec'] },
];

function slugFrom(fm: Frontmatter, path: string): string {
  if (fm.slug) return fm.slug;
  const match = path.match(/\/([^/]+)\.mdx$/);
  return match ? match[1] : '';
}

function summaryFor(slug: string, fm: Frontmatter): string {
  return SUMMARIES[slug] ?? fm.description ?? fm.summary ?? fm.hook ?? fm.problem ?? '';
}

export async function GET() {
  // Auto-discover all MDX content
  const workModules  = import.meta.glob<MDXModule>('./work/*.mdx',     { eager: true });
  const writingModules = import.meta.glob<MDXModule>('./writing/*.mdx', { eager: true });
  const projectModules = import.meta.glob<MDXModule>('./projects/*.mdx', { eager: true });

  const workItems = Object.entries(workModules).map(([path, mod]) => ({
    slug: slugFrom(mod.frontmatter, path),
    title: mod.frontmatter.title ?? '',
    date: mod.frontmatter.date ?? '',
    tags: mod.frontmatter.tags ?? [],
    fm: mod.frontmatter,
  }));

  const writingItems = Object.entries(writingModules).map(([path, mod]) => ({
    slug: slugFrom(mod.frontmatter, path),
    title: mod.frontmatter.title ?? '',
    date: mod.frontmatter.date ?? '',
    tags: mod.frontmatter.tags ?? [],
    fm: mod.frontmatter,
  }));

  const projectItems = Object.entries(projectModules).map(([path, mod]) => ({
    slug: slugFrom(mod.frontmatter, path),
    title: mod.frontmatter.title ?? '',
    date: mod.frontmatter.date ?? '',
    tags: mod.frontmatter.tags ?? [],
    fm: mod.frontmatter,
  }));

  // Merge MDX work with hardcoded non-MDX work entries
  const allWork = [...STATIC_WORK, ...workItems];

  // ── Page list section ──────────────────────────────────────────────────────
  const workPageLines = allWork.map(w => `/work/${w.slug} — Case study: ${w.title}.`).join('\n');
  const writingPageLines = writingItems.map(w => `/writing/${w.slug} — Essay: ${w.title}.`).join('\n');
  const projectPageLines = projectItems.map(p => `/projects/${p.slug} — Project: ${p.title}.`).join('\n');

  const sitePages = [
    ...STATIC_PAGES.map(p => `${p.path} — ${p.label}`),
    `/work — Work index. All product case studies.`,
    workPageLines,
    `/writing — Writing index. All product essays and teardowns.`,
    writingPageLines,
    `/projects — Projects index. All personal build logs.`,
    projectPageLines,
  ].join('\n');

  // ── Content sections ───────────────────────────────────────────────────────
  const caseStudiesSection = allWork
    .map(w => `${w.title} (/work/${w.slug}):\n${summaryFor(w.slug, 'fm' in w ? (w as any).fm : {})}`)
    .join('\n\n');

  const essaysSection = writingItems
    .map(w => `${w.title} (/writing/${w.slug}):\n${summaryFor(w.slug, w.fm)}`)
    .join('\n\n');

  const projectsSection = projectItems
    .map(p => `${p.title} (/projects/${p.slug}):\n${summaryFor(p.slug, p.fm)}`)
    .join('\n\n');

  // ── Assemble ───────────────────────────────────────────────────────────────
  const content = `# Dilith Dinesh — dilithdinesh.com

## Who I am

Dilith Dinesh is a Product Manager and AI systems builder working at the boundary between customer reality and product systems. As of August 2026 he is an Associate Product Manager at VoiceStack, an AI-powered phone platform for dental practices and DSOs, where the product problem is converting inbound patient calls into booked appointments. Before that he spent two years at Zuper, a B2B SaaS field service management platform — one year as a Forward Deployed Engineer, then as a Customer Product Manager, where he built the roofing vertical from scratch. He studied Computer Science at VIT University and is based in Chennai, India.

The move from field service to healthcare was deliberate. His view is that leverage in vertical software is rarely in the feature list — it is in the operational moment nobody has instrumented yet. In field service that moment is dispatch; in dental it is the inbound phone call, where practices miss a large share of calls and most callers never leave a voicemail. Healthcare adds constraints field service never had: HIPAA coverage across every component touching patient data, TCPA consent rules on outbound contact, callers who are in pain and have no patience for a menu tree, and integrations into long-established practice management systems such as Dentrix, Eaglesoft, and Open Dental.

Beyond his day-to-day product work, he builds AI systems — a live voice agent on his portfolio site, and a product spec for an AI shopping discovery layer — to demonstrate how he thinks about AI product decisions, not just to describe them. He built the voice agent before joining a voice AI company. He is not currently seeking roles.

## Site pages

${sitePages}

## Case studies

${caseStudiesSection}

## Essays

${essaysSection}

## Projects

${projectsSection}

## Contact

Email: dilithdinesh007@gmail.com
LinkedIn: https://linkedin.com/in/dilithdinesh
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
