import { z } from "zod";

export const Tenant = z.object({
  id: z.string(),
  name: z.string().min(2),
  code: z.string().regex(/^[a-z0-9_-]+$/i), // used in URLs, keys
  description: z.string().optional(),
  active: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Tenant = z.infer<typeof Tenant>;
