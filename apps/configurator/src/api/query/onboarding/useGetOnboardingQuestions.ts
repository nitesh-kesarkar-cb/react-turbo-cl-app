import onboardingEndpoints from "@/api/endpoints/onboarding";
import { queryKeys } from "@/constants/queryKeys";
import { setQuestions } from "@/store/slice";
import OnboardingQuestionMockData from "@/types/onboarding-questions.json";
import handleApiError from "@/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

function useGetOnboardingQuestions(categories: string[]) {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: [queryKeys.onboardingQuestions],
    queryFn: async () => {
      try {
        const { data } = await onboardingEndpoints.getOnboardingQuestions(
          categories
        );
        const result =
          categories && categories.length > 0
            ? OnboardingQuestionMockData.filter((q) =>
                categories.includes(q.category)
              )
            : OnboardingQuestionMockData;

        dispatch(setQuestions(result as any));
        return result as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw handleApiError(e);
      }
    },
  });
}

export default useGetOnboardingQuestions;
