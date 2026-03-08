# DESIGN.md — Design Strategy & Visual Brief
## dilithdinesh.com

This is the single source of truth for all design decisions on this site.
Update this file when you want to change the design. Reference it at the start of any design session.

---

## Design Philosophy

### Three Governing Words
**Structured · Considered · Grounded**

### Three Words to Avoid
**Flashy · Minimal-for-minimal's-sake · Corporate**

### The Site Should Feel Like
> A well-edited journal from someone who thinks carefully and builds seriously.

Not a design portfolio. Not a startup landing page. Not a resume website.

### Core Design Principle
Every decision serves readability and credibility. If an element doesn't make the content easier to read or the person easier to trust — remove it.

---

## Color System

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#F9F7F4` | Page background — warm off-white, never pure white |
| `surface` | `#F0EDE8` | Card backgrounds, spec blocks, code blocks |
| `border` | `#E5E1DB` | Dividers, card borders — quiet, never harsh |
| `primary` | `#1A1A1A` | All primary text — near black, slightly soft |
| `secondary` | `#6B6B6B` | Metadata, dates, tags, labels, captions |
| `accent` | `#1A1A2E` | Deep navy — hover states, active nav |
| `blue` | `#2D5BE3` | **Used maximum TWICE site-wide** — primary CTA buttons only |

### Color Rules
- The entire site runs on near-black text on warm white background
- No colored sections, gradient heroes, or colored card backgrounds — ever
- The `blue` accent appears on a maximum of two CTAs across the entire site — this scarcity is intentional and meaningful
- No dark mode at launch — add at month 3 if needed
- Background is warm (`#F9F7F4`), not cold white — this is non-negotiable. Pure white feels clinical.

### How to Change the Color Palette
Update the `@theme` block in `src/styles/global.css`. All tokens are defined there. Change the hex values — the class names (`bg-background`, `text-primary`, etc.) stay the same everywhere.

---

## Typography System

### Typeface Stack

| Role | Font | Where Used |
|------|------|------------|
| **Display** | Cabinet Grotesk | Hero name, page headers, section headers, card titles, case study titles |
| **UI** | Inter | Navigation, labels, metadata, tags, buttons, body UI text |
| **Prose** | Lora | Essay body, case study body, about page, pull quotes |

### Why This Stack
- **Cabinet Grotesk** — confident, geometric, slightly editorial. Signals structured thinking without feeling corporate.
- **Inter** — neutral, highly legible at small sizes. Perfect for UI chrome where you want zero friction.
- **Lora** — warm serif that makes long-form reading comfortable. The contrast between display (grotesque) and prose (serif) creates a clear hierarchy that signals: this person writes, and their writing is worth reading.

### Type Scale

#### Cabinet Grotesk (font-display)
```
Hero name:          64px   font-semibold   leading-none      (line-height: 1.0)
Page headers:       48px   font-medium     leading-tight     (line-height: 1.1)
Section headers:    32px   font-medium     leading-snug      (line-height: 1.2)
Card titles:        24px   font-medium     leading-snug
Case study title:   48px   font-semibold   leading-tight
```

#### Inter (font-body)
```
Navigation:         14px   font-normal     tracking-wide     (letter-spacing: 0.02em)
Body UI text:       16px   font-normal     leading-relaxed   (line-height: 1.6)
Tags / Labels:      11px   font-medium     tracking-widest   UPPERCASE
Metadata:           14px   font-normal     text-secondary
Button text:        15px   font-medium
```

#### Lora (font-prose)
```
Essay / case body:  18px   font-normal     leading-reading   (line-height: 1.8)
Essay headers:      32px   font-semibold   leading-tight
Pull quotes:        24px   italic          leading-relaxed
```

### Reading Width Rule
**All body text is capped at 740px maximum width. Never wider.**
This is the optimal line length for reading (65–75 characters per line). This rule applies to essays, case studies, and the about page. It is non-negotiable.

