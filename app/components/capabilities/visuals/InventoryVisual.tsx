"use client";

export default function InventoryVisual() {
  return (
    <div className="cap-visual cap-visual--inventory">
      <div className="inventory-mini">
        <div className="inventory-row">
          <div className="inventory-row__meta">
            <span className="inventory-row__name">Coffee Beans</span>
            <span className="inventory-row__val">4.8 kg</span>
          </div>
          <div className="inventory-bar">
            <div className="inventory-bar__fill inventory-bar__fill--normal" style={{ width: "80%" }} />
          </div>
        </div>

        <div className="inventory-row">
          <div className="inventory-row__meta">
            <span className="inventory-row__name">Milk</span>
            <span className="inventory-row__val">18 L</span>
          </div>
          <div className="inventory-bar">
            <div className="inventory-bar__fill inventory-bar__fill--normal" style={{ width: "70%" }} />
          </div>
        </div>

        <div className="inventory-row inventory-row--alert">
          <div className="inventory-row__meta">
            <span className="inventory-row__name">Oat Milk</span>
            <span className="inventory-row__val inventory-row__val--warning">
              <span className="inventory-alert-dot" /> Low Stock
            </span>
          </div>
          <div className="inventory-bar">
            <div className="inventory-bar__fill inventory-bar__fill--warning" style={{ width: "28%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
