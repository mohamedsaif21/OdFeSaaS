"use client";

import { useRef } from "react";
import TimelineStep, { type HowStepData } from "./TimelineStep";
import { useHowItWorksAnimation } from "./useHowItWorksAnimation";

const STEPS: HowStepData[] = [
  {
    num: "01",
    title: "Take orders",
    description: "Capture dine-in, takeaway, QR, and online orders in one place.",
    visualType: "order",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Keep things moving",
    description: "Orders move to the right people so your team knows what needs to happen next.",
    visualType: "workflow",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Stay on top of stock",
    description: "Keep track of what is being used and spot items that need attention.",
    visualType: "stock",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Build customer relationships",
    description: "Give customers an easier experience while keeping track of visits and loyalty.",
    visualType: "loyalty",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Understand the business",
    description: "Turn everyday café activity into information you can use to make better decisions.",
    visualType: "trend",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const root = useRef<HTMLElement>(null);
  useHowItWorksAnimation(root);

  return (
    <section className="how-section" id="how-it-works" ref={root}>
      <div className="how-wash" />
      <div className="guides" />

      <div className="how-container">
        {/* TOP SECTION HEADER */}
        <div className="how-header">
          <div className="how-eyebrow">
            <span className="how-eyebrow__dot" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="how-title">
            One simple system.<br />
            <span className="how-title__accent">A smoother café.</span>
          </h2>

          <p className="how-sub">
            OdFe brings your daily café operations together in a simple flow — so your team can focus on serving customers instead of managing disconnected tools.
          </p>

          <div className="how-summary">
            <span>Built around the way a café actually works.</span>
            <span className="how-summary__dot">·</span>
            <span>Every step connects naturally to the next.</span>
          </div>
        </div>

        {/* MAIN VERTICAL PROCESS TIMELINE */}
        <div className="how-timeline">
          {/* Central Vertical Line Track & Active Progress Line */}
          <div className="how-line-container">
            <div className="how-line-track" />
            <div className="how-line-progress" />
          </div>

          {/* 5 Alternating Process Steps */}
          <div className="how-steps-container">
            {STEPS.map((step, idx) => (
              <TimelineStep step={step} index={idx} key={step.num} />
            ))}
          </div>
        </div>

        {/* SECTION CLOSING */}
        <div className="how-closing">
          <h3 className="how-closing__title">
            Less coordination.<br />
            <span className="how-closing__accent">More running your café.</span>
          </h3>
          <p className="how-closing__desc">
            OdFe takes care of the connections between everyday operations, so your team can focus on the experience in front of them.
          </p>
          <a href="#business-insights" className="how-closing__link">
            <span>Explore the platform</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
