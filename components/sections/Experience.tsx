"use client";

import { useEffect, useRef } from "react";
import { ROLES } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import RevealText from "../RevealText";
import SpotlightCard from "../SpotlightCard";
import { useScrollReveal } from "../useScrollReveal";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef, { selector: "[data-reveal-head]" });

  useEffect(() => {
    if (!trackRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: trackRef.current, start: "top 65%", end: "bottom 65%", scrub: 0.5 } },
      );
      gsap.utils.toArray<HTMLElement>("[data-role]").forEach((el) => {
        const fromLeft = el.dataset.side === "left" && window.innerWidth >= 768;
        gsap.fromTo(
          el.querySelector("[data-role-card]"),
          { autoAlpha: 0, x: fromLeft ? -60 : 60 },
          { autoAlpha: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 78%", once: true } },
        );
        gsap.fromTo(
          el.querySelector("[data-dot]"),
          { scale: 0.4, backgroundColor: "#1e2a47" },
          { scale: 1, backgroundColor: "#3b82f6", duration: 0.5, ease: "back.out(3)", scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" } },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="section-label" data-reveal-head>
            Experience
          </span>
          <RevealText text="From the alert queue to the QC desk." className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl" />
          <p className="mt-6 text-lg text-slate-400" data-reveal-head>
            Every role built on the last — from reading transactions, to shaping the process, to owning quality on the most complex cases.
          </p>
        </div>

        <div ref={trackRef} className="relative mt-20" data-testid="timeline">
          <span aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <span
            aria-hidden
            data-progress
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-electric-400 to-cyanglow shadow-[0_0_14px_rgba(59,130,246,0.9)] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-16 md:space-y-24">
            {ROLES.map((role, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              return (
                <li key={role.title} data-role data-side={side} className="relative grid md:grid-cols-2 md:gap-16">
                  <span
                    aria-hidden
                    data-dot
                    className="absolute left-4 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-ink-900 bg-electric-500 ring-1 ring-electric-500/50 md:left-1/2"
                  />
                  <div className={`pl-12 md:pl-0 ${side === "left" ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}>
                    <SpotlightCard
                      data-role-card
                      className={`group relative overflow-hidden rounded-2xl border bg-ink-800/80 p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
                        role.current ? "border-electric-500/40 shadow-[0_0_60px_-20px_rgba(59,130,246,0.6)]" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className={`flex flex-wrap items-center gap-3 ${side === "left" ? "md:justify-end" : ""}`}>
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-electric-400">
                          {String(i + 1).padStart(2, "0")} · {role.phase}
                        </span>
                        {role.current && (
                          <span className="rounded-full bg-electric-500/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-electric-300">Current</span>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">{role.title}</h3>
                      <p className="mt-2 text-slate-400">{role.summary}</p>
                      <ul className={`mt-5 space-y-2 text-sm text-slate-300 ${side === "left" ? "md:ml-auto" : ""}`}>
                        {role.points.map((p) => (
                          <li key={p} className={`flex items-start gap-2 ${side === "left" ? "md:flex-row-reverse" : ""}`}>
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric-400" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      {role.regions && (
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Regional Exposure</p>
                          <ul className={`flex flex-wrap gap-2 ${side === "left" ? "md:justify-end" : ""}`} data-testid="region-tags">
                            {role.regions.map((r) => (
                              <li
                                key={r}
                                className="rounded-md border border-electric-500/30 bg-electric-500/10 px-2.5 py-1 font-mono text-xs text-electric-200 transition-colors hover:bg-electric-500/25"
                              >
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </SpotlightCard>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
