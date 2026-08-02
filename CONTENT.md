# CONTENT.md — All Page Copy
## dilithdinesh.com

This file contains the final copy for every page.
Fill in every `[PLACEHOLDER]` before the build session for that page.
Do not start a build session with unfilled placeholders.

---

## Global

```
Name:       Dilith Dinesh
Email:      dilithdinesh007@gmail.com
LinkedIn:   https://linkedin.com/in/dilithdinesh
Domain:     dilithdinesh.com
```

---

## Navigation

```
Logo/Name:  Dilith Dinesh
Links:      Work · Writing · Projects · Now · About · Contact
```

---

## Footer

```
Email:      dilithdinesh007@gmail.com
LinkedIn:   LinkedIn →  [links to LinkedIn URL above]
Copyright:  © [auto year] Dilith Dinesh
```

---

## Home Page

### Hero

Rebuilt Aug 2026 as a two-column grid. The old hero was a single left column
with an empty right half, the name set at 64px as the largest element on the
page, and four secondary lines all rendered identically so nothing had a
reading order. This version fixes hierarchy and density, not the design system.

Left column, in order. Nothing here is decorative; each block does a different job.

```
1. NAME  — JetBrains Mono 13px, uppercase, letter-spacing 0.12em, text-secondary.
           A label, not a headline. Semantically still the <h1>.

Dilith Dinesh

2. POSITIONING LINE — Cabinet Grotesk 56px desktop / 34px mobile, semibold,
   leading 1.05, text-primary, max-width 620px. The largest element on the page.
   "boundary" keeps its dotted underline and hover tooltip (easter egg).

Product operator at the boundary between customer reality and product systems.

3. TAGLINE — Lora italic 20px, text-secondary, max-width 480px.
   Serif italic here is the contrast the old hero was missing.

I translate what breaks in the operational layer into capabilities that scale.

4. ROLE BLOCK — JetBrains Mono 13px, line-height 1.7. Label column is one step
   quieter than the value it labels.

NOW      Associate Product Manager, VoiceStack. Voice AI for dental practices.
BEFORE   Two years at Zuper. Built the roofing vertical from zero.

5. CTA ROW — one button, then text links 24px below.
   Three equal buttons is three equal choices, which is no choice.

[ See my work → ]            primary blue button

Read my thinking →   ·   Talk to my AI →   ·   LinkedIn →
                             Inter 14px text-secondary, hover text-primary.
                             "Talk to my AI" is a <button> dispatching voice:toggle.

6. PROOF STRIP — moved here from the bottom of the page. Inter 14px at
   text-primary/75%, NOT text-secondary. It is the highest-signal line in the
   hero and it used to whisper. Border-top 1px border token, pt-6.

VoiceStack  ·  Healthcare Voice AI  ·  Previously Zuper, field service  ·
Built the roofing vertical from 0 to 1  ·  Chennai
```

Right column.

```
1. PORTRAIT — /public/portrait.webp (360x412, 57KB), rendered 180px wide
   (140px on mobile). Cropped to the ink so 180px is 180px of drawing, not
   drawing plus transparent margin.
   No border, no radius, no shadow, no container. It sits on the background.
   alt="Illustrated portrait of Dilith Dinesh", loading="eager".
   Full-tone engraving: it has both white highlights and black hatching, so it
   composites correctly on cream and on near-black. No dark-mode invert filter
   needed, and adding one would break it. Source PNG is portrait.png.png at the
   repo root (2.8MB, 1024x1536) - keep it out of the deployed build.

2. STATUS BOARD — typography only. No card, no border, no background fill.
   Header: JetBrains Mono 11px uppercase, letter-spacing 0.12em, text-secondary.
   Group headers: same, each with a 6px dot. Items: Inter 15px, line-height 1.9.
   Linked items are text-primary and hover blue; unlinked sit at text-secondary.

CURRENT STATE

● SHIPPED                    dot: --color-blue
  Iris, cross-device file transfer            → /projects/iris
  Pulseboard, PM reflection system            → /projects/pulseboard
  Voice assistant on this site                (no link)

● IN PROGRESS                dot: --color-status-amber (#C9862F)
  First 90 days at VoiceStack                 (no link)
  Ask Dilith, site chatbot                    (no link)

● EXPLORING                  dot: --color-secondary
  Why voice is the right interface for front-office work
  What field service taught me that transfers to healthcare
```

**Status board content is unconfirmed.** It shipped as specified in the rebuild
brief, which flagged it as placeholder pending Dilith's confirmation. Two things
to settle: whether "Ask Dilith, site chatbot" is real and in progress, and whether
"Voice assistant on this site" should link to /projects/voice-agent (that page
exists; the brief said no link).

Mobile stacking order below 1024px:

```
Name → Positioning line → Portrait → Tagline → Role block → CTA → Proof strip → Status board
```

The portrait moves up on mobile so the fold is not pure text. The status board
goes last because it is the least critical element on a phone.

### Work Preview Section

```
Section header:   Work
Framing line:     Not success stories. Decision logs.

Card 1:
  Tags:         ZUPER  ·  FIELD SERVICE  ·  SYSTEMS DESIGN
  Title:        The Roofing Vertical
  Description:  There was no repeatable way to onboard a roofing
                contractor onto Zuper. Every implementation was
                custom, slow, and impossible to clone.
                So I built one that could be.
  CTA:          Read the case study →
  Link:         /work/golden-account-model

Card 2:
  Tags:         ZUPER  ·  FIELD SERVICE  ·  PRODUCT JUDGMENT
  Title:        The Stopgap That Knew Its Place
  Description:  Roofing customers needed booking before the
                product roadmap was ready. I built the interim
                solution — and designed it to be replaced.
  CTA:          Read the case study →
  Link:         /work/booking-stopgap

Card 3:
  Tags:         E-COMMERCE  ·  AI SYSTEMS
  Title:        The AI Shopping Buddy
  Description:  Personal friction became a weekend build plan:
                an AI shopping layer any e-commerce can embed.
  CTA:          Read the case study →
  Link:         /work/ai-shopping-buddy

Section CTA:    View all work →   (links to /work)
```

### Writing Preview Section

```
Section header:   Writing
Framing line:     Product teardowns, field notes, and frameworks
                  from the boundary between operations and product.

Essay Card 1:
  Date/Tag:     JAN 2026  ·  TEARDOWN
  Title:        What B2B SaaS Can Learn From India's
                Fastest-Growing Mobility App
  Hook:         Rapido nailed the habit loop. But they're still
                optimizing for the ideal user — not the actual one.
  CTA:          Read →
  Link:         /writing/rapido-teardown

Essay Card 2:
  Date/Tag:     DEC 2025  ·  TEARDOWN
  Title:        How Spotify Turned Usage Data Into
                an Annual Identity Ritual
  Hook:         Most imitators copy the format. They miss the
                emotional architecture underneath.
  CTA:          Read →
  Link:         /writing/spotify-wrapped

Section CTA:    Read all writing →   (links to /writing)
```

### Projects Preview Section

```
Section header:   Projects
Framing line:     Things I built because the problem
                  was real enough to solve.

Card 1:
  Year/Stack:   2026  ·  REACT 18  ·  TYPESCRIPT  ·  SUPABASE  ·  LOVABLE
  Title:        Iris
  Description:  I needed a frictionless way to move things between
                my own devices without using WhatsApp as a file
                transfer hack. So I built a private bridge — between
                my devices, and between me and the people I trust.
  CTA:          See how I built it →
  Link:         /projects/iris

Card 2:
  Year/Stack:   2026  ·  REACT  ·  TANSTACK  ·  CLAUDE SONNET  ·  DEEPGRAM
  Title:        SuperPilot
  Description:  B2B sales reps lose 2 hours a day across 6 deal
                handoffs. The data to fix it exists. I built the
                AI layer that synthesizes it into memory.
  CTA:          See how I built it →
  Link:         /projects/superpilot

Card 3:
  Year/Stack:   2026  ·  VAPI  ·  DEEPGRAM  ·  ELEVENLABS  ·  GPT-4O MINI
  Title:        The Voice Agent
  Description:  A contact form would tell you I'm interested in
                AI product work. A voice agent shows you how I
                think about it. So I built one — and documented
                every decision behind it.
  CTA:          See how I built it →
  Link:         /projects/voice-agent

Card 4:
  Year/Stack:   2026  ·  CLAUDE API  ·  VANILLA JS  ·  VERCEL
  Title:        Delphi
  Description:  Foreign founders with Delaware C-Corps face a
                $25,000 penalty for missing Form 5472. Most don't
                know it exists. I built the tool that tells them
                exactly what they owe — before they talk to a CPA.
  CTA:          See how I built it →  /  Try it live →
  Link:         /projects/delphi
  Live:         https://delphi-tax.vercel.app

Section CTA:    See all projects →   (links to /projects)
```

