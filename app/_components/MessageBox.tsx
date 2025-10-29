type ChatMessageProps = {
  message: string;
  timestamp: string;
  isSent: boolean;
};

export default function MessageBox({
  message,
  timestamp,
  isSent,
}: ChatMessageProps) {
  return (
    <div className={`flex gap-2 mb-4 ${isSent ? "flex-row-reverse" : ""}`}>
      <div
        className={` max-w-[40%] p-3 text-sm rounded-2xl ${
          isSent ? "bg-MainColor text-white" : "bg-gray-200"
        }`}
      >
        <p className="mb-1">{message}</p>
        <span
          className={` text-xs ${isSent ? "text-gray-300" : "text-gray-500"} `}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
}
