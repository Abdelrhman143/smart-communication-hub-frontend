import { useSidebar } from "../Context/Sidebar.context";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

export default function Chat() {
  const { isSidebarOpen } = useSidebar();
  return (
    <div>
      <ChatHeader />
      <Messages />
      {isSidebarOpen && (
        <div className="absolute inset-0 bg-background/80 z-10 lg:hidden"></div>
      )}
    </div>
  );
}
