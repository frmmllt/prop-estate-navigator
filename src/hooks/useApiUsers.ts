
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export function useApiUser(userId: string | undefined) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}
