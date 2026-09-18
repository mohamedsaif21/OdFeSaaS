"use client";

export default function SelfOrderVisual() {
  return (
    <div className="cap-visual cap-visual--selforder">
      <div className="phone-mock">
        <div className="phone-mock__speaker" />
        <div className="phone-mock__screen">
          <div className="phone-mock__header">
            <span className="phone-mock__table-tag">TABLE 04</span>
            <span className="phone-mock__title">YOUR ORDER</span>
          </div>

          <div className="phone-mock__items">
            <div className="phone-mock__item">
              <span className="phone-mock__item-name">Cappuccino</span>
              <span className="phone-mock__item-price">₹160</span>
            </div>
            <div className="phone-mock__item">
              <span className="phone-mock__item-name">Blueberry Muffin</span>
              <span className="phone-mock__item-price">₹130</span>
            </div>
          </div>

          <button type="button" className="phone-mock__cta">
            <span>Place Order →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
