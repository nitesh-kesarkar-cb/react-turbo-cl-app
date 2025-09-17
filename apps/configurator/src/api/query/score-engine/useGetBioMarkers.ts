// import scoreEngineEndpoints from "@/api/endpoints/score-engine";
import { queryKeys } from "@/constants/queryKeys";
import handleApiError from "@/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import ScoreEngineMockData from "@/types/score-mock-data.json";
import { useDispatch } from "react-redux";
import { setBiomarkers } from "@/store/slice";
import { BiomarkerConfig } from "@/types/ScoreEngine";

/**
 * Query to get biomarkers for a specific tier
 * @param {string} tier tier key
 * @returns
 */
function useGetBioMarkers(tier: string) {
  const dispatch = useDispatch();

  tier = "gold";

  return useQuery({
    queryKey: [queryKeys.getBioMarkers],
    queryFn: async () => {
      try {
        // const { data } = await scoreEngineEndpoints.getTierBiomarkers(tier);
        // return data;
        let tiersToInclude: string[] = [];
        if (tier === "bronze") {
          tiersToInclude = ["bronze"];
        } else if (tier === "silver") {
          tiersToInclude = ["bronze", "silver"];
        } else if (tier === "gold") {
          tiersToInclude = ["bronze", "silver", "gold"];
        }
        const biomarkers = ScoreEngineMockData.filter((item) =>
          tiersToInclude.includes(item.tier)
        );

        dispatch(setBiomarkers(biomarkers as BiomarkerConfig[]));

        return biomarkers;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw handleApiError(e);
      }
    },
  });
}

export default useGetBioMarkers;