### Signal Section

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

### Footer CTA

```
If you're building something that needs this
kind of thinking — let's talk.

dilithdinesh007@gmail.com
```

---

## Work Index Page

```
Page title:     Work

Header copy:
These aren't polished success stories.
They're records of real decisions made under
real constraints — what the problem actually was,
what made it hard, what I chose, and what I'd
do differently.

Sub-header:
Three case studies — two from field service operations, one from an AI product build.
```

*(Uses same two cards as home page work preview)*

---

## Case Study 1 — The Roofing Vertical

**File:** `src/pages/work/golden-account-model.md`

```yaml
---
title: "The Roofing Vertical"
summary: "There was no repeatable way to onboard a roofing contractor onto Zuper. I built one that could be cloned — and in doing so, helped shape what the product needed to become."
tags: ["Zuper", "Field Service", "Systems Design"]
date: "2024"
readTime: "8 min"
role: "Customer Product Manager"
slug: "golden-account-model"
---
```

**Pull quote:**
```
"The real problem wasn't onboarding speed.
The golden account was a product discovery vehicle
disguised as an implementation template."
```

**Case study body:**

---

## 01 Situation

Zuper had roofing customers before the roofing vertical existed. They were onboarded, made live, and left running on configurations that worked — but only for them. Every implementation was rebuilt from scratch by whoever ran the engagement. Different workflow logic, different job structures, different automation setups. Nothing transferred from one account to the next.

This wasn't just an efficiency problem. It was a signal that Zuper was still operating as a fit-for-all platform in a vertical that had specific, repeatable patterns. A roofer in Seattle and a roofer in Texas are running the same business logic. Nobody had mapped it yet.

When the decision was made to go deep on roofing as a vertical, I was brought onto the core execution team alongside the SVP — who had decades of field service industry experience — and the Chief Architect, who understood what it took to build systems that scale. I was the youngest person on the team. My job was to build the roofing golden account: a pre-configured, fully cloneable account with roofing contractor terminology, workflows, configurations, job types, automations, and features already in place.

The mandate was clear. The path was not.

---

## 02 The Real Problem

The brief I received framed this as a speed and consistency problem. Onboarding was slow and variable. The golden account would fix that.

That framing was partially right. But once I got into discovery, I understood the actual problem was larger.

Zuper was a platform built to serve every industry. Roofing contractors were using it alongside tools from five or six other vendors — each one filling a gap the platform didn't cover. They had separate tools for photo management, for proposal design, for CPQ calculations. They had built their own operational stack around Zuper's limitations and were paying for the privilege of jumping between all of it.

The golden account wasn't just a faster way to onboard roofing customers. It was the first place where Zuper could systematically identify what roofing contractors actually needed — and begin to answer the question of what the product would have to become to make those other tools unnecessary.

I wasn't just building a template. I was building a discovery mechanism.

---

## 03 Constraints

**No dedicated engineering team.** The build resources available to me were one workflow engineer and my own implementation background. Any feature gap that required product engineering had to go through the roadmap — which meant designing workarounds for anything that wasn't there yet.

**Platform gaps were real but scoped.** The platform had the fundamentals — jobs, quotes, invoices, proposals. What it didn't have was the roofing-specific layer on top of those fundamentals. No CPQ engine that could handle roofing measurement formulas. No gallery view for site photos. No proposal layout builder. No measurement token objects. These were the gaps contractors were solving with other tools.

**Deliberate customer pacing.** We weren't onboarding at volume during this phase. The company made a conscious decision to take on fewer roofing customers while the vertical was being built — handpicking accounts we could learn from without being overwhelmed by support pressure. This was the right call, but it meant every customer interaction carried more weight.

**I was learning roofing in real time.** I had never heard the words shingles, eaves, or rakes before this project. In India, residential roofs are clay tile or concrete — they don't need replacement every decade, and snow load isn't a design consideration. Before I touched a single workflow, I spent weeks learning the industry: how roofs are measured, how contractors think about pitch, what a production job actually involves. You can't build a product for a customer you don't understand.

---

## 04 Process

I started with the question every PM should ask before building anything: why are we building this, and for whom?

I went back to senior leadership and pushed past the surface brief. Not just "what do you want" but "what problem are we solving, and how will we know if we've solved it?" Is this a speed problem? A demo problem? A product gap problem? The answer shaped everything that came after.

Once I understood the strategic intent, I went into every existing roofing account we had. Big customers and small ones. I mapped what configurations they were running, which modules they were using, which workflows were common across accounts, and which ones were genuinely custom to their situation. I was looking for the pattern underneath the variation — the things that every roofing contractor needed, regardless of size or geography.

I also had to understand the business process end to end. Not how the platform supported it, but how roofing contractors actually worked. What happened when a homeowner called in? What did a sales crew do on a site visit? What was on that 30-foot ladder? How did an inspection become a proposal? How did a proposal become a production job, and what happened when the production job involved three different trades?

This is where I hit the first real structural insight. Roofing contractors don't run one type of job. They run multiple, distinct pipelines — each with different logic, different people, different checkpoints. Lead qualification, inspection, production. These weren't statuses on a single job. They were different things.

With that understanding, I began building. I gave the golden account a persona — a Seattle-based residential roofing company — and configured it as if it were a real account. Real service territories, real trade types, real job structures. I wanted it to feel like a live account, not a demo environment. Because eventually, it would become both.

---

## 05 The Decision

The most important decision I made during this build was about CPQ.

Roofing estimates are calculation-heavy. The quantity of materials on a job is derived from precise roof measurements — area, pitch, overhang — run through formulas that differ by product line. This is what contractors use SumoQuote and similar tools for. Zuper didn't have a native CPQ engine that could handle this.

I had two options.

**Option A** was to document the gap, write a requirements spec, and submit it to the product roadmap. The right long-term move. Clean, no technical debt. Timeline: unknown.

**Option B** was to build a workaround using what the platform could already do — store the formulas at the line item level, run them through existing workflow automation, and get something functional in front of customers now. Scrappy, imperfect, and temporary by design.

I chose Option B — but with a specific condition. Every workaround I built had to be documented as a workaround. The goal wasn't just to make it work. The goal was to make it work, observe how contractors actually used it, identify where it broke, and translate all of that into requirements that product engineering could act on.

The assumption I was betting on: that real usage of an imperfect solution would generate better product requirements than a spec written in the abstract. That turned out to be right.

The CPQ workaround was limited — it couldn't handle complex nested formulas, and contractors hit its edges quickly. But those edges were exactly what I needed. I spent months walking the Principal PM through every CPQ edge case I'd observed, every formula variation across different contractors, every place the workaround had failed. That input directly shaped the product feature that shipped three months later. When contractors saw the native CPQ, the response was that it seemed too good to be true. That reaction was built on the groundwork of a scrappy solution that was never meant to last.

---

## 06 What Shipped

The golden account launched as a fully cloneable architecture with three distinct pipelines: lead qualification, inspection, and production. Each pipeline had its own job type, status flow, checklist logic, and automation layer. The account was pre-configured with roofing contractor terminology throughout — not generic field service language adapted for roofing, but the actual vocabulary contractors use.

A cloning mechanism was built alongside it. When a new roofing customer was created in Zuper, the golden account was cloned for them automatically — sample jobs, configurations, workflows, and all. The goal was that a contractor logging into their account on day zero, before onboarding had even started, would see a system that already felt like it was built for them. That first impression mattered. It was the difference between a contractor thinking "I'll have to rebuild all of this" versus "this is already close to what I need."

The sales team used the same account for demos. One account, two jobs: proof of concept before the sale and foundation for the implementation after it.

