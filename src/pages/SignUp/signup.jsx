import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, UserPlus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/sign-up", data);
      navigate(`/otp/${data.email}`);
      toast.success("Signup successful! Verify your account");
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#121212] flex items-center justify-center p-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] border border-transparent dark:border-purple-900/20 rounded-2xl shadow-2xl dark:shadow-purple-500/10 overflow-hidden flex transition-colors"
      >
        <div className="w-full md:w-1/2 p-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <UserPlus className="h-12 w-12 text-purple-600 dark:text-purple-500 mb-4 transition-colors" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 transition-colors">
              Create Account
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`pl-10 w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 ${
                    errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-800"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`pl-10 w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 ${
                    errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-800"
                  }`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className={`pl-10 w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-800"
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
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
              disabled={loading}
              className="w-full bg-purple-600 dark:bg-purple-600 text-white p-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-purple-700 dark:hover:bg-purple-500 transition-all shadow-lg active:scale-95 disabled:bg-purple-400 dark:disabled:bg-purple-900/50"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <span>Sign Up</span>
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-bold transition-colors"
            >
              Sign In
            </Link>
          </motion.p>
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-1/2 bg-cover bg-center hidden md:block grayscale-[0.2] dark:grayscale-[0.5]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2340&auto=format&fit=crop')`,
          }}
        />
      </motion.div>
    </div>
  );
}

export default SignUp;
