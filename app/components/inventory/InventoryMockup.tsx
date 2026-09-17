"use client";

import { useState } from "react";

type ItemStatus = "healthy" | "low" | "out";

type Ingredient = {
  id: string;
  name: string;
  category: string;
  current: number;
  unit: string;
  status: ItemStatus;
  estOrders?: string;
  dailyUsage: string;
  reorderPoint: string;
  iconBg: string;
  iconSvg: React.ReactNode;
};

const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    id: "milk",
    name: "Whole Dairy Milk",
    category: "Dairy & Bar",
    current: 18.0,
    unit: "L",
    status: "healthy",
    dailyUsage: "12.5 L / day",
    reorderPoint: "8.0 L",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="4" width="10" height="16" rx="2" stroke="#14503E" strokeWidth="1.8" />
        <path d="M10 2h4" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "beans",
    name: "House Blend Espresso Beans",
    category: "Coffee Beans",
    current: 4.8,
    unit: "kg",
    status: "healthy",
    dailyUsage: "3.2 kg / day",
    reorderPoint: "2.0 kg",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="6" ry="8" stroke="#14503E" strokeWidth="1.8" />
        <path d="M12 4c2 4-2 12 0 16" stroke="#C98A2E" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "oat",
    name: "Barista Oat Milk",
    category: "Plant Milk",
    current: 3.2,
    unit: "L",
    status: "low",
    estOrders: "Est. 18 orders left",
    dailyUsage: "4.5 L / day",
    reorderPoint: "5.0 L",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="4" width="10" height="16" rx="2" stroke="#8A6410" strokeWidth="1.8" />
        <path d="M10 9l4 3-4 3V9z" fill="#8A6410" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "van",
    name: "Artisanal Vanilla Syrup",
    category: "Syrups & Flavors",
    current: 1.1,
    unit: "L",
    status: "low",
    estOrders: "Est. 12 drinks left",
    dailyUsage: "0.8 L / day",
    reorderPoint: "2.0 L",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10 4h4v4h-4z" stroke="#8A6410" strokeWidth="1.8" />
        <path d="M8 8h8v12H8z" stroke="#8A6410" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "butter",
    name: "French Pastry Butter",
    category: "Bakery Supplies",
    current: 2.4,
    unit: "kg",
    status: "healthy",
    dailyUsage: "1.1 kg / day",
    reorderPoint: "1.0 kg",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="10" rx="2" stroke="#14503E" strokeWidth="1.8" />
        <path d="M8 8V6a2 2 0 014 0v2" stroke="#C98A2E" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "croissant",
    name: "Butter Croissants (Baked)",
    category: "Bakery Counter",
    current: 14,
    unit: "pcs",
    status: "low",
    estOrders: "Est. 14 items left",
    dailyUsage: "35 pcs / day",
    reorderPoint: "20 pcs",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 14c2-5 6-8 12-5 3 2 4 6 2 9-5 2-10 0-14-4z" stroke="#8A6410" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function InventoryMockup() {
  const [items, setItems] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [expandedId, setExpandedId] = useState<string | null>("oat");
  const [searchQuery, setSearchQuery] = useState("");
  const [deductedOrder, setDeductedOrder] = useState(false);

  // Simulate Order #108 ingredient deduction
  const handleSimulateDeduction = () => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === "milk") {
          return { ...item, current: Math.max(0, Math.round((item.current - 0.5) * 10) / 10) };
        }
        if (item.id === "beans") {
          return { ...item, current: Math.max(0, Math.round((item.current - 0.036) * 1000) / 1000) };
        }
        if (item.id === "croissant") {
          const newCurrent = Math.max(0, item.current - 1);
          return { ...item, current: newCurrent, estOrders: `Est. ${newCurrent} items left` };
        }
        return item;
      })
    );

    setDeductedOrder(true);
    setTimeout(() => setDeductedOrder(false), 2200);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="inventory-mockup" id="inventoryMockupWrap">
      {/* 1. TOP WINDOW CHROME */}
      <div className="inv-chrome">
        <div className="inv-chrome__left">
          <div className="pos-chrome__dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <div className="inv-chrome__brand">
            <span className="inv-chrome__logo-dot" />
            <span className="inv-chrome__title">OdFe Smart Inventory</span>
            <span className="inv-chrome__ver">v2.4</span>
          </div>
        </div>

        <div className="inv-chrome__center">
          <span className="inv-chrome__loc">Anna Nagar Flagship</span>
          <span className="inv-chrome__sep">·</span>
          <span className="inv-chrome__sync">
            <span className="pulse-dot">
              <span className="pulse-ping" />
            </span>
            <span>Live Stock Sync</span>
          </span>
        </div>

        <div className="inv-chrome__right">
          <div className="inv-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="inv-search__input"
            />
          </div>
        </div>
      </div>

      {/* 2. SUMMARY METRICS ROW */}
      <div className="inv-summary">
        <div className="inv-metric-card">
          <span className="inv-metric-card__label">TOTAL ITEMS</span>
          <span className="inv-metric-card__val">128</span>
        </div>

        <div className="inv-metric-card inv-metric-card--gold">
          <div className="inv-metric-card__header">
            <span className="inv-metric-card__label">LOW STOCK</span>
            <span className="inv-badge inv-badge--gold">7 Attention</span>
          </div>
          <span className="inv-metric-card__val inv-metric-card__val--gold">7</span>
        </div>

        <div className="inv-metric-card">
          <div className="inv-metric-card__header">
            <span className="inv-metric-card__label">OUT OF STOCK</span>
            <span className="inv-badge inv-badge--neutral">2 Action Needed</span>
          </div>
          <span className="inv-metric-card__val">2</span>
        </div>

        <div className="inv-metric-card">
          <div className="inv-metric-card__header">
            <span className="inv-metric-card__label">HEALTHY</span>
            <span className="inv-badge inv-badge--green">93% Stable</span>
          </div>
          <span className="inv-metric-card__val inv-metric-card__val--green">119</span>
        </div>
      </div>

      {/* 3. LIVE ORDER -> INGREDIENT DEDUCTION AUTOMATION CARD */}
      <div className="inv-flow-card">
        <div className="inv-flow-card__header">
          <div className="inv-flow-card__title-wrap">
            <span className="inv-flow-card__icon">⚡</span>
            <span className="inv-flow-card__title">Order ➔ Inventory Connected System</span>
          </div>
          <button
            type="button"
            onClick={handleSimulateDeduction}
            className="inv-flow-card__btn"
          >
            <span>Simulate Order #108 Deduction</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="inv-flow-card__steps">
          <div className="inv-flow-step">
            <span className="inv-flow-step__tag">COUNTER ORDER</span>
            <span className="inv-flow-step__val">Order #108</span>
            <span className="inv-flow-step__sub">2× Cappuccino, 1× Croissant</span>
          </div>

          <div className="inv-flow-arrow">➔</div>

          <div className="inv-flow-step">
            <span className="inv-flow-step__tag">INGREDIENTS USED</span>
            <span className="inv-flow-step__val">Beans −36g · Milk −500ml</span>
            <span className="inv-flow-step__sub">Butter −20g · Croissant −1</span>
          </div>

          <div className="inv-flow-arrow">➔</div>

          <div className="inv-flow-step inv-flow-step--updated">
            <span className="inv-flow-step__tag">STOCK UPDATED</span>
            <span className="inv-flow-step__val">Milk 18.5L ➔ 18.0L</span>
            <span className="inv-flow-step__sub">Live Auto-Deducted</span>
          </div>
        </div>

        {deductedOrder && (
          <div className="inv-flow-toast">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#14503E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Order #108 completed! Auto-deducted 36g espresso beans & 500ml milk.</span>
          </div>
        )}
      </div>

      {/* 4. INGREDIENTS STOCK LIST */}
      <div className="inv-table-wrap">
        <div className="inv-table-header">
          <span className="inv-th inv-th--name">Ingredient Name</span>
          <span className="inv-th inv-th--cat">Category</span>
          <span className="inv-th inv-th--stock">Current Stock</span>
          <span className="inv-th inv-th--status">Stock Status</span>
          <span className="inv-th inv-th--action">Action</span>
        </div>

        <div className="inv-table-body">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`inv-row-container ${isExpanded ? "is-expanded" : ""}`}
              >
                <div
                  className="inv-row"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="inv-cell inv-cell--name">
                    <div className="inv-icon" style={{ background: item.iconBg }}>
                      {item.iconSvg}
                    </div>
                    <div>
                      <span className="inv-name">{item.name}</span>
                      {item.estOrders && (
                        <span className="inv-est">{item.estOrders}</span>
                      )}
                    </div>
                  </div>

                  <div className="inv-cell inv-cell--cat">
                    <span className="inv-cat-tag">{item.category}</span>
                  </div>

                  <div className="inv-cell inv-cell--stock">
                    <span className="inv-stock-val">
                      {item.current} <small>{item.unit}</small>
                    </span>
                  </div>

                  <div className="inv-cell inv-cell--status">
                    {item.status === "healthy" && (
                      <span className="inv-status-pill inv-status-pill--healthy">
                        ✓ Healthy
                      </span>
                    )}
                    {item.status === "low" && (
                      <span className="inv-status-pill inv-status-pill--low">
                        ! Low Stock
                      </span>
                    )}
                  </div>

                  <div className="inv-cell inv-cell--action">
                    {item.status === "low" ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Purchase order initialized for ${item.name}`);
                        }}
                        className="inv-reorder-btn"
                      >
                        Restock →
                      </button>
                    ) : (
                      <span className="inv-expand-hint">
                        {isExpanded ? "Close" : "Details"}
                      </span>
                    )}
                  </div>
                </div>

                {/* EXPANDED INGREDIENT INTELLIGENCE BREAKDOWN */}
                {isExpanded && (
                  <div className="inv-expanded-panel">
                    <div className="inv-expanded-grid">
                      <div className="inv-exp-stat">
                        <span className="inv-exp-stat__label">Daily Average Consumption</span>
                        <span className="inv-exp-stat__val">{item.dailyUsage}</span>
                      </div>
                      <div className="inv-exp-stat">
                        <span className="inv-exp-stat__label">Automated Reorder Point</span>
                        <span className="inv-exp-stat__val">{item.reorderPoint}</span>
                      </div>
                      <div className="inv-exp-stat">
                        <span className="inv-exp-stat__label">Estimated Stock Runway</span>
                        <span className="inv-exp-stat__val">
                          {item.status === "low" ? "~1.5 Days Left" : "~6.0 Days Left"}
                        </span>
                      </div>
                      <div className="inv-exp-stat">
                        <button
                          type="button"
                          className="inv-po-btn"
                          onClick={() => alert(`Created Purchase Order for ${item.name}`)}
                        >
                          Create Purchase Order →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
