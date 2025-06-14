
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { Property } from "@/types/property";

export function useApiProperties(filters?: any) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async (): Promise<Property[]> => {
      const { data } = await api.get("/properties", { params: filters });
      return data;
    }
  });
}

export function useApiProperty(id: string | undefined) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async (): Promise<Property> => {
      const { data } = await api.get(`/properties/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
