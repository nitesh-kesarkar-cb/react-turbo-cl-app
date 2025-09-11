import OnboardingQuestionMockData from "@/types/onboarding-questions.json";
import { OnboardingQuestion, OnboardingStats, } from "@/types/OnboardingQuestion";


export const fetchOnboardingQuestions = async (categories?: string[]): Promise<OnboardingQuestion[]> => {

  const data = await new Promise<OnboardingQuestion[]>((resolve) => setTimeout(() => {
    const result = categories && categories.length > 0 ? OnboardingQuestionMockData.filter(q => categories.includes(q.category)) : OnboardingQuestionMockData;
    resolve(result as OnboardingQuestion[]);
  }, 1000));
  return data;
};

export const fetchOnboardingStats = async (): Promise<OnboardingStats> => {
  const data = await new Promise<OnboardingStats>((resolve) => setTimeout(() => {
    const categories = Array.from(new Set(OnboardingQuestionMockData.map(q => q.category)));
    const result = {
      total_questions: OnboardingQuestionMockData.length,
      categories: categories,
      required: OnboardingQuestionMockData.filter(q => q.required).length,
      optional: OnboardingQuestionMockData.filter(q => !q.required).length,
    };
    resolve(result as OnboardingStats);
  }, 1000));
  return data;
};
