
import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

type LoginInput = { email: string; password: string };
type LoginResponse = { token: string; user: any };

export function useApiLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: LoginInput): Promise<LoginResponse> => {
      const { data } = await api.post("/auth/login", { email, password });
      // Store JWT if needed
      if (data.token) localStorage.setItem("jwtToken", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    }
  });
}
