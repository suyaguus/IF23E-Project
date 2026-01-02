// src/lib/fetchers/authFetcher.ts

import { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Cek safety: jika env belum diload, beri peringatan di console
if (!API_BASE_URL) {
  console.error("API_BASE_URL tidak ditemukan. Pastikan file .env sudah benar dan server direstart.");
}

export const authFetcher = {
  // --- LOGIN ---
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // --- REGISTER ---
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // --- UPDATE PROFILE ---
  updateProfile: async (data: { email: string; username?: string; notelp?: string }) => {
    try {
      // PERHATIKAN URL INI: /user/profile
      // Kata "profile" disini akan masuk sebagai [slug], 
      // sehingga file src/app/api/user/[slug]/route.ts akan terpanggil.
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Kita kirim { email, username, notelp }
      });

      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // --- CHANGE PASSWORD ---
  changePassword: async (data: { email: string; currentPassword: string; newPassword: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Mengirim { email, currentPassword, newPassword }
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
};

// --- HELPER UNTUK MENGATASI ERROR JSON ---
// Fungsi ini mencegah error "Unexpected end of JSON input"
async function handleResponse(response: Response) {
  const text = await response.text();

  // LOG DEBUG: Lihat apa yang sebenarnya dikirim server
  console.log(`[API DEBUG] ${response.url} | Status: ${response.status}`);
  console.log(`[API DEBUG] Response Body:`, text);

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("Gagal parsing JSON. Raw text:", text);
    throw new Error("Format respon server bukan JSON valid.");
  }

  if (!response.ok) {
    // Coba ambil pesan error dari berbagai kemungkinan format
    const errorMessage =
      data.message ||
      data.error ||
      data.msg ||
      `Request gagal (${response.status}): ${response.statusText}`;

    throw new Error(errorMessage);
  }

  return data;
}