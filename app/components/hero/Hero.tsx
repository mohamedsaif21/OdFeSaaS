"use client";

import { useRef } from "react";
import Navbar from "../site/Navbar";
import HeroDashboard from "./HeroDashboard";
import { useHeroTimeline } from "./useHeroTimeline";

const HEADLINE = ["Run Your Café.", "Own Every Order."];

type FrameFeature = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const FRAME_FEATURES: FrameFeature[] = [
  {
    title: "Live Kitchen Sync",
    desc: "Instant wireless KOT tickets between counter & barista screens.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="#14503E" strokeWidth="1.8" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Automated Recipe Stock",
    desc: "Auto-deducts coffee beans, milk & syrups per cup in real time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7l9 5 9-5-9-5Z" stroke="#14503E" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M3 7v10l9 5 9-5V7" stroke="#14503E" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 12v10" stroke="#C98A2E" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Fast 1-Tap Checkout",
    desc: "Accept UPI, contactless cards, split bills & print bills in 4 seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="#14503E"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Customer CRM & Loyalty",
    desc: "Track frequent customer orders, visit streaks & automated cashback.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#14503E" strokeWidth="1.8" />
        <path d="M4 20c1.2-4 4.5-6 8-6s6.8 2 8 6" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useHeroTimeline(root);

  return (
    <section className="hero" ref={root}>
      <div className="wash" />
      <div className="guides" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Content / Copy */}
      <div className="copy">
        {/* Headline */}
        <h1>
          {HEADLINE.map((line, idx) => (
            <span className="line" key={line}>
              <span className={idx === 1 ? "line--accent" : ""}>{line}</span>
            </span>
          ))}
        </h1>
        <br />

        {/* Subtitle */}
        <p className="sub">
          Orders, payments, inventory, customers and the kitchen — running
          together in one workspace your team can learn in a morning.
        </p>

        {/* Action Buttons */}
        <div className="actions">
          <button className="btn btn--solid btn--shine" type="button">
            <span>Start 14-Day Free Trial</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="btn btn--quiet btn--icon" type="button">
            <span className="btn__play-icon">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </span>
            <span>Watch Live Demo</span>
          </button>
        </div>

        {/* Micro-perks */}
        <div className="hero__perks">
          <span className="perk-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#14503E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No credit card required
          </span>
          <span className="perk-sep">·</span>
          <span className="perk-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#14503E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            5-minute setup
          </span>
          <span className="perk-sep">·</span>
          <span className="perk-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#14503E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Offline sync mode
          </span>
        </div>
      </div>

      {/* Stage Container */}
      <div className="stage">
        {/* Floating Contextual Badges */}
        <div className="floater floater--left" id="floaterLeft">
          <div className="floater__badge-dot" />
          <div className="floater__icon">⚡</div>
          <div className="floater__body">
            <div className="floater__title">New Order · Table 4</div>
            <div className="floater__sub">2× Flat White, 1× Butter Croissant</div>
            <div className="floater__meta">
              <span className="floater__tag">KOT Dispatched</span>
              <span className="floater__price">₹460 · UPI</span>
            </div>
          </div>
        </div>

        <div className="floater floater--right" id="floaterRight">
          <div className="floater__icon floater__icon--amber">☕</div>
          <div className="floater__body">
            <div className="floater__title">Auto Recipe Inventory</div>
            <div className="floater__sub">Arabica: -36g · Oatly: -400ml</div>
            <div className="floater__meta">
              <span className="floater__tag floater__tag--green">142 Cups Left</span>
              <span className="floater__status">Synced</span>
            </div>
          </div>
        </div>

        {/* Standalone Dashboard UI (without dark green container) */}
        <div className="dashboard-wrap" id="dashWrap">
          <HeroDashboard />
        </div>

        {/* 4 Feature Cards aligned card-by-card below the dashboard */}
        <div className="feature-grid" id="featureGrid">
          {FRAME_FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card__icon">{f.icon}</div>
              <div className="feature-card__content">
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}