The CPQ workaround shipped as part of v1 — functional enough to demonstrate value, documented carefully enough to inform what came next.

---

## 07 Outcome

Onboarding time for roofing customers was cut by more than half compared to previous implementations. But the time reduction, while meaningful, wasn't the most significant outcome.

The more important result was qualitative. Contractors coming onto the platform after the golden account existed had a fundamentally different first experience. Instead of logging into a blank, generic system and watching an implementation engineer build their world from scratch, they logged into something that already spoke their language. The feedback we heard repeatedly was a version of the same thing: "it feels like this was made for us."

That shift in first impression changed the entire onboarding dynamic. The conversation moved from "let me explain what this platform can do" to "let's talk about what you want to do differently."

The workarounds built during this phase — CPQ, workflow automations, the pipeline architecture — became the input that shaped multiple product features over the following months. The golden account was never just a template. It was where the product learned what roofing contractors actually needed.

---

## 08 What I'd Do Differently

The ICP definition we started with was wrong, and we found out the hard way.

We built v1 assuming our target customer was a roofing-only contractor. In practice, almost no roofing contractor does only roofing. They do gutters, siding, windows — full exterior work. The v1 pipeline architecture didn't account for multi-trade projects. When we started bringing customers onto the golden account and they started describing their actual business, we had to go back and rebuild significant parts of the architecture into v2.

It cost us time and created rework that was avoidable.

If I were starting over, the first thing I would do differently is talk to more contractors before touching a single configuration — and ask specifically whether they operated across multiple trades. One direct question in early discovery would have caught this before it became an architectural constraint.

The broader lesson: when you're defining the ICP for a new vertical, your assumptions about who the customer is are the most dangerous thing in the room. They feel obvious. They rarely are. The work to validate them is worth doing before the build, not after it.

---

## Case Study 2 — The Booking Stopgap

**File:** `src/pages/work/booking-stopgap.md`

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

**Pull quote:**
```
"The product thinking moment was recognizing
this wasn't meant to scale forever."
```

**Case study body:**

---

## 01 Situation

Every roofing contractor has a website. And on every roofing contractor's website, there's some version of the same CTA — "Get a free inspection," "Contact us today," "Book now." When a homeowner with a leaking roof finds that page, they expect to do something. Fill out a form. Pick a time. Start the process.

Zuper had a way to handle this. Sort of. The platform supported custom booking pages — a form that lived at a hosted URL, captured customer information, and created the right record in Zuper on submission. It worked. But every single one was built by hand. Custom code, custom hosting, one engineer and one DevOps person, roughly a full day of work per contractor.

When we were onboarding a handful of roofing customers a quarter, that was manageable. As the vertical grew, it became a tax that compounded with every new account. And it broke the golden account model entirely — the whole point of cloning was that a contractor logged in on day zero and found a system that already worked. A booking widget that had to be hand-built and manually hosted after the fact wasn't part of that. It was a gap in the foundation I had built.

---

## 02 The Real Problem

The surface problem was that booking widgets took too long to build. That was true, but it wasn't the real problem.

The real problem had three layers, and I only discovered all of them over time.

The first layer was scalability. The custom-build approach didn't scale — one day, two people, per contractor, with no reuse between them.

The second layer was compliance. Zuper had a telephony service that allowed contractors to text their customers. US regulations require that any form collecting customer contact information must include a visible hyperlink to the company's terms and conditions and privacy policy — a requirement tied to 10DLC approval. Without 10DLC, contractors couldn't legally send text messages through the platform. The booking widget was the data entry point. Which meant the booking widget was also the compliance gate. Our original generic widget didn't have configurable links for each contractor's legal pages. As more customers came on with both the widget and telephony, this became a real blocker — not a nice-to-have fix.

The third layer was fragmentation. Contractors didn't all want the same thing. Some wanted customers to book and schedule an inspection directly. Some wanted to capture the lead but handle scheduling internally. Some wanted to store everything a customer said in a lead qualification job without creating an inspection at all. Some only wanted a contact record, because they ran their lead qualification in a separate CRM that synced with Zuper. One generic widget couldn't serve all of these. And nobody had mapped the variation yet.

The real problem wasn't that widgets were slow to build. It was that the entire approach — custom, manual, non-cloneable — was structurally incompatible with the vertical architecture I had built.

---

## 03 Constraints

**No native feature.** Zuper didn't have a configurable booking widget on the product roadmap at the time. Any solution had to be built outside the platform.

**No dedicated engineering resources.** This sat outside the core product build, which meant I was working with what I could build or configure myself.

**Compliance was non-negotiable.** The 10DLC requirement wasn't optional. Any solution that couldn't support per-contractor legal links wasn't a real solution.

**The golden account dependency.** Whatever we built had to eventually become something that could be cloned on day zero. A manual build process — no matter how fast — was only a stopgap.

**Growing demand.** Roughly three out of every five new roofing customers were asking for a booking widget. And among those who had one, almost all wanted a customized version once the 10DLC issue surfaced. The volume was accelerating faster than the custom approach could absorb.

---

## 04 Process

The pattern became visible before I understood what it meant.

I was reviewing implementation tasks across roofing accounts and kept seeing booking widget work listed as a manual step — build, configure, deploy, hand off. I started tracking how often it appeared, how long it took, and who it involved. Then I went to the source: customer calls, conversations with Business Analysts and Solution Architects who were closest to the implementations.

What I heard confirmed the pattern but added something I hadn't expected. Contractors weren't all asking for the same thing. When I listened carefully to how they described their business process — how they handled incoming leads, when they wanted to involve their own team, what they trusted software to do versus what they wanted to control themselves — four distinct configurations emerged. Not endless variation. Four types. Every contractor I spoke to fit into one of them.

The 10DLC connection came from a customer call. A contractor mentioned they were having trouble getting their telephony approved and asked if the booking form was the issue. I didn't know immediately, but it triggered something — I had enough cross-team context to know that telephony compliance and the booking widget were closer together than anyone had mapped. I checked with the PM handling telephony. The link was real.

With that full picture — the four modes, the compliance requirement, the scalability problem — I built a case. I documented the data: how many customers were affected, how many variations existed, how long the manual process took, what the 10DLC blocker meant downstream. I stress-tested the framing with the SVP before taking it to product.

The feature got deprioritized. So I built the prototype.

---

## 05 The Decision

The decision wasn't whether to build a stopgap. The decision was what the stopgap was *for*.

I could have built something fast and functional, deployed it, and called it done. The custom-build process was already taking a day and two people per contractor. Even a partial improvement would have been an improvement.

But I knew from the golden account work that anything requiring manual effort per contractor was architecturally incompatible with where we were going. The ultimate solution wasn't a faster stopgap. It was a native feature that cloned with the account on day zero — no setup required. The stopgap's job was to hold the line and make the case, not to become the permanent answer.

So I built the prototype with that frame explicitly in mind. Not "how do I solve this for current customers" but "how do I build something real enough to show exactly what the native feature needs to do."

I used AI tools to think through architecture and edge cases, and built a working multi-tenant system in a few hours using React, TypeScript, Supabase, and n8n. One universal widget. Four configurable booking modes. Territory matching. Per-account 10DLC compliance links. An admin panel where a new contractor account could be configured in under two minutes. A subdomain-based hosting model that meant no deployment required per customer — just a configuration change.

The multi-tenant architecture was the part I was most proud of. Each contractor was a fully isolated tenant — their own Zuper API key encrypted in the backend, their own service configuration, their own booking behavior. The frontend never touched an API key. Every Zuper call went through a backend proxy that validated the tenant on every request.

Building it was harder than I expected. Which was the point.

---

## 06 What Shipped

The prototype itself didn't go to production. The Chief Architect's assessment was that the engineering effort to make it production-ready was significant enough that it made more sense to build the native feature properly than to ship an intermediate version. That was the right call.

What actually shipped was the decision — made in hours instead of weeks.

Traditionally, getting a feature from "this is a problem" to "this is prioritized and spec'd" takes months of PRD reviews, alignment meetings, and roadmap negotiations. The prototype compressed that loop. When I walked the Principal PM through the working system, he could see exactly what the feature needed to do, exactly where the complexity lived, and exactly what a simpler version would miss. The four booking modes. The 10DLC compliance requirement — which he hadn't known about because telephony sat with a different PM. The territory matching logic. The multi-tenant isolation requirements.

