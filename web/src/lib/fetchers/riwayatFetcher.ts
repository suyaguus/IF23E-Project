import api from "@/lib/axios";

export const riwayatFetcher = {
    // get all data untuk admin
    getAllRiwayat: async () => {
        const response = await api.get("/riwayat-pembayaran");
        return response.data;
    },

    // get data untuk user
    getRiwayatByUser: async (userId: number) => {
        const response = await api.get(`/riwayat-pembayaran/user/${userId}`);
        return response.data;
    }
};