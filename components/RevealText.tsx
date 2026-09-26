"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: (word: string, index: number) => string;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
};

const word: Variants = {
  hidden: { y: "110%", rotate: 4, opacity: 0 },
  show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  wordClassName,
  delay = 0,
  stagger = 0.06,
  onMount = false,
}: Props) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span className="inline" variants={container} initial="hidden" {...trigger} aria-hidden>
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span variants={word} className={`will-transform inline-block ${wordClassName?.(w, i) ?? ""}`}>
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
