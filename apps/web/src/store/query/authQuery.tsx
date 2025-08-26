import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/slice";
import { User } from "@/contexts/auth/auth.types";
import { getUserProfileApi, loginApi } from "../api/authApi";
import { queryKeys } from "./queryKeys";

type LoginPayload = { username: string; password: string };

export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens);

  return useMutation({
    mutationFn: async ({ username, password }: LoginPayload) => {
      const data = await loginApi({ email: username, password }) as unknown as {
        accessToken: string;
        refreshToken: string
      };
      return data;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
    },
  });
};

export const useProfile = () => {
  const { setUser } = useAuthStore();
  return useQuery<User>({
    queryKey: [queryKeys.profile],
    queryFn: async () => {
      const { data } = await getUserProfileApi() as unknown as { data: User };
      setUser(data);
      return data as User;
    },
    enabled: !!useAuthStore.getState().accessToken,
  });
};
