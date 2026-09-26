"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BUILDER_STATS, EXTRACTED_FIELDS, PIPELINE_STEPS } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import RevealText from "../RevealText";
import SpotlightCard from "../SpotlightCard";
import { useScrollReveal } from "../useScrollReveal";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} data-testid="countup">
      {val}
      {suffix}
    </span>
  );
}

const Strong = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-electric-300">{children}</strong>;

export default function Builder() {
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLOListElement>(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    if (!pipelineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-pipe-line]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: pipelineRef.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 } },
      );
      gsap.utils.toArray<HTMLElement>("[data-pipe-step]").forEach((step) => {
        gsap.fromTo(
          step.querySelector("[data-pipe-card]"),
          { autoAlpha: 0.25, x: 24 },
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 78%", toggleActions: "play none none reverse" } },
        );
      });
      gsap.fromTo(
        "[data-field]",
        { autoAlpha: 0, x: -12 },
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-terminal]", start: "top 80%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="builder" ref={sectionRef} className="relative overflow-hidden py-28 sm:py-36" data-testid="builder-section">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-700 to-ink-900" />
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[30rem] w-[30rem] animate-float rounded-full bg-electric-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-[22rem] w-[22rem] animate-float rounded-full bg-cyanglow/10 blur-[120px] [animation-delay:-6s]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric-500/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-3" data-reveal>
          <span className="section-label">Beyond Compliance</span>
          <span className="rounded-full border border-cyanglow/30 bg-cyanglow/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyanglow">
            ★ Featured Build
          </span>
        </div>

        <RevealText
          text="I built the tool my team didn't know they needed."
          className="mt-6 max-w-5xl font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight"
          wordClassName={(w) => (w === "tool" || w === "needed." ? "text-gradient" : "")}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 text-base leading-relaxed text-slate-300 sm:text-lg lg:col-span-7">
            <p data-reveal>
              At my current organisation, I identified a recurring bottleneck — analysts were spending significant time manually copying client data
              from the CRM across multiple fields into EDD and SAR templates. It was tedious, error-prone, and entirely solvable.
            </p>
            <p data-reveal>
              I designed and deployed an automation pipeline using <Strong>Microsoft Power Automate</Strong> to systematically capture all relevant
              client data and documents from the CRM. This was then fed into a <Strong>custom Microsoft Copilot agent</Strong> I built, which extracted
              structured key-value pairs — lifetime funding, withdrawals, age, occupation, nationality, residence, and more — and populated the EDD/SAR
              template automatically.
            </p>
            <p data-reveal>
              The result: average handling time dropped by approximately <Strong>50%</Strong>, measured against manual AHT benchmarks, with a near-zero
              error rate. The tool was rolled out to a select group during the initial hyper-care period.
            </p>

            <div
              data-reveal
              data-terminal
              className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/80 font-mono text-xs shadow-2xl shadow-electric-900/20 sm:text-sm"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-slate-500">copilot-agent › extract_kv.json</span>
              </div>
              <div className="space-y-1.5 p-5">
                <p className="text-slate-500">{"{"}</p>
                {EXTRACTED_FIELDS.map((f, i) => (
                  <p key={f} data-field className="pl-4">
                    <span className="text-electric-300">&quot;{f}&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="rounded bg-slate-500/30 text-transparent select-none">{"█".repeat(8 + ((i * 5) % 7))}</span>
                    <span className="text-slate-500">{i < EXTRACTED_FIELDS.length - 1 ? "," : ""}</span>
                  </p>
                ))}
                <p data-field className="pl-4 text-slate-500">
                  {"// …and more"}
                </p>
                <p className="text-slate-500">{"}"}</p>
                <p data-field className="pt-2 text-emerald-400">✓ EDD/SAR template populated</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-slate-500" data-reveal>
              The Pipeline
            </p>
            <ol ref={pipelineRef} className="relative space-y-5 pl-10" data-testid="pipeline">
              <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-white/10" />
              <span
                aria-hidden
                data-pipe-line
                className="absolute bottom-6 left-[15px] top-6 w-px origin-top bg-gradient-to-b from-electric-400 via-electric-500 to-cyanglow shadow-[0_0_12px_rgba(59,130,246,0.8)]"
              />
              {PIPELINE_STEPS.map((s, i) => (
                <li key={s.title} data-pipe-step className="relative">
                  <span className="absolute -left-10 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-electric-500/50 bg-ink-900 font-mono text-xs text-electric-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <SpotlightCard data-pipe-card className="glass rounded-xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-500/40">
                    <p className="font-display text-lg font-semibold">{s.title}</p>
                    <p className="text-sm text-slate-400">{s.detail}</p>
                  </SpotlightCard>
                </li>
              ))}
            </ol>
            <div
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-amber-200"
              data-reveal
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Hyper-care rollout · select group
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3" data-testid="builder-stats">
          {BUILDER_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="will-transform"
            >
              <SpotlightCard className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8 transition-colors duration-300 hover:border-electric-500/50">
                <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-electric-500 to-cyanglow transition-transform duration-500 group-hover:scale-x-100" />
                <p className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  {s.value !== null ? <CountUp to={s.value} suffix={s.suffix} /> : <span className="text-gradient">{s.display}</span>}
                </p>
                <p className="mt-3 font-display text-lg font-semibold text-electric-300">{s.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.caption}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
