"use client";

import { useState, useMemo } from "react";

type CategoryId = "all" | "coffee" | "tea" | "breakfast" | "bakery" | "drinks" | "addons";

type Product = {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  description: string;
  tag?: string;
  iconBg: string;
  iconSvg: React.ReactNode;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  modifiers: string[];
};

const CATEGORIES: { id: CategoryId; label: string; count: number }[] = [
  { id: "coffee", label: "Coffee", count: 4 },
  { id: "tea", label: "Tea", count: 3 },
  { id: "breakfast", label: "Breakfast", count: 2 },
  { id: "bakery", label: "Bakery", count: 3 },
  { id: "drinks", label: "Cold Drinks", count: 2 },
  { id: "addons", label: "Add-ons", count: 3 },
];

const PRODUCTS: Product[] = [
  {
    id: "cap",
    name: "Cappuccino",
    price: 160,
    category: "coffee",
    description: "Rich espresso topped with velvety steamed milk foam",
    tag: "Popular",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 8h1a3 3 0 010 6h-1" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M6 2c.5 1 1 2 0 3M10 2c.5 1 1 2 0 3M14 2c.5 1 1 2 0 3" stroke="#C98A2E" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "esp",
    name: "Espresso",
    price: 120,
    category: "coffee",
    description: "Intense single origin shot with golden caramel crema",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 9h1a2 2 0 010 4h-1" stroke="#14503E" strokeWidth="1.8" />
        <path d="M4 9h13v7a3 3 0 01-3 3H7a3 3 0 01-3-3V9z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M2 21h20" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "lat",
    name: "Iced Latte",
    price: 190,
    category: "coffee",
    description: "Double shot over chilled whole milk and crystal ice",
    tag: "Chilled",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 5h10l-1 15H8L7 5z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M5 5h14" stroke="#14503E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 2v3M9 11l6 2M9 15l6 2" stroke="#C98A2E" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "cbd",
    name: "Cold Brew",
    price: 180,
    category: "coffee",
    description: "24-hour slow steeped specialty beans, naturally sweet",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="4" width="10" height="16" rx="3" stroke="#14503E" strokeWidth="1.8" />
        <path d="M10 2h4" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 10h10" stroke="#14503E" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: "cro",
    name: "Butter Croissant",
    price: 140,
    category: "bakery",
    description: "Flaky, multi-layered French pastry baked fresh daily",
    tag: "Fresh Baked",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 14c2-5 6-8 12-5 3 2 4 6 2 9-5 2-10 0-14-4z" stroke="#14503E" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 11c2.5-1 5 0 7 2" stroke="#C98A2E" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "muf",
    name: "Blueberry Muffin",
    price: 130,
    category: "bakery",
    description: "Loaded with wild blueberries and vanilla crumble top",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 10c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#14503E" strokeWidth="1.8" />
        <path d="M5 10h14l-1.5 10h-11L5 10z" stroke="#14503E" strokeWidth="1.8" />
        <circle cx="10" cy="7" r="1" fill="#C98A2E" />
        <circle cx="14" cy="8" r="1" fill="#C98A2E" />
      </svg>
    ),
  },
  {
    id: "cak",
    name: "Chocolate Cake",
    price: 180,
    category: "bakery",
    description: "Decadent 70% dark Belgian cocoa layer cake",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 15l16-6v9H4v-3z" stroke="#14503E" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 15V9l16-3v3L4 15z" stroke="#14503E" strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="5" r="1.5" fill="#C98A2E" />
      </svg>
    ),
  },
  {
    id: "san",
    name: "Chicken Sandwich",
    price: 240,
    category: "breakfast",
    description: "Herb-grilled chicken, pesto & mozzarella on sourdough",
    tag: "Chef Special",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="4" rx="2" stroke="#14503E" strokeWidth="1.8" />
        <path d="M4 10h16v4H4z" fill="#C98A2E" opacity="0.4" />
        <rect x="3" y="14" width="18" height="4" rx="2" stroke="#14503E" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "avt",
    name: "Avocado Toast",
    price: 220,
    category: "breakfast",
    description: "Smashed hass avocado, chili flakes & poached egg",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 9c0-2.2 3.1-5 7-5s7 2.8 7 5v9H5V9z" stroke="#14503E" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.5" stroke="#C98A2E" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "mat",
    name: "Matcha Latte",
    price: 210,
    category: "tea",
    description: "Ceremonial grade Uji matcha whisked with oat milk",
    tag: "Organic",
    iconBg: "rgba(20, 80, 62, 0.12)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 9h1a2 2 0 010 4h-1" stroke="#14503E" strokeWidth="1.8" />
        <path d="M4 9h13v7a3 3 0 01-3 3H7a3 3 0 01-3-3V9z" stroke="#14503E" strokeWidth="1.8" fill="rgba(36, 138, 91, 0.15)" />
      </svg>
    ),
  },
  {
    id: "cha",
    name: "Chai Latte",
    price: 150,
    category: "tea",
    description: "House spiced Assam black tea with cardamon & cinnamon",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 9h1a2 2 0 010 4h-1" stroke="#14503E" strokeWidth="1.8" />
        <path d="M4 9h13v7a3 3 0 01-3 3H7a3 3 0 01-3-3V9z" stroke="#14503E" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "egr",
    name: "Earl Grey Tea",
    price: 130,
    category: "tea",
    description: "Fragrant bergamot infused black tea leaves",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 18c0 2 2.7 4 6 4s6-2 6-4V7H6v11z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M12 2v5" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "pit",
    name: "Peach Iced Tea",
    price: 160,
    category: "drinks",
    description: "Fresh brewed black tea with white peach syrup & mint",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 6h10l-1 14H8L7 6z" stroke="#14503E" strokeWidth="1.8" />
        <circle cx="12" cy="13" r="2" fill="#C98A2E" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "iam",
    name: "Iced Americano",
    price: 140,
    category: "drinks",
    description: "Double espresso diluted over ice and cold filtered water",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 6h10l-1 14H8L7 6z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M12 2v4" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "oat",
    name: "Oat Milk Sub",
    price: 30,
    category: "addons",
    description: "Substitute dairy with creamy bar-grade oat milk",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="8" y="4" width="8" height="16" rx="2" stroke="#14503E" strokeWidth="1.8" />
        <path d="M11 2h2" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "ext",
    name: "Extra Shot",
    price: 40,
    category: "addons",
    description: "Add an extra shot of house espresso blend",
    iconBg: "rgba(201, 138, 46, 0.12)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7" stroke="#14503E" strokeWidth="1.8" />
        <path d="M12 9v6M9 12h6" stroke="#C98A2E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "syr",
    name: "Hazelnut Syrup",
    price: 25,
    category: "addons",
    description: "1 pump of house-made hazelnut flavor syrup",
    iconBg: "rgba(20, 80, 62, 0.08)",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10 4h4v4h-4z" stroke="#14503E" strokeWidth="1.8" />
        <path d="M8 8h8v12H8z" stroke="#14503E" strokeWidth="1.8" />
      </svg>
    ),
  },
];

