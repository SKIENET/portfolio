"use client";

import type Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";

type ScrollTo = (target: string) => void;

const ScrollContext = createContext<ScrollTo>(() => {});

export const useScrollTo = () => useContext(ScrollContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (prefersReduced) {
        ScrollTrigger.refresh();
        return;
      }

      const lenis = new LenisCtor({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  const scrollTo = useCallback<ScrollTo>((target) => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -72, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>;
}
