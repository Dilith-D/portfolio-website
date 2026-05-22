# DESIGN.md — Design Strategy & Visual Brief
## dilithdinesh.com (v2 — Dark Redesign)

This is the single source of truth for all design decisions on this site.
Reference it at the start of every design session. Update it when you change the design.
The old version (v1) used a warm off-white base. This version shifts to dark-primary while keeping the same underlying character.

---

## Design Philosophy

### Three Governing Words
**Structured · Considered · Grounded**

### Three Words to Avoid
**Flashy · Minimal-for-minimal's-sake · Corporate**

### The Site Should Feel Like
> A well-edited journal from someone who thinks carefully and builds seriously.

Not an agency portfolio. Not a startup landing page. Not a resume site in dark mode.

The visual register is dark and cinematic — but the identity doesn't change. The darkness serves the content; it doesn't perform craft for its own sake.

### Core Design Principle
Every decision serves readability and credibility. If an element doesn't make the content easier to read or the person easier to trust — remove it. This principle survives the redesign intact.

---

## Color System

### Strategy: Restrained Dark
Single accent (blue) appears in functional roles only. The dark surface carries the mood. No colored sections, no ambient glow competing with content.

### Dark Mode Tokens (primary experience — `html.dark`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#0C0A09` | Page background — near-black, warm undertone |
| `--color-surface` | `#141210` | Cards, spec blocks, code blocks |
| `--color-border` | `rgba(255,255,255,0.07)` | Dividers, subtle separators |
| `--color-border-card` | `rgba(255,255,255,0.09)` | Card outer-wrap gradient stop |
| `--color-primary` | `#E8E5DF` | Primary text — warm off-white |
| `--color-secondary` | `#B8B2AA` | Metadata, dates, tags, labels, captions |
| `--color-blue` | `#4A7CF0` | Functional only — see Blue Rule below |
| `--color-card-bg` | `#141210` | Solid card body (no blur — see Glass Rule) |
| `--color-card-sheen` | `inset 0 1px 0 rgba(255,255,255,0.05)` | Subtle top-edge highlight on cards |
| `--color-cta-bg` | `#E8E5DF` | Primary CTA background |
| `--color-cta-fg` | `#0C0A09` | Primary CTA text |

### Light Mode Tokens (`:root` / default)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#F4F0E8` | Page background — warm cream |
| `--color-surface` | `#EAE5DA` | Surface tints (non-card) |
| `--color-border` | `rgba(0,0,0,0.07)` | Dividers |
| `--color-border-card` | `rgba(0,0,0,0.08)` | Card outer-wrap gradient stop |
| `--color-primary` | `#1C1814` | Primary text |
| `--color-secondary` | `#5C5650` | Metadata, secondary text |
| `--color-blue` | `#2D5BE3` | Functional only — see Blue Rule below |
| `--color-card-bg` | `#FFFFFF` | Card body — white on warm linen for real separation |
| `--color-card-sheen` | `inset 0 1px 0 rgba(255,255,255,1), 0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)` | Card top edge + soft lift |
| `--color-cta-bg` | `#1C1814` | Primary CTA background |
| `--color-cta-fg` | `#F4F0E8` | Primary CTA text |

### Easing Constants

```css
--ease-ui:     cubic-bezier(0.23, 1, 0.32, 1);   /* all UI interactions */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* panels, islands, drawers */
```

Use these everywhere. Never write a raw `ease`, `ease-in-out`, or `linear` in an interaction context.

### Body Background Gradients (fallback — shown when WebGL canvas unavailable)

These show only when the animated background fails to init (`html.bg-canvas-ready` class absent). When the canvas is running, `html.bg-canvas-ready body { background: transparent }` takes over. Do not make these gradients dramatic — they are a silent fallback.

```css
/* Dark — three-point ambient depth */
html.dark body {
  background:
    radial-gradient(ellipse 75% 55% at -8%  -5%,   rgba(74,124,240,0.11)   0%, transparent 60%),
    radial-gradient(ellipse 70% 55% at 108% 105%,  rgba(160,110,50,0.09)   0%, transparent 60%),
    radial-gradient(ellipse 85% 65% at 50%  28%,   rgba(255,248,230,0.022) 0%, transparent 65%),
    #0C0A09;
}

/* Light — single intentional light source anchored to top-left where hero name sits */
body {
  background:
    radial-gradient(ellipse 90% 70% at 15% 0%, rgba(220,215,200,0.5) 0%, transparent 65%),
    #F4F0E8;
}
```

