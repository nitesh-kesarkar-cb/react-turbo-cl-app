export const API_CONFIG = {
    login: "/auth/login",
    refresh: "/auth/refresh",
    profile: "/auth/profile",

    //select tiers
    getTiers: "/tiers",
    getTierByKey: (key: string) => `/tiers/${key}`,
};
