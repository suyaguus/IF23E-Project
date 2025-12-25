import api from "@/lib/axios";
import { Order } from "@/types/interfaces";

export interface CreateOrderPayload {
    userId: number;
    kamarId: number;
    tanggalCheckin: Date | string;
    tanggalCheckout: Date | string;
    totalHarga: number;
    metodePembayaran: string;
    catatanUser?: string;
}

export const orderFetcher = {
    // get all data
    getAllOrders: async () => {
        const response = await api.get("/orders");
        return response.data;
    },

    // get orders by user
    getOrdersByUser: async (userId: number) => {
        const response = await api.get(`/orders/user/${userId}`);
        return response.data;
    },

    // get order detail
    getOrderById: async (id: number) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // create order
    createOrder: async (data: CreateOrderPayload) => {
        const response = await api.post("/orders", data);
        return response.data;
    },

    // update order
    updateOrder: async (id: number, data: Partial<Order>) => {
        const response = await api.put(`/orders/${id}`, data);
        return response.data;
    },

    // delete order
    deleteOrder: async (id: number) => {
        const response = await api.delete(`/orders/${id}`);
        return response.data;
    }
};