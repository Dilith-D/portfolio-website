# dilithdinesh.com — Complete Portfolio Build Plan
### Prepared by: Design & Strategy Team
### For: Developer Handoff

---

> **How to use this document**
> This is the complete specification for building Dilith Dinesh's personal portfolio website.
> It covers strategy, architecture, copy, visual design, component specs, and the full build plan.
> Content placeholders are marked as `[PLACEHOLDER: description]` — Dilith will fill these in before handoff.
> Do not skip sections. Every decision here has a reason behind it.

---

## Table of Contents

1. [Strategic Overview](#1-strategic-overview)
2. [Target Personas & User Flows](#2-target-personas--user-flows)
3. [Site Architecture & Sitemap](#3-site-architecture--sitemap)
4. [Visual Design System](#4-visual-design-system)
5. [Component Specifications](#5-component-specifications)
6. [Page-by-Page Copy & Structure](#6-page-by-page-copy--structure)
7. [Case Study Template](#7-case-study-template)
8. [Tech Stack & Project Structure](#8-tech-stack--project-structure)
9. [Build Plan](#9-build-plan)
10. [Launch Checklist](#10-launch-checklist)
11. [Post-Launch Roadmap](#11-post-launch-roadmap)

---

## 1. Strategic Overview

### Positioning Statement

> **Dilith Dinesh is a product operator who works at the boundary between customer reality and product systems — translating what field teams actually experience into capabilities that scale.**

### Value Proposition

> Most product teams learn about customer problems second-hand. I've lived them first.
> I translate what breaks in the field into product capabilities that scale — and I build the tools to close the gap while the roadmap catches up.

### Two-Layer Strategy

The site must work in two layers simultaneously:

**Layer 1 — Fast Credibility** *(for recruiters scanning in 10–15 seconds)*
- Positioning
- Case studies
- Proof of work
- Career snapshot
- Contact

**Layer 2 — Depth** *(for founders, product leaders, deep readers)*
- Thinking frameworks
- Writing
- Build experiments
- Intellectual influences
- Personal worldview

### Short-Term Goal (0–6 months)
Land an Associate Product Manager or AI-focused product role at a Series A/B product-led company.

### Long-Term Goal (3–10 years)
Act as an intellectual home on the internet — a product thinking archive, writing platform, public knowledge base, and personal brand asset.

### Primary Website Goal
Convert hiring manager attention into a conversation.

---

## 2. Target Personas & User Flows

### Persona 1 — The Recruiter

| Attribute | Detail |
|-----------|--------|
| Time budget | 15–45 seconds |
| Arrives via | LinkedIn profile link, job application |
| Primary question | Is this person worth sending to the hiring manager? |
| Success metric | Forwards profile / copies email |

**Journey:**
```
Home (hero → proof strip → work cards) → Contact/LinkedIn
```

**Design implication:** Hero must be scannable in under 5 seconds. Current role and company visible without scrolling. Contact reachable from home page footer.

---

### Persona 2 — The Hiring Manager

| Attribute | Detail |
|-----------|--------|
| Time budget | 3–6 minutes |
| Arrives via | Recruiter referral or direct LinkedIn |
| Primary question | Does this person actually think like a PM? |
| Success metric | Reads full case study → reaches out |

**Journey:**
```
Home → Work index → Case Study (full read) → About → Contact
```

**Design implication:** Case study pages are the highest-stakes pages on the site. No distractions, full-width comfortable typography, clear section navigation.

---

### Persona 3 — The Startup Founder

| Attribute | Detail |
|-----------|--------|
| Time budget | 5–15 minutes |
| Arrives via | Shared essay, Twitter/X, LinkedIn post |
| Primary question | Is this someone I'd want in the room when we're figuring things out? |
| Success metric | Reaches out directly or follows for future content |

**Journey:**
```
Writing (essay entry) → Home → Projects → Now → Contact
```

**Design implication:** Writing pages must be beautiful to read. Now page must feel human and current. Projects must feel honest — real build logs, not polished case studies.

---

### Persona 4 — The Product Community Reader

| Attribute | Detail |
|-----------|--------|
| Time budget | 10–20 minutes |
| Arrives via | Shared essay, product community Slack |
| Primary question | Is this writing worth my time? |
| Success metric | Follows on LinkedIn or returns for future writing |

**Journey:**
```
Writing (essay) → Writing index (second essay) → About → [Returns later]
```

**Design implication:** Essay pages need a "More writing" suggestion at the bottom. Writing index must make scanning easy.

---

### Cross-Persona Design Rules

1. **Every page has one clear next step.** Not two. Not three. One.
2. **Load the most important content first.** No scroll-to-discover tricks.
3. **Contact must be reachable from anywhere.** Footer on every page.
4. **The site must feel alive.** Always show publish dates. Update `/now` every 4–6 weeks.
5. **Mobile must work perfectly.** At least 50% of traffic arrives on mobile.

---

### Page Priority Ranking

| Priority | Page | Reason |
|----------|------|--------|
| 1 | Home | Gateway for all four personas |
| 2 | Case Studies | Primary conversion for hiring managers |
| 3 | Writing / Essays | Entry point for founders + community |
| 4 | About | Trust-builder across all personas |
| 5 | Projects | Differentiator for founders + hiring managers |
| 6 | Now | Human signal, retention for repeat visitors |
| 7 | Contact | Friction-free exit to conversion |

---

## 3. Site Architecture & Sitemap

```
dilithdinesh.com/
│
├── Home                          [/]
├── Work                          [/work]
│   ├── The Roofing Vertical      [/work/maven-model]
│   ├── The Booking Stopgap       [/work/booking-stopgap]
│   └── The Deposit Spec          [/work/deposit-spec]
├── Writing                       [/writing]
│   ├── Rapido Teardown           [/writing/rapido-teardown]
│   ├── Spotify Wrapped           [/writing/spotify-wrapped]
│   └── [future essays]
├── Projects                      [/projects]
│   ├── Iris                      [/projects/iris]
│   └── Pulseboard                [/projects/pulseboard]
├── Now                           [/now]
├── About                         [/about]
└── Contact                       [/contact]
```

### Navigation

```
Desktop:
[Dilith Dinesh]          [Work  Writing  Projects  Now  About  Contact]

Mobile:
[Dilith Dinesh]          [☰]
→ Full-screen overlay on open
→ Links: Cabinet Grotesk 32px
```

**Rules:**
- Six nav items maximum — do not add more at launch
- Active state: 2px underline, offset 4px — not bold
- Inactive: secondary text color `#6B6B6B`
- Hover: primary text color shift, no underline
- Nav background: transparent at top, solid `#F9F7F4` on scroll with 1px bottom border

### Deliberately Excluded at Launch

| Excluded | Reason |
|----------|--------|
| Testimonials | No external quotes yet — empty section hurts more than helps |
| Skills list | Skill badges signal junior. Case studies signal competence. |
| Resume download | LinkedIn does this job. Site should do a different job. |
| Blog | Too generic — "Writing" is more precise |
| Build Log | Add at 6 months when there's enough volume |
| Project/stats counter | Feels like a Canva template |

---

## 4. Visual Design System

### Design Personality

The site should feel like:
> A well-edited journal from someone who thinks carefully and builds seriously.

Not a design portfolio. Not a startup landing page. Not a resume website.

Three governing words: **Structured · Considered · Grounded**

Three words to avoid: **Flashy · Minimal-for-minimal's-sake · Corporate**

---

### Typography

#### Typefaces

| Role | Typeface | Source | Cost |
|------|----------|--------|------|
| Display (hero, page headers) | Cabinet Grotesk | fontshare.com | Free |
| UI (navigation, labels, cards) | Inter | bunny.net CDN | Free |
| Prose (essays, case studies, about) | Lora | bunny.net CDN | Free |

#### Type Scale

**Cabinet Grotesk — Display**
```
Hero name:          64px  Semibold   Line-height: 1.0
Page headers:       48px  Medium     Line-height: 1.1
Section headers:    32px  Medium     Line-height: 1.2
Card titles:        28px  Medium     Line-height: 1.2
Case study header:  48px  Semibold   Line-height: 1.1
```

**Inter — UI**
```
Navigation:         14px  Regular    Letter-spacing: 0.02em
Body UI text:       16px  Regular    Line-height: 1.6
Labels/Tags:        11px  Medium     Letter-spacing: 0.08em  UPPERCASE
Metadata:           14px  Regular    Color: secondary
Button text:        15px  Medium
```

**Lora — Prose**
```
Essay/case body:    18px  Regular    Line-height: 1.8
Essay headers:      32px  Semibold   Line-height: 1.2
Pull quotes:        24px  Italic     Line-height: 1.5
```

---

### Color Palette

#### Core Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#F9F7F4` | Page background — warm off-white, not pure white |
| `surface` | `#F0EDE8` | Card backgrounds, code blocks, section differentiation |
| `border` | `#E5E1DB` | Dividers, card borders — quiet, never harsh |
| `primary` | `#1A1A1A` | Primary text — near black, slightly soft |
| `secondary` | `#6B6B6B` | Metadata, dates, tags, labels |
| `accent` | `#1A1A2E` | Deep navy — hover states, active nav |
| `blue` | `#2D5BE3` | **Used maximum twice** — primary CTA button only |

#### Color Rules
- The entire site runs on near-black text on warm white
- No colored sections, gradient heroes, or colored card backgrounds
- The `blue` accent appears on maximum two CTAs site-wide — this scarcity makes it meaningful
- Do NOT build dark mode at launch — add at month 3

---

### Spacing Scale

All spacing uses multiples of 8px. No arbitrary values.

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-1` | 4px | Between label and value |
| `spacing-2` | 8px | Internal card padding |
| `spacing-4` | 16px | Between related elements |
| `spacing-6` | 24px | Between sections within a component |
| `spacing-12` | 48px | Between major page sections |
| `spacing-20` | 80px | Between page sections on desktop |
| `spacing-30` | 120px | Hero padding top/bottom |

---

### Layout Grid

```
Desktop (1280px+):
  Max content width (text):   740px  ← HARD RULE — never wider for body text
  Max content width (layout): 1100px
  Columns:                    12-column
  Gutter:                     24px
  Margin:                     auto centered

Tablet (768px–1279px):
  Max content width:          600px
  Margin:                     48px each side

Mobile (< 768px):
  Max content width:          100%
  Margin:                     24px each side
```

**The 740px reading rule:** All body text — essays, case studies, about page — is capped at 740px. This is the optimal line length for reading (65–75 characters per line). Never allow body text to stretch to full width.

**Whitespace rule:** Every major section on the home page has 80px breathing room above and below. This is non-negotiable. Generous whitespace is a statement about how you think.

---

### Animation & Motion

| Element | Animation | Duration |
|---------|-----------|----------|
| Page transitions | Fade in, opacity 0→1 | 200ms |
| Scroll animations | **None** — content is visible immediately | — |
| Hover states | Color shift + subtle transform | 150–200ms ease |
| Reading progress | Linear width on scroll | — |
| Nav on scroll | Background fade in | 200ms ease |
| Card hover | Border darkens, shadow appears | 200ms ease |
| CTA arrow hover | translateX(4px) | 150ms ease |

**Hard rule:** If an animation makes someone wait to read content, remove it.

---

### Visual Elements (No Illustrations)

Do not use illustrations. Instead:

1. **Large section numbers** — `01, 02, 03` in Cabinet Grotesk at low opacity (`#E5E1DB`) as structural texture on case study pages
2. **Subtle background texture** — very faint paper texture on `#F9F7F4`, opacity 0.3
3. **Spec/logic blocks** — formatted code-style blocks displaying actual spec fragments, workflow steps, architecture details
4. **Pull quotes** — key insights in Lora italic 24px with left border break up long-form pages

---

### Inspiration References

| Site | Principle to borrow |
|------|---------------------|
| paco.me | Typography hierarchy, premium feel without flash |
| leerob.io | Writing-first structure, clean nav, now page |
| rauchg.com | Restraint in design, density of thinking |
| paulgraham.com | Great writing needs almost no design |
| linear.app/blog | B2B that feels designed and editorial |

---

## 5. Component Specifications

### Navigation Component

```
Desktop:
  Position: fixed top
  Height: 64px
  Background: transparent → #F9F7F4 on scroll
  Border-bottom: none → 1px solid #E5E1DB on scroll
  Transition: 200ms ease

  Left: "Dilith Dinesh" — Cabinet Grotesk 18px Medium
  Right: Work · Writing · Projects · Now · About · Contact
         Inter 14px, letter-spacing 0.02em

  Active state: color #1A1A1A + 2px underline, underline-offset 4px
  Inactive: color #6B6B6B
  Hover: color #1A1A1A, 150ms transition

Mobile:
  Hamburger icon right
  Full-screen overlay, background #F9F7F4
  Links: Cabinet Grotesk 32px, centered
  Close button top-right
```

---

### Hero Section

```
Structure:
  Padding: 120px top, 120px bottom
  
  "Dilith Dinesh"
  Cabinet Grotesk 64px Semibold, color #1A1A1A
  
  [16px gap]
  
  "Product operator at the boundary between
  customer reality and product systems."
  Inter 20px Regular, color #6B6B6B, max-width 560px
  
  [16px gap]
  
  "I translate what breaks in the field into
  capabilities that scale."
  Inter 16px Regular, color #6B6B6B, Lora italic variant
  
  [24px gap]
  
  "Currently: Customer Product Manager at Zuper —
  building the roofing vertical from the ground up."
  Inter 16px Regular, color #6B6B6B
  
  [48px gap]
  
  [See my work →]        [Read my thinking →]
  Primary CTA            Secondary CTA
  
  [Border bottom: 1px solid #E5E1DB]

Primary CTA Button:
  Background: #2D5BE3
  Text: white, Inter 15px Medium
  Padding: 12px 24px
  Border-radius: 6px
  Hover: brightness 0.9, 150ms

Secondary CTA Button:
  Background: transparent
  Text: #1A1A1A, Inter 15px Medium
  Border: 1px solid #1A1A1A
  Padding: 12px 24px
  Border-radius: 6px
  Hover: background #F0EDE8, 150ms
```

---

### Proof Strip

```
Structure:
  Single line, centered
  Inter 14px Regular, color #6B6B6B
  Letter-spacing: 0.02em
  Padding: 32px 0
  Border-bottom: 1px solid #E5E1DB

Content:
  "Zuper  ·  Field Service Management  ·  B2B SaaS  ·  Chennai  ·  2 years in the field before the title"
  
  Separators: " · " (spaced middle dot)
  Last item styled slightly differently: Inter Medium, color #1A1A1A
```

---

### Case Study Card

```
Structure:
  Background: #F0EDE8
  Border: 1px solid #E5E1DB
  Border-radius: 8px
  Padding: 32px
  
  [Tag row]
  Inter 11px Medium, UPPERCASE, letter-spacing 0.1em, color #6B6B6B
  Tags separated by "  ·  "
  
  [12px gap]
  
  [Title]
  Cabinet Grotesk 24px Medium, color #1A1A1A
  
  [12px gap]
  
  [Description]
  Inter 16px Regular, color #6B6B6B, line-height 1.6
  2–3 sentences max
  
  [24px gap]
  
  [Read the case study →]
  Inter 14px Medium, color #1A1A1A
  Arrow: → 
  Underline on hover

Hover state:
  Border-color: #1A1A1A
  Box-shadow: 0 4px 16px rgba(0,0,0,0.06)
  Transition: 200ms ease
  Cursor: pointer
```

---

### Essay Card

```
Structure:
  No card background — borderless
  Border-top: 1px solid #E5E1DB (separator)
  Padding: 24px 0
  
  [Date + Tag]
  Inter 12px Regular, color #6B6B6B, UPPERCASE
  Format: "JAN 2025  ·  TEARDOWN"
  
  [8px gap]
  
  [Title]
  Cabinet Grotesk 22px Medium, color #1A1A1A
  
  [8px gap]
  
  [Hook]
  Inter 16px Regular, color #6B6B6B, line-height 1.5
  1–2 sentences
  
  [16px gap]
  
  [Read →]
  Inter 14px Medium, color #1A1A1A

Hover state:
  Title color: #2D5BE3
  Transition: 150ms ease
```

---

### Project Card

```
Structure:
  Same as Case Study Card with modifications:
  
  [Year + Stack tags]
  Inter 11px, UPPERCASE, color #6B6B6B
  
  [Title]
  Cabinet Grotesk 24px Medium
  
  [Problem statement]
  Inter 16px Regular, color #6B6B6B
  One sentence: the personal problem it solved
  
  [Stack: React · TypeScript · Supabase]
  Inter 12px, color #6B6B6B
  
  [See how I built it →]
```

---

### Reading Progress Bar

```
Position: fixed, top: 0, left: 0
Width: dynamic (JS scroll listener)
Height: 2px
Background: #2D5BE3
Z-index: 100
Transition: width linear (no easing — feels honest)

Display: ONLY on essay pages and case study pages
Hidden on: home, about, now, contact, index pages
```

---

### Pull Quote

```
Display: Once per case study, for the key insight
  
Border-left: 3px solid #1A1A1A
Padding-left: 24px
Margin: 48px 0
  
Text: Lora 24px Italic, color #1A1A1A, line-height 1.5
```

---

### Spec / Logic Block

```
Used for: architecture descriptions, workflow steps,
          logic structures inside case studies

Background: #F0EDE8
Border-radius: 8px
Padding: 24px
Font: Inter 15px Regular, line-height 1.7
Color: #1A1A1A
Border-left: 3px solid #E5E1DB
Margin: 32px 0
```

---

### Tags / Labels (Inline)

```
No pill badges. No background color.
Just text:
  Inter 11px Medium, UPPERCASE
  Letter-spacing: 0.1em
  Color: #6B6B6B
  Tags separated by "  ·  "

Example: ZUPER  ·  FIELD SERVICE  ·  SYSTEMS DESIGN
```

---

### Dividers

```
Style: 1px solid #E5E1DB
Margin: 80px 0
Never use default <hr> styling
Never use thick or decorative lines
```

---

### Footer

```
Structure:
  Border-top: 1px solid #E5E1DB
  Padding: 48px 0
  
  Left: "dilith@[PLACEHOLDER: email address]" — Inter 14px
  Center: "© [year] Dilith Dinesh" — Inter 14px, color #6B6B6B
  Right: "LinkedIn →" — Inter 14px
  
  Mobile: stacked, centered
```

---

## 6. Page-by-Page Copy & Structure

---

### Home Page `/`

#### Hero

```
DILITH DINESH

Product operator at the boundary between
customer reality and product systems.

I translate what breaks in the field into
capabilities that scale.

Currently: Customer Product Manager at Zuper —
building the roofing vertical from the ground up.

[See my work →]    [Read my thinking →]
```

---

#### Proof Strip

```
Zuper  ·  Field Service Management  ·  B2B SaaS  ·  Chennai  ·  2 years in the field before the title
```

---

#### Work Preview Section

**Section header:** `Work`

**Framing line:** `Not success stories. Decision logs.`

**Card 1 — Maven Model:**
```
Tag:         ZUPER  ·  FIELD SERVICE  ·  SYSTEMS DESIGN
Title:       The Roofing Vertical
Description: There was no repeatable way to onboard a roofing
             contractor onto Zuper. Every implementation was
             custom, slow, and impossible to clone.
             So I built one that could be.
CTA:         Read the case study →
```

**Card 2 — Booking Stopgap:**
```
Tag:         ZUPER  ·  FIELD SERVICE  ·  PRODUCT JUDGMENT
Title:       The Stopgap That Knew Its Place
Description: Roofing customers needed booking before the
             product roadmap was ready. I built the interim
             solution — and designed it to be replaced.
CTA:         Read the case study →
```

**Card 3 — Deposit Spec:**
```
Tag:         ZUPER  ·  FIELD SERVICE  ·  SPEC WRITING
Title:       When the Real Problem Is Two Layers Down
Description: Contractors knew what they wanted.
             Engineering knew what they needed.
             Nobody had written the translation.
CTA:         Read the case study →
```

**Section CTA:** `View all work →`

---

#### Writing Preview Section

**Section header:** `Writing`

**Framing line:** `Product teardowns, field notes, and frameworks from the boundary between operations and product.`

**Essay Card 1 — Rapido:**
```
Date/Tag:    [PLACEHOLDER: publish date]  ·  TEARDOWN
Title:       What B2B SaaS Can Learn From India's
             Fastest-Growing Mobility App
Hook:        Rapido nailed the habit loop. But they're still
             optimizing for the ideal user — not the actual one.
CTA:         Read →
```

**Essay Card 2 — Spotify:**
```
Date/Tag:    [PLACEHOLDER: publish date]  ·  TEARDOWN
Title:       How Spotify Turned Usage Data Into
             an Annual Identity Ritual
Hook:        Most imitators copy the format. They miss the
             emotional architecture underneath.
CTA:         Read →
```

**Section CTA:** `Read all writing →`

---

#### Projects Preview Section

**Section header:** `Projects`

**Framing line:** `Things I built because the problem was real enough to solve.`

**Card 1 — Iris:**
```
Year/Stack:  2026  ·  REACT 18  ·  TYPESCRIPT  ·  SUPABASE
Title:       Iris
Description: I needed a messaging app that worked across
             devices without forcing me into one ecosystem.
             So I built one.
CTA:         See how I built it →
```

**Card 2 — Pulseboard:**
```
Year/Stack:  2025  ·  B2B SAAS  ·  LOVABLE
Title:       Pulseboard
Description: I wanted to understand what it actually takes
             to build a B2B SaaS from zero. User interviews,
             RICE prioritization, shipped MVP.
             No engineering team.
CTA:         See how I built it →
```

**Section CTA:** `See all projects →`

---

#### Signal Section

```
Most product teams learn about customer problems through
tickets, NPS scores, and quarterly reviews.

I've spent two years inside the operational layer —
sitting with contractors, mapping how they actually
collect money, watching where workflows break before
anyone files a bug report.

That proximity changes how I think about product
decisions. Not every problem needs a feature.
Not every feature request is the actual problem.
The real work is finding the gap between what
people say they want and what would actually help them.

That's the kind of product thinking I'm building toward.
```

---

#### Footer CTA

```
If you're building something that needs this
kind of thinking — let's talk.

[PLACEHOLDER: email address]
```

---

### Work Index Page `/work`

#### Page Header

```
Work

These aren't polished success stories.
They're records of real decisions made under
real constraints — what the problem actually was,
what made it hard, what I chose, and what I'd
do differently.
```

#### Sub-header above cards

```
Three case studies from two years inside field service operations.
```

*(Then the three case study cards — same as home preview)*

---

### Writing Index Page `/writing`

#### Page Header

```
Writing

Product teardowns, operational frameworks,
and thinking from the boundary between
customer reality and product systems.

I write to make sense of what I'm seeing —
not to perform expertise I don't have.
```

#### Featured Essay Label

Small label above the hero essay: `— Featured`

#### Essay Index Header

```
All writing  ↓
```

**Available at launch:**
- Rapido Teardown — `[PLACEHOLDER: final edited version]`
- Spotify Wrapped — `[PLACEHOLDER: final edited version]`
- `[PLACEHOLDER: any additional LinkedIn posts expanded into essays]`

---

### Projects Index Page `/projects`

#### Page Header

```
Projects

A PM who can't prototype is a PM who
can't think in three dimensions.

These are things I built to solve problems
I had — and to stay honest about what
building actually costs.
```

#### Sub-header

```
Shipping your own problems first is the
fastest way to develop product judgment
you can't fake.
```

*(Then the two project cards — same as home preview)*

---

### Now Page `/now`

#### Page Header

```
Now

What I'm working on, reading, and
thinking about — updated regularly.

Last updated: [PLACEHOLDER: Month, Year — UPDATE THIS EVERY 4–6 WEEKS]
```

#### Currently Building

```
Currently Building

At Zuper: [PLACEHOLDER: describe current work focus in 1–2 sentences]

Side: [PLACEHOLDER: any current side experiment or tool]
```

#### Currently Reading

```
Currently Reading

[PLACEHOLDER: Book title] — [PLACEHOLDER: One honest sentence about
why you're reading it, not what it's about]
```

#### Currently Thinking About

```
Currently Thinking About

→ What does AI-native product management
  actually look like when the users are
  offline and physical?

→ Where does vertical SaaS end and
  industry-specific AI begin?

→ [PLACEHOLDER: Third question you're genuinely sitting with]
```

*Note: These are questions, not answers. Questions signal active thinking.*

#### Looking For

```
Looking For

APM or product roles at Series A/B
product-led companies.

Particularly interested in: vertical SaaS,
AI-first products, B2B tools built for
people doing physical work.

Open to conversations even if the timing
isn't right yet.

→ [PLACEHOLDER: email address]
```

---

### About Page `/about`

*Note to developer: This page uses the Prose layout. No bullet points anywhere on this page. All content is prose paragraphs.*

#### Opening Statement

```
About

I think about products the way a good
translator thinks about language — the job
isn't to convert words, it's to convert meaning.

Most product problems arrive as noise:
a contractor asking for a tweak, an ops
team raising an exception, a customer
describing a workaround they've lived with
for two years. The surface request is rarely
the real problem. Getting to the real problem
requires sitting close enough to the work
to see what's actually breaking.

That's where I've spent the last two years.
```

#### The Arc

```
How I got here

I studied Computer Science at VIT — enough
to understand how systems are built, not
just described. Then I joined Zuper as an
implementation engineer, which meant I spent
almost a year configuring the product for
real customers before I ever had a product title.

That sequence wasn't accidental in hindsight.
Implementation teaches you things discovery
calls don't. You see where the configuration
breaks. You watch which workflows get abandoned.
You learn that the gap between how a product
was designed and how it's actually used is
where most of the real work lives.

When I moved into product, I already knew
where the bodies were buried.
```

#### How I Think

```
How I think

A few things shape how I approach product
problems — not as hobbies, but as cognitive tools.

Moral complexity from fiction
I grew up reading Harry Potter — not for the
magic, but for the architecture of a world
with real internal logic, characters who
contain contradictions, and problems that
don't resolve cleanly into good and evil.
That's useful for product work. Most hard
decisions aren't between right and wrong.
They're between two reasonable positions
with different tradeoffs.

Pattern recognition from thrillers
Dan Brown taught me to follow threads.
Every customer complaint is a data point.
The interesting work is finding what
connects them — the pattern underneath
the noise that points toward the actual
system problem.

Formation thinking from football
Football is a positioning game disguised
as a scoring game. The team that wins
isn't always the most talented — it's the
one whose players understand their role
in the system and when to break formation
intelligently. Early product work feels
the same. You're not the star striker.
You're learning the system so you can
eventually change it.

Restraint as a product principle
The mental model I keep returning to:
just because I can doesn't mean I should.
In product, this means the best decision
is often the one that removes a feature,
narrows the scope, or says no to the
reasonable request that would quietly
break three other things.
```

#### Where I'm Going

```
Where I'm going

My long-term goal is to become an AI-first
product manager — not in the sense of
bolting AI onto existing workflows, but in
the sense of rethinking what product
management looks like when intelligence
is embedded in the system.

I'm particularly interested in what AI means
for users who aren't at a desk — field
technicians, contractors, people doing
physical work in environments where a
phone is a liability. The design constraints
are completely different. The stakes are higher.
The solutions have to be quieter.

That intersection — operational reality plus
AI-native thinking — is where I want to build.
```

#### Closing

```
If something here resonates — a project,
an essay, a way of thinking about a problem
you're working on — I'd genuinely like to
hear about it.

→ [PLACEHOLDER: email address]
→ LinkedIn
```

---

### Contact Page `/contact`

```
Contact

If you're building something that needs
this kind of thinking — I want to hear
about it.

————

I'm currently open to:

APM and product roles at Series A/B
product-led companies

Conversations about vertical SaaS,
AI-first product, and field operations

Feedback on my writing — especially
if you disagree with something

————

[PLACEHOLDER: email address]
LinkedIn → [PLACEHOLDER: LinkedIn URL]

I read everything. I reply to most things.
```

*No contact form. Direct email only. Forms add friction and feel corporate.*

---

## 7. Case Study Template

### Philosophy

Case studies must be written forwards — starting with genuine uncertainty, showing real decisions, ending with honest reflection. The reader should finish thinking: *"I understand how this person thinks under pressure."* Not: *"Everything worked out perfectly."*

### Template Structure

Every case study uses this exact eight-section structure:

```
01  SITUATION
02  THE REAL PROBLEM
03  CONSTRAINTS
04  PROCESS
05  THE DECISION
06  WHAT SHIPPED
07  OUTCOME
08  WHAT I'D DO DIFFERENTLY
```

### Section Guides

**01 — SITUATION** *(100–150 words)*
What was the context? What was happening in the business, the product, or the customer relationship that made this problem exist? Start with where you were operating, not with "I was tasked with..."

**02 — THE REAL PROBLEM** *(100–150 words)*
What was the actual problem — not the surface request, but the underlying gap? This is where you show the translator skill. What did people say the problem was? What was the problem actually? How did you figure out the difference?

**03 — CONSTRAINTS** *(75–100 words)*
What were you working within? What couldn't you change? Platform limitations, timeline, team constraints, live customer pressure. Can be a structured list — this is one of few sections where a list is appropriate.

**04 — PROCESS** *(200–300 words)*
How did you actually work through this? Write it as a decision journal, not a methodology list. What did you do first and why? What surprised you? What did you have to restart? Who did you talk to and what did you learn?

**05 — THE DECISION** *(150–200 words)*
What was the key decision? What were the real alternatives? What tradeoffs did you make? Structure:
- Option A: what it was + why it was tempting
- Option B: what it was + why it was tempting
- What I chose + the actual reasoning + the assumption you were betting on

**06 — WHAT SHIPPED** *(100–150 words + structured spec block)*
What did you actually deliver? Be concrete. Include spec fragments, workflow descriptions, or architecture details as formatted spec blocks. If you have screenshots, include them.

**07 — OUTCOME** *(75–100 words)*
What changed? Be honest — not inflated, not falsely modest. If you have a metric, use it. If not, describe the qualitative change specifically. Never invent metrics.

**08 — WHAT I'D DO DIFFERENTLY** *(100–150 words)*
**This section is mandatory and must contain a genuine self-critique.** Not a fake weakness disguised as a strength. What assumption turned out to be wrong? What did you underestimate? What would you not do again?

---

### Case Study Page Design

```
[Navigation]

[Case Study Header]
  Tag row:    Cabinet Grotesk 11px UPPERCASE letter-spacing 0.1em #6B6B6B
              e.g. "ZUPER  ·  FIELD SERVICE  ·  SYSTEMS DESIGN"
  Title:      Cabinet Grotesk 48px Semibold #1A1A1A
  Summary:    Lora 20px Italic #6B6B6B (one sentence)
  Metadata:   Inter 14px #6B6B6B — "2024  ·  8 min read  ·  Customer Product Manager"

[1px divider]

[Reading progress bar — appears on scroll]

[Body — max-width 740px centered]
  Section numbers:  Cabinet Grotesk 11px UPPERCASE letter-spacing 0.1em #6B6B6B
  Section titles:   Cabinet Grotesk 22px Medium #1A1A1A
  Body prose:       Lora 18px Regular line-height 1.8
  
[Pull quote — one per case study]
  Lora 24px Italic
  Border-left: 3px solid #1A1A1A
  Padding-left: 24px
  Margin: 48px 0

[Spec blocks]
  Background: #F0EDE8
  Border-radius: 8px
  Padding: 24px
  Inter 15px line-height 1.7

[End of case study]
  1px divider
  "More work →" links to next case study
  "Back to all work →"
```

---

### Case Study 1 — The Roofing Vertical (Maven Model)

**File:** `/work/maven-model.md`

**Frontmatter:**
```yaml
---
title: "The Roofing Vertical"
summary: "There was no repeatable way to onboard a roofing contractor onto Zuper. I built one that could be cloned."
tags: ["Zuper", "Field Service", "Systems Design"]
date: "2024"
readTime: "8 min"
role: "Customer Product Manager"
slug: "maven-model"
---
```

**Content:** `[PLACEHOLDER: Write using the 8-section template above. Draft exists — see Phase 7 example in the brief. Add specific details: exact automation names, contractor conversation details, the precise moment you identified the category transition problem. Aim for 1,200–1,500 words total.]`

**Pull quote suggestion:** `"The real problem wasn't implementation speed. It was the absence of a structural model for the vertical."`

---

### Case Study 2 — The Booking Stopgap

**File:** `/work/booking-stopgap.md`

**Frontmatter:**
```yaml
---
title: "The Stopgap That Knew Its Place"
summary: "Roofing customers needed booking before the product roadmap was ready. I built the interim solution — and designed it to be replaced."
tags: ["Zuper", "Field Service", "Product Judgment"]
date: "2024"
readTime: "6 min"
role: "Customer Product Manager"
slug: "booking-stopgap"
---
```

**Content:** `[PLACEHOLDER: Write using the 8-section template. Key moments to cover: the two options (wait vs. build), the decision to ship now and design for replacement, the four booking modes (full booking, lead intake, customer-only, job without scheduling), the React/TypeScript front-end widget, the spec for the native feature it would eventually replace. Be honest about the technical debt involved.]`

**Pull quote suggestion:** `"The product thinking moment was recognizing this wasn't meant to scale forever."`

---

### Case Study 3 — The Deposit Spec

**File:** `/work/deposit-spec.md`

**Frontmatter:**
```yaml
---
title: "When the Real Problem Is Two Layers Down"
summary: "Contractors knew what they wanted. Engineering knew what they needed. Nobody had written the translation."
tags: ["Zuper", "Field Service", "Spec Writing"]
date: "2024"
readTime: "7 min"
role: "Customer Product Manager"
slug: "deposit-spec"
---
```

**Content:** `[PLACEHOLDER: Write using the 8-section template. Key moments to cover: sitting with 3–4 contractors, the variety in how they actually collected money, finding the common pattern across all of them, writing the proportional allocation logic, the deposit invoice structure, how credits flow, edge cases. This is your strongest differentiator case study — the translation skill is most visible here. Aim for showing the exact process of going from "contractor describes workflow" to "engineering-ready spec".]`

**Pull quote suggestion:** `"The real problem is buried two layers under what the customer says they want."`

---

### Essay 1 — Rapido Teardown

**File:** `/writing/rapido-teardown.md`

**Frontmatter:**
```yaml
---
title: "What B2B SaaS Can Learn From India's Fastest-Growing Mobility App"
hook: "Rapido nailed the habit loop. But they're still optimizing for the ideal user — not the actual one."
tags: ["Teardown", "B2B SaaS", "Consumer"]
date: "[PLACEHOLDER: publish date]"
readTime: "12 min"
slug: "rapido-teardown"
---
```

**Content:** `[PLACEHOLDER: Final edited version of the Rapido teardown essay. Add a brief author note at the end: "Written in [month, year]. Part of my ongoing product teardown series."]`

---

### Essay 2 — Spotify Wrapped

**File:** `/writing/spotify-wrapped.md`

**Frontmatter:**
```yaml
---
title: "How Spotify Turned Usage Data Into an Annual Identity Ritual"
hook: "Most imitators copy the format. They miss the emotional architecture underneath."
tags: ["Teardown", "Consumer", "Product Design"]
date: "[PLACEHOLDER: publish date]"
readTime: "14 min"
slug: "spotify-wrapped"
---
```

**Content:** `[PLACEHOLDER: Final edited version of the Spotify Wrapped teardown essay. Add author note at the end.]`

---

### Project 1 — Iris

**File:** `/projects/iris.md`

**Frontmatter:**
```yaml
---
title: "Iris"
problem: "I needed a messaging app that worked across devices without forcing me into one ecosystem."
stack: ["React 18", "TypeScript", "Supabase", "Lovable", "Emergent"]
year: "2026"
slug: "iris"
---
```

**Content:** `[PLACEHOLDER: Write as a build log, not a case study. Sections: The Problem (personal, honest) → The Build Decision (why build vs. use existing tools) → Key Product Decisions Made During Build → What I Learned About Prototyping → What I'd Do Differently. Tone: more personal and candid than the professional case studies. This is about judgment in building, not professional PM work. 600–800 words.]`

---

### Project 2 — Pulseboard

**File:** `/projects/pulseboard.md`

**Frontmatter:**
```yaml
---
title: "Pulseboard"
problem: "I wanted to understand what it actually takes to build a B2B SaaS from zero."
stack: ["Lovable", "RICE Framework", "User Interviews"]
year: "2025"
slug: "pulseboard"
---
```

**Content:** `[PLACEHOLDER: Write as a build log. Sections: Why Build This (the personal motivation) → The User Interview Process (what you learned) → How You Prioritized (RICE in practice, not in theory) → What Shipped → What the MVP Revealed About the Problem → What You'd Do Differently. Be honest about what worked and what didn't in the no-engineering-team approach. 600–800 words.]`

---

## 8. Tech Stack & Project Structure

### Recommended Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Astro** | Built for content-heavy sites, ships zero JS by default, native Markdown/MDX, component islands for React where needed |
| Styling | **Tailwind CSS** | Maps directly to the design token system, enforces consistency, fast to implement |
| Typography plugin | **@tailwindcss/typography** | Handles prose styling for essays and case studies |
| Fonts | **Self-hosted** | Cabinet Grotesk from fontshare.com, Inter + Lora from bunny.net — no Google Fonts (privacy + performance) |
| Deployment | **Vercel** | Free tier, auto-deploy on git push, custom domain in 5 minutes, edge network |
| Content | **Markdown files** | No CMS needed — portable forever, version controlled |
| Domain | **dilithdinesh.com** | Already purchased |
| Cost | **$0/month** | Everything on free tiers |

### Why Not the Alternatives

| Option | Verdict |
|--------|---------|
| Next.js | Great but overkill — Astro is the right tool for a content site |
| Framer | $15–20/month + vendor lock-in + weak credibility signal |
| Webflow | Expensive + severe vendor lock-in + not portable |
| Plain HTML | Gets painful as content grows — Astro gives structure without overhead |
| WordPress | Wrong tool, wrong mental model |
| Notion public | Signals you didn't build your own site |

### Project File Structure

```
dilithdinesh/
├── src/
│   ├── pages/
│   │   ├── index.astro                    ← Home
│   │   ├── work/
│   │   │   ├── index.astro                ← Work index
│   │   │   ├── maven-model.md             ← Case study 1
│   │   │   ├── booking-stopgap.md         ← Case study 2
│   │   │   └── deposit-spec.md            ← Case study 3
│   │   ├── writing/
│   │   │   ├── index.astro                ← Writing index
│   │   │   ├── rapido-teardown.md         ← Essay 1
│   │   │   └── spotify-wrapped.md         ← Essay 2
│   │   ├── projects/
│   │   │   ├── index.astro                ← Projects index
│   │   │   ├── iris.md                    ← Project 1
│   │   │   └── pulseboard.md              ← Project 2
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
│   │   ├── Base.astro                     ← Global layout (nav + footer + meta)
│   │   ├── Prose.astro                    ← Long-form reading layout
│   │   └── CaseStudy.astro                ← Case study layout (extends Prose)
│   └── styles/
│       └── global.css                     ← @font-face + base reset + custom utilities
├── public/
│   ├── fonts/
│   │   ├── CabinetGrotesk-Variable.woff2
│   │   ├── Inter-Variable.woff2
│   │   └── Lora-Variable.woff2
│   ├── robots.txt
│   └── og-image.png                       ← 1200×630px social preview image
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

### Dependencies

```bash
# Framework
npm create astro@latest

# Add integrations
npx astro add tailwind
npx astro add mdx
npx astro add sitemap

# Typography plugin
npm install @tailwindcss/typography
```

Total packages at launch: ~8. Every package has a clear job.

### Tailwind Config

```javascript
// tailwind.config.mjs
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
        'reading': '740px',
        'layout':  '1100px',
      },
      lineHeight: {
        'reading': '1.8',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary'),
            fontFamily: theme('fontFamily.prose').join(', '),
            fontSize: '1.125rem',
            lineHeight: '1.8',
            maxWidth: '740px',
            'h2, h3': {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.primary'),
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            },
            'a:hover': {
              color: theme('colors.blue'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### global.css

```css
/* Font declarations */
@font-face {
  font-family: 'Cabinet Grotesk';
  src: url('/fonts/CabinetGrotesk-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
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

/* Selection */
::selection {
  background: #2D5BE3;
  color: white;
}
```

### Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP (Largest Contentful Paint) | < 1.5s |
| CLS (Cumulative Layout Shift) | 0 |
| Page weight (Home) | < 200KB |
| Page weight (Essay) | < 150KB |

---

## 9. Build Plan

### Time Budget

```
Realistic weekly time budget (alongside full-time job):
  Weekday evenings:    1–1.5 hours × 4 days = 4–6 hours
  Weekend:             3–4 hours × 2 days   = 6–8 hours
  Weekly total:        10–14 hours
  Build timeline:      4 weeks
  Total hours:         ~45–55 hours
```

### Overview

```
Week 1 → Content    Write everything before touching code
Week 2 → Foundation Design system + components
Week 3 → Build      Assemble all pages
Week 4 → Launch     Polish + ship
```

---

### Week 1 — Content Week

*Goal: Every word that goes on the site exists in a document before opening a code editor.*

| Day | Task | Time | Deliverable |
|-----|------|------|-------------|
| 1–2 | Finalize home copy + about page | 2–3h | All copy locked in Google Doc |
| 3–4 | Write Maven Model case study (8 sections) | 3–4h | Case study 1 complete |
| 5–6 | Write Booking Stopgap + Deposit Spec | 3h each | Case studies 2 & 3 complete |
| 6–7 | Edit essays + write build logs + write Now page | 4–5h | All content complete |

**Week 1 Exit Criteria — do not move to Week 2 until all checked:**
```
□ Every page has complete copy in a document
□ All three case studies written in full (8 sections each)
□ Both essays edited and ready to publish
□ Both project build logs written
□ Now page written with current content
□ About page feels like Dilith's voice, not a template
□ Zero placeholder text anywhere
```

---

### Week 2 — Foundation Week

*Goal: Project scaffolded, design system implemented, zero content yet.*

| Day | Task | Time | Milestone |
|-----|------|------|-----------|
| 1 | Environment setup + Vercel deploy | 2h | dilithdinesh.com shows placeholder — site is live |
| 2 | Design tokens + fonts + global.css | 2–3h | Color palette + typography implemented |
| 3 | Base.astro + Nav.astro + Footer.astro | 3–4h | Navigate between empty pages consistently |
| 4 | Prose.astro + CaseStudy.astro layouts | 3–4h | Reading layouts functional |
| 5 | Card components (all three types) | 2–3h | Component library complete |
| 6–7 | Typography QA — test every text style | 2–3h | All font rendering verified on mobile |

**Day 1 Setup Commands:**
```bash
npm create astro@latest dilithdinesh
cd dilithdinesh
npx astro add tailwind
npx astro add mdx
npx astro add sitemap
npm install @tailwindcss/typography
git init
git remote add origin [github repo]
git push -u origin main
# Connect GitHub repo to Vercel
# Add dilithdinesh.com custom domain
```

**Typography QA checklist (Day 6–7):**
```
□ Create /test page with every text style
□ Check: Chrome desktop, Safari desktop, Chrome mobile, Safari mobile
□ Verify: Cabinet Grotesk renders at all sizes
□ Verify: Lora at 18px is comfortable to read on iPhone
□ Verify: Inter labels are legible at 11px
□ Adjust until every level reads cleanly
□ Delete /test page before Week 3
```

**Week 2 Milestone:** Full design system implemented, all components built, site deploys cleanly to dilithdinesh.com

---

### Week 3 — Build Week

*Goal: All pages built and populated with real content.*

| Day | Task | Time | Milestone |
|-----|------|------|-----------|
| 1 | Home page — all sections | 3–4h | Home live at dilithdinesh.com |
| 2 | Work index + 3 case study pages | 3–4h | All case studies live |
| 3 | Writing index + 2 essay pages | 2–3h | All essays live |
| 4 | Projects index + 2 build log pages + Now page | 2–3h | Projects + Now live |
| 5 | About + Contact pages | 2h | All pages live |
| 6–7 | SEO + meta tags + OG image + Search Console | 2–3h | Site indexed and shareable |

**SEO tasks (Day 6–7):**
```
□ Unique meta description for every page (150 chars, specific, no buzzwords)
□ OG image: 1200×630px, name + positioning + dilithdinesh.com (make in Figma/Canva)
□ OG meta tags in Base.astro: og:title, og:description, og:image
□ Twitter cards: twitter:card, twitter:title, twitter:image
□ Verify sitemap at /sitemap.xml
□ robots.txt in /public/ (allow all, link to sitemap)
□ Google Search Console: verify ownership, submit sitemap
```

**Week 3 Milestone:** Every page is live with real content at dilithdinesh.com

---

### Week 4 — Polish + Launch Week

| Day | Task | Time | Deliverable |
|-----|------|------|-------------|
| 1–2 | Full site review as each persona | 3h | Issues list prioritized |
| 2–3 | Cross-browser + device testing | 2h | Verified on 5 platforms |
| 3 | Lighthouse performance audit | 2h | 95+ scores |
| 4 | Pre-launch checklist | 1h | All boxes checked |
| 5 | Soft launch to 2–3 trusted reviewers | 1h | Feedback collected |
| 6 | Implement feedback | 2–3h | Final fixes applied |
| 7 | Public launch | 1h | Site announced |

**Soft launch reviewers — ask these specific questions:**
```
→ "What do you think I do after 10 seconds?"
→ "Which page did you find most interesting?"
→ "What felt off or unclear?"

Rule: Fix things multiple people mention.
      Resist fixing things only one person mentions.
      (One opinion is noise. Two opinions is signal.)
```

**Public launch sequence:**
```
□ Final check of live site
□ Update LinkedIn: add dilithdinesh.com to contact info
□ Write LinkedIn launch post:
    - What the site is (one sentence)
    - Why built this way — content first, design second, code third (one paragraph)
    - What's on it (case studies, writing, projects)
    - The link
    - One genuine question for readers
□ Share in relevant product communities (where genuinely relevant)
□ Send personal email to specific people you want to see it
```

---

## 10. Launch Checklist

### Content
```
□ Every page has real content — zero placeholder text
□ No typos in hero or navigation (read both aloud)
□ All internal links work
□ All external links work and open correctly
□ Email address is correct and live
□ LinkedIn URL is correct and profile is updated
□ Dates are accurate on all case studies and essays
□ Now page shows today's date as "Last updated"
□ About page has no bullet points
```

### Technical
```
□ dilithdinesh.com loads with HTTPS
□ www.dilithdinesh.com redirects to dilithdinesh.com
□ 404 page exists and is custom (not Astro default)
□ Sitemap accessible at dilithdinesh.com/sitemap.xml
□ robots.txt accessible at dilithdinesh.com/robots.txt
□ Google Search Console verified and sitemap submitted
□ OG image renders correctly (check at opengraph.xyz)
□ Reading progress bar appears on case study and essay pages only
□ Nav scroll behavior works (transparent → solid)
```

### Design
```
□ No element is misaligned on any page
□ Fonts render consistently across all pages
□ Color palette is consistent (no accidental default blues or blacks)
□ Whitespace feels generous throughout — nothing feels cramped
□ Mobile navigation works perfectly (hamburger opens and closes)
□ All touch targets are minimum 44px on mobile
□ No layout breaks at any screen size (test 320px to 1920px)
```

### Cross-Browser Testing
```
□ Chrome / macOS desktop
□ Safari / macOS desktop
□ Chrome / Windows desktop
□ Chrome / Android mobile
□ Safari / iOS mobile
□ Firefox / desktop (sanity check)
```

### Performance
```
□ Lighthouse 95+ on home page
□ Lighthouse 95+ on one case study page
□ Lighthouse 95+ on one essay page
□ No console errors in Chrome DevTools
□ WebPageTest from India: < 2s load on mobile
□ Images using Astro's built-in Image component (auto-optimized)
□ Font-display: swap on all @font-face declarations
```

---

## 11. Post-Launch Roadmap

### Month 1–2

```
→ Publish one new essay (expand a LinkedIn post into full piece)
→ Update Now page
→ Fix any issues found after real traffic
→ Set up privacy-friendly analytics:
   Fathom (fathom.com) or Plausible (plausible.io) — ~$9/month
   Track: page views, time on page, top pages, traffic sources
→ Check: which case study gets most time on page?
         which essay gets most shares?
         where do people drop off?
```

### Month 3

```
→ Add dark mode (now that design is stable)
→ Publish third essay
→ Review analytics — adjust based on evidence, not instinct
→ Update Now page
→ Evaluate: is the site doing its job?
   Are hiring managers reaching out?
   Are product people engaging with writing?
→ Consider adding Build Log section if 3+ experiments documented
```

### Month 6

```
→ Full site review — does positioning still feel right?
→ Add new case studies from work
→ Consider newsletter signup if writing gains traction
→ Reassess tech stack — anything to upgrade or simplify?
→ Review SEO performance in Google Search Console
```

---

## Appendix A — Copy Rules

These apply to every word on the site and every future piece of content:

| Avoid | Use instead |
|-------|-------------|
| "I am passionate about..." | A sentence that demonstrates passion through specificity |
| "I love solving problems" | Describe a specific problem and what made it interesting |
| "Let's connect!" | "I'd genuinely like to hear about it" or "let's talk" |
| "I am a fast learner" | Show the arc from implementation to product in 11 months |
| Exclamation marks | Never. No exceptions. |
| Startup buzzwords | Plain language that means something |
| Generic outcomes | Specific, honest descriptions of what changed |

Always:
- End sections with a specific next step, not a vague invitation
- Use em dashes over hyphens for pauses — they signal careful writing
- Write dates, company names, and role titles in consistent format
- Show publish dates on all writing (signals the site is alive)

---

## Appendix B — SEO Metadata

```
Home:
  Title: "Dilith Dinesh — Product Operator"
  Description: "Customer Product Manager at Zuper. 
                Translating field operations into product capabilities. 
                Case studies, writing, and build logs."

Work:
  Title: "Work — Dilith Dinesh"
  Description: "Product case studies from two years inside field service operations. 
                Real decisions, real constraints, honest reflections."

Writing:
  Title: "Writing — Dilith Dinesh"
  Description: "Product teardowns, frameworks, and thinking from the boundary 
                between customer reality and product systems."

Projects:
  Title: "Projects — Dilith Dinesh"
  Description: "Apps and tools built to solve real problems. 
                Build logs documenting the decisions and lessons."

About:
  Title: "About — Dilith Dinesh"
  Description: "How a CS graduate spent two years in the operational layer 
                before becoming a product manager."

Now:
  Title: "Now — Dilith Dinesh"
  Description: "What I'm currently building, reading, and thinking about."

Contact:
  Title: "Contact — Dilith Dinesh"
  Description: "Open to APM and product roles at Series A/B product-led companies."
```

---

## Appendix C — Content Inventory at Launch

| Page | Status |
|------|--------|
| Home | Copy complete — needs final voice review |
| Work index | Copy complete |
| Maven Model case study | `[PLACEHOLDER: write using template]` |
| Booking Stopgap case study | `[PLACEHOLDER: write using template]` |
| Deposit Spec case study | `[PLACEHOLDER: write using template]` |
| Writing index | Copy complete |
| Rapido Teardown essay | `[PLACEHOLDER: paste edited final version]` |
| Spotify Wrapped essay | `[PLACEHOLDER: paste edited final version]` |
| Projects index | Copy complete |
| Iris build log | `[PLACEHOLDER: write as build log]` |
| Pulseboard build log | `[PLACEHOLDER: write as build log]` |
| Now page | `[PLACEHOLDER: fill in current content]` |
| About page | Copy complete — needs final voice review |
| Contact page | `[PLACEHOLDER: add email address and LinkedIn URL]` |

**All content should be finalized before Week 2 begins.**

---

## Appendix D — Font Sources

| Font | Source URL | License |
|------|-----------|---------|
| Cabinet Grotesk | https://www.fontshare.com/fonts/cabinet-grotesk | Free for personal & commercial |
| Inter | https://bunny.net/fonts/inter | Free (SIL OFL 1.1) |
| Lora | https://bunny.net/fonts/lora | Free (SIL OFL 1.1) |

Download variable font files (.woff2 format) and place in `/public/fonts/`.

---

*Document prepared as part of a full design agency engagement.*
*All strategic decisions, copy, and specifications are complete.*
*Developer's job: implement exactly as specified.*
*Dilith's job: fill placeholders, review voice, ship.*
