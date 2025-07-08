"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";

// Define the possible header tabs
export type HeaderTab = "/" | "/blog" | "/project" | "/contact";

const headerTabs: HeaderTab[] = ["/", "/blog", "/project", "/contact"];

interface HeaderActiveTabContextType {
  activeTab: HeaderTab;
}

const HeaderActiveTabContext = createContext<HeaderActiveTabContextType | undefined>(undefined);

export function HeaderActiveTabProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Determine the active tab based on the current pathname
  const activeTab =
    (headerTabs.find(
      (tab) =>
        (tab === "/" && pathname === "/") ||
        (tab !== "/" && (pathname === tab || pathname?.startsWith(tab + "/")))
    ) as HeaderTab) || "/";

  return (
    <HeaderActiveTabContext.Provider value={{ activeTab }}>
      {children}
    </HeaderActiveTabContext.Provider>
  );
}

export function useHeaderActiveTab() {
  const context = useContext(HeaderActiveTabContext);
  if (!context) {
    throw new Error("useHeaderActiveTab must be used within a HeaderActiveTabProvider");
  }
  return context;
} 