His original plan was a straightforward booking form — one mode, basic fields, get it out the door. After seeing the prototype and the data behind it, the feature scope expanded to match what customers actually needed. It's now being built properly.

The custom pages approach continues for current customers while the native feature is in development. Not ideal — but understood and bounded. It has a clear end date.

---

## 07 Outcome

The native feature is in development. That's the outcome that matters.

Before the prototype, the feature was deprioritized and not spec'd. After it, the feature had a clear scope, a PM who understood what it needed to do, and a development timeline. The prototype didn't ship — but it changed the trajectory of a product decision that affects every roofing customer the platform will ever onboard.

That's the version of "outcome" I find most interesting. Not lines of code shipped. The moment a decision moved from "this is someone's problem" to "this is something we're building."

---

## 08 What I'd Do Differently

I'd have built the prototype sooner.

I spent several months trying to move the feature through the standard process — documenting the problem, making the case to product, waiting for prioritization. When that didn't work, I built the prototype. The prototype moved things faster in three hours than the documentation had in three months.

I defaulted to the process because building a prototype felt presumptuous — like I was stepping outside my lane. It wasn't. It was the most effective tool I had. I'd use it earlier next time.

The other thing I'd change: I started the PRD assuming simplicity and discovered complexity midway through. That's a recoverable mistake, but it meant the scope conversation with the PM happened after I had already framed it as a lighter lift. A more thorough upfront architecture review — even an informal one — would have set more accurate expectations from the start.

The broader lesson: the time you spend quantifying a problem before escalating it is never wasted. Data is what moves a deprioritized request onto a roadmap. Instinct alone doesn't.

---

## Case Study 3 — The Deposit Spec

**Status: Reserved for post-launch. Add when ready.**

```
Tags:     ZUPER  ·  FIELD SERVICE  ·  SPEC WRITING
Title:    When the Real Problem Is Two Layers Down
Summary:  Contractors knew what they wanted. Engineering knew
          what they needed. Nobody had written the translation.
Link:     /work/deposit-spec
```

This is the translator case study — strongest differentiator for
spec writing and cross-functional communication skills.
Draft via Q&A session when ready to add.

---

## Writing Index Page

```
Page title:     Writing

Header copy:
Product teardowns, operational frameworks,
and thinking from the boundary between
customer reality and product systems.

I write to make sense of what I'm seeing —
not to perform expertise I don't have.

Featured essay label (above hero essay):   — Featured
Essay index header:                        All writing  ↓
```

---

## Essay 1 — Rapido Teardown

**File:** `src/pages/writing/rapido-teardown.md`

```yaml
---
title: "What B2B SaaS Can Learn From India's Fastest-Growing Mobility App"
hook: "Rapido nailed the habit loop. But they're still optimizing for the ideal user — not the actual one."
tags: ["Teardown", "B2B SaaS", "Consumer"]
date: "Jan 2026"
readTime: "12 min"
slug: "rapido-teardown"
featured: true
---
```

**Body:**

I use Rapido every week. It's solved my biggest mobility problem in India — getting anywhere, anytime, cheaply.

But last Sunday, I hit a UX wall I didn't expect.

I booked a bike while exiting the metro. By the time I walked to the gate, my ride was 2 minutes away. Perfect timing — except I couldn't view my metro ticket to scan at the exit.

The app assumed sequential behavior: finish metro → book ride.

But I work in parallel: book ride while exiting metro → both ready when I reach the street.

That 10-second friction made me realize something bigger: Rapido has nailed the core habit loop. But they're still optimizing for the ideal user — not the actual one.

This small gap sent me down a rabbit hole. I started analyzing why Rapido works so well despite these rough edges. What I found wasn't just about mobility — it was a masterclass in building products that become habits.

Here's what I learned tearing down Rapido as a PM, and what B2B SaaS products can steal from it.

---

## Why Rapido Works When Others Struggle

To understand Rapido's success, you have to understand India's urban mobility problem first.

India has a structural mismatch in transportation. Short trips dominate — most rides are under 5km. Two-wheelers are the primary vehicle, not cars. And price sensitivity is extreme. A ₹10 difference matters.

Uber and Ola were built for car-first Western markets. They brought that playbook to India and tried to make it work. Rapido did something different: they built for bike-first reality.

The numbers tell the story. Rapido has 31.8 million monthly active users, just shy of Uber's 33.6 million. But here's what matters more: Rapido added 33 million new downloads in 2024 alone — nearly double Uber's 17.7 million. They're doing 4.3 million daily rides compared to Uber's 3 million. And in the bike taxi segment they created, they own 56% market share.

This isn't luck. It's strategy built on understanding what makes Rapido hard to beat.

First, their supply-side economics are fundamentally different. Captains don't pay a 20–30% commission per ride. Instead, they pay ₹9–29 per day as a subscription and keep 100% of their fares. This means more captains stay online, which means higher availability for riders. It's a simple change with compounding effects.

Second, the demand-side experience removes friction. Rapido charges ₹20 base plus ₹3 per kilometer. No surge pricing. No dynamic algorithms. Just transparent pricing you can predict. The average wait time is 2–3 minutes, not 5–10. When you open the app, you know what you'll pay and how long you'll wait.

Third, they've built network effects in local markets. More captains online creates better rider reliability. Higher rider volume creates more stable income for captains. The flywheel accelerates city by city, market by market.

The moat isn't technology. It's captain availability at the right price point. And that's hard to replicate once it's established.

---

## The Apple Ecosystem Pattern: How Rapido Built a Habit Loop

Here's what surprised me most about Rapido: it's not a super-app. It's a habit loop.

Most companies chase the super-app dream by adding every service they can think of. Rapido did something smarter. They built a habit first, then expanded within that habit.

Stage 1 was pure core value. Between 2015 and 2019, Rapido was just bike taxis. That's it. But they solved one problem perfectly: "I need to get there NOW." Cheaper than autos, faster than cabs, always available. Over time, I stopped asking "should I use Rapido?" and started just opening Rapido. The decision became automatic.

Stage 2 was strategic surface area expansion. From 2020 to 2023, they added metro ticket booking, parcel delivery, and auto/cab rides. Each new service leveraged the existing captain network and user habit. Metro tickets meant I could skip queues and get better rates without leaving the app. Parcels used the same captains I already trusted. Autos and cabs gave me options when I needed more space — but I was already in Rapido's world.

Stage 3 is where it gets interesting. Now in 2024 and beyond, I'm in ecosystem lock-in. Every new service Rapido launches, I try it first. Not because I'm evaluating each service independently, but because the habit is already built. I'm not choosing Rapido for each service — I'm choosing to stay in Rapido's world.

This is the Apple playbook. Hook with one undeniable product. Expand once trust is built. Each new product benefits from existing habit instead of fighting to create new ones.

---

## What B2B SaaS Can Learn From Rapido's Playbook

This isn't just a mobility story. It's a product expansion playbook that translates directly to B2B SaaS.

**Lesson 1: Start with undeniable core value — not feature parity**

Rapido didn't try to be "Uber but Indian." They could have launched with the full stack — autos, cabs, bikes, everything. Instead, they built bike taxis because that's what users actually needed, what the market could support, and what competitors ignored.

In B2B, this means you don't build "Salesforce for X industry." You build the one workflow that's broken and expensive. You nail that before expanding.

At Zuper, we didn't start with a full field service management suite. We started with scheduling — the highest-pain workflow. Then dispatch. Then inventory. Then invoicing. Each expansion leveraged existing adoption and trust.

**Lesson 2: Expand surface area only after habit is built**

Rapido waited five years before adding autos. Five years.

Because bike taxis built captain trust. When they added metro tickets and parcels, they weren't asking users to trust them with new categories. They were asking users to use their existing trust in new ways.

This is where most B2B products fail. They launch ten features at once, hoping something sticks. Features don't create habits — repeated use of one valuable thing creates habits. Then other features can piggyback on that habit.

**Lesson 3: Optimize for high-frequency, low-friction use cases**

