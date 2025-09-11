import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { Tenant } from "../../../../packages/domain/src/tenant";

type State = { tenants: Tenant[] };
type Actions = {
  add: (data: Omit<Tenant, "id" | "createdAt" | "updatedAt">) => void;
  update: (id: string, patch: Partial<Tenant>) => void;
  remove: (id: string) => void;
};

export const useTenantStore = create<State & Actions>()(
  persist(
    (set) => ({
      tenants: [
        {
          id: nanoid(),
          name: "Default B2C",
          code: "b2c",
          description: "Consumer portal",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      add: (data) => {
        const now = new Date().toISOString();
        set((s) => ({
          tenants: [
            ...s.tenants,
            { id: nanoid(), ...data, createdAt: now, updatedAt: now },
          ],
        }));
      },
      update: (id, patch) => {
        set((s) => ({
          tenants: s.tenants.map((t) =>
            t.id === id
              ? { ...t, ...patch, updatedAt: new Date().toISOString() }
              : t
          ),
        }));
      },
      remove: (id) => {
        set((s) => ({ tenants: s.tenants.filter((t) => t.id !== id) }));
      },
    }),
    { name: "tenant-store-v1" }
  )
);
