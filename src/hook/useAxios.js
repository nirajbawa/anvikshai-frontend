import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";



const useAxios = () => {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore.getState();
  const token = useAuthStore((state) => state.token);

  const axiosInstance = useMemo(() => {
    console.log("url", import.meta.env.VITE_BACKEND_URL)
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
    });

    // Request interceptor to attach the token and normalize URL
    instance.interceptors.request.use(
      (config) => {
        // Automatically append trailing slash if missing (avoids redirect protocol downgrade)
        if (config.url && !config.url.includes('.') && !config.url.endsWith('/')) {
          const [url, search] = config.url.split('?');
          if (url && !url.endsWith('/')) {
            config.url = `${url}/${search ? '?' + search : ''}`;
          }
        }

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
