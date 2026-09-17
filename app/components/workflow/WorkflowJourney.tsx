"use client";

import { useState, useEffect } from "react";

type WorkflowNode = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  detail: string;
  icon: React.ReactNode;
};

const NODES: WorkflowNode[] = [
  {
    num: "01",
    tag: "ORDER",
    title: "Take the order",
    desc: "Capture dine-in, takeaway and online orders in seconds.",
    detail: "Every order starts here. Dine-in · Takeaway · Online",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#14503E" strokeWidth="1.8" />
        <path d="M8 7h8M8 11h8M8 15h5" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    tag: "KITCHEN",
    title: "Keep the team moving",
    desc: "Send the right order details where they need to go.",
    detail: "Instant wireless KOT routing to barista & kitchen",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    tag: "INVENTORY",
    title: "Stay ahead of stock",
    desc: "Keep track of what is being used and what needs attention.",
    detail: "Auto ingredient deduction & reorder alerts",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7l9 5 9-5-9-5Z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M3 7v10l9 5 9-5V7" stroke="#14503E" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    num: "04",
    tag: "CUSTOMER",
    title: "Build relationships",
    desc: "Remember visits, preferences and loyalty.",
    detail: "Automatic streak tracking & customer preferences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#14503E" strokeWidth="1.8" />
        <path d="M4 20c1.2-4 4.5-6 8-6s6.8 2 8 6" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "05",
    tag: "INSIGHTS",
    title: "Know your business",
    desc: "Turn daily activity into useful business information.",
    detail: "Real-time sales, top items & margin reports",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 20v-6M10 20v-10M16 20v-14M22 20V4" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WorkflowJourney() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Automated progress pulse traveling along the 5 nodes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % NODES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="workflow-journey">
      {/* CONNECTING PROGRESS LINE */}
      <div className="workflow-progress-track">
        <div
          className="workflow-progress-fill"
          style={{ width: `${(activeStep / (NODES.length - 1)) * 100}%` }}
        />
        <div
          className="workflow-progress-pulse"
          style={{ left: `${(activeStep / (NODES.length - 1)) * 100}%` }}
        />
      </div>

      {/* 5 OPERATIONAL NODES GRID */}
      <div className="workflow-nodes-container">
        {NODES.map((node, idx) => {
          const isActive = activeStep === idx;
          const isHovered = hoveredNode === idx;

          return (
            <div
              key={node.num}
              onMouseEnter={() => setHoveredNode(idx)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`workflow-node-card ${isActive ? "is-active" : ""} ${isHovered ? "is-hovered" : ""}`}
            >
              <div className="workflow-node-card__top">
                <span className="workflow-node-card__num">{node.num}</span>
                <span className="workflow-node-card__tag">{node.tag}</span>
              </div>

              <div className="workflow-node-card__icon-wrap">
                {node.icon}
              </div>

              <div className="workflow-node-card__content">
                <h4 className="workflow-node-card__title">{node.title}</h4>
                <p className="workflow-node-card__desc">{node.desc}</p>
              </div>

              <div className="workflow-node-card__detail">
                <span>{node.detail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
