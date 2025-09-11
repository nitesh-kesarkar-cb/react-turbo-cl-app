import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { OnboardingQuestion } from "../../../../packages/domain/src/index";
import {
  OnboardingForm,
  newQuestion,
} from "../../../../packages/domain/src/onboarding-form";

type State = {
  form: OnboardingForm;
  selectedId: string | null; // selected question for Inspector
  previewOpen: boolean;
};

type Actions = {
  addField: (type: OnboardingQuestion["type"]) => void;
  duplicate: (id: string) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<OnboardingQuestion>) => void;
  reorder: (idsInOrder: string[]) => void;
  select: (id: string | null) => void;
  publish: () => void;
  togglePreview: (open?: boolean) => void;
  resetDemo: () => void;
  setQuestionsPerPage: (n: number) => void;
};

const seed = (): OnboardingForm => ({
  tenantId: "b2c",
  version: 1,
  questions: [
    {
      id: nanoid(),
      key: "full_name",
      label: "Full name",
      type: "text",
      priority: "required",
      required: true,
      options: [],
      order: 1,
      enabled: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: nanoid(),
      key: "phone",
      label: "Phone number",
      type: "phone",
      priority: "optional",
      required: false,
      options: [],
      order: 2,
      enabled: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: nanoid(),
      key: "goals",
      label: "Your primary wellness goal",
      type: "select",
      priority: "optional",
      required: false,
      options: [
        { id: nanoid(), label: "Weight management", value: "weight" },
        { id: nanoid(), label: "Stress reduction", value: "stress" },
        { id: nanoid(), label: "Improve sleep", value: "sleep" },
      ],
      order: 3,
      enabled: true,
      updatedAt: new Date().toISOString(),
    },
  ],
  sections: [],
  questionsPerPage: 5,
});

export const useBuilder = create<State & Actions>()(
  persist(
    (set, get) => ({
      form: seed(),
      selectedId: null,
      previewOpen: false,

      addField: (type) => {
        const qs = [...get().form.questions].sort((a, b) => a.order - b.order);
        const order = (qs.at(-1)?.order ?? 0) + 1;
        const q = { ...newQuestion(order), type };
        set((s) => ({
          form: { ...s.form, questions: [...s.form.questions, q] },
          selectedId: q.id,
        }));
      },

      duplicate: (id) => {
        const qs = get().form.questions;
        const src = qs.find((q) => q.id === id);
        if (!src) return;
        const order = (qs.at(-1)?.order ?? 0) + 1;
        const copy: OnboardingQuestion = {
          ...src,
          id: nanoid(),
          key: `${src.key}_copy`,
          order,
          updatedAt: new Date().toISOString(),
        };
        set((s) => ({
          form: { ...s.form, questions: [...s.form.questions, copy] },
          selectedId: copy.id,
        }));
      },

      remove: (id) => {
        set((s) => ({
          form: {
            ...s.form,
            questions: s.form.questions.filter((q) => q.id !== id),
          },
          selectedId: s.selectedId === id ? null : s.selectedId,
        }));
      },

      update: (id, patch) => {
        set((s) => ({
          form: {
            ...s.form,
            questions: s.form.questions.map((q) =>
              q.id === id
                ? { ...q, ...patch, updatedAt: new Date().toISOString() }
                : q
            ),
          },
        }));
      },

      reorder: (ids) => {
        const map = new Map(ids.map((id, i) => [id, i + 1]));
        set((s) => ({
          form: {
            ...s.form,
            questions: s.form.questions
              .map((q) => ({ ...q, order: map.get(q.id) ?? q.order }))
              .sort((a, b) => a.order - b.order),
          },
        }));
      },

      select: (id) => set({ selectedId: id }),

      publish: () =>
        set((s) => ({ form: { ...s.form, version: s.form.version + 1 } })),

      togglePreview: (open) =>
        set((s) => ({ previewOpen: open ?? !s.previewOpen })),

      resetDemo: () =>
        set({ form: seed(), selectedId: null, previewOpen: false }),
      setQuestionsPerPage: (n) =>
        set((s) => ({
          form: {
            ...s.form,
            questionsPerPage: Math.max(1, Math.min(20, Math.floor(n))),
          },
        })),
    }),
    { name: "onboarding-form-builder-v1" }
  )
);
