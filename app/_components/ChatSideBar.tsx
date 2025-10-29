import { Menu } from "lucide-react";
import User from "./User";
import { useSidebar } from "../Context/Sidebar.context";

export default function ChatSideBar() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="bg-white border-r-2 transition border-gray-200 w-80 min-h-dvh overflow-y-auto max-h-[calc(100vh-100px)]">
      {/* header */}
      <div className="p-5 border-b-2 border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Messages</h1>
          <span className="text-gray-500">3 online</span>
        </div>
        <Menu className="lg:hidden" onClick={() => toggleSidebar("chat")} />
      </div>
      {/* list of users */}
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
    </div>
  );
}
