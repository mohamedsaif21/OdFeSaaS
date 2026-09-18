"use client";

export type RoleId = "owner" | "manager" | "cashier" | "kitchen" | "customer";

export type RoleData = {
  id: RoleId;
  tag: string;
  headline: string;
  description: string;
  indicators?: { label: string; val: string }[];
  flowSteps?: string[];
  orderSnippet?: { id: string; status: string };
};

interface RoleCardProps {
  role: RoleData;
  isActive: boolean;
  onHover: (id: RoleId | null) => void;
  onSelect: (id: RoleId) => void;
}

export default function RoleCard({
  role,
  isActive,
  onHover,
  onSelect,
}: RoleCardProps) {
  return (
    <div
      className={`role-card ${isActive ? "is-active" : ""}`}
      onMouseEnter={() => onHover(role.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(role.id)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      aria-label={`View ${role.tag} role details`}
    >
      <div className="role-card__top">
        <span className="role-card__tag">{role.tag}</span>
        <span className="role-card__indicator-dot" />
      </div>

      <h3 className="role-card__headline">{role.headline}</h3>
      <p className="role-card__desc">{role.description}</p>

      {/* Role Contextual Visuals */}
      <div className="role-card__context">
        {/* Indicators for Owner & Manager */}
        {role.indicators && (
          <div className="role-indicators">
            {role.indicators.map((ind) => (
              <div className="role-indicator-pill" key={ind.label}>
                <span className="role-indicator-pill__label">{ind.label}:</span>
                <span className="role-indicator-pill__val">{ind.val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Order Fragment for Cashier */}
        {role.orderSnippet && (
          <div className="role-order-fragment">
            <span className="role-order-fragment__tag">COUNTER HANDOFF</span>
            <div className="role-order-fragment__details">
              <span className="role-order-fragment__id">{role.orderSnippet.id}</span>
              <span className="role-order-fragment__arrow">→</span>
              <span className="role-order-fragment__status">{role.orderSnippet.status}</span>
            </div>
          </div>
        )}

        {/* Flow steps for Kitchen & Customer */}
        {role.flowSteps && (
          <div className="role-flow-steps">
            {role.flowSteps.map((step, idx) => (
              <div className="role-flow-step-item" key={step}>
                <span className={`role-flow-step-pill ${idx === 1 ? "role-flow-step-pill--active" : ""}`}>
                  {step}
                </span>
                {idx < role.flowSteps!.length - 1 && <span className="role-flow-arrow">→</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
