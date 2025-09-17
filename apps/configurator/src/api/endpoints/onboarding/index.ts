import { setUrlParams } from "@/utils/helpers";
import httpClient from "@/utils/httpClient";
import { endpoints } from "..";

const { ONBOARDING } = endpoints;

const onboardingEndpoints = {
  /**
   * API call to get onboarding questions
   * @param {string[]} categories optional array of categories to filter questions
   * @returns
   */
  getOnboardingQuestions(categories?: string[]) {
    const params = {
      categories: categories?.join(","),
    };

    const url = setUrlParams(ONBOARDING.QUESTIONS, params);
    return httpClient.get(url);
  },

  /**
   * API call to get onboarding stats
   * @returns API call to get onboarding stats
   */
  getOnboaringStats() {
    const url = setUrlParams(ONBOARDING.STATS, {});
    return httpClient.get(url);
  },
};

export default onboardingEndpoints;
