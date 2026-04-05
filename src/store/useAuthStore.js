import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (newToken) => set({ token: newToken }),
      setUser: (newUser) => set({ user: newUser }),
      clearToken: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // key for localStorage
    }
  )
);

export default useAuthStore;
