"use client";

import { useRef } from "react";
import PosMockup from "./PosMockup";
import { usePosAnimation } from "./usePosAnimation";

type Capability = {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const CAPABILITIES: Capability[] = [
  {
    num: "01",
    title: "Fast order entry",
    desc: "Find products instantly and build an order without unnecessary steps.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Easy customization",
    desc: "Add modifiers, notes, sizes and extras without slowing down the queue.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Instant kitchen handoff",
    desc: "Completed orders move directly into the kitchen workflow.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function PosShowcase() {
  const root = useRef<HTMLElement>(null);
  usePosAnimation(root);

  return (
    <section className="pos-section" ref={root}>
      <div className="pos-wash" />
      <div className="guides" />

      <div className="pos-container">
        {/* TOP SECTION HEADER */}
        <div className="pos-header">
          <div className="pos-eyebrow">
            <span className="pos-eyebrow__dot" />
            <span>POS · BUILT FOR SPEED</span>
          </div>

          <h2 className="pos-title">
            Every order.<br />
            <span className="pos-title__accent">Handled in seconds.</span>
          </h2>

          <p className="pos-sub">
            Give your team a faster way to take orders, customize every item, and send tickets straight to the kitchen — without switching between systems.
          </p>
        </div>

        {/* TWO-COLUMN SHOWCASE LAYOUT */}
        <div className="pos-layout">
          {/* LEFT COLUMN: EDITORIAL PRODUCT EXPLANATION */}
          <div className="pos-left">
            <div className="pos-counter-badge">
              <span className="pos-counter-badge__icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M4 12h16M4 17h10" stroke="#14503E" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span>Built for the counter</span>
            </div>

            <div className="pos-capabilities">
              {CAPABILITIES.map((cap) => (
                <div className="pos-cap-item" key={cap.num}>
                  <div className="pos-cap-item__top">
                    <span className="pos-cap-item__num">{cap.num}</span>
                    <span className="pos-cap-item__icon">{cap.icon}</span>
                  </div>
                  <h3 className="pos-cap-item__title">{cap.title}</h3>
                  <p className="pos-cap-item__desc">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: POS MOCKUP INTERFACE */}
          <div className="pos-right">
            <PosMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
