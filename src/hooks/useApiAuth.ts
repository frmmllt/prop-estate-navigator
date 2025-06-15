
import { useMutation } from "@tanstack/react-query";
import { mockLogin } from "@/api/mockAuth";

type LoginInput = { email: string; password: string };
type LoginResponse = { token: string; user: any };

export function useApiLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: LoginInput): Promise<LoginResponse> => {
      const result = await mockLogin(email, password);
      if (!result.success) {
        throw { response: { data: { message: result.error || "Échec de la connexion" } } };
      }
      if (result.token) localStorage.setItem("jwtToken", result.token);
      if (result.user) localStorage.setItem("user", JSON.stringify(result.user));
      return { token: result.token, user: result.user };
    }
  });
}
