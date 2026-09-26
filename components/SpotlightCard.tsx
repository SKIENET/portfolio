"use client";

import type { HTMLAttributes, MouseEvent } from "react";

export default function SpotlightCard({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </div>
  );
}
