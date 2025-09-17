import authEndpoints from "@/api/endpoints/auth";
import handleApiError from "@/utils/handleApiError";
import Result from "@/utils/result";
import { useMutation } from "@tanstack/react-query";

/**
 * Api call to login user
 * @param {string} email
 * @param {string} password
 * @returns
 */
async function login(email: string, password: string): Promise<unknown> {
  try {
    const response = await authEndpoints.login(email, password);

    const { data } = response;
    const { result } = Result.success(data);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const error = handleApiError(e);
    throw error;
  }
}

function useLogin() {
  return useMutation({
    mutationFn: (params: any) => login(params.email, params.password),
  });
}

export default useLogin;
