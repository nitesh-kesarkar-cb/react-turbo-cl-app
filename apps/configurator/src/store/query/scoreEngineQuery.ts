import { useQuery } from "@tanstack/react-query";
import { fetchTiers, fetchTierBioMarkers } from '../api/scoreEngineApi';
import { queryKeys } from './queryKeys';
import { useDispatch } from "react-redux";
import { setBiomarkers, setTiers } from "../slice/score-engine.slice";

export const useFetchTiers = () => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: [queryKeys.scoreEngineTiers],
        queryFn: async () => {
            const data = await fetchTiers();
            dispatch(setTiers(data));
            return data;
        },
    });
};

export const useFetchTierBioMarkers = (tier: string) => {
    const dispatch = useDispatch();


    return useQuery({
        queryKey: [queryKeys.scoreEngineTierBioMarkers, tier],
        queryFn: async () => {
            const data = await fetchTierBioMarkers(tier);
            dispatch(setBiomarkers(data));
            return data;
        },
        enabled: !!tier,
    });
};
