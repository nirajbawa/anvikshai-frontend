import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const useAxios = () => {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore.getState();
  const token = useAuthStore((state) => state.token);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: baseURL,
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
    });

    // Request interceptor to attach the token
    instance.interceptors.request.use(
      (config) => {
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
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          clearToken(); // Clear token and user data
          navigate("/"); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [clearToken, navigate, token]);

  return axiosInstance;
};

export default useAxios;
