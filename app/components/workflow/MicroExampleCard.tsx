"use client";

export default function MicroExampleCard() {
  return (
    <div className="micro-example-card">
      <div className="micro-example-card__header">
        <div className="micro-example-card__badge">
          <span className="micro-example-card__dot" />
          <span>Real-World Scenario</span>
        </div>
        <h4 className="micro-example-card__title">"One Cappuccino."</h4>
        <p className="micro-example-card__sub">Here is what automatically happens when an order is placed:</p>
      </div>

      <div className="micro-example-card__steps">
        <div className="micro-step">
          <span className="micro-step__tag">ORDER</span>
          <span className="micro-step__val">Cappuccino × 1</span>
          <span className="micro-step__meta">₹160 · Dine-in</span>
        </div>

        <div className="micro-arrow">➔</div>

        <div className="micro-step">
          <span className="micro-step__tag">KITCHEN</span>
          <span className="micro-step__val">Barista Screen</span>
          <span className="micro-step__meta">KOT Ticket Sent</span>
        </div>

        <div className="micro-arrow">➔</div>

        <div className="micro-step">
          <span className="micro-step__tag">INVENTORY</span>
          <span className="micro-step__val">Stock Deducted</span>
          <span className="micro-step__meta">Milk −250ml · Beans −18g</span>
        </div>

        <div className="micro-arrow">➔</div>

        <div className="micro-step">
          <span className="micro-step__tag">CUSTOMER</span>
          <span className="micro-step__val">Profile Updated</span>
          <span className="micro-step__meta">2nd Visit This Week</span>
        </div>

        <div className="micro-arrow">➔</div>

        <div className="micro-step micro-step--highlight">
          <span className="micro-step__tag">INSIGHTS</span>
          <span className="micro-step__val">Sales Logged</span>
          <span className="micro-step__meta">Daily Total +₹160</span>
        </div>
      </div>
    </div>
  );
}
