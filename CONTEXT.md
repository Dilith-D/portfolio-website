# CONTEXT.md — Full Build Context
## dilithdinesh.com

This document captures the complete history, decisions, and reasoning behind this portfolio.
Hand this to any AI model at the start of a session and it can pick up without re-deriving everything.

---

## What This Site Is

Personal portfolio for **Dilith Dinesh**, Customer Product Manager at Zuper (B2B SaaS, field service management). The site serves one primary goal: convert a hiring manager or recruiter into someone who reaches out. It is not an agency portfolio, not a startup landing page, not a resume in HTML. It should read like a well-edited journal from someone who thinks carefully and builds seriously.

**Live at:** https://dilithdinesh.com
**Deployed:** Netlify
**Stack:** Astro 5 + Tailwind CSS v3 + MDX + React (islands only)

---

## Build History

### v1 (Original Spec — 9 Sessions)

Built in nine Claude Code sessions following a tight CLAUDE.md spec. Result: a warm off-white (linen) light-mode-only portfolio with:
- 10 pages (index, work index, 2 case studies, writing index, 2 essays, projects index, 2 projects, about, now, contact, 404, secret)
- 11 SVG diagram components embedded in MDX case studies
- PostHog analytics
- 20+ easter eggs tracked via localStorage

### v2 (Dark Redesign + Feature Expansion)

A full visual rebuild adding dark mode, dynamic components, and several features beyond the original spec. Key additions:

| Feature | File(s) | Why |
|---------|---------|-----|
| Dark mode | `global.css`, `Nav.astro`, `Base.astro` | Portfolio readers often work at night; dark mode is a credibility signal in a technical PM context |
| Bento grid home layout | `index.astro`, `global.css` | The original equal-card-row layout was the most AI-generic pattern possible. Replaced with 1.85fr/1fr asymmetric bento. |
| Floating glass nav pill | `Nav.astro` | Fixed full-width bar with border-bottom-on-scroll felt like every startup site. A floating pill reads as designed, not defaulted. |
| Vapi voice assistant | `VoiceAssistant.tsx`, `Nav.astro` | Differentiation. Recruiters get a voice interface to ask questions about Dilith directly. Powered by a custom Vapi assistant with trained context. |
| Dynamic Island | `VoiceAssistant.tsx` | The voice UI is a fixed pill at top-center — Apple Dynamic Island pattern, appropriate for the "this person builds things" positioning. |
| Animated WebGL background | `AnimatedBackground.astro` | Replaces a static CSS gradient. Domain-warp fbm shader produces slow organic movement. The design goal: make the page feel alive without distracting from reading. |
| Scroll reveal animations | `global.css`, `Base.astro` | Elements enter on scroll via IntersectionObserver. Adds rhythm without delaying content. |
| Film grain overlay | `Base.astro`, `global.css` | Canvas-generated noise texture at z-index 200. Adds material depth to what would otherwise be flat digital surfaces. |
| BorderGlow on cards | `global.css`, component scripts | Pointer-tracking warm-white arc that illuminates the nearest card edge. Subtle. Disappears on mobile (hover-only). |
| Hero stagger animation | `index.astro` | 5-element stagger (eyebrow → name → tagline → body → buttons) at 0.05s/0.15s/0.3s/0.45s/0.6s delays. Signals craft on first load. |
| Animated marquee | `index.astro` | Context ribbon below hero. Reduces the need to read to understand the site's domain. |
| Instrument Serif hero name | `index.astro` | The hero name uses Instrument Serif (italic, weight 400) rather than Cabinet Grotesk. Creates warmth and personality contrast against the system's otherwise clean sans-serif. NOTE: This contradicts CLAUDE.md which specifies Cabinet Grotesk only — this was an intentional exception for the hero name specifically. All other display text remains Cabinet Grotesk. |

---

## File Map (Critical Paths)

