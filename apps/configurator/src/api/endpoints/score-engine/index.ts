//scor eengine endpoints
import { setUrlParams } from "@/utils/helpers";
import httpClient from "@/utils/httpClient";
import { endpoints } from "..";

const { SCORE_ENGINE } = endpoints;

const scoreEngineEndpoints = {
  /**
   * API call to get tiers
   * @returns API call to get tiers
   */
  getTiers() {
    const url = setUrlParams(SCORE_ENGINE.TIERS, {});
    return httpClient.get(url);
  },

  /**
   * API call to get biomarkers for a specific tier
   * @param {string} tier
   * @returns
   */
  getTierBiomarkers(tier: string) {
    const params = {
      tier: tier,
    };
    const url = setUrlParams(SCORE_ENGINE.BIOMARKERS, params);
    return httpClient.get(url);
  },
};

export default scoreEngineEndpoints;
