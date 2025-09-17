export interface Tenant {
  id: string;
  name: string;
  code: string;
  description?: string;
  active: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}
