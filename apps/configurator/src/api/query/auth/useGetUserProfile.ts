import authEndpoints from "@/api/endpoints/auth";
import { queryKeys } from "@/constants/queryKeys";
import handleApiError from "@/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";

/**
 * Api call to get user profile
 * @param {string} email
 * @param {string} password
 * @returns
 */
function useGetUserProfile(email: string, password: string) {
  return useQuery({
    queryKey: [queryKeys.onboardingQuestions],
    queryFn: async () => {
      try {
        const { data } = await authEndpoints.login(email, password);
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw handleApiError(e);
      }
    },
  });
}

export default useGetUserProfile;
