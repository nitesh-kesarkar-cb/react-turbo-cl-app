import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { loginApi, getUserProfileApi } from "@/store/api";
import { setTokens, setUser } from "@/store/slice";
import { User } from "@/contexts/auth/auth.types";
import { queryKeys } from "./queryKeys";

type LoginPayload = { username: string; password: string };

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ username, password }: LoginPayload) => {
      const data = (await loginApi({ email: username, password })) as {
        accessToken: string;
        refreshToken: string;
      };
      return data;
    },
    onSuccess: (data) => {
      dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
    },
  });
};

export const useProfile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery<User>({
    queryKey: [queryKeys.profile],
    queryFn: async () => {
      const { data } = (await getUserProfileApi()) as { data: User };
      dispatch(setUser(data));
      return data;
    },
    enabled: !!accessToken, // only fetch if logged in
  });
};
