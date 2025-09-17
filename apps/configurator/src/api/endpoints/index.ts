export const endpoints: any = {
  TENANT: {
    GET_ALL: "tenants",
    CREATE: "tenants",
  },
  AUTH: {
    LOGIN: "auth/login",
    REFRESH: "auth/refresh",
    LOGOUT: "auth/logout",
    PROFILE: "auth/profile",
  },
  ONBOARDING: {
    QUESTIONS: "onboarding/questions",
    STATS: "onboarding/stats",
  },
  SCORE_ENGINE: {
    TIERS: "score-engine/tiers",
    BIOMARKERS: "score-engine/biomarkers",
  },
};
