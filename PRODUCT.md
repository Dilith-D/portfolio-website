# Product

## Register

brand

## Users

**Primary visitor: hiring managers and founders** at Series A/B product-led companies — evaluating Dilith for APM or product roles. They arrive from LinkedIn, referrals, or Twitter/X links. They are busy, skeptical of polished portfolio sites, and specifically looking for evidence of how someone thinks — not a resume repackaged as HTML.

**Secondary visitor: other PMs and builders** — curious about the teardowns, build logs, or the voice agent. They self-select from writing shares and may not be in a hiring context at all.

The common thread: both audiences are high-signal readers who can tell the difference between someone performing expertise and someone who actually has it.

## Product Purpose

dilithdinesh.com is a proof-of-thinking portfolio for an AI PM who came up through operational work. Its purpose is to create the conditions for a conversation — with a hiring manager, a founder, or a peer — that a resume cannot. Every page either tells a specific, honest story (case studies, build logs) or demonstrates taste and craft (the site itself).

Success looks like: a visitor reading one case study or teardown, thinking "this person actually sees things clearly," and reaching out — without Dilith having written a single sentence that says "I am a strong communicator."

The site does not chase impressions. It earns trust.

## Brand Personality

**Precise · Grounded · Self-aware**

Voice: writes like someone explaining a decision to a smart colleague — not to impress them, but to think through it clearly. Uses em dashes, not bullet points. Says "I'd do it differently" and means it. Never uses the word "passionate."

Emotional goal: the reader should finish a case study feeling like they've met a person, not read a document. Confidence without posturing. Craft that shows without announcing itself.

## Anti-references

- **Generic dark-mode portfolio sites** — agency-adjacent, all glass cards and particle backgrounds, design performing craft rather than content earning trust
- **Resume-site format** — structured skills section, "I am experienced in X", bullet-pointed achievements
- **SaaS landing page aesthetic** — hero metric template, gradient text, identical 3-column feature rows, "Elevate your workflow" copywriting
- **AI-slop portfolios** — any site where someone could look at it and say "AI made this" without doubt — cookie-cutter layouts, generic placeholder names, filler superlatives

The specific anti-reference for tone: a LinkedIn profile padded with keywords. Everything on this site must be the exact opposite of that.

## Design Principles

1. **Content earns its own weight.** No element on the page exists to make the site *look* like a portfolio. If something doesn't make the content easier to read or the person easier to trust — remove it. The darkness, the motion, the orbit animation — all serve readability and credibility, not decoration.

2. **Show the thinking, not the conclusion.** The case studies include what went wrong and what would be done differently. The build logs include tradeoffs and dead ends. The voice agent is live. This is a site that demonstrates judgment, not just describes it.

3. **Practice what you preach.** The person positioning themselves for AI product work built an AI voice agent for their portfolio. The person who writes about habit loops built a tool to track their own work patterns. The site is evidence, not claim.

4. **Restraint over addition.** The hardest decisions on the site are the things not there — no skills table, no testimonials section, no progress bars. The design earns trust through what it removes as much as what it includes.

5. **One person, not a brand.** This is a portfolio for a specific individual with specific opinions and a specific career arc, not a generalized professional presence. The personality is in the prose, the easter eggs, the football reference in the About page. Specificity is credibility.

## Accessibility & Inclusion

- WCAG AA minimum contrast on all text, both dark and light modes
- Dark mode is the default experience (dark by default, light only if explicitly saved to localStorage)
- Reduced motion: all reveal animations respect `prefers-reduced-motion: reduce` — elements become instantly visible with no transition
- No motion-only affordances — all interactive state is communicated without animation dependency
- Font sizes: body min 16px, metadata min 11px (tracking-widest compensates for small size)