Rapido made a specific bet. Most rides are short. Most users book multiple times per week. Speed matters more than luxury. So they optimized for speed: 2–3 minute wait times, transparent pricing, one-tap booking for frequent routes.

In B2B: don't optimize for the annual review meeting. Optimize for the daily 5-minute task. Slack didn't win because of video calls. They won because sending a message was instant. Linear didn't win because of roadmaps. They won because creating an issue took 3 keystrokes.

**Lesson 4: Build for actual behavior, not ideal behavior**

Rapido assumed users finish their metro journey, exit the station, and then book a ride. Sequential. Logical.

But actual behavior is different. I book my ride while exiting the metro. I need both things simultaneously.

This happens in every B2B product. You assume linear workflows. Users work in parallel, context-switch constantly, and develop workarounds you never imagined. Your product has 5–10 of these gaps right now. They're invisible until you watch actual users.

---

## The One Missed Opportunity: Fixing the Metro Ticket Gap

When I book a ride during metro exit, I can't access my metro ticket without canceling the ride. This creates friction at exactly the wrong moment — when I'm in a hurry.

The fix is straightforward: add a "View Metro Ticket" button in the ride booking flow, show the ticket as an overlay that doesn't interrupt the booking, or auto-detect metro bookings and surface the ticket in the notification bar during active ride requests.

The impact isn't just about fixing one workflow. It's about signaling: "We understand how you actually use this." That signal strengthens ecosystem stickiness.

Your power users — the ones who use your product most frequently — are using it in ways you didn't design for. Those workflows are your next features. Not clever additions. Friction removal.

---

## The Competitive Strategy: Where Rapido Wins

Rapido wins on availability, price, and speed. The subscription model attracts more captains. Transparent pricing removes decision fatigue. 2–3 minute wait times beat the standard. And the product was built specifically for India's two-wheeler reality, not adapted from Western car-first markets.

Rapido loses on safety perception, comfort, and long-distance rides. Bikes feel riskier. Weather and helmet hair matter. Bikes tire both riders and captains on longer trips.

Here's the thing: Rapido wins on frequency and price. Uber and Ola win on occasion and comfort. Rapido owns the daily commute. Uber and Ola own airport runs and date nights.

Rapido doesn't need to beat Uber everywhere. They just need to own the high-frequency use case. Because high-frequency use cases create habits. And habits create long-term value.

---

## The Bigger Lesson: Build Habits, Not Super-Apps

Great products don't just solve problems. They become habits.

Rapido did that by starting small — bike taxis only. They nailed one thing: speed plus price. Then they expanded once trust was built.

That's the lesson for B2B SaaS. Don't build a super-app. Build a habit. Then expand.

Start with undeniable core value. Optimize for high-frequency, low-friction use cases. Expand only after the habit is built. And always — always — build for actual behavior, not ideal behavior.

The products that win long-term aren't the ones with the most features. They're the ones that become automatic.

---

*Written in Jan 2026. Part of my ongoing product teardown series.*

---

## Essay 2 — Spotify Wrapped

**File:** `src/pages/writing/spotify-wrapped.md`

```yaml
---
title: "How Spotify Turned Usage Data Into an Annual Identity Ritual"
hook: "Most imitators copy the format. They miss the emotional architecture underneath."
tags: ["Teardown", "Consumer", "Product Design"]
date: "Dec 2025"
readTime: "14 min"
slug: "spotify-wrapped"
featured: false
---
```

**Body:**

This year, ChatGPT gave me a "Wrapped" experience. It labeled me a Strategist.

The label itself was forgettable. But my reaction wasn't.

I paused. Reflected. Mentally nodded along.

Not because it was accurate — but because it reflected me back to myself.

This moment captures the core mechanic of reflection-based product rituals. In B2C, reflection feeds identity and self-expression. In B2B, it feeds validation — the feeling that someone truly understands your reality, your workflow, your pain. Different markets, same human instinct.

And this instinct is what Spotify Wrapped exploits better than any other product feature in the past decade.

---

## The Wrapped Proliferation: Why Everyone Has One Now

Today, nearly every consumer product ships some version of a year-in-review. ChatGPT, Duolingo, Apple Music, Reddit, Strava, GitHub — all of them have one.

This proliferation isn't inherently bad. Rituals are meant to spread. But here's what I've noticed: most of these features get used once, screenshotted maybe, and forgotten. Meanwhile, Spotify Wrapped dominates cultural conversation for 2–3 days every single year.

The difference isn't in the data. It's in the emotional architecture.

Spotify Wrapped isn't just a feature. It's an annual event. Users don't discover it — they wait for it.

---

## How Wrapped Actually Works: The Product Mechanics

At the surface level, Wrapped is just a data summary. But the actual product mechanics are more deliberate than they appear.

**Narrative structure: story arc, not dashboard**

Most products show you a readout. Here's your stats: total listening time, most played artist, top genres. All information visible at once, organized logically.

Spotify builds a story. Act I: the hook. Act II: the build — your #1 artist revealed, how much time you spent with them, how that compares to other listeners. Act III: the climax — your top songs, curated into a playlist. Act IV: the identity moment — you're a specific listening personality type, here's what that means. Act V: the flex — you're in the top X% of this artist's listeners.

Each screen is a reveal, not a readout. There's pacing, anticipation, build-up. The narrative has a protagonist: you.

**Interpretation over information**

Most products show you what you did. Wrapped tells you what it means.

Generic year-in-review: "You watched 847 videos." Wrapped equivalent: "You went deep on indie finds." Generic: "Your top category: Productivity." Wrapped: "You're a growth seeker."

Spotify adds an editorial interpretation layer that transforms metrics into meaning. This is expensive — it requires copywriting for dozens of possible states, data science to classify behavior, design for hundreds of permutations. But it's what separates data from story.

**The identity anchor: listening personality**

The most powerful moment in Wrapped isn't your top artist. It's the personality classification.

2023 examples: The Vampire (replayed the same song endlessly), The Hypnotist (long sessions, deep focus), The Alchemist (genre-fluid, eclectic taste), The Maverick (obscure artists, off-mainstream).

Why this works: it's categorical, not continuous. You're not "7.3 on the adventurousness scale" — you're The Maverick, a tribe with an identity. Every type sounds interesting. There's no "basic listener" category. Even playing the same song 500 times becomes "The Vampire" — obsessive dedication. And it's ambiguous enough to feel personal, like a horoscope: specific enough to resonate, vague enough to project onto.

**Design for distribution, not retention**

Most product features optimize for return usage, task completion, time in app. Wrapped optimizes for screenshots, Instagram stories, social media shares, cultural participation.

The design choices that enable this: 9:16 format (Instagram story native), text that's large and readable on mobile thumbnails, high contrast backgrounds that screenshot well. One idea per screen. Share button on every screen. Copy written to be read by others, not just for you. Released globally on the same day, creating FOMO and cultural synchronicity.

These aren't random choices. Each one is optimized for a specific outcome: making your Wrapped story travel.

---

## Why Most "Wrapped" Clones Don't Work

**Apple Music Replay** is available year-round, which means it's never urgent. It's a webpage, not a story — all information visible at once, no reveals, no pacing. There's no interpretation layer: pure statistics, no "what this means about you." It's desktop-first and doesn't screenshot well. The result: Replay gets used by power users who discover it. Wrapped gets used by everyone because they're waiting for it.

**YouTube Music Recap** does some things better — annual release, some narrative structure, shareable cards. But the identity moment is weak. "Your vibe was..." classifications feel generic. The aesthetic is derivative. The lesson: copying the format doesn't copy the magic.

---

## The Deeper Product Lessons

There's a developer meme: "Spotify Wrapped is just a couple of SQL queries, but the whole world waits for it every year."

Whether this is technically accurate doesn't matter. The insight is real.

As PMs and engineers, we naturally focus on system complexity, technical elegance, engineering effort. But users evaluate products on: does it solve a real need? How does it make me feel? Is it worth my attention?

The gap between these perspectives is where product leadership lives.

Wrapped is valuable not because it's hard to build, but because it solves an emotional job-to-be-done that users didn't know they had: "Help me understand and express who I was this year through my music."

**Data without interpretation is just noise**

Every product generates data about user behavior. Most products stop at presentation. Wrapped adds the crucial second step: interpretation.

