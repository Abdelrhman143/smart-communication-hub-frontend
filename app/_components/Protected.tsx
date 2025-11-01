"use client";
import { useEffect } from "react";
import { useAuth } from "../Context/Auth.context";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

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
    return <LoadingSpinner />;
  }
  if (token) {
    return <>{children}</>;
  }
  return null;
}
