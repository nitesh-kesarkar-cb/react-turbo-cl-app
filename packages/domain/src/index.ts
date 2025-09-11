// Shared types/schemas for both apps (frontend-only demo)
import { z } from "zod";

export const QuestionType = z.enum([
  "text",
  "number",
  "email",
  "phone",
  "date",
  "select",
  "multiselect",
  "boolean",
]);

export const Priority = z.enum(["required", "optional", "conditional"]);

export const Option = z.object({
  id: z.string(),
  label: z.string().min(1),
  value: z.string().min(1),
});

export const OnboardingQuestion = z.object({
  id: z.string(),
  key: z.string().regex(/^[a-z0-9_.-]+$/i),
  label: z.string().min(1),
  description: z.string().optional(),
  type: QuestionType,
  priority: Priority,
  required: z.boolean().default(false),
  conditionExpr: z.string().optional(),
  options: z.array(Option).default([]),
  placeholder: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  order: z.number().int(),
  enabled: z.boolean().default(true),
  updatedBy: z.string().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type OnboardingQuestion = z.infer<typeof OnboardingQuestion>;

export const OnboardingConfig = z.object({
  tenantId: z.string(),
  version: z.number().int(),
  questions: z.array(OnboardingQuestion),
});
export type OnboardingConfig = z.infer<typeof OnboardingConfig>;
