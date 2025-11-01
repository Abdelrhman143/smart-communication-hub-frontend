// Protected route wrapper - Redirects unauthenticated users to home, shows loading during auth check
"use client";
import { useEffect } from "react";
import { useAuth } from "../Context/Auth.context";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

// Wraps protected routes - checks authentication and redirects if not logged in
export default function Protected({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to home if not authenticated
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
