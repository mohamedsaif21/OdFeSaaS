"use client";

export type HowStepData = {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  visualType: "order" | "workflow" | "stock" | "loyalty" | "trend";
};

interface TimelineStepProps {
  step: HowStepData;
  index: number;
}

export default function TimelineStep({ step, index }: TimelineStepProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`how-step-item ${isEven ? "how-step-item--left" : "how-step-item--right"}`}
      key={step.num}
    >
      {/* Node indicator attached to central vertical line */}
      <div className="how-step-node">
        <span className="how-step-node__inner" />
      </div>

      {/* Step Card Content */}
      <div className="how-step-card">
        <div className="how-step-card__top">
          <span className="how-step-card__num">{step.num}</span>
          <span className="how-step-card__icon">{step.icon}</span>
        </div>

        <h3 className="how-step-card__title">{step.title}</h3>
        <p className="how-step-card__desc">{step.description}</p>

        {/* Micro Visual Fragment */}
        <div className="how-step-card__visual">
          {step.visualType === "order" && (
            <div className="how-micro-fragment">
              <div className="how-micro-row">
                <span className="how-micro-name">Cappuccino</span>
                <span className="how-micro-qty">× 2</span>
              </div>
              <div className="how-micro-row">
                <span className="how-micro-name">Croissant</span>
                <span className="how-micro-qty">× 1</span>
              </div>
              <div className="how-micro-footer">
                <span className="how-micro-total-label">Total</span>
                <span className="how-micro-total-val">₹460</span>
              </div>
            </div>
          )}

          {step.visualType === "workflow" && (
            <div className="how-micro-fragment">
              <div className="how-micro-flow">
                <span className="how-flow-pill">NEW</span>
                <span className="how-flow-arrow">→</span>
                <span className="how-flow-pill how-flow-pill--active">PREPARING</span>
                <span className="how-flow-arrow">→</span>
                <span className="how-flow-pill">READY</span>
              </div>
            </div>
          )}

          {step.visualType === "stock" && (
            <div className="how-micro-fragment">
              <div className="how-stock-item">
                <span className="how-stock-name">Coffee Beans</span>
                <span className="how-stock-val">4.8 kg</span>
                <span className="how-stock-badge how-stock-badge--healthy">Healthy</span>
              </div>
              <div className="how-stock-item">
                <span className="how-stock-name">Milk</span>
                <span className="how-stock-val">18 L</span>
                <span className="how-stock-badge how-stock-badge--healthy">Healthy</span>
              </div>
              <div className="how-stock-item">
                <span className="how-stock-name">Oat Milk</span>
                <span className="how-stock-val">3.2 L</span>
                <span className="how-stock-badge how-stock-badge--low">Low stock</span>
              </div>
            </div>
          )}

          {step.visualType === "loyalty" && (
            <div className="how-micro-fragment">
              <div className="how-visit-flow">
                <span className="how-visit-step">VISIT 01</span>
                <span className="how-visit-arrow">→</span>
                <span className="how-visit-step">VISIT 02</span>
                <span className="how-visit-arrow">→</span>
                <span className="how-visit-step how-visit-step--reward">REWARD ★</span>
                <span className="how-visit-arrow">→</span>
                <span className="how-visit-step">RETURN</span>
              </div>
            </div>
          )}

          {step.visualType === "trend" && (
            <div className="how-micro-fragment">
              <div className="how-trend-header">
                <span className="how-trend-title">Sales Performance</span>
                <span className="how-trend-badge">+14.2%</span>
              </div>
              <svg viewBox="0 0 200 36" fill="none" className="how-trend-svg">
                <path d="M10 28 Q 50 24, 90 16 T 150 12 T 190 6" stroke="#0B4035" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="190" cy="6" r="3" fill="#D9A441" />
              </svg>
              <div className="how-trend-days">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
