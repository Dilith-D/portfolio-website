# CLAUDE.md — Technical Specification
## dilithdinesh.com Portfolio

This is the authoritative technical reference for building dilithdinesh.com.
Follow every specification exactly. Do not deviate from the design system.
When in doubt, refer back to this file.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro |
| Styling | Tailwind CSS |
| Typography plugin | @tailwindcss/typography |
| MDX | @astrojs/mdx |
| Sitemap | @astrojs/sitemap |
| Fonts | Self-hosted (Cabinet Grotesk + Inter + Lora) |
| Deployment | Netlify |
| Content | Markdown files — no CMS |

---

## Project Structure

```
dilithdinesh/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── work/
│   │   │   ├── index.astro
│   │   │   ├── maven-model.md
│   │   │   ├── booking-stopgap.md
│   │   │   └── deposit-spec.md
│   │   ├── writing/
│   │   │   ├── index.astro
│   │   │   ├── rapido-teardown.md
│   │   │   └── spotify-wrapped.md
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   ├── iris.md
│   │   │   └── pulseboard.md
│   │   ├── now.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── CaseStudyCard.astro
│   │   ├── EssayCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── PullQuote.astro
│   │   ├── SpecBlock.astro
│   │   └── ReadingProgress.astro
│   ├── layouts/
│   │   ├── Base.astro
│   │   ├── Prose.astro
│   │   └── CaseStudy.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── fonts/
│   │   ├── CabinetGrotesk-Variable.woff2
│   │   ├── Inter-Variable.woff2
│   │   └── Lora-Variable.woff2
│   ├── robots.txt
│   └── og-image.png
├── CLAUDE.md
├── CONTENT.md
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Design Tokens

### Colors

```javascript
// tailwind.config.mjs — exact values, do not change
colors: {
  background: '#F9F7F4',  // warm off-white — page background
  surface:    '#F0EDE8',  // card backgrounds, spec blocks
  border:     '#E5E1DB',  // dividers, card borders
  primary:    '#1A1A1A',  // primary text
  secondary:  '#6B6B6B',  // metadata, dates, tags
  accent:     '#1A1A2E',  // deep navy — hover states
  blue:       '#2D5BE3',  // CTA buttons ONLY — used maximum twice site-wide
}
```

### Typography

```javascript
// tailwind.config.mjs
fontFamily: {
  display: ['Cabinet Grotesk', 'sans-serif'],  // hero, page headers, card titles
  body:    ['Inter', 'sans-serif'],             // UI, nav, labels, metadata
  prose:   ['Lora', 'serif'],                   // essays, case studies, about
}
```

### Font Sources (self-hosted in /public/fonts/)

| Font | Source | Format |
|------|--------|--------|
| Cabinet Grotesk | fontshare.com/fonts/cabinet-grotesk | Variable woff2 |
| Inter | bunny.net/fonts/inter | Variable woff2 |
| Lora | bunny.net/fonts/lora | Variable woff2 |

### Type Scale

```
Cabinet Grotesk (font-display):
  Hero name:        64px  font-semibold  leading-none
  Page headers:     48px  font-medium    leading-tight
  Section headers:  32px  font-medium    leading-snug
  Card titles:      24px  font-medium    leading-snug
  Case study title: 48px  font-semibold  leading-tight

Inter (font-body):
  Navigation:       14px  font-normal    tracking-wide
  Body UI:          16px  font-normal    leading-relaxed
  Tags/Labels:      11px  font-medium    tracking-widest  uppercase
  Metadata:         14px  font-normal    text-secondary
  Button:           15px  font-medium

Lora (font-prose):
  Essay body:       18px  font-normal    leading-reading (1.8)
  Essay headers:    32px  font-semibold  leading-tight
  Pull quotes:      24px  italic         leading-relaxed
```

### Spacing Scale

All spacing is multiples of 8px. Use Tailwind classes only.

```
4px  = spacing-1   (between label and value)
8px  = spacing-2   (internal card padding)
16px = spacing-4   (between related elements)
24px = spacing-6   (within components)
48px = spacing-12  (between major sections)
80px = spacing-20  (between page sections — non-negotiable)
120px = spacing-30 (hero padding)
```

---

## Layout Rules

```
Max reading width:   740px  — ALL body text capped here. Never wider.
Max layout width:    1100px — Full-width sections
Grid:                12-column, 24px gutter
Mobile margin:       24px each side
Tablet margin:       48px each side