```
src/
├── layouts/
│   ├── Base.astro          — wraps every page; imports Nav, Footer, VoiceAssistant, AnimatedBackground
│   ├── Prose.astro         — extends Base; adds ReadingProgress, article header
│   └── CaseStudy.astro     — extends Prose; adds end-nav, section numbering
├── components/
│   ├── AnimatedBackground.astro   — WebGL canvas, injected globally via Base.astro
│   ├── VoiceAssistant.tsx         — React island, Vapi integration, Dynamic Island UI
│   ├── Nav.astro                  — floating glass pill, dark toggle, mic button
│   ├── Footer.astro               — email / copyright / LinkedIn row
│   ├── CaseStudyCard.astro        — bento card with BorderGlow, featured variant
│   ├── EssayCard.astro            — borderless essay row
│   ├── ProjectCard.astro          — same card as CaseStudyCard, different fields
│   ├── ReadingProgress.astro      — 2px blue top bar on Prose/CaseStudy layouts
│   ├── MetricsSummary.astro       — key metrics display in case studies
│   ├── PullQuote.astro            — left-border quote block in MDX
│   ├── SpecBlock.astro            — surface-tinted code/spec block in MDX
│   ├── posthog.astro              — PostHog analytics injection
│   ├── BouquetEgg.astro           — easter egg component
│   └── diagrams/                  — 11 SVG diagram components used in MDX
├── pages/
│   ├── index.astro                — homepage (hero + bento work + writing rows + projects)
│   ├── work/index.astro           — work index (all case studies)
│   ├── work/golden-account-model.mdx
│   ├── work/booking-stopgap.mdx
│   ├── work/ai-shopping-buddy.mdx
│   ├── writing/index.astro
│   ├── writing/rapido-teardown.mdx
│   ├── writing/spotify-wrapped.mdx
│   ├── projects/index.astro
│   ├── projects/iris.mdx
│   ├── projects/pulseboard.mdx
│   ├── about.astro
│   ├── now.astro
│   ├── contact.astro
│   ├── 404.astro
│   └── secret.astro               — easter egg dashboard
└── styles/
    └── global.css                 — design tokens, card system, bento, essay rows, reveal animations
```

---

## Design System

Full specification in `DESIGN.md`. Summary:

### Color Tokens

```css
/* Light mode (:root) */
--color-background: #F4F0E8   /* warm cream page bg */
--color-surface:    #EAE5DA   /* surface tints */
--color-card-bg:    #FFFFFF   /* white cards on warm linen — deliberate separation */
--color-primary:    #1C1814   /* near-black text */
--color-secondary:  #7A7268   /* metadata, labels */
--color-blue:       #2D5BE3   /* functional only */
--color-cta-bg:     #1C1814
--color-cta-fg:     #F4F0E8

/* Dark mode (html.dark) */
--color-background: #0C0A09   /* near-black, warm undertone */
--color-surface:    #141210
--color-card-bg:    #141210
--color-primary:    #E8E5DF   /* warm off-white */
--color-secondary:  #6E6B65
--color-blue:       #4A7CF0
--color-cta-bg:     #E8E5DF
--color-cta-fg:     #0C0A09
```

### Fonts

| Role | Font | Class |
|------|------|-------|
| Display | Cabinet Grotesk (woff2, self-hosted) | `font-display` |
| Body/UI | Inter (ttf variable, self-hosted) | `font-body` |
| Prose | Lora (ttf variable, self-hosted) | `font-prose` |

Exception: hero name in `index.astro` uses Instrument Serif loaded from Google Fonts. All other display text uses Cabinet Grotesk.

### Strict Rules

- **Blue appears only in:** reading progress bar, Dynamic Island active state, maximum 2 CTA buttons site-wide
- **backdrop-filter on exactly two elements:** nav pill, Dynamic Island
- **Cards never use backdrop-filter** — GPU performance on mobile/Safari
- **All hover states behind** `@media (hover:hover) and (pointer:fine)`
- **No `transition: all`** — always specify exact properties
- **Body text max-width: 740px** — hard cap, never exceeded
- **Section gap: 80px** — `py-[80px]`
- **No gradient text** (`background-clip: text`)
- **No side-stripe accent borders** (`border-left/right > 1px`)

---

## Animated Background — Full Technical Detail

### What It Does

`src/components/AnimatedBackground.astro` injects a full-screen fixed WebGL canvas (`z-index: 0`) behind all content. The fragment shader uses the Inigo Quilez domain-warp fbm technique: five octaves of value noise, warped twice through itself, producing slow organic liquid movement. The animated element is an indigo/electric blue that flows through the page background.

### How It's Integrated

Imported in `Base.astro` — runs on every page. The script:
1. Removes any existing `#bg-canvas` (HMR safety)
2. Creates a canvas and inserts it as `document.body.firstChild`
3. Tries WebGL2, falls back to WebGL1, logs warning and returns if neither available
4. On success: adds `html.bg-canvas-ready` class
5. CSS gates: `html.bg-canvas-ready body { background: transparent }` + `html.bg-canvas-ready main, footer { position: relative; z-index: 1 }`
6. Palettes swap on `MutationObserver` watching `html.dark`
7. RAF pauses on `visibilitychange` (tab hidden)
8. `prefers-reduced-motion`: one frame rendered, loop stops

### Z-Index Stack

```
z-index: 0    #bg-canvas (fixed, full page, pointer-events: none)
z-index: 1    main, footer (promoted via html.bg-canvas-ready)
z-index: 50   Nav pill
z-index: 90   Dynamic Island
z-index: 200  #grain (film grain overlay, mix-blend-mode: overlay)
```

