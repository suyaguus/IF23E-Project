import useSWR from 'swr';
import { fetcher } from "@/utils/fetcher"; 
import { Fasilitas } from '@/types/interfaces';

interface FasilitasResponse {
    fasilitas: Fasilitas[];
}

interface FasilitasDetailResponse {
  fasilitas: Fasilitas; 
}

export function useFasilitas() {
    const { data, error, isLoading, mutate } = useSWR<FasilitasResponse>("/fasilitas", fetcher);

    return {
        data: data?.fasilitas || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useFasilitasDetail(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<FasilitasDetailResponse>(
    id ? `/fasilitas/${id}` : null,
    fetcher
  );
  return {
    data: data?.fasilitas,
    isLoading,
    isError: error,
    mutate,
  };
}