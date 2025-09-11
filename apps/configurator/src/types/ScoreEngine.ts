export interface BiomarkerConfig {
    id: string;
    name: string;
    group: string;
    source: string;
    tier: "bronze" | "silver" | "gold";
    weight: number;
    value: number;
    unit: string;
    risk_zones: RiskZone[];
}
export interface RiskZone {
    name: string
    color: string
    min: number
    max: number
    hazardRatio: number
}
export interface ScoreEngineState {
    score: number;
    history: number[];
    tiers?: Tier[];
    biomarkers?: BiomarkerConfig[];
}

export interface Tier {
    name: string
    biomarkers_count: number
    value: "bronze" | "silver" | "gold";
}

export interface ScoreType {
    name: string
    tier?: string
    checked: boolean
}
