"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CONTACT } from "@/lib/content";
import MagneticButton from "../MagneticButton";
import RevealText from "../RevealText";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32 sm:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-600/20 blur-[160px]" />
        <div className="absolute left-[15%] top-[20%] h-72 w-72 animate-float rounded-full bg-cyanglow/10 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[12%] h-80 w-80 animate-float rounded-full bg-electric-400/15 blur-[110px] [animation-delay:-5s]" />
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric-500/10" />
        <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric-500/[0.06]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="section-label justify-center">Contact</span>
        <RevealText
          text="Let's Talk Compliance"
          className="mt-6 font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tighter"
          wordClassName={(w) => (w === "Compliance" ? "text-gradient" : "")}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400"
        >
          Open to senior AML/KYC roles, consulting engagements, and conversations about where compliance meets technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="glass group flex items-center gap-2 rounded-full py-2 pl-6 pr-2">
            <a href={`mailto:${CONTACT.email}`} className="font-mono text-sm text-slate-200 transition-colors hover:text-electric-300 sm:text-base" data-testid="contact-email">
              {CONTACT.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="relative min-w-[76px] rounded-full bg-white/10 px-4 py-2 text-xs font-semibold transition-colors hover:bg-electric-500"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={copied ? "c" : "n"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="block">
                  {copied ? "Copied ✓" : "Copy"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href={`mailto:${CONTACT.email}`}>Send an Email →</MagneticButton>
            <MagneticButton href={CONTACT.linkedin} variant="ghost">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.5h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z" />
              </svg>
              LinkedIn
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
