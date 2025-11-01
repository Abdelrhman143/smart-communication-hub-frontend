// Chat page - Displays chat interface for specific user conversation (dynamic route with user ID)
import Chat from "@/app/_components/Chat";

export default function page() {
  return (
    <div className="flex-1 flex-col flex ">
      <Chat />
    </div>
  );
}
