// services/kamarService.ts
import api from "./api"; // Pastikan path ini sesuai dengan lokasi api.ts Anda
import { Strings } from "@/constants/strings"; // Mengambil URL dari constants
import { KamarInput } from "@/types/interfaces";

export const kamarService = {
  // 1. GET ALL: Ambil semua data kamar
  getAll: async () => {
    try {
      const response = await api.get(Strings.api_kamar);
      // Sesuaikan 'response.data.data' dengan struktur JSON backend Anda
      return response.data.data; 
    } catch (error) {
      throw error;
    }
  },

  // 2. GET BY ID: Ambil detail 1 kamar
  getById: async (id: number) => {
    try {
      const response = await api.get(`${Strings.api_kamar}/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // 3. CREATE: Tambah kamar baru
  create: async (data: KamarInput) => {
    try {
      const response = await api.post(Strings.api_kamar, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 4. UPDATE: Edit data kamar
  update: async (id: number, data: KamarInput) => {
    try {
      const response = await api.put(`${Strings.api_kamar}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 5. DELETE: Hapus kamar
  delete: async (id: number) => {
    try {
      const response = await api.delete(`${Strings.api_kamar}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};