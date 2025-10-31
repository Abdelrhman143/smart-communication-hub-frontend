"use client";
import { use, useEffect, useState } from "react";
import User from "./User";
import { fetchUsers } from "@/lib/services/user.service";
import { useAuth } from "../Context/Auth.context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type Users = {
  id: number;
  name: string;
  email: string;
};

export default function UsersList() {
  const { token } = useAuth();
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const loadedUsers = async () => {
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
        }
      };
      loadedUsers();
    }
  }, [token]);

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
