import scoreEngineEndpoints from "@/api/endpoints/score-engine";
import { queryKeys } from "@/constants/queryKeys";
import handleApiError from "@/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import ScoreEngineMockData from "@/types/score-mock-data.json";
import { useDispatch } from "react-redux";
import { setTiers } from "@/store/slice";

function useGetTiers() {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: [queryKeys.getTiers],
    queryFn: async () => {
      try {
        const { data } = await scoreEngineEndpoints.getTiers();
        // return data;

        const tiers = ["bronze", "silver", "gold"];

        const result = tiers.map((tier) => {
          let tiersToInclude: string[] = [];
          if (tier === "bronze") {
            tiersToInclude = ["bronze"];
          } else if (tier === "silver") {
            tiersToInclude = ["bronze", "silver"];
          } else if (tier === "gold") {
            tiersToInclude = ["bronze", "silver", "gold"];
          }
          const biomarkers_count = ScoreEngineMockData.filter((item) =>
            tiersToInclude.includes(item.tier)
          ).length;
          return {
            name: tier.charAt(0).toUpperCase() + tier.slice(1),
            biomarkers_count,
            value: tier as "bronze" | "silver" | "gold",
          };
        });

        dispatch(setTiers(result));

        return result;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw handleApiError(e);
      }
    },
  });
}

export default useGetTiers;
