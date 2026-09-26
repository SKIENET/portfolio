"use client";

import { motion } from "framer-motion";
import { CASES } from "@/lib/content";
import RevealText from "../RevealText";
import SpotlightCard from "../SpotlightCard";
import { useScrollTo } from "../SmoothScroll";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7" aria-hidden>
      <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 1 1 8 0v3.5" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

const LINE_WIDTHS = ["w-11/12", "w-9/12", "w-10/12", "w-7/12", "w-8/12"];

export default function Cases() {
  const scrollTo = useScrollTo();

  return (
    <section id="cases" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="section-label">Case Studies</span>
          <RevealText text="The Cases That Stay With You" className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg italic text-slate-400"
          >
            A selection of complex investigations — details shared on request.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2" data-testid="case-cards">
          {CASES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard className="group relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-ink-800/70 p-8 transition-colors duration-300 hover:border-electric-500/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-electric-400">{c.label}</span>
                  <span className="rounded-full border border-red-400/30 bg-red-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-red-300">
                    Confidential
                  </span>
                </div>

                <div aria-hidden className="mt-8 select-none space-y-4 blur-[6px] transition-[filter] duration-500 group-hover:blur-[8px]">
                  <div className="h-6 w-2/3 rounded bg-slate-400/40" />
                  {LINE_WIDTHS.map((w, j) => (
                    <div key={j} className={`h-3 rounded bg-slate-500/30 ${w}`} />
                  ))}
                  <div className="flex gap-2 pt-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full bg-electric-500/30 px-3 py-1 text-xs text-transparent">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-transparent p-8 text-center">
                  <motion.span
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="grid h-14 w-14 place-items-center rounded-2xl border border-electric-500/40 bg-ink-900/80 text-electric-300 shadow-[0_0_40px_-10px_rgba(59,130,246,0.8)]"
                  >
                    <LockIcon />
                  </motion.span>
                  <p className="font-display text-xl font-semibold">Case study locked</p>
                  <button
                    type="button"
                    onClick={() => scrollTo("#contact")}
                    className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-400 hover:bg-electric-500/15"
                  >
                    Details available on request →
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
