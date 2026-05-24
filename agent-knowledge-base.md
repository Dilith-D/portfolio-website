# Dilith Dinesh - AI Agent Knowledge Base

Knowledge base for the AI voice agent on dilithdinesh.com.
Each section is a self-contained chunk for RAG retrieval.
Written in third person so the agent can convert to first person via its persona layer.

---

## Who is Dilith Dinesh

Dilith Dinesh is a Customer Product Manager at Zuper, a B2B SaaS platform for field
service management. He works at the boundary between customer operations and product
systems, translating what breaks in the field into capabilities the product can scale.
He studied Computer Science at VIT University in India, spent his first year at Zuper as
an implementation engineer working directly with customers, and moved into product
management after building a deep understanding of how the platform was actually used,
not just how it was designed to be used. His long-term goal is to become an AI-first
product manager, specifically at the intersection of operational reality and AI-native
product thinking. He is currently based in Chennai, India, and is open to APM and
product manager roles at Series A and Series B product-led companies.

---

## Career arc and background

Dilith's career path was not a straight line into product. He graduated from VIT
University with a degree in Computer Science, which gave him enough technical depth to
understand how systems are built. Rather than moving directly into a product role, he
joined Zuper as an implementation engineer. That meant he spent almost a year
configuring the product for real customers before he ever had a product title.
He watched which workflows got abandoned. He learned where the gap between how a
product was designed and how it was actually used was widest. When he moved into
product management, he already knew where the problems lived. He did not need customers
to describe their pain, because he had sat close enough to the work to see it directly.
That operational foundation is the thing he considers his strongest differentiator
compared to product managers who came up through a more traditional path.

---

## Current role at Zuper

Zuper is a field service management platform used by contractors and service businesses
to manage scheduling, dispatch, invoicing, quoting, and customer communication. Dilith
joined as an implementation engineer and transitioned into a Customer Product Manager
role after roughly one year. In that role, he sits at the intersection of customer
success, sales, and product engineering. He runs discovery with customers, writes
product specifications, manages the golden account architecture for the roofing
vertical, and works across teams to translate customer friction into requirements that
engineering can act on. His primary focus has been building and scaling the roofing
vertical from scratch, which involved creating a pre-configured cloneable account
architecture, building workarounds for missing platform features, and working closely
with the SVP and Chief Architect on vertical strategy. He also works on cross-functional
initiatives spanning marketing, RevOps, and the implementation team.

---

## Case study: The Roofing Vertical

When Zuper decided to go deep on roofing as a vertical, there was no repeatable way to
onboard a roofing contractor. Every implementation was rebuilt from scratch. Dilith was
brought onto the core execution team to build what became known as the golden account: a
pre-configured, fully cloneable account with roofing-specific workflows, job types,
terminology, automations, and configurations already in place.

The real problem turned out to be larger than onboarding speed. The golden account was
actually a product discovery mechanism. By building it, Dilith could identify exactly
what roofing contractors needed that the platform did not yet provide. They were using
five or six other tools alongside Zuper because the platform had gaps. The golden
account was where Zuper could begin to close those gaps.

The most important decision was about CPQ, which stands for configure price quote.
Roofing estimates are calculation-heavy and the platform did not have a native CPQ
engine. Dilith chose to build a workaround using existing platform capabilities, with
every workaround documented explicitly as temporary. Real usage of the imperfect
solution generated better product requirements than any abstract specification would
have. The CPQ workaround shaped the native feature that shipped several months later.

Outcomes: onboarding time for roofing customers was cut by more than 50 percent.
Contractors logging into the platform on day zero found a system that already felt built
for them. The most common feedback was some version of "it feels like this was made for
us." The workarounds built during this phase became the input that shaped multiple
product features over the following months.

What he would do differently: the ICP definition was wrong at the start. The team
assumed the target customer was a roofing-only contractor. Almost no roofing contractor
does only roofing. They do gutters, siding, and windows as well. One direct question in
early discovery would have caught this before it became an architectural constraint.

---

## Case study: The Booking Stopgap

