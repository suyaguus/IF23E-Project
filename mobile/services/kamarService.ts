import api from "./api";
import { Strings } from "@/constants/strings";
import { KamarInput } from "@/types/interfaces";

export const kamarService = {
    // get all kamar
    getAll: async () => {
        try {
            const response = await api.get(Strings.api_kamar);

            // ambil data kamar dengan penyesuaian format respons
            if (response.data.kamar) {
                return response.data.kamar;
            }

            // ambil dari properti data jika ada
            if (response.data.data) {
                return response.data.data;
            }

            // ambil dari properti data jika ada
            if (Array.isArray(response.data)) {
                return response.data;
            }
            return [];
        } catch (error) {
            throw error;
        }
    },

    // get kamar by ID
    getById: async (id: number) => {
        try {
            const response = await api.get(`${Strings.api_kamar}/${id}`);

            // Penyesuaian serupa untuk detail
            if (response.data.kamar) return response.data.kamar;
            if (response.data.data) return response.data.data;
            return response.data;
        } catch (error) {
            console.error("[KamarService] Error getById:", error);
            throw error;
        }
    },

    // buat kamar
    create: async (data: KamarInput) => {
        try {
            const response = await api.post(Strings.api_kamar, data);
            return response.data;
        } catch (error) {
            console.error("[KamarService] Error create:", error);
            throw error;
        }
    },

    // update kamar
    update: async (id: number, data: KamarInput) => {
        try {
            const response = await api.put(`${Strings.api_kamar}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("[KamarService] Error update:", error);
            throw error;
        }
    },

    // delete kamar
    delete: async (id: number) => {
        try {
            const response = await api.delete(`${Strings.api_kamar}/${id}`);
            return response.data;
        } catch (error) {
            console.error("[KamarService] Error delete:", error);
            throw error;
        }
    },
};