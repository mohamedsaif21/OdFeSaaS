"use client";

import { useRef } from "react";
import WorkflowJourney from "./WorkflowJourney";
import MicroExampleCard from "./MicroExampleCard";
import { useWorkflowAnimation } from "./useWorkflowAnimation";

export default function WorkflowSection() {
  const root = useRef<HTMLElement>(null);
  useWorkflowAnimation(root);

  return (
    <section className="workflow-section" ref={root}>
      <div className="workflow-wash" />
      <div className="guides" />

      <div className="workflow-container">
        {/* TOP SECTION HEADER */}
        <div className="workflow-header">
          <div className="workflow-eyebrow">
            <span className="workflow-eyebrow__dot" />
            <span>ONE CONNECTED WORKFLOW</span>
          </div>

          <h2 className="workflow-title">
            One order.<br />
            <span className="workflow-title__accent">Everything connected.</span>
          </h2>

          <p className="workflow-sub">
            OdFe connects the moments that keep your café moving — from the first order to the kitchen, inventory, customer experience, and the decisions that come next.
          </p>
        </div>

        {/* 5-STEP ANIMATED WORKFLOW JOURNEY */}
        <WorkflowJourney />

        {/* REAL-WORLD MICRO EXAMPLE CARD */}
        <MicroExampleCard />

        {/* CLOSING SECTION STATEMENT */}
        <div className="workflow-closing">
          <h3 className="workflow-closing__title">Your café moves as one.</h3>
          <p className="workflow-closing__desc">
            Instead of managing disconnected tools, your team works from one connected system designed around the way a café actually operates.
          </p>
          <a href="#pos" className="workflow-closing__cta">
            <span>See how OdFe works</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
