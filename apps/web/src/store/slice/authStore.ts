import { create } from "zustand";
import { User } from "@/contexts/auth/auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  setUser: (user: User | null) => void;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) =>
    set({ accessToken, refreshToken }),
  logout: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
