"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Coordinated GSAP scroll entrance for The Problem / Operational Chaos section.
 * Triggers when the section enters the viewport with an IntersectionObserver.
 */
export function useProblemAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".problem-eyebrow",
            ".problem-title",
            ".problem-sub",
            "#problemDiagramWrap",
            ".problem-card",
            ".problem-bridge",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial hidden states
      gsap.set(".problem-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".problem-title", { y: 22, opacity: 0 });
      gsap.set(".problem-sub", { y: 18, opacity: 0 });
      gsap.set("#problemDiagramWrap", { y: 30, opacity: 0, scale: 0.98 });
      gsap.set(".problem-card", { y: 20, opacity: 0 });
      gsap.set(".problem-bridge", { y: 18, opacity: 0 });

      // Create entrance timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".problem-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".problem-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".problem-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(
          "#problemDiagramWrap",
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.32
        )
        .to(
          ".problem-card",
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          0.5
        )
        .to(".problem-bridge", { y: 0, opacity: 1, duration: 0.6 }, 0.7);

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
