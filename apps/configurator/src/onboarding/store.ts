import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import {
  OnboardingConfig,
  OnboardingQuestion,
} from "../../../../packages/domain/src/index";

type State = {
  tenantId: string;
  version: number;
  questions: OnboardingQuestion[];
};

type Actions = {
  add: () => void;
  update: (id: string, patch: Partial<OnboardingQuestion>) => void;
  remove: (id: string) => void;
  move: (id: string, dir: -1 | 1) => void;
  reorder: (idsInOrder: string[]) => void;
  publish: () => void; // bumps version
  resetDemo: () => void;
};

const seed = (): State => ({
  tenantId: "b2c",
  version: 1,
  questions: [
    {
      id: nanoid(),
      key: "full_name",
      label: "Full name",
      description: "This helps us personalize your experience.",
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
});

export const useOnboardingStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...seed(),
      add: () => {
        const order = (get().questions.at(-1)?.order ?? 0) + 1;
        const q: OnboardingQuestion = {
          id: nanoid(),
          key: `q_${order}`,
          label: "Untitled question",
          type: "text",
          priority: "optional",
          required: false,
          options: [],
          order,
          enabled: true,
          updatedAt: new Date().toISOString(),
        };
        set((s) => ({ questions: [...s.questions, q] }));
      },
      update: (id, patch) => {
        set((s) => ({
          questions: s.questions.map((r) =>
            r.id === id
              ? { ...r, ...patch, updatedAt: new Date().toISOString() }
              : r
          ),
        }));
      },
      remove: (id) => {
        set((s) => ({ questions: s.questions.filter((r) => r.id !== id) }));
      },
      move: (id, dir) => {
        const qs = [...get().questions].sort((a, b) => a.order - b.order);
        const idx = qs.findIndex((q) => q.id === id);
        const target = idx + dir;
        if (idx < 0 || target < 0 || target >= qs.length) return;
        [qs[idx].order, qs[target].order] = [qs[target].order, qs[idx].order];
        set({ questions: qs.sort((a, b) => a.order - b.order) });
      },
      reorder: (ids) => {
        const qs = [...get().questions];
        ids.forEach((id, i) => {
          const q = qs.find((x) => x.id === id);
          if (q) q.order = i + 1;
        });
        set({ questions: qs.sort((a, b) => a.order - b.order) });
      },
      publish: () => set((s) => ({ version: s.version + 1 })),
      resetDemo: () => set(seed()),
    }),
    { name: "onboarding-config-v1" }
  )
);

// Handy selector for a full config object
export const useOnboardingConfig = (): OnboardingConfig => {
  const { tenantId, version, questions } = useOnboardingStore();
  return {
    tenantId,
    version,
    questions: [...questions].sort((a, b) => a.order - b.order),
  };
};
