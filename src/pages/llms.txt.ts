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
    `Built the golden account model for Zuper's roofing vertical, a pre-configured, cloneable account with roofing-specific workflows, job types, automations, and terminology. Key decision: build a CPQ workaround using existing platform capabilities rather than waiting for a native feature, then use real usage data to shape the product requirement. Outcome: onboarding time reduced by more than 50%. The golden account became a product discovery vehicle that directly shaped Zuper's native CPQ feature.`,

  'booking-stopgap':
    `Designed and prototyped a multi-tenant configurable booking widget system for roofing contractors. Four booking modes, 10DLC compliance support, territory matching, per-contractor admin configuration. Key decision: build a working prototype in hours rather than writing a PRD in the abstract, compressed a feature prioritization decision from weeks to days. Outcome: feature scoped and on roadmap with requirements shaped by the prototype.`,

  'ai-shopping-buddy':
    `Product spec and architecture for an AI discovery layer embeddable in any e-commerce platform. Origin: personal friction, while buying a phone, Dilith found himself manually copy-pasting specs from Flipkart into Claude to get reasoning. He was the integration layer two systems should have handled automatically. That friction became a weekend rabbit hole and a full V1 product spec. Scope: Indian market, early-stage startup constraints, mid-intent buyers (know use case and budget, not the product). Key decisions: floating side panel that reads current page context on open (no cold start), rule-based pre-filter routing high-precision intents (order status) to APIs without hitting the LLM, hybrid spec passing for electronics (summary tokens by default, full specs escalated by intent), two-layer freshness architecture (vector DB for semantic match, live API call for price and stock, never prices from the vector DB). Architecture: intent classification via lightweight model → retrieval → generation with strict data provenance (LLM never generates prices or inventory). North star metric: buddy-assisted conversion rate vs baseline. Honest scope: order management excluded from V1; discovery and recommendations are the only problems where LLM reasoning earns its place.`,

  // Essays
  'rapido-teardown':
    `Published January 2026. Analyzes Rapido's growth in India's two-wheeler mobility market through the lens of habit loop formation, supply-side subscription economics, and ecosystem lock-in. Central argument: Rapido won by building a habit first, then expanding within that habit, a strategy B2B SaaS products underuse.`,

  'spotify-wrapped':
    `Published December 2025. Analyzes why Spotify Wrapped dominates year-end cultural conversation while most imitators fail. Central argument: Wrapped succeeds because it adds an interpretation layer on top of data, turning metrics into identity narratives users want to share. Most B2B year-in-review features stop at data presentation and miss the emotional architecture.`,

  // Projects
  'iris':
    `Built 2026. Cross-device private file and message transfer app. Problem: moving files between four personal devices (Android, iPad, two laptops) without using WhatsApp or email as workarounds. Stack: React 18, TypeScript, Supabase, Tailwind CSS. Key decisions: device registration instead of user accounts; 8-character pairing codes instead of phone numbers; 7-day session expiry to keep the tool lightweight. Rebuilt from an earlier version (D-Chat) after the original Neumorphic design system failed in dark mode on mobile.`,

  'winledger':
    `Winledger, formerly Pulseboard. Built 2025, rebuilt November 2026. Live at winledger.vercel.app. A private brag sheet for people with office jobs: log work wins as they happen, import the spreadsheet you already keep, pull a plain-text summary of any period for a performance review or job hunt. Version one was a weekend build (GPT for scope, Claude for spec, Lovable for UI, Supabase). Version two began with an audit run as four parallel Claude Code reviews (product, daily use, onboarding, security), which found an unclear position, onboarding that assumed Dilith's own job, an AI endpoint anyone could call, and bugs that silently damaged the record (an edit-then-add overwrite, dates a day early west of UTC, a 1,000-entry cap). Key decisions: (1) Position it as a brag sheet whose competitor is the spreadsheet, so logging is one line and importing any existing sheet is the first-run path. (2) Remove the AI summary, because it was prompted to quantify achievements in documents people give their employer; the summary now uses only what the user wrote and no AI provider sees entries. (3) Fix data integrity before features, with date tests run across timezones. (4) Move off Lovable to an owned Supabase project with row-level security checked between two test users, account deletion, privacy terms and Google sign-in. (5) Rename. Rebuilt with Claude Code as the engineering team, in three parallel branches that Dilith merged. Then a retention pass: an agent reviewed it as a consumer app and found it good at capture and at welcoming people back after a gap, but weak at payoff between review seasons. Decisions: (6) A native Android companion (Kotlin, Jetpack Compose) for one-line capture, reminders, a quick summary and export, saving to the phone first so nothing typed offline is lost; the laptop stays the main place to work. (7) A review date and fiscal year on the account, with a six-week countdown on the log, in the weekly email and on the phone. (8) A weekly streak that an empty current week doesn't break and backfilling repairs, beside counts that only go up. (9) Nine kinds of phone reminder built from the user's own record, at most one a day, triggered by dates and counts only, with nothing on the lock screen. (10) Impact and praise captured on the phone when they happen. Honest caveats: one user so far, so none of the retention work is proven; the reminder email only reaches Dilith until a sending domain is verified; the Android app is not on the Play Store; and the signal-versus-noise flag from version one is still unbuilt.`,

  'superpilot':
    `Built 2026. AI institutional memory layer for B2B CRM, pre-call briefs, post-call intelligence, deal monitoring, and handoff briefs. Prototype built in React + TanStack on dummy data. Problem: B2B sales reps lose 2+ hours daily to context reconstruction across six deal handoffs (SDR → AE → SE → Legal → Implementation → CSM). The data to fix this exists (email threads, call transcripts, meeting recordings, CRM activity logs) but no system synthesizes it at the right moment. Key architecture decisions: (1) Threshold gates, cheap rule-based signals computed on all deals first; LLM called only when threshold tripped. 36 LLM calls instead of 180 per monitoring cycle at 30 reps × 6 deals. (2) Incremental delta summarization, new interaction + stored summary → updated summary, token cost stays flat regardless of history length. (3) Parallel fetches with graceful degradation, all 5 data sources hit simultaneously, 3-second timeout, brief renders without slow source rather than blocking. (4) Source attribution on every insight. Every concern and commitment links to the transcript, email, or meeting it came from; prevents hallucination from becoming a trust-breaking error. (5) Rules first, LLM when justified, "proposal opened 4x" is a webhook event (not AI), task suggestions are pattern matching (not AI); LLM enters for multi-signal interpretation only.`,

  'voice-agent':
    `Built 2026. Live voice agent, named Watson, available on every page of the portfolio via the nav mic and the homepage "Talk to my AI" button; anyone can talk to it in real time. Stack: VAPI (orchestration), Deepgram (STT, ~100ms latency), ElevenLabs (TTS), GPT-4o Mini. Problem: a contact form says you're interested in AI product work; a running AI system shows how you think about it. Key decisions: RAG split between a system prompt for identity and behavior rules and a separate knowledge base retrieved on demand, reduces cold-start latency vs loading everything upfront. Version two (Nov 2026): the agent knows which page the visitor is on and can open pages for them through a client-side navigate_to_page tool, restricted to a fixed allowlist the site re-checks; the site swaps page content in place only during a live call, so the call survives navigation; the knowledge base was rebuilt as short, facts-only chunks, each naming its entity and page, with all behavior rules moved into the prompt. Static hardcoded first message fires instantly instead of waiting 3–5 seconds for an LLM-generated opener. Audience detection routes conversations by role, recruiter gets a sharp summary, founder gets architecture decisions. Pronunciation dictionary via VAPI API maps "Dilith" → "Dil-ith" before text reaches the voice model. STT keyterm priming adds "Dilith," "Zuper," "VAPI" so Deepgram transcription is calibrated for the conversation's vocabulary. Model choice: GPT-4o Mini over GPT-4o, latency difference is audible in voice, and the reasoning ceiling on retrieval plus coherent speech doesn't require the larger model.`,

  'delphi':
    `Built 2026. Pre-filing tax intelligence layer for foreign-owned Delaware C-Corp founders. Live at delphi-tax.vercel.app. Stack: pure HTML, CSS, Vanilla JS + Claude Sonnet via Vercel serverless proxy. Zero npm packages, zero build step. Problem: foreign founders with 25%+ ownership in a Delaware C-Corp face a $25,000 annual IRS penalty for missing Form 5472, and most don't know the form exists. Most tax tools assume you already know which forms apply; Delphi starts from zero. Core architecture decision: "Rules decide. LLM explains." A deterministic JavaScript rule engine computes required filings, deadlines, tax estimates, penalty exposure, and a confidence score from 10 founder inputs. Claude Sonnet narrates the output. It never touches filing decisions, tax rates, deadlines, or penalties. Every output has a collapsible audit trail showing which rules fired. Key product decisions: (1) Progressive reveal form, fields unlock one at a time to reduce overwhelm for compliance-anxious founders. (2) Dev mode with scenario switcher, three deadline states (upcoming/imminent/overdue) switchable without re-filling the form, required for portfolio demos. (3) Zero npm. No dependency drift, works offline, entire codebase readable in one sitting. Four-screen flow: landing → intake (10 fields) → diagnosis (filings, deadlines, penalties, AI narration, confidence score) → handoff (filing readiness, "Proceed to filing with Inkle →"). Rule engine implements RULES.md. Every form code, deadline, and penalty traceable to IRS and state guidance. Honest caveat: rule accuracy relies on Dilith's research; would require CPA review before real users file based on it.`,

  'reeve':
    `Built 2026. Native Android budgeting app (Kotlin, Jetpack Compose, Room, WorkManager) with a Next.js web client on a shared Supabase backend. Private repo, Android APK sideloaded; web client at pfos-tracker.vercel.app (sign-in required). Problem: Indian banks text every money movement, so the SMS inbox is the only complete ledger, but budgeting apps make people type. Reeve implements Dilith's own system (salary cycles, a lifestyle cap, sinking funds, family-spend tags, credit cards without double counting) and fills it from bank SMS. Key decisions: (1) Persist the raw SMS to a local queue before anything else; identity is a hash of sender, second and text, so retries and inbox scans are idempotent. Origin: the earlier Expo version silently lost payments when Android blocked background network access. (2) Parse on the device; the server receives structured fields only, never message text. Unrecognised messages stay on the phone for 30 days. (3) Rules decide, nothing guesses: a transaction auto-files only if the account is known and a matching rule is marked auto-confirm; everything else goes to a review queue. 25 parser templates built from a corpus of 6,483 real messages (4,941 parseable). (4) Safe to spend is the lesser of cap remaining and bank balance minus unpaid fixed allocations, using balances read from bank SMS on the device. (5) Overspend is never shown in red on mobile. Honest caveats: single user, one person's banks only; a background delivery delay is undiagnosed; no offline outbox for manual writes; Google Play restricts SMS permissions so a public version would need a no-SMS path.`,
};

