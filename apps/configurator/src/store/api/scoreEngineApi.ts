import { Tier, BiomarkerConfig } from '@/types/ScoreEngine';
import ScoreEngineMockData from '@/types/score-mock-data.json';

export const fetchTiers = async (): Promise<Tier[]> => {
    const data = await new Promise<Tier[]>((resolve) => setTimeout(() => {
        const tiers = ['bronze', 'silver', 'gold'];
        const result = tiers.map(tier => {
            let tiersToInclude: string[] = [];
            if (tier === 'bronze') {
                tiersToInclude = ['bronze'];
            } else if (tier === 'silver') {
                tiersToInclude = ['bronze', 'silver'];
            } else if (tier === 'gold') {
                tiersToInclude = ['bronze', 'silver', 'gold'];
            }
            const biomarkers_count = ScoreEngineMockData.filter(
                (item) => tiersToInclude.includes(item.tier)
            ).length;
            return {
                name: tier.charAt(0).toUpperCase() + tier.slice(1),
                biomarkers_count,
                value: tier as "bronze" | "silver" | "gold",
            };
        });
        resolve(result);
    }, 1000));
    return data;
};

export const fetchTierBioMarkers = async (tier: string): Promise<BiomarkerConfig[]> => {
    const data = await new Promise<BiomarkerConfig[]>((resolve) => setTimeout(() => {
        let tiersToInclude: string[] = [];
        if (tier === 'bronze') {
            tiersToInclude = ['bronze'];
        } else if (tier === 'silver') {
            tiersToInclude = ['bronze', 'silver'];
        } else if (tier === 'gold') {
            tiersToInclude = ['bronze', 'silver', 'gold'];
        }
        const biomarkers = ScoreEngineMockData.filter(
            (item) => tiersToInclude.includes(item.tier)
        );
        resolve(biomarkers as BiomarkerConfig[]);
    }, 300));
    return data;
};
