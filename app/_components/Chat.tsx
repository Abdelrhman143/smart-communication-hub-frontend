// Chat component - Main chat interface with messages, real-time updates via Socket.IO, and message input
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
import { fetchUsers } from "@/lib/services/user.service";
import { Users } from "./UsersList";

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
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  // Load messages when user or conversation changes
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

  // Fetch selected user's name
  useEffect(() => {
    if (token && selectedUserId) {
      const loadSelectedUserName = async () => {
        try {
          const usersList = await fetchUsers(token);
          const selectedUser = usersList.find(
            (user: Users) => user.id === Number(selectedUserId)
          );
          if (selectedUser) {
            setSelectedUserName(selectedUser.name);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.log(error);
          }
        }
      };
      loadSelectedUserName();
    }
  }, [token, selectedUserId]);

  // Listen for real-time messages via Socket.IO
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

  // Send message through Socket.IO
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
      <ChatHeader selectedUserName={selectedUserName} />
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
