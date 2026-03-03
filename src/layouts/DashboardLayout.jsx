import { Outlet, Navigate } from "react-router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import Sidebar from "../pages/Dashboard/Sidebar";
import DashboardNav from "../components/navbars/DashboardNav";
import useSidebarStore from "../store/useSidebarStore";

const DashboardLayout = () => {
  const { token } = useAuthStore();
  const { isSidebarOpen, setIsSidebarOpen, closeSidebar } = useSidebarStore();

  // Handle window resize to auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, you might want sidebar open by default
        // setIsSidebarOpen(true);
      } else {
        // On mobile, close sidebar by default
        closeSidebar();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeSidebar]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav />
      
      <div className="flex flex-1 w-full">
        {/* Sidebar - Now uncommented and properly integrated */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-0">
          {/* Header with menu button - Add this if you don't have one in DashboardNav */}
          <header className="bg-white border-b border-gray-200 lg:hidden sticky top-0 z-10">
            <div className="px-4 py-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Outlet />
            <ToastContainer position="bottom-left" />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;