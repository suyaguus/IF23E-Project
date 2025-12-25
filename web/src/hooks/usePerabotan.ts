import useSWR from 'swr';
import { fetcher } from "@/utils/fetcher"; 
import { Perabotan } from '@/types/interfaces';

interface PerabotanResponse {
    perabotan: Perabotan[];
}

interface PerabotanDetailResponse {
  perabotan: Perabotan; 
}

export function usePerabotan() {
    const { data, error, isLoading, mutate } = useSWR<PerabotanResponse>("/perabotan", fetcher);

    return {
        data: data?.perabotan || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function usePerabotanDetail(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<PerabotanDetailResponse>(
    id ? `/perabotan/${id}` : null,
    fetcher
  );
  return {
    data: data?.perabotan,
    isLoading,
    isError: error,
    mutate,
  };
}