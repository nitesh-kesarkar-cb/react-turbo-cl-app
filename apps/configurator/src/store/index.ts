import { configureStore } from "@reduxjs/toolkit";
import { authReducer, onBoardingReducer, scoreEngineReducer } from "./slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        scoreEngine: scoreEngineReducer,
        onboarding: onBoardingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
