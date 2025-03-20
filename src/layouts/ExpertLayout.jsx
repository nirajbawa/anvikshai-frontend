import { Outlet, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import useAxios from "../hook/useAxios";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import ExpertNav from "../components/navbars/ExpertNav";

const ExpertLayout = () => {
  const { token } = useAuthStore();

  const { setUserData } = useUserStore();
  const axiosInstance = useAxios();

  const setUser = async () => {
    const response = await axiosInstance.get("/expert/auth/get-current-expert");
    setUserData(response.data);
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className="w-full h-full">
      <ExpertNav />
      <main>
        {token != null ? <Outlet /> : <Navigate to="/expert-login" />}
        <ToastContainer position="bottom-left" />
      </main>
    </div>
  );
};

export default ExpertLayout;
