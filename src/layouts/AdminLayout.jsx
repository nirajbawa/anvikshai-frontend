import { Outlet, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import DashboardNav from "../components/navbars/DashboardNav";
import useAxios from "../hook/useAxios";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";

const AdminLayout = () => {
  const { token } = useAuthStore();
  const { setUserData } = useUserStore();
  const axiosInstance = useAxios();

  const setUser = async () => {
    const response = await axiosInstance.get("/admin/get-current-user");
    setUserData(response.data);
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className="w-full h-full">
      {/* <DashboardNav /> */}
      <main>
        {token != null ? <Outlet /> : <Navigate to="/admin-in" />}
        <ToastContainer position="bottom-left" />
      </main>
    </div>
  );
};

export default AdminLayout;
