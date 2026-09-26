# Piyush Sharma — Portfolio

Next.js 15 (App Router) · Tailwind CSS 3 · Framer Motion · GSAP + ScrollTrigger · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # vitest suite
npm run build && npm start
```

- Content lives in `lib/content.ts` (update email / LinkedIn in `CONTACT`).
- Lenis ↔ ScrollTrigger integration: `components/SmoothScroll.tsx` (dynamic imports, `lenis.on("scroll", ScrollTrigger.update)`, driven by `gsap.ticker`).
- Hero background: custom canvas particle network (`components/ParticleNetwork.tsx`, loaded with `next/dynamic`, `ssr: false`).
