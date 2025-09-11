import { useQuery } from "@tanstack/react-query";
import {
  fetchOnboardingQuestions,
  fetchOnboardingStats,
} from "@/store/api/onboardingApi";
import { useDispatch } from "react-redux";
import { queryKeys } from "./queryKeys";
import { setQuestions, setStats } from "../slice";


export const useOnboardingQuestions = (categories: string[]) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.onboardingQuestions],
    queryFn: async () => {
      const data = await fetchOnboardingQuestions(categories);
      dispatch(setQuestions(data));
      return data;
    },
  });
};

export const useOnboardingStats = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.onboardingStats],
    queryFn: async () => {
      const data = await fetchOnboardingStats();
      dispatch(setStats(data));
      return data;
    },
  });
};
