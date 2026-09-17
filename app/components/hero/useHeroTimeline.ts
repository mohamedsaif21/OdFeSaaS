"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Coordinated GSAP entrance sequence for the OdFe SaaS Hero.
 * Scoped to the hero container with gsap.context() for clean lifecycle teardown.
 */
export function useHeroTimeline(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".nav",
            "h1 .line > span",
            ".sub",
            ".actions",
            ".hero__perks",
            "#dashWrap",
            "#floaterLeft",
            "#floaterRight",
            "#featureGrid .feature-card",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial hidden states
      gsap.set(".nav", { y: -20, opacity: 0 });
      gsap.set("h1 .line > span", { yPercent: 110 });
      gsap.set([".sub", ".actions", ".hero__perks"], {
        y: 18,
        opacity: 0,
      });
      gsap.set("#dashWrap", { y: 35, opacity: 0, scale: 0.98 });
      gsap.set("#floaterLeft", { x: -25, opacity: 0, scale: 0.92 });
      gsap.set("#floaterRight", { x: 25, opacity: 0, scale: 0.92 });
      gsap.set("#featureGrid .feature-card", { y: 20, opacity: 0 });

      // Orchestrated Entrance Sequence
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      tl.to(".nav", { y: 0, opacity: 1, duration: 0.6 }, 0)
        .to(
          "h1 .line > span",
          { yPercent: 0, duration: 0.85, stagger: 0.08, ease: "power4.out" },
          0.12
        )
        .to(".sub", { y: 0, opacity: 1, duration: 0.55 }, 0.38)
        .to(".actions", { y: 0, opacity: 1, duration: 0.55 }, 0.48)
        .to(".hero__perks", { y: 0, opacity: 1, duration: 0.5 }, 0.58)
        .to(
          "#dashWrap",
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.62
        )
        .to(
          "#floaterLeft",
          { x: 0, opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.4)" },
          0.9
        )
        .to(
          "#floaterRight",
          { x: 0, opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.4)" },
          0.98
        )
        .to(
          "#featureGrid .feature-card",
          { y: 0, opacity: 1, stagger: 0.09, duration: 0.5 },
          1.08
        );
    }, root);

    return () => ctx.revert();
  }, [root]);
}