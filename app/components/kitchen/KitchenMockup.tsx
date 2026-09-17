"use client";

import { useState, useEffect } from "react";

type OrderStatus = "new" | "prep" | "ready";

type KitchenOrder = {
  id: string;
  orderNo: string;
  type: string;
  table?: string;
  items: { name: string; qty: number; note?: string }[];
  elapsed: string;
  status: OrderStatus;
  station: "espresso" | "kitchen";
};

const INITIAL_ORDERS: KitchenOrder[] = [
  {
    id: "ord-108",
    orderNo: "#108",
    type: "Dine-in",
    table: "Table 12",
    items: [
      { name: "Cappuccino", qty: 2, note: "Oat milk, Extra shot" },
      { name: "Butter Croissant", qty: 1 },
    ],
    elapsed: "01:20",
    status: "new",
    station: "espresso",
  },
  {
    id: "ord-107",
    orderNo: "#107",
    type: "Pickup",
    table: "Counter #42",
    items: [
      { name: "Iced Caramel Latte", qty: 1, note: "Less ice" },
      { name: "Toasted Bagel", qty: 1, note: "Cream cheese" },
    ],
    elapsed: "04:32",
    status: "prep",
    station: "espresso",
  },
  {
    id: "ord-106",
    orderNo: "#106",
    type: "Online",
    items: [
      { name: "Cold Brew", qty: 1 },
      { name: "Banana Bread", qty: 1 },
    ],
    elapsed: "07:15",
    status: "ready",
    station: "kitchen",
  },
  {
    id: "ord-109",
    orderNo: "#109",
    type: "Takeaway",
    table: "Counter",
    items: [
      { name: "Chicken Sandwich", qty: 1, note: "Extra pesto" },
      { name: "Avocado Toast", qty: 1 },
    ],
    elapsed: "00:45",
    status: "new",
    station: "kitchen",
  },
];