---

## Animated Background (WebGL Domain Warp)

### Overview

`src/components/AnimatedBackground.astro` — lives in `Base.astro`, runs on **every page**.

A full-screen fixed WebGL canvas sits behind all content (`z-index: 0`). The fragment shader uses Inigo Quilez's domain-warp fbm technique: five octaves of value noise, warped twice, producing slow organic liquid movement. The moving element is **indigo/electric blue** — not warm, not neutral — creating a cool accent that breathes within the warm page base.

### Z-Index Stacking (order from bottom to top)

```
z-index: 0    Canvas (#bg-canvas) — fixed, full page
z-index: 1    main, footer — promoted via html.bg-canvas-ready
z-index: 50   Nav pill
z-index: 90   Dynamic Island (VoiceAssistant)
z-index: 200  Grain overlay
```

### CSS Integration

The script adds `html.bg-canvas-ready` when WebGL initialises successfully. CSS gates all canvas-dependent rules on this class:

```css
html.bg-canvas-ready body { background: transparent; }

html.bg-canvas-ready main,
html.bg-canvas-ready footer {
  position: relative;
  z-index: 1;
}
```

If WebGL fails (browser blocked, old GPU), the class is never added and the fallback body gradient shows.

### Color Palettes (uniform values passed as GL uniforms)

| Mode | `u_ca` (base) | `u_cb` (peaks) | `u_cc` (shadow) | speed |
|------|--------------|----------------|-----------------|-------|
| **Dark** | `[0.047, 0.039, 0.035]` = `#0C0A09` | `[0.030, 0.180, 0.930]` = electric blue | `[0.020, 0.080, 0.450]` = deep blue | `0.14` |
| **Light** | `[0.957, 0.941, 0.910]` = `#F4F0E8` | `[0.220, 0.260, 0.820]` = `#3842D1` indigo | `[0.720, 0.730, 0.940]` = pale lavender | `0.10` |

**Why indigo not electric blue in light mode:** Pure electric blue (`hue ~228°`) sits 190° from warm linen (`hue ~38°`) — they fight. Indigo (`hue ~235°`, slightly redder) bridges the warm/cool registers without losing the blue accent character.

### Blend Formula

```glsl
float blend = smoothstep(0.48, 0.80, f);
vec3 col = mix(u_ca, u_cb, blend);
col = mix(col, u_cc, clamp(length(q) - 0.40, 0.0, 0.6));
```

`smoothstep(0.48, 0.80, f)` concentrates the blue to the top ~30% of fbm peaks — creates flowing veins, not a uniform wash.

### Behavior Rules

- `prefers-reduced-motion`: one frozen frame rendered, RAF loop stops
- `document.visibilitychange`: pauses RAF when tab hidden, resumes when visible
- HMR safety: `document.getElementById('bg-canvas')?.remove()` at script top prevents canvas accumulation on hot reload
- GLSL source built as an array of ASCII-only strings joined with `\n` — non-ASCII characters (em dashes, arrows) cause silent compile failures on strict GPU drivers
- Theme toggle: `MutationObserver` on `document.documentElement` watches class changes, swaps uniforms when `html.dark` changes

### Voice-Active Canvas-Aware Overrides

When the canvas is running AND voice is active, body background orbs must be blue-tinted (not warm orange, which would fight the blue canvas):

```css
html.bg-canvas-ready.dark.voice-active body {
  background:
    radial-gradient(ellipse 75% 55% at -8%  -5%,  rgba(74,124,240,0.22)   0%, transparent 60%),
    radial-gradient(ellipse 70% 55% at 108% 105%, rgba(160,110,50,0.09)   0%, transparent 60%),
    radial-gradient(ellipse 85% 65% at 50%  28%,  rgba(255,248,230,0.022) 0%, transparent 65%);
}

html.bg-canvas-ready:not(.dark).voice-active body {
  background:
    radial-gradient(ellipse 70% 50% at -5%  -5%,  rgba(80,100,220,0.14)  0%, transparent 58%),
    radial-gradient(ellipse 65% 50% at 108% 108%, rgba(100,120,240,0.09) 0%, transparent 58%);
}
```

---

## The Blue Rule

Blue (`#4A7CF0` dark / `#2D5BE3` light) appears **only** in:

1. Reading progress bar (2px top line — functional)
2. Dynamic Island waveform + active border (functional voice indicator)
3. Maximum 2 CTA buttons site-wide

