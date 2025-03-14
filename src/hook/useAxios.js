import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const useAxios = () => {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore.getState();

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  // Request interceptor to attach the token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token expiration
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        clearToken(); // Clear token and user data
        navigate("/login"); // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