### Palettes

```js
const DARK = {
  ca: [0.047, 0.039, 0.035],  // #0C0A09 — matches page bg
  cb: [0.030, 0.180, 0.930],  // electric blue vivid
  cc: [0.020, 0.080, 0.450],  // deep blue shadow
  speed: 0.14,
};
const LIGHT = {
  ca: [0.957, 0.941, 0.910],  // #F4F0E8 — matches page bg
  cb: [0.220, 0.260, 0.820],  // #3842D1 indigo (not pure electric blue)
  cc: [0.720, 0.730, 0.940],  // pale lavender
  speed: 0.10,
};
```

**Why indigo, not electric blue, in light mode:** Pure electric blue sits 190° from warm linen on the hue wheel — they fight. Indigo (hue ~235°, slightly redder) bridges warm and cool without losing the blue accent character.

### Critical Implementation Notes

- **ASCII-only GLSL source:** Build shader strings as arrays of ASCII strings joined with `\n`. Non-ASCII characters (em dashes `—`, arrows `→`) cause silent compile failures on strict GPU GLSL parsers. This is the most common gotcha when editing the shader.
- **`smoothstep(0.48, 0.80, f)` blend:** Concentrates blue to the top ~30% of fbm peaks — flowing veins, not a uniform wash. Widening the range (e.g., `0.35, 0.80`) makes the effect too uniform.
- **Voice-active + canvas:** When both are active in light mode, body gradient orbs must be blue-tinted (not warm orange). See `global.css` lines `html.bg-canvas-ready:not(.dark).voice-active body`.

---

## Voice Assistant — Full Technical Detail

### What It Does

A Vapi-powered AI assistant lets visitors ask questions about Dilith via voice. The assistant has a custom system prompt trained on Dilith's background, case studies, and positioning.

### Architecture

- `VoiceAssistant.tsx` — React island, rendered once in `Base.astro` via `client:only="react"`
- All Vapi state lives here: `CallState = 'idle' | 'connecting' | 'listening' | 'speaking'`
- Voice toggle triggers: nav mic button AND hero "Ask my AI" button both dispatch `document.dispatchEvent(new CustomEvent('voice:toggle', { bubbles: true }))`
- `VoiceAssistant` listens for this event via `document.addEventListener('voice:toggle', handleToggle)`

### Vapi Credentials

```
Key:          ec84568a-9bfa-4c93-91cc-a3b7447abc96
Assistant ID: a48874e8-dd51-48ad-a536-741c0bfabcc6
```

Do not change these without updating the Vapi dashboard.

### Dynamic Island UI

Fixed pill at `top: 5.25rem, left: 50%`. Shows: status dot + state label ("Connecting" / "Listening" / "Speaking") + animated waveform (when active) + call timer + End button.

Enters: `opacity 260ms, transform 320ms var(--ease-drawer)` — scale from 0.88 + 10px above
Exits: `opacity 200ms, transform 240ms var(--ease-drawer)`

### End Call Button — Critical Note

`handleEnd` must call `setState('idle')` and `setSeconds(0)` directly, in addition to `vapiRef.current?.stop()`. Vapi's `call-end` event is not guaranteed to fire on every `stop()` call under certain network conditions. The direct state reset ensures the UI closes immediately. The `call-end` listener is kept as a secondary safety net.

```ts
const handleEnd = () => {
  vapiRef.current?.stop();
  setState('idle');    // required — do not remove
  setSeconds(0);       // required — do not remove
};
```

### Page Ambient Effect

When voice is active, `html.voice-active` is added to `document.documentElement`. CSS uses this to intensify body gradient orbs:
- Dark mode: blue orb opacity increases from 0.11 to 0.22
- Light mode without canvas: warm amber orbs intensify
- Light mode with canvas: blue-tinted orbs (not warm — warm fights the indigo canvas)

---

## Dark Mode System

### Toggle Location

Nav pill, right side. Renders a sun/moon SVG that swaps on click.

### Implementation

`localStorage.getItem('theme')` → `'dark'` or `null` (light).

In `Base.astro` `<head>`: an inline script applies `html.dark` before the page renders (prevents flash):
```js
const saved = localStorage.getItem('theme');
if (saved === 'dark') document.documentElement.classList.add('dark');
```

### CSS Approach

All tokens are CSS custom properties on `:root`. Dark mode overrides them on `html.dark`:
```css
:root { --color-background: #F4F0E8; }
html.dark { --color-background: #0C0A09; }
```

Tailwind utility classes use `var(--color-*)` through the design token system, so they automatically respond without any `dark:` prefix utilities needed.

---

## Easter Egg System

20+ easter eggs tracked in `localStorage` under key `'dd-found-eggs'` (array of IDs). Discoverable at `/secret`.

