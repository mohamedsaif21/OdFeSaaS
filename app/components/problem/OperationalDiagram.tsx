"use client";

import { useState } from "react";

type OpNode = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  position: string;
};

const NODES: OpNode[] = [
  {
    id: "pos",
    title: "POS & Counter",
    subtitle: "Counter orders & tickets",
    badge: "Fragmented POS",
    position: "top-left",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#14503E" strokeWidth="1.8" />
        <path d="M8 7h8M8 11h8M8 15h5" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "kitchen",
    title: "Kitchen & KOT",
    subtitle: "Separate paper tickets",
    badge: "Manual KOT",
    position: "top-right",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "inventory",
    title: "Smart Inventory",
    subtitle: "Spreadsheets & count sheets",
    badge: "Manual Excel",
    position: "mid-left",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7l9 5 9-5-9-5Z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M3 7v10l9 5 9-5V7" stroke="#14503E" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "payments",
    title: "Payments & Terminal",
    subtitle: "Nightly manual reconciliation",
    badge: "Unsynced EDC",
    position: "mid-right",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#14503E" strokeWidth="1.8" />
        <path d="M3 10h18M7 14h4" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "customers",
    title: "Customer Loyalty",
    subtitle: "Stamp cards & phone logs",
    badge: "Paper Punch",
    position: "bottom-left",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#14503E" strokeWidth="1.8" />
        <path d="M4 20c1.2-4 4.5-6 8-6s6.8 2 8 6" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "reports",
    title: "Business Reports",
    subtitle: "Disconnected sales CSVs",
    badge: "Delayed Data",
    position: "bottom-right",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 20v-6M10 20v-10M16 20v-14M22 20V4" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function OperationalDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="problem-diagram" id="problemDiagramWrap">
      {/* BACKGROUND GRAPHIC LINES */}
      <svg className="problem-svg-canvas" viewBox="0 0 800 480" fill="none">
        {/* Connecting Lines from 6 nodes to center (400, 240) */}
        <line x1="160" y1="90" x2="400" y2="240" className={`problem-line ${activeNode === "pos" ? "is-active" : ""}`} />
        <line x1="640" y1="90" x2="400" y2="240" className={`problem-line ${activeNode === "kitchen" ? "is-active" : ""}`} />
        <line x1="130" y1="240" x2="400" y2="240" className={`problem-line ${activeNode === "inventory" ? "is-active" : ""}`} />
        <line x1="670" y1="240" x2="400" y2="240" className={`problem-line ${activeNode === "payments" ? "is-active" : ""}`} />
        <line x1="160" y1="390" x2="400" y2="240" className={`problem-line ${activeNode === "customers" ? "is-active" : ""}`} />
        <line x1="640" y1="390" x2="400" y2="240" className={`problem-line ${activeNode === "reports" ? "is-active" : ""}`} />

        {/* Outer radial ambient ring */}
        <circle cx="400" cy="240" r="180" stroke="rgba(20, 80, 62, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="400" cy="240" r="110" stroke="rgba(201, 138, 46, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      {/* CENTRAL ODFE UNIFIED CORE NODE */}
      <div className="problem-core-node">
        <div className="problem-core-node__glow" />
        <div className="problem-core-node__content">
          <span className="problem-core-node__dot" />
          <span className="problem-core-node__title">OdFe Platform</span>
          <span className="problem-core-node__sub">One Connected Workspace</span>
        </div>
      </div>

      {/* 6 SURROUNDING OPERATIONAL NODES */}
      <div className="problem-nodes-grid">
        {NODES.map((node) => (
          <div
            key={node.id}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            className={`problem-node-card problem-node-card--${node.position} ${activeNode === node.id ? "is-active" : ""}`}
          >
            <div className="problem-node-card__header">
              <div className="problem-node-card__icon">{node.icon}</div>
              <span className="problem-node-card__badge">{node.badge}</span>
            </div>
            <div className="problem-node-card__body">
              <h4 className="problem-node-card__title">{node.title}</h4>
              <p className="problem-node-card__sub">{node.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
