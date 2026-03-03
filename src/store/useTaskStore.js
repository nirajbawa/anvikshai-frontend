import { create } from "zustand";

const useTaskStore = create((set) => ({
  task: null,
  setTask: (data) => set(() => ({ task: data })),
  clearTask: () => set({ task: null }),
}));

export default useTaskStore;