"You listened to 50,000 minutes" → "You're in the top 1% of listeners." "You played this song 200 times" → "This was your anthem." "You listened to 50 genres" → "You're a sonic explorer."

Users don't want to do interpretive work. They want meaning handed to them. They want to feel understood. Raw data: "I listened to a lot of music." Interpreted: "I had a relationship with music this year." That's the difference.

Data becomes valuable only after interpretation is attached. Not after collection. Not after visualization. After meaning.

**Accuracy is optional, resonance is not**

Here's an uncomfortable truth: Wrapped doesn't need to be perfectly accurate to succeed. Users regularly question their results — "How is this my top song? I barely remember listening to it." Spotify's methodology is opaque. Users can't verify or audit results.

Yet people still share enthusiastically.

Wrapped isn't trying to be a forensic accounting of your listening. It's offering a flattering, shareable narrative about your identity. If the narrative feels "true enough" — if it resonates with your self-concept — the specific numbers don't matter.

When building identity-based features, optimize for resonance over precision. A story that feels 80% true but is emotionally compelling will outperform data that's 100% accurate but emotionally flat.

**Gen Z psychology and shareable identity**

Spotify Wrapped didn't just ride social media trends. It aligned with Gen Z's relationship to identity: identity is performative, self-expression is social currency, stories are how personality travels.

Same data. Different framing. Added interpretation. Emotional resonance.

The open question worth sitting with: what is the B2B equivalent of a Gen Z Instagram story?

Not a PDF. Not a table. Not a CSV export. But a moment of recognition that validates the work, creates identity ("we're a fast-shipping team"), is worth sharing internally or on LinkedIn, and makes people feel seen.

The opportunity is enormous.

---

## The Core Insight

Spotify Wrapped succeeded because it solved a problem most products don't acknowledge: people don't want data about themselves. They want stories.

Stories that make sense of their choices. Validate their identity. Give them something worth sharing. Make them feel seen and understood.

The genius of Wrapped isn't the data collection — every streaming service has that. It's the emotional architecture built on top of that data.

Most products ask: "How can we show users their data?" Spotify asked: "What story do users want to tell about themselves? How can we make them the protagonist? What would they share even if we didn't ask?"

That shift in framing is what transformed a year-end summary into an annual cultural ritual.

Users don't remember your product's features. They remember how your product made them feel about themselves.

Wrapped makes users feel seen, understood, special, and part of something bigger.

And that's why they don't just use it. They wait for it.

---

*Written in Dec 2025. Part of my ongoing product teardown series.*

---

## Projects Index Page

```
Page title:     Projects

Header copy:
A PM who can't prototype is a PM who
can't think in three dimensions.

These are things I built to solve problems
I had — and to stay honest about what
building actually costs.

Sub-header:
Shipping your own problems first is the
fastest way to develop product judgment
you can't fake.
```

---

## Project 1 — Iris

**File:** `src/pages/projects/iris.md`

```yaml
---
title: "Iris"
problem: "I needed a frictionless way to move things between my own devices — and to stop using WhatsApp as a file transfer hack."
stack: ["React 18", "TypeScript", "Supabase", "Lovable", "Tailwind CSS", "Shadcn/UI"]
year: "2026"
slug: "iris"
---
```

**Body:**

## The Problem

I work across four devices simultaneously — an Android phone, an iPad, a personal laptop, and an office laptop. Every day, without fail, I need to move something between them. A screenshot on my phone that I need open on my laptop. A file on my office machine I want at home. A link I want on a different screen.

Sounds trivial. In practice it's a daily tax on focus — small enough that no one talks about it, significant enough that it compounds badly across a week.

I tried all the obvious options. WhatsApp means sending things to yourself — which requires adding your own number as a contact, watching your file transfers sit inside the same thread as your family conversations, and using a social app as infrastructure. Email is worse: composing a message to yourself, with a subject line, to move a file from one device to another feels like using a truck to buy groceries. AirDrop is perfect when it works, which is only when your devices are all Apple, close together, and both awake. Cloud storage solves it partially, but you're managing folders and filenames and sync delays. You're not sending — you're storing and later retrieving. That's a different mental model and more friction than the problem deserves.

What I wanted was something that felt like texting yourself. Instant. No friction. No setup. No folders. Just: here's a thing, send it there, done.

And while I was solving it for myself — if I was building frictionless transfers between my own devices, why not make it work between me and the handful of people I actually exchange things with? Not a social network. Not a team tool. Just a small, private space where I can reach the people I choose, without everything living inside a platform that owns my data.

That was the original idea. A private bridge. Between my devices, and between me and the people I actually trust.

---

## D-Chat: The Version I Built for Myself

The first version took about four hours and I called it D-Chat. Yes, after myself. Yes, that's embarrassing. Yes, it worked exactly as intended.

The stack was React 18, TypeScript, Supabase for the backend, and Lovable to accelerate the build. The core mechanic was an 8-character private code instead of a phone number or email — you share the code, the other device enters it, you're connected. Sessions auto-expire after 7 days. Files stored as signed URLs. No persistent storage beyond what you explicitly sent.

The key design decisions weren't technical — they were decisional. I didn't want user accounts with email verification. I didn't want app installs as a prerequisite. I didn't want setup friction. So I built device registration instead of user registration: name your device, generate a code, pair by entering the code or scanning a QR. That's it. You're in.

Groups came the day after v1, when I realized I wanted to broadcast to all my devices at once — drop a file in one place, have it appear everywhere. Groups were scoped for that purpose only. Not for team collaboration. Not for general use. For "all my devices."

What D-Chat taught me was the hardest part of building something — even something small — isn't technical. It's knowing what to exclude. AI helped me move faster. It didn't decide whether groups should exist, how much message history to preserve, whether QR codes should persist between sessions. Those decisions came from living the problem. That's the only way to make them without second-guessing yourself.

---

## The Decision to Rebuild

At some point I started thinking about publishing it properly — as a real app, on the Play Store, something other people could use. That realization forced me to look at what I'd actually built with honest eyes.

D-Chat had significant UI debt. The original design used Neumorphic styling — soft embossed and debossed surfaces, shadows on everything, a visual language that was distinctive but had real structural problems. In dark mode, the shadow range was so limited that elements blended together. Contrast ratios failed accessibility standards. The technique that made D-Chat look interesting on a laptop in light mode made it nearly unusable on a phone at night.

The brand was also wrong for something public-facing. "D-Chat" was personal shorthand. It didn't communicate the product's purpose to someone encountering it for the first time.

So I rebuilt it. New name — Iris. New design system — a dark-first, layered glass aesthetic with proper surface hierarchy, a primary purple accent, and WCAG AA contrast throughout. New design brief that documented every decision: color tokens, typography scale, spacing grid, component behavior, accessibility requirements. The brief was written before a single line of the redesign was touched.

The rebuild taught me something the first build hadn't: designing for someone else requires you to document your own taste. Building D-Chat for myself, I could hold all the visual decisions in my head. The moment I imagined a stranger downloading Iris and forming their first impression, I had to make every implicit decision explicit. The design brief was that process.

---

## Key Product Decisions

**Code-based identity over accounts.** The choice to use 8-character codes instead of phone numbers or emails wasn't about privacy as a feature — it was about reducing the cost of connection. You share a code. They enter it. The trust is implied by the sharing, not extracted as a prerequisite.

**Device registration, not user registration.** You're not registering as a person. You're registering a device. That distinction changes the mental model: Iris is infrastructure between your devices and the people you choose, not a social profile you maintain.

**Sessions that expire.** 7-day auto-expiry felt like artificial friction and I almost reversed it twice. But the alternative — permanent connections — meant Iris became something you had to manage. The expiry means the connection only exists when it's active. That keeps the app small. Small was the point.

**What I cut.** Read receipts and typing indicators exist for 1:1 chats but not groups. Message reactions, replies, search — all out of scope. The bar was: screenshot to another device in under 5 seconds. Anything that didn't help that wasn't included.

---

## What I'd Do Differently

The Neumorphic design system in D-Chat was a mistake I made by not thinking far enough ahead. I chose it because it looked interesting on my laptop. I didn't test it in dark mode on a phone. The rebuild fixed it, but rebuilding a design system from scratch is expensive — more expensive than doing it right once.

