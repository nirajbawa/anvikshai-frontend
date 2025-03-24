import { Outlet, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import useAxios from "../hook/useAxios";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import MentorNav from "../components/navbars/MentorNav";

const MentorLayout = () => {
  const { token } = useAuthStore();

  const { setUserData } = useUserStore();
  const axiosInstance = useAxios();

  const setUser = async () => {
    const response = await axiosInstance.get("/mentor/auth/get-current-mentor");
    setUserData(response.data);
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className="w-full h-full">
      <MentorNav />
      <main>
        {token != null ? <Outlet /> : <Navigate to="/mentor-login" />}
        <ToastContainer position="bottom-left" />
      </main>
    </div>
  );
};

export default MentorLayout;
