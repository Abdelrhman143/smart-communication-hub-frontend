import { Message } from "./Chat";
import LoadingSpinner from "./LoadingSpinner";
import MessageBox from "./MessageBox";

type MessagesProps = {
  messages: Message[];
  isLoading: boolean;
  currentUserId: number | null;
};

export default function Messages({
  messages,
  currentUserId,
  isLoading,
}: MessagesProps) {
  console.log(messages);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-MainColor rounded-full animate-spin"></div>
      </div>
    );
  }
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">ابدأ محادثتك!</h3>
        <p>لا توجد رسائل سابقة. كن أنت أول من يرسل رسالة.</p>
      </div>
    );
  }
  return (
    <div className="p-5 space-y-6 overflow-y-auto">
      {messages.map((message) => (
        <MessageBox
          key={message.id}
          message={message.text}
          timestamp={message.timestamp}
          isSent={message.senderId === currentUserId}
        />
      ))}
    </div>
  );
}
