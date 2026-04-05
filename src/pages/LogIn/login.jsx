import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import useAuthStore from "../../store/useAuthStore";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axiosInstance.post("/auth/sign-in", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Signin successful!");
      const accessToken = response.data?.access_token;
      setToken(accessToken);

      const userData = await axiosInstance.get("/auth/get-current-user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (userData?.data) {
        setUser(userData.data);
      }

      if (userData?.data?.onboarding === true) {
        navigate(`/dashboard`);
      } else {
        navigate(`/details`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Signin failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#121212] flex items-center justify-center p-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] border border-transparent dark:border-purple-900/20 rounded-2xl shadow-2xl dark:shadow-purple-500/10 overflow-hidden flex transition-colors"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-1/2 bg-cover bg-center hidden md:block grayscale-[0.2] dark:grayscale-[0.5]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop')`,
          }}
        />

        <div className="w-full md:w-1/2 p-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center transition-colors">
              Welcome Back
            </h2>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  {...register("username", { required: "Email is required" })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 dark:bg-purple-600 text-white p-3 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-purple-700 dark:hover:bg-purple-500 transition-all shadow-lg active:scale-95 disabled:bg-purple-400 dark:disabled:bg-purple-900/50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors"
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-bold transition-colors"
            >
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;