import { MessageCircleMore } from "lucide-react";

export default function Feature() {
  return (
    <div className="bg-white p-5 border-2 shadow-lg rounded-2xl  border-gray-50 hover:border-MainColor transition">
      <MessageCircleMore className="stroke-MainColor" />
      <h3 className="mt-2 font-semibold text-xl">Real-Time Chat</h3>
      <p className="mt-3 text-gray-500 max-w-65">
        Instant messaging with a beautiful, responsive interface that works
        seamlessly across all devices.
      </p>
    </div>
  );
}
