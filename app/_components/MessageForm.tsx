import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

export default function MessageForm({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim()) {
      console.log("message before sent to parent component", message);
      onSendMessage(message);
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white">
      <div className="flex gap-2">
        <Input
          type="text"
          value={message}
          placeholder="Type your message.."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-MainColor hover:bg-MainColor/95 cursor-pointer"
        >
          <Send />
        </Button>
      </div>
    </form>
  );
}
