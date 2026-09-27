"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { useScrollTo } from "./SmoothScroll";

export default function Nav() {
  const scrollTo = useScrollTo();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-white/5 bg-ink-900/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-electric-500 to-cyanglow" />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <button type="button" onClick={() => go("hero")} className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <img src="/avatar.png" alt="Piyush Sharma" className="h-8 w-8 rounded-lg object-cover object-top transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden sm:inline">Piyush Sharma</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className="relative rounded-full px-4 py-2 text-sm text-slate-300 transition-colors hover:text-white after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-electric-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
        >
          <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/5 bg-ink-900/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {NAV_LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <button type="button" onClick={() => go(l.id)} className="w-full py-3 text-left font-display text-2xl font-semibold text-slate-200">
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
