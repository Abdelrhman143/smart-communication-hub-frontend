// Socket context - Manages Socket.IO connection, online users list, and real-time messaging
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./Auth.context";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
  isUserOnline: (id: number | string) => boolean;
};

const URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

const SocketContext = createContext<SocketContextType | undefined>(undefined);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const { userId, token, isLoading } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Check if specific user is online
  const isUserOnline = (id: number | string): boolean => {
    const idString = String(id);

    return onlineUsers.includes(idString);
  };

  // Initialize Socket.IO connection when user is authenticated
  useEffect(() => {
    if (isLoading || !userId || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const newSocket = io(URL);

    // Send userId to server on connection
    newSocket.on("connect", () => {
      setIsConnected(true);

      newSocket.emit("send_userId", userId);
    });

    // Update online users list when server sends update
    newSocket.on("update_online_users", (userIds: string[]) => {
      setOnlineUsers(userIds);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket.IO Disconnected.");
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [userId, token, isLoading]);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, onlineUsers, isUserOnline }}
    >
      {children}
    </SocketContext.Provider>
  );
}

function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within an SocketProvider");
  }
  return context;
}

export { useSocket, SocketProvider };
