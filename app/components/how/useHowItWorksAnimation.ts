"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * GSAP Scroll Animation for How OdFe Works Vertical Timeline.
 * Animates progress line down the vertical timeline and triggers sequential step activation as section enters viewport.
 */
export function useHowItWorksAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".how-eyebrow",
            ".how-title",
            ".how-sub",
            ".how-summary",
            ".how-line-progress",
            ".how-step-item",
            ".how-closing",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial state
      gsap.set(".how-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".how-title", { y: 22, opacity: 0 });
      gsap.set(".how-sub", { y: 18, opacity: 0 });
      gsap.set(".how-summary", { y: 14, opacity: 0 });
      gsap.set(".how-line-progress", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".how-step-item", { y: 25, opacity: 0, scale: 0.98 });
      gsap.set(".how-closing", { y: 18, opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".how-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".how-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".how-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(".how-summary", { y: 0, opacity: 1, duration: 0.5 }, 0.3)
        .to(".how-line-progress", { scaleY: 1, duration: 1.1, ease: "none" }, 0.35)
        .to(
          ".how-step-item",
          { y: 0, opacity: 1, scale: 1, stagger: 0.16, duration: 0.65 },
          0.4
        )
        .to(".how-closing", { y: 0, opacity: 1, duration: 0.6 }, 1.1);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tl.play();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    }, root);

    return () => ctx.revert();
  }, [root]);
}
