import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (newToken) => set({ token: newToken }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth-storage", // key for localStorage
    }
  )
);

export default useAuthStore;
