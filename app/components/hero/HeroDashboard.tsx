"use client";

import { useState } from "react";

type Timeframe = "day" | "week" | "month";

type BarData = {
  label: string;
  sublabel?: string;
  revenue: string;
  orders: number;
  height: number;
  tone?: "warm" | "peak";
};

const DATA: Record<
  Timeframe,
  {
    sales: string;
    salesDelta: string;
    orders: string;
    ordersDelta: string;
    ticket: string;
    ticketDelta: string;
    chartTitle: string;
    chartSubtitle: string;
    bars: BarData[];
  }
> = {
  day: {
    sales: "₹42,860",
    salesDelta: "+8.2% vs yesterday",
    orders: "318",
    ordersDelta: "+4.1% vs avg",
    ticket: "₹135",
    ticketDelta: "+2.8% add-ons",
    chartTitle: "Hourly Sales Volume",
    chartSubtitle: "Morning rush peaked at 9:00 AM (64 orders)",
    bars: [
      { label: "7 AM", revenue: "₹1,820", orders: 14, height: 22 },
      { label: "8 AM", revenue: "₹4,650", orders: 36, height: 48, tone: "warm" },
      { label: "9 AM", revenue: "₹8,420", orders: 64, height: 92, tone: "peak" },
      { label: "10 AM", revenue: "₹6,940", orders: 52, height: 74, tone: "warm" },
      { label: "11 AM", revenue: "₹4,120", orders: 31, height: 44 },
      { label: "12 PM", revenue: "₹3,680", orders: 28, height: 38 },
      { label: "1 PM", revenue: "₹4,890", orders: 37, height: 52 },
      { label: "2 PM", revenue: "₹3,240", orders: 24, height: 35 },
      { label: "3 PM", revenue: "₹3,910", orders: 29, height: 42 },
      { label: "4 PM", revenue: "₹5,980", orders: 46, height: 65, tone: "warm" },
      { label: "5 PM", revenue: "₹7,860", orders: 60, height: 86, tone: "peak" },
      { label: "6 PM", revenue: "₹4,210", orders: 32, height: 46 },
    ],
  },
  week: {
    sales: "₹2,84,200",
    salesDelta: "+14.6% vs last week",
    orders: "2,140",
    ordersDelta: "+11.2% traffic",
    ticket: "₹133",
    ticketDelta: "+3.1% basket",
    chartTitle: "Weekly Revenue Trend",
    chartSubtitle: "Weekend brunch volume peaked on Sunday",
    bars: [
      { label: "Mon", revenue: "₹32,400", orders: 245, height: 44 },
      { label: "Tue", revenue: "₹34,800", orders: 262, height: 48 },
      { label: "Wed", revenue: "₹42,860", orders: 318, height: 64, tone: "warm" },
      { label: "Thu", revenue: "₹39,200", orders: 294, height: 55 },
      { label: "Fri", revenue: "₹48,600", orders: 372, height: 78, tone: "warm" },
      { label: "Sat", revenue: "₹52,140", orders: 408, height: 88, tone: "peak" },
      { label: "Sun", revenue: "₹54,200", orders: 421, height: 96, tone: "peak" },
    ],
  },
  month: {
    sales: "₹11,48,500",
    salesDelta: "+19.4% vs last month",
    orders: "8,760",
    ordersDelta: "+15.8% visits",
    ticket: "₹131",
    ticketDelta: "+4.2% repeats",
    chartTitle: "Monthly Performance",
    chartSubtitle: "Record specialty bean & bakery sales",
    bars: [
      { label: "Week 1", revenue: "₹2,42,000", orders: 1840, height: 58 },
      { label: "Week 2", revenue: "₹2,68,000", orders: 2050, height: 68 },
      { label: "Week 3", revenue: "₹2,84,200", orders: 2140, height: 76, tone: "warm" },
      { label: "Week 4", revenue: "₹3,54,300", orders: 2730, height: 95, tone: "peak" },
    ],
  },
};

const SIDEBAR_WORKSPACE = [
  { id: "overview", label: "Overview", icon: "dashboard" },
  { id: "pos", label: "Point of Sale", icon: "pos", badge: "Live" },
  { id: "orders", label: "Live Orders", icon: "receipt", count: "6" },
  { id: "kitchen", label: "Kitchen Display", icon: "kitchen", badge: "KOT" },
];

