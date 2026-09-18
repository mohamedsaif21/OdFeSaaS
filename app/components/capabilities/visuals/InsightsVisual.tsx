"use client";

export default function InsightsVisual() {
  return (
    <div className="cap-visual cap-visual--insights">
      <div className="insights-mini">
        <div className="insights-chart-header">
          <div className="insights-chart-title">Weekly Sales Performance</div>
          <div className="insights-chart-stat">
            <span className="insights-chart-value">₹1,48,200</span>
            <span className="insights-chart-badge">+14.2%</span>
          </div>
        </div>

        <div className="insights-svg-container">
          <svg viewBox="0 0 400 90" fill="none" className="insights-chart-svg">
            <defs>
              <linearGradient id="insightsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B4035" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0B4035" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Background grid lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="#E8E5DC" strokeDasharray="3 3" opacity="0.6" />
            <line x1="0" y1="50" x2="400" y2="50" stroke="#E8E5DC" strokeDasharray="3 3" opacity="0.6" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="#E8E5DC" opacity="0.4" />

            {/* Filled area below path */}
            <path
              d="M 15 65 Q 65 58, 115 45 T 215 35 T 315 22 T 385 15 L 385 80 L 15 80 Z"
              fill="url(#insightsGradient)"
            />

            {/* Sales Line */}
            <path
              d="M 15 65 Q 65 58, 115 45 T 215 35 T 315 22 T 385 15"
              stroke="#0B4035"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="insights-chart-line"
            />

            {/* Active Data Point */}
            <circle cx="385" cy="15" r="4.5" fill="#D9A441" stroke="#0B4035" strokeWidth="2" className="insights-point-active" />
          </svg>
        </div>

        <div className="insights-days">
          <span className="insights-day">Mon</span>
          <span className="insights-day">Tue</span>
          <span className="insights-day">Wed</span>
          <span className="insights-day">Thu</span>
          <span className="insights-day">Fri</span>
          <span className="insights-day">Sat</span>
          <span className="insights-day insights-day--active">Sun</span>
        </div>
      </div>
    </div>
  );
}