export default function KitchenMockup() {
  const [orders, setOrders] = useState<KitchenOrder[]>(INITIAL_ORDERS);
  const [activeStation, setActiveStation] = useState<"all" | "espresso" | "kitchen">("all");
  const [syncPulse, setSyncPulse] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Automated workflow simulation loop (cycles NEW -> PREP -> READY)
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) => {
        const hasNew = prev.some((o) => o.status === "new");
        if (hasNew) {
          // Move first 'new' order to 'prep'
          let updated = false;
          return prev.map((o) => {
            if (!updated && o.status === "new") {
              updated = true;
              return { ...o, status: "prep" as OrderStatus, elapsed: "00:05" };
            }
            return o;
          });
        } else {
          // Reset #108 to 'new' to keep demo loop alive and predictable
          return prev.map((o) => {
            if (o.id === "ord-108") {
              return { ...o, status: "new" as OrderStatus, elapsed: "00:10" };
            }
            if (o.id === "ord-107" && o.status === "prep") {
              return { ...o, status: "ready" as OrderStatus };
            }
            return o;
          });
        }
      });

      // Pulse live sync indicator
      setSyncPulse(true);
      setTimeout(() => setSyncPulse(false), 1200);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Manual status transition
  const handleAdvanceStatus = (id: string, targetStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: targetStatus } : o))
    );
    setSyncPulse(true);
    setTimeout(() => setSyncPulse(false), 1200);
  };

  // Filter orders by active station
  const filteredOrders = orders.filter(
    (o) => activeStation === "all" || o.station === activeStation
  );

  const newOrders = filteredOrders.filter((o) => o.status === "new");
  const prepOrders = filteredOrders.filter((o) => o.status === "prep");
  const readyOrders = filteredOrders.filter((o) => o.status === "ready");

  return (
    <div className="kitchen-mockup" id="kitchenMockupWrap">
      {/* 1. TOP WINDOW CHROME */}
      <div className="kds-chrome">
        <div className="kds-chrome__left">
          <div className="pos-chrome__dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <div className="kds-chrome__brand">
            <span className="kds-chrome__icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h10" stroke="#14503E" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="kds-chrome__title">OdFe Kitchen Display</span>
            <span className="kds-chrome__badge">KDS Live</span>
          </div>
        </div>

        <div className="kds-chrome__center">
          <button
            type="button"
            onClick={() => setActiveStation("all")}
            className={`kds-station-tab ${activeStation === "all" ? "is-active" : ""}`}
          >
            All Stations ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveStation("espresso")}
            className={`kds-station-tab ${activeStation === "espresso" ? "is-active" : ""}`}
          >
            Espresso Bar (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveStation("kitchen")}
            className={`kds-station-tab ${activeStation === "kitchen" ? "is-active" : ""}`}
          >
            Hot Kitchen (2)
          </button>
        </div>

        <div className="kds-chrome__right">
          <span className="kds-chrome__loc">Anna Nagar Flagship</span>
          <div className={`kds-chrome__sync ${syncPulse ? "is-pulsing" : ""}`}>
            <span className="pulse-dot">
              <span className="pulse-ping" />
            </span>
            <span>Live KOT</span>
          </div>
        </div>
      </div>

      {/* 2. THREE STATUS COLUMNS (NEW -> PREPARING -> READY) */}
      <div className="kds-columns">
        {/* COLUMN 1: NEW */}
        <div className="kds-column kds-column--new">
          <div className="kds-col-header">
            <div className="kds-col-header__title-wrap">
              <span className="kds-col-header__dot kds-col-header__dot--gold" />
              <h3 className="kds-col-header__title">NEW</h3>
              <span className="kds-col-header__count">{newOrders.length}</span>
            </div>
            <span className="kds-col-header__hint">Incoming Tickets</span>
          </div>

          <div className="kds-cards-list">
            {newOrders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => setSelectedOrder(selectedOrder === ord.id ? null : ord.id)}
                className={`kds-card kds-card--new ${selectedOrder === ord.id ? "is-selected" : ""}`}
              >
                <div className="kds-card__top">
                  <div className="kds-card__no-wrap">
                    <span className="kds-card__no">{ord.orderNo}</span>
                    <span className="kds-card__type">
                      {ord.type} {ord.table ? `· ${ord.table}` : ""}
                    </span>
                  </div>
                  <span className="kds-card__timer kds-card__timer--gold">
                    ⏱ {ord.elapsed}
                  </span>
                </div>

                <div className="kds-card__items">
                  {ord.items.map((item, idx) => (
                    <div className="kds-card__item" key={idx}>
                      <span className="kds-card__item-qty">{item.qty}×</span>
                      <div className="kds-card__item-details">
                        <span className="kds-card__item-name">{item.name}</span>
                        {item.note && (
                          <span className="kds-card__item-note">Note: {item.note}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="kds-card__footer">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdvanceStatus(ord.id, "prep");
                    }}
                    className="kds-action-btn kds-action-btn--prep"
                  >
                    <span>Start Preparing →</span>
                  </button>
                </div>
              </div>
            ))}

            {newOrders.length === 0 && (
              <div className="kds-empty-col">
                <p>No new orders pending</p>
                <span>Waiting for counter tickets</span>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 2: PREPARING */}
        <div className="kds-column kds-column--prep">
          <div className="kds-col-header">
            <div className="kds-col-header__title-wrap">
              <span className="kds-col-header__dot kds-col-header__dot--green" />
              <h3 className="kds-col-header__title">PREPARING</h3>
              <span className="kds-col-header__count">{prepOrders.length}</span>
            </div>
            <span className="kds-col-header__hint">Active Barista & Kitchen</span>
          </div>

          <div className="kds-cards-list">
            {prepOrders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => setSelectedOrder(selectedOrder === ord.id ? null : ord.id)}
                className={`kds-card kds-card--prep ${selectedOrder === ord.id ? "is-selected" : ""}`}
              >
                <div className="kds-card__top">
                  <div className="kds-card__no-wrap">
                    <span className="kds-card__no">{ord.orderNo}</span>
                    <span className="kds-card__type">
                      {ord.type} {ord.table ? `· ${ord.table}` : ""}
                    </span>
                  </div>
                  <span className="kds-card__timer kds-card__timer--green">
                    <span className="pulse-dot" style={{ width: 5, height: 5 }} />
                    {ord.elapsed}
                  </span>
                </div>

                <div className="kds-card__items">
                  {ord.items.map((item, idx) => (
                    <div className="kds-card__item" key={idx}>
                      <span className="kds-card__item-qty">{item.qty}×</span>
                      <div className="kds-card__item-details">
                        <span className="kds-card__item-name">{item.name}</span>
                        {item.note && (
                          <span className="kds-card__item-note">Note: {item.note}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="kds-card__footer">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdvanceStatus(ord.id, "ready");
                    }}
                    className="kds-action-btn kds-action-btn--ready"
                  >
                    <span>Mark Ready ✓</span>
                  </button>
                </div>
              </div>
            ))}

            {prepOrders.length === 0 && (
              <div className="kds-empty-col">
                <p>No orders being prepared</p>
                <span>Barista screens clear</span>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 3: READY */}
        <div className="kds-column kds-column--ready">
          <div className="kds-col-header">
            <div className="kds-col-header__title-wrap">
              <span className="kds-col-header__dot kds-col-header__dot--ready" />
              <h3 className="kds-col-header__title">READY</h3>
              <span className="kds-col-header__count">{readyOrders.length}</span>
            </div>
            <span className="kds-col-header__hint">Ready for Pickup & Serve</span>
          </div>

          <div className="kds-cards-list">
            {readyOrders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => setSelectedOrder(selectedOrder === ord.id ? null : ord.id)}
                className={`kds-card kds-card--ready ${selectedOrder === ord.id ? "is-selected" : ""}`}
              >
                <div className="kds-card__top">
                  <div className="kds-card__no-wrap">
                    <span className="kds-card__no">{ord.orderNo}</span>
                    <span className="kds-card__type">
                      {ord.type} {ord.table ? `· ${ord.table}` : ""}
                    </span>
                  </div>
                  <span className="kds-card__status-pill">Ready for Pickup</span>
                </div>

                <div className="kds-card__items">
                  {ord.items.map((item, idx) => (
                    <div className="kds-card__item" key={idx}>
                      <span className="kds-card__item-qty">{item.qty}×</span>
                      <div className="kds-card__item-details">
                        <span className="kds-card__item-name">{item.name}</span>
                        {item.note && (
                          <span className="kds-card__item-note">Note: {item.note}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="kds-card__footer">
                  <div className="kds-served-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#1B6C4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Notified Front Desk</span>
                  </div>
                </div>
              </div>
            ))}

            {readyOrders.length === 0 && (
              <div className="kds-empty-col">
                <p>No orders awaiting pickup</p>
                <span>Completed orders cleared</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
