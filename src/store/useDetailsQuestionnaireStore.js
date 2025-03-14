import { create } from "zustand";

const useDetailsQuestionnaireStore = create((set) => ({
  questions: null,
  setQuestions: (data) => set(() => ({ questions: data })),
  clearQuestions: () => set({ questions: null }),
}));

export default useDetailsQuestionnaireStore;
