"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import logo from "../../assest/odfe-logo-clean.png";
import RoleCard, { type RoleData, type RoleId } from "./RoleCard";
import { useRolesAnimation } from "./useRolesAnimation";

const ROLES: RoleData[] = [
  {
    id: "owner",
    tag: "OWNER",
    headline: "See the bigger picture.",
    description: "Keep an eye on the café without being tied to the counter.",
    indicators: [
      { label: "Sales", val: "Live Revenue" },
      { label: "Operations", val: "Activity Feed" },
      { label: "Performance", val: "Health Insights" },
    ],
  },
  {
    id: "manager",
    tag: "MANAGER",
    headline: "Run the day.",
    description: "Keep staff, orders, stock, and daily operations moving smoothly.",
    indicators: [
      { label: "Team", val: "Shift Roles" },
      { label: "Orders", val: "Queue Flow" },
      { label: "Stock", val: "Low Stock Alerts" },
    ],
  },
  {
    id: "cashier",
    tag: "CASHIER",
    headline: "Keep the line moving.",
    description: "Take orders, customize items, and complete payments quickly.",
    orderSnippet: {
      id: "Order #104",
      status: "Take Payment →",
    },
  },
  {
    id: "kitchen",
    tag: "KITCHEN TEAM",
    headline: "Know what comes next.",
    description: "Keep preparation organized and make every order clear.",
    flowSteps: ["NEW", "PREPARING", "READY"],
  },
  {
    id: "customer",
    tag: "CUSTOMER",
    headline: "Order their way.",
    description: "Browse, order, pay, and stay connected with the café.",
    flowSteps: ["SCAN QR", "ORDER", "ENJOY"],
  },
];

export default function RolesSection() {
  const root = useRef<HTMLElement>(null);
  useRolesAnimation(root);

  const [activeRole, setActiveRole] = useState<RoleId | "all">("all");
  const [hoveredRole, setHoveredRole] = useState<RoleId | null>(null);

  const currentHighlight = hoveredRole || (activeRole !== "all" ? activeRole : null);

  const getDynamicCenterLabel = () => {
    if (!currentHighlight) return "ALL CAFÉ ROLES CONNECTED";
    switch (currentHighlight) {
      case "owner":
        return "OWNER VIEW · STRATEGIC OVERVIEW";
      case "manager":
        return "MANAGER VIEW · DAILY OPERATIONS";
      case "cashier":
        return "CASHIER VIEW · FAST COUNTER HANDOFF";
      case "kitchen":
        return "KITCHEN VIEW · TICKET PREPARATION";
      case "customer":
        return "CUSTOMER VIEW · QR & SELF ORDER";
      default:
        return "ONE CONNECTED WORKSPACE";
    }
  };

  return (
    <section className="roles-section" id="roles" ref={root}>
      <div className="roles-wash" />
      <div className="guides" />

      <div className="roles-container">
        {/* TOP SECTION HEADER */}
        <div className="roles-header">
          <div className="roles-eyebrow">
            <span className="roles-eyebrow__dot" />
            <span>ONE WORKSPACE</span>
          </div>

          <h2 className="roles-title">
            One café.<br />
            <span className="roles-title__accent">One workspace.</span> Everyone in sync.
          </h2>

          <p className="roles-sub">
            Give every person the tools they need for their role, while keeping the entire café connected through one shared workspace.
          </p>
        </div>

        {/* ROLE SWITCHING SELECTOR TABS */}
        <div className="roles-tabs" role="tablist" aria-label="Café Role Selector">
          <button
            type="button"
            className={`roles-tab ${activeRole === "all" ? "roles-tab--active" : ""}`}
            onClick={() => setActiveRole("all")}
            role="tab"
            aria-selected={activeRole === "all"}
          >
            All Roles Connected
          </button>
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`roles-tab ${activeRole === r.id ? "roles-tab--active" : ""}`}
              onClick={() => setActiveRole(r.id)}
              role="tab"
              aria-selected={activeRole === r.id}
            >
              {r.tag}
            </button>
          ))}
        </div>

        {/* MAIN CONNECTED WORKSPACE DIAGRAM */}
        <div className="roles-composition">
          {/* CENTRAL ODFE WORKSPACE NODE */}
          <div className={`roles-center-hub ${currentHighlight ? "is-focused" : ""}`}>
            <div className="roles-center-hub__glow" />
            <div className="roles-center-hub__brand">
              {/* OdFe Logo directly on transparent element - NO BOX FRAME */}
              <Image
                src={logo}
                alt="OdFe Workspace Logo"
                width={42}
                height={40}
                className="roles-center-logo"
              />
              <span className="roles-center-name">OdFe</span>
            </div>
            <div className="roles-center-hub__badge">
              <span className="roles-center-hub__pulse-dot" />
              <span>{getDynamicCenterLabel()}</span>
            </div>
          </div>

          {/* SURROUNDING 5 ROLE CARDS */}
          <div className="roles-grid">
            {ROLES.map((r) => {
              const isSelected = activeRole === "all" || activeRole === r.id;
              const isDimmed = activeRole !== "all" && activeRole !== r.id;
              const isFocused = currentHighlight === r.id;
              return (
                <div
                  key={r.id}
                  className={`roles-grid-item roles-grid-item--${r.id} ${
                    isDimmed ? "roles-grid-item--dimmed" : ""
                  } ${isFocused ? "roles-grid-item--focused" : ""}`}
                >
                  <RoleCard
                    role={r}
                    isActive={isSelected || isFocused}
                    onHover={setHoveredRole}
                    onSelect={setActiveRole}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION CLOSING */}
        <div className="roles-closing">
          <h3 className="roles-closing__title">
            Everyone has their role.<br />
            <span className="roles-closing__accent">OdFe keeps them connected.</span>
          </h3>
          <p className="roles-closing__desc">
            From the person taking the order to the person running the business, everyone works from the same connected system.
          </p>
          <a href="#customer-experience" className="roles-closing__link">
            <span>See what your team can do</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