const INITIAL_CART: CartItem[] = [
  {
    id: "cap",
    name: "Cappuccino",
    price: 160,
    qty: 2,
    modifiers: ["Oat milk", "Extra shot"],
  },
  {
    id: "cro",
    name: "Butter Croissant",
    price: 140,
    qty: 1,
    modifiers: [],
  },
  {
    id: "lat",
    name: "Iced Latte",
    price: 190,
    qty: 1,
    modifiers: [],
  },
];

export default function PosMockup() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("coffee");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch =
        !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          modifiers: [],
        },
      ];
    });

    setLastAddedItem(product.name);
    setTimeout(() => setLastAddedItem(null), 1500);
  };

  // Update item quantity in cart
  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Calculate Subtotal & Tax & Total
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      // Add extra charge for modifiers if any (e.g., Oat milk = ₹30)
      const modCost = item.modifiers.reduce((mAcc, m) => {
        if (m === "Oat milk") return mAcc + 30;
        if (m === "Extra shot") return mAcc + 40;
        return mAcc;
      }, 0);
      return acc + (item.price + modCost) * item.qty;
    }, 0);
  }, [cart]);

  const tax = useMemo(() => Math.round(subtotal * 0.05 * 100) / 100, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  return (
    <div className="pos-mockup" id="posMockupWrap">
      {/* 1. TOP WINDOW CHROME */}
      <div className="pos-chrome">
        <div className="pos-chrome__left">
          <div className="pos-chrome__dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <div className="pos-chrome__brand">
            <span className="pos-chrome__logo-dot" />
            <span className="pos-chrome__title">OdFe POS</span>
            <span className="pos-chrome__ver">v2.4</span>
          </div>
        </div>

        <div className="pos-chrome__center">
          <span className="pos-chrome__loc">Anna Nagar Flagship</span>
          <span className="pos-chrome__sep">·</span>
          <span className="pos-chrome__table-badge">Table 12 · Dine-in</span>
        </div>

        <div className="pos-chrome__right">
          <span className="pos-chrome__user">Aravind K.</span>
          <div className="pos-chrome__sync">
            <span className="pulse-dot">
              <span className="pulse-ping" />
            </span>
            <span className="pos-chrome__sync-txt">Live Sync</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN POS BODY */}
      <div className="pos-body">
        {/* LEFT COLUMN: Categories & Products Grid */}
        <div className="pos-main-panel">
          {/* SEARCH & FILTER BAR */}
          <div className="pos-toolbar">
            <div className="pos-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="pos-search__icon">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search items by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pos-search__input"
              />
              <span className="pos-search__kbd">⌘K</span>
            </div>

            {/* CATEGORIES SCROLL TABS */}
            <div className="pos-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`pos-cat-btn ${activeCategory === cat.id ? "is-active" : ""}`}
                >
                  <span>{cat.label}</span>
                  <span className="pos-cat-btn__count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="pos-grid">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleAddToCart(p)}
                className="pos-product-card"
              >
                <div className="pos-product-card__header">
                  <div
                    className="pos-product-card__icon"
                    style={{ background: p.iconBg }}
                  >
                    {p.iconSvg}
                  </div>
                  {p.tag && <span className="pos-product-card__tag">{p.tag}</span>}
                </div>

                <div className="pos-product-card__body">
                  <h4 className="pos-product-card__title">{p.name}</h4>
                  <p className="pos-product-card__desc">{p.description}</p>
                </div>

                <div className="pos-product-card__footer">
                  <span className="pos-product-card__price">₹{p.price}</span>
                  <span className="pos-product-card__add-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                    Add
                  </span>
                </div>
              </button>
            ))}

            {filteredProducts.length === 0 && (
              <div className="pos-grid-empty">
                <p>No items found matching "{searchQuery}"</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="pos-grid-empty__btn"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Current Order Ticket Panel */}
        <div className="pos-order-panel">
          <div className="pos-order-panel__header">
            <div className="pos-order-panel__title-wrap">
              <h3 className="pos-order-panel__title">Current Order</h3>
              <span className="pos-order-panel__ticket-no">#1042</span>
            </div>
            <div className="pos-order-panel__meta">
              <span className="pos-order-panel__table">Table 12</span>
              <span className="pos-order-panel__dot">·</span>
              <span className="pos-order-panel__type">Dine-in</span>
            </div>
          </div>

          {/* ITEM FEEDBACK TOAST */}
          {lastAddedItem && (
            <div className="pos-toast">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#14503E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Added <strong>{lastAddedItem}</strong></span>
            </div>
          )}

          {/* CART ITEMS LIST */}
          <div className="pos-cart-list">
            {cart.map((item) => (
              <div className="pos-cart-item" key={item.id}>
                <div className="pos-cart-item__main">
                  <div className="pos-cart-item__info">
                    <span className="pos-cart-item__title">{item.name}</span>
                    <span className="pos-cart-item__price">
                      ₹{item.price * item.qty}
                    </span>
                  </div>

                  {/* MODIFIERS CHIPS */}
                  {item.modifiers.length > 0 && (
                    <div className="pos-cart-item__mods">
                      {item.modifiers.map((mod) => (
                        <span className="pos-mod-chip" key={mod}>
                          + {mod}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="pos-cart-item__controls">
                  <button
                    type="button"
                    onClick={() => handleUpdateQty(item.id, -1)}
                    className="pos-qty-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="pos-qty-val">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => handleUpdateQty(item.id, 1)}
                    className="pos-qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="pos-cart-empty">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.3">
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <p>Order ticket is empty</p>
                <span>Click products on the left to add</span>
              </div>
            )}
          </div>

          {/* TOTALS & PAYMENT SECTION */}
          <div className="pos-totals">
            <div className="pos-totals__row">
              <span className="pos-totals__label">Subtotal</span>
              <span className="pos-totals__val">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="pos-totals__row">
              <span className="pos-totals__label">GST (5%)</span>
              <span className="pos-totals__val">₹{tax.toFixed(2)}</span>
            </div>

            <div className="pos-totals__row pos-totals__row--grand">
              <span className="pos-totals__grand-label">Total</span>
              <span className="pos-totals__grand-val">₹{total.toFixed(2)}</span>
            </div>

            {/* CHARGE PRIMARY BUTTON */}
            <button
              type="button"
              disabled={cart.length === 0}
              className="pos-charge-btn btn--shine"
            >
              <span>Charge ₹{total.toFixed(2)}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* PAYMENT METHOD BADGES */}
            <div className="pos-pay-methods">
              <span className="pos-pay-chip">Card</span>
              <span className="pos-pay-dot">·</span>
              <span className="pos-pay-chip">UPI</span>
              <span className="pos-pay-dot">·</span>
              <span className="pos-pay-chip">Cash</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
