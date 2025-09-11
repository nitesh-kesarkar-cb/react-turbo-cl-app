import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OnboardingState, OnboardingQuestion, OnboardingStats } from "@/types/OnboardingQuestion";

const initialState: OnboardingState = {
  questions: [],
  stats: {
    total_questions: 0,
    categories: [],
    required: 0,
    optional: 0,
  },
  selected: [],
  status: "idle",
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<OnboardingQuestion[]>) {
      state.questions = action.payload;
    },
    setSelected(state, action: PayloadAction<string[]>) {
      state.selected = action.payload;
    },
    setStats(state, action: PayloadAction<OnboardingStats>) {
      state.stats = action.payload;
    },
    setStatus(state, action: PayloadAction<OnboardingState["status"]>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
});

export const { setQuestions, setSelected, setStats, setError, setStatus } = onboardingSlice.actions;
export const onBoardingReducer = onboardingSlice.reducer;
