import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, UserPlus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Exp_SignUp() {
  const {
    register,
    handleSubmit,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex"
      >
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <UserPlus className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
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
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
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
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.password ? "border-red-500" : "border-gray-300"
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
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-start space-x-2"
            >
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms and conditions",
                })}
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <div>
                <p className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500">
                    Privacy Policy
                  </a>
                </p>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.terms.message}
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
              className="w-full bg-purple-600 text-white p-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors disabled:bg-purple-400"
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
            className="mt-8 text-center text-sm text-gray-600"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              Sign in
            </Link>
          </motion.p>
        </div>

        {/* Right side - Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-1/2 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2340&auto=format&fit=crop')`,
          }}
        />
      </motion.div>
    </div>
  );
}

export default Exp_SignUp;