On scope: groups were the right call, but I built them the day after launch because I needed them immediately, not because I'd thought them through. The architecture held up. I got lucky. I'd spend one more hour upfront mapping where the product could go before I needed groups, and decide intentionally rather than urgently.

The name D-Chat was fine for a personal tool. Spending a few more minutes on it before the first commit would have saved the rename cost later.

---

## Project 2 — Pulseboard

**File:** `src/pages/projects/pulseboard.md`

```yaml
---
title: "Pulseboard"
problem: "A colleague asked what I'd been working on lately. I blanked — not because I hadn't done enough, but because I couldn't remember it all."
stack: ["Lovable", "Supabase", "Claude", "GPT-4"]
year: "2025"
slug: "pulseboard"
---
```

**Body:**

## Why I Built This

A few weeks into my role as Customer Product Manager at Zuper, a colleague asked me a simple question: "So what have you been working on lately?"

I blanked.

Not because I hadn't done enough. The opposite — I work across product, CX, sales, marketing, and RevOps simultaneously. On any given week I might be sitting in a customer call, writing a spec, debugging an implementation, and reviewing a roadmap request. The work is scattered by design. The problem is that scattered work doesn't accumulate naturally into a narrative. It just disappears.

My colleague laughed and suggested I start tracking. I opened a new tab instead.

The obvious solution was a spreadsheet. The problem with a spreadsheet is that it records what happened but doesn't help you understand it. I wanted something that could tell me not just what I logged, but what it added up to — which teams I'd been pulling toward, where my effort was actually going versus where I thought it was going, what I could point to at a performance review without having to reconstruct three months from memory.

That's Pulseboard. Not a tracker — a lightweight reflection system. The distinction matters: a tracker is passive, a reflection system is active. One stores data. The other surfaces patterns.

---

## The Build

I scoped the idea with GPT, wrote the technical spec with Claude, built the UI on Lovable, and used Supabase for the backend. The whole thing from idea to working app was a weekend.

That speed is the point. I wasn't trying to build a product company. I was trying to solve a problem I had, fast enough to learn from using it rather than from planning it.

The build process itself was a deliberate experiment in what a PM without a dedicated engineering team can actually ship. The answer, it turns out, is more than most people assume — if you're willing to write a tight spec, pick tools that reduce surface area, and be honest about what v1 doesn't need to do.

What shipped: daily activity logging with auto-categorization by work type and team, weekly and monthly summaries that visualize effort distribution, AI-generated performance summaries that pull from the log and produce something close to review-ready language, and secure login so the data stays private.

What didn't ship in v1: anything social, anything collaborative, anything that required managing other people's data. Pulseboard is a personal tool. That constraint kept the scope honest.

---

## What the Build Revealed

The most useful thing Pulseboard taught me wasn't about the product. It was about how I'd been spending my time.

Within two weeks of logging consistently, the pattern was clear: I was spending significantly more time on implementation support and cross-team coordination than I had estimated. The work that felt most visible to me — writing specs, sitting with customers — was a smaller fraction of my actual week than I'd assumed. The invisible work — answering BA questions, unblocking engineers, reviewing edge cases — was eating more than I realized.

That's the gap between what you think you're doing and what you're actually doing. Pulseboard made it legible.

The second thing it revealed: AI-generated summaries are good at volume but bad at weight. The system could produce a paragraph describing a busy week accurately, but it couldn't distinguish between a week where I made one important decision and a week where I handled twenty routine tasks. That's a product gap I'd fix in v2 — some way to flag signal items separately from noise items, so the summary reflects significance, not just activity.

---

## What I'd Do Differently

The spec I wrote before building was too focused on features and not focused enough on the data model. I defined what the app would do — log, categorize, summarize — before I defined what the data would need to look like to make those things useful. That order created rework. When I got to building the categorization logic, I had to revisit decisions I thought I'd already made.

The lesson: for any app that generates insights from logged data, start with the output, not the input. Define what the weekly summary should look like, then design the data model that makes it possible, then build the logging interface that captures it. I did it in the wrong order and paid for it in one unnecessary rebuild of the category schema.

I also built the AI summary feature too early. It was the most satisfying feature to demo — watching it generate a paragraph from a week of logs felt like proof the thing worked. But I used that satisfaction as a reason to stop building rather than a reason to keep asking questions. The summary feature was impressive before it was useful. I'd swap that order.

Small thing: the name. Pulseboard captures the "reflection system" idea reasonably well. I'd think harder about it next time. Names are cheaper to change before launch than after.

---

## Project 3 — The Voice Agent

**File:** `src/pages/projects/voice-agent.md`

```yaml
---
title: "The Voice Agent"
problem: "A contact form would tell you I'm interested in AI product work. A voice agent shows you how I think about it."
stack: ["VAPI", "Deepgram", "ElevenLabs", "GPT-4o Mini"]
year: "2026"
slug: "voice-agent"
---
```

**Build log post (also published to writing section):**

**File:** `src/pages/writing/voice-agent-build-log.md`

```yaml
---
title: "I Built a Voice Agent for My Portfolio. Here's What I Actually Decided."
date: 2026-05-18
tags: ["AI", "voice", "product", "build-log"]
description: "Most portfolio sites have a contact form. I built a voice agent instead. Not because it's clever — because it's the clearest way I know to show how I think about AI systems."
slug: "voice-agent-build-log"
featured: false
---
```

**Body (project page):**

## Why I Built This

Most portfolio sites have a contact form. Mine has a voice agent.

If I'm positioning myself for AI product work, the most credible signal I can offer isn't a case study about AI — it's an AI system I built, running live, that someone can talk to right now.

Voice changes the interaction in a way text doesn't. It's faster, warmer, and harder to fake. If the agent sounds coherent and handles real questions without falling apart, that's a more honest signal than anything I could write about it. And if someone asks how it works, there's a natural conversation about how I think about AI systems.

So the question was never whether to build it. It was how to build it so it actually worked.

---

## What I Built vs What the Infrastructure Handles

This distinction matters, so I want to be direct about it.

I didn't build the speech-to-text engine, the voice synthesis model, or the real-time audio streaming layer. Those run on Deepgram, ElevenLabs, and VAPI respectively. Assembling off-the-shelf components isn't the work — the work is the decisions you make about how to connect them, what logic governs the system, and what the experience feels like when it all runs together.

What I built is the intelligence layer.

**The knowledge architecture.** A voice agent is only as good as what it has to say. The default approach is a single system prompt with everything the agent might need — background, instructions, examples, edge cases, all in one block. The cost is real: every cold start loads that full context before the agent speaks its first word. I split the knowledge into two layers. A lean system prompt (~280 tokens) handles identity, tone, and behavior rules. The actual knowledge about my work — projects, decisions, career arc — lives in a separate knowledge base the agent retrieves from on demand. Basic RAG applied to a voice context. It cut cold-start latency significantly.

**The first message.** VAPI generates the opening line via an LLM call by default. That's 3–5 seconds before the user hears anything. I hardcoded a static first message instead — it fires instantly, costs nothing, and the conversation starts before the user has time to wonder if it's working.

**Audience detection.** The system prompt routes conversations by who the agent is talking to. It opens with a question that identifies whether it's speaking to a recruiter, a hiring manager, or someone just curious. The answer changes how deep and technical the rest of the conversation gets. A recruiter gets a sharp three-sentence summary. A founder gets the architecture decisions. Same agent, different routing.

**The pronunciation fix.** ElevenLabs reads "Dilith" and hears "delete." TTS engines pattern-match on visual form, not intent. I created a pronunciation dictionary via the VAPI API — an alias rule that maps "Dilith" to "Dil-ith" before the text ever reaches the voice model. A small fix, but the kind of thing that breaks trust immediately if you miss it.

**STT tuning.** Deepgram runs transcription at ~100ms latency. I added keyterms — "Dilith," "Zuper," "VAPI" — so the transcriber is primed for the vocabulary of the conversation. Smart Endpointing detects when a user has actually finished speaking rather than cutting them off mid-sentence.

---

## Architecture Decisions That Weren't Obvious

