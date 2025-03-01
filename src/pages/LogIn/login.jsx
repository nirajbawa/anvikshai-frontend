import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../middleware/axiosInstance";
import login from "./login.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { setToken } = useAuthStore();

  const onSubmit = async (data) => {
    setLoading(true);
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
      setToken(response.data?.access_token);
      const userData = await axiosInstance.get("/auth/get-current-user");
      console.log(userData);
      if (userData.data?.onboarding === true) {
        navigate(`/dashboard`);
      } else {
        navigate(`/details`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center grid grid-cols-2 pl-20 pr-20">
        <div className="pt-12">
          <img className="ml-20 h-[600px]" src={login} alt="Login" />
        </div>

        <div className="pt-20">
          <div className="pt-1 pb-1 rounded-full ml-60 mr-60 text-[30px] shadow-lg">
            Log in
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-left ml-28 mt-6">
              <h1>Your Email:</h1>
              <div className="pt-1">
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  className="border-gray-400 border-2 rounded-lg p-[5px] w-[450px]"
                  {...register("username", { required: "Email is required" })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-left ml-28 mt-6">
              <h1>Password:</h1>
              <div className="pt-1">
                <input
                  type="password"
                  placeholder="password"
                  className="border-gray-400 border-2 rounded-lg p-[5px] w-[450px]"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {errors.terms && (
              <p className="text-red-500 text-sm ml-28">
                {errors.terms.message}
              </p>
            )}

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className={`text-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-black active:bg-black hover:text-white active:text-white bg-[#D2B0FD]"
                } pl-20 pr-20 pt-3 pb-3 rounded-[20px]`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="pt-6 flex justify-center items-center space-x-2">
            <p className="text-gray-600">Don’t have an account?</p>
            <Link to="/signup" className="cursor-pointer hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
