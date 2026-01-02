"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedData = sessionStorage.getItem("user");

      if (!storedData) {
        storedData = localStorage.getItem("user");
      }

      if (storedData) {
        try {
          const parsedUser = JSON.parse(storedData);
          setUser(parsedUser);

          if (!sessionStorage.getItem("user")) {
            sessionStorage.setItem("user", storedData);
          }
        } catch (error) {
          console.error("Gagal parsing user:", error);
          sessionStorage.removeItem("user");
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("user");
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
