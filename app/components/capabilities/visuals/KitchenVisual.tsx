"use client";

export default function KitchenVisual() {
  return (
    <div className="cap-visual cap-visual--kitchen">
      <div className="kitchen-mini">
        <div className="kitchen-mini__header">
          <div className="kitchen-mini__order-id">Order #108</div>
          <div className="kitchen-mini__meta">Takeaway · 2 items</div>
        </div>

        <div className="kitchen-status-flow">
          <div className="kitchen-step kitchen-step--done">
            <span className="kitchen-step__dot">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="kitchen-step__label">NEW</span>
          </div>

          <div className="kitchen-step__connector kitchen-step__connector--active" />

          <div className="kitchen-step kitchen-step--active">
            <span className="kitchen-step__pulse" />
            <span className="kitchen-step__label">PREPARING</span>
          </div>

          <div className="kitchen-step__connector" />

          <div className="kitchen-step kitchen-step--pending">
            <span className="kitchen-step__dot" />
            <span className="kitchen-step__label">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
