"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Coordinated GSAP scroll entrance for the OdFe Smart Inventory Showcase section.
 * Triggers when the section enters the viewport with an IntersectionObserver.
 */
export function useInventoryAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".inventory-eyebrow",
            ".inventory-title",
            ".inventory-sub",
            "#inventoryMockupWrap",
            ".inventory-footer-copy",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial hidden states
      gsap.set(".inventory-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".inventory-title", { y: 22, opacity: 0 });
      gsap.set(".inventory-sub", { y: 18, opacity: 0 });
      gsap.set("#inventoryMockupWrap", { y: 35, opacity: 0, scale: 0.98 });
      gsap.set(".inventory-footer-copy", { y: 18, opacity: 0 });

      // Create entrance timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".inventory-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".inventory-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".inventory-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(
          "#inventoryMockupWrap",
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.35
        )
        .to(".inventory-footer-copy", { y: 0, opacity: 1, duration: 0.55 }, 0.55);

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
