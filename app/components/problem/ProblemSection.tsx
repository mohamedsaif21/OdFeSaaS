"use client";

import { useRef } from "react";
import OperationalDiagram from "./OperationalDiagram";
import { useProblemAnimation } from "./useProblemAnimation";

type ProblemPoint = {
  num: string;
  title: string;
  desc: string;
};

const PROBLEMS: ProblemPoint[] = [
  {
    num: "01",
    title: "Disconnected tools",
    desc: "Orders, inventory, payments and customer data live in different systems that don't speak to each other.",
  },
  {
    num: "02",
    title: "Manual work",
    desc: "Your team spends valuable hours updating spreadsheets and cross-checking tickets instead of serving guests.",
  },
  {
    num: "03",
    title: "Limited visibility",
    desc: "Critical stockouts and sales insights get buried during busy rushes when you need clear answers most.",
  },
];

export default function ProblemSection() {
  const root = useRef<HTMLElement>(null);
  useProblemAnimation(root);

  return (
    <section className="problem-section" ref={root}>
      <div className="problem-wash" />
      <div className="guides" />

      <div className="problem-container">
        {/* TOP SECTION HEADER */}
        <div className="problem-header">
          <div className="problem-eyebrow">
            <span className="problem-eyebrow__dot" />
            <span>THE WAY CAFÉS WORK TODAY</span>
          </div>

          <h2 className="problem-title">
            Too many tools.<br />
            <span className="problem-title__accent">One café.</span>
          </h2>

          <p className="problem-sub">
            Orders happen at the counter. Tickets move to the kitchen. Stock changes in the background. Customers come back. Your team shouldn't have to stitch all of that together manually.
          </p>
        </div>

        {/* CONCEPTUAL MARKETING DIAGRAM */}
        <OperationalDiagram />

        {/* 3 PROBLEM STATEMENTS */}
        <div className="problem-card-grid">
          {PROBLEMS.map((p) => (
            <div className="problem-card" key={p.num}>
              <span className="problem-card__num">{p.num}</span>
              <h3 className="problem-card__title">{p.title}</h3>
              <p className="problem-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* BRIDGE TRANSITION TO ODFE */}
        <div className="problem-bridge">
          <h3 className="problem-bridge__title">OdFe brings the operation together.</h3>
          <p className="problem-bridge__desc">
            One workspace for the people, orders, stock and decisions that keep your café moving.
          </p>
        </div>
      </div>
    </section>
  );
}