Every roofing contractor has a website with some version of a "book an inspection"
button. Zuper supported custom booking pages, but each one was built by hand. One
engineer, one DevOps person, roughly a full day of work per contractor. As the roofing
vertical grew, this became a tax that compounded with every new account.

The real problem had three layers. First, the custom-build approach did not scale.
Second, US regulations require booking forms that collect contact information to include
visible links to the company's terms and conditions and privacy policy, tied to 10DLC
messaging compliance. The original generic widget did not support per-contractor legal
links, which meant contractors could not legally send text messages through the
platform's telephony service. Third, contractors did not all want the same thing. After
listening carefully, Dilith identified four distinct booking modes that covered every
contractor he spoke to.

The feature was deprioritized by product engineering. So he built a working prototype in
a few hours using React, TypeScript, Supabase, and n8n. One universal widget. Four
configurable booking modes. Per-account 10DLC compliance links. An admin panel where a
new contractor could be configured in under two minutes. A subdomain-based hosting
model that required no deployment per customer.

The prototype did not go to production. The Chief Architect assessed that making it
production-ready would cost more than building the native feature properly. What
actually shipped was the decision, made in hours instead of weeks. The Principal PM
expanded the feature scope after seeing the working system. The native feature is now
in development.

What he would do differently: he would have built the prototype much sooner. He spent
several months trying to move the feature through the standard process before building
it. The prototype moved things faster in three hours than documentation had in three
months.

---

## Project: Iris

Iris is a cross-device private file and message transfer app that Dilith built to solve
a daily friction in his own life. He works across four devices simultaneously, and every
day he needs to move something between them: screenshots, files, links. The obvious
options all had problems. WhatsApp meant sending things to yourself inside a social
messaging app. Email required composing a message with a subject line just to move a
file. AirDrop only works within Apple devices. Cloud storage adds folder management and
sync delays. What he wanted was something that felt like texting himself. Instant, no
friction, no setup.

The first version took about four hours and was called D-Chat. The stack was React 18,
TypeScript, Supabase, and Lovable. The core mechanic was an 8-character private code
instead of a phone number or email address. You share the code, the other device enters
it, and you are connected. Sessions auto-expire after seven days. No persistent storage
beyond what was explicitly sent.

He rebuilt it under the name Iris when he decided to publish it properly. The original
design system had contrast problems in dark mode on mobile. He designed a new dark-first
visual system with WCAG AA contrast throughout, and wrote a full design brief before
touching a single line of the redesign.

Key decisions: codes instead of accounts to reduce the friction of connection, device
registration rather than user registration because Iris is infrastructure between
devices rather than a social profile, and seven-day session expiry to keep the app
small and active rather than something you have to manage.

---

## Project: Pulseboard

Pulseboard is a personal work-tracking and reflection tool for product managers. It
started with a simple moment. A colleague asked Dilith what he had been working on
lately, and he blanked. Not because he had not done enough, but because scattered work
across product, customer success, sales, marketing, and RevOps does not accumulate
naturally into a narrative. It just disappears.

The obvious solution was a spreadsheet. The problem with a spreadsheet is that it
records what happened but does not help you understand it. Dilith wanted something that
could tell him not just what he logged, but what it added up to. Which teams he had
been pulling toward. Where his effort was actually going versus where he thought it was
going.

He scoped the idea with GPT, wrote the technical specification with Claude, built the
UI on Lovable, and used Supabase for the backend. The whole thing from idea to working
app was a weekend. What shipped: daily activity logging with auto-categorization,
weekly and monthly summaries that visualize effort distribution, AI-generated
performance summaries, and secure login.

The most useful thing Pulseboard revealed was about how he had been spending his time.
Within two weeks of logging consistently, the pattern was clear. He was spending
significantly more time on implementation support and cross-team coordination than he
had estimated. The invisible work was eating more of his week than the visible work.

---

## Project: The Voice Agent

The voice agent live on dilithdinesh.com is a working AI system that Dilith built
himself. If he is positioning himself for AI product work, the most credible signal is
an AI system he built running live, not a case study about AI.

The infrastructure runs on VAPI for orchestration, Deepgram for speech-to-text
transcription, and ElevenLabs for voice synthesis. But the infrastructure is not the
work. The work is the decisions made about how to connect them.

