"use client";

export default function CustomerVisual() {
  return (
    <div className="cap-visual cap-visual--customer">
      <div className="customer-mini">
        <div className="customer-journey">
          <div className="journey-node">
            <span className="journey-node__dot" />
            <span className="journey-node__label">FIRST VISIT</span>
          </div>
          <span className="journey-connector">→</span>
          <div className="journey-node">
            <span className="journey-node__dot" />
            <span className="journey-node__label">RETURNING</span>
          </div>
          <span className="journey-connector">→</span>
          <div className="journey-node journey-node--active">
            <span className="journey-node__dot" />
            <span className="journey-node__label">LOYAL</span>
          </div>
          <span className="journey-connector">→</span>
          <div className="journey-node">
            <span className="journey-node__dot" />
            <span className="journey-node__label">REGULAR</span>
          </div>
        </div>

        <div className="customer-tags">
          <span className="customer-tag">Visits: 14</span>
          <span className="customer-tag customer-tag--gold">Rewards: ★ 240 pts</span>
          <span className="customer-tag">Prefers Oat Milk</span>
        </div>
      </div>
    </div>
  );
}
