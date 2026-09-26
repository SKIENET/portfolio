"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import RevealText from "../RevealText";
import MagneticButton from "../MagneticButton";
import { useScrollTo } from "../SmoothScroll";

const ParticleNetwork = dynamic(() => import("../ParticleNetwork"), { ssr: false });

const REGIONS = ["APAC", "MENA", "UK", "UAE", "Nordic"];

export default function Hero() {
  const scrollTo = useScrollTo();

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,15,30,0.55)_55%,#0a0f1e_100%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] animate-float rounded-full bg-electric-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-electric-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyanglow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyanglow" />
          </span>
          Financial Crime Compliance
        </motion.div>

        <RevealText
          as="h1"
          text="Piyush Sharma"
          onMount
          delay={0.4}
          stagger={0.12}
          className="font-display text-[clamp(3.25rem,11vw,9.5rem)] font-bold leading-[0.9] tracking-tighter"
          wordClassName={(_, i) => (i === 1 ? "text-gradient" : "")}
        />

        <RevealText
          as="p"
          text="Financial crime doesn't follow a template. Neither do I."
          onMount
          delay={0.9}
          stagger={0.045}
          className="mt-8 max-w-3xl font-display text-[clamp(1.35rem,3vw,2.25rem)] font-medium leading-tight text-slate-100"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          <p>
            Senior AML/KYC Professional <span className="text-electric-500">|</span> Financial Crime Compliance{" "}
            <span className="text-electric-500">|</span> 4+ Years across APAC, MENA, UK, UAE &amp; Nordic
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton onClick={() => scrollTo("#builder")}>
            View My Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollTo("#contact")}>
            Let&apos;s Connect
          </MagneticButton>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 2.1 } } }}
          className="mt-14 flex flex-wrap gap-2"
        >
          {REGIONS.map((r) => (
            <motion.li
              key={r}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] tracking-widest text-slate-400"
            >
              {r}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to About"
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-electric-400" />
        </span>
      </motion.button>
    </section>
  );
}
