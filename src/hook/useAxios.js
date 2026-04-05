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
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");
    console.log("Original backend URL:", import.meta.env.VITE_BACKEND_URL);

    const instance = axios.create({
      baseURL: backendUrl,
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
    });

    // Request interceptor to attach the token and normalize URL
    instance.interceptors.request.use(
      (config) => {
        // 1. Force HTTPS if the frontend is on HTTPS (prevents Mixed Content errors)
        if (window.location.protocol === 'https:' && config.baseURL?.startsWith('http:')) {
          config.baseURL = config.baseURL.replace('http:', 'https:');
        }

        // 2. Automatically append trailing slash if missing (avoids redirect protocol downgrade)
        // Only append for simple path-like URLs, excluding files (with dots)
        if (config.url && !config.url.includes('.') && !config.url.endsWith('/')) {
          const [path, search] = config.url.split('?');
          if (path && !path.endsWith('/')) {
            config.url = `${path}/${search ? '?' + search : ''}`;
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
