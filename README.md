# dilithdinesh.com

Personal portfolio — product case studies, teardowns, and build logs.
Live at [dilithdinesh.com](https://dilithdinesh.com), deployed on Netlify from `master`.

Built with Astro 5 + Tailwind CSS 3 + MDX. No CMS — all content is MDX/Astro files in `src/pages/`.

## Setup (new machine)

```sh
git clone https://github.com/Dilith-D/portfolio-website.git portfolio
cd portfolio
npm install

# Enable the build-map pre-push hook (git hooks don't clone):
git config core.hooksPath scripts/hooks

npm run dev       # local dev server
npm run build     # production build to dist/
```

Optional: create `.env` with `PUBLIC_POSTHOG_KEY=<key>` for local analytics builds
(production gets it from Netlify env vars).

Secrets and service state live outside this repo: Netlify (env vars, deploys),
VAPI (voice agent config + knowledge base), GA4/PostHog (analytics).

## Where things are

- `CLAUDE.md` — the authoritative design system + technical spec. Read it first.
- `CONTENT.md` — page content source.
- `src/pages/` — all routes; case studies and essays are MDX.
- `src/components/diagrams/` — hand-built SVG diagram components used in MDX.
- `src/scripts/eggs.ts` — the easter egg system.
- `scripts/hooks/pre-push` — auto-updates `public/build-map.html` from git log on push.
- `netlify/functions/now-playing.js` — Spotify Now Playing endpoint.
