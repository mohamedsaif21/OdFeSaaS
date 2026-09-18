"use client";

import { useRef } from "react";
import StageCard, { type StageData } from "./StageCard";
import { useCustomerExperienceAnimation } from "./useCustomerExperienceAnimation";

const STAGES: StageData[] = [
  {
    id: "01",
    num: "01",
    label: "DISCOVER",
    headline: "Find what you want.",
    description: "See the menu, discover favorites, and explore what the café has to offer.",
    visualType: "discover",
  },
  {
    id: "02",
    num: "02",
    label: "SCAN",
    headline: "Order from your table.",
    description: "Scan a QR code and start your order without waiting at the counter.",
    visualType: "scan",
  },
  {
    id: "03",
    num: "03",
    label: "ORDER",
    headline: "Make it yours.",
    description: "Choose sizes, extras, and preferences before sending the order.",
    visualType: "order",
  },
  {
    id: "04",
    num: "04",
    label: "PAY",
    headline: "Pay your way.",
    description: "Complete your order with a simple, familiar checkout experience.",
    visualType: "pay",
  },
  {
    id: "05",
    num: "05",
    label: "EARN",
    headline: "Get rewarded.",
    description: "Turn visits into loyalty with rewards that give customers a reason to come back.",
    visualType: "earn",
  },
  {
    id: "06",
    num: "06",
    label: "RETURN",
    headline: "Come back for more.",
    description: "Build a relationship beyond a single order and turn regular visits into lasting loyalty.",
    visualType: "return",
  },
];

export default function CustomerExperienceSection() {
  const root = useRef<HTMLElement>(null);
  useCustomerExperienceAnimation(root);

  return (
    <section className="cx-section" id="customer-experience" ref={root}>
      <div className="cx-wash" />
      <div className="guides" />

      <div className="cx-container">
        {/* TOP SECTION HEADER */}
        <div className="cx-header">
          <div className="cx-eyebrow">
            <span className="cx-eyebrow__dot" />
            <span>CUSTOMER EXPERIENCE</span>
          </div>

          <h2 className="cx-title">
            Make every visit<br />
            <span className="cx-title__accent">worth coming back for.</span>
          </h2>

          <p className="cx-sub">
            Give customers a simpler way to discover your menu, order, pay, and stay connected with their favorite café.
          </p>
        </div>

        {/* 6-STAGE CONNECTED CUSTOMER JOURNEY */}
        <div className="cx-journey">
          {/* Continuous Journey Connecting Line */}
          <div className="cx-path-line-container">
            <div className="cx-path-line" />
            <div className="cx-path-pulse" />
          </div>

          {/* 6 Stages Grid */}
          <div className="cx-stages-grid">
            {STAGES.map((stage, idx) => (
              <StageCard stage={stage} index={idx} key={stage.id} />
            ))}
          </div>
        </div>

        {/* SECTION CLOSING */}
        <div className="cx-closing">
          <h3 className="cx-closing__title">
            Better experiences<br />
            <span className="cx-closing__accent">create regulars.</span>
          </h3>
          <p className="cx-closing__desc">
            OdFe helps cafés turn a simple transaction into a smoother, more memorable customer relationship.
          </p>
          <a href="#business-insights" className="cx-closing__link">
            <span>Explore the customer experience</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
