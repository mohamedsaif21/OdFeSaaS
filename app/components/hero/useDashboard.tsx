"use client";

import { useState, useMemo } from "react";

export type Timeframe = "day" | "week" | "month";

export function useDashboardState(initialTimeframe: Timeframe = "day") {
  const [timeframe, setTimeframe] = useState<Timeframe>(initialTimeframe);
  const [activeTab, setActiveTab] = useState("overview");

  return useMemo(
    () => ({
      timeframe,
      setTimeframe,
      activeTab,
      setActiveTab,
    }),
    [timeframe, activeTab]
  );
}
