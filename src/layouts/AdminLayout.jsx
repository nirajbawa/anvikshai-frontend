import { Outlet, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import useAxios from "../hook/useAxios";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import AdminNav from "../components/navbars/AdminNav";

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
      <AdminNav />
      <main>
        {token != null ? <Outlet /> : <Navigate to="/admin-in" />}
        <ToastContainer position="bottom-left" />
      </main>
    </div>
  );
};

export default AdminLayout;