Blue does **not** appear in: card hover effects, BorderGlow glows, mic button active state, body gradients, section highlights, or anywhere decorative. When you're tempted to add blue somewhere new — don't. The scarcity is the signal.

---

## The Glass Rule

`backdrop-filter: blur()` appears on **exactly two elements**:

1. **Nav pill** — the floating navigation
2. **Dynamic Island** — the voice assistant overlay

Glass does **not** appear on work cards, project cards, essay rows, spec blocks, or any other component.

Multiple overlapping `backdrop-filter` elements in a scrolling container cause serious GPU thrashing on mobile and Safari. Cards sitting on a fixed-gradient background don't benefit from blur — there's nothing interesting behind them to blur through. The visual sophistication comes from the double-bezel gradient border, not the blur.

### Card Pattern (double-bezel, no blur)

```css
/* Outer wrapper — gradient border only */
.card-wrap {
  border-radius: 1.5rem;
  padding: 1px;
  background: linear-gradient(145deg, var(--color-border-card), rgba(128,128,128,0.03));
  position: relative;
}

/* Inner core — solid surface, no backdrop-filter */
.card-body {
  border-radius: calc(1.5rem - 1px);
  background: var(--color-card-bg);
  box-shadow: var(--color-card-sheen);
}
```

### BorderGlow — Warm White Only

The glowing arc on card hover uses warm white, never blue:

```css
/* The glow color for BorderGlow arcs */
--glow-color: rgba(255, 255, 255, 0.12);  /* never --color-blue */
```

---

## Typography System

### Typeface Stack

| Role | Font | Where Used |
|------|------|------------|
| **Display** | Cabinet Grotesk | Hero, page headers, section headers, card titles |
| **Body / UI** | Inter | Navigation, labels, metadata, tags, buttons |
| **Prose** | Lora | Essay body, case study body, about page, pull quotes |

The font stack is **unchanged from v1**. What changes is how boldly Cabinet Grotesk is used. No new display font is introduced. Cabinet Grotesk at large scale with tight tracking achieves cinematic weight without reaching for a trendy typeface.

Adding Instrument Serif (or any of: Cormorant, Fraunces, Newsreader, Playfair Display, Syne) would push the site into the editorial-typographic aesthetic lane — display serif italic + tracked uppercase labels + dark monochromatic restraint. That lane is saturated. Cabinet Grotesk stays.

The Tailwind alias is `font-display`. There is no `font-serif` alias. If a session prompt says `font-serif`, read it as `font-display`.

### Cabinet Grotesk — New Scale

```
Hero name:        clamp(72px, 9vw, 112px)   font-medium   tracking-[-0.04em]   leading-none
Page h1:          clamp(40px, 5vw, 56px)    font-medium   tracking-[-0.03em]   leading-tight
Section headers:  32px                       font-medium   tracking-[-0.02em]   leading-snug
Card titles:      24px                       font-medium   leading-snug
Case study h1:    clamp(36px, 4.5vw, 52px)  font-medium   tracking-[-0.025em]  leading-tight
```

### Inter (font-body) — Unchanged from v1

```
Navigation:   14px  font-normal  tracking-wide
Tags/Labels:  11px  font-medium  UPPERCASE  tracking-[0.15em]
Metadata:     14px  font-normal  text-secondary
Button text:  15px  font-medium
Body UI:      16px  font-normal  leading-relaxed
```

### Lora (font-prose) — Unchanged from v1

```
Essay/case body:  18px  font-normal  leading-[1.88]
Essay headers:    32px  font-medium  leading-tight
Pull quotes:      24px  italic       leading-relaxed
```

### Reading Width — Unchanged

**All body text is capped at 740px. Never wider. Non-negotiable.**

---

## Layout System

### Grid and Widths

```
Max reading width:  740px   — HARD RULE, never exceed
Max layout width:   1100px  — centered with mx-auto
Mobile margin:      24px each side (px-6)
Tablet margin:      48px each side
```

### Spacing Scale

All spacing is multiples of 8px.

| Use Case | Value | Tailwind |
|----------|-------|----------|
| Between label and value | 4px | `gap-1` |
| Internal padding | 8px | `p-2` |
| Between related elements | 16px | `gap-4` |
| Within components | 24px | `p-6` |
| Between major sections | 80px | `py-[80px]` |
| Hero padding | 120px | `py-[120px]` |

---

## Navigation: Floating Glass Pill