### How to Change Typography
- Font files live in `public/fonts/`
- `@font-face` declarations are in `src/styles/global.css`
- Font family tokens are in the `@theme` block: `--font-display`, `--font-body`, `--font-prose`
- To swap a font: download the new variable woff2, replace the file in `public/fonts/`, update the `@font-face` src, update the `@theme` token value

---

## Layout System

### Grid & Widths
```
Max reading width (body text):   740px    — HARD RULE, never exceed
Max layout width (full pages):   1100px   — centered with mx-auto
Mobile margin:                   24px each side (px-6)
Tablet margin:                   48px each side
Desktop: centered container, auto margins
```

### Spacing Scale
All spacing is multiples of 8px. No arbitrary values outside this scale.

| Use Case | Value | Tailwind Class |
|----------|-------|----------------|
| Between label and value | 4px | `gap-1` |
| Internal card padding | 8px | `p-2` |
| Between related elements | 16px | `gap-4` |
| Within components | 24px | `p-6` |
| Between page sections | 80px | `py-[80px]` |
| Hero padding top/bottom | 120px | `py-[120px]` |
| Nav clearance (fixed nav) | 64px | `pt-[64px]` on main |

### Section Spacing Rule
**80px above and below every major section on every page. Non-negotiable.**
Generous whitespace is a statement about how you think. Cramped layouts signal rushed thinking.

---

## Component Design Specs

### Navigation
```
Position:           Fixed, top-0, full width, z-50
Height:             64px
Initial state:      Transparent background, no border
Scrolled state:     Background #F9F7F4, border-bottom 1px solid #E5E1DB
Transition:         200ms ease

Left:               "Dilith Dinesh" — font-display, 18px, font-medium
Right:              Work · Writing · Projects · Now · About · Contact
                    font-body, 14px, text-secondary

Active page:        text-primary + 2px underline, underline-offset 4px
Hover:              text-primary, 150ms transition
Mobile:             Full-screen overlay, Cabinet Grotesk 32px links, centered
```

### Cards

#### Case Study Card
```
Background:         #F0EDE8 (surface)
Border:             1px solid #E5E1DB
Border-radius:      8px
Padding:            32px

Hover:              border-color → #1A1A1A
                    box-shadow: 0 4px 16px rgba(0,0,0,0.06)
                    transition: 200ms ease
                    cursor: pointer (entire card clickable)

Tag row:            Inter 11px, UPPERCASE, letter-spacing 0.1em, text-secondary
                    Separated by "  ·  "
Title:              Cabinet Grotesk 24px, font-medium, text-primary
Description:        Inter 16px, text-secondary, line-height 1.6
CTA link:           "Read the case study →" — Inter 14px, font-medium
                    Arrow moves 4px right on hover (translateX)
```

#### Essay Card
```
Background:         None — borderless
Border:             border-top only, 1px solid #E5E1DB
Padding:            24px 0

Hover:              Title color → #2D5BE3, 150ms

Date + Tag:         Inter 12px, UPPERCASE, text-secondary
Title:              Cabinet Grotesk 22px, font-medium
Hook:               Inter 16px, text-secondary, line-height 1.5
CTA:                "Read →" — Inter 14px, font-medium
```

#### Project Card
```
Same container as Case Study Card.

Year + Stack:       Inter 11px, UPPERCASE, text-secondary
Title:              Cabinet Grotesk 24px, font-medium
Problem:            Inter 16px, text-secondary (one sentence)
CTA:                "See how I built it →"
```

### Buttons

#### Primary CTA (used maximum TWICE site-wide)
```
Background:         #2D5BE3
Text:               white, Inter 15px, font-medium
Padding:            12px 24px
Border-radius:      6px
Hover:              opacity 0.9, 150ms
```

#### Secondary CTA
```
Background:         transparent
Text:               #1A1A1A, Inter 15px, font-medium
Border:             1px solid #1A1A1A
Padding:            12px 24px
Border-radius:      6px
Hover:              background #F0EDE8, 150ms
```

