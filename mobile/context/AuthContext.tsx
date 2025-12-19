import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "expo-router";
import api from "@/services/api";
import { Alert } from "react-native";
import { Strings } from "@/constants/strings";

// interface data user
interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  notelp?: string;
}

// 2. Definisikan Tipe Data untuk Context
interface AuthContextType {
  isLoggedIn: boolean;
  userRole: "guest" | "admin" | "user";
  userData: UserData | null;
  isLoading: boolean;

  // fungsi login
  logout: () => void;
  login: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"guest" | "admin" | "user">("guest");

  // PERBAIKAN: Definisi State yang hilang sebelumnya
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Fungsi Login
  const login = async (email: string, password: string) => {
    setIsLoading(true); // Sekarang tidak error karena state sudah ada
    try {
      const response = await api.post(Strings.api_auth_login, {
        email,
        password,
      });
      const result = response.data;

      if (result.success) {
        // Ambil data user
        let user = result.data.user;

        // --- NORMALISASI ROLE DI SINI ---
        // Kita paksa role di object user menjadi huruf kecil semua
        if (user.role) {
          user.role = user.role.toLowerCase();
        }
        // --------------------------------

        setUserData(user);

        // Karena sudah dikecilkan, pengecekan jadi simpel
        const role = user.role === "admin" ? "admin" : "user";
        setUserRole(role);

        setIsLoggedIn(true);

        return user; // Kembalikan user yang role-nya sudah lowercase
      } else {
        throw new Error(result.message || "Login gagal");
      }
    } catch (error: any) {
      // ... error handling
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Logout
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole("guest");
    setUserData(null);
    // router.replace("/auth/login"); // Opsional: redirect
  };

  return (
    <AuthContext.Provider
      // Masukkan semua state dan fungsi ke dalam value provider
      value={{
        isLoggedIn,
        userRole,
        userData, // Export data user
        isLoading, // Export loading state
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
