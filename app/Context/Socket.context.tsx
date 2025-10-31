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

  const isUserOnline = (id: number | string): boolean => {
    const idString = String(id);

    return onlineUsers.includes(idString);
  };

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

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket.IO Connected!");
      newSocket.emit("send_userId", userId);
    });

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
