import api from "./api";
import { Strings } from "@/constants/strings";
import { PerabotanInput } from "@/types/interfaces";

export const perabotanService = {
  // Ambil semua perabotan
  getAll: async () => {
    try {
      const response = await api.get(Strings.api_perabotan);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Ambil detail perabotan by ID
  getById: async (id: number) => {
    try {
      const response = await api.get(`${Strings.api_perabotan}/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Tambah perabotan
  create: async (data: PerabotanInput) => {
    try {
      const response = await api.post(Strings.api_perabotan, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update perabotan
  update: async (id: number, data: PerabotanInput) => {
    try {
      const response = await api.put(`${Strings.api_perabotan}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Hapus perabotan
  delete: async (id: number) => {
    try {
      const response = await api.delete(`${Strings.api_perabotan}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};