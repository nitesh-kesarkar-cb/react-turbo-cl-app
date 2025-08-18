export type FeatureFlags = {
  [key: string]: boolean;
};

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  role: Role;
  permissions: string[];
  featureFlags: FeatureFlags;
} | null;

export interface AuthContextType {
  user: User;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (perm: string) => boolean;
  hasAnyPermission: (perms: string[]) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRoles: (roles: string[]) => boolean;
  hasAllPermissions: (perms: string[]) => boolean;
  hasFeatureEnabled: (flag: string) => boolean;
}

export type Permission =
  | "users:create"
  | "users:read"
  | "users:update"
  | "users:delete"
  | "billing:view"
  | "org:update"
  | "reports:export";

export type Role =
  | "super_admin"
  | "facility_admin"
  | "department_admin"
  | "org_admin"
  | "patient"
  | "doctor";
