"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Coordinated GSAP scroll entrance for the OdFe Kitchen Showcase section.
 * Triggers when the section enters the viewport with an IntersectionObserver.
 */
export function useKitchenAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".kitchen-eyebrow",
            ".kitchen-title",
            ".kitchen-sub",
            ".kitchen-connector",
            "#kitchenMockupWrap",
            ".kitchen-footer-copy",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial hidden states
      gsap.set(".kitchen-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".kitchen-title", { y: 22, opacity: 0 });
      gsap.set(".kitchen-sub", { y: 18, opacity: 0 });
      gsap.set(".kitchen-connector", { y: 16, opacity: 0 });
      gsap.set("#kitchenMockupWrap", { y: 35, opacity: 0, scale: 0.98 });
      gsap.set(".kitchen-footer-copy", { y: 18, opacity: 0 });

      // Create entrance timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".kitchen-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".kitchen-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".kitchen-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(".kitchen-connector", { y: 0, opacity: 1, duration: 0.5 }, 0.32)
        .to(
          "#kitchenMockupWrap",
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.4
        )
        .to(".kitchen-footer-copy", { y: 0, opacity: 1, duration: 0.55 }, 0.6);

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