The knowledge architecture splits into two layers. A lean system prompt of roughly 280
tokens handles identity, tone, and behavior rules. The actual knowledge about his work
lives in a separate knowledge base that the agent retrieves from on demand. Basic
retrieval-augmented generation applied to a voice context. This cut cold-start latency
significantly compared to loading everything into the system prompt.

The first message is hardcoded as a static string rather than generated by an LLM call.
VAPI generates opening lines via an LLM call by default, which adds three to five
seconds of silence before the user hears anything. The static first message fires
instantly.

Audience detection routes conversations by who the agent is talking to. A recruiter
gets a three-sentence summary. A founder gets the architecture decisions. Same agent,
different routing based on an early detection question.

The pronunciation fix: ElevenLabs reads "Dilith" and hears something like "delete."
A pronunciation dictionary via the VAPI API maps the written form to the correct
phonetic form before the text reaches the voice model.

Model choice is GPT-4o Mini. For a conversational agent pulling from a structured
knowledge base, the smaller model is fast enough and the latency difference against
GPT-4o is real and audible in voice.

---

## Project: SuperPilot

SuperPilot is an AI layer for B2B sales teams built to solve a specific problem Dilith
identified from watching how enterprise deals actually move. B2B sales reps lose
significant time across deal handoffs because the context about a deal lives in six
different places: CRM notes, email threads, call recordings, Slack messages, product
feedback forms, and the rep's own memory. Every handoff loses something.

SuperPilot synthesizes that scattered context into a unified memory layer. The system
pulls from existing data sources and uses AI to generate a coherent deal narrative that
a new rep can absorb in minutes rather than hours. The stack is React, TanStack Query,
Claude Sonnet, and Deepgram.

The core product decision was to treat the AI layer as a synthesis engine rather than a
search engine. Search returns fragments. Synthesis returns understanding. That
distinction shapes how the knowledge is structured and how the output is presented.

---

## Project: The AI Shopping Buddy

The AI Shopping Buddy started with personal friction. Dilith was copy-pasting product
specifications from Flipkart into Claude just to answer a simple question: does this
phone fit my needs? The process worked, but the friction was real. He had to find the
spec sheet, copy the relevant sections, paste them into a chat window, and ask his
question. Every time.

The solution was an embeddable AI shopping layer that any e-commerce platform can add.
The user describes what they need in plain language, and the system retrieves and
interprets the relevant product specifications automatically. No spec-sheet hunting.
No copy-pasting. Just a question and an answer.

The project demonstrates his ability to identify a real user problem from personal
experience and design an AI-native solution around it. It sits at the intersection of
product spec writing and AI systems work.

---

## How Dilith thinks about product

Dilith thinks about products the way a good translator thinks about language. The job
is not to convert words, it is to convert meaning. Most product problems arrive as
noise: a contractor asking for a tweak, an ops team raising an exception, a customer
describing a workaround they have lived with for two years. The surface request is
rarely the real problem. Getting to the real problem requires sitting close enough to
the work to see what is actually breaking.

A few things shape how he approaches product problems.

He reads moral complexity from fiction, particularly Harry Potter, which trained him to
hold contradictions and recognize that most hard product decisions are between two
reasonable positions with different tradeoffs rather than between right and wrong.

He pulls pattern recognition from thrillers, particularly Dan Brown. Every customer
complaint is a data point. The interesting work is finding what connects them, the
pattern underneath the noise that points toward the actual system problem.

He thinks about formation and identity from football and FC Barcelona. The best teams do
not always have the most resources. They have the clearest identity. Early product work
at a Series A or B company feels exactly like this. You win by knowing exactly what you
are building and why.

The mental model he returns to most often: just because he can does not mean he should.
In product, the best decision is often the one that removes a feature, narrows the
scope, or says no to a reasonable request that would quietly break three other things.

He also hides easter eggs in internal tools he builds. Admin panels that only reveal
themselves after a specific sequence of clicks. It is not secure or scalable. But it
makes the thing feel alive, and good products have personality, not just function.

---

## Writing: Rapido teardown

