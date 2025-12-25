import useSWR from 'swr';
import { fetcher } from "@/utils/fetcher";
import { RiwayatPembayaran } from '@/types/interfaces';

interface RiwayatResponse {
    riwayat: RiwayatPembayaran[];
}

// hook riwayat admin
export function useRiwayat() {
    const { data, error, isLoading, mutate } = useSWR<RiwayatResponse>("/riwayat-pembayaran", fetcher);
    return {
        data: data?.riwayat || [],
        isLoading,
        isError: error,
        mutate,
    };
}

// hook riwayat user
export function useMyRiwayat(userId: number | null) {
    const { data, error, isLoading, mutate } = useSWR<RiwayatResponse>(
        userId ? `/riwayat-pembayaran/user/${userId}` : null,
        fetcher
    );

    return {
        data: data?.riwayat || [],
        isLoading,
        isError: error,
        mutate,
    };
}