```
Outer wrapper:  position fixed, top-0, full-width, z-100, pointer-events: none
Inner pill:     max-width: min(580px, calc(100vw - 3rem))
                backdrop-filter: blur(24px) saturate(160%)
                border: 1px solid var(--color-border)
                border-radius: 9999px
                padding: 0.6rem 0.6rem 0.6rem 1.5rem
                pointer-events: all

Scroll >60px:   darken pill via rAF + ticking boolean
Transition:     background 220ms var(--ease-ui), border-color 220ms var(--ease-ui)

Logo:           font-display, italic, 1.05rem, --color-primary
Links:          font-body, 0.8125rem, --color-secondary
                hover: --color-primary, 150ms var(--ease-ui)
                ONLY via @media (hover:hover) and (pointer:fine)
Active:         --color-primary

Right side:     mic button → theme toggle → Contact CTA pill
```

---

## Animation Rules

### Duration Reference

| Element | Enter | Exit |
|---------|-------|------|
| Button press feedback | 120ms | — |
| Hover states (color, border) | 150ms | 150ms |
| Nav pill on scroll | 220ms | 220ms |
| Tooltips, small elements | 150ms | 120ms |
| Dynamic Island appear | 260ms opacity / 320ms transform | 200ms opacity / 240ms transform |
| Hero stagger (each step) | 0.85s (first-load only) | — |
| Scroll reveals | 700ms | — |
| Marquee (constant) | linear, no easing | — |

Exit animations are always shorter than entrances.

### Hard Rules (violations break the review checklist)

- No `transition: all` — specify exact properties every time
- No `ease-in` on entering elements — use `--ease-ui` or `ease-out`
- No `scale(0)` as animation start state — minimum `scale(0.9)` with opacity
- No `backdrop-filter` outside nav + Dynamic Island
- No `will-change` preemptively — only inside `:hover` or `.animating` states
- All hover states behind `@media (hover:hover) and (pointer:fine)` — no exceptions
- All interactive elements get `transform: scale(0.93–0.97)` on `:active`
- No animations that delay reading content

### Hover Guard (required on every hover animation)

```css
@media (hover: hover) and (pointer: fine) {
  .element:hover { /* hover styles here */ }
}
```

### Scroll Reveals

Elements with class `reveal`:
- Initial: `opacity: 0; transform: translateY(22px)`
- Visible: `opacity: 1; transform: translateY(0)`
- Transition: `opacity 0.7s var(--ease-ui), transform 0.7s var(--ease-ui)`
- IntersectionObserver: threshold 0.07, rootMargin `"0px 0px -28px 0px"`, unobserve after first trigger

Essay/writing rows stagger: `transition-delay: 0ms / 70ms / 140ms`

`prefers-reduced-motion: reduce` — collapse transition-duration to `0.01ms` on all `.reveal` elements.

### Hero Entry Stagger

5 elements: eyebrow → name → tagline → body → buttons
Delays: 0.05s / 0.15s / 0.3s / 0.45s / 0.6s
Each: `opacity 0 → 1, translateY(18px) → 0`, duration `0.85s`, easing `var(--ease-ui)`, `forwards` fill
`prefers-reduced-motion`: collapse to `0.01ms`

### Film Grain Overlay

```css
#grain {
  position: fixed; inset: 0; z-index: 200; pointer-events: none;
  mix-blend-mode: overlay;   /* dark mode */
  opacity: 0.09;
  background-size: 256px 256px;
  animation: grainFlicker 8s steps(3) infinite;  /* never faster than 8s */
}
html:not(.dark) #grain { mix-blend-mode: multiply; opacity: 0.06; }
@media (prefers-reduced-motion: reduce) { #grain { animation: none; } }
```

Canvas generated once via JS on load. Never on scrolling content.

---

## Voice Assistant

### Architecture

`VoiceAssistant.tsx` owns all Vapi state. Rendered once in `Base.astro` via `client:only="react"`.

Triggers: nav mic button + hero text link both dispatch `document.dispatchEvent(new CustomEvent('voice:toggle', { bubbles: true }))`.

VoiceAssistant renders the Dynamic Island and manages `html.voice-active` class.

### Vapi Credentials — Do Not Change

```
Key:          ec84568a-9bfa-4c93-91cc-a3b7447abc96
Assistant ID: a48874e8-dd51-48ad-a536-741c0bfabcc6
```

### Page Ambient Response

Two sets of rules exist: one for when the canvas is NOT running (body has a solid-color background), one for when it IS running (body is transparent — canvas shows through). Both must be kept in sync.

