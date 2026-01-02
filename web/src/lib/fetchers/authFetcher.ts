import { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("API_BASE_URL tidak ditemukan. Pastikan file .env sudah benar dan server direstart.");
}

export const authFetcher = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateProfile: async (data: { email: string; username?: string; notelp?: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (data: { email: string; currentPassword: string; newPassword: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
};

async function handleResponse(response: Response) {
  const text = await response.text();
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
    const errorMessage =
      data.message ||
      data.error ||
      data.msg ||
      `Request gagal (${response.status}): ${response.statusText}`;

    throw new Error(errorMessage);
  }
  return data;
}