Dilith published a teardown of Rapido, India's fastest-growing bike taxi platform, in
January 2026. The core argument is that Rapido succeeded not by being better than Uber
on the same dimensions, but by building for bike-first reality in a country where most
urban trips are under five kilometers, two-wheelers are the primary vehicle, and a
small difference in price matters.

Rapido's supply-side economics are structurally different. Drivers do not pay a
commission per ride. They pay a small daily subscription and keep 100 percent of their
fares. More drivers stay online, which means higher availability for riders, which
drives more demand, which attracts more drivers. The flywheel is simple and hard to
replicate once established.

The habit loop argument: Rapido did not launch as a super app. They built one product
for five years before expanding. When they added metro ticket booking and auto and cab
rides, they were not asking users to trust them with a new category. They were asking
users to extend existing trust in new directions.

The four lessons for B2B SaaS: start with undeniable core value rather than feature
parity, expand surface area only after habit is built, optimize for high-frequency
low-friction use cases rather than the annual review workflow, and build for actual user
behavior rather than ideal user behavior.

The missed opportunity Dilith identified: Rapido assumes users finish their metro
journey before booking a ride, but actual behavior is parallel. He books his ride while
exiting the metro. Both things need to work simultaneously. Your power users are using
your product in ways you did not design for. Those workflows are your next features.

---

## Writing: Spotify Wrapped analysis

Dilith published an analysis of Spotify Wrapped in December 2025. The argument is that
Wrapped succeeded because it solved a problem most products do not acknowledge: people
do not want data about themselves. They want stories. Specifically, stories that make
sense of their choices, validate their identity, give them something worth sharing, and
make them feel seen and understood.

The product mechanics behind Wrapped are more deliberate than they appear. It is
structured as a story arc, not a dashboard. Each screen is a reveal, not a readout.
There is pacing, anticipation, and build-up. The narrative has a protagonist, which is
the user.

The identity anchor is the most powerful moment. Wrapped classifies listeners into
named types. These work because they are categorical rather than continuous. You are
not seven point three on an adventurousness scale. You are The Maverick, a tribe with
an identity. Every type sounds interesting. There is no basic listener category.

Wrapped also optimizes for distribution rather than retention. The design choices, the
nine-by-sixteen format, one idea per screen, text readable as a thumbnail, are all
optimized for screenshots and social sharing. Released globally on the same day to
create cultural synchronicity.

The broader lesson: data becomes valuable only after interpretation is attached. Not
after collection, not after visualization, but after meaning. Most products ask how to
show users their data. Spotify asked what story users want to tell about themselves.

---

## What Dilith is looking for

Dilith is currently looking for APM or product manager roles at Series A and Series B
product-led companies. He is particularly interested in three areas.

First, vertical SaaS: platforms built for a specific industry rather than horizontal
tools. His work building the roofing vertical at Zuper from scratch is directly
applicable here.

Second, AI-first products: products where AI is embedded in the core workflow rather
than added as a feature. He has built several of these himself, including the voice
agent on his portfolio site.

Third, B2B tools built for people doing physical work: field technicians, contractors,
and people in environments where a phone is a liability. The design constraints are
completely different from typical software contexts. The stakes are higher. The
solutions have to be quieter.

He is open to conversations even when the timing is not right yet. If the mission is
interesting or the problem space overlaps with what he cares about, he would rather
talk early than miss the connection. He responds to most things he receives by email.

---

## Contact and personal details

Email: dilithdinesh007@gmail.com
LinkedIn: linkedin.com/in/dilithdinesh
Portfolio: dilithdinesh.com

Dilith is based in Chennai, India. He follows FC Barcelona closely and thinks about
product strategy in terms of team identity and formation, not just talent. He grew up
reading Harry Potter for the architecture of a world with real internal logic and
characters who contain contradictions. He reads Dan Brown for the pattern-following
structure, which trained him to look for threads connecting seemingly unrelated signals.
He is currently reading fiction for enjoyment, specifically Love and Other Words by
Christina Lauren, as a deliberate break from frameworks and field notes.

He built a voice agent for his portfolio because a contact form would tell you he is
interested in AI product work, but a voice agent shows you how he thinks about it. That
gap between claiming and demonstrating is one he cares about across everything he
builds.