Section spacing:     80px top and bottom between every major section
Hero padding:        120px top and bottom
```

---

## tailwind.config.mjs

```javascript
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#F9F7F4',
        surface:    '#F0EDE8',
        border:     '#E5E1DB',
        primary:    '#1A1A1A',
        secondary:  '#6B6B6B',
        accent:     '#1A1A2E',
        blue:       '#2D5BE3',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        prose:   ['Lora', 'serif'],
      },
      maxWidth: {
        reading: '740px',
        layout:  '1100px',
      },
      lineHeight: {
        reading: '1.8',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary'),
            fontFamily: theme('fontFamily.prose').join(', '),
            fontSize: '1.125rem',
            lineHeight: '1.8',
            maxWidth: '740px',
            'h2, h3, h4': {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.primary'),
              fontWeight: '500',
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            },
            'a:hover': {
              color: theme('colors.blue'),
            },
            strong: {
              color: theme('colors.primary'),
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary'),
              borderLeftWidth: '3px',
              fontStyle: 'italic',
              color: theme('colors.primary'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
```

---

## astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dilithdinesh.com',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
});
```

---

## global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Font declarations */
@font-face {
  font-family: 'Cabinet Grotesk';
  src: url('/fonts/CabinetGrotesk-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora-Variable.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal italic;
  font-display: swap;
}

/* Base reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background-color: #F9F7F4;
  color: #1A1A1A;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #F9F7F4;
}

/* Selection */
::selection {
  background: #2D5BE3;
  color: white;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
```

---

## Component Specifications

### Nav.astro

```
Desktop:
  Position: fixed, top 0, full width, z-index 50
  Height: 64px
  Initial background: transparent
  On scroll: background #F9F7F4, border-bottom 1px solid #E5E1DB
  Transition: 200ms ease

  Left: "Dilith Dinesh" — font-display text-lg font-medium text-primary
  Right: Work · Writing · Projects · Now · About · Contact
         font-body text-sm text-secondary
         Active state: text-primary + 2px underline underline-offset-4
         Hover: text-primary, 150ms transition

Mobile:
  Hamburger icon right side
  Full-screen overlay, bg-background
  Links: font-display text-4xl, centered, stacked
  Close button top-right
  Animate: slide in from right OR fade in

JavaScript required:
  - Scroll listener → toggle nav background
  - Mobile hamburger toggle
  - Active page detection from current URL
  - Close mobile menu on link click
```

### Footer.astro

```
Border-top: 1px solid border color
Padding: py-12
Max-width: layout (1100px), centered

Three items in a row (desktop) / stacked centered (mobile):
  Left:   email address — font-body text-sm text-primary
  Center: "© [year] Dilith Dinesh" — font-body text-sm text-secondary
  Right:  "LinkedIn →" — font-body text-sm text-primary, links to LinkedIn URL

Year: use new Date().getFullYear() — always current
```

### Base.astro (layout)

```
Props: title, description, ogImage?

<html lang="en">
  <head>
    charset, viewport
    <title>{title} — Dilith Dinesh</title>
    <meta name="description" content={description}>
    OG tags: og:title, og:description, og:image, og:url, og:type
    Twitter: twitter:card, twitter:title, twitter:description, twitter:image
    Canonical URL
    Sitemap link
  </head>
  <body class="bg-background text-primary font-body">
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Prose.astro (layout)

```
Extends Base.astro
Adds: ReadingProgress component
Body content: max-w-reading (740px), mx-auto, px-6

Props: title, description, date?, readTime?, tags[]?

Page header structure:
  Tags row: uppercase text-xs tracking-widest text-secondary font-body
  Title: font-display (48px desktop, 36px mobile) font-semibold text-primary
  Summary: font-prose text-xl italic text-secondary (optional)
  Metadata: font-body text-sm text-secondary — date · readTime · role
  Divider: 1px border-border mt-8
```

### CaseStudy.astro (layout)

```
Extends Prose.astro
Adds:
  - Section number styling (01, 02... in uppercase text-xs text-secondary)
  - Section title styling (font-display text-2xl font-medium)
  - End navigation: "More work →" + "Back to all work →"
  - ReadingProgress
```

### CaseStudyCard.astro

```
Props: title, tags[], description, slug

Container:
  bg-surface border border-border rounded-lg p-8
  Hover: border-primary shadow-sm (0 4px 16px rgba(0,0,0,0.06))
  Transition: all 200ms ease
  cursor-pointer (entire card clickable)

Structure:
  Tags: uppercase text-xs tracking-widest text-secondary font-body
        separated by "  ·  "
  [mt-3]
  Title: font-display text-2xl font-medium text-primary
  [mt-3]
  Description: font-body text-base text-secondary leading-relaxed
  [mt-6]
  Link: "Read the case study →"
        font-body text-sm font-medium text-primary
        underline on hover
        Arrow moves 4px right on hover (translateX)
```

### EssayCard.astro

```
Props: title, hook, date, tags[], slug

Container:
  No background — borderless
  border-t border-border py-6
  Hover: title color shifts to blue
  Transition: 150ms ease

Structure:
  Date + Tag: uppercase text-xs text-secondary font-body tracking-widest
              Format: "JAN 2025  ·  TEARDOWN"
  [mt-2]
  Title: font-display text-xl font-medium text-primary
         Hover: text-blue, 150ms
  [mt-2]
  Hook: font-body text-base text-secondary leading-relaxed
  [mt-4]
  "Read →": font-body text-sm font-medium text-primary
```

### ProjectCard.astro

```
Props: title, problem, stack[], year, slug

Same container as CaseStudyCard with modifications:
  
Structure:
  Year + Stack: uppercase text-xs tracking-widest text-secondary font-body
                Format: "2026  ·  REACT  ·  TYPESCRIPT  ·  SUPABASE"
  [mt-3]
  Title: font-display text-2xl font-medium text-primary
  [mt-3]
  Problem: font-body text-base text-secondary leading-relaxed
  [mt-6]
  "See how I built it →": same as CaseStudyCard link style
```

### ReadingProgress.astro

```
Fixed position: top 0, left 0, z-50
Height: 2px
Background: blue (#2D5BE3)
Width: 0% initially, updated by JS scroll listener
Transition: none (width linear — no easing, feels honest)

JavaScript:
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

Display: ONLY on Prose.astro and CaseStudy.astro layouts
```

### PullQuote.astro

```
Props: quote

Container:
  border-l-2 border-primary pl-6 my-12

Text: font-prose text-2xl italic text-primary leading-relaxed
```

### SpecBlock.astro

```
Props: content (slot)

Container:
  bg-surface rounded-lg p-6 my-8
  border-l-2 border-border

Text: font-body text-[15px] leading-relaxed text-primary
      Preserves whitespace: whitespace-pre-wrap
```

---

## Button Styles

```
Primary CTA (used maximum TWICE site-wide):
  bg-blue text-white font-body text-[15px] font-medium
  px-6 py-3 rounded-md
  Hover: opacity-90, 150ms

Secondary CTA:
  bg-transparent text-primary border border-primary font-body text-[15px] font-medium
  px-6 py-3 rounded-md
  Hover: bg-surface, 150ms

Section CTA (text + arrow):
  font-body text-[15px] font-medium text-primary
  No border, no background
  Arrow: → 
  Hover: arrow translateX(4px), 150ms ease
  
Inline links (in prose):
  text-primary underline underline-offset-[3px]
  Hover: text-blue, 150ms
```

---

## Dividers

```
Always: <hr class="border-t border-border my-20" />
Never: default <hr> styling
Never: thick or decorative lines
Spacing: my-20 (80px top and bottom)
```

---

## Tags / Labels

```
No pill badges. No background. No border-radius.
Just text: uppercase text-xs tracking-widest text-secondary font-body
Tags separated by "  ·  " (spaced middle dot)

Example: ZUPER  ·  FIELD SERVICE  ·  SYSTEMS DESIGN
```

---

## Animation Rules

| Element | Animation | Duration |
|---------|-----------|----------|
| Page load | Fade in opacity 0→1 | 200ms |
| Scroll reveal | NONE — content visible immediately | — |
| Hover states | Color/shadow shift | 150–200ms ease |
| Reading progress | Linear width | — |
| Nav background | Fade in on scroll | 200ms ease |
| CTA arrow | translateX(4px) | 150ms ease |
| Card hover | Border + shadow | 200ms ease |

**Hard rule: Never animate something that delays reading content.**

---

## Markdown Frontmatter Schemas

### Case Studies (/work/*.md)

```yaml
---
title: string
summary: string          # one sentence, Lora italic under title
tags: string[]           # max 3, displayed as tag row
date: string             # "2024" or "Jan 2024"
readTime: string         # "8 min"
role: string             # "Customer Product Manager"
slug: string             # matches filename
---
```

### Essays (/writing/*.md)

```yaml
---
title: string
hook: string             # 1–2 sentences, shown on index card
tags: string[]           # e.g. ["Teardown", "B2B SaaS"]
date: string             # "Jan 2025"
readTime: string         # "12 min"
slug: string
featured: boolean        # true for featured essay (hero treatment on index)
---
```

### Projects (/projects/*.md)

```yaml
---
title: string
problem: string          # one sentence — the personal problem it solved
stack: string[]          # e.g. ["React 18", "TypeScript", "Supabase"]
year: string             # "2026"
slug: string
---
```

---

## SEO Metadata Per Page

```
Home:
  title:       "Dilith Dinesh — Product Operator"
  description: "Customer Product Manager at Zuper. Translating field operations into product capabilities. Case studies, writing, and build logs."

Work:
  title:       "Work — Dilith Dinesh"
  description: "Product case studies from two years inside field service operations. Real decisions, real constraints, honest reflections."

Writing:
  title:       "Writing — Dilith Dinesh"
  description: "Product teardowns, frameworks, and thinking from the boundary between customer reality and product systems."

Projects:
  title:       "Projects — Dilith Dinesh"
  description: "Apps and tools built to solve real problems. Build logs documenting the decisions and lessons."

About:
  title:       "About — Dilith Dinesh"
  description: "How a CS graduate spent two years in the operational layer before becoming a product manager."

Now:
  title:       "Now — Dilith Dinesh"
  description: "What I'm currently building, reading, and thinking about."

Contact:
  title:       "Contact — Dilith Dinesh"
  description: "Open to APM and product roles at Series A/B product-led companies."
```

---

## 404 Page

```
Custom 404.astro required — not the Astro default.

Simple layout:
  "404"          font-display text-8xl font-semibold text-border
  "Page not found"  font-display text-2xl text-primary mt-4
  "← Back home"    text link to /

Center everything vertically and horizontally.
Full viewport height.
```

---

## robots.txt

```
User-agent: *
Allow: /
Sitemap: https://dilithdinesh.com/sitemap.xml
```

---

## Performance Rules

- Use Astro's built-in `<Image>` component for all images (auto-optimized)
- font-display: swap on all @font-face (already in global.css)
- No external font CDN calls — all fonts self-hosted
- No unnecessary JavaScript — only load JS for: Nav scroll, ReadingProgress, mobile menu
- Tailwind purges unused CSS automatically in production
- Target Lighthouse 95+ on all pages

---

## Build Order (Page by Page)

Build in this exact sequence. Each page depends on the ones before it.

```
Session 1:  Project scaffold + design system + Base/Prose/CaseStudy layouts + Nav + Footer
Session 2:  Home page (index.astro)
Session 3:  Work index + CaseStudyCard + first case study page
Session 4:  Remaining two case study pages
Session 5:  Writing index + EssayCard + both essay pages
Session 6:  Projects index + ProjectCard + both project pages
Session 7:  Now page + About page
Session 8:  Contact page + 404 page
Session 9:  SEO pass + OG image + sitemap verification + performance audit
```

---

## Copy Rules (for all content)

- Never write "I am passionate about..."
- Never use exclamation marks anywhere
- Never use startup buzzwords
- Use em dashes (—) not hyphens (-) for pauses
- Show publish dates on all writing
- Tags are always UPPERCASE with · separators
- Dates format: "Jan 2025" or "2024" (not "January 2025, 14th")
- No bullet-pointed skill lists anywhere on the site
- About page: prose only — zero bullet points

---

## How to Use This File

At the start of every Claude Code session:

1. Reference this file for all design decisions
2. Get page content from CONTENT.md
3. Build the page specified for that session
4. Do not add features not specified here
5. Do not deviate from the color palette or type scale
6. When something is ambiguous, choose the simpler option

Every decision in this file has a reason. Trust the spec.
