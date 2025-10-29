import { Menu, Sparkles } from "lucide-react";
import { useSidebar } from "../Context/Sidebar.context";

export default function ChatHeader() {
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  return (
    <div className="p-5 flex items-center gap-5 bg-white">
      {!isSidebarOpen && (
        <Menu className=" lg:hidden" onClick={() => toggleSidebar("chat")} />
      )}
      <div className="bg-MainColor text-white p-3 size-12 text-center rounded-full relative">
        AT
      </div>
      <div>
        <h3 className="font-semibold">Abdelrahman Tharwat</h3>
        <p className="text-gray-500">active Now</p>
      </div>

      <Sparkles
        className=" ml-auto animate-bounce lg:hidden"
        onClick={() => toggleSidebar("ai")}
      />
    </div>
  );
}
