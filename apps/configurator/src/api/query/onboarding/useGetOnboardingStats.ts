import onboardingEndpoints from "@/api/endpoints/onboarding";
import { queryKeys } from "@/constants/queryKeys";
import { setStats } from "@/store/slice";
import OnboardingQuestionMockData from "@/types/onboarding-questions.json";
import { OnboardingStats } from "@/types/OnboardingQuestion";
import handleApiError from "@/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

function useGetOnboardingStats() {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: [queryKeys.onboardingStats],
    queryFn: async () => {
      try {
        const { data } = await onboardingEndpoints.getOnboaringStats();
        // return data;
        const categories = Array.from(
          new Set(OnboardingQuestionMockData.map((q) => q.category))
        );
        const result = {
          total_questions: OnboardingQuestionMockData.length,
          categories: categories,
          required: OnboardingQuestionMockData.filter((q) => q.required).length,
          optional: OnboardingQuestionMockData.filter((q) => !q.required)
            .length,
        };

        dispatch(setStats(result as any));

        return result as OnboardingStats;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw handleApiError(e);
      }
    },
  });
}

export default useGetOnboardingStats;