const SIDEBAR_MANAGE = [
  { id: "inventory", label: "Smart Inventory", icon: "box", alert: true },
  { id: "customers", label: "Customers & CRM", icon: "users" },
  { id: "analytics", label: "Reports & VAT", icon: "analytics" },
];

const LIVE_ORDERS = [
  {
    id: "T4",
    avatarBg: "avatar--t4",
    title: "Flat White ×2, Butter Croissant",
    meta: "Table 4 · Dine-in · 2m ago",
    tag: "Preparing",
    tagClass: "tag--prep",
    amount: "₹460",
    payment: "UPI Paid",
  },
  {
    id: "QR",
    avatarBg: "avatar--qr",
    title: "Cold Brew, Banana Bread",
    meta: "Table 9 · Self-Order · 4m ago",
    tag: "Ready",
    tagClass: "tag--ready",
    amount: "₹380",
    payment: "Card Tap",
  },
  {
    id: "CT",
    avatarBg: "avatar--ct",
    title: "Filter Coffee ×3, Biscotti",
    meta: "Counter · Takeaway · 6m ago",
    tag: "Served",
    tagClass: "tag--served",
    amount: "₹310",
    payment: "Cash",
  },
  {
    id: "DL",
    avatarBg: "avatar--dl",
    title: "Iced Caramel Latte, Bagel",
    meta: "Pickup #108 · Online · 1m ago",
    tag: "In Kitchen",
    tagClass: "tag--prep",
    amount: "₹590",
    payment: "Online",
  },
];

