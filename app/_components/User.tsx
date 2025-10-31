"use client";
import { useEffect, useState } from "react";
import { useSidebar } from "../Context/Sidebar.context";
import { Users } from "./UsersList";
import { useParams } from "next/navigation";
import { fetchMessages } from "@/lib/services/message.service";
import { Message } from "react-hook-form";
import { useSocket } from "../Context/Socket.context";

export default function User({ user }: { user: Users }) {
  const parms = useParams();
  const activeUserId = parms.id ? Number(parms.id) : undefined;
  const [messages, setMessages] = useState<Message[]>([]);
  const { closeSidebar } = useSidebar();

  const { isUserOnline } = useSocket();
  const isActive = isUserOnline(user.id);

  return (
    <div
      onClick={() => closeSidebar()}
      className={`p-5 flex items-center justify-between hover:bg-gray-100 transition ${
        activeUserId === user.id ? "bg-gray-200 pointer-events-none" : ""
      }`}
    >
      <div className="flex gap-5">
        <div className="bg-MainColor text-white p-3 size-12 text-center rounded-full relative">
          {user.name.slice(0, 2)}
          {isActive && (
            <div className="absolute bg-green-500 size-3 right-0 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <h3>{user.name}</h3>
        </div>
      </div>
    </div>
  );
}
