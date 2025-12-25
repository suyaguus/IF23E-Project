// src/lib/fetchers/authFetcher.ts

import { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const authFetcher = {
  // ... (login dan register yang sudah ada biarkan saja) ...
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // ... code login lama ...
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return response.json();
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
     // ... code register lama ...
     const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
  },

  // --- TAMBAHAN BARU ---
  
  // 1. Update Profile (Username, No Telp, dll)
  updateProfile: async (userId: number, data: { username: string; notelp: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, { // Sesuaikan endpoint backend
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // 2. Ganti Password
  changePassword: async (data: { userId: number; currentPassword: string; newPassword: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST", // Biasanya POST atau PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};