// ── Static page registry (non-MDX pages) ────────────────────────────────────
// Add entries here for Astro pages that can't be auto-detected from MDX.
const STATIC_PAGES: Array<{ path: string; label: string }> = [
  { path: '/', label: 'Home. Positioning, case study previews, essay previews, project previews, and contact.' },
  { path: '/about', label: 'Background, career arc, cognitive influences.' },
  { path: '/now', label: 'What Dilith is currently building, reading, and thinking about.' },
  { path: '/contact', label: 'Contact information. Open to conversations about AI product management, B2B SaaS, and consumer products.' },
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

  // Newest first, matching /projects. Frontmatter only carries a year, so the order is
  // explicit. A new project goes at the top; anything not listed falls to the end.
  const PROJECT_ORDER = ['reeve', 'delphi', 'superpilot', 'voice-agent', 'iris', 'winledger'];
  const rank = (slug: string) => {
    const i = PROJECT_ORDER.indexOf(slug);
    return i === -1 ? PROJECT_ORDER.length : i;
  };

  const projectItems = Object.entries(projectModules)
    .map(([path, mod]) => ({
      slug: slugFrom(mod.frontmatter, path),
      title: mod.frontmatter.title ?? '',
      date: mod.frontmatter.date ?? '',
      tags: mod.frontmatter.tags ?? [],
      fm: mod.frontmatter,
    }))
    .sort((a, b) => rank(a.slug) - rank(b.slug));

  // Merge MDX work with hardcoded non-MDX work entries
  const allWork = [...STATIC_WORK, ...workItems];

  // ── Page list section ──────────────────────────────────────────────────────
  const workPageLines = allWork.map(w => `/work/${w.slug}, Case study: ${w.title}.`).join('\n');
  const writingPageLines = writingItems.map(w => `/writing/${w.slug}, Essay: ${w.title}.`).join('\n');
  const projectPageLines = projectItems.map(p => `/projects/${p.slug}, Project: ${p.title}.`).join('\n');

  const sitePages = [
    ...STATIC_PAGES.map(p => `${p.path}, ${p.label}`),
    `/work, Work index. All product case studies.`,
    workPageLines,
    `/writing, Writing index. All product essays and teardowns.`,
    writingPageLines,
    `/projects, Projects index. All personal build logs.`,
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
  const content = `# Dilith Dinesh, dilithdinesh.com

## Who I am

Dilith Dinesh is a Product Manager and AI systems builder working in voice AI and health tech, at the boundary between customer reality and product systems. Since August 2026 he has been an Associate Product Manager at VoiceStack, an AI-powered phone platform for dental practices and DSOs, where the product problem is converting inbound patient calls into booked appointments. He works across an AI voice agent product for dental practices (writing evals, defining call flows, writing prompts and tool calls, customer and market research, build versus buy for the voice AI platform, and owning the product's unit economics) and an internal platform used by six teams across the company (aligning the teams, modelling requirements, prototyping, and prioritising). Before that he spent two years at Zuper, a B2B SaaS field service management platform. One year as a Forward Deployed Engineer, then as a Customer Product Manager, where he built the roofing vertical from scratch. He studied Computer Science at VIT University and is from Kerala, India. He is open to working anywhere.

The move from field service to healthcare was deliberate. His view is that leverage in vertical software is rarely in the feature list. It is in the operational moment nobody has instrumented yet. In field service that moment is dispatch; in dental it is the inbound phone call, where practices miss a large share of calls and most callers never leave a voicemail. Healthcare adds constraints field service never had: HIPAA coverage across every component touching patient data, TCPA consent rules on outbound contact, callers who are in pain and have no patience for a menu tree, and integrations into long-established practice management systems such as Dentrix, Eaglesoft, and Open Dental.

Beyond his day-to-day product work, he builds AI systems: a live voice agent on his portfolio site (named Watson), SuperPilot (an AI memory layer for B2B sales, prototyped on dummy data), Delphi (a pre-filing tax intelligence tool for foreign founders), and a product spec for an AI shopping discovery layer. He also builds consumer tools, such as Reeve, an Android budgeting app. He does this to demonstrate how he thinks about AI product decisions, not just to describe them. He built the voice agent before joining a voice AI company. He is not actively searching, but is open to a strong opportunity in AI product or SaaS product management. His experience is B2B, and he is excited about consumer products too.

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
