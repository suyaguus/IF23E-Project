import api from "@/lib/axios";
import { User } from "@/types/interfaces"; 
import { RegisterRequest } from "@/types/auth"; 

export const userFetcher = {

    // get all data
    getAllUsers: async () => {
        const response = await api.get("/user");
        return response.data;
    },

    // get data by id
    getUserById: async (id: number) => {
        const response = await api.get(`/user/${id}`);
        return response.data;
    },

    // create data
    createUser: async (data: RegisterRequest) => {
        const response = await api.post("/user", data);
        return response.data;
    },

    // update data
    updateUser: async (id: number, data: Partial<User>) => {
        const response = await api.put(`/user/${id}`, data);
        return response.data;
    },

    // delete data
    deleteUser: async (id: number) => {
        const response = await api.delete(`/user/${id}`);
        return response.data;
    }
};