Eggs are triggered by:
- Triple-clicking the hero name
- Hovering the word "boundary" in the tagline
- Hovering the word "honest" anywhere on the site
- Opening the browser console
- Printing the page
- Right-clicking
- Resizing to viewport width 420px
- Tab blurring (switching away from tab)
- Typing "product" on a keyboard
- Staying idle for 5 minutes
- Being a return visitor
- Selecting 80+ characters of text
- Clicking the logo 3 times
- Keyboard-navigating with Tab 3 times
- Visiting all 5 main pages in a session
- Hovering the "2 years" text (element removed but guard kept)
- Reading for 4+ minutes on first visit
- Visiting at specific times (midnight–5am, Monday morning, Friday evening)

---

## Copy Rules

These govern all text on the site. Do not violate them when writing new content:

- No exclamation marks
- No "I am passionate about..."
- No startup buzzwords (seamless, unleash, next-gen, elevate)
- Em dashes (—) for pauses, not hyphens
- Tags: UPPERCASE with · separators
- Dates: "Jan 2025" or "2024" — never "January 2025, 14th"
- No bullet-pointed skill lists anywhere
- About page: prose only

---

## Known Decisions That Might Seem Wrong

### Why Inter is used despite design skill banning it

The `design-taste-frontend` skill bans Inter and prefers Geist/Satoshi/Cabinet Grotesk. Inter is kept because:
1. It is specified in CLAUDE.md (the authoritative spec)
2. It is self-hosted (no CDN dependency)
3. It reads well at the small sizes this site uses for UI text (11px–15px)
4. Changing it would require auditing 20+ components and all prose typography

If you want to swap Inter for something else, the change lives in `tailwind.config.mjs` (`fontFamily.body`) and `global.css` (`@font-face` + `html { font-family: ... }`). You would also need to add the new font to `/public/fonts/`.

### Why Instrument Serif appears in the hero

CLAUDE.md specifies Cabinet Grotesk for all display. The hero name uses Instrument Serif (Google Fonts CDN) as an exception. It was added to give the hero warmth and personality contrast. If you want to remove it and use Cabinet Grotesk instead, edit `.hero-name` in `index.astro`'s scoped styles.

### Why cards use white in light mode but dark in dark mode

Light mode `--color-card-bg: #FFFFFF` — white cards on warm linen give real visual separation (the alternative `#EAE5DA` was nearly the same as the page background `#F4F0E8` — cards disappeared).

Dark mode `--color-card-bg: #141210` — dark mode cards are `#141210` on `#0C0A09` — a smaller absolute difference but perceptually more legible because human vision is more sensitive to contrast at low luminance.

### Why Tailwind v3 and not v4

Migrated from v3 to v4 once and it broke entirely — `@tailwindcss/vite` failed to generate utility CSS. Rolled back. Currently on Tailwind v3 with `@tailwindcss/typography` plugin via `tailwind.config.mjs`. Do not attempt to migrate again without a test branch.

---

## Versioning + Staging/Prod Workflow

### Remotes

| Remote | Repo | Purpose |
|--------|------|---------|
| `staging` | `github.com/Dilith-D/internal-portfolio` | https://internal-portfolio-dilith.netlify.app |
| `origin` | `github.com/Dilith-D/portfolio-website` | https://dilithdinesh.com |

Netlify auto-builds on every push to either remote.

### Tag convention

`v<major>.<minor>` — integers only.
- Major: redesigns / visual overhauls
- Minor: content, new case studies, feature additions

### Version index

| Tag | Commit | Description |
|-----|--------|-------------|
| v1.0 | `556710b` | Original design, voice assistant, all content |
| v2.0 | `57c3192` | Bento redesign, WebGL animated background, dark mode contrast fix |

### Prod push sequence

```
1. git push --force staging master   ← triggers staging build
2. Verify staging URL looks correct
3. git tag -a v2.x HEAD -m "v2.x: what changed"
4. git push origin --tags
5. git push origin master            ← triggers prod build
```

### Rollback any version in ~10 seconds

```bash
git push origin v1.0:master --force
```

---

## How to Start a Session

1. Read `CLAUDE.md` — authoritative technical spec
2. Read `DESIGN.md` — design tokens, rules, and the animated background/voice assistant spec
3. Read `CONTENT.md` — all actual copy and content
4. Read this file (`CONTEXT.md`) — history, decisions, and reasoning
5. If editing a specific page, read that file before touching it
6. Run `npm run dev` and test in browser before committing
7. Test both dark and light mode for any visual change

---

*Last updated: May 2026. Reflects the state after: full v2 dark redesign, WebGL animated background (all pages), voice assistant with working end-call button, light mode audit and fixes (white cards, single background gradient, indigo canvas palette).*
