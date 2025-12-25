import api from "@/lib/axios";
import { Perabotan } from "@/types/interfaces"; 

export const perabotanFetcher = {
    // get all data
    getAllPerabotan: async () => {
        const response = await api.get("/perabotan");
        return response.data;
    },

    // get data by id
    getPerabotanById: async (id: number) => {
        const response = await api.get(`/perabotan/${id}`);
        return response.data;
    },

    // create data
    createPerabotan: async (data: Omit<Perabotan, 'id' | 'kamar'>) => {
        const response = await api.post("/perabotan", data);
        return response.data;
    },

    // update data
    updatePerabotan: async (id: number, data: Partial<Perabotan>) => {
        const response = await api.put(`/perabotan/${id}`, data);
        return response.data;
    },

    // delete data
    deletePerabotan: async (id: number) => {
        const response = await api.delete(`/perabotan/${id}`);
        return response.data;
    },
}