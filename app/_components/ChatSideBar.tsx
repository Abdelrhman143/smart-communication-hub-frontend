"use client";
import { LogOut, Menu } from "lucide-react";
import User from "./User";
import { useSidebar } from "../Context/Sidebar.context";
import { Button } from "@/components/ui/button";
import { useAuth } from "../Context/Auth.context";
import UsersList from "./UsersList";
import useOnclickOutside from "react-cool-onclickoutside";
import { useSocket } from "../Context/Socket.context";

export default function ChatSideBar() {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { onlineUsers } = useSocket();

  const { logout } = useAuth();
  return (
    <div className="bg-white border-r-2 transition border-gray-200 w-80 min-h-dvh overflow-y-auto max-h-[calc(100vh-100px)]">
      {/* header */}
      <div className="p-5 border-b-2 border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Messages</h1>
          <span className="text-gray-500">{onlineUsers.length} online</span>
          <div className=" block size-5" onClick={() => logout()}>
            <LogOut />
          </div>
        </div>
        <Menu className="lg:hidden" onClick={() => toggleSidebar("chat")} />
      </div>
      {/* list of users */}
      <UsersList />
    </div>
  );
}
