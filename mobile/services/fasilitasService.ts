import api from "./api";
import { Strings } from "@/constants/strings";
import { FasilitasInput } from "@/types/interfaces";

export const fasilitasService = {
  // Ambil semua fasilitas
  getAll: async () => {
    try {
      const response = await api.get(Strings.api_fasilitas);
      return response.data.fasilitas; 
    } catch (error) {
      throw error;
    }
  },

  // Ambil detail fasilitas by ID
  getById: async (id: number) => {
    try {
      const response = await api.get(`${Strings.api_fasilitas}/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Tambah fasilitas baru
  create: async (data: FasilitasInput) => {
    try {
      const response = await api.post(Strings.api_fasilitas, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Edit fasilitas
  update: async (id: number, data: FasilitasInput) => {
    try {
      const response = await api.put(`${Strings.api_fasilitas}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Hapus fasilitas
  delete: async (id: number) => {
    try {
      const response = await api.delete(`${Strings.api_fasilitas}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};