"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Coordinated GSAP scroll entrance for the OdFe POS Showcase section.
 * Triggers when the section enters the viewport with an IntersectionObserver.
 */
export function usePosAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".pos-eyebrow",
            ".pos-title",
            ".pos-sub",
            ".pos-cap-item",
            "#posMockupWrap",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial hidden states
      gsap.set(".pos-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".pos-title", { y: 22, opacity: 0 });
      gsap.set(".pos-sub", { y: 18, opacity: 0 });
      gsap.set(".pos-cap-item", { y: 20, opacity: 0 });
      gsap.set("#posMockupWrap", { y: 35, opacity: 0, scale: 0.98 });

      // Create entrance timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".pos-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".pos-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".pos-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.25)
        .to(
          ".pos-cap-item",
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 },
          0.35
        )
        .to(
          "#posMockupWrap",
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.4
        );

      // Trigger animation on scroll into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tl.play();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    }, root);

    return () => ctx.revert();
  }, [root]);
}
