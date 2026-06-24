# rustok-landing

Landing page for **Rustok** — a self-custody Ethereum agent wallet (MCP over stdio, one local
Docker image, keys never leave your machine).

The page is built as a **terminal session**: the content is the transcript of an agent using the
wallet, revealed as you scroll. Built with Astro + Tailwind, statically generated, zero external
runtime requests (fonts are self-hosted).

## Stack

- **Astro 6** (static output) + **Tailwind 4** (`@tailwindcss/vite`)
- Design tokens + base styles in `src/styles/global.css`
- Self-hosted variable fonts (JetBrains Mono + Space Grotesk) in `public/fonts/`
- Vanilla TS interactions in `src/scripts/landing.ts` (scroll-reveal + copy buttons),
  respecting `prefers-reduced-motion`

> Requires **Node ≥ 22.12** (Astro 6).

## Structure

```
src/
  layouts/Base.astro        <head> meta/OG + the terminal-window shell
  components/               one component per section (Hero, Install, Tools, Safety, …)
  pages/index.astro         the landing
  pages/privacy.astro       privacy policy
  styles/global.css         design tokens + base + transcript/code helpers
  scripts/landing.ts        reveal + copy interactions
public/
  fonts/                    self-hosted woff2
  favicon.svg, og.svg       brand crystal
```

## Commands

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Dev server at `localhost:4321`           |
| `npm run build`   | Build to `./dist/`                       |
| `npm run preview` | Preview the production build locally     |

## Content source of truth

Copy, facts, and commands come from the landing spec. Facts are stated without overclaim — chains
are named exactly, the "no hard-coded spending limits" caveat is shown, and the security review is
described as a review, not a full external audit.
