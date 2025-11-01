"use client";
import { getMeService } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";

import { createContext, useContext, useEffect, useState } from "react";

type valuesType = {
  token: string | null;
  userId: number | null;
  name: string | null;
  login: (token: string, userId: number, name: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<valuesType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  function logout() {
    setToken(null);
    setName(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    router.push("/");
  }
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    const checkAuthStatus = async () => {
      try {
        const userData = await getMeService(storedToken);
        setToken(storedToken);

        setUserId(parseInt(userData.id));
        setName(userData.name);
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  function login(token: string, userId: number, name: string) {
    setToken(token);
    setUserId(userId);
    setName(name);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("name", name);

    router.push("/dashboard");
  }

  return (
    <AuthContext.Provider
      value={{ token, userId, name, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth, AuthProvider };
