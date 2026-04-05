import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isSidebarOpen: false,
  
  setIsSidebarOpen: (value) => {
    console.log('Setting sidebar to:', value);
    set({ isSidebarOpen: value });
  },
  
  toggleSidebar: () => set((state) => {
    console.log('Toggling sidebar to:', !state.isSidebarOpen);
    return { isSidebarOpen: !state.isSidebarOpen };
  }),
  
  openSidebar: () => {
    console.log('Opening sidebar');
    set({ isSidebarOpen: true });
  },
  
  closeSidebar: () => {
    console.log('Closing sidebar');
    set({ isSidebarOpen: false });
  },
}));

export default useSidebarStore;