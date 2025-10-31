"use client";
import { useEffect, useState } from "react";
import User from "./User";
import { fetchUsers } from "@/lib/services/user.service";
import { useAuth } from "../Context/Auth.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SmallSpinner from "./SmallSpinner";
import { useSocket } from "../Context/Socket.context";

export type Users = {
  id: number;
  name: string;
  email: string;
};

export default function UsersList() {
  const { token } = useAuth();

  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const loadedUsers = async () => {
        setIsLoading(true);
        try {
          const userList = await fetchUsers(token);
          setUsers(userList);
          if (
            userList.length > 0 &&
            window.location.pathname === "/dashboard"
          ) {
            router.push(`/dashboard/${userList[0].id}`);
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
      loadedUsers();
    }
  }, [token]);

  if (isLoading) {
    return <SmallSpinner />;
  }

  return (
    <div>
      {users.map((user) => (
        <Link key={user.id} href={`/dashboard/${user.id}`}>
          <User user={user} />
        </Link>
      ))}
    </div>
  );
}
