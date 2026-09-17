"use client";

import { useRef } from "react";
import InventoryMockup from "./InventoryMockup";
import { useInventoryAnimation } from "./useInventoryAnimation";

export default function InventoryShowcase() {
  const root = useRef<HTMLElement>(null);
  useInventoryAnimation(root);

  return (
    <section className="inventory-section" ref={root}>
      <div className="inventory-wash" />
      <div className="guides" />

      <div className="inventory-container">
        {/* TOP SECTION HEADER */}
        <div className="inventory-header">
          <div className="inventory-eyebrow">
            <span className="inventory-eyebrow__dot" />
            <span>SMART INVENTORY</span>
          </div>

          <h2 className="inventory-title">
            Know what’s in stock.<br />
            <span className="inventory-title__accent">Before you run out.</span>
          </h2>

          <p className="inventory-sub">
            Track ingredients, supplies, and stock levels in real time as orders move through your café — so your team knows what needs attention before it becomes a problem.
          </p>
        </div>

        {/* MAIN INVENTORY PRODUCT MOCKUP */}
        <InventoryMockup />

        {/* SECONDARY SUPPORTING COPY BELOW MOCKUP */}
        <div className="inventory-footer-copy">
          <h3 className="inventory-footer-title">Inventory that keeps up with your café.</h3>
          <p className="inventory-footer-desc">
            See what’s moving, what’s running low, and what needs replenishing — without maintaining another spreadsheet.
          </p>
        </div>
      </div>
    </section>
  );
}
