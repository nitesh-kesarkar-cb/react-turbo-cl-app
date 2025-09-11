export type QuestionType =
    | "single_choice"
    | "multi_choice"
    | "text"
    | "number"
    | "date"
    | "boolean";

export interface OnboardingQuestion {
    id: string;
    category: string;
    type: QuestionType;
    question: string;
    required: boolean;
    options?: string[];
    order: number;
}

export interface OnboardingStats {
    total_questions: number;
    categories: string[];
    required: number;
    optional: number;
}

export interface OnboardingState {
  questions: OnboardingQuestion[];
  stats: OnboardingStats;
  selected: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}