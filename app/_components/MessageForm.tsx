import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function MessageForm() {
  return (
    <div className="p-4 bg-white">
      <div className="flex gap-2">
        <Input type="text" placeholder="Type your message.." />
        <Button className="bg-MainColor hover:bg-MainColor/95 cursor-pointer">
          <Send />
        </Button>
      </div>
    </div>
  );
}
