import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  onBoardingReducer,
  scoreEngineReducer,
  tenantReducer,
} from "./slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scoreEngine: scoreEngineReducer,
    onboarding: onBoardingReducer,
    tenant: tenantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
