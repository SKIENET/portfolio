"use client";

import { useEffect, useRef } from "react";
import { SKILLS } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import RevealText from "../RevealText";

const TIER_STYLE = {
  core: "text-base sm:text-lg px-5 py-2.5 border-electric-500/40 bg-electric-500/10 text-white hover:bg-electric-500/25 hover:border-electric-400",
  tech: "text-sm sm:text-base px-4 py-2 border-cyanglow/30 bg-cyanglow/[0.06] text-cyan-100 hover:bg-cyanglow/15 hover:border-cyanglow/60",
  domain: "text-sm sm:text-base px-4 py-2 border-white/15 bg-white/[0.03] text-slate-200 hover:bg-white/[0.08] hover:border-white/30",
} as const;

const LEGEND = [
  { tier: "core", label: "Core AML / KYC", dot: "bg-electric-500" },
  { tier: "domain", label: "Domain & Typologies", dot: "bg-slate-300" },
  { tier: "tech", label: "Tools & Tech", dot: "bg-cyanglow" },
] as const;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!cloudRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-skill]",
        { autoAlpha: 0, y: 30, scale: 0.8 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.8)",
          stagger: { each: 0.04, from: "random" },
          scrollTrigger: { trigger: cloudRef.current, start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        "[data-skill-legend]",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: cloudRef.current, start: "top 85%", once: true } },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-10 select-none overflow-hidden opacity-[0.04]">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-[9rem] font-bold leading-none">
          <span className="pr-12">AML · KYC · EDD · SAR · KYB · </span>
          <span className="pr-12">AML · KYC · EDD · SAR · KYB · </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Skills &amp; Expertise</span>
          <RevealText text="The toolkit — regulatory and technical." className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl" />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {LEGEND.map((l) => (
            <span key={l.tier} data-skill-legend className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
              <span className={`h-2 w-2 rounded-full ${l.dot}`} />
              {l.label}
            </span>
          ))}
        </div>

        <ul ref={cloudRef} className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3" data-testid="skills-cloud">
          {SKILLS.map((s) => (
            <li key={s.name} data-skill className="will-transform">
              <span
                className={`inline-block cursor-default rounded-full border font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] ${TIER_STYLE[s.tier]}`}
              >
                {s.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
