// Dashboard layout - Protected layout with chat sidebar, AI sidebar, and mobile sidebar controllers
import AiSidebar from "../_components/AiSidebar";
import ChatSideBar from "../_components/ChatSideBar";
import Protected from "../_components/Protected";
import SidebarController from "../_components/SidebarController";
import { SidebarProvider } from "../Context/Sidebar.context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <SidebarProvider>
        <div className="flex min-h-dvh">
          <SidebarController name="chat">
            <ChatSideBar />
          </SidebarController>
          <div className="hidden lg:block">
            <ChatSideBar />
          </div>
          {children}
          <SidebarController name="ai">
            <AiSidebar />
          </SidebarController>
          <div className="hidden lg:block">
            <AiSidebar />
          </div>
        </div>
      </SidebarProvider>
    </Protected>
  );
}
