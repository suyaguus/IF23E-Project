import useSWR from 'swr';
import { fetcher } from "@/utils/fetcher";
import { Order } from '@/types/interfaces';

interface OrdersResponse {
    orders: Order[];
}

interface OrderDetailResponse {
    order: Order;
}

// hook untuk admin
export function useOrders() {
    const { data, error, isLoading, mutate } = useSWR<OrdersResponse>("/orders", fetcher);
    return {
        data: data?.orders || [],
        isLoading,
        isError: error,
        mutate,
    };
}

// hook untuk user
export function useMyOrders(userId: number | null) {
    const { data, error, isLoading, mutate } = useSWR<OrdersResponse>(
        userId ? `/orders/user/${userId}` : null,
        fetcher
    );
    return {
        data: data?.orders || [], 
        isLoading,
        isError: error,
        mutate,
    };
}

// hook untuk detail order
export function useOrderDetail(id: number | null) {
    const { data, error, isLoading, mutate } = useSWR<OrderDetailResponse>(
        id ? `/orders/${id}` : null,
        fetcher
    );
    return {
        data: data?.order,
        isLoading,
        isError: error,
        mutate,
    };
}