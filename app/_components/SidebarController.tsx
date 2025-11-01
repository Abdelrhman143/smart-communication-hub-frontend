// Sidebar controller - Controls mobile sidebar visibility (chat or AI sidebar)
"use client";
import { useSidebar } from "../Context/Sidebar.context";

type Props = {
  name: string;
  children: React.ReactNode;
};

export default function SidebarController({ name, children }: Props) {
  const { isSidebarOpen, activeSidebar } = useSidebar();
  return (
    <div className={`absolute  z-50 ${name === "ai" ? "right-0" : ""}`}>
      {isSidebarOpen && activeSidebar === name && children}
    </div>
  );
}
