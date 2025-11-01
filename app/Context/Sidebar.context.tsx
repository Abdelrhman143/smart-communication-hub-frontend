// Sidebar context - Manages mobile sidebar state (open/close) and active sidebar type (chat/AI)
"use client";
import { createContext, useContext, useState } from "react";
type SidebarValue =
  | {
      isSidebarOpen: boolean;
      activeSidebar: string | null;
      openSidebar: (name: string) => void;
      closeSidebar: () => void;
      toggleSidebar: (name?: string) => void;
    }
  | undefined;

const SidebarContext = createContext<SidebarValue>(undefined);

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState<string | null>(null);

  // Open specific sidebar (chat or AI)
  const openSidebar = (name: string) => {
    setActiveSidebar(name);
    setSidebarOpen(true);
  };

  // Close sidebar and clear active type
  const closeSidebar = () => {
    setSidebarOpen(false);
    setActiveSidebar(null);
  };

  // Toggle sidebar - if name provided, toggle that specific sidebar, otherwise toggle open/close
  const toggleSidebar = (name?: string) => {
    if (name) {
      if (isSidebarOpen && activeSidebar === name) {
        closeSidebar();
      } else {
        openSidebar(name);
      }
      return;
    }
    setSidebarOpen((prev) => {
      const next = !prev;
      if (!next) setActiveSidebar(null);
      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        activeSidebar,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("SidebarContext was used outside the CitiesProvider");
  return context;
}

export { useSidebar, SidebarProvider };
