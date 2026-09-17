"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Coordinated GSAP scroll entrance for the One Connected Workflow section.
 * Triggers when the section enters the viewport with an IntersectionObserver.
 */
export function useWorkflowAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".workflow-eyebrow",
            ".workflow-title",
            ".workflow-sub",
            ".workflow-node-card",
            ".micro-example-card",
            ".workflow-closing",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial hidden states
      gsap.set(".workflow-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".workflow-title", { y: 22, opacity: 0 });
      gsap.set(".workflow-sub", { y: 18, opacity: 0 });
      gsap.set(".workflow-node-card", { y: 25, opacity: 0, scale: 0.96 });
      gsap.set(".micro-example-card", { y: 25, opacity: 0 });
      gsap.set(".workflow-closing", { y: 18, opacity: 0 });

      // Create entrance timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".workflow-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".workflow-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".workflow-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(
          ".workflow-node-card",
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.65 },
          0.35
        )
        .to(".micro-example-card", { y: 0, opacity: 1, duration: 0.65 }, 0.7)
        .to(".workflow-closing", { y: 0, opacity: 1, duration: 0.55 }, 0.85);

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
