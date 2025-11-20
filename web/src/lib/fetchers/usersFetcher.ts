import { api } from "@/lib/api";
import { User } from "@/types/user";

export const usersFetcher = (url: string): Promise<User[]> =>
    api.get(url).then(res => res.data.users);