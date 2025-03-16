import { Outlet, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import DashboardNav from "../components/navbars/DashboardNav";

const DashboardLayout = () => {
  const { token } = useAuthStore();
  return (
    <div className="w-full h-full">
      <DashboardNav />
      <main>
        {token != null ? <Outlet /> : <Navigate to="/login" />}
        <ToastContainer position="bottom-left" />
      </main>
    </div>
  );
};

export default DashboardLayout;
