"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * GSAP Scroll Entrance Animation for the One Workspace, Many Roles section.
 * Animates section eyebrow, headline, sub, role filter tabs, central workspace hub, SVG lines, role cards, and section closing.
 */
export function useRolesAnimation(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const el = root.current;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          [
            ".roles-eyebrow",
            ".roles-title",
            ".roles-sub",
            ".roles-tabs",
            ".roles-center-hub",
            ".role-card",
            ".roles-connection-path",
            ".roles-closing",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Initial state setup
      gsap.set(".roles-eyebrow", { y: 16, opacity: 0 });
      gsap.set(".roles-title", { y: 22, opacity: 0 });
      gsap.set(".roles-sub", { y: 18, opacity: 0 });
      gsap.set(".roles-tabs", { y: 16, opacity: 0 });
      gsap.set(".roles-center-hub", { scale: 0.94, opacity: 0 });
      gsap.set(".role-card", { y: 25, opacity: 0, scale: 0.98 });
      gsap.set(".roles-closing", { y: 18, opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".roles-eyebrow", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(".roles-title", { y: 0, opacity: 1, duration: 0.75 }, 0.1)
        .to(".roles-sub", { y: 0, opacity: 1, duration: 0.55 }, 0.22)
        .to(".roles-tabs", { y: 0, opacity: 1, duration: 0.5 }, 0.3)
        .to(".roles-center-hub", { scale: 1, opacity: 1, duration: 0.65 }, 0.35)
        .to(
          ".role-card",
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.65 },
          0.45
        )
        .to(".roles-closing", { y: 0, opacity: 1, duration: 0.6 }, 0.85);

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
