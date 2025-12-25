"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. PERBAIKAN: Cek KEDUA Storage saat aplikasi dimuat
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Cek Session Storage dulu (Prioritas)
      let storedData = sessionStorage.getItem("user");

      // Jika di Session kosong, cek Local Storage (Fallback)
      if (!storedData) {
        storedData = localStorage.getItem("user");
      }

      if (storedData) {
        try {
          // Parse data
          const parsedUser = JSON.parse(storedData);
          setUser(parsedUser); // Update State React

          // Opsional: Jika data ditemukan di LocalStorage, pindahkan ke SessionStorage
          // agar sesuai keinginanmu (hapus saat browser tutup)
          if (!sessionStorage.getItem("user")) {
            sessionStorage.setItem("user", storedData);
            // localStorage.removeItem("user"); // Uncomment jika ingin auto-bersih
          }
        } catch (error) {
          console.error("Gagal parsing user:", error);
          sessionStorage.removeItem("user");
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. LOGIN: Simpan ke Session Storage (Sesuai Request)
  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));

    // Pastikan local storage bersih agar tidak bingung
    localStorage.removeItem("user");

    router.push("/dashboard");
  };

  // 3. LOGOUT: Bersihkan Semuanya
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