#### Section CTA (text + arrow)
```
Background:         none
Text:               Inter 15px, font-medium, text-primary
Arrow:              → moves translateX(4px) on hover, 150ms ease
```

### Tags / Labels
```
Style:              Uppercase text only — no pill backgrounds, no border-radius
Font:               Inter 11px, font-medium, UPPERCASE
Color:              text-secondary (#6B6B6B)
Letter-spacing:     tracking-widest (0.1em)
Separator:          "  ·  " (spaced middle dot)

Example:            ZUPER  ·  FIELD SERVICE  ·  SYSTEMS DESIGN
```

### Dividers
```
Style:              1px solid #E5E1DB
Margin:             80px top and bottom (my-[80px])
Never:              Default <hr> styling
Never:              Thick, decorative, or colored lines
```

### Pull Quote
```
Border-left:        2px solid #1A1A1A
Padding-left:       24px
Margin:             48px 0

Text:               Lora 24px, italic, text-primary, line-height 1.5
Usage:              Once per case study, for the single most important insight
```

### Spec Block
```
Background:         #F0EDE8
Border-radius:      8px
Padding:            24px
Border-left:        2px solid #E5E1DB

Text:               Inter 15px, line-height 1.7, text-primary
White-space:        pre-wrap (preserves formatting)
Usage:              Architecture descriptions, workflow logic, spec fragments
```

### Reading Progress Bar
```
Position:           fixed, top-0, left-0, z-50
Height:             2px
Color:              #2D5BE3
Width:              0% → 100% via JS scroll listener
Transition:         none (linear — no easing, feels honest)
Display:            Only on Prose and CaseStudy layout pages
```

### Footer
```
Border-top:         1px solid #E5E1DB
Padding:            48px 0

Desktop layout:     Three columns
  Left:             Email address — Inter 14px, text-primary
  Center:           © [year] Dilith Dinesh — Inter 14px, text-secondary
  Right:            LinkedIn → — Inter 14px, text-primary

Mobile:             Stacked, centered
Year:               Auto-generated with new Date().getFullYear()
```

---

## Animation Rules

| Element | Animation | Duration | Notes |
|---------|-----------|----------|-------|
| Page load | Fade in, opacity 0→1 | 200ms | Subtle, not distracting |
| Scroll reveals | **None** | — | Content visible immediately — no delayed reveals |
| Hover states | Color / shadow shift | 150–200ms ease | |
| Reading progress | Linear width | — | No easing |
| Nav on scroll | Background fade in | 200ms ease | |
| Card hover | Border + shadow | 200ms ease | |
| CTA arrow | translateX(4px) | 150ms ease | |

### Hard Animation Rule
**If an animation makes someone wait to read content — remove it.**
This site earns attention through ideas, not motion.

---

## Visual Style Rules

### What This Site Uses Instead of Illustrations
1. **Large section numbers** — `01, 02, 03` in Cabinet Grotesk, low opacity, as structural texture on case study pages
2. **Pull quotes** — Lora italic 24px with left border, break up long-form content
3. **Spec blocks** — formatted blocks displaying actual architecture/logic fragments
4. **Typography hierarchy** — the weight, size, and family contrast does the visual work

### What This Site Never Uses
- Illustrations or icons (except functional arrows →)
- Gradient backgrounds
- Colored sections or colored card backgrounds
- Decorative borders or ornamental elements
- Hero images or photography
- Skill badges or tag pills
- Progress bars showing proficiency percentages
- Testimonial carousels
- Animations that delay content

---

## Page-Level Design Notes

