import useSWR from 'swr';
import { perabotanFetcher } from "@/lib/fetchers/perabotanFetcher";
import { Perabotan } from '@/types/interfaces';

interface PerabotanResponse {
  data: Perabotan[];
  message?: string;
  success?: boolean;
}

interface PerabotanDetailResponse {
  data: Perabotan;
}

export function usePerabotan() {
  const { data, error, isLoading, mutate } = useSWR<PerabotanResponse>(
    "/perabotan",
    perabotanFetcher.getAllPerabotan
  );

  return {
    data: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function usePerabotanDetail(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<PerabotanDetailResponse>(
    id ? `/perabotan/${id}` : null,
    () => perabotanFetcher.getPerabotanById(Number(id))
  );

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}