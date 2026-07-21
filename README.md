# Anveshan Parichha — Portfolio Landing Page

Single-page dark portfolio built with React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion + hls.js.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build

```bash
npm run build
```

## Structure

- `src/components/LoadingScreen.tsx` – counting loader (000→100) with cycling words
- `src/components/Navbar.tsx` – floating pill navbar with gradient "Say hi" hover
- `src/components/Hero.tsx` – full-viewport HLS video hero with GSAP entrance timeline
- `src/components/SelectedWorks.tsx` – bento-grid project showcase
- `src/components/Journal.tsx` – horizontal pill journal entries
- `src/components/Explorations.tsx` – pinned + parallax scroll gallery (GSAP ScrollTrigger) with lightbox
- `src/components/Stats.tsx` – stat counters
- `src/components/Footer.tsx` – flipped HLS video footer, GSAP marquee, contact CTA
- `src/hooks/useHlsVideo.ts` – shared hls.js video-source hook

All colors/fonts are driven by CSS variables in `src/index.css` and mapped into Tailwind via `tailwind.config.js`, so re-theming only requires editing the `:root` HSL values.

Project images are placeholder Unsplash photos — swap the URLs in `SelectedWorks.tsx`, `Journal.tsx`, and `Explorations.tsx` for real work.
