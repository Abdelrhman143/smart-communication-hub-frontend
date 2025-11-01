"use client";
import { useParams } from "next/navigation";
import { useSidebar } from "../Context/Sidebar.context";
import ChatHeader from "./ChatHeader";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/Auth.context";
import { useSocket } from "../Context/Socket.context";
import { fetchMessages } from "@/lib/services/message.service";

export type Message = {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  timestamp: string;
};

export default function Chat() {
  const { isSidebarOpen } = useSidebar();
  const [messages, setMessages] = useState<Message[]>([]);
  const { token, userId: currentUserId } = useAuth();
  const { socket } = useSocket();
  const params = useParams();
  const selectedUserId = params.id;
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  useEffect(() => {
    if (token && selectedUserId) {
      const LoadedMessages = async () => {
        try {
          const messagesList = await fetchMessages(
            token,
            Number(selectedUserId)
          );

          setMessages(messagesList.messages);
        } catch (error) {
          if (error instanceof Error) {
            console.log(error);
          }
        } finally {
          setIsMessagesLoading(false);
        }
      };
      LoadedMessages();
    }
  }, [token, selectedUserId]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  function handleSendMessage(newMessage: string) {
    console.log("message after sent to parent", newMessage);
    if (!socket || !selectedUserId) return;
    socket.emit("send_message", {
      messageContent: newMessage,
      receiverId: selectedUserId,
    });
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div className="flex flex-col justify-between h-full overflow-y-auto">
        <Messages
          messages={messages}
          currentUserId={currentUserId}
          isLoading={isMessagesLoading}
        />
        {isSidebarOpen && (
          <div className="absolute inset-0 bg-background/80 z-10 lg:hidden"></div>
        )}
        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
