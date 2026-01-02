import useSWR from 'swr';
import { fetcher } from "@/utils/fetcher";
import { Kamar } from '@/types/interfaces';

interface KamarResponse {
    kamar: Kamar[];
}

export function useKamar() {
    const { data, error, isLoading, mutate } = useSWR<KamarResponse>("/kamar", fetcher);

    return {
        data: data?.kamar || [],
        isLoading,
        isError: error,
        mutate,
    };
}

interface KamarDetailResponse {
    kamar: Kamar;
}

export function useKamarDetail(id: number | null) {
    const { data, error, isLoading, mutate } = useSWR<KamarDetailResponse>(
        id ? `/kamar/${id}` : null,
        fetcher
    );
    return {
        data: data?.kamar,
        isLoading,
        isError: error,
        mutate,
    };
}