**System prompt versus knowledge base.** The instinct is to put everything in the system prompt because it's simpler. But voice has a different latency profile than text — every token in that initial context is time the user spends waiting. The split forces a useful discipline: what does the agent need to know *always* versus what does it need to retrieve *on demand*? Instructions and persona belong in the system prompt. My project details belong in the knowledge base.

**Model choice.** I'm running GPT-4o Mini. For a conversational agent pulling from a structured knowledge base, the smaller model is fast enough — and the latency difference against GPT-4o is real and audible in voice. The reasoning ceiling on this task isn't high: retrieval plus coherent speech, not complex inference. Reaching for the most capable model available would have been the wrong call.

**What the agent says about itself.** If someone asks how it works, it answers: designed by me, using STT, an LLM reasoning layer, and TTS orchestrated via VAPI. I made a deliberate choice not to obscure the infrastructure. Owning the architecture is more interesting than pretending the agent appeared from nowhere.

---

## What This Is Evidence Of

Building a voice agent isn't hard. The components are accessible, the APIs are well-documented, and VAPI abstracts enough of the complexity that something basic runs in an afternoon.

The interesting part is the decision-making under real constraints. Cold-start latency is a real user experience problem. A pronunciation error breaks trust in three syllables. Audience detection changes what a good response even means. None of those are solved by picking the right platform. They're solved by thinking clearly about what the system needs to do and making specific choices to get there.

That's the job. Not building models. Deciding how to connect them, what logic to put between them, and what the person on the other end actually needs.

---

## What I'd Do Differently

The knowledge base structure was designed for breadth — cover anything someone might ask — rather than precision. The agent handles most questions well, but when someone asks about a specific decision inside a specific project, retrieval sometimes surfaces adjacent content rather than the exact thing. The fix is more granular chunking: organizing the knowledge base by decision rather than by project.

The fallback behavior also needs work. When the agent doesn't know something, it deflects politely but evasively. A cleaner design would have it acknowledge the gap directly and route to email. I'd rebuild that path.

Audience detection works, but the routing question is blunt — it gets most people into the right mode, but edge cases feel awkward. A simpler detection approach, or one that just asks directly, would handle them better.

*[Review this section before publishing — adjust based on what actually broke during real usage.]*

---

*The agent is live on the homepage. Talk to it.*

---

## Now Page

Note: The Now page includes a live Spotify Now Playing widget (`SpotifyNowPlaying.astro`)
positioned between the page header and the first section divider. It shows the currently
playing track (with animated equalizer bars) or last played track. No copy needed — it's
live data from the Spotify API via Netlify function.

```
Page title:     Now
Subtitle:       What I'm working on, reading, and
                thinking about — updated regularly.

Last updated:   May 2026

Currently Building:

At Zuper: Scaling the roofing vertical architecture across trade
          types, and mapping which parts of the onboarding process
          can be handed off to AI.

Side:     Iris — the web app is fully built. Now extending it
          to mobile. The mobile MVP exists; the real build is underway.

Side:     Voice agent live on the homepage — built as a proof-of-thinking
          for AI product work. Iterating on retrieval precision
          and fallback routing.

Currently Reading:

Love and Other Words — Christina Lauren.
A deliberate break from frameworks and field notes.
Turns out reading for pure enjoyment is its own kind of reset.

Currently Thinking About:

→ What does AI-native product management actually look like
  when the users are offline and physical?

→ Where does vertical SaaS end and
  industry-specific AI begin?

→ How do you design AI that steps back while still doing its job —
  reducing cognitive load for people in physically demanding
  environments instead of adding to it?

Looking For:

APM or product roles at Series A/B
product-led companies.

Particularly interested in: vertical SaaS,
AI-first products, B2B tools built for
people doing physical work.

Open to conversations even if the timing
isn't right yet.

→ dilithdinesh007@gmail.com
```

---

## About Page

*Note: This page is prose only. Zero bullet points. Every section is paragraphs.*

```
Page title:     About

Opening:
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

---

Section: How I got here

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

---

Section: How I think

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
FC Barcelona taught me that the best teams
don't always have the most resources.
They have the clearest identity. Messi left.
Financial chaos followed. Real Madrid and
others could simply buy their way out of
any problem. Barca couldn't. And yet —
players still chose them, took pay cuts
to be there, and a group of young kids
alongside Lewandowski under Flick delivered
anyway. That's not talent. That's system,
belief, and a way of playing that people
want to be part of. Early product work at
a Series A or B company feels exactly like
this. You're not the one with the biggest
budget or the most engineers. You win by
knowing exactly what you're building and
why — and by having people who believe in
that enough to give more than the resources
require.

Restraint as a product principle
The mental model I keep returning to:
just because I can doesn't mean I should.
In product, this means the best decision
is often the one that removes a feature,
narrows the scope, or says no to the
reasonable request that would quietly
break three other things.

One other thing worth mentioning — I have
a habit of hiding easter eggs in internal
tools I build. Admin panels that only reveal
themselves after a specific sequence of
clicks. Riddles instead of login screens.
Dan Brown-style entrances to low-stakes
internal dashboards. It's not secure. It's
not scalable. But for a small team tool
built on a weekend, it makes the thing feel
alive — and reminds me that good products
have personality, not just function.

---

Section: Where I'm going

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

---

Closing:

If something here resonates — a project,
an essay, a way of thinking about a problem
you're working on — I'd genuinely like to
hear about it.

→ dilithdinesh007@gmail.com
→ LinkedIn  (links to https://linkedin.com/in/dilithdinesh)
```

---

## Contact Page

```
Page title:     Contact

Opening:
If you're building something that needs
this kind of thinking — I want to hear
about it.

Divider: ————

Section: I'm currently open to

APM and product roles at Series A/B
product-led companies

Conversations about vertical SaaS,
AI-first product, and field operations

Feedback on my writing — especially
if you disagree with something

Divider: ————

Email:     dilithdinesh007@gmail.com
LinkedIn:  LinkedIn →  https://linkedin.com/in/dilithdinesh

Closing line:
I read everything. I reply to most things.
```

---

## OG Image (Social Preview)

```
Size:        1200 × 630px
Background:  #1A1A1A (dark)
Text color:  #F9F7F4 (off-white)

Content:
  Large:   DILITH DINESH
           (Cabinet Grotesk, ~80px, top-left area)

  Medium:  Product operator at the boundary between
           customer reality and product systems.
           (Inter, ~28px, below name)

  Small:   dilithdinesh.com
           (Inter, ~20px, bottom-left)

Create in Figma or Canva.
Save as /public/og-image.png
```

---

## 404 Page

```
Large text:   404
Body:         Page not found
Link:         ← Back home
```

---

## Checklist Before Each Build Session

```
Before Session 2 (Home):
  ✓ Email address filled in (Global section)
  ✓ LinkedIn URL filled in (Global section)
  ✓ Essay publish dates filled in
  □ All home page copy reviewed and feels like your voice

Before Session 3–4 (Case Studies):
  ✓ Roofing Vertical case study written in full (all 8 sections)
  ✓ Booking Stopgap case study written in full (all 8 sections)
  — Deposit Spec deferred to post-launch

Before Session 5 (Writing):
  ✓ Rapido essay final version pasted
  ✓ Spotify essay final version pasted
  ✓ Both essay dates filled in (Jan 2026 / Dec 2025)

Before Session 6 (Projects):
  ✓ Iris build log written (full arc — D-Chat origin → Iris rebuild)
  ✓ Pulseboard build log written
  ✓ Voice Agent build log written

Before Session 7 (Now + About):
  ✓ Now page "Last updated" date filled in (May 2026)
  ✓ Currently Building section filled in (all three items)
  ✓ Currently Reading section filled in
  ✓ Third "Currently Thinking About" question filled in
  ✓ About page reviewed — does every sentence sound like you?

Before Session 8 (Contact):
  ✓ Email address confirmed
  ✓ LinkedIn URL confirmed

Before Session 9 (SEO):
  □ OG image created and saved to /public/og-image.png
  □ Google Search Console account created

Post-Launch (Month 1–2):
  □ Deposit Spec case study drafted via Q&A
  □ Add third work card to home page and work index
  □ Review "What I'd Do Differently" in voice agent page — update
    based on real usage before it's been live 30 days
```

---

*Fill in placeholders. Ship the site.*
