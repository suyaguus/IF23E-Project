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
}

// definisi tipe context
interface AuthContextType {
  isLoggedIn: boolean;
  userRole: "guest" | "admin" | "user";
  userData: UserData | null;
  isLoading: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"guest" | "admin" | "user">("guest");

  // State Data User
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi Login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post(Strings.api_auth_login, {
        email,
        password,
      });
      const result = response.data;

      if (result.success) {
        let user = result.data.user;

        if (user.role) {
          user.role = user.role.toLowerCase();
        }

        setUserData(user);
        const role = user.role === "admin" ? "admin" : "user";
        setUserRole(role);
        setIsLoggedIn(true);

        return user;
      } else {
        throw new Error(result.message || "Login gagal");
      }
    } catch (error: any) {
      console.error("Login Error Full:", error);
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