### Home Page
- Hero has the most typographic weight on the site — Cabinet Grotesk 64px
- Only two places on the entire site where `blue` (#2D5BE3) appears: the two hero CTAs
- Proof strip is a single centered line — it should feel like a quiet credential, not a boast
- Signal section uses Lora prose, not Inter — signals this is writing, not UI copy

### Case Study Pages
- These are the highest-stakes pages — hiring managers spend the most time here
- Max reading width 740px — strict, no exceptions
- Section numbers (01–08) in small uppercase secondary text above each section header
- One pull quote per case study — the single most important insight, formatted as PullQuote component
- Reading progress bar active on these pages

### About Page
- Prose only — zero bullet points, ever
- All body text in Lora (font-prose)
- Section headers in Cabinet Grotesk (font-display)
- This page should feel like a well-written letter, not a LinkedIn summary

### Now Page
- Most personal page on the site
- Must be updated every 4–6 weeks — a stale Now page is worse than no Now page
- Inter throughout (not Lora) — this is current information, not reflective writing

### Writing / Essay Pages
- Lora at 18px, line-height 1.8 — optimized for long-form reading
- Reading progress bar active
- No distractions — no sidebars, no related posts widget at launch

---

## Design Inspiration References

| Site | What to Borrow |
|------|----------------|
| paco.me | Typography hierarchy, premium feel without flash |
| leerob.io | Writing-first structure, clean nav, now page concept |
| rauchg.com | Restraint, density of thinking over decoration |
| paulgraham.com | Proof that great writing needs almost no design |
| linear.app/blog | B2B that feels designed and editorial simultaneously |

---

## What Was Intentionally Left Out at Launch

| Element | Reason |
|---------|--------|
| Dark mode | Add at month 3 when design is stable |
| Testimonials | No external quotes yet — empty section hurts more than it helps |
| Skills list | Skill badges signal junior. Case studies signal competence. |
| Resume download | LinkedIn handles this. The site does a different job. |
| Contact form | Adds friction, feels corporate. Direct email only. |
| Scroll animations | Every animation that delays content is a conversion killer |
| Social share buttons | Clutters the reading experience |
| Comments / Reactions | Too early — add when writing has consistent readership |
| Search | Not enough content at launch to justify it |
| Newsletter signup | Add at month 3 if writing gains traction |

---

## How to Make Design Changes

### Changing Colors
1. Open `src/styles/global.css`
2. Find the `@theme` block
3. Update the hex value for the token you want to change
4. All usages update automatically — the token name stays the same

### Changing Fonts
1. Download new variable font (.woff2 preferred, .ttf acceptable)
2. Place in `public/fonts/`
3. Update `@font-face` in `src/styles/global.css`
4. Update the relevant `--font-display`, `--font-body`, or `--font-prose` token value in `@theme`

### Changing Spacing
1. Find the element in the relevant `.astro` file in `src/pages/` or `src/components/`
2. Update the Tailwind padding/margin class
3. Use literal pixel values for non-standard sizes: `py-[80px]`, `pt-[120px]`

### Changing a Component
1. Find the component file in `src/components/`
2. Edit the Tailwind classes directly
3. Run `npm run build` to verify no errors
4. Hard refresh browser to see changes

### Adding a New Page
1. Create the `.astro` or `.md` file in the appropriate `src/pages/` directory
2. Use `Base.astro` as layout for standard pages
3. Use `Prose.astro` for long-form reading pages
4. Use `CaseStudy.astro` for case study pages
5. Add the page to the Nav component if it needs a nav link

---

## Design Quality Checklist

Before any design change goes live:

```
□ Does it feel consistent with "Structured · Considered · Grounded"?
□ Does it maintain the warm off-white background (#F9F7F4)?
□ Is body text still capped at 740px max width?
□ Are section gaps still 80px?
□ Is blue (#2D5BE3) still used in a maximum of two places?
□ Are there any bullet points on the About page? (There should be zero.)
□ Do all cards still have the surface background (#F0EDE8)?
□ Does the nav still go transparent → solid on scroll?
□ Does the reading progress bar still appear only on prose pages?
□ Is every font still loading from /public/fonts/ (no external CDN calls)?
□ Does it still pass Lighthouse 95+ on Performance and Accessibility?
```

---

*Design strategy prepared as part of the dilithdinesh.com portfolio engagement.*
*Update this file before any design session. Every decision here has a reason.*
*When in doubt: simpler, quieter, more whitespace.*
