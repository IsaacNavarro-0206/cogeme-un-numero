import { navigate } from "@/utils/navigator";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const getStoredToken = (key: string) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null;

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!getStoredToken("access_token"),
  accessToken: getStoredToken("access_token"),
  refreshToken: getStoredToken("refresh_token"),

  setAuth: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    set({ isAuthenticated: true, accessToken, refreshToken });
    navigate("/my-raffles");
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    set({ isAuthenticated: false, accessToken: null, refreshToken: null });
    navigate("/login");
  },
}));
