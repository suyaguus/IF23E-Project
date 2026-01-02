import api from "@/lib/axios";
import { Fasilitas } from "@/types/interfaces"; 

export const fasilitasFetcher = {
    // get all data
    getAllFasilitas: async () => {
        const response = await api.get("/fasilitas");
        return response.data;
    },

    // get data by id
    getFasilitasById: async (id: number) => {
        const response = await api.get(`/fasilitas/${id}`);
        return response.data;
    },

    // create data
    createFasilitas: async (data: Omit<Fasilitas, 'id' | 'kamar'>) => {
        const response = await api.post("/fasilitas", data);
        return response.data;
    },

    // update data
    updateFasilitas: async (id: number, data: Partial<Fasilitas>) => {
        const response = await api.put(`/fasilitas/${id}`, data);
        return response.data;
    },

    // delete data
    deleteFasilitas: async (id: number) => {
        const response = await api.delete(`/fasilitas/${id}`);
        return response.data;
    }
}