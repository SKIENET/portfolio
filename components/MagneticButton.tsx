"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  target?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900";
const variants = {
  primary: "bg-electric-500 text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.8)] hover:bg-electric-600",
  ghost: "border border-white/20 text-white hover:border-electric-400 hover:text-electric-300",
};

export default function MagneticButton({ children, onClick, href, variant = "primary", className = "", target }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const shared = {
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.96 },
    className: `${base} ${variants[variant]} ${className}`,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} {...shared}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} {...shared}>
      {inner}
    </motion.button>
  );
}
