import useSWR from 'swr';
import { fetcher } from "@/utils/fetcher";
import { User } from '@/types/interfaces';

interface UserResponse {
  user: User[]; 
}

interface UserDetailResponse {
  user: User; 
}

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<UserResponse>("/user", fetcher);

  return {
    data: data?.user,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useUserDetail(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<UserDetailResponse>(
    id ? `/user/${id}` : null, 
    fetcher
  );
  return {
    data: data?.user, 
    isLoading,
    isError: error,
    mutate,
  };
}