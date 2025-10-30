"use client";
import { useEffect } from "react";
import { useAuth } from "../Context/Auth.context";
import { useRouter } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!token) {
      router.push("/");
    }
  }, [isLoading, router, token]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-5xl">
        we are champion
      </div>
    );
  }
  if (token) {
    return <>{children}</>;
  }
  return null;
}
