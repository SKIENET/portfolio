"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

type Options = {
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
};

/** Fades/slides children matching `selector` inside `scope` in when they scroll into view. */
export function useScrollReveal(scope: RefObject<HTMLElement | null>, { selector = "[data-reveal]", y = 48, stagger = 0.12, start = "top 82%" }: Options = {}) {
  useEffect(() => {
    if (!scope.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay ?? 0) * stagger,
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });
    }, scope);
    return () => ctx.revert();
  }, [scope, selector, y, stagger, start]);
}
