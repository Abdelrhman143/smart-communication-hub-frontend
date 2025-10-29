"use client";

import AiSidebar from "../_components/AiSidebar";
import Chat from "../_components/Chat";
import ChatSideBar from "../_components/ChatSideBar";
import MessageForm from "../_components/MessageForm";
import SidebarController from "../_components/SidebarController";
import { SidebarProvider } from "../Context/Sidebar.context";

export default function page() {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh">
        <SidebarController name="chat">
          <ChatSideBar />
        </SidebarController>
        <div className="hidden lg:block">
          <ChatSideBar />
        </div>
        <div className="flex-1 flex-col flex justify-between">
          <Chat />
          <MessageForm />
        </div>
        <SidebarController name="ai">
          <AiSidebar />
        </SidebarController>
        <div className="hidden lg:block">
          <AiSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
}
