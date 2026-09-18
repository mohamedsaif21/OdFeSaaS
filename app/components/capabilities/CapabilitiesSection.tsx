"use client";

import { useRef } from "react";
import PosVisual from "./visuals/PosVisual";
import KitchenVisual from "./visuals/KitchenVisual";
import InventoryVisual from "./visuals/InventoryVisual";
import SelfOrderVisual from "./visuals/SelfOrderVisual";
import CustomerVisual from "./visuals/CustomerVisual";
import InsightsVisual from "./visuals/InsightsVisual";
import { useCapabilitiesAnimation } from "./useCapabilitiesAnimation";

export default function CapabilitiesSection() {
  const root = useRef<HTMLElement>(null);
  useCapabilitiesAnimation(root);

  return (
    <section className="capabilities-section" id="capabilities" ref={root}>
      <div className="capabilities-wash" />
      <div className="guides" />

      <div className="capabilities-container">
        {/* TOP SECTION HEADER */}
        <div className="capabilities-header">
          <div className="capabilities-eyebrow">
            <span className="capabilities-eyebrow__dot" />
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="capabilities-title">
            Everything your café needs.<br />
            <span className="capabilities-title__accent">In one place.</span>
          </h2>

          <p className="capabilities-sub">
            From taking the first order to understanding the day&apos;s performance, OdFe brings the essential tools of café operations into one connected workspace.
          </p>
        </div>

        {/* 6-CAPABILITY EDITORIAL COMPOSITION */}
        <div className="capabilities-grid">
          {/* CAPABILITY 01 — POS (PRIMARY LEAD CARD) */}
          <div className="cap-card cap-card--primary">
            <div className="cap-card__header">
              <span className="cap-card__num">01</span>
              <span className="cap-card__badge">Core Handoff</span>
            </div>
            <div className="cap-card__content">
              <h3 className="cap-card__title">Point of Sale</h3>
              <p className="cap-card__desc">
                Take orders, customize items, process payments, and keep the counter moving.
              </p>
            </div>
            <div className="cap-card__visual-wrap">
              <PosVisual />
            </div>
          </div>

          {/* CAPABILITY 02 — KITCHEN FLOW */}
          <div className="cap-card">
            <div className="cap-card__header">
              <span className="cap-card__num">02</span>
            </div>
            <div className="cap-card__content">
              <h3 className="cap-card__title">Kitchen Flow</h3>
              <p className="cap-card__desc">
                Keep orders moving from the counter to preparation without unnecessary coordination.
              </p>
            </div>
            <div className="cap-card__visual-wrap">
              <KitchenVisual />
            </div>
          </div>

          {/* CAPABILITY 03 — INVENTORY */}
          <div className="cap-card">
            <div className="cap-card__header">
              <span className="cap-card__num">03</span>
            </div>
            <div className="cap-card__content">
              <h3 className="cap-card__title">Inventory</h3>
              <p className="cap-card__desc">
                Keep track of stock levels, ingredient usage, and items that need attention.
              </p>
            </div>
            <div className="cap-card__visual-wrap">
              <InventoryVisual />
            </div>
          </div>

          {/* CAPABILITY 04 — SELF-ORDER & QR */}
          <div className="cap-card">
            <div className="cap-card__header">
              <span className="cap-card__num">04</span>
            </div>
            <div className="cap-card__content">
              <h3 className="cap-card__title">Self-Order &amp; QR</h3>
              <p className="cap-card__desc">
                Let customers browse, customize, and place orders directly from their table.
              </p>
            </div>
            <div className="cap-card__visual-wrap">
              <SelfOrderVisual />
            </div>
          </div>

          {/* CAPABILITY 05 — CUSTOMER EXPERIENCE */}
          <div className="cap-card">
            <div className="cap-card__header">
              <span className="cap-card__num">05</span>
            </div>
            <div className="cap-card__content">
              <h3 className="cap-card__title">Customer Experience</h3>
              <p className="cap-card__desc">
                Build stronger relationships with customer profiles, loyalty, and repeat visits.
              </p>
            </div>
            <div className="cap-card__visual-wrap">
              <CustomerVisual />
            </div>
          </div>

          {/* CAPABILITY 06 — BUSINESS INSIGHTS (WIDE FORMAT CARD) */}
          <div className="cap-card cap-card--wide">
            <div className="cap-card__header">
              <span className="cap-card__num">06</span>
              <span className="cap-card__badge">Live Intelligence</span>
            </div>
            <div className="cap-card__content">
              <h3 className="cap-card__title">Business Insights</h3>
              <p className="cap-card__desc">
                Understand sales, product performance, and café activity so you can make informed decisions.
              </p>
            </div>
            <div className="cap-card__visual-wrap">
              <InsightsVisual />
            </div>
          </div>
        </div>

        {/* SECTION CLOSING */}
        <div className="capabilities-closing">
          <h3 className="capabilities-closing__title">
            One platform.<br />
            Every part of the café.
          </h3>
          <p className="capabilities-closing__desc">
            OdFe gives your team the tools they need to operate the café today — while giving you the visibility to grow it tomorrow.
          </p>
          <a href="#explore" className="capabilities-closing__link">
            <span>Explore OdFe</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
