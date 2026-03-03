import { Outlet, Navigate } from "react-router";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import Sidebar from "../pages/Dashboard/Sidebar";
import DashboardNav from "../components/navbars/DashboardNav";


const DashboardLayout = () => {
  const { token } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
     <DashboardNav />
    <div className="min-h-screen bg-gray-50 flex w-full">
     
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Your header or other components */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
          <ToastContainer position="bottom-left" />
        </main>
      </div>
    </div>
    </>
  );
};

export default DashboardLayout;
