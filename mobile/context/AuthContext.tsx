import React, { createContext, useContext, useState, ReactNode } from "react";
import api from "@/services/api";
import { Strings } from "@/constants/strings";

// interface data user
interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  notelp?: string;
  imageUrl?: string;
  createdAt?: string;
}

// definisi tipe context
interface AuthContextType {
  isLoggedIn: boolean;
  userRole: "guest" | "admin" | "user";
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  isLoading: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<UserData>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"guest" | "admin" | "user">("guest");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setIsLoggedIn(false);
    setUserData(null);
    setUserRole("guest");

    try {
      const response = await api.post(Strings.api_auth_login, {
        email,
        password,
      });

      if (response.data.success) {
        const user = response.data.data.user;
        if (user.role) user.role = user.role.toLowerCase();

        setUserData(user);
        setUserRole(user.role === "admin" ? "admin" : "user");
        setIsLoggedIn(true);
        return user;
      } else {
        throw new Error(response.data.message || "Login gagal");
      }
    } catch (error: any) {
      console.error("AuthContext Login Error:", error);

      // RESET DI SINI SAJA
      setIsLoggedIn(false);
      setUserData(null);
      setUserRole("guest");

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUserData(null);
    setUserRole("guest");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userData,
        setUserData,
        isLoading,
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
