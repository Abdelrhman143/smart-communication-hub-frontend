import Chat from "@/app/_components/Chat";
import MessageForm from "@/app/_components/MessageForm";

export default function page() {
  return (
    <div className="flex-1 flex-col flex justify-between">
      <Chat />
      <MessageForm />
    </div>
  );
}
