// src/api/authApi.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { useAuthStore } from "@/store/slice";
import { User } from "@/contexts/auth/auth.types";

type LoginPayload = { username: string; password: string };

export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async ({ username, password }: LoginPayload) => {
      const { data } = await api.post("/auth/login", { username, password });
      return data;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user as User);
      sessionStorage.setItem("username", data.user.username);
    },
  });
};

export const useProfileQuery = () => {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/auth/profile");
      return data as User;
    },
    enabled: !!useAuthStore.getState().accessToken,
  });
};
