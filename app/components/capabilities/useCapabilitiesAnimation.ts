"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * GSAP Scroll Entrance Animation for the Core Capabilities Section.
 * Staggered entrance of section eyebrow, title, sub, capability cards, and closing statement.
 */
export function useCapabilitiesAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".capabilities-eyebrow",
            ".capabilities-title",
            ".capabilities-sub",
            ".cap-card",
            ".capabilities-closing",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial state
      gsap.set(".capabilities-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".capabilities-title", { y: 22, opacity: 0 });
      gsap.set(".capabilities-sub", { y: 18, opacity: 0 });
      gsap.set(".cap-card", { y: 25, opacity: 0, scale: 0.99 });
      gsap.set(".capabilities-closing", { y: 18, opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".capabilities-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".capabilities-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".capabilities-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(
          ".cap-card",
          { y: 0, opacity: 1, scale: 1, stagger: 0.09, duration: 0.7 },
          0.35
        )
        .to(".capabilities-closing", { y: 0, opacity: 1, duration: 0.6 }, 0.85);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tl.play();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    }, root);

    return () => ctx.revert();
  }, [root]);
}
