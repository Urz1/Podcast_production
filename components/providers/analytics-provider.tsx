"use client";

import { createContext, useContext, ReactNode } from "react";
import { AnalyticsProvider as AnalyticsProviderType } from "@/lib/analytics/types";

// Default console-based analytics for development
const defaultProvider: AnalyticsProviderType = {
  track: (event, properties) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Track:", event, properties);
    }
  },
  page: (name, properties) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Page:", name, properties);
    }
  },
  identify: (userId, traits) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Identify:", userId, traits);
    }
  },
};

const AnalyticsContext = createContext<AnalyticsProviderType>(defaultProvider);

interface AnalyticsProviderProps {
  children: ReactNode;
  provider?: AnalyticsProviderType;
}

export function AnalyticsProvider({
  children,
  provider = defaultProvider,
}: AnalyticsProviderProps) {
  return (
    <AnalyticsContext.Provider value={provider}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsProvider() {
  return useContext(AnalyticsContext);
}
