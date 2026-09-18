"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * GSAP Scroll Entrance Animation for the Customer Experience Section.
 * Staggered reveal of section header, continuous journey connecting line, 6 journey stages, micro visual fragments, and closing section statement.
 */
export function useCustomerExperienceAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".cx-eyebrow",
            ".cx-title",
            ".cx-sub",
            ".cx-stage-card",
            ".cx-path-line",
            ".cx-closing",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial states
      gsap.set(".cx-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".cx-title", { y: 22, opacity: 0 });
      gsap.set(".cx-sub", { y: 18, opacity: 0 });
      gsap.set(".cx-stage-card", { y: 25, opacity: 0, scale: 0.98 });
      gsap.set(".cx-path-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".cx-closing", { y: 18, opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".cx-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".cx-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".cx-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(".cx-path-line", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.3)
        .to(
          ".cx-stage-card",
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.65 },
          0.4
        )
        .to(".cx-closing", { y: 0, opacity: 1, duration: 0.6 }, 0.9);

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
