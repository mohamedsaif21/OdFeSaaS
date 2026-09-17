"use client";

import { useRef } from "react";
import KitchenMockup from "./KitchenMockup";
import { useKitchenAnimation } from "./useKitchenAnimation";

export default function KitchenShowcase() {
  const root = useRef<HTMLElement>(null);
  useKitchenAnimation(root);

  return (
    <section className="kitchen-section" ref={root}>
      <div className="kitchen-wash" />
      <div className="guides" />

      <div className="kitchen-container">
        {/* TOP SECTION HEADER */}
        <div className="kitchen-header">
          <div className="kitchen-eyebrow">
            <span className="kitchen-eyebrow__dot" />
            <span>KITCHEN DISPLAY</span>
          </div>

          <h2 className="kitchen-title">
            From counter<br />
            <span className="kitchen-title__accent">to kitchen, instantly.</span>
          </h2>

          <p className="kitchen-sub">
            Every order reaches the right screen at the right time, so your kitchen stays organized while your front-of-house team keeps moving.
          </p>
        </div>

        {/* MINIMAL VISUAL FLOW CONNECTOR (POS -> KITCHEN) */}
        <div className="kitchen-connector">
          <div className="kitchen-connector__node">
            <div className="kitchen-connector__icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="#14503E" strokeWidth="2" />
                <path d="M7 8h10M7 12h10M7 16h6" stroke="#C98A2E" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="kitchen-connector__text">
              <span className="kitchen-connector__label">Front Counter</span>
              <span className="kitchen-connector__sub">Order #108 Taken</span>
            </div>
          </div>

          <div className="kitchen-connector__line">
            <span className="kitchen-connector__pulse-dot" />
            <span className="kitchen-connector__tag">Instant KOT Sync</span>
          </div>

          <div className="kitchen-connector__node">
            <div className="kitchen-connector__icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h10" stroke="#14503E" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="kitchen-connector__text">
              <span className="kitchen-connector__label">Kitchen Display</span>
              <span className="kitchen-connector__sub">Auto Station Routing</span>
            </div>
          </div>

          <div className="kitchen-connector__line">
            <span className="kitchen-connector__pulse-dot" />
            <span className="kitchen-connector__tag">Live Order Status</span>
          </div>

          <div className="kitchen-connector__node">
            <div className="kitchen-connector__icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#14503E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="kitchen-connector__text">
              <span className="kitchen-connector__label">Order Served</span>
              <span className="kitchen-connector__sub">Customer Notified</span>
            </div>
          </div>
        </div>

        {/* MAIN KITCHEN DISPLAY MOCKUP */}
        <KitchenMockup />

        {/* SECONDARY SUPPORTING COPY BELOW MOCKUP */}
        <div className="kitchen-footer-copy">
          <h3 className="kitchen-footer-title">One order. One connected workflow.</h3>
          <p className="kitchen-footer-desc">
            Orders taken at the counter, through QR, or online arrive in the kitchen automatically — with the details your team needs to get them right.
          </p>
        </div>
      </div>
    </section>
  );
}
