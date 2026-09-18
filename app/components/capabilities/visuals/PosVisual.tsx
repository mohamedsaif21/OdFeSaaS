"use client";

export default function PosVisual() {
  return (
    <div className="cap-visual cap-visual--pos">
      <div className="pos-mini">
        <div className="pos-mini__top">
          <div className="pos-mini__ticket-info">
            <span className="pos-mini__table">Dine-in · Table 04</span>
            <span className="pos-mini__id">#104</span>
          </div>
          <span className="pos-mini__status-pill">Active</span>
        </div>

        <div className="pos-mini__items">
          <div className="pos-mini__item">
            <div className="pos-mini__item-details">
              <span className="pos-mini__item-name">Cappuccino</span>
              <span className="pos-mini__item-sub">Double shot · Oat milk</span>
            </div>
            <span className="pos-mini__item-qty">× 2</span>
            <span className="pos-mini__item-price">₹320</span>
          </div>

          <div className="pos-mini__item">
            <div className="pos-mini__item-details">
              <span className="pos-mini__item-name">Croissant</span>
              <span className="pos-mini__item-sub">Warm · Butter</span>
            </div>
            <span className="pos-mini__item-qty">× 1</span>
            <span className="pos-mini__item-price">₹140</span>
          </div>

          <div className="pos-mini__item">
            <div className="pos-mini__item-details">
              <span className="pos-mini__item-name">Iced Latte</span>
              <span className="pos-mini__item-sub">Vanilla syrup</span>
            </div>
            <span className="pos-mini__item-qty">× 1</span>
            <span className="pos-mini__item-price">₹190</span>
          </div>
        </div>

        <div className="pos-mini__bottom">
          <div className="pos-mini__total">
            <span className="pos-mini__total-label">Total Amount</span>
            <span className="pos-mini__total-val">₹650</span>
          </div>
          <button type="button" className="pos-mini__btn" aria-label="Take Payment">
            <span>Take Payment</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
