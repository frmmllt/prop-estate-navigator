
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/api/api";
import { LetterTemplate } from "@/types/templates";

export function useApiTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: async (): Promise<LetterTemplate[]> => {
      const { data } = await api.get("/templates");
      return data;
    }
  });
}

export function useCreateTemplate() {
  return useMutation({
    mutationFn: async (payload: Partial<LetterTemplate>) => {
      const { data } = await api.post("/templates", payload);
      return data;
    }
  });
}
