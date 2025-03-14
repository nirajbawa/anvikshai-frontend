import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
    }),
    {
      name: "user-storage", // key for localStorage
    }
  )
);

export default useUserStore;
