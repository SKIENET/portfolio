"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ABOUT_TEXT } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import RevealText from "../RevealText";
import SpotlightCard from "../SpotlightCard";
import { useScrollReveal } from "../useScrollReveal";

const FACTS = [
  { k: "4+", v: "Years in financial crime compliance" },
  { k: "6", v: "Regulatory regions covered" },
  { k: "98%+", v: "QC accuracy rate" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    if (!textRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: textRef.current, start: "top 80%", end: "bottom 55%", scrub: true },
        },
      );
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="section-label" data-reveal>
              About Me
            </span>
            <RevealText
              text="The person behind the case files."
              className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
            />
            <dl className="mt-10 grid grid-cols-3 gap-4 lg:grid-cols-1">
              {FACTS.map((f, i) => (
                <div key={f.k} data-reveal data-reveal-delay={i} className="border-l border-electric-500/40 pl-4">
                  <dt className="font-display text-3xl font-bold text-white sm:text-4xl">{f.k}</dt>
                  <dd className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl p-px lg:col-span-8"
            data-testid="about-card"
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="absolute inset-0"
            >
              <div className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2">
                <div className="h-full w-full animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,#3b82f6_60deg,#22d3ee_90deg,transparent_150deg,transparent_360deg)]" />
              </div>
            </motion.div>
            <SpotlightCard className="relative rounded-[calc(1.5rem-1px)] bg-ink-800/95 p-8 sm:p-12">
              <span aria-hidden className="absolute right-6 top-0 font-display text-8xl font-bold leading-none text-electric-500/15 sm:text-9xl">
                &ldquo;
              </span>
              <p ref={textRef} className="relative font-display text-xl leading-relaxed text-slate-100 sm:pr-10 sm:text-2xl sm:leading-relaxed">
                {ABOUT_TEXT.split(" ").map((w, i) => (
                  <span key={i} data-word className="inline">
                    {w}{" "}
                  </span>
                ))}
              </p>
              <div className="relative mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-electric-500/15 font-display font-bold text-electric-300">PS</span>
                <div>
                  <p className="font-semibold">Piyush Sharma</p>
                  <p className="text-sm text-slate-400">Senior AML/KYC Professional · Builder at heart</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
