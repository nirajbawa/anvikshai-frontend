import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../hook/useAxios";
import signup from "./signup.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";

function SignUp() {
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
    <>
      <div className="text-center h-screen mt-10 grid grid-cols-2 pl-20 pr-20">
        <div className="pt-20">
          <div className="pt-1 pb-1 rounded-full ml-60 mr-60 text-[30px] shadow-lg">
            Sign Up
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-left ml-28 mt-6">
              <h1>Your Email:</h1>
              <div className="pt-1">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="abc@gmail.com"
                  className="border-gray-400 border-2 rounded-lg p-[5px] w-[450px]"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="text-left ml-28 mt-6">
              <h1>Password:</h1>
              <div className="pt-1">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Password"
                  className="border-gray-400 border-2 rounded-lg p-[5px] w-[450px]"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-start items-center ml-28 space-x-2">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
                className="w-4 h-4"
              />
              <p className="text-gray-600">
                I agree to the{" "}
                <span className="text-black">Terms and Conditions.</span>
              </p>
            </div>
            {errors.terms && (
              <p className="text-red-500 ml-28">{errors.terms.message}</p>
            )}

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className={`text-lg pl-20 pr-20 pt-3 pb-3 rounded-[20px] ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-black active:bg-black hover:text-white active:text-white bg-[#D2B0FD]"
                }`}
              >
                {loading ? "Signing Up..." : "Signup"}
              </button>
            </div>
          </form>

          <div className="pt-6 flex justify-center items-center space-x-2">
            <p className="text-gray-600">Already have an account?</p>
            <Link to={"/login"} className="cursor-pointer hover:underline">
              Sign in
            </Link>
          </div>
        </div>
        <div className="pt-16">
          <img className="h-[600px]" src={signup} alt="Signup illustration" />
        </div>
      </div>
    </>
  );
}

export default SignUp;
