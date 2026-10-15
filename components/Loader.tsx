"use client";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) { setDone(true); return; }
    let tl: any;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { MorphSVGPlugin } = await import("gsap/MorphSVGPlugin");
      if (cancelled) return;
      gsap.registerPlugin(MorphSVGPlugin);
      MorphSVGPlugin.convertToPath("circle, rect, polygon");

      const finish = () => { sessionStorage.setItem("loaded", "1"); setDone(true); };
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("#caption", { opacity: 1 });
        gsap.delayedCall(0.8, finish);
        return;
      }
      tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power2.inOut", duration: 0.8 } })
        .to("#ld-tri", { morphSVG: "#ld-a" })
        .to("#ld-sq", { morphSVG: "#ld-m" }, "<0.2")
        .to("#ld-circ", { morphSVG: "#ld-l" }, "<0.2")
        .to("#caption", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .to(root.current, { opacity: 0, duration: 0.6, delay: 0.7, onComplete: finish });
    })();
    return () => { cancelled = true; tl?.kill(); };
  }, []);

  if (done) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-900">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 100 430 190" className="w-[min(80vw,520px)]">
        <defs>
          <linearGradient id="ld-g" x1="222" y1="268" x2="606" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#93c5fd" />
            <stop offset="0.55" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <g id="ld-letters">
            <path id="ld-a" d="M222.8 264.5c0-.7.2-1.6.6-2.8l48.4-134.1c.7-2.2 3.4-3.3 8.2-3.3h6c4.7 0 7.4 1.1 8 3.3l48.4 134.3c.5 1 .7 1.8.7 2.6 0 2.3-3 3.5-8.8 3.5h-1.7c-4.7 0-7.4-1-8.1-3.3l-12-33.4h-60l-11.7 33.4c-.7 2.2-3.4 3.3-8.2 3.3h-1c-5.8 0-8.8-1.2-8.8-3.5zm35.3-48.8H307L285.5 155l-2.7-11.8-3.2 11.8-21.5 60.8z" />
            <path id="ld-m" d="M368 268V125H390L433 205L476 125H498V268H481V158L439 236H427L385 158V268Z" />
            <path id="ld-l" d="M526 125H544V252H606V268H526Z" />
          </g>
        </defs>
        <polygon id="ld-tri" fill="url(#ld-g)" points="241,242 283,157 326,242" />
        <rect id="ld-sq" fill="url(#ld-g)" x="363" y="157" width="85" height="85" />
        <circle id="ld-circ" fill="url(#ld-g)" cx="530" cy="200" r="42.5" />
      </svg>
      <p id="caption" style={{ opacity: 0, transform: "translateY(8px)" }}
         className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-slate-400">
        Anti Money Laundering
      </p>
    </div>
  );
}
