import { z } from "zod";
import { OnboardingQuestion, QuestionType, Priority } from "./index";

export const FormSection = z.object({
  id: z.string(),
  title: z.string().default("Untitled section"),
  description: z.string().optional(),
  questionIds: z.array(z.string()).default([]),
});
export type FormSection = z.infer<typeof FormSection>;

export const OnboardingForm = z.object({
  tenantId: z.string(),
  version: z.number().int().default(1),
  questions: z.array(OnboardingQuestion),
  sections: z.array(FormSection),

  // ➕ NEW: admin-defined page size for mobile preview / app wizard
  questionsPerPage: z.number().int().min(1).max(20).default(5),
});
export type OnboardingForm = z.infer<typeof OnboardingForm>;

export function newQuestion(order: number) {
  return {
    id: crypto.randomUUID(),
    key: `q_${order}`,
    label: "Untitled question",
    type: QuestionType.enum.text,
    priority: Priority.enum.optional,
    required: false,
    options: [],
    order,
    enabled: true,
    updatedAt: new Date().toISOString(),
  } as z.infer<typeof OnboardingQuestion>;
}
