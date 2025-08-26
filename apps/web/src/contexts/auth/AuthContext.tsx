import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  FEATURES,
  PERMISSIONS,
  ROLES,
  type AuthContextType,
  type User,
} from "./auth.types";
import { mockUsers } from "./mockUsers";
import { hashPasswordSync } from "../../utils/password";

/**
 * Returns a bitmask with only the bit at the given index set to 1.
 * Uses the unsigned right shift operator (>>> 0) to ensure the result is an unsigned 32-bit integer.
 * @param index - The bit position to set (0-based).
 * @returns The bitmask as an unsigned 32-bit integer.
 */
const bit = (index: number) => (1 << index) >>> 0;
/**
 * Checks if the bit at the given index is set in the provided mask.
 * @param mask - The bitmask to check.
 * @param index - The bit position to test (0-based).
 * @returns True if the bit at the given index is set; otherwise, false.
 */
const hasBit = (mask: number, index: number) => (mask & bit(index)) !== 0;

// kept for future reference
// const decodeMask = <T extends Record<string, number>>(
//   mask: number,
//   map: T
// ): (keyof T)[] =>
//   (Object.keys(map) as (keyof T)[]).filter((k) =>
//     hasBit(mask, map[k as string])
//   );

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      const foundUser = mockUsers.find(
        (u: User) => !!u && u.username === storedUsername
      );
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    const passwordHash = hashPasswordSync(password);
    const foundUser = mockUsers.find(
      (u: User) => !!u && u.username === username && u.password === passwordHash
    );

    if (foundUser) {
      setUser(foundUser);
      sessionStorage.setItem("username", username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("username");
  };

  // ---- Bitmask-based checks ----
  const hasPermission = (perm: keyof typeof PERMISSIONS) => {
    if (!user) return false;
    return hasBit(user.permissionsMask, PERMISSIONS[perm]);
  };

  const hasFeature = (feature: keyof typeof FEATURES) => {
    if (!user) return false;
    return hasBit(user.featuresMask, FEATURES[feature]);
  };

  const hasRole = (role: keyof typeof ROLES) => {
    if (!user) return false;
    return hasBit(user.rolesMask, ROLES[role]);
  };

  const hasAnyRole = (roles: (keyof typeof ROLES)[]) => {
    if (!user) return false;
    return roles.some((role) => hasBit(user.rolesMask, ROLES[role]));
  };

  const hasAnyPermission = (perms: (keyof typeof PERMISSIONS)[]) => {
    if (!user) return false;
    return perms.some((perm) => hasBit(user.permissionsMask, PERMISSIONS[perm]));
  };




  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    hasPermission,
    hasRole,
    hasFeature,
    hasAnyRole,
    hasAnyPermission

    // optional: decoders for debugging / UI - kept for future reference
    // decode: {
    //   roles: () => (user ? decodeMask(user.rolesMask, ROLES) : []),
    //   permissions: () =>
    //     user ? decodeMask(user.permissionsMask, PERMISSIONS) : [],
    //   features: () => (user ? decodeMask(user.featuresMask, FEATURES) : []),
    // },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