```css
/* ── Without canvas ── */

/* Dark — blue orb intensifies */
html.dark.voice-active body {
  background:
    radial-gradient(ellipse 75% 55% at -8% -5%, rgba(74,124,240,0.22) 0%, transparent 60%),
    radial-gradient(ellipse 70% 55% at 108% 105%, rgba(160,110,50,0.09) 0%, transparent 60%),
    radial-gradient(ellipse 85% 65% at 50% 28%, rgba(255,248,230,0.022) 0%, transparent 65%),
    #0C0A09;
  transition: background 900ms var(--ease-ui);
}

/* Light — warm orb (no canvas, fallback state) */
html:not(.dark).voice-active body {
  background:
    radial-gradient(ellipse 70% 50% at -5% -5%, rgba(255,200,130,0.28) 0%, transparent 58%),
    radial-gradient(ellipse 65% 50% at 108% 108%, rgba(255,170,90,0.18) 0%, transparent 58%),
    radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,250,240,0.6) 0%, transparent 60%),
    #F4F0E8;
  transition: background 900ms var(--ease-ui);
}

/* ── With canvas (bg-canvas-ready) — see Animated Background section ── */
/* Light uses blue-tinted orbs to avoid fighting the indigo canvas */
```

### End Call Button

`handleEnd` in `VoiceAssistant.tsx` calls `vapiRef.current?.stop()` AND immediately calls `setState('idle')` + `setSeconds(0)`. Do NOT remove the direct state reset. Vapi's `call-end` event is not guaranteed to fire on every `stop()` call — the SDK can silently swallow it under certain network conditions or call states. The direct reset ensures the UI closes instantly regardless.

---

## Component Quick Reference

### Tags / Labels
No pill backgrounds. No border-radius. Text only.
`font-body text-[11px] font-medium uppercase tracking-[0.15em] text-secondary`
Separator: `"  ·  "`

### Dividers
`<hr class="border-t border-[var(--color-border)] my-[80px]" />`
Never colored. Never thick. Never default `<hr>` styling.

### Pull Quote
`border-l-2 border-[var(--color-primary)] pl-6 my-12`
Text: `font-prose text-2xl italic text-primary leading-relaxed`

### Spec Block
`bg-[var(--color-surface)] rounded-lg p-6 my-8 border-l-2 border-[var(--color-border)]`
Text: `font-body text-[15px] leading-relaxed text-primary whitespace-pre-wrap`

---

## What This Site Never Uses

- Gradient text (`background-clip: text` + gradient)
- Side-stripe accent borders (`border-left/right > 1px` colored, on cards or callouts)
- Glassmorphism outside nav + Dynamic Island
- Decorative icons (arrows → are functional, used sparingly)
- Hero images or photography
- Bullet-pointed skill lists (anywhere on the site, including about page)
- `transition: all`
- `ease-in` on entering elements
- `scale(0)` as animation start state
- `backdrop-filter` on scrolling-container elements
- Instrument Serif, Fraunces, Newsreader, Cormorant, Playfair Display, or editorial-lane display serifs
- Blue in decorative roles (BorderGlow glows, non-functional accents)
- Animations that delay content

---

## Design Quality Checklist

Before any design session goes live:

```
□ Three governing words: Structured · Considered · Grounded — does it still feel right?
□ Body text capped at 740px?
□ Section gaps at 80px?
□ Blue used only in: progress bar, Dynamic Island active, ≤2 CTAs?
□ backdrop-filter on nav pill and Dynamic Island only?
□ Cards solid surface (no backdrop-filter)?
□ All hover states behind @media (hover:hover) and (pointer:fine)?
□ All transitions specifying exact properties — no transition:all?
□ Font stack: Cabinet Grotesk + Inter + Lora — no new display font?
□ Grain animates at 8s steps(3) or slower?
□ All fonts from /public/fonts/ — no external CDN calls?
□ Lighthouse 95+ on Performance and Accessibility?
□ prefers-reduced-motion collapses all animation durations to 0.01ms?
□ Voice active ambient gradient defined for both dark and light mode (canvas and non-canvas variants)?
□ AnimatedBackground in Base.astro — not imported in individual pages?
□ GLSL source in AnimatedBackground.astro contains only ASCII characters?
□ All interactive elements have scale(0.93–0.97) on :active?
□ No em dashes in copy (use commas, colons, semicolons, periods instead)?
```

---

*v2 — Updated from the original DESIGN.md following the full visual redesign.*
*Governs the dark-primary rebuild. The identity (Structured · Considered · Grounded) is unchanged.*
*When in doubt: simpler, quieter, more whitespace.*