export default function HeroDashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>("day");
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredBar, setHoveredBar] = useState<BarData | null>(null);

  const currentData = DATA[timeframe];

  return (
    <div
      className="dash"
      id="dash"
      role="region"
      aria-label="OdFe SaaS Café POS and Analytics interactive dashboard"
    >
      {/* Top Application Chrome Bar */}
      <div className="dash__chrome">
        <div className="dash__traffic-lights">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>

        <div className="dash__chrome-center">
          <div className="dash__live-pill">
            <span className="pulse-dot">
              <span className="pulse-ping" />
            </span>
            <span className="pulse-text">Live Sync</span>
          </div>
          <span className="dash__divider">·</span>
          <span className="dash__branch">Anna Nagar Flagship · Terminal 01</span>
        </div>

        <div className="dash__chrome-right">
          <span className="dash__shift-badge">Shift #2 · Aravind K.</span>
        </div>
      </div>

      <div className="dash__body">
        {/* Left Workspace Sidebar */}
        <aside className="side">
          <div className="side__brand">
            <div className="side__brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8ZM6 1v3M10 1v3M14 1v3"
                  stroke="#14503E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="side__brand-info">
              <span className="side__brand-title">OdFe Platform</span>
              <span className="side__brand-sub">Café Suite v2.4</span>
            </div>
          </div>

          <div className="side__section-label">WORKSPACE</div>
          {SIDEBAR_WORKSPACE.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`side__item ${isActive ? "is-on" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="side__item-icon">
                  {item.icon === "dashboard" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
                      <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {item.icon === "pos" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M6 8h12M6 12h4M6 16h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                  {item.icon === "receipt" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 2v20l3-2 3 2 3-2 3 2 4-2V2l-4 2-3-2-3 2-3-2-3 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path d="M8 8h8M8 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                  {item.icon === "kitchen" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className="side__item-label">{item.label}</span>
                {item.badge && <span className="side__pill side__pill--green">{item.badge}</span>}
                {item.count && <span className="side__pill side__pill--count">{item.count}</span>}
              </button>
            );
          })}

          <div className="side__section-label">MANAGE</div>
          {SIDEBAR_MANAGE.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`side__item ${isActive ? "is-on" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="side__item-icon">
                  {item.icon === "box" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2" />
                      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {item.icon === "users" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {item.icon === "analytics" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className="side__item-label">{item.label}</span>
                {item.alert && <span className="side__dot-alert" title="Low stock alert" />}
              </button>
            );
          })}

          <div className="side__footer">
            <div className="side__user">
              <div className="side__user-avatar">AK</div>
              <div className="side__user-details">
                <span className="side__user-name">Aravind K.</span>
                <span className="side__user-role">General Manager</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="main">
          {/* Action Bar */}
          <div className="bar">
            <div>
              <h2>Good morning, Aravind</h2>
              <span>Wednesday, 16 September · Live Café Pulse</span>
            </div>
            <div className="bar__tools">
              <div className="search">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="#71807A" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="#71807A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Search orders, tables, items…</span>
                <kbd className="search__kbd">⌘K</kbd>
              </div>
              <button className="pill-btn" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <span>New Order</span>
              </button>
            </div>
          </div>

          {/* Key Metric Cards */}
          <div className="stats">
            <div className="stat">
              <div className="stat__header">
                <span className="stat__k">Total Revenue</span>
                <span className="delta up">▲ {currentData.salesDelta}</span>
              </div>
              <div className="stat__v">
                {currentData.sales}
                <em>.00</em>
              </div>
              <div className="stat__bar-track">
                <div className="stat__bar-fill" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="stat">
              <div className="stat__header">
                <span className="stat__k">Completed Orders</span>
                <span className="delta up">▲ {currentData.ordersDelta}</span>
              </div>
              <div className="stat__v">{currentData.orders}</div>
              <div className="stat__bar-track">
                <div className="stat__bar-fill stat__bar-fill--amber" style={{ width: "65%" }} />
              </div>
            </div>

            <div className="stat">
              <div className="stat__header">
                <span className="stat__k">Average Ticket</span>
                <span className="delta up">▲ {currentData.ticketDelta}</span>
              </div>
              <div className="stat__v">{currentData.ticket}</div>
              <div className="stat__bar-track">
                <div className="stat__bar-fill stat__bar-fill--green" style={{ width: "84%" }} />
              </div>
            </div>
          </div>

          {/* Panels: Analytics Chart + Live Orders Queue */}
          <div className="panels">
            {/* Chart Card */}
            <div className="card">
              <div className="card__top">
                <div>
                  <div className="card__t">{currentData.chartTitle}</div>
                  <div className="card__s">{currentData.chartSubtitle}</div>
                </div>
                <div className="tabs" role="tablist" aria-label="Select timeframe">
                  {(["day", "week", "month"] as Timeframe[]).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      role="tab"
                      aria-selected={timeframe === tf}
                      className={timeframe === tf ? "is-on" : ""}
                      onClick={() => setTimeframe(tf)}
                    >
                      {tf.charAt(0).toUpperCase() + tf.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Bar Chart */}
              <div className="chart-container">
                {hoveredBar && (
                  <div className="chart-tooltip">
                    <span className="chart-tooltip__label">{hoveredBar.label}</span>
                    <span className="chart-tooltip__rev">{hoveredBar.revenue}</span>
                    <span className="chart-tooltip__ord">{hoveredBar.orders} orders</span>
                  </div>
                )}
                <div className="chart" id="chart">
                  {currentData.bars.map((b, i) => (
                    <div
                      key={`${timeframe}-${i}`}
                      className={`chart__bar ${b.tone ?? ""}`}
                      style={{ height: `${b.height}%` }}
                      onMouseEnter={() => setHoveredBar(b)}
                      onMouseLeave={() => setHoveredBar(null)}
                      title={`${b.label}: ${b.revenue} (${b.orders} orders)`}
                    />
                  ))}
                </div>
              </div>

              <div className="hours">
                {timeframe === "day" && (
                  <>
                    <span>7 AM</span>
                    <span>9 AM</span>
                    <span>12 PM</span>
                    <span>3 PM</span>
                    <span>5 PM</span>
                    <span>6 PM</span>
                  </>
                )}
                {timeframe === "week" && (
                  <>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </>
                )}
                {timeframe === "month" && (
                  <>
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </>
                )}
              </div>
            </div>

            {/* Live Orders Queue Card */}
            <div className="card">
              <div className="card__top">
                <div>
                  <div className="card__t">Live Kitchen Queue</div>
                  <div className="card__s">4 active · Real-time KOT</div>
                </div>
                <span className="card__badge-live">● Syncing</span>
              </div>

              <div className="orders-list">
                {LIVE_ORDERS.map((o) => (
                  <div className="order" key={o.id}>
                    <div className={`avatar ${o.avatarBg}`}>{o.id}</div>
                    <div className="order__d">
                      <div className="order__t">{o.title}</div>
                      <div className="order__m">{o.meta}</div>
                    </div>
                    <div className="order__right">
                      <span className="order__amount">{o.amount}</span>
                      <div className={`tag ${o.tagClass}`}>{o.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}