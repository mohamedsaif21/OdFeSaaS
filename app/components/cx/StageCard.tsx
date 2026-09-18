"use client";

export type StageData = {
  id: string;
  num: string;
  label: string;
  headline: string;
  description: string;
  visualType: "discover" | "scan" | "order" | "pay" | "earn" | "return";
};

interface StageCardProps {
  stage: StageData;
  index: number;
}

export default function StageCard({ stage, index }: StageCardProps) {
  return (
    <div className={`cx-stage-card cx-stage-card--${stage.visualType}`} key={stage.id}>
      <div className="cx-stage-card__header">
        <span className="cx-stage-card__num">{stage.num}</span>
        <span className="cx-stage-card__label">{stage.label}</span>
      </div>

      <h3 className="cx-stage-card__headline">{stage.headline}</h3>
      <p className="cx-stage-card__desc">{stage.description}</p>

      {/* Micro UI Visual Fragment */}
      <div className="cx-stage-card__visual-container">
        {stage.visualType === "discover" && (
          <div className="cx-micro-fragment cx-micro-fragment--menu">
            <span className="cx-micro-tag">TODAY&apos;S FAVORITES</span>
            <div className="cx-micro-menu-item">
              <span>Iced Latte</span>
              <span className="cx-micro-price">₹190</span>
            </div>
            <div className="cx-micro-menu-item">
              <span>Blueberry Muffin</span>
              <span className="cx-micro-price">₹130</span>
            </div>
          </div>
        )}

        {stage.visualType === "scan" && (
          <div className="cx-micro-fragment cx-micro-fragment--qr">
            <div className="cx-qr-box">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0B4035" strokeWidth="1.8">
                <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2zM11 3v4M11 11v2M3 11h4M15 11h6M11 17v4" />
              </svg>
            </div>
            <span className="cx-qr-label">Scan to order</span>
          </div>
        )}

        {stage.visualType === "order" && (
          <div className="cx-micro-fragment cx-micro-fragment--customizer">
            <div className="cx-custom-item-header">
              <span className="cx-custom-title">CAPPUCCINO</span>
              <span className="cx-custom-tag">Customizing</span>
            </div>
            <div className="cx-custom-opts">
              <div className="cx-custom-row">
                <span className="cx-custom-label">Size:</span>
                <span className="cx-custom-val">Medium</span>
              </div>
              <div className="cx-custom-row">
                <span className="cx-custom-label">Extra:</span>
                <span className="cx-custom-val cx-custom-val--accent">+ Oat Milk</span>
              </div>
            </div>
          </div>
        )}

        {stage.visualType === "pay" && (
          <div className="cx-micro-fragment cx-micro-fragment--pay">
            <div className="cx-pay-amount">
              <span className="cx-pay-total">Total</span>
              <span className="cx-pay-price">₹420</span>
            </div>
            <div className="cx-pay-methods">
              <span className="cx-pay-method cx-pay-method--active">UPI</span>
              <span className="cx-pay-method">Card</span>
              <span className="cx-pay-method">Cash</span>
            </div>
            <div className="cx-pay-status">
              <span className="cx-pay-check">✓</span> Payment complete
            </div>
          </div>
        )}

        {stage.visualType === "earn" && (
          <div className="cx-micro-fragment cx-micro-fragment--earn">
            <span className="cx-earn-tag">YOUR REWARD</span>
            <div className="cx-earn-stars">
              <span className="cx-star cx-star--filled">★</span>
              <span className="cx-star cx-star--filled">★</span>
              <span className="cx-star cx-star--filled">★</span>
              <span className="cx-star cx-star--filled">★</span>
              <span className="cx-star cx-star--empty">☆</span>
            </div>
            <div className="cx-earn-progress">
              <span className="cx-earn-count">4 visits</span>
              <span className="cx-earn-next">1 more visit to unlock reward</span>
            </div>
          </div>
        )}

        {stage.visualType === "return" && (
          <div className="cx-micro-fragment cx-micro-fragment--return">
            <div className="cx-return-flow">
              <span className="cx-return-step">FIRST VISIT</span>
              <span className="cx-return-arrow">→</span>
              <span className="cx-return-step">RETURNING</span>
              <span className="cx-return-arrow">→</span>
              <span className="cx-return-step cx-return-step--active">REGULAR</span>
            </div>
            <span className="cx-return-badge">★ Loyalty Member</span>
          </div>
        )}
      </div>
    </div>
  );
}
