
import { useMutation } from "@tanstack/react-query";
-import api from "@/api/api";
+import { mockLogin } from "@/api/mockAuth";

type LoginInput = { email: string; password: string };
type LoginResponse = { token: string; user: any };

export function useApiLogin() {
  return useMutation({
-    mutationFn: async ({ email, password }: LoginInput): Promise<LoginResponse> => {
-      const { data } = await api.post("/auth/login", { email, password });
-      // Store JWT if needed
-      if (data.token) localStorage.setItem("jwtToken", data.token);
-      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
-      return data;
-    }
+    mutationFn: async ({ email, password }: LoginInput): Promise<LoginResponse> => {
+      const result = await mockLogin(email, password);
+      if (!result.success) {
+        throw { response: { data: { message: result.error || "Échec de la connexion" } } };
+      }
+      // Store JWT if needed
+      if (result.token) localStorage.setItem("jwtToken", result.token);
+      if (result.user) localStorage.setItem("user", JSON.stringify(result.user));
+      return { token: result.token, user: result.user };
+    }
  });
}
