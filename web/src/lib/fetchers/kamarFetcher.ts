import api from "@/lib/axios";
import { Kamar } from "@/types/interfaces"; 

export const kamarFetcher = {
    // get all data
    getAllKamar: async () => {
        const response = await api.get("/kamar");
        return response.data;
    },

    // get data by id
    getKamarById: async (id: number) => {
        const response = await api.get(`/kamar/${id}`);
        return response.data;
    },

    // create data
    createKamar: async (data: Omit<Kamar, 'id' | 'orders' | 'fasilitas' | 'perabotan' | 'riwayatPembayaran'>) => {
        const response = await api.post("/kamar", data);
        return response.data;
    },

    // update data
    updateKamar: async (id: number, data: Partial<Kamar>) => {
        const response = await api.put(`/kamar/${id}`, data);
        return response.data;
    },

    // delete data
    deleteKamar: async (id: number) => {
        const response = await api.delete(`/kamar/${id}`);
        return response.data;
    }
}